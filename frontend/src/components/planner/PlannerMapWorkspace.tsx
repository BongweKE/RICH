import { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { Jurisdiction, Parcel } from '../../types';

export const SUBTYPE_COLORS: Record<string, string> = {
  shade_cocoa: '#2ca25f',
  shade_coffee: '#66c2a5',
  dehesa: '#fdae61',
  montado: '#e69537',
  silvopasture: '#a6cee3',
  alley_cropping: '#99d8c9',
  parkland: '#c6dbef',
  homegarden: '#fdbb84',
  forest_farming: '#52b788',
  woodlot: '#756bb1',
};

const SUBTYPE_LABELS: Record<string, string> = {
  shade_cocoa: 'Shade cocoa',
  shade_coffee: 'Shade coffee',
  dehesa: 'Dehesa',
  montado: 'Montado',
  silvopasture: 'Silvopasture',
  alley_cropping: 'Alley cropping',
  parkland: 'Parkland',
  homegarden: 'Homegarden',
  forest_farming: 'Forest farming',
  woodlot: 'Woodlot',
};

function parcelFillColor(p: Parcel): string {
  if (p.validation_status === 'community_validated' || p.validation_status === 'expert_reviewed' || p.validation_status === 'final')
    return '#065f46';
  return SUBTYPE_COLORS[p.agroforestry_subtype || ''] || '#10b981';
}

function parcelPopupHtml(p: Parcel): string {
  const subtype = (p.agroforestry_subtype || p.class_label || 'parcel').replace(/_/g, ' ');
  const area = p.area_ha != null ? `${p.area_ha.toFixed(1)} ha` : 'area unknown';
  const conf = p.confidence_score != null ? `${Math.round(p.confidence_score * 100)}%` : '—';
  const origin = p.data_origin || 'unknown';
  return (
    `<div style="font-family:inherit;min-width:180px">` +
    `<strong style="text-transform:capitalize">${subtype}</strong><br/>` +
    `<span style="color:#57534e;font-size:12px">${area} · confidence ${conf}<br/>origin: ${origin}</span><br/>` +
    `<button id="popup-open-dossier" style="margin-top:6px;padding:4px 8px;border-radius:6px;border:1px solid #d6d3d1;background:#059669;color:#fff;font-size:12px;cursor:pointer">Open dossier</button>` +
    `</div>`
  );
}

interface Props {
  parcels: Parcel[];
  jurisdiction: Jurisdiction;
  onSelectParcel: (p: Parcel) => void;
}

export function PlannerMapWorkspace({ parcels, jurisdiction, onSelectParcel }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const popupRef = useRef<maplibregl.Popup | null>(null);
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
      zoom: 9,
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
        const id = (f.properties as any)?.id;
        const match = parcelsRef.current.find((p) => p.id === id);
        if (!match) return;
        popupRef.current?.remove();
        const popup = new maplibregl.Popup({ closeButton: true, maxWidth: '260px' })
          .setLngLat(e.lngLat)
          .setHTML(parcelPopupHtml(match));
        popup.on('open', () => {
          const btn = document.getElementById('popup-open-dossier');
          btn?.addEventListener('click', () => {
            popup.remove();
            selectRef.current(match);
          });
        });
        popup.addTo(map);
        popupRef.current = popup;
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
    const visible = showSynthetic ? parcels : parcels.filter((p) => p.data_origin !== 'synthetic');
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

  const legendEntries = Object.entries(SUBTYPE_COLORS)
    .filter(([k]) => parcels.some((p) => p.agroforestry_subtype === k));

  return (
    <section aria-labelledby="map-heading" className="bg-white rounded-lg border border-stone-200">
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-stone-100">
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

      <div className="relative">
        <div ref={containerRef} className="h-[420px] sm:h-[520px] rounded-b-lg" aria-label="Parcel map" role="region" />

        <div className="absolute bottom-2 left-2 bg-white/95 border border-stone-200 rounded-lg shadow p-2 max-h-44 overflow-y-auto text-xs z-10" aria-label="Map legend">
          <div className="font-semibold mb-1">Agroforestry subtypes</div>
          <ul className="space-y-0.5">
            {legendEntries.length === 0 && <li className="text-stone-400">No parcels loaded yet</li>}
            {legendEntries.map(([k, color]) => (
              <li key={k} className="flex items-center gap-1.5">
                <span aria-hidden="true" className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                {SUBTYPE_LABELS[k] || k.replace(/_/g, ' ')}
              </li>
            ))}
          </ul>
          <div className="font-semibold mt-2 mb-1 pt-2 border-t border-stone-100">Provenance</div>
          <ul className="space-y-0.5">
            <li className="flex items-center gap-1.5">
              <span aria-hidden="true" className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: '#065f46' }} />
              Validated (human-reviewed)
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden="true" className="inline-block w-3 h-3 rounded-sm border border-stone-300 bg-white" />
              Unvalidated model label
            </li>
          </ul>
        </div>

        <p className="absolute top-2 left-2 bg-white/95 border border-stone-200 rounded-lg shadow px-2 py-1 text-xs text-stone-600 z-10">
          Click a parcel for details · all data is synthetic demo content
        </p>
      </div>
    </section>
  );
}
