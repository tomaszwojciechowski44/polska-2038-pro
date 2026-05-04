import sys
import os

# Add backend/ directory to Python path so all backend modules find each other
_backend_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "backend")
sys.path.insert(0, _backend_dir)

# Use SQLite in /tmp (writable on Vercel serverless)
os.environ.setdefault("DATABASE_URL", "sqlite+aiosqlite:////tmp/polska2038.db")
os.environ.setdefault("SECRET_KEY", "polska2038-vercel-demo-secret-2026-xK9mP")
os.environ.setdefault("ALLOWED_ORIGINS", "*")

from main import app  # noqa: E402 — imports backend/main.py
