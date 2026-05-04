import os
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from jose import jwt, JWTError
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from database import get_db
from models import User, Talent, AITier
from schemas import UserOut, ScoutStatsOut

router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY", "change-me-in-production-super-secret-key")
ALGORITHM = "HS256"

security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db),
) -> User:
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if not email:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token nieprawidłowy.")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token nieprawidłowy.")

    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Użytkownik nie znaleziony.")
    return user


@router.get("/me", response_model=UserOut)
async def get_me(user: User = Depends(get_current_user)):
    return user


@router.get("/stats", response_model=ScoutStatsOut)
async def get_stats(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    total = await db.execute(select(func.count(Talent.id)))
    elite = await db.execute(
        select(func.count(Talent.id)).where(Talent.ai_tier == AITier.ELITE)
    )
    avg = await db.execute(select(func.avg(Talent.ai_score)))
    voiv_count = await db.execute(
        select(func.count(Talent.voivodeship_code.distinct()))
    )

    return ScoutStatsOut(
        total_talents=total.scalar_one(),
        elite_count=elite.scalar_one(),
        avg_score=round(avg.scalar_one() or 0, 1),
        voivodeships=voiv_count.scalar_one(),
    )
