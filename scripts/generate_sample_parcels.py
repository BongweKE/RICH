#!/usr/bin/env python3
"""
RICH - Sample Parcel Data Generator
Generates realistic agroforestry parcel data for demonstration purposes.
Based on open-source datasets from CERSGIS (Ghana), SITEX (Spain), and Ethiopia Open Data.

This script creates sample parcels with:
- Realistic geometries for Ghana Ashanti, Ethiopia Oromia, Spain Extremadura
- Proper agroforestry subtypes (shade_cocoa, shade_coffee, dehesa, etc.)
- Confidence scores, areas, and metadata
- Can be imported into PostgreSQL/PostGIS

Usage:
    python generate_sample_parcels.py --count 200 --region GH-AH --output parcels.geojson
    python generate_sample_parcels.py --count 100 --region ES-EX --output spain_parcels.geojson
    python generate_sample_parcels.py --count 150 --region ET-OR --output ethiopia_parcels.geojson
"""

import argparse
import json
import math
import random
import uuid
from dataclasses import asdict, dataclass
from datetime import date, datetime
from typing import Any, Dict, List, Optional


@dataclass
class Parcel:
    """Agroforestry parcel data structure"""

    id: str
    jurisdiction_code: str
    jurisdiction_name: str
    geometry: Dict[str, Any]  # GeoJSON Polygon
    class_label: str
    agroforestry_subtype: Optional[str]
    confidence_score: float
    area_ha: float
    uncertainty: float
    source: str
    source_year: int
    source_url: Optional[str]
    processing_method: str
    model_version: str
    created_at: str


# Region configurations with realistic bounding boxes and characteristics
REGION_CONFIGS = {
    "GH-AH": {
        "name": "Ghana Ashanti",
        "bbox": [-2.5, 5.5, -0.5, 7.5],  # Ashanti region approximate bounds
        "center": [-1.624, 6.712],
        "subtypes": ["shade_cocoa", "alley_cropping", "homegarden", "parkland"],
        "subtype_weights": {"shade_cocoa": 0.7, "alley_cropping": 0.2, "homegarden": 0.08, "parkland": 0.02},
        "area_range": (0.5, 50.0),  # Hectares
        "confidence_range": (0.75, 0.98),
        "sources": [
            "CERSGIS Sentinel-2 Classification",
            "Planet NICFI High-Resolution",
            "GEDI Canopy LiDAR Validation",
            "CIFOR Ground Truth Survey",
        ],
    },
    "ET-OR": {
        "name": "Ethiopia Oromia",
        "bbox": [35.0, 6.5, 39.5, 9.5],  # Oromia region approximate bounds
        "center": [37.5, 8.0],
        "subtypes": ["shade_coffee", "forest_farming", "woodlot", "parkland"],
        "subtype_weights": {"shade_coffee": 0.6, "forest_farming": 0.25, "woodlot": 0.1, "parkland": 0.05},
        "area_range": (0.1, 30.0),
        "confidence_range": (0.70, 0.95),
        "sources": [
            "Ethiopia Open Data Portal",
            "Sentinel-2 NDVI Time Series",
            "Local Extension Agent Surveys",
            "Agroforestry Research Network",
        ],
    },
    "ES-EX": {
        "name": "Spain Extremadura",
        "bbox": [-7.5, 38.0, -5.0, 40.5],  # Extremadura approximate bounds
        "center": [-6.3, 39.2],
        "subtypes": ["dehesa", "montado", "silvopasture", "woodlot"],
        "subtype_weights": {"dehesa": 0.6, "montado": 0.2, "silvopasture": 0.15, "woodlot": 0.05},
        "area_range": (10.0, 200.0),  # Dehesa parcels are typically larger
        "confidence_range": (0.85, 0.99),
        "sources": [
            "SITEX Extremadura Geospatial",
            "IDEE Land Cover 2023",
            "Copernicus Sentinel-2",
            "Spanish Forest Inventory",
        ],
    },
}


# Agroforestry land cover class (constant for our use case)
LAND_COVER_CLASS = "agroforestry"


def generate_random_polygon(bbox: List[float], complexity: str = "medium") -> List[List[float]]:
    """
    Generate a random polygon within a bounding box.
    Complexity determines number of vertices.
    """
    min_lon, min_lat, max_lon, max_lat = bbox

    # Determine number of vertices based on complexity
    if complexity == "low":
        num_vertices = random.randint(4, 6)
    elif complexity == "medium":
        num_vertices = random.randint(6, 12)
    else:  # high
        num_vertices = random.randint(12, 20)

    # Generate random points
    points = []
    for _ in range(num_vertices):
        lon = random.uniform(min_lon, max_lon)
        lat = random.uniform(min_lat, max_lat)
        points.append([lon, lat])

    # Close the polygon (first point = last point)
    if points:
        points.append(points[0])

    return [points]


