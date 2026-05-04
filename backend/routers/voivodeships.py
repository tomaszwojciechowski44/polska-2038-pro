from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from database import get_db
from models import Voivodeship, Talent
from schemas import VoivodeshipOut

router = APIRouter()


@router.get("", response_model=list[VoivodeshipOut])
async def list_voivodeships(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Voivodeship).order_by(Voivodeship.name))
    voivodeships = result.scalars().all()

    # Update talent counts dynamically
    counts_result = await db.execute(
        select(Talent.voivodeship_code, func.count(Talent.id))
        .group_by(Talent.voivodeship_code)
    )
    counts = {row[0]: row[1] for row in counts_result.all()}

    for v in voivodeships:
        v.talent_count = counts.get(v.code, v.talent_count)

    return voivodeships


@router.get("/{code}", response_model=VoivodeshipOut)
async def get_voivodeship(code: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Voivodeship).where(Voivodeship.code == code.upper())
    )
    voivodeship = result.scalar_one_or_none()
    if not voivodeship:
        raise HTTPException(status_code=404, detail="Województwo nie znalezione.")

    count_result = await db.execute(
        select(func.count(Talent.id))
        .where(Talent.voivodeship_code == code.upper())
    )
    voivodeship.talent_count = count_result.scalar_one()
    return voivodeship
