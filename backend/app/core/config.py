# RICH Backend - Configuration
# Settings management using Pydantic Settings


from typing import Any, Union

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings"""

    # Application
    APP_NAME: str = "RICH"
    APP_ENV: str = "development"
    DEBUG: bool = True
    LOG_LEVEL: str = "INFO"
    SECRET_KEY: str = Field(default="your-secret-key-change-in-production")

    # Server
    PORT: int = 8000
    FRONTEND_URL: str = "http://localhost:4173"
    BACKEND_URL: str = "http://localhost:8000"

    # Database
    DATABASE_URL: str = Field(default="postgresql://user:password@localhost:5432/rich")
    NEON_PROJECT_ID: str = ""
    NEON_API_KEY: str = ""

    # Mistral AI
    MISTRAL_API_KEY: str = ""
    MISTRAL_MODEL: str = "mistral-tiny"
    MISTRAL_EMBEDDING_MODEL: str = "bge-small-en-v1.5"
    MISTRAL_BASE_URL: str = "https://api.mistral.ai/v1"

    # Map Providers
    GOOGLE_MAPS_KEY: str = ""
    GOOGLE_MAPS_ENABLED: bool = False
    CESIUMION_KEY: str = ""
    CESIUMION_ENABLED: bool = False

    # Modal Cloud Compute
    MODAL_EMBED_URL: str = Field(
        default="https://ciforicraf-ai--rich-document-ingestion-textembedder-embed.modal.run"
    )
    MODAL_INGEST_URL: str = Field(
        default="https://ciforicraf-ai--rich-document-ingestion-trigger-ingest.modal.run"
    )

    # Railway
    RAILWAY_PROJECT_ID: str = ""
    RAILWAY_ENVIRONMENT: str = "development"

    # Authentication
    JWT_SECRET: str = Field(default="your-jwt-secret-change-in-production")
    JWT_EXPIRY_DAYS: int = 30

    # CORS
    CORS_ORIGINS: Union[list[str], str] = [
        "http://localhost:4173",
        "http://localhost:8000",
        "https://rich-staging.railway.app",
        "https://rich.acaicia.org",
    ]

    @field_validator("CORS_ORIGINS")
    @classmethod
    def assemble_cors_origins(cls, v: Any) -> list[str]:
        if isinstance(v, str):
            if v.startswith("[") and v.endswith("]"):
                import json
                try:
                    return json.loads(v)
                except Exception:
                    pass
            return [i.strip() for i in v.split(",") if i.strip()]
        elif isinstance(v, list):
            return v
        return []

    # Rate Limiting
    RATE_LIMIT_REQUESTS: int = 100
    RATE_LIMIT_PERIOD: int = 60

    # AI Caching
    AI_CACHE_ENABLED: bool = True
    AI_CACHE_TTL: int = 3600

    # Data Storage
    NEON_STORAGE_BUCKET: str = ""
    NEON_STORAGE_ENDPOINT: str = ""
    LOCAL_STORAGE_PATH: str = "./storage"

    # LUMENS
    LUMENS_TEMP_DIR: str = "./temp"
    LUMENS_MAX_FILE_SIZE: int = 100000000
    LUMENS_ALLOWED_FORMATS: list[str] = [".tif", ".tiff", ".geojson", ".json", ".csv"]

    # Monitoring
    SENTRY_DSN: str = ""
    SENTRY_ENVIRONMENT: str = "development"
    PROMETHEUS_ENABLED: bool = False
    PROMETHEUS_PORT: int = 9090

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()