# RICH Backend - FastAPI Application
# Main entry point

import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles

from app.api import ai, geospatial, health, lumens, policy
from app.core.config import settings
from app.core.database import close_db, init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    await init_db()
    yield
    # Shutdown
    await close_db()


app = FastAPI(
    title="RICH API",
    description="AI4D Research and Innovation for Climate Hub - Geospatial Intelligence API",
    version="0.1.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix="/health", tags=["health"])
app.include_router(geospatial.router, prefix="/api/geospatial", tags=["geospatial"])
app.include_router(lumens.router, prefix="/api/lumens", tags=["lumens"])
app.include_router(ai.router, prefix="/api/ai", tags=["ai"])
app.include_router(policy.router, prefix="/api/policy", tags=["policy"])


# Static files mounting for production / Docker / Railway deployment
STATIC_CANDIDATES = [
    os.path.join(os.path.dirname(__file__), "..", "static"),
    "/app/static",
    os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "dist"),
]
STATIC_DIR = next((d for d in STATIC_CANDIDATES if os.path.isdir(d)), None)

if STATIC_DIR:
    assets_path = os.path.join(STATIC_DIR, "assets")
    if os.path.isdir(assets_path):
        app.mount("/assets", StaticFiles(directory=assets_path), name="assets")


@app.get("/")
async def root(request: Request):
    """Root endpoint: serves frontend UI for browsers, or API info for JSON clients"""
    accept_header = request.headers.get("accept", "")
    if "text/html" in accept_header and STATIC_DIR:
        index_html = os.path.join(STATIC_DIR, "index.html")
        if os.path.isfile(index_html):
            return FileResponse(index_html)

    return {
        "name": "RICH API",
        "version": "0.1.0",
        "description": "AI4D Research and Innovation for Climate Hub",
        "status": "operational",
        "docs": "/docs",
    }


@app.get("/{full_path:path}", include_in_schema=False)
async def serve_spa_route(full_path: str, request: Request):
    """Serve SPA static files and fallback to index.html for client-side routing"""
    if full_path.startswith(("api/", "health", "docs", "redoc", "openapi.json")):
        raise HTTPException(status_code=404, detail="Not Found")
    if STATIC_DIR:
        file_path = os.path.join(STATIC_DIR, full_path)
        if full_path and os.path.isfile(file_path):
            return FileResponse(file_path)
        index_file = os.path.join(STATIC_DIR, "index.html")
        if os.path.isfile(index_file):
            return FileResponse(index_file)
    raise HTTPException(status_code=404, detail="Not Found")


@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler — never leaks raw error details in production"""
    import logging

    logging.getLogger(__name__).error(f"Unhandled exception on {request.url}: {exc}", exc_info=exc)
    content: dict = {"detail": "Internal server error"}
    if settings.DEBUG:
        content["error"] = str(exc)
    return JSONResponse(status_code=500, content=content)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
