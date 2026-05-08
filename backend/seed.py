"""
Run with:  python seed.py
Creates 2 test accounts, 16 voivodeships, and ~120 talent records.
"""
import asyncio
import random
from datetime import date, timedelta

from passlib.context import CryptContext
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from database import Base
from models import User, UserRole, Voivodeship, Talent, AITier, ScoreHistory

import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./polska2038.db")
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)
elif DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

VOIVODESHIPS_DATA = [
    {"code": "MZ", "name": "Mazowieckie",       "x": 0.574, "y": 0.382, "talent_count": 0},
    {"code": "MA", "name": "Małopolskie",        "x": 0.547, "y": 0.718, "talent_count": 0},
    {"code": "SL", "name": "Śląskie",            "x": 0.452, "y": 0.682, "talent_count": 0},
    {"code": "WP", "name": "Wielkopolskie",      "x": 0.340, "y": 0.382, "talent_count": 0},
    {"code": "DS", "name": "Dolnośląskie",       "x": 0.218, "y": 0.562, "talent_count": 0},
    {"code": "LD", "name": "Łódzkie",            "x": 0.480, "y": 0.482, "talent_count": 0},
    {"code": "LU", "name": "Lubelskie",          "x": 0.697, "y": 0.552, "talent_count": 0},
    {"code": "PK", "name": "Podkarpackie",       "x": 0.675, "y": 0.758, "talent_count": 0},
    {"code": "PM", "name": "Pomorskie",          "x": 0.380, "y": 0.120, "talent_count": 0},
    {"code": "KP", "name": "Kujawsko-Pomorskie", "x": 0.400, "y": 0.248, "talent_count": 0},
    {"code": "ZP", "name": "Zachodniopomorskie", "x": 0.178, "y": 0.148, "talent_count": 0},
    {"code": "LB", "name": "Lubuskie",           "x": 0.178, "y": 0.382, "talent_count": 0},
    {"code": "WN", "name": "Warmińsko-Mazurskie","x": 0.618, "y": 0.158, "talent_count": 0},
    {"code": "PD", "name": "Podlaskie",          "x": 0.750, "y": 0.220, "talent_count": 0},
    {"code": "SK", "name": "Świętokrzyskie",     "x": 0.582, "y": 0.600, "talent_count": 0},
    {"code": "OP", "name": "Opolskie",           "x": 0.340, "y": 0.600, "talent_count": 0},
]

FIRST_NAMES = [
    "Adam", "Bartosz", "Michał", "Kamil", "Piotr", "Jakub", "Mateusz", "Dawid",
    "Filip", "Marcin", "Tomasz", "Łukasz", "Krzysztof", "Wojciech", "Szymon",
    "Patryk", "Radosław", "Grzegorz", "Marek", "Paweł", "Rafał", "Sebastian",
    "Kacper", "Maciej", "Przemysław",
]
LAST_INITIALS = list("ABCDEFGHIJKLMNOPRSTW")
SPORTS = ["Piłka nożna"] * 8 + ["Lekkoatletyka", "Koszykówka", "Siatkówka", "Pływanie"]
LIDAR_NODES = [
    "Orlik {city}-{dir}",
]
CITIES = {
    "MZ": ["Warszawa", "Radom", "Płock"],
    "MA": ["Kraków", "Tarnów", "Nowy Sącz"],
    "SL": ["Katowice", "Gliwice", "Sosnowiec"],
    "WP": ["Poznań", "Kalisz", "Konin"],
    "DS": ["Wrocław", "Legnica", "Jelenia Góra"],
    "LD": ["Łódź", "Piotrków", "Sieradz"],
    "LU": ["Lublin", "Zamość", "Chełm"],
    "PK": ["Rzeszów", "Przemyśl", "Tarnobrzeg"],
    "PM": ["Gdańsk", "Gdynia", "Sopot"],
    "KP": ["Bydgoszcz", "Toruń", "Włocławek"],
    "ZP": ["Szczecin", "Koszalin", "Stargard"],
    "LB": ["Zielona Góra", "Gorzów", "Żary"],
    "WN": ["Olsztyn", "Elbląg", "Ostróda"],
    "PD": ["Białystok", "Suwałki", "Łomża"],
    "SK": ["Kielce", "Ostrowiec", "Starachowice"],
    "OP": ["Opole", "Kędzierzyn", "Brzeg"],
}
DIRECTIONS = ["Północ", "Południe", "Wschód", "Zachód", "Centrum"]

