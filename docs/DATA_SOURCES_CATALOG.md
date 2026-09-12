# RICH Data Sources Catalog

## Overview

This document catalogs the geospatial, thematic, and reference data sources available for the RICH LUMENS-GEV implementation. Data sources are categorized by type, jurisdiction, and suitability for agroforestry mapping and analysis.

---

## 1. Base Geospatial Data

### 1.1 Satellite Imagery

#### Optical Imagery

| Source | Sensor | Resolution | Temporal | Coverage | License | Access | Priority |
|--------|--------|------------|----------|----------|---------|--------|----------|
| Sentinel-2 | MSI | 10m | 5 days | Global | Open (ESA) | Copernicus Open Access Hub | HIGH |
| Landsat 8/9 | OLI/TIRS | 30m | 16 days | Global | Open (USGS) | EarthExplorer, STAC | MEDIUM |
| PlanetScope | PS2/PS3 | 3-5m | Daily | Global | Commercial | Planet API | LOW |
| Google Earth | Various | 0.5-10m | Historical | Global | Commercial | Google Earth API | LOW |

**Recommended**: Sentinel-2 as primary source (open, high resolution, frequent updates)

#### Synthetic Aperture Radar (SAR)

| Source | Sensor | Resolution | Temporal | Coverage | License | Access | Priority |
|--------|--------|------------|----------|----------|---------|--------|----------|
| Sentinel-1 | C-SAR | 10-40m | 6-12 days | Global | Open (ESA) | Copernicus SciHub | HIGH |
| ALOS-2 | PALSAR-2 | 3-10m | Variable | Select | Open (JAXA) | ASF DAAC | MEDIUM |
| SAOCOM | L-SAR | 10-100m | Variable | S. America | Open | CONAE | LOW |

**Recommended**: Sentinel-1 for cloud-penetrating capability essential for tropical regions

#### LiDAR

| Source | Sensor | Resolution | Coverage | License | Access | Priority |
|--------|--------|------------|----------|---------|--------|----------|
| GEDI | L4A | 25m | 51°N-51°S | Open (NASA) | Earthdata | HIGH |
| ICESat-2 | ATLAS | 17m | Global | Open (NASA) | NSIDC | MEDIUM |
| National LiDAR | Various | 1-5m | Select countries | Varies | National agencies | LOW |

**Recommended**: GEDI L4A for canopy height and structure (critical for agroforestry)

#### Historical Imagery

| Source | Period | Resolution | Access | Priority |
|--------|--------|------------|--------|----------|
| Landsat Archive | 1972-present | 30m-80m | USGS EarthExplorer | HIGH |
| Sentinel-2 Archive | 2015-present | 10m | Copernicus SciHub | HIGH |
| CORONA | 1960s-1980s | 2-8m | USGS | LOW |

---

## 2. Land Cover & Land Use Data

### 2.1 Global Products

| Product | Resolution | Update Freq. | Classes | License | Access | Agroforestry | Priority |
|---------|------------|--------------|---------|---------|--------|--------------|----------|
| ESA WorldCover | 10m | Annual | 11 | Open | Copernicus | NO | HIGH |
| Copernicus LC | 20m | Annual | 23 | Open | Copernicus | NO | HIGH |
| GLAD | 30m | Annual | Many | Open | WRI | NO | MEDIUM |
| MODIS LCT | 500m | Annual | 17 | Open | USGS | NO | LOW |
| GLCNMO | 30m | 2015, 2020 | 10 | Open | Chen et al. | NO | MEDIUM |
| From-GLC | 10m | Annual | 10 | Open | Pawsey | NO | MEDIUM |

**Note**: None of the global products include agroforestry as a discrete class - this is the gap RICH addresses.

### 2.2 Regional Products

| Product | Region | Resolution | Year | Agroforestry | Access | Priority |
|---------|--------|------------|------|--------------|--------|----------|
| African LC | Africa | 20m | 2020 | NO | Copernicus | MEDIUM |
| SEAD | Ghana, Vietnam | 10m | 2020-2025 | PARTIAL | Sample Earth | HIGH |
| Planted | Global | 10m | 2020 | Tree crops | Planted Dataset | HIGH |
| Global Forest Watch | Global | 30m | Annual | NO | WRI | MEDIUM |

