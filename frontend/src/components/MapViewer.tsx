import React, { useEffect, useRef, useState } from 'react';
import { Jurisdiction, Parcel, LayerState, LayerOpacityState, SensorMode, TourWaypoint, AGROFORESTRY_SUBTYPE_COLORS } from '../types';

interface MapViewerProps {
  jurisdiction: Jurisdiction | null;
  parcels: Parcel[];
  selectedParcel: Parcel | null;
  onSelectParcel: (parcel: Parcel | null) => void;
  layers: LayerState;
  opacities: LayerOpacityState;
  is3DMode: boolean;
  sensorMode: SensorMode;
  currentYear: number;
  isSplitCompare: boolean;
  tourWaypoint: TourWaypoint | null;
  onCameraChange?: (info: { pitch: number; bearing: number; zoom: number; center: [number, number] }) => void;
  onCursorMove?: (coords: [number, number] | null) => void;
}

export const MapViewer: React.FC<MapViewerProps> = ({
  jurisdiction,
  parcels,
  selectedParcel,
  onSelectParcel,
  layers,
  opacities,
  is3DMode,
  sensorMode,
  currentYear,
  isSplitCompare,
  tourWaypoint,
  onCameraChange,
  onCursorMove,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [splitPos, setSplitPos] = useState(50); // percentage for split curtain

  // Initialize MapLibre GL
  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    const initMap = async () => {
      try {
        const maplibregl = (window as any).maplibregl || (await import('maplibre-gl')).default;
        const defaultCenter: [number, number] = jurisdiction?.centroid?.coordinates || [-1.624, 6.712];

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
          zoom: 11,
          pitch: is3DMode ? 55 : 0,
          bearing: is3DMode ? -15 : 0,
        });

        map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'bottom-right');

        // Track cursor coordinates for Tactical HUD
        map.on('mousemove', (e: any) => {
          if (onCursorMove) {
            onCursorMove([e.lngLat.lat, e.lngLat.lng]);
          }
        });

        // Track camera pitch, bearing, and zoom
        const updateCameraTelemetry = () => {
          if (onCameraChange) {
            const center = map.getCenter();
            onCameraChange({
              pitch: map.getPitch(),
              bearing: map.getBearing(),
              zoom: map.getZoom(),
              center: [center.lng, center.lat],
            });
          }
        };

        map.on('move', updateCameraTelemetry);
        map.on('pitch', updateCameraTelemetry);
        map.on('rotate', updateCameraTelemetry);

        map.on('load', () => {
          mapInstance.current = map;
          updateCameraTelemetry();
        });
      } catch (err) {
        console.warn('MapLibre GL initialization notice:', err);
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
      zoom: 11.5,
      pitch: is3DMode ? 55 : 0,
      essential: true,
      duration: 1800,
    });
  }, [jurisdiction]);

  // Handle tour waypoint flyTo
  useEffect(() => {
    if (!mapInstance.current || !tourWaypoint) return;
    mapInstance.current.flyTo({
      center: tourWaypoint.center,
      zoom: tourWaypoint.zoom,
      pitch: tourWaypoint.pitch,
      bearing: tourWaypoint.bearing,
      essential: true,
      duration: 2500,
    });
  }, [tourWaypoint]);

  // Focus and fly to selected parcel in God's Eye View
  useEffect(() => {
    if (!mapInstance.current || !selectedParcel) return;
    try {
      // Extract center from coordinates regardless of Point, Polygon, or MultiPolygon structure
      const coords: [number, number][] = [];
      const collect = (item: any) => {
        if (!item) return;
        if (Array.isArray(item)) {
          if (item.length >= 2 && typeof item[0] === 'number' && typeof item[1] === 'number') {
            coords.push([item[0], item[1]]);
          } else {
            for (const sub of item) {
              collect(sub);
            }
          }
        }
      };

      collect(selectedParcel.geometry?.coordinates);

      let center: [number, number] | null = null;
      if (coords.length > 0) {
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        for (const [x, y] of coords) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
        if (isFinite(minX) && isFinite(minY)) {
          center = [(minX + maxX) / 2, (minY + maxY) / 2];
        }
      }

      if (center) {
        mapInstance.current.flyTo({
          center,
          zoom: 15.0,
          pitch: is3DMode ? 55 : 0,
          bearing: is3DMode ? -15 : 0,
          essential: true,
          duration: 1800,
        });
      }
    } catch (e) {
      console.warn('Parcel flyTo error:', e);
    }
  }, [selectedParcel, is3DMode]);

  // Update pitch for 3D perspective mode
  useEffect(() => {
    if (!mapInstance.current) return;
    mapInstance.current.easeTo({
      pitch: is3DMode ? 55 : 0,
      bearing: is3DMode ? -15 : 0,
      duration: 1200,
    });
  }, [is3DMode]);

  // Update satellite basemap
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

  // Update vector parcels and 3D extrusion on map
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    const syncParcels = () => {
      try {
        const geojson: any = {
          type: 'FeatureCollection',
          features: parcels
            .filter((p) => p.geometry && p.geometry.coordinates)
            .map((p) => {
              const subtype = p.agroforestry_subtype || '';
              const subtypeColor =
                p.subtype_color || AGROFORESTRY_SUBTYPE_COLORS[subtype] || AGROFORESTRY_SUBTYPE_COLORS.default;
              const height = p.height ?? (p.confidence_score || 0.8) * 120;
              return {
                type: 'Feature',
                properties: {
                  id: p.id,
                  subtype: p.agroforestry_subtype,
                  confidence: p.confidence_score,
                  area_ha: p.area_ha || 15.0,
                  height: height,
                  selected: selectedParcel?.id === p.id,
                  subtype_color: subtypeColor,
                  opacity: opacities.agroforestryParcels,
                },
                geometry: p.geometry,
              };
            }),
        };

        const existingSource = map.getSource('parcels-source');
        if (existingSource && existingSource.setData) {
          existingSource.setData(geojson);
        } else if (map.isStyleLoaded()) {
          map.addSource('parcels-source', {
            type: 'geojson',
            data: geojson,
          });

          // 2D Fill Layer
          map.addLayer({
            id: 'parcels-fill',
            type: 'fill',
            source: 'parcels-source',
            layout: {
              visibility: layers.agroforestryParcels && !is3DMode ? 'visible' : 'none',
            },
            paint: {
              'fill-color': [
                'case',
                ['boolean', ['get', 'selected'], false],
                '#34d399',
                ['coalesce', ['get', 'subtype_color'], '#10b981'],
              ],
              'fill-opacity': ['/', ['get', 'opacity'], 100],
            },
          });

          // 3D Extrusion Layer (God's Eye View 3D Canopy Height)
          map.addLayer({
            id: 'parcels-3d-extrusion',
            type: 'fill-extrusion',
            source: 'parcels-source',
            layout: {
              visibility: layers.agroforestryParcels && is3DMode ? 'visible' : 'none',
            },
            paint: {
              'fill-extrusion-color': [
                'case',
                ['boolean', ['get', 'selected'], false],
                '#34d399',
                ['coalesce', ['get', 'subtype_color'], '#10b981'],
              ],
              'fill-extrusion-height': ['get', 'height'],
              'fill-extrusion-base': 0,
              'fill-extrusion-opacity': ['/', opacities.agroforestryParcels, 100],
            },
          });

          // Perimeter Line Layer
          map.addLayer({
            id: 'parcels-line',
            type: 'line',
            source: 'parcels-source',
            layout: {
              visibility: layers.agroforestryParcels ? 'visible' : 'none',
            },
            paint: {
              'line-color': [
                'case',
                ['boolean', ['get', 'selected'], false],
                '#ffffff',
                ['coalesce', ['get', 'subtype_color'], '#34d399'],
              ],
              'line-width': ['case', ['boolean', ['get', 'selected'], false], 3, 2],
              'line-opacity': ['/', opacities.agroforestryParcels, 100],
            },
          });

          map.on('click', 'parcels-fill', (e: any) => {
            if (e.features && e.features[0]) {
              const match = parcels.find((p) => p.id === e.features[0].properties?.id);
              if (match) onSelectParcel(match);
            }
          });

          map.on('click', 'parcels-3d-extrusion', (e: any) => {
            if (e.features && e.features[0]) {
              const match = parcels.find((p) => p.id === e.features[0].properties?.id);
              if (match) onSelectParcel(match);
            }
          });
        }

        // Toggle layer visibility and update responsive opacity
        if (map.getLayer('parcels-fill')) {
          map.setLayoutProperty(
            'parcels-fill',
            'visibility',
            layers.agroforestryParcels && !is3DMode ? 'visible' : 'none'
          );
          map.setPaintProperty(
            'parcels-fill',
            'fill-opacity',
            opacities.agroforestryParcels / 100
          );
        }
        if (map.getLayer('parcels-3d-extrusion')) {
          map.setLayoutProperty(
            'parcels-3d-extrusion',
            'visibility',
            layers.agroforestryParcels && is3DMode ? 'visible' : 'none'
          );
          map.setPaintProperty(
            'parcels-3d-extrusion',
            'fill-extrusion-opacity',
            opacities.agroforestryParcels / 100
          );
        }
        if (map.getLayer('parcels-line')) {
          map.setLayoutProperty(
            'parcels-line',
            'visibility',
            layers.agroforestryParcels ? 'visible' : 'none'
          );
          map.setPaintProperty(
            'parcels-line',
            'line-opacity',
            opacities.agroforestryParcels / 100
          );
        }
      } catch (err) {
        console.warn('Parcel sync notice:', err);
      }
    };

    if (map.isStyleLoaded()) {
      syncParcels();
    } else {
      map.once('load', syncParcels);
    }
  }, [parcels, selectedParcel, layers.agroforestryParcels, is3DMode, opacities.agroforestryParcels]);

  // Handle Sensor Filter class on map container
  const getSensorFilterStyle = () => {
    switch (sensorMode) {
      case 'nvg':
        return 'brightness-125 contrast-125 saturate-150';
      case 'flir':
        return 'contrast-150 saturate-200 hue-rotate-180';
      case 'crt':
        return 'contrast-110 brightness-95';
      case 'noir':
        return 'grayscale contrast-125';
      default:
        return '';
    }
  };

  return (
    <div className="relative w-full h-full flex-1 overflow-hidden bg-slate-950 select-none font-sans">
      {/* MapLibre WebGL Canvas Container with Sensor Filter */}
      <div
        ref={mapContainer}
        className={`w-full h-full transition-all duration-300 ${getSensorFilterStyle()}`}
      />

      {/* Split-Screen Comparison Curtain (2020 EUDR vs 2024 Present) */}
      {isSplitCompare && (
        <div
          className="absolute inset-y-0 right-0 pointer-events-none border-l-2 border-amber-400 bg-emerald-950/20 backdrop-blur-[1px] shadow-2xl transition-all"
          style={{ width: `${100 - splitPos}%` }}
        >
          <div className="absolute top-16 right-4 px-3 py-1.5 rounded-lg bg-slate-950/90 border border-amber-500/50 text-amber-300 text-[11px] font-mono shadow-xl">
            2024 Agroforestry Present
          </div>
          <div className="absolute top-16 left-4 -translate-x-full px-3 py-1.5 rounded-lg bg-slate-950/90 border border-slate-700 text-slate-300 text-[11px] font-mono shadow-xl mr-4">
            2020 Forest Baseline (EUDR Cutoff)
          </div>

          {/* Draggable Curtain Slider Bar */}
          <div
            className="absolute inset-y-0 -left-3 w-6 flex items-center justify-center cursor-ew-resize pointer-events-auto"
            onClick={() => setSplitPos((prev) => (prev === 50 ? 30 : prev === 30 ? 70 : 50))}
            title="Click to shift comparison split position"
          >
            <div className="w-6 h-10 rounded bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg font-bold text-xs">
              ↔
            </div>
          </div>
        </div>
      )}

      {/* Temporal Year Badge */}
      {currentYear !== 2024 && (
        <div className="absolute top-16 left-80 z-10 px-2.5 py-1 rounded bg-amber-600/30 border border-amber-500/50 text-amber-300 text-[10px] font-mono font-bold tracking-wider uppercase">
          EPOCH: {currentYear} OBSERVATION
        </div>
      )}

      {/* Interactive Parcel Quick Selector Overlay */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 pointer-events-auto flex items-center space-x-2">
        <div className="flex items-center space-x-2 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-3 py-2 rounded-xl shadow-2xl">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider hidden sm:inline">
            Active Parcels:
          </span>
          {parcels.slice(0, 4).map((p) => {
            const isSelected = selectedParcel?.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelectParcel(p)}
                className={`px-2.5 py-1.5 rounded-lg text-left transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/50 scale-105'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-1.5 text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="capitalize">{p.agroforestry_subtype?.replace('_', ' ') || 'Agroforestry'}</span>
                </div>
                <div className="text-[9px] text-slate-400">
                  {p.area_ha?.toFixed(1) || '15'} ha • {Math.round(p.confidence_score * 100)}% conf
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Perspective Badge */}
      {is3DMode && (
        <div className="absolute top-16 right-36 z-10 px-2.5 py-1 rounded bg-blue-600/30 border border-blue-500/50 text-blue-300 text-[10px] font-mono font-bold tracking-wider uppercase">
          3D CANOPY EXTRUSION ACTIVE
        </div>
      )}
    </div>
  );
};
