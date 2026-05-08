from datetime import datetime, date
from typing import Optional
from pydantic import BaseModel, EmailStr


# ── Auth ──────────────────────────────────────────────────────────────────────

class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None
    voivodeship: Optional[str] = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ── User ──────────────────────────────────────────────────────────────────────

class UserOut(BaseModel):
    id: int
    email: str
    full_name: Optional[str] = None
    role: str
    voivodeship: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}


# ── Voivodeship ───────────────────────────────────────────────────────────────

class VoivodeshipOut(BaseModel):
    code: str
    name: str
    x: float
    y: float
    talent_count: int

    model_config = {"from_attributes": True}


# ── Score history ─────────────────────────────────────────────────────────────

class ScoreHistoryOut(BaseModel):
    score: int
    recorded_at: datetime

    model_config = {"from_attributes": True}


# ── Talent ────────────────────────────────────────────────────────────────────

class TalentOut(BaseModel):
    id: int
    first_name: str
    last_name_initial: str
    age: int
    sport: str
    voivodeship_code: str
    ai_score: int
    ai_tier: str
    sprint_0_10m: Optional[float] = None
    reaction_time: Optional[float] = None
    balance_score: Optional[float] = None
    explosiveness: Optional[float] = None
    technique_score: Optional[float] = None
    scan_date: Optional[date] = None
    lidar_node: Optional[str] = None
    ai_note: Optional[str] = None
    score_history: list[ScoreHistoryOut] = []

    model_config = {"from_attributes": True}


# ── Scout stats ───────────────────────────────────────────────────────────────

class ScoutStatsOut(BaseModel):
    total_talents: int
    elite_count: int
    avg_score: Optional[float] = None
    voivodeships: int


# ── Public contact (manifesto delivery) ───────────────────────────────────────

class ContactMessageIn(BaseModel):
    name: str
    org: Optional[str] = None
    email: EmailStr
    role: Optional[str] = None
    subject: str
    message: str
    lang: Optional[str] = None
    page: Optional[str] = None


class ContactMessageOut(BaseModel):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}
