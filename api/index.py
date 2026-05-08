"""
Polska2038 API — Vercel serverless entrypoint.

This file acts as a thin wrapper around the real FastAPI backend in `backend/`,
so Vercel can run it as a Python Serverless Function while secrets are provided
via Vercel Environment Variables.
"""

import os
import sys

# Ensure `backend/` is importable as top-level modules (database.py, routers/, etc.)
_ROOT = os.path.dirname(os.path.dirname(__file__))
_BACKEND = os.path.join(_ROOT, "backend")
if _BACKEND not in sys.path:
    sys.path.insert(0, _BACKEND)

# Import the real app
from main import app  # noqa: E402
