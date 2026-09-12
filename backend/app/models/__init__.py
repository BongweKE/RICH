"""
SQLAlchemy models for RICH database.
"""
from .base import Base
from .geospatial import (
    AgroforestryParcel,
    Jurisdiction,
    LandCoverReferencePoint,
    SatelliteImagery,
)
from .lumens import PreQUESResult, Scenario, ScenarioResult
from .user import User, UserSession

PreQuESResult = PreQUESResult
from .ai import (
    DocumentCatalog,
    DocumentEmbedding,
    IngestionLog,
    QueryInteractionLog,
)
from .feedback import AIFeedback, ModelEvaluationRun
from .policy import PolicyComplianceAssessment, PolicyFramework
from .supporting import APIKey, DataSource

__all__ = [
    "AIFeedback",
    "APIKey",
    "AgroforestryParcel",
    "Base",
    "DataSource",
    "DocumentCatalog",
    "DocumentEmbedding",
    "IngestionLog",
    "Jurisdiction",
    "LandCoverReferencePoint",
    "ModelEvaluationRun",
    "PolicyComplianceAssessment",
    "PolicyFramework",
    "PreQUESResult",
    "PreQuESResult",
    "QueryInteractionLog",
    "SatelliteImagery",
    "Scenario",
    "ScenarioResult",
    "User",
    "UserSession",
]