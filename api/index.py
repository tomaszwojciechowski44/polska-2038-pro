"""
Polska2038 API — Vercel serverless entrypoint.

This file acts as a thin wrapper around the real FastAPI backend in `backend/`,
so Vercel can run it as a Python Serverless Function while secrets are provided
via Vercel Environment Variables.
"""

import os
import sys
import traceback

from fastapi import FastAPI

# Ensure `backend/` is importable as top-level modules (database.py, routers/, etc.)
_ROOT = os.path.dirname(os.path.dirname(__file__))
_BACKEND = os.path.join(_ROOT, "backend")
if _BACKEND not in sys.path:
    sys.path.insert(0, _BACKEND)

# Import the real app (fallback to an error-reporting app on import failures)
try:
    from main import app  # type: ignore  # noqa: E402
except Exception as e:  # pragma: no cover
    _err = "".join(traceback.format_exception(type(e), e, e.__traceback__))
    _err_short = _err[-8000:]  # keep response reasonably small

    app = FastAPI(title="Polska2038 API (boot error)", version="1.0.0")

    @app.get("/api/health")
    def health_error():
        return {
            "status": "error",
            "service": "polska2038-api",
            "error": str(e),
            "trace": _err_short,
        }
