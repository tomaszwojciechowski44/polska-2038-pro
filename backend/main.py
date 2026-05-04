import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from database import init_db
from routers import auth, talents, voivodeships, scouts


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(
    title="Polska2038 API",
    description="TalentRadar — Narodowy System Wykrywania Talentów",
    version="1.0.0",
    lifespan=lifespan,
)

ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://localhost:3000,https://polska2038.vercel.app",
).split(",")

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


@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "polska2038-api"}
