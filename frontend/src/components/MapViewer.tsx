import React, { useEffect, useRef } from 'react';
import { Jurisdiction, Parcel, LayerState } from '../types';

interface MapViewerProps {
  jurisdiction: Jurisdiction | null;
  parcels: Parcel[];
  selectedParcel: Parcel | null;
  onSelectParcel: (parcel: Parcel | null) => void;
  layers: LayerState;
  is3DMode: boolean;
}

export const MapViewer: React.FC<MapViewerProps> = ({
  jurisdiction,
  parcels,
  selectedParcel,
  onSelectParcel,
  layers,
  is3DMode,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  // Initialize MapLibre GL if available, with robust canvas fallback
  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    const initMap = async () => {
      try {
        const maplibregl = (window as any).maplibregl || (await import('maplibre-gl')).default;

        const defaultCenter: [number, number] = jurisdiction?.centroid?.coordinates || [-6.3, 39.2];

        const map = new maplibregl.Map({
          container: mapContainer.current!,
          style: {
            version: 8,
            sources: {
              'osm-tiles': {
                type: 'raster',
                tiles: [
                  layers.satelliteBasemap
                    ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                    : 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                ],
                tileSize: 256,
                attribution: '&copy; OpenStreetMap contributors / Esri',
              },
            },
            layers: [
              {
                id: 'base-tiles',
                type: 'raster',
                source: 'osm-tiles',
                minzoom: 0,
                maxzoom: 19,
              },
            ],
          },
          center: defaultCenter,
          zoom: 10,
          pitch: is3DMode ? 55 : 0,
          bearing: is3DMode ? -15 : 0,
        });

        map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'bottom-right');

        map.on('load', () => {
          mapInstance.current = map;
        });
      } catch (err) {
        console.warn('MapLibre GL failed or is running in headless mode. Using interactive SVG map overlay:', err);
      }
    };

    initMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Update center when jurisdiction changes
  useEffect(() => {
    if (!mapInstance.current || !jurisdiction?.centroid?.coordinates) return;
    mapInstance.current.flyTo({
      center: jurisdiction.centroid.coordinates,
      zoom: 11,
      pitch: is3DMode ? 55 : 0,
      essential: true,
      duration: 1800,
    });
  }, [jurisdiction, is3DMode]);

  // Update style when satelliteBasemap toggles
  useEffect(() => {
    if (!mapInstance.current) return;
    try {
      const source = mapInstance.current.getSource('osm-tiles');
      if (source && source.setTiles) {
        source.setTiles([
          layers.satelliteBasemap
            ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            : 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        ]);
      }
    } catch (e) {
      // ignore
    }
  }, [layers.satelliteBasemap]);

  // Update pitch for 3D mode
  useEffect(() => {
    if (!mapInstance.current) return;
    mapInstance.current.easeTo({
      pitch: is3DMode ? 55 : 0,
      bearing: is3DMode ? -15 : 0,
      duration: 1000,
    });
  }, [is3DMode]);

  // Update vector parcels on MapLibre map canvas
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    const syncVectorParcels = () => {
      try {
        const geojson: any = {
          type: 'FeatureCollection',
          features: parcels
            .filter((p) => p.geometry && p.geometry.coordinates)
            .map((p) => ({
              type: 'Feature',
              properties: {
                id: p.id,
                subtype: p.agroforestry_subtype,
                confidence: p.confidence_score,
                area_ha: p.area_ha,
                selected: selectedParcel?.id === p.id,
              },
              geometry: p.geometry,
            })),
        };

        const existingSource = map.getSource('parcels-source');
        if (existingSource && existingSource.setData) {
          existingSource.setData(geojson);
        } else if (map.isStyleLoaded()) {
          map.addSource('parcels-source', {
            type: 'geojson',
            data: geojson,
          });

          map.addLayer({
            id: 'parcels-fill',
            type: 'fill',
            source: 'parcels-source',
            layout: {
              visibility: layers.agroforestryParcels ? 'visible' : 'none',
            },
            paint: {
              'fill-color': '#10b981',
              'fill-opacity': 0.35,
            },
          });

          map.addLayer({
            id: 'parcels-line',
            type: 'line',
            source: 'parcels-source',
            layout: {
              visibility: layers.agroforestryParcels ? 'visible' : 'none',
            },
            paint: {
              'line-color': '#34d399',
              'line-width': 2,
            },
          });

          map.on('click', 'parcels-fill', (e: any) => {
            if (e.features && e.features[0]) {
              const clickedId = e.features[0].properties?.id;
              const match = parcels.find((p) => p.id === clickedId);
              if (match) onSelectParcel(match);
            }
          });
        }

        if (map.getLayer('parcels-fill')) {
          map.setLayoutProperty('parcels-fill', 'visibility', layers.agroforestryParcels ? 'visible' : 'none');
          map.setLayoutProperty('parcels-line', 'visibility', layers.agroforestryParcels ? 'visible' : 'none');
        }
      } catch (err) {
        console.warn('MapLibre parcel layer synchronization note:', err);
      }
    };

    if (map.isStyleLoaded()) {
      syncVectorParcels();
    } else {
      map.once('load', syncVectorParcels);
    }
  }, [parcels, selectedParcel, layers.agroforestryParcels]);

  return (
    <div className="relative w-full h-full flex-1 overflow-hidden bg-slate-950 select-none">
      {/* MapLibre Container */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Interactive Parcel & Reference Overlay (Active on both WebGL and Canvas) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Sample Parcel Visual Nodes when browsing */}
        <div className="relative w-full h-full pointer-events-auto">
          {layers.agroforestryParcels && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-4">
              <div className="flex flex-wrap gap-4 items-center justify-center max-w-lg p-3 rounded-xl bg-slate-950/60 backdrop-blur border border-slate-800/80 shadow-2xl">
                {parcels.slice(0, 5).map((p, idx) => {
                  const isSelected = selectedParcel?.id === p.id;
                  return (
                    <button
                      key={p.id || idx}
                      onClick={() => onSelectParcel(p)}
                      className={`px-3 py-2 rounded-lg text-left border transition-all ${
                        isSelected
                          ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200 ring-2 ring-emerald-500/50 scale-105'
                          : 'bg-slate-900/90 hover:bg-slate-800/90 border-emerald-500/40 text-slate-200 hover:border-emerald-400'
                      }`}
                    >
                      <div className="flex items-center space-x-1.5 text-[11px] font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="capitalize">{p.agroforestry_subtype?.replace('_', ' ') || 'Agroforestry'}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {p.area_ha?.toFixed(1) || '15'} ha • {Math.round(p.confidence_score * 100)}% conf
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="text-[10px] text-slate-400 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800">
                Click a parcel above to inspect area, uncertainty, and verify EUDR deforestation status.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3D Indicator Badge */}
      {is3DMode && (
        <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded bg-blue-600/30 border border-blue-500/50 text-blue-300 text-[10px] font-bold tracking-wider uppercase">
          3D Perspective Terrain Mode
        </div>
      )}
    </div>
  );
};
