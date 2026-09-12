# RICH Backend - Geospatial API Endpoints
# Integration with God's Eye View data sources and LUMENS data

from datetime import date

from fastapi import APIRouter, Body, Depends, HTTPException, Query
from geoalchemy2 import functions as geofunc
from geoalchemy2.shape import to_shape
from shapely.geometry import mapping
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db_session
from app.core.security import get_current_user_optional
from app.models import (
    AgroforestryParcel,
    Jurisdiction,
    LandCoverReferencePoint,
    SatelliteImagery,
)
from app.services.geospatial import GeospatialService

router = APIRouter()


@router.get("/layers")
async def list_layers(
    jurisdiction_code: str | None = Query(None, description="Filter by jurisdiction code"),
    db: AsyncSession = Depends(get_db_session),
):
    """List available map layers for visualization"""

    # Base layers always available
    layers = [
        {
            "id": "osm",
            "name": "OpenStreetMap",
            "type": "basemap",
            "source": "osm",
            "attribution": "© OpenStreetMap contributors",
        },
        {
            "id": "esri-satellite",
            "name": "Esri Satellite",
            "type": "basemap",
            "source": "esri",
            "attribution": "Powered by Esri",
        },
    ]

    # Add jurisdiction-specific layers
    if jurisdiction_code:
        # Query for available data layers in jurisdiction
        stmt = select(Jurisdiction).where(Jurisdiction.code == jurisdiction_code)
        result = await db.execute(stmt)
        jurisdiction = result.scalar_one_or_none()

        if jurisdiction:
            layers.extend([
                {
                    "id": f"parcels-{jurisdiction_code}",
                    "name": f"Agroforestry Parcels ({jurisdiction.name})",
                    "type": "vector",
                    "source": "parcels",
                    "jurisdiction": jurisdiction_code,
                    "style": "agroforestry",
                },
                {
                    "id": f"reference-{jurisdiction_code}",
                    "name": f"Reference Points ({jurisdiction.name})",
                    "type": "vector",
                    "source": "reference_points",
                    "jurisdiction": jurisdiction_code,
                    "style": "points",
                },
            ])

    return {"layers": layers}


@router.get("/jurisdictions")
async def list_jurisdictions(
    level: int | None = Query(None, description="Administrative level (0=country, 1=region, 2=district)"),
    parent_code: str | None = Query(None, description="Parent jurisdiction code"),
    db: AsyncSession = Depends(get_db_session),
):
    """List available jurisdictions"""

    stmt = select(Jurisdiction)

    if level is not None:
        stmt = stmt.where(Jurisdiction.level == level)

    if parent_code:
        stmt = stmt.join(Jurisdiction.parent).where(Jurisdiction.code == parent_code)

    stmt = stmt.order_by(Jurisdiction.level, Jurisdiction.name)
    result = await db.execute(stmt)
    jurisdictions = result.scalars().all()

    return {
        "jurisdictions": [
            {
                "id": str(j.id),
                "name": j.name,
                "code": j.code,
                "level": j.level,
                "parent_code": j.parent.code if j.parent else None,
                "area_km2": j.area_km2,
                "centroid": mapping(to_shape(j.centroid)) if j.centroid else None,
            }
            for j in jurisdictions
        ]
    }


@router.get("/jurisdictions/{code}")
async def get_jurisdiction(
    code: str,
    db: AsyncSession = Depends(get_db_session),
):
    """Get jurisdiction details with geometry"""

    stmt = select(Jurisdiction).where(Jurisdiction.code == code)
    result = await db.execute(stmt)
    jurisdiction = result.scalar_one_or_none()

    if not jurisdiction:
        raise HTTPException(status_code=404, detail="Jurisdiction not found")

    return {
        "id": str(jurisdiction.id),
        "name": jurisdiction.name,
        "code": jurisdiction.code,
        "level": jurisdiction.level,
        "parent_code": jurisdiction.parent.code if jurisdiction.parent else None,
        "area_km2": jurisdiction.area_km2,
        "geometry": mapping(to_shape(jurisdiction.geometry)) if jurisdiction.geometry else None,
        "centroid": mapping(to_shape(jurisdiction.centroid)) if jurisdiction.centroid else None,
        "metadata": jurisdiction.metadata_,
    }


