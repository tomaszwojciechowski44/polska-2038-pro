"""
Polska2038 API — Vercel serverless function.
Self-contained: no database, demo data hardcoded, JWT auth with test credentials.
"""
import os
import random
from datetime import datetime, timedelta
from typing import Optional

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from jose import jwt, JWTError
from passlib.context import CryptContext

SECRET_KEY = os.getenv("SECRET_KEY", "polska2038-vercel-demo-secret-2026-xK9mP")
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer(auto_error=False)

app = FastAPI(title="Polska2038 API", version="1.0.0")
app.add_middleware(
    CORSMiddleware, allow_origins=["*"],
    allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)

# ── Demo users ──────────────────────────────────────────────────────────────
_USERS = {
    "skaut@polska2038.pl":  {"id": 1, "full_name": "Jan Kowalski",       "role": "scout", "voivodeship": "MZ", "pw": "haslo123"},
    "admin@polska2038.pl":  {"id": 2, "full_name": "Administrator Systemu", "role": "admin", "voivodeship": "MZ", "pw": "admin123"},
}

# ── Demo voivodeships ────────────────────────────────────────────────────────
_VOIVS = [
    {"code":"MZ","name":"Mazowieckie","x":0.574,"y":0.382,"talent_count":842},
    {"code":"MA","name":"Małopolskie","x":0.547,"y":0.718,"talent_count":634},
    {"code":"SL","name":"Śląskie","x":0.452,"y":0.682,"talent_count":721},
    {"code":"WP","name":"Wielkopolskie","x":0.340,"y":0.382,"talent_count":510},
    {"code":"DS","name":"Dolnośląskie","x":0.218,"y":0.562,"talent_count":488},
    {"code":"LD","name":"Łódzkie","x":0.480,"y":0.482,"talent_count":396},
    {"code":"LU","name":"Lubelskie","x":0.697,"y":0.552,"talent_count":312},
    {"code":"PK","name":"Podkarpackie","x":0.675,"y":0.758,"talent_count":298},
    {"code":"PM","name":"Pomorskie","x":0.380,"y":0.120,"talent_count":445},
    {"code":"KP","name":"Kujawsko-Pomorskie","x":0.400,"y":0.248,"talent_count":287},
    {"code":"ZP","name":"Zachodniopomorskie","x":0.178,"y":0.148,"talent_count":231},
    {"code":"LB","name":"Lubuskie","x":0.178,"y":0.382,"talent_count":178},
    {"code":"WN","name":"Warmińsko-Mazurskie","x":0.618,"y":0.158,"talent_count":194},
    {"code":"PD","name":"Podlaskie","x":0.750,"y":0.220,"talent_count":168},
    {"code":"SK","name":"Świętokrzyskie","x":0.582,"y":0.600,"talent_count":201},
    {"code":"OP","name":"Opolskie","x":0.340,"y":0.600,"talent_count":156},
]

# ── Generate demo talent pool ────────────────────────────────────────────────
random.seed(2038)
_NAMES  = ["Adam","Bartosz","Michał","Kamil","Piotr","Jakub","Mateusz","Dawid","Filip","Marcin",
           "Tomasz","Łukasz","Krzysztof","Wojciech","Szymon","Patryk","Grzegorz","Marek","Paweł","Rafał"]
_INITIALS = list("ABCDEFGHIJKLMNOPRSTW")
_CITIES = {"MZ":"Warszawa","MA":"Kraków","SL":"Katowice","WP":"Poznań","DS":"Wrocław",
           "LD":"Łódź","LU":"Lublin","PK":"Rzeszów","PM":"Gdańsk","KP":"Bydgoszcz",
           "ZP":"Szczecin","LB":"Zielona Góra","WN":"Olsztyn","PD":"Białystok",
           "SK":"Kielce","OP":"Opole"}
_DIRS   = ["Północ","Południe","Wschód","Zachód","Centrum"]
_NOTES  = [
    "Najszybszy start 0-10m w regionie. Top 2% w Polsce dla rocznika spośród 100K profili.",
    "Stały wzrost +3 pkt/kwartał. Progresja szybsza niż 89% profili w tej grupie wiekowej.",
    "Czas reakcji w top 3% dla rocznika. Rekomendacja: kontakt ze skautem Akademii.",
    "Wyjątkowa eksplozywność kończyn dolnych. Potencjał sprinterski potwierdzony.",
    "Technika powyżej średniej o 2.1 SD. Wysoki iloraz taktyczny.",
    "Progression rate: +4.2 pkt/kwartał. Najszybszy wzrost w województwie.",
]

def _make_history(final: int):
    start = max(50, final - random.randint(15, 28))
    hist = []
    for i in range(8):
        v = round(start + (final - start) * i / 7 + random.uniform(-2, 2))
        hist.append({"score": max(50, min(99, v)),
                     "recorded_at": (datetime(2024, 1, 1) + timedelta(days=i * 90)).isoformat()})
    hist.append({"score": final, "recorded_at": datetime(2026, 1, 1).isoformat()})
    return hist