def generate_irregular_polygon(center: List[float], avg_radius_m: float) -> List[List[float]]:
    """
    Generate an irregular polygon around a center point with given average radius in meters.
    More realistic for farm parcels.
    """
    center_lon, center_lat = center

    # Convert radius to degrees (1 degree ≈ 111,000 meters)
    # But for small distances, we can use: 1m ≈ 0.000009 degrees
    meters_to_deg = 0.000009
    avg_radius_deg = avg_radius_m * meters_to_deg

    # Generate 5-10 vertices
    num_vertices = random.randint(5, 10)
    points = []

    # Adjust for latitude (degrees of longitude get smaller as we move away from equator)
    lat_rad = math.radians(center_lat)
    lon_scale = math.cos(lat_rad)

    for i in range(num_vertices):
        # Random angle and radius variation
        angle = 2 * math.pi * i / num_vertices + random.uniform(-0.2, 0.2)
        radius = avg_radius_deg * random.uniform(0.7, 1.3)

        # Convert to Cartesian and back to lon/lat
        delta_lon = radius * math.cos(angle) / lon_scale
        delta_lat = radius * math.sin(angle)

        lon = center_lon + delta_lon
        lat = center_lat + delta_lat
        points.append([lon, lat])

    # Close the polygon
    if points:
        points.append(points[0])

    return [points]


def calculate_polygon_area_ha(coordinates: List[List[float]]) -> float:
    """
    Calculate area of a polygon in hectares using the shoelace formula.
    Coordinates should be in [lon, lat] format.
    Uses simplified calculation appropriate for small polygons (< 1km radius).
    """
    # For small polygons, use simpler approximate calculation
    # Get the bounding box
    lons = [c[0] for c in coordinates[:-1]]
    lats = [c[1] for c in coordinates[:-1]]

    min_lon, max_lon = min(lons), max(lons)
    min_lat, max_lat = min(lats), max(lats)

    # Approximate area in square degrees
    width_deg = max_lon - min_lon
    height_deg = max_lat - min_lat

    # Convert to km (1 deg lat ≈ 111 km, 1 deg lon ≈ 111 km * cos(lat))
    center_lat_rad = math.radians((min_lat + max_lat) / 2)
    km_per_deg_lon = 111.0 * math.cos(center_lat_rad)
    km_per_deg_lat = 111.0

    # Area in square km, then convert to hectares
    area_ha = width_deg * km_per_deg_lon * height_deg * km_per_deg_lat * 100

    # Apply a shape factor (circle = 0.785, square = 1.0)
    # Random factor between 0.6 and 0.9 for irregular polygons
    shape_factor = random.uniform(0.6, 0.9)
    area_ha = area_ha * shape_factor

    return area_ha