**Recommended**: 
- Sample Earth (SEAD) for Ghana cocoa/coffee reference data
- Planted dataset for tree crop identification

### 2.3 National Products

**Ghana**:
- Ghana Land Cover Map (2020) - 10m resolution
- Forest/Non-Forest Map - Various years
- Cocoa Farm Mapping - Industry sources
- Ghana Statistical Service - Agricultural census

**Ethiopia**:
- Ethiopia Land Cover (2020) - 10m
- Coffee Farm Mapping - Various studies
- Forest Inventory Data - EFAP
- Agricultural Sample Survey

---

## 3. Reference Data for Model Training

### 3.1 Existing Datasets

| Dataset | Type | Coverage | Points | Classes | Access | Priority |
|---------|------|----------|--------|---------|--------|----------|
| Sample Earth v1.1 | ML-ready | Ghana, Vietnam | 100,000+ | Cocoa, Coffee | Harvard Dataverse | HIGH |
| Helmets Labelling Crops | Helmet camera | Kenya | 10,000+ | Multiple crops | Scientific Data | HIGH |
| CIFOR-ICRAF Plots | Field plots | Africa-wide | 1,000+ | Agroforestry | Internal | HIGH |
| Planted Benchmark | Planted forests | Global | N/A | Tree crops | IGARSS | HIGH |
| Global Forest Watch Samples | Reference | Global | 100,000+ | Forest/Non-forest | WRI | MEDIUM |

**Key Datasets**:
- **Sample Earth**: Machine-learning-ready reference dataset with 10m satellite composites
- **CIFOR-ICRAF Plots**: Existing geotagged agroforestry plot database spanning multiple years
- **Helmets Labelling Crops**: Kenya crop type dataset created via helmet-mounted cameras

### 3.2 Required New Data Collection

**Target**: 2,000 validated reference points across pilot landscape

**Classification Scheme**:
- Main Classes (8-10):
  - Multistrata agroforestry
  - Monoculture tree crops
  - Natural forest
  - Active cropland
  - Improved fallow
  - Grassland
  - Settlement
  - Bare soil

**Sub-classes**:
- Cocoa-shade
- Coffee-shade
- Faidherbia parkland
- Other specific system types

**Metadata per Point**:
- Class label
- System sub-type
- Validator identity and affiliation
- GPS acquisition date
- Quality control score
- Pre-computed AlphaEarth embedding vector (64-dim)
- Temporal metadata (link to annual satellite composite)

---

## 4. Thematic Data

### 4.1 Climate Data

| Source | Variables | Resolution | Temporal | Coverage | License | Access | Priority |
|--------|-----------|------------|----------|----------|---------|--------|----------|
| ERA5 | Temperature, Precipitation, etc. | 31km | Hourly | Global | C3S Terms | CDS | HIGH |
| CHIRPS | Precipitation | 5km | Daily | 50°S-50°N | Open | CHC | HIGH |
| WorldClim | Climate normals | 1km | Static | Global | Open | WorldClim | MEDIUM |
| NASA POWER | Solar, Temp, Humidity | 0.5° | Daily | Global | Open | NASA | MEDIUM |
| CMIP6 | Climate projections | Variable | Variable | Global | Open | ESGF | LOW |

**Recommended**: ERA5 for current climate, CHIRPS for precipitation, CMIP6 for projections

### 4.2 Soil Data

| Source | Variables | Resolution | Coverage | License | Access | Priority |
|--------|-----------|------------|----------|---------|--------|----------|
| SoilGrids | pH, Organic Carbon, etc. | 250m | Global | Open (CC-BY) | SoilGrids | HIGH |
| AfSIS | Soil properties | 1km | Africa | Open | AfSIS | HIGH |
| ISRIC | World Soil Information | 1km | Global | Open | ISRIC | MEDIUM |
| HWSD | Soil properties | 1km | Global | Open | FAO | MEDIUM |

**Recommended**: SoilGrids + AfSIS for Africa

### 4.3 Biodiversity Data

| Source | Variables | Resolution | Coverage | License | Access | Priority |
|--------|-----------|------------|----------|---------|--------|----------|
| GBIF | Species occurrences | Point | Global | Open | GBIF | MEDIUM |
| eBird | Bird observations | Point | Global | Open | eBird | LOW |
| IUCN | Species ranges | Variable | Global | Open | IUCN | MEDIUM |
| GEDI Biomass | AGB | 25m | 51°N-51°S | Open | NASA | HIGH |
| Tree Cover | Canopy cover | 30m | Global | Open | Global Forest Watch | HIGH |