_TALENTS = []
_tid = 1
for _v in _VOIVS:
    for _ in range(7):
        _score = random.randint(58, 97)
        _tier  = "ELITE" if _score >= 85 else ("PROSPECT" if _score >= 70 else "MONITOR")
        _code  = _v["code"]
        _TALENTS.append({
            "id": _tid, "first_name": random.choice(_NAMES),
            "last_name_initial": random.choice(_INITIALS) + ".",
            "age": random.randint(10, 19), "sport": "Piłka nożna",
            "voivodeship_code": _code, "ai_score": _score, "ai_tier": _tier,
            "sprint_0_10m":    round(random.uniform(6.0, 9.8), 1),
            "reaction_time":   round(random.uniform(6.0, 9.5), 1),
            "balance_score":   round(random.uniform(6.5, 9.8), 1),
            "explosiveness":   round(random.uniform(6.0, 9.7), 1),
            "technique_score": round(random.uniform(6.5, 9.9), 1),
            "scan_date": "2026-01-15", "lidar_node": f"Orlik {_CITIES[_code]}-{random.choice(_DIRS)}",
            "ai_note": random.choice(_NOTES),
            "score_history": _make_history(_score),
        })
        _tid += 1

# ── JWT helpers ──────────────────────────────────────────────────────────────
def _create_token(email: str, role: str, user_id: int) -> str:
    exp = datetime.utcnow() + timedelta(hours=8)
    return jwt.encode({"sub": email, "role": role, "user_id": user_id, "exp": exp},
                      SECRET_KEY, algorithm=ALGORITHM)

def _decode_token(creds: Optional[HTTPAuthorizationCredentials]):
    if not creds:
        return None
    try:
        return jwt.decode(creds.credentials, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        return None

def _require_user(creds: HTTPAuthorizationCredentials = Depends(security)):
    payload = _decode_token(creds)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token nieprawidłowy.")
    return payload

# ── Schemas ──────────────────────────────────────────────────────────────────
class LoginReq(BaseModel):
    email: str
    password: str

# ── Routes ──────────────────────────────────────────────────────────────────
@app.get("/api/health")
def health():
    return {"status": "ok", "service": "polska2038-api", "mode": "demo"}

@app.post("/api/auth/login")
def login(data: LoginReq):
    user = _USERS.get(data.email)
    if not user or not pwd_context.verify(data.password, pwd_context.hash(user["pw"])):
        # fast path without real hash to avoid timeout
        if not user or data.password != user["pw"]:
            raise HTTPException(status_code=401, detail="Nieprawidłowy e-mail lub hasło.")
    token = _create_token(data.email, user["role"], user["id"])
    return {"access_token": token, "token_type": "bearer"}

@app.post("/api/auth/register")
def register(data: LoginReq):
    raise HTTPException(status_code=400, detail="Rejestracja wyłączona w trybie demo.")

@app.get("/api/voivodeships")
def voivodeships():
    return _VOIVS

@app.get("/api/voivodeships/{code}")
def voivodeship(code: str):
    v = next((x for x in _VOIVS if x["code"] == code.upper()), None)
    if not v:
        raise HTTPException(status_code=404, detail="Województwo nie znalezione.")
    return v

@app.get("/api/talents")
def talents(voivodeship: Optional[str] = None, tier: Optional[str] = None,
            age_min: Optional[int] = None, age_max: Optional[int] = None,
            demo: Optional[bool] = None, limit: int = 50, offset: int = 0):
    result = list(_TALENTS)
    if voivodeship:
        result = [t for t in result if t["voivodeship_code"] == voivodeship]
    if tier:
        result = [t for t in result if t["ai_tier"] == tier]
    if age_min is not None:
        result = [t for t in result if t["age"] >= age_min]
    if age_max is not None:
        result = [t for t in result if t["age"] <= age_max]
    result.sort(key=lambda x: x["ai_score"], reverse=True)
    if demo:
        return result[:3]
    return result[offset:offset + limit]

@app.get("/api/talents/{talent_id}")
def talent(talent_id: int):
    t = next((x for x in _TALENTS if x["id"] == talent_id), None)
    if not t:
        raise HTTPException(status_code=404, detail="Talent nie znaleziony.")
    return t

@app.get("/api/scouts/me")
def scout_me(user=Depends(_require_user)):
    u = _USERS.get(user["sub"], {})
    return {"id": u.get("id", 0), "email": user["sub"], "full_name": u.get("full_name"),
            "role": user["role"], "voivodeship": u.get("voivodeship"), "created_at": "2026-01-01T00:00:00"}

@app.get("/api/scouts/stats")
def scout_stats(user=Depends(_require_user)):
    total = len(_TALENTS)
    elite = sum(1 for t in _TALENTS if t["ai_tier"] == "ELITE")
    avg   = round(sum(t["ai_score"] for t in _TALENTS) / total, 1) if total else 0
    return {"total_talents": total, "elite_count": elite, "avg_score": avg, "voivodeships": 16}
