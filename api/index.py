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

def _load_app():
    """
    Vercel Python runtime requires a top-level `app`/`application`/`handler`.
    We return a FastAPI app here, and assign it to `app` at module top-level.
    """
    try:
        from main import app as real_app  # type: ignore  # noqa: E402
        return real_app
    except Exception as e:  # pragma: no cover
        _err = "".join(traceback.format_exception(type(e), e, e.__traceback__))
        _err_short = _err[-8000:]  # keep response reasonably small

        err_app = FastAPI(title="Polska2038 API (boot error)", version="1.0.0")

        @err_app.get("/api/health")
        def health_error():
            return {
                "status": "error",
                "service": "polska2038-api",
                "error": str(e),
                "trace": _err_short,
            }

        return err_app


# Top-level entrypoint for Vercel Python runtime
app = _load_app()
application = app
handler = app
