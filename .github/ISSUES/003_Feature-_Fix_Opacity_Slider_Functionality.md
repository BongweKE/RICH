---
title: [Feature]: Fix Opacity Slider Functionality
labels: P1, frontend, geospatial
---

## Problem\nOpacity slider exists in LayerPanel but doesn't affect map visualization. Users cannot adjust layer transparency.\n\n## Solution\n1. Add LayerOpacityState to types\n2. Implement opacity sliders in LayerPanel\n3. Apply opacity dynamically in MapViewer via setPaintProperty\n\n## Acceptance Criteria\n- [ ] Opacity sliders work for all layers\n- [ ] Changes are visible on map in real-time\n- [ ] Default opacity values are sensible\n- [ ] Opacity persists across page refreshes\n\n## Priority\nP1 - Visualization improvement\n\n## Area\nfrontend, geospatial

---
*Generated from ISSUES_TO_CREATE.csv on 2026-09-19*
*Priority: frontend, geospatial*
*Area: *
