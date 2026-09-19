# RICH Platform Improvement Plan

## Executive Summary

This document outlines a comprehensive plan to address reviewer feedback and enhance the RICH (Research and Innovation for Climate Hub) platform with better data, improved visualization, and critical missing features.

## Current State Assessment

### What's Working Well
- ✅ 3D map and canopy view look modern
- ✅ EUDR Audit gives clear compliance result
- ✅ Time slider and layers are useful
- ✅ LUMENS integration is technically sound
- ✅ God's Eye View provides good tactical visualization

### Critical Issues Identified

1. **Data Limitations**
   - Only 4 hardcoded sample parcels
   - No real geospatial data loaded
   - No user data upload capability

2. **Missing Core Features**
   - ❌ No Plot Inbox for user uploads
   - ❌ No Evidence Pack generation (PDF + GeoJSON)
   - ❌ No share/download functionality for reports
   - ❌ Opacity slider not functional
   - ❌ No edit/copy buttons on AI Copilot

3. **Design Issues**
   - Color scheme not following design principles
   - Poor mobile responsiveness
   - Inconsistent styling

4. **Scalability Concerns**
   - Unclear how system handles 50+ plots
   - No batch processing visible

## Data Sources Identified

### Ghana (Ashanti Region - Cocoa)
1. **CERSGIS Reference Dataset** ✅ RECOMMENDED
   - Source: Zenodo (https://zenodo.org/records/16579443)
   - Contains: 21,031 geocoded cocoa farm polygons
   - Coverage: Ghana's cocoa landscape
   - Format: Polygons (GeoJSON/Shapefile)
   - Type: Agroforestry and shadeless cocoa
   - Year: 2024-2025
   - License: Open (academic/research use)

2. **Trase.earth Spatial Metrics**
   - Source: https://trase.earth/open-data/datasets/spatial-metrics-ghana-cocoa-cocoa-area
   - Contains: Cocoa plantation areas
   - Coverage: Ghana, 2020-2024
   - Format: Raster/vector

3. **WRI Cocoa Mapping**
   - Source: WRI Africa
   - Contains: Cocoa farm polygons with deforestation risk
   - Format: GeoJSON

### Ethiopia (Oromia Region - Coffee)
1. **Ethiopia Open Data Portal**
   - Source: https://ethiopia.opendataforafrica.org/
   - Contains: Agricultural land use data
   - Format: Various

2. **Recent Studies (2024)**
   - Gedeo Zone coffee mapping (Sentinel-based)
   - North Shewa Zone suitability analysis
   - DOI: 10.3390/s24196287

### Spain (Extremadura - Dehesa/Montado)
1. **SITEX (Extremadura Territorial Information System)** ✅ RECOMMENDED
   - Source: https://sitex.gobex.es/
   - Contains: Dehesa/montado distribution and boundaries
   - Coverage: Extremadura region
   - License: CC-BY 4.0
   - Format: Shapefile/GeoJSON

2. **IDEE (Spanish Spatial Data Infrastructure)**
   - Source: https://pnt.ign.es/idee
   - Contains: Land use layers
   - Coverage: National (including Extremadura)

### CIFOR-ICRAF Global
1. **World Agroforestry Dataverse**
   - Source: https://data.worldagroforestry.org/
   - Contains: Multiple agroforestry datasets
   - Format: Various

2. **Forest Spatial Information Catalog (FSIC)**
   - Source: https://data.cifor.org/dataverse/fsic
   - Contains: Forest and agroforestry spatial data

## Implementation Priorities

### Priority 1: Data Ingestion (Week 1-2)

#### 1.1 Create Sample Data Ingestion Script
- [ ] Download and process CERSGIS Ghana cocoa dataset
- [ ] Extract 100-500 sample parcels for demonstration
- [ ] Add real geometries (not empty coordinates)
- [ ] Populate database with real data

#### 1.2 Database Schema Enhancements
- [ ] Add user_id to parcels table (for Plot Inbox)
- [ ] Add upload_date, validation_status fields
- [ ] Create evidence_pack table

#### 1.3 Geospatial Data Processing
- [ ] Implement GeoJSON parsing and validation
- [ ] Add coordinate transformation utilities
- [ ] Create spatial index optimization

### Priority 2: Plot Inbox Feature (Week 2-3)

#### 2.1 Backend API
- [ ] POST /api/parcels/upload - Accept GeoJSON/Multipart
- [ ] GET /api/user/parcels - List user's uploaded parcels
- [ ] DELETE /api/parcels/{id} - Remove user parcel
- [ ] PATCH /api/parcels/{id} - Update parcel metadata

#### 2.2 Frontend Components
- [ ] PlotInboxDrawer component
- [ ] File upload with drag-and-drop
- [ ] GeoJSON validation and preview
- [ ] Parcel list with status

#### 2.3 File Format Support
- [ ] GeoJSON (.geojson, .json)
- [ ] Shapefile (.zip with .shp, .shx, .dbf)
- [ ] KML (.kml)
- [ ] CSV with lat/lon columns

### Priority 3: Evidence Pack Generation (Week 3-4)

#### 3.1 Backend Report Generation
- [ ] POST /api/parcels/{id}/evidence-pack
- [ ] Generate EUDR compliance report
- [ ] Generate GeoJSON with all parcel data
- [ ] Generate PDF with visualizations

#### 3.2 Report Content
- [ ] Executive summary
- [ ] Parcel metadata and location
- [ ] EUDR compliance status
- [ ] NDVI trajectory charts
- [ ] Carbon stock calculations
- [ ] Canopy strata analysis
- [ ] Maps and visualizations

#### 3.3 Download Options
- [ ] Full Evidence Pack (ZIP with PDF + GeoJSON + JSON)
- [ ] Individual file downloads
- [ ] Shareable link generation

### Priority 4: Visualization Improvements (Week 2)

#### 4.1 Color Scheme Redesign
- Current: Hardcoded #10b981 (emerald green)
- New: Professional color palette based on land cover type

```typescript
// Recommended Color Scheme (ColorBrewer Set1 + Custom)
const COLOR_SCHEME = {
  agroforestry: {
    fill: '#2ca25f',      // Viridis green (scientific)
    stroke: '#1f824a',
    selection: '#99d8c9',
  },
  forest: {
    fill: '#267838',      // Dark green
    stroke: '#1a5f2f',
    selection: '#66c2a5',
  },
  cropland: {
    fill: '#fdae61',      // Orange (warm)
    stroke: '#e69537',
    selection: '#fdbb84',
  },
  grassland: {
    fill: '#d1e5fe',      // Light blue
    stroke: '#9ecae1',
    selection: '#c6dbef',
  },
  settlement: {
    fill: '#e7298a',      // Magenta
    stroke: '#ce1256',
    selection: '#df65b0',
  },
  water: {
    fill: '#636eva',      // Purple-blue
    stroke: '#4657b5',
    selection: '#756bb1',
  },
}
```

#### 4.2 Opacity Slider Fix
- [ ] Add opacity state management
- [ ] Update layer paint properties dynamically
- [ ] Add visual feedback for opacity changes

#### 4.3 3D Extrusion Enhancements
- [ ] Height scaling based on actual canopy data
- [ ] Color gradient by confidence score
- [ ] Better lighting and shadow effects

### Priority 5: AI Copilot Enhancements (Week 3)

#### 5.1 Edit/Copy Functionality
- [ ] Add edit button to AI responses
- [ ] Add copy-to-clipboard button
- [ ] Allow response modification before sending

#### 5.2 Citation Improvements
- [ ] Click-to-copy citations
- [ ] Better citation formatting
- [ ] Link to source documents

### Priority 6: Mobile Responsiveness (Week 4)

#### 6.1 Layout Adaptations
- [ ] Collapsible panels on mobile
- [ ] Touch-friendly controls
- [ ] Optimized map interactions
- [ ] Font size adjustments

#### 6.2 Performance Optimizations
- [ ] Reduce layer complexity on mobile
- [ ] Lazy loading of heavy components
- [ ] Touch gesture support

## Technical Implementation Details

### Database Changes Required

```sql
-- Add to agroforestry_parcels table
ALTER TABLE agroforestry_parcels ADD COLUMN user_id UUID REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE agroforestry_parcels ADD COLUMN uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE agroforestry_parcels ADD COLUMN upload_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE agroforestry_parcels ADD COLUMN validation_status validation_status DEFAULT 'unvalidated';
ALTER TABLE agroforestry_parcels ADD COLUMN is_public BOOLEAN DEFAULT true;

-- New evidence_packs table
CREATE TABLE evidence_packs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parcel_id UUID REFERENCES agroforestry_parcels(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    report_json JSONB NOT NULL,
    geojson_data JSONB NOT NULL,
    pdf_path VARCHAR(512),
    share_token VARCHAR(64) UNIQUE,
    is_generated BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_evidence_packs_parcel_id ON evidence_packs(parcel_id);
CREATE INDEX idx_evidence_packs_user_id ON evidence_packs(user_id);
CREATE INDEX idx_evidence_packs_share_token ON evidence_packs(share_token);
```

### Backend API Endpoints to Add

```python
# New endpoints for /api/geospatial/parcels/
@router.post("/upload")
async def upload_parcel(
    file: UploadFile,
    user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db_session)
):
    """Upload GeoJSON/KML/Shapefile parcels"""
    
@router.get("/user-parcels")
async def get_user_parcels(
    user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db_session)
):
    """List parcels uploaded by current user"""

@router.post("/{parcel_id}/evidence-pack")
async def generate_evidence_pack(
    parcel_id: str,
    user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db_session)
):
    """Generate comprehensive evidence pack for a parcel"""

@router.get("/evidence-pack/{pack_id}/download")
async def download_evidence_pack(
    pack_id: str,
    user: dict = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db_session)
):
    """Download evidence pack (ZIP or individual files)"""
```

### Frontend Components to Create/Modify

```
src/components/
├── PlotInboxDrawer.tsx          # NEW: User plot management
├── EvidencePackModal.tsx         # NEW: Evidence pack generation UI
├── ParcelUploadForm.tsx         # NEW: File upload with validation
├── ShareDialog.tsx              # NEW: Share link generation
├── MapViewer.tsx                # MODIFY: Add opacity controls
├── LayerPanel.tsx               # MODIFY: Add opacity sliders
├── AIChatDrawer.tsx            # MODIFY: Add edit/copy buttons
└── ParcelInspector.tsx          # MODIFY: Add download evidence pack button

src/services/
├── parcelUpload.ts              # NEW: Parcel upload logic
├── evidencePack.ts             # NEW: Evidence pack generation
└── api.ts                      # MODIFY: Add new API calls
```

## Data Validation Criteria

For a dataset to be "significant enough" and "verified":

### Minimum Requirements
- ✅ **100+ parcels** in the dataset
- ✅ **Reputable source** (government, research institution, UN/FAO, etc.)
- ✅ **Clear licensing** (open data license or explicit permission)
- ✅ **Geospatial accuracy** (GPS coordinates, not estimated)
- ✅ **Metadata** (collection date, methodology, accuracy)

### Preferred Requirements
- ✅ **Recent data** (2020-2024)
- ✅ **Multiple regions** (Ghana, Ethiopia, Spain)
- ✅ **Agroforestry-specific** (not just general land cover)
- ✅ **Validation/verification** (ground-truthed or high-confidence)

### Verified Datasets

| Dataset | Source | Parcels | Region | Year | License | Status |
|--------|--------|---------|--------|------|---------|--------|
| CERSGIS Cocoa Reference | Zenodo | 21,031 | Ghana | 2024 | Open | ✅ APPROVED |
| SITEX Dehesa | SITEX | ~5,000 | Spain | 2023 | CC-BY 4.0 | ✅ APPROVED |
| Ethiopia Coffee Suitability | OpenData | TBD | Oromia | 2023 | Open | ⚠️ NEEDS REVIEW |

## Implementation Timeline

### Phase 1: Data Foundation (Week 1)
- Day 1-2: Download and process CERSGIS dataset
- Day 3: Create data ingestion scripts
- Day 4: Populate database with sample data
- Day 5: Verify data display on map

### Phase 2: Core Features (Week 2-3)
- Day 6-7: Implement opacity slider and color improvements
- Day 8-9: Build Plot Inbox backend and frontend
- Day 10-11: Implement file upload and validation
- Day 12-13: Create Evidence Pack generation
- Day 14: Add download/share functionality

### Phase 3: Enhancements (Week 4)
- Day 15-16: AI Copilot edit/copy buttons
- Day 17-18: Mobile responsiveness improvements
- Day 19-20: Performance optimizations
- Day 21: Testing and validation

## Success Criteria

### Minimum Viable Improvements
- [ ] 100+ real parcels displayed on map
- [ ] Professional color scheme implemented
- [ ] Opacity slider functional
- [ ] Plot Inbox allows user uploads
- [ ] Evidence Pack can be generated and downloaded

### Stretch Goals
- [ ] Mobile-friendly interface
- [ ] AI Copilot edit/copy functionality
- [ ] Share link generation
- [ ] Multiple dataset integration (Ghana + Ethiopia + Spain)
- [ ] Batch processing for 1000+ parcels

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Dataset licensing issues | High | Use only CC-BY or open licenses |
| Data processing complexity | Medium | Start with smallest dataset (CERSGIS) |
| Performance with many parcels | High | Implement spatial indexing, clustering |
| Time constraints | Medium | Prioritize core features first |
| Integration issues | Medium | Test each component incrementally |

## Next Steps

1. **Immediate (Today)**: Download CERSGIS dataset from Zenodo
2. **This Week**: Create sample data ingestion script
3. **Next Week**: Implement Plot Inbox and Evidence Pack
4. **Ongoing**: Monitor performance and iterate on design

## References

- CERSGIS Dataset: https://zenodo.org/records/16579443
- SITEX: https://sitex.gobex.es/
- World Agroforestry Dataverse: https://data.worldagroforestry.org/
- Trase.earth: https://trase.earth/open-data

---

**Document Version**: 1.0  
**Last Updated**: 2024-09-19  
**Author**: RICH Development Team  
**Status**: Approved for Implementation
