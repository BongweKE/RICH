"""
LUMENS analysis models for scenarios and results.
"""
import enum
from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import (
    DateTime,
    ForeignKey,
    Index,
    Integer,
    String,
    Text,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base


class ScenarioType(str, enum.Enum):
    BASELINE = "baseline"
    CONSERVATION = "conservation"
    INTENSIFICATION = "intensification"
    RESTORATION = "restoration"
    DEFORESTATION = "deforestation"
    CUSTOM = "custom"


class AnalysisStatus(str, enum.Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


class Scenario(Base):
    __tablename__ = "scenarios"

    id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True), primary_key=True, default=uuid4
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    jurisdiction_id: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("jurisdictions.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    scenario_type: Mapped[ScenarioType] = mapped_column(
        String(50), default=ScenarioType.CUSTOM, nullable=False
    )
    parameters: Mapped[dict] = mapped_column(JSONB, nullable=False, default=dict)
    created_by: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
    )
    status: Mapped[AnalysisStatus] = mapped_column(
        String(50), default=AnalysisStatus.PENDING, nullable=False
    )
    started_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    results_summary: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.utcnow, nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    # Relationships
    jurisdiction: Mapped["Jurisdiction | None"] = relationship(
        "Jurisdiction", back_populates="scenarios", lazy="selectin"
    )
    creator: Mapped["User | None"] = relationship("User")
    results: Mapped[list["ScenarioResult"]] = relationship(
        "ScenarioResult", back_populates="scenario", cascade="all, delete-orphan"
    )
    preques_results: Mapped[list["PreQUESResult"]] = relationship(
        "PreQUESResult", back_populates="scenario", cascade="all, delete-orphan"
    )
    compliance_assessments: Mapped[list["PolicyComplianceAssessment"]] = relationship(
        "PolicyComplianceAssessment", back_populates="scenario"
    )

    __table_args__ = (
        Index("idx_scenarios_parameters", "parameters", postgresql_using="gin"),
        Index("idx_scenarios_results_summary", "results_summary", postgresql_using="gin"),
    )


class ScenarioResult(Base):
    __tablename__ = "scenario_results"

    id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True), primary_key=True, default=uuid4
    )
    scenario_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("scenarios.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    parcel_id: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("agroforestry_parcels.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    jurisdiction_id: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("jurisdictions.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    land_cover_change: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    carbon_metrics: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    biodiversity_metrics: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    economic_metrics: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    uncertainty: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.utcnow, nullable=False
    )

    # Relationships
    scenario: Mapped["Scenario"] = relationship("Scenario", back_populates="results")
    parcel: Mapped["AgroforestryParcel | None"] = relationship(
        "AgroforestryParcel", back_populates="scenario_results"
    )
    jurisdiction: Mapped["Jurisdiction | None"] = relationship("Jurisdiction")

    __table_args__ = (
        Index("idx_scenario_results_land_cover_change", "land_cover_change", postgresql_using="gin"),
        Index("idx_scenario_results_carbon_metrics", "carbon_metrics", postgresql_using="gin"),
    )


class PreQUESResult(Base):
    __tablename__ = "preques_results"

    id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True), primary_key=True, default=uuid4
    )
    scenario_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("scenarios.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    raster_t1_path: Mapped[str | None] = mapped_column(String(512), nullable=True)
    raster_t2_path: Mapped[str | None] = mapped_column(String(512), nullable=True)
    year_t1: Mapped[int | None] = mapped_column(Integer, nullable=True)
    year_t2: Mapped[int | None] = mapped_column(Integer, nullable=True)
    crosstab_long: Mapped[dict] = mapped_column(JSONB, nullable=False, default=dict)
    crosstab_matrix: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    sankey_data: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    change_metrics: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    statistics: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.utcnow, nullable=False
    )

    # Relationships
    scenario: Mapped["Scenario"] = relationship("Scenario", back_populates="preques_results")

    __table_args__ = (
        Index("idx_preques_crosstab", "crosstab_long", postgresql_using="gin"),
    )


# Alias for case consistency across codebase
PreQuESResult = PreQUESResult