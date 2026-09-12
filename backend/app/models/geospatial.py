"""
Geospatial models for jurisdictions, reference points, parcels, and imagery.
"""
import enum
from datetime import date, datetime
from uuid import UUID, uuid4

from geoalchemy2 import Geometry
from pgvector.sqlalchemy import Vector
from sqlalchemy import (
    Boolean,
    Date,
    DateTime,
    Float,
    ForeignKey,
    Index,
    Integer,
    String,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base


class LandCoverClass(str, enum.Enum):
    AGROFORESTRY = "agroforestry"
    FOREST = "forest"
    CROPLAND = "cropland"
    GRASSLAND = "grassland"
    SETTLEMENT = "settlement"
    WATER = "water"
    BARE_SOIL = "bare_soil"
    WETLAND = "wetland"
    OTHER = "other"


class AgroforestrySubtype(str, enum.Enum):
    DEHESA = "dehesa"
    MONTADO = "montado"
    SILVOPASTURE = "silvopasture"
    SHADE_COFFEE = "shade_coffee"
    SHADE_COCOA = "shade_cocoa"
    ALLEY_CROPPING = "alley_cropping"
    PARKLAND = "parkland"
    HOMEGARDEN = "homegarden"
    FOREST_FARMING = "forest_farming"
    WOODLOT = "woodlot"
    OTHER = "other"


class ValidationStatus(str, enum.Enum):
    UNVALIDATED = "unvalidated"
    AI_REVIEWED = "ai_reviewed"
    EXPERT_REVIEWED = "expert_reviewed"
    COMMUNITY_VALIDATED = "community_validated"
    FINAL = "final"


class Jurisdiction(Base):
    __tablename__ = "jurisdictions"

    id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True), primary_key=True, default=uuid4
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    code: Mapped[str] = mapped_column(String(10), unique=True, nullable=False, index=True)
    level: Mapped[int] = mapped_column(Integer, nullable=False)  # 0=country, 1=region, 2=district
    parent_id: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("jurisdictions.id", ondelete="CASCADE"),
        nullable=True,
        index=True,
    )
    geometry: Mapped[str] = mapped_column(
        Geometry(geometry_type="POLYGON", srid=4326, spatial_index=False),
        nullable=True,
    )
    centroid: Mapped[str | None] = mapped_column(
        Geometry(geometry_type="POINT", srid=4326, spatial_index=False),
        nullable=True,
    )
    area_km2: Mapped[float | None] = mapped_column(Float, nullable=True)
    metadata_: Mapped[dict] = mapped_column("metadata", JSONB, default=dict, nullable=False)
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
    parent: Mapped["Jurisdiction | None"] = relationship(
        "Jurisdiction", remote_side=[id], back_populates="children"
    )
    children: Mapped[list["Jurisdiction"]] = relationship(
        "Jurisdiction", back_populates="parent"
    )
    reference_points: Mapped[list["LandCoverReferencePoint"]] = relationship(
        "LandCoverReferencePoint", back_populates="jurisdiction"
    )
    parcels: Mapped[list["AgroforestryParcel"]] = relationship(
        "AgroforestryParcel", back_populates="jurisdiction"
    )
    imagery: Mapped[list["SatelliteImagery"]] = relationship(
        "SatelliteImagery", back_populates="jurisdiction"
    )
    scenarios: Mapped[list["Scenario"]] = relationship(
        "Scenario", back_populates="jurisdiction"
    )

    __table_args__ = (
        Index("idx_jurisdictions_geometry", "geometry", postgresql_using="gist"),
    )


