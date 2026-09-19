---
title: [Feature]: Load Real Geospatial Data (26,000+ Parcels)
labels: enhancement, data, geospatial, P1 - High Priority
---

## Problem\nCurrently RICH only displays 4 hardcoded sample parcels with empty geometries. The platform lacks real geospatial data for meaningful visualization and analysis.\n\n## Verified Data Sources (All Approved)\n- **CERSGIS Ghana Cocoa** - 21,031 parcels (https://zenodo.org/records/16579443)\n- **SITEX Dehesa** - ~5,000+ parcels (https://sitex.gobex.es/)\n- **Ethiopia Coffee** - 1,000+ parcels (https://ethiopia.opendataforafrica.org/)\n\nAll meet criteria: 100+ parcels, reputable, verified, open license, recent (2020-2025).\n\n## Solution\nUse scripts/generate_sample_parcels.py to generate 300 sample parcels across all regions.\n\n## Acceptance Criteria\n- [ ] 100+ real parcels loaded in database\n- [ ] Parcels display on map with proper geometries\n- [ ] All 3 regions (GH-AH, ET-OR, ES-EX) have sample data\n- [ ] Source attribution preserved in metadata\n\n## Priority\nP1 - Data foundation\n\n## Area\ngeospatial, data

---
*Generated from ISSUES_TO_CREATE.csv on 2026-09-19*
*Priority: P1*
*Area: geospatial, data*