def generate_parcel(region_code: str, index: int) -> Parcel:
    """
    Generate a single realistic parcel for the given region.
    """
    config = REGION_CONFIGS[region_code]

    # Generate a random center point within the region
    min_lon, min_lat, max_lon, max_lat = config["bbox"]
    center_lon = random.uniform(min_lon, max_lon)
    center_lat = random.uniform(min_lat, max_lat)

    # Determine parcel size
    min_area, max_area = config["area_range"]
    target_area_ha = random.uniform(min_area, max_area)

    # Calculate approximate radius in meters for a circular parcel
    # Area (ha) = πr² (in 10,000 m² units) => r = sqrt(Area * 10000 / π)
    # Actually: 1 ha = 10,000 m², so for area in ha: r_m = sqrt(area_ha * 10000 / π)
    avg_radius_m = math.sqrt(target_area_ha * 10000 / math.pi) * random.uniform(0.8, 1.2)

    # Generate polygon
    coordinates = generate_irregular_polygon([center_lon, center_lat], avg_radius_m)

    # Calculate actual area
    actual_area_ha = calculate_polygon_area_ha(coordinates[0])

    # If area is too small, scale up the polygon
    if actual_area_ha < min_area * 0.5:
        # Try again with larger radius
        coordinates = generate_irregular_polygon([center_lon, center_lat], avg_radius_m * 1.5)
        actual_area_ha = calculate_polygon_area_ha(coordinates[0])

    # Select agroforestry subtype based on weights
    subtypes = config["subtypes"]
    weights = [config["subtype_weights"].get(st, 0.0) for st in subtypes]
    selected_subtype = random.choices(subtypes, weights=weights, k=1)[0]

    # Generate confidence score
    min_conf, max_conf = config["confidence_range"]
    confidence = round(random.uniform(min_conf, max_conf), 3)

    # Calculate uncertainty (inverse of confidence, scaled)
    uncertainty = round((1.0 - confidence) * random.uniform(0.5, 1.5), 3)

    # Select random source
    source = random.choice(config["sources"])
    source_year = random.randint(2020, 2024)
    source_url = None

    # Add source URL based on source
    if "CERSGIS" in source:
        source_url = "https://zenodo.org/records/16579443"
    elif "SITEX" in source:
        source_url = "https://sitex.gobex.es/"
    elif "Planet" in source:
        source_url = "https://www.planet.com/"
    elif "GEDI" in source:
        source_url = "https://gedi.umd.edu/"

    # Processing metadata
    processing_method = random.choice(
        [
            "Sentinel-2 + Random Forest",
            "PlanetScope + CNN",
            "GEDI LiDAR + ML",
            "Hybrid Remote Sensing",
        ]
    )
    model_version = f"v{random.randint(1, 3)}.{random.randint(0, 9)}"

    # Create parcel
    parcel = Parcel(
        id=str(uuid.uuid4()),
        jurisdiction_code=region_code,
        jurisdiction_name=config["name"],
        geometry={
            "type": "Polygon",
            "coordinates": coordinates,
        },
        class_label=LAND_COVER_CLASS,
        agroforestry_subtype=selected_subtype,
        confidence_score=confidence,
        area_ha=round(max(0.1, actual_area_ha), 2),
        uncertainty=uncertainty,
        source=source,
        source_year=source_year,
        source_url=source_url,
        processing_method=processing_method,
        model_version=model_version,
        created_at=datetime.utcnow().isoformat() + "Z",
    )

    return parcel


def generate_parcels(region_code: str, count: int) -> List[Parcel]:
    """
    Generate multiple parcels for a region.
    """
    parcels = []
    for i in range(count):
        parcel = generate_parcel(region_code, i)
        parcels.append(parcel)
    return parcels


def parcels_to_geojson(parcels: List[Parcel]) -> Dict[str, Any]:
    """
    Convert parcels to GeoJSON FeatureCollection.
    """
    features = []
    for parcel in parcels:
        feature = {
            "type": "Feature",
            "geometry": parcel.geometry,
            "properties": {
                "id": parcel.id,
                "jurisdiction_code": parcel.jurisdiction_code,
                "jurisdiction_name": parcel.jurisdiction_name,
                "class_label": parcel.class_label,
                "agroforestry_subtype": parcel.agroforestry_subtype,
                "confidence_score": parcel.confidence_score,
                "area_ha": parcel.area_ha,
                "uncertainty": parcel.uncertainty,
                "source": parcel.source,
                "source_year": parcel.source_year,
                "source_url": parcel.source_url,
                "processing_method": parcel.processing_method,
                "model_version": parcel.model_version,
                "created_at": parcel.created_at,
            },
        }
        features.append(feature)

    return {
        "type": "FeatureCollection",
        "features": features,
        "generated_at": datetime.utcnow().isoformat() + "Z",
        "count": len(features),
    }


def parcels_to_sql_inserts(parcels: List[Parcel]) -> List[str]:
    """
    Generate SQL INSERT statements for PostgreSQL/PostGIS.
    """
    inserts = []
    for parcel in parcels:
        # Escape strings for SQL
        geom_json = json.dumps(parcel.geometry)

        # Handle source_url with proper escaping
        if parcel.source_url:
            source_url_escaped = parcel.source_url.replace("'", "''")
            source_url_sql = f"'{source_url_escaped}'"
        else:
            source_url_sql = "NULL"

        # Escape other string fields
        source_escaped = parcel.source.replace("'", "''")
        processing_method_escaped = parcel.processing_method.replace("'", "''")

        sql = f"""INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '{parcel.id}'::uuid,
    (SELECT id FROM jurisdictions WHERE code = '{parcel.jurisdiction_code}' LIMIT 1),
    ST_GeomFromGeoJSON('{geom_json}')::geometry(POLYGON, 4326),
    '{parcel.class_label}'::land_cover_class,
    '{parcel.agroforestry_subtype}'::agroforestry_subtype,
    {parcel.confidence_score},
    {parcel.area_ha},
    {parcel.uncertainty},
    '{source_escaped}',
    {parcel.source_year},
    {source_url_sql},
    '{processing_method_escaped}',
    '{parcel.model_version}',
    '{parcel.created_at}'::timestamptz,
    '{parcel.created_at}'::timestamptz
);"""
        inserts.append(sql)

    return inserts


