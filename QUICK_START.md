# RICH Platform Enhancement - Quick Start Guide

## 🚀 Get Started in 5 Minutes

This guide helps you immediately test the improvements with zero setup.

---

## Step 1: Generate Sample Data

Generate realistic parcel data for testing:

```bash
# Navigate to project
cd /home/pro-g/ProG/RICH

# Generate 10 sample parcels for Ghana (quick test)
.venv/bin/python scripts/generate_sample_parcels.py --count 10 --region GH-AH --output data/test_ghana.geojson

# Generate 100 parcels for all regions
.venv/bin/python scripts/generate_sample_parcels.py --count 100 --all-regions --output data/all_regions.geojson

# Generate with SQL for database import
.venv/bin/python scripts/generate_sample_parcels.py --count 50 --region ES-EX --output data/spain_sample.geojson --sql
```

**Output:**
- `data/test_ghana.geojson` - 10 Ghana Ashanti parcels
- `data/spain_sample.geojson` - 50 Spain Extremadura parcels
- `data/spain_sample_inserts.sql` - SQL INSERT statements

---

## Step 2: View the Generated Data

Check the GeoJSON output:

```bash
# View first parcel in the file
.venv/bin/python -c "
import json
data = json.load(open('data/test_ghana.geojson'))
print('Total parcels:', data['count'])
print('First parcel:')
print(json.dumps(data['features'][0]['properties'], indent=2))
"
```

Example output:
```json
{
  "id": "abc123...",
  "jurisdiction_code": "GH-AH",
  "jurisdiction_name": "Ghana Ashanti",
  "class_label": "agroforestry",
  "agroforestry_subtype": "shade_cocoa",
  "confidence_score": 0.87,
  "area_ha": 12.5,
  "uncertainty": 0.15,
  "source": "CERSGIS Sentinel-2 Classification",
  "source_year": 2023,
  "source_url": "https://zenodo.org/records/16579443",
  "processing_method": "Sentinel-2 + Random Forest",
  "model_version": "v2.3",
  "created_at": "2026-09-19T17:30:00Z"
}
```

---

## Step 3: Import into Database (Optional)

If you have PostgreSQL/PostGIS set up:

```bash
# Use the generated SQL file
psql -U your_username -d rich_db -f data/spain_sample_inserts.sql

# Or import GeoJSON using og2og
ogr2ogr -f PostgreSQL PG:"dbname=rich_db user=your_username" \
  data/test_ghana.geojson \
  -nln agroforestry_parcels \
  -lco GEOMETRY_NAME=geometry \
  -lco FID=id
```

---

## Step 4: Test the Frontend

Update your frontend to load the sample data:

```typescript
// In frontend/src/App.tsx, modify the useEffect that loads parcels

useEffect(() => {
  if (!selectedJurisdiction) return;
  
  // Try to load from API first
  api.searchParcels(bbox, selectedJurisdiction.code).then((data) => {
    if (data && data.length > 0) {
      setParcels(data);
    } else {
      // Fallback: Load sample data from local file
      // For testing, you can import the GeoJSON directly
      import('/public/data/test_ghana.geojson').then((module) => {
        const features = module.default.features.map(f => ({
          id: f.properties.id,
          jurisdiction_code: f.properties.jurisdiction_code,
          geometry: f.geometry,
          class_label: f.properties.class_label,
          agroforestry_subtype: f.properties.agroforestry_subtype,
          confidence_score: f.properties.confidence_score,
          area_ha: f.properties.area_ha,
          uncertainty: f.properties.uncertainty,
          source: f.properties.source,
          source_year: f.properties.source_year,
        }));
        setParcels(features);
      });
    }
  });
}, [selectedJurisdiction]);
```

---

## Step 5: Verify the Data

Check the generated GeoJSON in a viewer:

1. **Online**: Upload to https://geojson.io/
2. **QGIS**: Open in QGIS for full visualization
3. **VS Code**: Install GeoJSON extension for preview

---

## Common Commands

### Generate Data
```bash
# Ghana only
.venv/bin/python scripts/generate_sample_parcels.py -n 50 -r GH-AH -o data/ghana_50.geojson

# All regions
.venv/bin/python scripts/generate_sample_parcels.py -n 300 --all-regions -o data/all_300.geojson

# With SQL
.venv/bin/python scripts/generate_sample_parcels.py -n 100 -r ET-OR -o data/ethiopia.geojson --sql
```

### Statistics
```bash
# Get statistics for a generated file
.venv/bin/python -c "
import json
data = json.load(open('data/all_300.geojson'))
features = data['features']
print(f'Total parcels: {len(features)}')
print(f'Jurisdictions: {set(f[\"properties\"][\"jurisdiction_code\"] for f in features)}')
"
```

---

## Files Created

| File | Purpose | Size |
|------|---------|------|
| `IMPLEMENTATION_PLAN.md` | 4-week implementation roadmap | 14KB |
| `DATA_AND_IMPROVEMENT_FINDINGS.md` | Complete analysis & code examples | 21KB |
| `SUMMARY.md` | Executive summary | 9KB |
| `QUICK_START.md` | This guide | 4KB |
| `scripts/generate_sample_parcels.py` | Data generator tool | 18KB |
| `data/ghana_sample.geojson` | Sample Ghana parcels | 15KB |

---

## Verified Data Sources

### 1. CERSGIS Ghana Cocoa (21,031 parcels)
- **URL**: https://zenodo.org/records/16579443
- **Region**: Ghana Ashanti
- **License**: Open Access
- **Format**: GeoJSON/Shapefile

### 2. SITEX Dehesa (5,000+ parcels)
- **URL**: https://sitex.gobex.es/
- **Region**: Spain Extremadura
- **License**: CC-BY 4.0
- **Format**: Shapefile/GeoJSON/WMS

### 3. Ethiopia Coffee (1,000+ parcels)
- **URL**: https://ethiopia.opendataforafrica.org/
- **Region**: Ethiopia Oromia
- **License**: Open Data
- **Format**: Various

---

## Need Help?

### Data Questions
- See `DATA_AND_IMPROVEMENT_FINDINGS.md` for detailed analysis
- Check the verified sources list above

### Implementation Questions
- See `IMPLEMENTATION_PLAN.md` for technical details
- Check code examples in the findings document

### Quick Wins
1. Load sample data (2 hours)
2. Fix colors (1 day)
3. Fix opacity (1 day)

---

## Next Steps

1. **Today**: Generate sample data and view in geojson.io
2. **This Week**: Import sample data into your database
3. **Next Week**: Start implementing Plot Inbox feature
4. **Ongoing**: Follow the 4-week implementation plan

---

**Status**: ✅ Ready to use  
**Version**: 1.0  
**Last Updated**: 2026-09-19
