import os
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase


def resolve_raw_database_url():
    """Pick the first non-empty URL (Vercel Postgres / Neon often use POSTGRES_URL)."""
    for key in (
        "DATABASE_URL",
        "POSTGRES_URL",
        "POSTGRES_PRISMA_URL",
        "NEON_DATABASE_URL",
    ):
        v = os.getenv(key)
        if v and v.strip():
            return v.strip()
    return None


def normalize_database_url(url: str) -> str:
    """Render / Vercel use postgres://; SQLAlchemy async needs postgresql+asyncpg://."""
    u = url.strip()
    if u.startswith("postgres://"):
        u = u.replace("postgres://", "postgresql+asyncpg://", 1)
    elif u.startswith("postgresql://") and not u.startswith("postgresql+asyncpg://"):
        u = u.replace("postgresql://", "postgresql+asyncpg://", 1)
    return u


_raw = resolve_raw_database_url()
# Vercel serverless filesystem is read-only; use in-memory SQLite only when no hosted Postgres is configured.
if not _raw and os.getenv("VERCEL"):
    DATABASE_URL = "sqlite+aiosqlite:///:memory:"
elif _raw:
    DATABASE_URL = normalize_database_url(_raw)
else:
    DATABASE_URL = "sqlite+aiosqlite:///./polska2038.db"

engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
