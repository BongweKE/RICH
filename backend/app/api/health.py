# RICH Backend - Health Check Endpoint

import os
from datetime import datetime

from fastapi import APIRouter

router = APIRouter()


@router.get("")
@router.get("/")
async def health_check():
    """Basic health check, including the deployed commit so CI can verify rollouts."""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "RICH API",
        "commit": os.getenv("RAILWAY_GIT_COMMIT_SHA", os.getenv("GIT_COMMIT", "unknown")),
        "environment": os.getenv("RAILWAY_ENVIRONMENT_NAME", os.getenv("APP_ENV", "unknown")),
    }


@router.get("/ready")
async def readiness_check():
    """Readiness check - verifies database connectivity"""
    from sqlalchemy import text

    from app.core.database import engine

    try:
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        return {
            "status": "ready",
            "timestamp": datetime.utcnow().isoformat(),
            "database": "connected",
        }
    except Exception as e:
        return {
            "status": "not ready",
            "timestamp": datetime.utcnow().isoformat(),
            "database": "disconnected",
            "error": str(e),
        }


@router.get("/live")
async def liveness_check():
    """Liveness check - basic service availability"""
    return {
        "status": "alive",
        "timestamp": datetime.utcnow().isoformat(),
    }
