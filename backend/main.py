import os
import random
from contextlib import asynccontextmanager
from datetime import date, timedelta, datetime
import traceback
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from database import init_db, AsyncSessionLocal
from routers import auth, talents, voivodeships, scouts, contact

# Bcrypt (cost 12) for password "haslo123", generated with `bcrypt.hashpw`.
# Used instead of hashing at import time so Vercel cold starts avoid heavy passlib/bcrypt init.
_DEMO_PASSWORD_HASH = (
    "$2b$12$UCBSCo3h5uvl5eS5bGE4heh/dX5ffpY6k39WepYwz6iJkNRet0oGS"
)


async def _ensure_demo_accounts():
    """Ensure demo scout logins exist (Vercel-safe: static bcrypt hash, per-email upsert)."""
    from sqlalchemy import select
    from models import User, UserRole

    demos = (
        ("skaut@polska2038.pl", "Jan Kowalski"),
        ("demo@polska2038.pl", "Demo Scout"),
    )
    async with AsyncSessionLocal() as session:
        for email, name in demos:
            existing = await session.execute(select(User).where(User.email == email))
            if existing.scalar_one_or_none() is None:
                session.add(
                    User(
                        email=email,
                        hashed_password=_DEMO_PASSWORD_HASH,
                        full_name=name,
                        role=UserRole.scout,
                        voivodeship="MZ",
                    )
                )
        await session.commit()


async def _seed_voivodeships_and_talents():
    """Seed map + talent demo data when voivodeships are missing (skipped on Vercel)."""
    from sqlalchemy import select
    from models import Voivodeship, Talent, AITier, ScoreHistory

    VOIVS = [
        ("MZ","Mazowieckie",0.574,0.382),("MA","Małopolskie",0.547,0.718),
        ("SL","Śląskie",0.452,0.682),("WP","Wielkopolskie",0.340,0.382),
        ("DS","Dolnośląskie",0.218,0.562),("LD","Łódzkie",0.480,0.482),
        ("LU","Lubelskie",0.697,0.552),("PK","Podkarpackie",0.675,0.758),
        ("PM","Pomorskie",0.380,0.120),("KP","Kujawsko-Pomorskie",0.400,0.248),
        ("ZP","Zachodniopomorskie",0.178,0.148),("LB","Lubuskie",0.178,0.382),
        ("WN","Warmińsko-Mazurskie",0.618,0.158),("PD","Podlaskie",0.750,0.220),
        ("SK","Świętokrzyskie",0.582,0.600),("OP","Opolskie",0.340,0.600),
    ]
    NAMES = ["Adam","Bartosz","Michał","Kamil","Piotr","Jakub","Mateusz","Dawid","Filip","Marcin"]
    CITIES = {"MZ":"Warszawa","MA":"Kraków","SL":"Katowice","WP":"Poznań","DS":"Wrocław",
              "LD":"Łódź","LU":"Lublin","PK":"Rzeszów","PM":"Gdańsk","KP":"Bydgoszcz",
              "ZP":"Szczecin","LB":"Zielona Góra","WN":"Olsztyn","PD":"Białystok",
              "SK":"Kielce","OP":"Opole"}
    NOTES = [
        "Top 2% w Polsce dla rocznika. Najszybszy start 0-10m w regionie.",
        "Stały wzrost +3 pkt/kwartał. Progresja szybsza niż 89% profili.",
        "Czas reakcji w top 3% dla rocznika. Rekomendacja: kontakt z Akademią.",
        "Wyjątkowa eksplozywność. Potencjał sprinterski potwierdzony 3× skanem.",
    ]

    async with AsyncSessionLocal() as session:
        v0 = await session.execute(select(Voivodeship).limit(1))
        if v0.scalar_one_or_none() is not None:
            return

        for code, name, x, y in VOIVS:
            session.add(Voivodeship(code=code, name=name, x=x, y=y, talent_count=0))

        await session.flush()

        base = date(2026, 1, 1)
        for code, *_ in VOIVS:
            for _ in range(7):
                score = random.randint(58, 97)
                tier = AITier.ELITE if score >= 85 else (AITier.PROSPECT if score >= 70 else AITier.MONITOR)
                t = Talent(
                    first_name=random.choice(NAMES),
                    last_name_initial=random.choice("ABCDEFGHIJKLMNOPRSTW") + ".",
                    age=random.randint(10, 19), sport="Piłka nożna",
                    voivodeship_code=code, ai_score=score, ai_tier=tier,
                    sprint_0_10m=round(random.uniform(6,9.8),1),
                    reaction_time=round(random.uniform(6,9.5),1),
                    balance_score=round(random.uniform(6.5,9.8),1),
                    explosiveness=round(random.uniform(6,9.7),1),
                    technique_score=round(random.uniform(6.5,9.9),1),
                    scan_date=base - timedelta(days=random.randint(0,120)),
                    lidar_node=f"Orlik {CITIES[code]}-{random.choice(['Północ','Południe','Centrum'])}",
                    ai_note=random.choice(NOTES),
                )
                session.add(t)
                await session.flush()
                start = max(50, score - random.randint(15,25))
                for i in range(8):
                    h = round(start + (score-start)*i/7 + random.uniform(-2,2))
                    session.add(ScoreHistory(
                        talent_id=t.id, score=max(50,min(99,h)),
                        recorded_at=datetime(2024,1,1) + timedelta(days=i*90)
                    ))

        await session.commit()


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await init_db()
        if os.getenv("DISABLE_AUTO_SEED", "").lower() not in ("1", "true", "yes"):
            await _ensure_demo_accounts()
            # Always seed map + talents when DB is empty (incl. Vercel in-memory). Otherwise panel shows 0 rows after login.
            # For stable data across serverless instances, set POSTGRES_URL / DATABASE_URL (see .env.example).
            await _seed_voivodeships_and_talents()
    except Exception as e:
        # Make sure serverless logs include the real startup failure reason.
        print("Application startup failed. Exiting.")
        print("Startup error:", repr(e))
        print("Traceback:\n", traceback.format_exc())
        raise
    yield


app = FastAPI(
    title="Polska2038 API",
    description="TalentRadar — Narodowy System Wykrywania Talentów",
    version="1.0.0",
    lifespan=lifespan,
)

_origins_env = os.getenv("ALLOWED_ORIGINS", "*")
ALLOWED_ORIGINS = ["*"] if _origins_env == "*" else _origins_env.split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router,         prefix="/api/auth",         tags=["auth"])
app.include_router(talents.router,      prefix="/api/talents",      tags=["talents"])
app.include_router(voivodeships.router, prefix="/api/voivodeships", tags=["voivodeships"])
app.include_router(scouts.router,       prefix="/api/scouts",       tags=["scouts"])
app.include_router(contact.router,      prefix="/api",              tags=["contact"])


@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "polska2038-api"}