**Recommended**: GEDI Biomass + Global Forest Watch Tree Cover

### 4.4 Socioeconomic Data

| Source | Variables | Resolution | Coverage | License | Access | Priority |
|--------|-----------|------------|----------|---------|--------|----------|
| WorldPop | Population | 100m | Global | Open (CC-BY) | WorldPop | HIGH |
| GPW | Population | 1km | Global | Open | NASA | MEDIUM |
| DHS | Household surveys | Point | Africa | Restricted | DHS | HIGH |
| LSMS | Living Standards | Point | Africa | Open | World Bank | HIGH |
| AfDB | Infrastructure | Variable | Africa | Open | AfDB | MEDIUM |

**Recommended**: WorldPop for population, DHS/LSMS for household data

---

## 5. Administrative & Boundary Data

### 5.1 Administrative Boundaries

| Source | Level | Resolution | Coverage | License | Access | Priority |
|--------|-------|------------|----------|---------|--------|----------|
| GADM | 0-4 | Variable | Global | Open (CC-BY) | GADM | HIGH |
| OSM | All | Variable | Global | ODbL | OSM | HIGH |
| National | All | High | Country-specific | Varies | National agencies | HIGH |
| FAO GAUL | All | Variable | Global | Open | FAO | MEDIUM |

**Recommended**: GADM for consistency, supplemented by OSM for detail

### 5.2 Land Tenure & Cadastral Data

| Source | Coverage | Resolution | Access | Priority |
|--------|----------|------------|--------|----------|
| National Cadastre | Varies | Parcel | Restricted | HIGH |
| Open Land Matrix | Global | Point | Open | MEDIUM |
| LandMark | Global | Polygon | Open | MEDIUM |
| FAO AQUASTAT | Global | Variable | Open | LOW |

**Note**: Land tenure data is often restricted; need to establish partnerships for access

---

## 6. Infrastructure & Built Environment

| Source | Variables | Resolution | Coverage | License | Access | Priority |
|--------|-----------|------------|----------|---------|--------|----------|
| OSM | Roads, Buildings | Variable | Global | ODbL | OSM | HIGH |
| Google Roads | Roads | Variable | Global | Commercial | Google | LOW |
| OpenStreetMap | All infrastructure | Variable | Global | ODbL | OSM | HIGH |
| World Bank Infrastructure | Projects | Point | Global | Open | World Bank | MEDIUM |

**Recommended**: OSM as primary source for built environment data

---

## 7. Climate Policy & Finance Data

### 7.1 Policy Boundaries

| Source | Type | Coverage | Access | Priority |
|--------|------|----------|--------|----------|
| EUDR | Deforestation-free | EU imports | Open | HIGH |
| REDD+ | Project areas | Global | Open | HIGH |
| NDCs | National commitments | Global | Open | HIGH |
| Protected Areas | Conservation | Global | Open | HIGH |
| Ramsar | Wetlands | Global | Open | MEDIUM |

### 7.2 Climate Finance

| Source | Type | Coverage | Access | Priority |
|--------|------|----------|--------|----------|
| FCPF | Results-based payments | Global | Open | HIGH |
| Green Climate Fund | Projects | Global | Open | MEDIUM |
| Climate Funds | Investment | Global | Open | MEDIUM |

---

## 8. Authoritative Data Sources for African Jurisdictions

### 8.1 Ghana

**Satellite Data**:
- Sentinel-2: Full coverage, frequent updates
- Landsat: Historical archive available
- GEDI: Full coverage for canopy structure

**Land Cover**:
- Ghana Land Cover Map (2020) - 10m resolution (Ministry of Lands and Natural Resources)
- Forest/Non-Forest Maps - Various years from Forestry Commission
- Cocoa Farm Mapping - Industry sources (need partnerships)

**Administrative**:
- GADM Level 0-4: Available
- Ghana Statistical Service: District boundaries
- Electoral Commission: Constituency boundaries

**Soils**:
- SoilGrids: Full coverage
- AfSIS: Partial coverage
- National Soil Survey: Detailed for some areas

**Climate**:
- Ghana Meteorological Agency: Station data
- ERA5: Full coverage
- CHIRPS: Full coverage for precipitation

