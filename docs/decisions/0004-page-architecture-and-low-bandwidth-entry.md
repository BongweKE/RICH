# 4. Page Architecture and Low-Bandwidth Entry

Date: 2026-09-29

## Status

Accepted

## Context

The RICH platform serves two very different audiences from one SPA:

1. Planners, extension officers, and NGO staff — often on mid-range Android
   phones, intermittent 3G, and paying per megabyte.
2. Funders and partners evaluating impact — desktop, good connectivity,
   expecting a polished visual.

Previously `/` was the 3D "tactical" map, which forced every visitor to
download the map stack (maplibre-gl plus tile traffic) before understanding
what the platform does. User testing also found: the telemetry dossier
rendered underneath the layers panel (both absolutely positioned at the same
corner), the planner validation inbox was unpaginated and lost decisions on
navigation, and there was no place to learn the workflow before opening a map.

## Decision

1. **Landing page at `/`** — server-light, no map, no WebGL: hero explaining
   the platform, feature cards that link to each tool with an honest data-cost
   label per destination, and a Learn section with concise how-to cards. This
   is the low-bandwidth front door.
2. **Routes**: `/` landing, `/impact` the 3D impact viewer (unchanged
   identity), `/planner` the governance planner. The SPA router is a tiny
   path hook; no router dependency is added.
3. **Impact viewer**: the left overlays (layers, telemetry) collapse into a
   single docked rail with two tabs, eliminating the z-order collision.
4. **Planner validation inbox**: paginated (10 per page) inside a scrollable
   region; each decision is POSTed to the API immediately with per-row status
   (saving / saved / failed with retry), because field officers work in
   short connectivity windows and must never lose a decision.
5. **Onboarding**: each map page offers a short checkpoint tour (5 steps,
   dismissible, remembered in `localStorage`) distinct from the cinematic
   fly-through already on the impact viewer.
6. **Planner map**: a persistent legend (subtypes + provenance key), a
   click popup with parcel facts, and demo-data labelling throughout.

## Consequences

- Links in the wild pointing to `/` now land on a lightweight page; the map
  is one deliberate click away.
- The FastAPI SPA fallback already serves any path, so no backend routing
  change is needed beyond what exists.
- Feature-card cost labels must be kept honest as the bundle changes.
