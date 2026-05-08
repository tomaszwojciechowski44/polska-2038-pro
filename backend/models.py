from datetime import datetime, date
from sqlalchemy import (
    Integer, String, Float, Date, DateTime, ForeignKey, Enum as SAEnum
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base
import enum


class UserRole(str, enum.Enum):
    scout = "scout"
    admin = "admin"


class AITier(str, enum.Enum):
    ELITE = "ELITE"
    PROSPECT = "PROSPECT"
    MONITOR = "MONITOR"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=True)
    role: Mapped[UserRole] = mapped_column(SAEnum(UserRole), default=UserRole.scout, nullable=False)
    voivodeship: Mapped[str] = mapped_column(String(10), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class Voivodeship(Base):
    __tablename__ = "voivodeships"

    code: Mapped[str] = mapped_column(String(10), primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    x: Mapped[float] = mapped_column(Float, nullable=False)
    y: Mapped[float] = mapped_column(Float, nullable=False)
    talent_count: Mapped[int] = mapped_column(Integer, default=0)

    talents: Mapped[list["Talent"]] = relationship("Talent", back_populates="voivodeship_rel")


class Talent(Base):
    __tablename__ = "talents"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    first_name: Mapped[str] = mapped_column(String(50), nullable=False)
    last_name_initial: Mapped[str] = mapped_column(String(5), nullable=False)
    age: Mapped[int] = mapped_column(Integer, nullable=False)
    sport: Mapped[str] = mapped_column(String(50), default="Piłka nożna")
    voivodeship_code: Mapped[str] = mapped_column(String(10), ForeignKey("voivodeships.code"), nullable=False)
    ai_score: Mapped[int] = mapped_column(Integer, nullable=False)
    ai_tier: Mapped[AITier] = mapped_column(SAEnum(AITier), nullable=False)
    sprint_0_10m: Mapped[float] = mapped_column(Float, nullable=True)
    reaction_time: Mapped[float] = mapped_column(Float, nullable=True)
    balance_score: Mapped[float] = mapped_column(Float, nullable=True)
    explosiveness: Mapped[float] = mapped_column(Float, nullable=True)
    technique_score: Mapped[float] = mapped_column(Float, nullable=True)
    scan_date: Mapped[date] = mapped_column(Date, nullable=True)
    lidar_node: Mapped[str] = mapped_column(String(100), nullable=True)
    ai_note: Mapped[str] = mapped_column(String(500), nullable=True)

    voivodeship_rel: Mapped[Voivodeship] = relationship("Voivodeship", back_populates="talents")
    score_history: Mapped[list["ScoreHistory"]] = relationship(
        "ScoreHistory", back_populates="talent", order_by="ScoreHistory.recorded_at"
    )


class ScoreHistory(Base):
    __tablename__ = "score_history"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    talent_id: Mapped[int] = mapped_column(Integer, ForeignKey("talents.id"), nullable=False)
    score: Mapped[int] = mapped_column(Integer, nullable=False)
    recorded_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    talent: Mapped[Talent] = relationship("Talent", back_populates="score_history")


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    org: Mapped[str] = mapped_column(String(255), nullable=True)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(120), nullable=True)
    subject: Mapped[str] = mapped_column(String(200), nullable=False)
    message: Mapped[str] = mapped_column(String(4000), nullable=False)
    lang: Mapped[str] = mapped_column(String(8), nullable=True)
    page: Mapped[str] = mapped_column(String(200), nullable=True)
    ip: Mapped[str] = mapped_column(String(64), nullable=True)
    user_agent: Mapped[str] = mapped_column(String(400), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, index=True)