**Socioeconomic**:
- Ghana Statistical Service: Census data (2010, 2021)
- Living Standards Survey: Household data
- DHS: Health and demographic data

**Forestry/Agriculture**:
- Forestry Commission: Forest inventory
- Ministry of Food and Agriculture: Agricultural statistics
- Tree Crop Development Authority: Cocoa sector data

**Reference Data**:
- Sample Earth: Ghana cocoa/coffee (Vantalon et al., 2025)
- CIFOR-ICRAF: Field plot data available

### 8.2 Ethiopia

**Satellite Data**:
- Sentinel-2: Full coverage
- Landsat: Historical archive
- GEDI: Full coverage

**Land Cover**:
- Ethiopia Land Cover (2020) - 10m (Ethiopian Space Science and Technology Institute)
- Coffee Farm Mapping - Various studies (need to identify)
- Forest Inventory - Ethiopian Forest Development

**Administrative**:
- GADM Level 0-4: Available
- Central Statistical Agency: Administrative boundaries

**Soils**:
- SoilGrids: Full coverage
- AfSIS: Partial coverage
- National Soil Survey: Detailed for some regions

**Climate**:
- National Meteorological Agency: Station data
- ERA5: Full coverage
- CHIRPS: Full coverage

**Socioeconomic**:
- Central Statistical Agency: Census data
- LSMS: Household surveys
- DHS: Health data

**Forestry/Agriculture**:
- Ethiopian Forest Development: Forest data
- Ministry of Agriculture: Agricultural statistics
- Coffee and Tea Authority: Coffee sector data

**Reference Data**:
- CIFOR-ICRAF: Field plot data available
- Existing agroforestry studies (need to catalog)

### 8.3 Cote d'Ivoire

**Satellite Data**:
- Sentinel-2: Full coverage
- Landsat: Historical archive
- GEDI: Full coverage

**Land Cover**:
- National land cover maps available
- Cocoa farm mapping (industry and research)

**Administrative**:
- GADM: Available
- National agencies: Detailed boundaries

**Agriculture**:
- Coffee-Cocoa Centre: Sector data
- Ministry of Agriculture: Statistics

**Reference Data**:
- Sample Earth: Cocoa reference data

### 8.4 Kenya

**Satellite Data**:
- Sentinel-2: Full coverage
- Landsat: Historical archive
- GEDI: Full coverage

**Land Cover**:
- Kenya Land Cover (2020-2023)
- National forest inventory

**Reference Data**:
- Helmets Labelling Crops (Nakalembe et al., 2025)
- Existing agricultural surveys

---

## 9. Data Access & Licensing Summary

### 9.1 License Types

| License | Restrictions | Commercial Use | Attribution Required | Examples |
|---------|--------------|----------------|---------------------|----------|
| Open (CC0/PDDL) | None | Yes | No | Natural Earth, SoilGrids |
| Open (CC-BY) | Attribution | Yes | Yes | SoilGrids, WorldPop |
| Open (ODbL) | Share-alike | Yes | Yes | OpenStreetMap |
| Copernicus | Attribution, no misuse | Yes | Yes | Sentinel, ERA5 |
| NASA | None | Yes | Yes (courtesy) | GEDI, Landsat |
| Non-Commercial | No commercial use | No | Yes | TeleGeography (excluded) |
| Commercial | Paid license required | Yes (with license) | As per license | Planet, Google |

### 9.2 Access Methods

| Access Method | Description | Use Case | Examples |
|---------------|-------------|----------|----------|
| Direct Download | Bulk download from portal | Large datasets | Copernicus SciHub, EarthExplorer |
| API | Programmatic access | Automated workflows | Copernicus Open Access Hub, NASA Earthdata |
| STAC | SpatioTemporal Asset Catalog | Cloud-native access | Planet, Element84 |
| OGC Services | WMS, WCS, WFS | Standardized access | Various providers |
| GitHub | Version-controlled | Reference datasets | Sample Earth, GADM |

### 9.3 Recommended Access Strategy

1. **Open Data**: Direct download + local caching
2. **API Data**: Automated ingestion with rate limiting
3. **Commercial Data**: Evaluate cost-benefit, seek partnerships
4. **Restricted Data**: Establish data sharing agreements
5. **Reference Data**: Download + embed in system