@router.post("/parcels/search")
async def search_parcels(
    bbox: list[float] = Body(..., description="Bounding box [min_lon, min_lat, max_lon, max_lat]"),
    class_filter: list[str] | None = Body(None, description="Filter by land cover class"),
    min_confidence: float = Body(0.5, description="Minimum confidence score"),
    limit: int = Body(100, description="Maximum results"),
    jurisdiction_code: str | None = Body(None, description="Filter by jurisdiction"),
    db: AsyncSession = Depends(get_db_session),
    user: dict = Depends(get_current_user_optional),
):
    """Search agroforestry parcels by bounding box"""

    # Build query
    stmt = select(AgroforestryParcel)

    # Bounding box filter
    from shapely.geometry import box
    bbox_geom = box(*bbox)
    stmt = stmt.where(
        geofunc.ST_Intersects(
            AgroforestryParcel.geometry,
            func.ST_GeomFromText(bbox_geom.wkt, 4326)
        )
    )

    # Class filter
    if class_filter:
        stmt = stmt.where(AgroforestryParcel.class_label.in_(class_filter))

    # Confidence filter
    stmt = stmt.where(AgroforestryParcel.confidence_score >= min_confidence)

    # Jurisdiction filter
    if jurisdiction_code:
        stmt = stmt.join(Jurisdiction).where(Jurisdiction.code == jurisdiction_code)

    # Order and limit
    stmt = stmt.order_by(
        AgroforestryParcel.confidence_score.desc(),
        AgroforestryParcel.area_ha.desc()
    ).limit(limit)

    result = await db.execute(stmt)
    parcels = result.scalars().all()

    return {
        "parcels": [
            {
                "id": str(p.id),
                "jurisdiction_code": p.jurisdiction.code if p.jurisdiction else None,
                "geometry": GeospatialService.geometry_to_geojson(p.geometry),
                "class_label": p.class_label.value if hasattr(p.class_label, "value") else str(p.class_label),
                "agroforestry_subtype": p.agroforestry_subtype.value if p.agroforestry_subtype and hasattr(p.agroforestry_subtype, "value") else (str(p.agroforestry_subtype) if p.agroforestry_subtype else None),
                "confidence_score": p.confidence_score,
                "area_ha": p.area_ha,
                "uncertainty": p.uncertainty,
                "source": p.source,
                "source_year": p.source_year,
            }
            for p in parcels
        ],
        "count": len(parcels),
    }


@router.get("/parcels/{parcel_id}")
async def get_parcel(
    parcel_id: str,
    db: AsyncSession = Depends(get_db_session),
):
    """Get detailed parcel information"""

    stmt = select(AgroforestryParcel).where(AgroforestryParcel.id == parcel_id)
    result = await db.execute(stmt)
    parcel = result.scalar_one_or_none()

    if not parcel:
        raise HTTPException(status_code=404, detail="Parcel not found")

    return {
        "id": str(parcel.id),
        "jurisdiction_code": parcel.jurisdiction.code if parcel.jurisdiction else None,
        "geometry": GeospatialService.geometry_to_geojson(parcel.geometry),
        "class_label": parcel.class_label.value if hasattr(parcel.class_label, "value") else str(parcel.class_label),
        "agroforestry_subtype": parcel.agroforestry_subtype.value if parcel.agroforestry_subtype and hasattr(parcel.agroforestry_subtype, "value") else (str(parcel.agroforestry_subtype) if parcel.agroforestry_subtype else None),
        "confidence_score": parcel.confidence_score,
        "area_ha": parcel.area_ha,
        "uncertainty": parcel.uncertainty,
        "source": parcel.source,
        "source_year": parcel.source_year,
        "source_url": parcel.source_url,
        "processing_method": parcel.processing_method,
        "model_version": parcel.model_version,
        "created_at": parcel.created_at.isoformat() if parcel.created_at else None,
    }