def main():
    parser = argparse.ArgumentParser(description="Generate sample agroforestry parcel data for RICH platform")
    parser.add_argument(
        "--count",
        "-n",
        type=int,
        default=100,
        help="Number of parcels to generate (default: 100)",
    )
    parser.add_argument(
        "--region",
        "-r",
        type=str,
        default="GH-AH",
        choices=["GH-AH", "ET-OR", "ES-EX"],
        help="Region code: GH-AH (Ghana Ashanti), ET-OR (Ethiopia Oromia), ES-EX (Spain Extremadura)",
    )
    parser.add_argument(
        "--output",
        "-o",
        type=str,
        default="parcels.geojson",
        help="Output GeoJSON file (default: parcels.geojson)",
    )
    parser.add_argument(
        "--sql",
        action="store_true",
        help="Also output SQL INSERT statements",
    )
    parser.add_argument(
        "--all-regions",
        action="store_true",
        help="Generate parcels for all regions",
    )

    args = parser.parse_args()

    if args.all_regions:
        # Generate for all regions
        all_parcels = []
        for region_code in ["GH-AH", "ET-OR", "ES-EX"]:
            count = args.count // 3
            print(f"Generating {count} parcels for {region_code}...")
            parcels = generate_parcels(region_code, count)
            all_parcels.extend(parcels)

        # Output combined
        geojson_data = parcels_to_geojson(all_parcels)
        with open(args.output, "w") as f:
            json.dump(geojson_data, f, indent=2)

        print(f"\nGenerated {len(all_parcels)} total parcels")
        print(f"Saved to: {args.output}")

        if args.sql:
            sql_file = args.output.replace(".geojson", "_inserts.sql")
            inserts = parcels_to_sql_inserts(all_parcels)
            with open(sql_file, "w") as f:
                f.write("-- RICH Sample Parcel Data\n")
                f.write("-- Generated: " + datetime.utcnow().isoformat() + "Z\n\n")
                for insert in inserts:
                    f.write(insert + "\n")
            print(f"SQL INSERT statements saved to: {sql_file}")
    else:
        # Generate for single region
        print(f"Generating {args.count} parcels for {args.region}...")
        parcels = generate_parcels(args.region, args.count)

        # Output GeoJSON
        geojson_data = parcels_to_geojson(parcels)
        with open(args.output, "w") as f:
            json.dump(geojson_data, f, indent=2)

        print(f"\nGenerated {len(parcels)} parcels")
        print(f"Saved to: {args.output}")

        # Print summary statistics
        REGION_CONFIGS[args.region]
        subtypes = {}
        for p in parcels:
            subt = p.agroforestry_subtype or "none"
            subtypes[subt] = subtypes.get(subt, 0) + 1

        print("\nSubtype Distribution:")
        for subt, count in sorted(subtypes.items(), key=lambda x: x[1], reverse=True):
            pct = (count / len(parcels)) * 100
            print(f"  {subt}: {count} ({pct:.1f}%)")

        areas = [p.area_ha for p in parcels]
        print("\nArea Statistics:")
        print(f"  Min: {min(areas):.2f} ha")
        print(f"  Max: {max(areas):.2f} ha")
        print(f"  Mean: {sum(areas) / len(areas):.2f} ha")
        print(f"  Total: {sum(areas):.2f} ha")

        confidences = [p.confidence_score for p in parcels]
        print("\nConfidence Statistics:")
        print(f"  Min: {min(confidences):.3f}")
        print(f"  Max: {max(confidences):.3f}")
        print(f"  Mean: {sum(confidences) / len(confidences):.3f}")

        if args.sql:
            sql_file = args.output.replace(".geojson", "_inserts.sql")
            inserts = parcels_to_sql_inserts(parcels)
            with open(sql_file, "w") as f:
                f.write("-- RICH Sample Parcel Data\n")
                f.write(f"-- Region: {args.region}\n")
                f.write("-- Generated: " + datetime.utcnow().isoformat() + "Z\n\n")
                for insert in inserts:
                    f.write(insert + "\n")
            print(f"\nSQL INSERT statements saved to: {sql_file}")


if __name__ == "__main__":
    main()
