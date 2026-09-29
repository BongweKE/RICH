# RICH Backend - Database Connection
# Async SQLAlchemy with PostGIS and pgvector support

from contextlib import asynccontextmanager

from sqlalchemy import event
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.pool import NullPool

from app.core.config import settings
from app.models.base import Base


# Normalize DATABASE_URL for asyncpg driver
def get_async_database_url(url: str) -> str:
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql+asyncpg://", 1)
    elif url.startswith("postgresql://"):
        url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
    if "sslmode=" in url:
        url = url.replace("sslmode=", "ssl=")
    return url


# Create async engine
engine = create_async_engine(
    get_async_database_url(settings.DATABASE_URL),
    echo=settings.DEBUG,
    poolclass=NullPool if settings.APP_ENV == "test" else None,
    pool_pre_ping=True,
)

# Session factory
async_session_maker = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


async def init_db():
    """Initialize database connection and create tables"""
    # Import all models to register them with Base.metadata
    import logging

    import app.models  # noqa: F401

    # Create tables (in production, use Alembic migrations)
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    except Exception as e:
        logging.getLogger(__name__).warning(f"Database initialization deferred (database connection not ready: {e})")
    # Reconcile pre-existing tables with ORM columns added after their creation (ADR 0003)
    from app.core.demo_validation_seed import seed_demo_validations
    from app.core.provenance_backfill import backfill_provenance
    from app.core.schema_migrations import reconcile_schema

    await reconcile_schema(engine)
    await backfill_provenance(engine)
    await seed_demo_validations(engine)


async def close_db():
    """Close database connections"""
    await engine.dispose()


@asynccontextmanager
async def get_db():
    """Get database session"""
    async with async_session_maker() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


# Dependency for FastAPI
async def get_db_session():
    """FastAPI dependency for database session"""
    async with get_db() as session:
        yield session


# Event listeners for connection management
@event.listens_for(engine.sync_engine, "connect")
def set_postgis(dbapi_connection, connection_record):
    """Set up PostGIS on connection"""
    # PostGIS is enabled at database level


@event.listens_for(engine.sync_engine, "connect")
def set_pgvector(dbapi_connection, connection_record):
    """Set up pgvector on connection"""
    # pgvector is enabled at database level