---

## 10. Data Storage & Management

### 10.1 Storage Requirements

| Data Type | Estimated Size | Storage Strategy | Format |
|-----------|----------------|------------------|--------|
| Reference Points | 10-50MB | Neon Postgres | Point (4326) |
| Agroforestry Parcels | 100MB-1GB | Neon Postgres | Polygon (4326) |
| Satellite Imagery | 1-10TB | Neon Object Storage | COG |
| Land Cover Maps | 1-100GB | Neon Object Storage | COG |
| Climate Data | 1-10GB | Neon Object Storage | NetCDF/GeoTIFF |
| Soil Data | 1-10GB | Neon Object Storage | GeoTIFF |
| Document Embeddings | 10-100MB | Neon Postgres | Vector |
| Scenario Results | 100MB-1GB | Neon Postgres | JSONB |

### 10.2 Data Processing Pipeline

```
1. Ingestion
   - Discover available datasets
   - Check licensing and access
   - Download or stream data
   
2. Preprocessing
   - Reproject to common CRS (EPSG:4326 or local UTM)
   - Clean and validate data
   - Extract metadata
   - Check quality
   
3. Processing
   - For rasters: Create Cloud Optimized GeoTIFFs (COG)
   - For vectors: Simplify if needed, validate topology
   - Generate overviews/pyramids
   - Create spatial indexes
   
4. Indexing
   - Build PostGIS spatial indexes
   - Generate vector embeddings
   - Create HNSW indexes for vector search
   - Build keyword indexes for document search
   
5. Cataloging
   - Store in database with full metadata
   - Create provenance records
   - Set access controls
   - Enable discovery
```

### 10.3 Data Versioning

- All data stored with version information
- Provenance tracking for all derived products
- Change history for updates
- Rollback capability for errors

---

## 11. Data Quality & Validation

### 11.1 Quality Control Workflow

```
Stage 1: Automated Checks
- Spatial validity (no null geometries, valid polygons)
- Attribute completeness (all required fields present)
- Projection consistency (all data in expected CRS)
- Temporal alignment (data matches time period)
- Format validation (valid GeoJSON, COG, etc.)

Stage 2: Statistical Validation
- Outlier detection (statistical tests)
- Distribution analysis (compare with expectations)
- Consistency with reference data (cross-check with known sources)
- Temporal coherence (check for unrealistic changes)

Stage 3: Expert Review
- Visual inspection of samples (manual review)
- Domain expert validation (subject matter experts)
- Cross-source comparison (compare with multiple sources)
- Anomaly investigation (resolve identified issues)

Stage 4: Community Validation
- Stakeholder workshops (group review sessions)
- Local expert review (local knowledge integration)
- Active learning (corrections feed back into system)
- Field verification (ground truthing where possible)
```

### 11.2 Accuracy Metrics

| Metric | Description | Target | Measurement |
|--------|-------------|--------|-------------|
| Overall Accuracy | % of correctly classified pixels | >85% | Confusion matrix |
| Producer's Accuracy | % of reference correctly classified | >80% | Per-class metrics |
| User's Accuracy | % of classified that is correct | >80% | Per-class metrics |
| Kappa Coefficient | Agreement beyond chance | >0.8 | Statistical test |
| F1 Score | Harmonic mean of precision/recall | >0.8 | Per-class metrics |

### 11.3 Uncertainty Quantification

1. **Classification Uncertainty**
   - Confusion matrix-based probabilities
   - Ensemble model disagreement
   - Soft classification outputs

2. **Spatial Uncertainty**
   - Boundary fuzzy zones (buffer distances)
   - Positional accuracy metrics (GPS error)
   - Resolution limitations (pixel size)

3. **Temporal Uncertainty**
   - Change detection confidence
   - Temporal alignment errors
   - Seasonal variation impacts

4. **Visualization**
   - Transparency/opacity based on confidence
   - Color gradients for uncertainty levels
   - Interactive uncertainty exploration

---

## 12. Data Gap Analysis & Mitigation

### 12.1 Identified Gaps

