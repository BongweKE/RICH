import React, { useEffect, useRef, useState } from 'react';
import {
  Jurisdiction,
  Parcel,
  LayerState,
  LayerOpacityState,
  SensorMode,
  TourWaypoint,
  AGROFORESTRY_SUBTYPE_COLORS,
} from '../types';
import referencePointsData from '../data/referencePoints.json';

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
  deforestationAlerts?: any[];
  referencePoints?: any[];
  onCameraChange?: (info: { pitch: number; bearing: number; zoom: number; center: [number, number] }) => void;
  onCursorMove?: (coords: [number, number] | null) => void;
}

// Protected 2020 Forest Reserve Baselines for EUDR Verification
const EUDR_BASELINES: Record<string, any[]> = {
  'GH-AH': [
    {
      name: 'Bobiri Forest Reserve & Biosphere',
      status: 'EUDR 2020 Protected Baseline',
      coordinates: [
        [-1.36, 6.63],
        [-1.30, 6.63],
        [-1.29, 6.73],
        [-1.37, 6.74],
        [-1.39, 6.68],
        [-1.36, 6.63],
      ],
    },
    {
      name: 'Pra Anum Forest Reserve',
      status: 'EUDR 2020 Protected Baseline',
      coordinates: [
        [-1.24, 6.22],
        [-1.16, 6.22],
        [-1.15, 6.32],
        [-1.23, 6.33],
        [-1.26, 6.27],
        [-1.24, 6.22],
      ],
    },
    {
      name: 'Offin Shelterbelt Forest Reserve',
      status: 'EUDR 2020 Protected Baseline',
      coordinates: [
        [-1.84, 6.62],
        [-1.76, 6.62],
        [-1.75, 6.74],
        [-1.83, 6.75],
        [-1.86, 6.69],
        [-1.84, 6.62],
      ],
    },
  ],
  'ES-EX': [
    {
      name: 'Parque Nacional y Reserva de la Biosfera de Monfragüe',
      status: 'EUDR 2020 Protected Baseline',
      coordinates: [
        [-6.12, 39.76],
        [-5.86, 39.76],
        [-5.84, 39.92],
        [-6.10, 39.93],
        [-6.14, 39.84],
        [-6.12, 39.76],
      ],
    },
    {
      name: 'Parque Natural de Cornalvo',
      status: 'EUDR 2020 Protected Baseline',
      coordinates: [
        [-6.24, 38.96],
        [-6.14, 38.96],
        [-6.13, 39.06],
        [-6.23, 39.07],
        [-6.26, 39.01],
        [-6.24, 38.96],
      ],
    },
    {
      name: 'Sierra de San Pedro Natura 2000 Sanctuary',
      status: 'EUDR 2020 Protected Baseline',
      coordinates: [
        [-6.72, 39.30],
        [-6.50, 39.30],
        [-6.48, 39.46],
        [-6.70, 39.47],
        [-6.74, 39.38],
        [-6.72, 39.30],
      ],
    },
  ],
  'ET-OR': [
    {
      name: 'Yayu Coffee Forest Biosphere Core Reserve',
      status: 'EUDR 2020 Protected Baseline',
      coordinates: [
        [36.66, 7.62],
        [36.82, 7.62],
        [36.83, 7.82],
        [36.65, 7.83],
        [36.63, 7.72],
        [36.66, 7.62],
      ],
    },
    {
      name: 'Bale Mountain Cloud Forest Core Zone',
      status: 'EUDR 2020 Protected Baseline',
      coordinates: [
        [37.12, 7.86],
        [37.36, 7.86],
        [37.37, 8.12],
        [37.11, 8.13],
        [37.08, 8.01],
        [37.12, 7.86],
      ],
    },
    {
      name: 'Didessa River Forest Sanctuary',
      status: 'EUDR 2020 Protected Baseline',
      coordinates: [
        [36.45, 8.10],
        [36.65, 8.10],
        [36.66, 8.28],
        [36.44, 8.29],
        [36.42, 8.19],
        [36.45, 8.10],
      ],
    },
  ],
};

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
  deforestationAlerts,
  referencePoints,
  onCameraChange,
  onCursorMove,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [splitPos, setSplitPos] = useState(50);

  // Dynamic MapLibre expressions for tactical sensor mode shading
  const getParcelColorExpression = (mode: SensorMode) => {
    switch (mode) {
      case 'flir':
        return [
          'case',
          ['boolean', ['get', 'selected'], false],
          '#ffffff', // Blistering white-hot thermal signature for selected parcel
          ['>=', ['get', 'height'], 35],
          '#38bdf8', // Cool upper emergent canopy
          ['>=', ['get', 'height'], 25],
          '#fbbf24', // Warm midstory canopy
          ['>=', ['get', 'height'], 15],
          '#f97316', // High thermal understory
          '#ef4444', // Hot ground / soil
        ];
      case 'nvg':
        return [
          'case',
          ['boolean', ['get', 'selected'], false],
          '#bbf7d0', // Ultra-bright luminescent phosphor highlight
          ['>=', ['get', 'height'], 30],
          '#4ade80',
          ['>=', ['get', 'height'], 18],
          '#22c55e',
          '#15803d',
        ];
      case 'crt':
        return [
          'case',
          ['boolean', ['get', 'selected'], false],
          '#fde047', // Canary glowing phosphor
          ['>=', ['get', 'height'], 30],
          '#f59e0b',
          ['>=', ['get', 'height'], 18],
          '#d97706',
          '#b45309',
        ];
      case 'noir':
        return [
          'case',
          ['boolean', ['get', 'selected'], false],
          '#ffffff', // Pure white contrast highlight
          ['>=', ['get', 'height'], 30],
          '#cbd5e1',
          ['>=', ['get', 'height'], 18],
          '#94a3b8',
          '#64748b',
        ];
      default:
        return [
          'case',
          ['boolean', ['get', 'selected'], false],
          '#38bdf8', // Radiant cyan beacon for selected parcel in normal mode
          ['coalesce', ['get', 'subtype_color'], '#10b981'],
        ];
    }
  };

  const getParcelLineColorExpression = (mode: SensorMode) => {
    switch (mode) {
      case 'flir':
        return ['case', ['boolean', ['get', 'selected'], false], '#ffffff', '#fbbf24'];
      case 'nvg':
        return ['case', ['boolean', ['get', 'selected'], false], '#ffffff', '#4ade80'];
      case 'crt':
        return ['case', ['boolean', ['get', 'selected'], false], '#ffffff', '#f59e0b'];
      case 'noir':
        return ['case', ['boolean', ['get', 'selected'], false], '#ffffff', '#f1f5f9'];
      default:
        return ['case', ['boolean', ['get', 'selected'], false], '#ffffff', ['coalesce', ['get', 'subtype_color'], '#34d399']];
    }
  };

  // Initialize MapLibre GL
  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    const initMap = async () => {
      try {
        const maplibregl = (window as any).maplibregl || (await import('maplibre-gl'));
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
                attribution: '&copy; OpenStreetMap contributors / Esri Satellite',
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
          zoom: 8.8,
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
          try {
            map.setLight({
              anchor: 'viewport',
              color: '#ffffff',
              intensity: 0.72,
              position: [1.2, 210, 35],
            });
          } catch (e) {
            // ignore if not supported in test environment
          }
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

  // Update center and camera zoom to encompass all regional parcels when jurisdiction changes
  useEffect(() => {
    if (!mapInstance.current || !jurisdiction) return;
    const jCode = jurisdiction.code || '';
    const targetZoom =
      jCode.startsWith('ES')
        ? 8.0
        : jCode.startsWith('ET')
        ? 7.8
        : 8.8; // GH-AH default
    const center: [number, number] =
      jurisdiction.centroid?.coordinates ||
      (jCode.startsWith('ES') ? [-6.26, 39.25] : jCode.startsWith('ET') ? [37.29, 8.00] : [-1.624, 6.712]);

    mapInstance.current.flyTo({
      center,
      zoom: targetZoom,
      pitch: is3DMode ? 55 : 0,
      bearing: is3DMode ? -15 : 0,
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

  // Sync Parcels and 3D Extrusion on map
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
              const isSelected = selectedParcel?.id === p.id;
              const subtype = p.agroforestry_subtype || '';
              const subtypeColor =
                p.subtype_color || AGROFORESTRY_SUBTYPE_COLORS[subtype] || AGROFORESTRY_SUBTYPE_COLORS.default;
              const baseHeight = p.height ?? Math.max(8.0, (p.confidence_score || 0.8) * 45);
              const height = isSelected ? baseHeight + 12.0 : baseHeight;
              return {
                type: 'Feature',
                properties: {
                  id: p.id,
                  subtype: p.agroforestry_subtype,
                  confidence: p.confidence_score,
                  area_ha: p.area_ha || 15.0,
                  height: height,
                  selected: isSelected,
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
              'fill-color': getParcelColorExpression(sensorMode),
              'fill-opacity': ['/', ['get', 'opacity'], 100],
            },
          });

          // 3D Extrusion Layer (God's Eye View 3D Canopy Height with Ambient Vertical Gradient)
          map.addLayer({
            id: 'parcels-3d-extrusion',
            type: 'fill-extrusion',
            source: 'parcels-source',
            layout: {
              visibility: layers.agroforestryParcels && is3DMode ? 'visible' : 'none',
            },
            paint: {
              'fill-extrusion-color': getParcelColorExpression(sensorMode),
              'fill-extrusion-height': ['get', 'height'],
              'fill-extrusion-base': 0,
              'fill-extrusion-opacity': ['/', opacities.agroforestryParcels, 100],
              'fill-extrusion-vertical-gradient': true,
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
              'line-color': getParcelLineColorExpression(sensorMode),
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

        // Toggle layer visibility and update responsive opacity & sensor colors
        if (map.getLayer('parcels-fill')) {
          map.setLayoutProperty('parcels-fill', 'visibility', layers.agroforestryParcels && !is3DMode ? 'visible' : 'none');
          map.setPaintProperty('parcels-fill', 'fill-opacity', opacities.agroforestryParcels / 100);
          map.setPaintProperty('parcels-fill', 'fill-color', getParcelColorExpression(sensorMode));
        }
        if (map.getLayer('parcels-3d-extrusion')) {
          map.setLayoutProperty('parcels-3d-extrusion', 'visibility', layers.agroforestryParcels && is3DMode ? 'visible' : 'none');
          map.setPaintProperty('parcels-3d-extrusion', 'fill-extrusion-opacity', opacities.agroforestryParcels / 100);
          map.setPaintProperty('parcels-3d-extrusion', 'fill-extrusion-color', getParcelColorExpression(sensorMode));
        }
        if (map.getLayer('parcels-line')) {
          map.setLayoutProperty('parcels-line', 'visibility', layers.agroforestryParcels ? 'visible' : 'none');
          map.setPaintProperty('parcels-line', 'line-opacity', opacities.agroforestryParcels / 100);
          map.setPaintProperty('parcels-line', 'line-color', getParcelLineColorExpression(sensorMode));
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
  }, [parcels, selectedParcel, layers.agroforestryParcels, is3DMode, opacities.agroforestryParcels, sensorMode]);

  // Sync CIFOR-ICRAF Ground Reference Points Layer
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    const syncReferencePoints = async () => {
      try {
        const maplibregl = (window as any).maplibregl || (await import('maplibre-gl'));
        const jCode = jurisdiction?.code || 'GH-AH';
        const canonical = jCode.startsWith('GH') ? 'GH-AH' : jCode.startsWith('ES') ? 'ES-EX' : 'ET-OR';

        const pts = (referencePoints && referencePoints.length > 0) ? referencePoints : (referencePointsData as any[]);
        const filtered = pts.filter(
          (rp: any) => rp.jurisdiction_code === canonical || rp.jurisdiction_code?.startsWith(canonical)
        );

        const geojson = {
          type: 'FeatureCollection',
          features: filtered.map((rp) => ({
            type: 'Feature',
            properties: {
              id: rp.id,
              name: rp.name,
              jurisdiction_code: rp.jurisdiction_code,
              validation_status: rp.validation_status,
              quality_score: rp.quality_score,
              source: rp.source,
              canopy_cover_pct: rp.canopy_cover_pct,
              subtype: rp.agroforestry_subtype,
            },
            geometry: rp.geometry,
          })),
        };

        const existingSource = map.getSource('reference-points-source');
        if (existingSource && existingSource.setData) {
          existingSource.setData(geojson);
        } else if (map.isStyleLoaded()) {
          map.addSource('reference-points-source', {
            type: 'geojson',
            data: geojson,
          });

          map.addLayer({
            id: 'reference-points-circle',
            type: 'circle',
            source: 'reference-points-source',
            layout: {
              visibility: layers.referencePoints ? 'visible' : 'none',
            },
            paint: {
              'circle-radius': ['interpolate', ['linear'], ['zoom'], 6, 5, 12, 9, 16, 14],
              'circle-color': '#f59e0b',
              'circle-stroke-width': 2,
              'circle-stroke-color': '#ffffff',
              'circle-opacity': opacities.referencePoints / 100,
            },
          });

          map.addLayer({
            id: 'reference-points-label',
            type: 'symbol',
            source: 'reference-points-source',
            minzoom: 11,
            layout: {
              visibility: layers.referencePoints ? 'visible' : 'none',
              'text-field': ['get', 'name'],
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              'text-size': 11,
              'text-offset': [0, 1.4],
              'text-anchor': 'top',
            },
            paint: {
              'text-color': '#fef08a',
              'text-halo-color': '#020617',
              'text-halo-width': 2,
              'text-opacity': opacities.referencePoints / 100,
            },
          });

          map.on('click', 'reference-points-circle', (e: any) => {
            if (e.features && e.features[0]) {
              const props = e.features[0].properties;
              new maplibregl.Popup({ offset: 12, className: 'rich-map-popup' })
                .setLngLat(e.lngLat)
                .setHTML(
                  `<div style="font-family: ui-sans-serif, system-ui, sans-serif; padding: 6px; color: #0f172a; max-width: 260px;">
                    <div style="font-size: 10px; font-weight: 800; color: #d97706; text-transform: uppercase; letter-spacing: 0.05em;">CIFOR Reference Point</div>
                    <div style="font-size: 12px; font-weight: 700; margin: 3px 0; color: #020617;">${props.name}</div>
                    <div style="font-size: 11px; color: #334155; margin-top: 2px;">Validation: <span style="color: #059669; font-weight: 600;">${props.validation_status} (${Math.round(props.quality_score * 100)}%)</span></div>
                    <div style="font-size: 11px; color: #334155;">Canopy Cover: <b>${props.canopy_cover_pct}%</b></div>
                    <div style="font-size: 10px; color: #64748b; margin-top: 4px; border-top: 1px solid #e2e8f0; pt: 4px;">Source: ${props.source}</div>
                  </div>`
                )
                .addTo(map);
            }
          });
        }

        if (map.getLayer('reference-points-circle')) {
          map.setLayoutProperty('reference-points-circle', 'visibility', layers.referencePoints ? 'visible' : 'none');
          map.setPaintProperty('reference-points-circle', 'circle-opacity', opacities.referencePoints / 100);
        }
        if (map.getLayer('reference-points-label')) {
          map.setLayoutProperty('reference-points-label', 'visibility', layers.referencePoints ? 'visible' : 'none');
          map.setPaintProperty('reference-points-label', 'text-opacity', opacities.referencePoints / 100);
        }
      } catch (err) {
        console.warn('Reference points sync notice:', err);
      }
    };

    if (map.isStyleLoaded()) {
      syncReferencePoints();
    } else {
      map.once('load', syncReferencePoints);
    }
  }, [jurisdiction, layers.referencePoints, opacities.referencePoints, referencePoints]);

  // Sync GFW Deforestation & Canopy Disturbance Alerts Layer
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    const syncDeforestationAlerts = async () => {
      try {
        const maplibregl = (window as any).maplibregl || (await import('maplibre-gl'));
        const jCode = jurisdiction?.code || 'GH-AH';
        const canonical = jCode.startsWith('GH') ? 'GH-AH' : jCode.startsWith('ES') ? 'ES-EX' : 'ET-OR';

        const alertsData = deforestationAlerts && deforestationAlerts.length > 0
          ? deforestationAlerts
          : (await import('../data/deforestationAlerts.json')).default;

        const filtered = alertsData.filter(
          (a: any) => a.jurisdiction_code === canonical || a.jurisdiction_code?.startsWith(canonical)
        );

        const geojson = {
          type: 'FeatureCollection',
          features: filtered.map((a: any) => ({
            type: 'Feature',
            properties: {
              id: a.id,
              date: a.date,
              confidence: a.confidence,
              sensor: a.sensor,
              loss_ha: a.loss_ha,
              status: a.status,
              details: a.details,
            },
            geometry: {
              type: 'Point',
              coordinates: a.coordinates,
            },
          })),
        };

        const existingSource = map.getSource('alerts-source');
        if (existingSource && existingSource.setData) {
          existingSource.setData(geojson);
        } else if (map.isStyleLoaded()) {
          map.addSource('alerts-source', {
            type: 'geojson',
            data: geojson,
          });

          // Outer halo / alert pulse
          map.addLayer({
            id: 'deforestation-alerts-pulse',
            type: 'circle',
            source: 'alerts-source',
            layout: {
              visibility: layers.deforestationAlerts !== false ? 'visible' : 'none',
            },
            paint: {
              'circle-radius': ['interpolate', ['linear'], ['zoom'], 6, 8, 12, 14, 16, 20],
              'circle-color': '#ef4444',
              'circle-opacity': 0.25,
            },
          });

          // Core alert circle
          map.addLayer({
            id: 'deforestation-alerts-circle',
            type: 'circle',
            source: 'alerts-source',
            layout: {
              visibility: layers.deforestationAlerts !== false ? 'visible' : 'none',
            },
            paint: {
              'circle-radius': ['interpolate', ['linear'], ['zoom'], 6, 4, 12, 7, 16, 10],
              'circle-color': '#f43f5e',
              'circle-stroke-width': 1.5,
              'circle-stroke-color': '#ffffff',
              'circle-opacity': (opacities.deforestationAlerts || 85) / 100,
            },
          });

          map.on('click', 'deforestation-alerts-circle', (e: any) => {
            if (e.features && e.features[0]) {
              const props = e.features[0].properties;
              new maplibregl.Popup({ offset: 12, className: 'rich-map-popup' })
                .setLngLat(e.lngLat)
                .setHTML(
                  `<div style="font-family: ui-sans-serif, system-ui, sans-serif; padding: 6px; color: #0f172a; max-width: 280px;">
                    <div style="font-size: 10px; font-weight: 800; color: #ef4444; text-transform: uppercase; letter-spacing: 0.05em;">GFW Deforestation Alert</div>
                    <div style="font-size: 12px; font-weight: 700; margin: 3px 0; color: #020617;">${props.status}</div>
                    <div style="font-size: 11px; color: #334155; margin-top: 2px;">Sensor: <span style="font-weight: 600;">${props.sensor}</span></div>
                    <div style="font-size: 11px; color: #334155;">Alert Date: <b>${props.date}</b> | Area: <b>${props.loss_ha} ha</b></div>
                    <div style="font-size: 10px; color: #475569; margin-top: 4px; border-top: 1px solid #e2e8f0; padding-top: 4px;">${props.details}</div>
                  </div>`
                )
                .addTo(map);
            }
          });
        }

        if (map.getLayer('deforestation-alerts-circle')) {
          map.setLayoutProperty('deforestation-alerts-circle', 'visibility', layers.deforestationAlerts !== false ? 'visible' : 'none');
          map.setPaintProperty('deforestation-alerts-circle', 'circle-opacity', (opacities.deforestationAlerts || 85) / 100);
        }
        if (map.getLayer('deforestation-alerts-pulse')) {
          map.setLayoutProperty('deforestation-alerts-pulse', 'visibility', layers.deforestationAlerts !== false ? 'visible' : 'none');
        }
      } catch (err) {
        console.warn('Deforestation alerts sync notice:', err);
      }
    };

    if (map.isStyleLoaded()) {
      syncDeforestationAlerts();
    } else {
      map.once('load', syncDeforestationAlerts);
    }
  }, [jurisdiction, layers.deforestationAlerts, opacities.deforestationAlerts, deforestationAlerts]);

  // Sync EUDR 2020 Forest Baseline Layer
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    const syncEUDRBaseline = () => {
      try {
        const jCode = jurisdiction?.code || 'GH-AH';
        const canonical = jCode.startsWith('GH') ? 'GH-AH' : jCode.startsWith('ES') ? 'ES-EX' : 'ET-OR';
        const baselines = EUDR_BASELINES[canonical] || EUDR_BASELINES['GH-AH'];

        const geojson = {
          type: 'FeatureCollection',
          features: baselines.map((b, idx) => ({
            type: 'Feature',
            properties: {
              id: `eudr-baseline-${idx}`,
              name: b.name,
              status: b.status,
            },
            geometry: {
              type: 'Polygon',
              coordinates: [b.coordinates],
            },
          })),
        };

        const existingSource = map.getSource('eudr-baseline-source');
        if (existingSource && existingSource.setData) {
          existingSource.setData(geojson);
        } else if (map.isStyleLoaded()) {
          map.addSource('eudr-baseline-source', {
            type: 'geojson',
            data: geojson,
          });

          map.addLayer({
            id: 'eudr-baseline-fill',
            type: 'fill',
            source: 'eudr-baseline-source',
            layout: {
              visibility: layers.eudrDeforestationBaseline ? 'visible' : 'none',
            },
            paint: {
              'fill-color': '#e11d48',
              'fill-opacity': (opacities.eudrDeforestationBaseline / 100) * 0.35,
            },
          });

          map.addLayer({
            id: 'eudr-baseline-line',
            type: 'line',
            source: 'eudr-baseline-source',
            layout: {
              visibility: layers.eudrDeforestationBaseline ? 'visible' : 'none',
            },
            paint: {
              'line-color': '#f43f5e',
              'line-width': 2,
              'line-dasharray': [3, 2],
              'line-opacity': opacities.eudrDeforestationBaseline / 100,
            },
          });
        }

        if (map.getLayer('eudr-baseline-fill')) {
          map.setLayoutProperty(
            'eudr-baseline-fill',
            'visibility',
            layers.eudrDeforestationBaseline ? 'visible' : 'none'
          );
          map.setPaintProperty(
            'eudr-baseline-fill',
            'fill-opacity',
            (opacities.eudrDeforestationBaseline / 100) * 0.35
          );
        }
        if (map.getLayer('eudr-baseline-line')) {
          map.setLayoutProperty(
            'eudr-baseline-line',
            'visibility',
            layers.eudrDeforestationBaseline ? 'visible' : 'none'
          );
          map.setPaintProperty(
            'eudr-baseline-line',
            'line-opacity',
            opacities.eudrDeforestationBaseline / 100
          );
        }
      } catch (err) {
        console.warn('EUDR baseline sync notice:', err);
      }
    };

    if (map.isStyleLoaded()) {
      syncEUDRBaseline();
    } else {
      map.once('load', syncEUDRBaseline);
    }
  }, [jurisdiction, layers.eudrDeforestationBaseline, opacities.eudrDeforestationBaseline]);

  // Sync Canopy Density Heatmap Layer
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    const syncCanopyDensity = () => {
      try {
        const points: any[] = [];
        for (const p of parcels) {
          if (p.geometry?.coordinates) {
            let coord: [number, number] | null = null;
            if (p.geometry.type === 'Point') {
              coord = p.geometry.coordinates;
            } else if (p.geometry.type === 'Polygon' && p.geometry.coordinates[0]?.[0]) {
              coord = p.geometry.coordinates[0][0];
            }
            if (coord) {
              points.push({
                type: 'Feature',
                properties: {
                  canopy_cover: Math.round((p.confidence_score || 0.8) * 100),
                },
                geometry: {
                  type: 'Point',
                  coordinates: coord,
                },
              });
            }
          }
        }

        const geojson = {
          type: 'FeatureCollection',
          features: points,
        };

        const existingSource = map.getSource('canopy-density-source');
        if (existingSource && existingSource.setData) {
          existingSource.setData(geojson);
        } else if (map.isStyleLoaded()) {
          map.addSource('canopy-density-source', {
            type: 'geojson',
            data: geojson,
          });

          map.addLayer({
            id: 'canopy-density-heatmap',
            type: 'heatmap',
            source: 'canopy-density-source',
            layout: {
              visibility: layers.canopyDensity ? 'visible' : 'none',
            },
            paint: {
              'heatmap-weight': ['interpolate', ['linear'], ['get', 'canopy_cover'], 20, 0.2, 90, 1.0],
              'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 6, 0.8, 14, 2.5],
              'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0,
                'rgba(0,0,0,0)',
                0.2,
                '#fde68a',
                0.5,
                '#14b8a6',
                0.8,
                '#059669',
                1.0,
                '#064e3b',
              ],
              'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 6, 20, 14, 50],
              'heatmap-opacity': opacities.canopyDensity / 100,
            },
          });
        }

        if (map.getLayer('canopy-density-heatmap')) {
          map.setLayoutProperty('canopy-density-heatmap', 'visibility', layers.canopyDensity ? 'visible' : 'none');
          map.setPaintProperty('canopy-density-heatmap', 'heatmap-opacity', opacities.canopyDensity / 100);
        }
      } catch (err) {
        console.warn('Canopy density sync notice:', err);
      }
    };

    if (map.isStyleLoaded()) {
      syncCanopyDensity();
    } else {
      map.once('load', syncCanopyDensity);
    }
  }, [parcels, layers.canopyDensity, opacities.canopyDensity]);

  // Sync QUES-C Biomass Carbon Stock Heatmap Layer
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    const syncCarbonHeatmap = () => {
      try {
        const points: any[] = [];
        for (const p of parcels) {
          if (p.geometry?.coordinates) {
            let coord: [number, number] | null = null;
            if (p.geometry.type === 'Point') {
              coord = p.geometry.coordinates;
            } else if (p.geometry.type === 'Polygon' && p.geometry.coordinates[0]?.[0]) {
              coord = p.geometry.coordinates[0][0];
            }
            if (coord) {
              points.push({
                type: 'Feature',
                properties: {
                  carbon_stock: Math.round((p.area_ha || 15) * 6.5),
                },
                geometry: {
                  type: 'Point',
                  coordinates: coord,
                },
              });
            }
          }
        }

        const geojson = {
          type: 'FeatureCollection',
          features: points,
        };

        const existingSource = map.getSource('carbon-heatmap-source');
        if (existingSource && existingSource.setData) {
          existingSource.setData(geojson);
        } else if (map.isStyleLoaded()) {
          map.addSource('carbon-heatmap-source', {
            type: 'geojson',
            data: geojson,
          });

          map.addLayer({
            id: 'carbon-density-heatmap',
            type: 'heatmap',
            source: 'carbon-heatmap-source',
            layout: {
              visibility: layers.carbonDensityHeatmap ? 'visible' : 'none',
            },
            paint: {
              'heatmap-weight': ['interpolate', ['linear'], ['get', 'carbon_stock'], 30, 0.2, 250, 1.0],
              'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 6, 1.0, 14, 3.0],
              'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0,
                'rgba(0,0,0,0)',
                0.25,
                '#3b82f6',
                0.5,
                '#10b981',
                0.75,
                '#f59e0b',
                1.0,
                '#ef4444',
              ],
              'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 6, 25, 14, 60],
              'heatmap-opacity': (opacities.carbonDensityHeatmap || 50) / 100,
            },
          });
        }

        if (map.getLayer('carbon-density-heatmap')) {
          map.setLayoutProperty(
            'carbon-density-heatmap',
            'visibility',
            layers.carbonDensityHeatmap ? 'visible' : 'none'
          );
          map.setPaintProperty(
            'carbon-density-heatmap',
            'heatmap-opacity',
            (opacities.carbonDensityHeatmap || 50) / 100
          );
        }
      } catch (err) {
        console.warn('Carbon heatmap sync notice:', err);
      }
    };

    if (map.isStyleLoaded()) {
      syncCarbonHeatmap();
    } else {
      map.once('load', syncCarbonHeatmap);
    }
  }, [parcels, layers.carbonDensityHeatmap, opacities.carbonDensityHeatmap]);

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
            Active Parcels ({parcels.length}):
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