AI_NOTES = [
    "Najszybszy start 0-10m w regionie. Top 2% w Polsce dla rocznika.",
    "Stały wzrost +3 pkt/kwartał. Progresja szybsza niż 89% profili w tej grupie.",
    "Czas reakcji w top 3% dla rocznika. Rekomendacja: kontakt z Akademią.",
    "Wyjątkowa eksplozywność kończyn dolnych. Potencjał sprinterski.",
    "Technika powyżej średniej o 2.1 SD. Wysoki iloraz taktyczny.",
    "Biomechanika: asymetria <3%. Wzorcowy profil motoryczny.",
    "Progression rate: +4.2 pkt/kwartał. Najszybszy wzrost w województwie.",
    "Balans osi w top 5% dla rocznika. Predyspozycje do gry w obronie.",
]


def random_score_history(final_score: int, quarters: int = 8) -> list[int]:
    start = max(50, final_score - random.randint(15, 30))
    history = []
    v = start
    step = (final_score - start) / quarters
    for i in range(quarters):
        noise = random.uniform(-2, 2)
        v = round(v + step + noise)
        v = max(50, min(99, v))
        history.append(v)
    history[-1] = final_score
    return history


async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        # ── Users ──────────────────────────────────────────────────────────
        for email, password, role, name in [
            ("skaut@polska2038.pl", "haslo123", UserRole.scout, "Jan Kowalski"),
        ]:
            from sqlalchemy import select
            existing = await session.execute(select(User).where(User.email == email))
            if existing.scalar_one_or_none():
                print(f"User {email} already exists, skipping.")
                continue
            session.add(User(
                email=email,
                hashed_password=pwd_context.hash(password),
                full_name=name,
                role=role,
                voivodeship="MZ",
            ))

        await session.commit()
        print("✓ Users seeded")

        # ── Voivodeships ───────────────────────────────────────────────────
        from sqlalchemy import select
        for vd in VOIVODESHIPS_DATA:
            existing = await session.execute(select(Voivodeship).where(Voivodeship.code == vd["code"]))
            if existing.scalar_one_or_none():
                continue
            session.add(Voivodeship(**vd))

        await session.commit()
        print("✓ Voivodeships seeded")

        # ── Talents ────────────────────────────────────────────────────────
        existing_count_res = await session.execute(select(Talent))
        existing_talents = existing_count_res.scalars().all()
        if len(existing_talents) >= 100:
            print(f"Talents already seeded ({len(existing_talents)} records), skipping.")
            await session.close()
            return

        voiv_codes = [v["code"] for v in VOIVODESHIPS_DATA]
        # Weight distribution: bigger voivodeships get more talents
        weights = [12, 9, 10, 8, 7, 6, 5, 5, 7, 5, 4, 3, 4, 3, 4, 3]  # ~120 total

        base_date = date(2026, 1, 1)

        for voiv_code, count in zip(voiv_codes, weights):
            cities = CITIES[voiv_code]
            for _ in range(count):
                score = random.randint(55, 98)
                if score >= 85:
                    tier = AITier.ELITE
                elif score >= 70:
                    tier = AITier.PROSPECT
                else:
                    tier = AITier.MONITOR

                city = random.choice(cities)
                direction = random.choice(DIRECTIONS)
                age = random.randint(10, 19)
                scan_days_ago = random.randint(0, 180)

                talent = Talent(
                    first_name=random.choice(FIRST_NAMES),
                    last_name_initial=random.choice(LAST_INITIALS) + ".",
                    age=age,
                    sport=random.choice(SPORTS),
                    voivodeship_code=voiv_code,
                    ai_score=score,
                    ai_tier=tier,
                    sprint_0_10m=round(random.uniform(6.0, 9.8), 1),
                    reaction_time=round(random.uniform(6.0, 9.5), 1),
                    balance_score=round(random.uniform(6.5, 9.8), 1),
                    explosiveness=round(random.uniform(6.0, 9.7), 1),
                    technique_score=round(random.uniform(6.5, 9.9), 1),
                    scan_date=base_date - timedelta(days=scan_days_ago),
                    lidar_node=f"Orlik {city}-{direction}",
                    ai_note=random.choice(AI_NOTES),
                )
                session.add(talent)
                await session.flush()

                history_scores = random_score_history(score)
                for i, h_score in enumerate(history_scores):
                    quarter_date = base_date - timedelta(days=(8 - i) * 90 + scan_days_ago)
                    session.add(ScoreHistory(
                        talent_id=talent.id,
                        score=h_score,
                        recorded_at=quarter_date,
                    ))

        await session.commit()
        print("✓ Talents and score history seeded")

    await engine.dispose()
    print("\n✅ Seed complete!")


if __name__ == "__main__":
    asyncio.run(seed())