| Gap | Impact | Mitigation Strategy |
|-----|--------|---------------------|
| No agroforestry class in global maps | Primary challenge | Create new reference dataset and classification |
| Limited high-res historical imagery | Change detection | Use multi-sensor fusion, accept lower resolution for history |
| Cloud cover in tropics | Data quality | Use SAR (Sentinel-1) to complement optical |
| Field reference data gaps | Model accuracy | AI-assisted interpretation + community validation |
| Socioeconomic data granularity | Analysis depth | Use proxies (night lights, roads) where needed |
| Land tenure data | Policy relevance | Establish partnerships for access |

### 12.2 Data Fusion Strategies

1. **Multi-Sensor Fusion**
   - Combine Sentinel-2 (optical) + Sentinel-1 (SAR) + GEDI (LiDAR)
   - Use AlphaEarth embeddings that already integrate multiple sources
   - Temporal fusion for cloud cover mitigation

2. **Multi-Scale Fusion**
   - Use high-resolution data for training/validation
   - Use medium-resolution data for wall-to-wall mapping
   - Use low-resolution data for temporal analysis

3. **Multi-Source Fusion**
   - Combine official statistics with remote sensing
   - Integrate field surveys with satellite observations
   - Use crowd-sourced data (OSM) for built environment

---

## 13. Next Steps for Data Acquisition

### 13.1 Immediate Actions (Week 1-2)

1. **Establish Data Inventory**
   - Create spreadsheet of all identified data sources
   - Document access methods and credentials needed
   - Prioritize by jurisdiction and importance

2. **Set Up Access**
   - Register for Copernicus Open Access Hub
   - Set up NASA Earthdata account
   - Apply for other required APIs

3. **Begin Download**
   - Start with Sentinel-2 for Ghana (priority jurisdiction)
   - Download GADM boundaries for target countries
   - Acquire Sample Earth reference data

4. **Establish Storage**
   - Set up Neon Object Storage buckets
   - Configure database schema
   - Set up data catalog

### 13.2 Short-term Actions (Month 1-3)

1. **Ingest Baseline Data**
   - Complete data acquisition for Ghana
   - Process and store in system
   - Begin data for Ethiopia

2. **Quality Control**
   - Run automated QC on all ingested data
   - Conduct expert review of samples
   - Document data quality issues

3. **Gap Filling**
   - Identify and prioritize data gaps
   - Establish partnerships for restricted data
   - Begin data fusion experiments

### 13.3 Medium-term Actions (Month 3-6)

1. **Complete Data for Phase 1**
   - All data for Ghana and Ethiopia ingested
   - All reference data collected and validated
   - Quality control complete

2. **Begin Phase 2 Data**
   - Start data acquisition for Cote d'Ivoire and Kenya
   - Set up automated data update pipelines

3. **Advanced Processing**
   - Implement AlphaEarth embedding generation
   - Set up geospatial RAG system
   - Begin model training with reference data

---

## 14. Appendices

### Appendix A: Data Source URLs

**Copernicus Open Access Hub**: https://scihub.copernicus.eu/
**USGS EarthExplorer**: https://earthexplorer.usgs.gov/
**NASA Earthdata**: https://earthdata.nasa.gov/
**GADM**: https://gadm.org/
**SoilGrids**: https://soilgrids.org/
**WorldPop**: https://www.worldpop.org/
**GBIF**: https://www.gbif.org/
**Sample Earth**: https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/SWPENT
**CIFOR-ICRAF Data**: [Internal - need access]

### Appendix B: License Text

Key licenses referenced:
- **CC-BY 4.0**: Creative Commons Attribution
- **ODbL 1.0**: Open Database License
- **PDDL 1.0**: Open Data Commons Public Domain Dedication
- **Copernicus**: ESA Copernicus Open Data License
- **NASA**: NASA Earth Science Data Policy

### Appendix C: Data Provenance Template

```yaml
source:
  name: ""
  url: ""
  license: ""
  license_url: ""
  terms_of_use: ""
  attribution: ""

dataset:
  name: ""
  version: ""
  date_retrieved: ""
  format: ""
  crs: ""
  extent:
    bbox: [min_lon, min_lat, max_lon, max_lat]
    temporal: [start_date, end_date]
  resolution: ""

processing:
  steps: []
  software: ""
  date_processed: ""
  quality_control: ""

storage:
  location: ""
  format: ""
  size_bytes: 0
  checksum: ""

access:
  public: true/false
  restrictions: ""
  citation: ""
```

---

*Document Version: 1.0*
*Last Updated: 2026-09-10*
*Status: Draft - Awaiting Data Verification*
