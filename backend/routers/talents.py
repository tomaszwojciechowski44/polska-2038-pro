import os
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload
from jose import jwt, JWTError
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from database import get_db
from models import Talent, AITier
from schemas import TalentOut

router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY", "change-me-in-production-super-secret-key")
ALGORITHM = "HS256"

security = HTTPBearer(auto_error=False)


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if not credentials:
        return None
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None


@router.get("", response_model=list[TalentOut])
async def list_talents(
    voivodeship: Optional[str] = Query(None),
    tier: Optional[str] = Query(None),
    age_min: Optional[int] = Query(None, ge=4, le=30),
    age_max: Optional[int] = Query(None, ge=4, le=30),
    sport: Optional[str] = Query(None),
    demo: Optional[bool] = Query(None),
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
    user=Depends(get_current_user),
):
    stmt = (
        select(Talent)
        .options(selectinload(Talent.score_history))
        .order_by(Talent.ai_score.desc())
    )

    if voivodeship:
        stmt = stmt.where(Talent.voivodeship_code == voivodeship)
    if tier:
        try:
            stmt = stmt.where(Talent.ai_tier == AITier(tier))
        except ValueError:
            pass
    if age_min is not None:
        stmt = stmt.where(Talent.age >= age_min)
    if age_max is not None:
        stmt = stmt.where(Talent.age <= age_max)
    if sport:
        stmt = stmt.where(Talent.sport.ilike(f"%{sport}%"))
    if demo:
        stmt = stmt.limit(3)
    else:
        stmt = stmt.limit(limit).offset(offset)

    result = await db.execute(stmt)
    return result.scalars().all()


@router.get("/{talent_id}", response_model=TalentOut)
async def get_talent(
    talent_id: int,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Talent)
        .options(selectinload(Talent.score_history))
        .where(Talent.id == talent_id)
    )
    talent = result.scalar_one_or_none()
    if not talent:
        raise HTTPException(status_code=404, detail="Talent nie znaleziony.")
    return talent
