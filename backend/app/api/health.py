# RICH Backend - Health Check Endpoint

from datetime import datetime

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def health_check():
    """Basic health check"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "RICH API",
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
