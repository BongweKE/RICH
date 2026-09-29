// MapLibre GL's tile/geometry worker must be served as its own module file.
//
// maplibre-gl v6 resolves the worker relative to its own bundle chunk via
// `new URL('./maplibre-gl-worker.mjs', import.meta.url)` and then starts it as
// a module worker. That path is built dynamically, so Vite cannot statically
// analyse it, never emits the worker asset, and the browser gets a 404
// (`/assets/maplibre-gl-worker.mjs`). MapLibre then fails with "Worker failed to
// load" and the map renders nothing at all.
//
// Bundling the worker here via Vite's `?worker&url` emits a self-contained
// worker (including its `maplibre-gl-shared.mjs` dependency) and returns its
// URL, which we register with setWorkerUrl() before any Map instance exists.
// Importing this module for its side effect (see main.tsx) applies the setting
// to the single shared maplibre-gl module instance used by every map.
import * as maplibregl from 'maplibre-gl';
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

maplibregl.setWorkerUrl(maplibreWorkerUrl);

export default maplibregl;
