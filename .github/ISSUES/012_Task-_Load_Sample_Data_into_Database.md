---
title: [Task]: Load Sample Data into Database
labels: P1, data, geospatial
---

## Problem\nNeed to populate database with sample data for development and testing.\n\n## Solution\n1. Run sample data generator:\n   ```bash\n   python scripts/generate_sample_parcels.py --count 300 --all-regions --output data/all_300.geojson --sql\n   ```\n2. Review generated SQL\n3. Import into database\n\n## Acceptance Criteria\n- [ ] data/all_300.geojson generated\n- [ ] data/all_300_inserts.sql generated\n- [ ] SQL imports successfully into database\n- [ ] 300 parcels visible in database\n- [ ] Parcels display correctly on map\n\n## Priority\nP1 - Immediate\n\n## Area\ndata, geospatial

---
*Generated from ISSUES_TO_CREATE.csv on 2026-09-19*
*Priority: data, geospatial*
*Area: *