class LandCoverReferencePoint(Base):
    __tablename__ = "land_cover_reference_points"

    id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True), primary_key=True, default=uuid4
    )
    jurisdiction_id: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("jurisdictions.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    geometry: Mapped[str] = mapped_column(
        Geometry(geometry_type="POINT", srid=4326, spatial_index=False),
        nullable=False,
    )
    class_label: Mapped[LandCoverClass] = mapped_column(
        String(50), nullable=False
    )
    agroforestry_subtype: Mapped[AgroforestrySubtype | None] = mapped_column(
        String(50), nullable=True
    )
    validation_status: Mapped[ValidationStatus] = mapped_column(
        String(50), default=ValidationStatus.UNVALIDATED, nullable=False
    )
    validator_id: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
    )
    validation_date: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    quality_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    geospatial_embedding: Mapped[list[float] | None] = mapped_column(
        Vector(64), nullable=True
    )  # vector(64)
    document_embedding: Mapped[list[float] | None] = mapped_column(
        Vector(384), nullable=True
    )  # vector(384)
    metadata_: Mapped[dict] = mapped_column("metadata", JSONB, default=dict, nullable=False)
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
        "Jurisdiction", back_populates="reference_points"
    )
    validator: Mapped["User | None"] = relationship("User")

    __table_args__ = (
        Index(
            "idx_reference_points_geometry", "geometry", postgresql_using="gist"
        ),
        Index(
            "idx_reference_points_geospatial_embedding",
            "geospatial_embedding",
            postgresql_using="hnsw",
            postgresql_with={"m": 16, "ef_construction": 64},
            postgresql_ops={"geospatial_embedding": "vector_cosine_ops"},
        ),
        Index(
            "idx_reference_points_document_embedding",
            "document_embedding",
            postgresql_using="hnsw",
            postgresql_with={"m": 16, "ef_construction": 64},
            postgresql_ops={"document_embedding": "vector_cosine_ops"},
        ),
    )


class AgroforestryParcel(Base):
    __tablename__ = "agroforestry_parcels"

    id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True), primary_key=True, default=uuid4
    )
    jurisdiction_id: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("jurisdictions.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    geometry: Mapped[str] = mapped_column(
        Geometry(geometry_type="POLYGON", srid=4326, spatial_index=False),
        nullable=False,
    )
    class_label: Mapped[LandCoverClass] = mapped_column(String(50), nullable=False)
    agroforestry_subtype: Mapped[AgroforestrySubtype | None] = mapped_column(
        String(50), nullable=True
    )
    confidence_score: Mapped[float] = mapped_column(Float, nullable=False)
    area_ha: Mapped[float | None] = mapped_column(Float, nullable=True)
    uncertainty: Mapped[float | None] = mapped_column(Float, nullable=True)
    geospatial_embedding: Mapped[list[float] | None] = mapped_column(
        Vector(64), nullable=True
    )  # vector(64)
    source: Mapped[str | None] = mapped_column(String(255), nullable=True)
    source_year: Mapped[int | None] = mapped_column(Integer, nullable=True)
    source_url: Mapped[str | None] = mapped_column(String(512), nullable=True)
    processing_method: Mapped[str | None] = mapped_column(String(255), nullable=True)
    model_version: Mapped[str | None] = mapped_column(String(50), nullable=True)
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
        "Jurisdiction", back_populates="parcels"
    )
    scenario_results: Mapped[list["ScenarioResult"]] = relationship(
        "ScenarioResult", back_populates="parcel"
    )

    __table_args__ = (
        Index("idx_parcels_geometry", "geometry", postgresql_using="gist"),
        Index(
            "idx_parcels_geospatial_embedding",
            "geospatial_embedding",
            postgresql_using="hnsw",
            postgresql_with={"m": 16, "ef_construction": 64},
            postgresql_ops={"geospatial_embedding": "vector_cosine_ops"},
        ),
    )


class SatelliteImagery(Base):
    __tablename__ = "satellite_imagery"

    id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True), primary_key=True, default=uuid4
    )
    jurisdiction_id: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("jurisdictions.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    sensor: Mapped[str] = mapped_column(String(50), nullable=False)
    product_id: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    date_acquired: Mapped[date] = mapped_column(Date, nullable=False, index=True)
    cloud_cover: Mapped[float | None] = mapped_column(Float, nullable=True)
    storage_path: Mapped[str | None] = mapped_column(String(512), nullable=True)
    storage_size_bytes: Mapped[int | None] = mapped_column(Integer, nullable=True)
    bbox: Mapped[str] = mapped_column(
        Geometry(geometry_type="POLYGON", srid=4326, spatial_index=False),
        nullable=True,
    )
    footprint: Mapped[str | None] = mapped_column(
        Geometry(geometry_type="POLYGON", srid=4326, spatial_index=False),
        nullable=True,
    )
    processed: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    processing_status: Mapped[str | None] = mapped_column(String(50), nullable=True)
    metadata_: Mapped[dict] = mapped_column("metadata", JSONB, default=dict, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.utcnow, nullable=False
    )

    # Relationships
    jurisdiction: Mapped["Jurisdiction | None"] = relationship(
        "Jurisdiction", back_populates="imagery"
    )

    __table_args__ = (
        Index("idx_satellite_imagery_bbox", "bbox", postgresql_using="gist"),
    )