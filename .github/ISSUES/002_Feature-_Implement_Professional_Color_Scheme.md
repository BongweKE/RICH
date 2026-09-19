---
title: [Feature]: Implement Professional Color Scheme
labels: P1, design, frontend, geospatial
---

## Problem\nAll parcels currently use hardcoded #10b981 (emerald green) color. No visual differentiation between agroforestry subtypes (shade_cocoa, dehesa, etc.).\n\n## Solution\nImplement Viridis-based scientific color palette:\n- agroforestry: #2ca25f\n- forest: #267838\n- cropland: #fdae61\n- grassland: #d1e5fe\n- settlement: #e7298a\n- water: #636eva\n\nSubtype-specific colors for better visual distinction.\n\n## Acceptance Criteria\n- [ ] Color palette defined in types/index.ts\n- [ ] MapViewer uses subtype-specific colors\n- [ ] Colors follow scientific visualization best practices\n- [ ] Color legend added to UI\n\n## Priority\nP1 - Visualization improvement\n\n## Area\ndesign, frontend, geospatial

---
*Generated from ISSUES_TO_CREATE.csv on 2026-09-19*
*Priority: design, frontend, geospatial*
*Area: *