@router.get("/reference-points")
async def list_reference_points(
    jurisdiction_code: str | None = Query(None),
    class_filter: list[str] | None = Query(None),
    validation_status: str | None = Query(None),
    limit: int = Query(100),
    offset: int = Query(0),
    db: AsyncSession = Depends(get_db_session),
):
    """List land cover reference points"""

    stmt = select(LandCoverReferencePoint)

    if jurisdiction_code:
        stmt = stmt.join(Jurisdiction).where(Jurisdiction.code == jurisdiction_code)

    if class_filter:
        stmt = stmt.where(LandCoverReferencePoint.class_label.in_(class_filter))

    if validation_status:
        stmt = stmt.where(LandCoverReferencePoint.validation_status == validation_status)

    stmt = stmt.order_by(LandCoverReferencePoint.created_at.desc()).limit(limit).offset(offset)
    result = await db.execute(stmt)
    points = result.scalars().all()

    return {
        "reference_points": [
            {
                "id": str(p.id),
                "jurisdiction_code": p.jurisdiction.code if p.jurisdiction else None,
                "geometry": mapping(to_shape(p.geometry)),
                "class_label": p.class_label.value,
                "agroforestry_subtype": p.agroforestry_subtype.value if p.agroforestry_subtype else None,
                "validation_status": p.validation_status.value,
                "validator_id": str(p.validator_id) if p.validator_id else None,
                "validation_date": p.validation_date.isoformat() if p.validation_date else None,
                "quality_score": p.quality_score,
            }
            for p in points
        ],
        "count": len(points),
    }


@router.get("/satellite-imagery")
async def list_satellite_imagery(
    jurisdiction_code: str | None = Query(None),
    sensor: str | None = Query(None),
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    max_cloud_cover: float = Query(100.0),
    limit: int = Query(50),
    offset: int = Query(0),
    db: AsyncSession = Depends(get_db_session),
):
    """List available satellite imagery"""

    stmt = select(SatelliteImagery)

    if jurisdiction_code:
        stmt = stmt.join(Jurisdiction).where(Jurisdiction.code == jurisdiction_code)

    if sensor:
        stmt = stmt.where(SatelliteImagery.sensor == sensor)

    if start_date:
        stmt = stmt.where(SatelliteImagery.date_acquired >= start_date)

    if end_date:
        stmt = stmt.where(SatelliteImagery.date_acquired <= end_date)

    stmt = stmt.where(SatelliteImagery.cloud_cover <= max_cloud_cover)
    stmt = stmt.order_by(SatelliteImagery.date_acquired.desc()).limit(limit).offset(offset)
    result = await db.execute(stmt)
    images = result.scalars().all()

    return {
        "imagery": [
            {
                "id": str(img.id),
                "jurisdiction_code": img.jurisdiction.code if img.jurisdiction else None,
                "sensor": img.sensor,
                "product_id": img.product_id,
                "date_acquired": img.date_acquired.isoformat(),
                "cloud_cover": img.cloud_cover,
                "bbox": mapping(to_shape(img.bbox)) if img.bbox else None,
                "processed": img.processed,
                "processing_status": img.processing_status,
            }
            for img in images
        ],
        "count": len(images),
    }


