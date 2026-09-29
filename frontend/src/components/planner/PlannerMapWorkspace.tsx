import { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { Jurisdiction, Parcel } from '../../types';

const SUBTYPE_COLORS: Record<string, string> = {
  shade_cocoa: '#2ca25f',
  shade_coffee: '#66c2a5',
  dehesa: '#fdae61',
  montado: '#e69537',
  silvopasture: '#d1e5fe',
  alley_cropping: '#99d8c9',
  parkland: '#c6dbef',
  homegarden: '#fdbb84',
  forest_farming: '#52b788',
  woodlot: '#756bb1',
};

function parcelFillColor(p: Parcel): string {
  if ((p as any).data_origin === 'field_validated') return '#065f46';
  return SUBTYPE_COLORS[p.agroforestry_subtype || ''] || '#10b981';
}

interface Props {
  parcels: Parcel[];
  jurisdiction: Jurisdiction;
  onSelectParcel: (p: Parcel) => void;
}

export function PlannerMapWorkspace({ parcels, jurisdiction, onSelectParcel }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [showSynthetic, setShowSynthetic] = useState(true);
  const parcelsRef = useRef(parcels);
  const selectRef = useRef(onSelectParcel);

  parcelsRef.current = parcels;
  selectRef.current = onSelectParcel;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
          },
        },
        layers: [
          { id: 'osm-basemap', type: 'raster', source: 'osm' },
        ],
      },
      center: (jurisdiction.centroid?.coordinates as [number, number]) || [-1.5, 6.5],
      zoom: 8,
      attributionControl: { compact: true },
    });
    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

    map.on('load', () => {
      map.addSource('planner-parcels', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
      });
      map.addLayer({
        id: 'parcels-fill',
        type: 'fill',
        source: 'planner-parcels',
        paint: {
          'fill-color': ['get', 'color'],
          'fill-opacity': 0.55,
        },
      });
      map.addLayer({
        id: 'parcels-outline',
        type: 'line',
        source: 'planner-parcels',
        paint: { 'line-color': '#1f2937', 'line-width': 0.6 },
      });
      map.on('click', 'parcels-fill', (e: any) => {
        const f = e.features?.[0];
        if (!f) return;
        const match = parcelsRef.current.find((p) => p.id === (f.properties as any)?.id);
        if (match) selectRef.current(match);
      });
      map.on('mouseenter', 'parcels-fill', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'parcels-fill', () => {
        map.getCanvas().style.cursor = '';
      });
    });
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getSource('planner-parcels')) return;
    const visible = showSynthetic ? parcels : parcels.filter((p) => (p as any).data_origin !== 'synthetic');
    (map.getSource('planner-parcels') as maplibregl.GeoJSONSource).setData({
      type: 'FeatureCollection',
      features: visible.map((p) => ({
        type: 'Feature' as const,
        id: p.id,
        geometry: p.geometry as any,
        properties: { id: p.id, color: parcelFillColor(p) },
      })),
    });
  }, [parcels, showSynthetic]);

  useEffect(() => {
    const map = mapRef.current;
    const center = jurisdiction.centroid?.coordinates as [number, number] | undefined;
    if (map && center) map.easeTo({ center, duration: 600 });
  }, [jurisdiction]);

  return (
    <section aria-labelledby="map-heading" className="bg-white rounded-lg border border-stone-200">
      <div className="flex items-center justify-between px-3 py-2 border-b border-stone-100">
        <h2 id="map-heading" className="text-sm font-semibold">2D map workspace</h2>
        <label className="flex items-center gap-2 text-xs text-stone-600">
          <input
            type="checkbox"
            checked={showSynthetic}
            onChange={(e) => setShowSynthetic(e.target.checked)}
            className="accent-emerald-700 h-4 w-4"
          />
          Show synthetic (demo) parcels
        </label>
      </div>
      <div ref={containerRef} className="h-[420px] sm:h-[520px] rounded-b-lg" aria-label="Parcel map" role="region" />
    </section>
  );
}
