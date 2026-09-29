# RICH Backend - Geospatial Service
# Geospatial queries, geometry transformations, and spatial analysis helpers

import logging
from typing import Any

from geoalchemy2 import functions as geofunc
from geoalchemy2.shape import to_shape
from shapely.geometry import box, mapping
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import (
    AgroforestryParcel,
    Jurisdiction,
)

logger = logging.getLogger(__name__)


class GeospatialService:
    """Service for spatial transformations, bounding box queries, and layer analysis"""

    @classmethod
    def bbox_to_geometry(cls, bbox: list[float]) -> str:
        """Convert [min_lon, min_lat, max_lon, max_lat] to PostGIS EWKT Polygon with SRID=4326"""
        geom = box(*bbox)
        return f"SRID=4326;{geom.wkt}"

    @classmethod
    def bbox_to_wkt(cls, bbox: list[float]) -> str:
        """Convert [min_lon, min_lat, max_lon, max_lat] to standard WKT Polygon"""
        geom = box(*bbox)
        return geom.wkt

    @classmethod
    def geometry_to_geojson(cls, geom_element: Any) -> dict[str, Any] | None:
        """Safely convert GeoAlchemy2 or Shapely geometry to GeoJSON dict"""
        if geom_element is None:
            return None
        try:
            if hasattr(geom_element, "__geo_interface__"):
                return mapping(geom_element)
            return mapping(to_shape(geom_element))
        except Exception as e:
            logger.warning(f"Error converting geometry to GeoJSON: {e}")
            return None

    @classmethod
    async def query_parcels_in_bbox(
        cls,
        bbox: list[float],
        db: AsyncSession,
        class_filter: list[str] | None = None,
        min_confidence: float = 0.5,
        limit: int = 100,
    ) -> list[dict[str, Any]]:
        """Query agroforestry parcels intersecting with a bounding box"""
        bbox_ewkt = cls.bbox_to_geometry(bbox)
        stmt = select(AgroforestryParcel).where(
            geofunc.ST_Intersects(
                AgroforestryParcel.geometry,
                func.ST_GeomFromEWKT(bbox_ewkt),
            )
        )
        if class_filter:
            stmt = stmt.where(AgroforestryParcel.class_label.in_(class_filter))
        stmt = stmt.where(AgroforestryParcel.confidence_score >= min_confidence)
        stmt = stmt.order_by(AgroforestryParcel.confidence_score.desc()).limit(limit)

        result = await db.execute(stmt)
        parcels: list[Any] = list(result.scalars().all())

        return [
            {
                "id": str(p.id),
                "jurisdiction_id": str(p.jurisdiction_id) if p.jurisdiction_id else None,
                "geometry": cls.geometry_to_geojson(p.geometry),
                "class_label": p.class_label.value if hasattr(p.class_label, "value") else str(p.class_label),
                "agroforestry_subtype": (
                    p.agroforestry_subtype.value
                    if p.agroforestry_subtype and hasattr(p.agroforestry_subtype, "value")
                    else None
                ),
                "confidence_score": p.confidence_score,
                "area_ha": p.area_ha,
                "source": p.source,
            }
            for p in parcels
        ]

    @classmethod
    async def get_jurisdiction_summary(
        cls,
        code: str,
        db: AsyncSession,
    ) -> dict[str, Any] | None:
        """Retrieve jurisdiction overview with parcel counts and area breakdown"""
        stmt = select(Jurisdiction).where(Jurisdiction.code == code)
        result = await db.execute(stmt)
        jurisdiction = result.scalar_one_or_none()
        if not jurisdiction:
            return None

        # Aggregate parcel statistics
        stmt_parcels = select(
            func.count(AgroforestryParcel.id).label("total_parcels"),
            func.sum(AgroforestryParcel.area_ha).label("total_area_ha"),
            func.avg(AgroforestryParcel.confidence_score).label("avg_confidence"),
        ).where(AgroforestryParcel.jurisdiction_id == jurisdiction.id)

        res_p = await db.execute(stmt_parcels)
        p_row = res_p.one()

        return {
            "id": str(jurisdiction.id),
            "name": jurisdiction.name,
            "code": jurisdiction.code,
            "level": jurisdiction.level,
            "area_km2": jurisdiction.area_km2,
            "centroid": cls.geometry_to_geojson(jurisdiction.centroid),
            "total_parcels": p_row.total_parcels or 0,
            "total_agroforestry_ha": float(p_row.total_area_ha or 0.0),
            "mean_confidence": float(p_row.avg_confidence or 0.0),
        }