@router.post("/bbox-query")
async def bbox_query(
    bbox: list[float] = Body(..., description="Bounding box [min_lon, min_lat, max_lon, max_lat]"),
    layers: list[str] = Body(["parcels", "reference_points"], description="Layers to query"),
    db: AsyncSession = Depends(get_db_session),
):
    """Query multiple layers by bounding box"""

    from shapely.geometry import box
    bbox_geom = box(*bbox)
    bbox_wkt = bbox_geom.wkt

    results = {}

    if "parcels" in layers:
        stmt = select(AgroforestryParcel).where(
            geofunc.ST_Intersects(
                AgroforestryParcel.geometry,
                func.ST_GeomFromText(bbox_wkt, 4326)
            )
        ).limit(100)
        result = await db.execute(stmt)
        parcels = result.scalars().all()
        results["parcels"] = [
            {
                "id": str(p.id),
                "geometry": GeospatialService.geometry_to_geojson(p.geometry),
                "class_label": p.class_label.value if hasattr(p.class_label, "value") else str(p.class_label),
                "confidence_score": p.confidence_score,
                "area_ha": p.area_ha,
            }
            for p in parcels
        ]

    if "reference_points" in layers:
        stmt = select(LandCoverReferencePoint).where(
            geofunc.ST_Intersects(
                LandCoverReferencePoint.geometry,
                func.ST_GeomFromText(bbox_wkt, 4326)
            )
        ).limit(100)
        result = await db.execute(stmt)
        points = result.scalars().all()
        results["reference_points"] = [
            {
                "id": str(p.id),
                "geometry": GeospatialService.geometry_to_geojson(p.geometry),
                "class_label": p.class_label.value if hasattr(p.class_label, "value") else str(p.class_label),
                "validation_status": p.validation_status.value if hasattr(p.validation_status, "value") else str(p.validation_status),
            }
            for p in points
        ]

    return results


@router.get("/statistics/{jurisdiction_code}")
async def get_jurisdiction_statistics(
    jurisdiction_code: str,
    db: AsyncSession = Depends(get_db_session),
):
    """Get land cover statistics for a jurisdiction"""

    # Verify jurisdiction exists
    stmt = select(Jurisdiction).where(Jurisdiction.code == jurisdiction_code)
    result = await db.execute(stmt)
    jurisdiction = result.scalar_one_or_none()

    if not jurisdiction:
        raise HTTPException(status_code=404, detail="Jurisdiction not found")

    # Get parcel statistics
    stmt = select(
        AgroforestryParcel.class_label,
        func.count(AgroforestryParcel.id).label("count"),
        func.sum(AgroforestryParcel.area_ha).label("total_area_ha"),
        func.avg(AgroforestryParcel.confidence_score).label("avg_confidence"),
    ).where(AgroforestryParcel.jurisdiction_id == jurisdiction.id).group_by(
        AgroforestryParcel.class_label
    )
    result = await db.execute(stmt)
    parcel_stats = result.all()

    # Get reference point statistics
    stmt = select(
        LandCoverReferencePoint.class_label,
        func.count(LandCoverReferencePoint.id).label("count"),
        func.avg(LandCoverReferencePoint.quality_score).label("avg_quality"),
    ).where(LandCoverReferencePoint.jurisdiction_id == jurisdiction.id).group_by(
        LandCoverReferencePoint.class_label
    )
    result = await db.execute(stmt)
    reference_stats = result.all()

    return {
        "jurisdiction": {
            "code": jurisdiction.code,
            "name": jurisdiction.name,
            "area_km2": jurisdiction.area_km2,
        },
        "parcel_statistics": [
            {
                "class_label": row.class_label.value if hasattr(row.class_label, "value") else str(row.class_label),
                "count": row.count,
                "total_area_ha": float(row.total_area_ha or 0),
                "avg_confidence": float(row.avg_confidence or 0),
            }
            for row in parcel_stats
        ],
        "reference_statistics": [
            {
                "class_label": row.class_label.value if hasattr(row.class_label, "value") else str(row.class_label),
                "count": row.count,
                "avg_quality": float(row.avg_quality or 0),
            }
            for row in reference_stats
        ],
    }