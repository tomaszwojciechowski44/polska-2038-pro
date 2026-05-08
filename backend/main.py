import os
import random
from contextlib import asynccontextmanager
from datetime import date, timedelta, datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from database import init_db, AsyncSessionLocal
from routers import auth, talents, voivodeships, scouts, contact


async def _auto_seed():
    """Seed demo data on cold start if the database is empty."""
    from sqlalchemy import select
    from models import User, UserRole, Voivodeship, Talent, AITier, ScoreHistory
    from passlib.context import CryptContext

    pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")

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
        existing = await session.execute(select(User).limit(1))
        if existing.scalar_one_or_none() is not None:
            return

        for email, password, role, name in [
            ("skaut@polska2038.pl","haslo123",UserRole.scout,"Jan Kowalski"),
        ]:
            session.add(User(email=email, hashed_password=pwd.hash(password),
                             full_name=name, role=role, voivodeship="MZ"))

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
    await init_db()
    await _auto_seed()
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
