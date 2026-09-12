"""
Policy framework and compliance assessment models.
"""
from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import (
    DateTime,
    Float,
    ForeignKey,
    Index,
    String,
    Text,
)
from sqlalchemy.dialects.postgresql import ARRAY, JSONB
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base


class PolicyFramework(Base):
    __tablename__ = "policy_frameworks"

    id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True), primary_key=True, default=uuid4
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    code: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    jurisdiction_ids: Mapped[list[UUID]] = mapped_column(ARRAY(PG_UUID(as_uuid=True)), default=list, nullable=False)
    requirements: Mapped[dict] = mapped_column(JSONB, nullable=False, default=dict)
    metadata_: Mapped[dict] = mapped_column("metadata", JSONB, default=dict, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.utcnow, nullable=False
    )

    # Relationships
    compliance_assessments: Mapped[list["PolicyComplianceAssessment"]] = relationship(
        "PolicyComplianceAssessment", back_populates="framework"
    )

    __table_args__ = (
        Index("idx_policy_frameworks_jurisdiction_ids", "jurisdiction_ids", postgresql_using="gin"),
    )


class PolicyComplianceAssessment(Base):
    __tablename__ = "policy_compliance_assessments"

    id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True), primary_key=True, default=uuid4
    )
    framework_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("policy_frameworks.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    scenario_id: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("scenarios.id", ondelete="SET NULL"),
        nullable=True,
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
    compliance_status: Mapped[bool | None] = mapped_column(nullable=True)
    compliance_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    gaps: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    recommendations: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    report_json: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    created_by: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.utcnow, nullable=False
    )

    # Relationships
    framework: Mapped["PolicyFramework"] = relationship(
        "PolicyFramework", back_populates="compliance_assessments"
    )
    scenario: Mapped["Scenario | None"] = relationship("Scenario", back_populates="compliance_assessments")
    parcel: Mapped["AgroforestryParcel | None"] = relationship("AgroforestryParcel")
    jurisdiction: Mapped["Jurisdiction | None"] = relationship("Jurisdiction")
    creator: Mapped["User | None"] = relationship("User")