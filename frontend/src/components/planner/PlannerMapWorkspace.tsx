import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { Jurisdiction, Parcel } from '../../types';
import { api } from '../../services/api';

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
interface Props {
  parcels: Parcel[];
  jurisdiction: Jurisdiction;
  selectedParcel?: Parcel | null;
  onSelectParcel: (p: Parcel) => void;
  onParcelValidated?: (parcelId: string, decision: string) => void;
}

export function PlannerMapWorkspace({ parcels, jurisdiction, selectedParcel, onSelectParcel, onParcelValidated }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const popupRef = useRef<maplibregl.Popup | null>(null);
  const [basemap, setBasemap] = useState<'satellite' | 'osm'>('satellite');
  const [showSynthetic, setShowSynthetic] = useState(true);
  const [showReferencePoints, setShowReferencePoints] = useState(true);
  const [subtypeFilter, setSubtypeFilter] = useState<string>('all');
  const [minConfidence, setMinConfidence] = useState(0);
  const [referencePoints, setReferencePoints] = useState<any[]>([]);
  const parcelsRef = useRef(parcels);
  const selectRef = useRef(onSelectParcel);
  const validatedRef = useRef(onParcelValidated);

  parcelsRef.current = parcels;
  selectRef.current = onSelectParcel;
  validatedRef.current = onParcelValidated;

  useEffect(() => {
    let cancelled = false;
    api.getReferencePoints(jurisdiction.code)
      .then((pts) => { if (!cancelled) setReferencePoints(pts || []); })
      .catch(() => { if (!cancelled) setReferencePoints([]); });
    return () => { cancelled = true; };
  }, [jurisdiction.code]);

  const popupHtml = useCallback((p: Parcel): string => {
    const subtype = (p.agroforestry_subtype || p.class_label || 'parcel').replace(/_/g, ' ');
    const area = p.area_ha != null ? `${p.area_ha.toFixed(1)} ha` : 'area unknown';
    const conf = p.confidence_score != null ? `${Math.round(p.confidence_score * 100)}%` : '—';
    const origin = p.data_origin || 'unknown';
    const reviewed = p.validation_status === 'community_validated' || p.validation_status === 'expert_reviewed' || p.validation_status === 'final';
    return (
      `<div style="font-family:inherit;min-width:200px">` +
      `<strong style="text-transform:capitalize">${subtype}</strong>` +
      (reviewed ? ` <span style="font-size:10px;color:#065f46;background:#d1fae5;padding:1px 5px;border-radius:8px">validated</span>` : '') +
      `<br/><span style="color:#57534e;font-size:12px">${area} · confidence ${conf}<br/>origin: ${origin}</span>` +
      `<div style="margin-top:8px;display:flex;gap:4px;flex-wrap:wrap">` +
      `<button data-paction="open" style="padding:4px 8px;border-radius:6px;border:1px solid #d6d3d1;background:#059669;color:#fff;font-size:12px;cursor:pointer">Dossier</button>` +
      (reviewed
        ? ''
        : `<button data-paction="confirm" style="padding:4px 8px;border-radius:6px;border:1px solid #059669;background:#fff;color:#065f46;font-size:12px;cursor:pointer">✓ Validate here</button>`) +
      `</div></div>`
    );
  }, []);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: [
              basemap === 'satellite'
                ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                : 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            ],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors / Esri Satellite',
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

    const handlePopupAction = (parcelId: string, action: string) => {
      const match = parcelsRef.current.find((p) => p.id === parcelId);
      if (!match) return;
      if (action === 'open') {
        selectRef.current(match);
      } else if (action === 'confirm') {
        void api.validateParcel(parcelId, 'confirmed').then((ok) => {
          validatedRef.current?.(parcelId, ok ? 'confirmed' : 'failed');
        });
      }
    };

    map.on('load', () => {
      setMapLoaded(true);
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
      map.addSource('reference-points-source', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
      });
      map.addLayer({
        id: 'reference-points-layer',
        type: 'circle',
        source: 'reference-points-source',
        paint: {
          'circle-radius': 5,
          'circle-color': '#1d4ed8',
          'circle-stroke-color': '#fff',
          'circle-stroke-width': 1.5,
        },
      });
      map.on('click', 'parcels-fill', (e: any) => {
        const f = e.features?.[0];
        if (!f) return;
        const id = (f.properties as any)?.id;
        const match = parcelsRef.current.find((p) => p.id === id);
        if (!match) return;
        popupRef.current?.remove();
        const popup = new maplibregl.Popup({ closeButton: true, maxWidth: '280px' })
          .setLngLat(e.lngLat)
          .setHTML(popupHtml(match));
        popup.on('open', () => {
          const root = popup.getElement();
          root?.querySelectorAll('button[data-paction]').forEach((btn) => {
            btn.addEventListener('click', () => {
              handlePopupAction(id, (btn as HTMLElement).dataset.paction || 'open');
              popup.remove();
            });
          });
        });
        popup.addTo(map);
        popupRef.current = popup;
      });
      map.on('click', 'reference-points-layer', (e: any) => {
        const f = e.features?.[0];
        if (!f) return;
        const props = f.properties as any;
        new maplibregl.Popup({ closeButton: true, maxWidth: '260px' })
          .setLngLat(e.lngLat)
          .setHTML(
            `<div style="font-family:inherit"><strong>Reference point</strong><br/>` +
            `<span style="color:#57534e;font-size:12px">class: ${props.class_label || '—'}<br/>` +
            `status: ${props.validation_status || 'unvalidated'}<br/>` +
            `source: ${props.source || 'unknown'}</span></div>`,
          )
          .addTo(map);
      });
      map.on('mouseenter', 'parcels-fill', () => { map.getCanvas().style.cursor = 'pointer'; });
      map.on('mouseleave', 'parcels-fill', () => { map.getCanvas().style.cursor = ''; });
      map.on('mouseenter', 'reference-points-layer', () => { map.getCanvas().style.cursor = 'pointer'; });
      map.on('mouseleave', 'reference-points-layer', () => { map.getCanvas().style.cursor = ''; });
    });
  }, [popupHtml]);
  useEffect(() => {
    const map = mapRef.current;
    const src = map?.getSource('osm') as any;
    if (!src?.setTiles) return;
    src.setTiles([
      basemap === 'satellite'
        ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        : 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    ]);
  }, [basemap]);

  const filteredParcels = useMemo(() => {
    return parcels.filter((p) => {
      if (!showSynthetic && p.data_origin === 'synthetic') return false;
      if (subtypeFilter !== 'all' && p.agroforestry_subtype !== subtypeFilter) return false;
      if ((p.confidence_score ?? 0) < minConfidence) return false;
      return true;
    });
  }, [parcels, showSynthetic, subtypeFilter, minConfidence]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getSource('planner-parcels')) return;
    (map.getSource('planner-parcels') as maplibregl.GeoJSONSource).setData({
      type: 'FeatureCollection',
      features: filteredParcels.map((p) => ({
        type: 'Feature' as const,
        id: p.id,
        geometry: p.geometry as any,
        properties: {
          id: p.id,
          color: parcelFillColor(p),
          subtype: p.agroforestry_subtype,
          confidence: p.confidence_score,
        },
      })),
    });
  }, [filteredParcels, mapLoaded]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getSource('reference-points-source')) return;
    const feats = (showReferencePoints ? referencePoints : []).map((pt: any) => ({
      type: 'Feature' as const,
      geometry: pt.geometry as any,
      properties: {
        id: pt.id,
        class_label: pt.class_label,
        validation_status: pt.validation_status,
        source: pt.source,
      },
    }));
    (map.getSource('reference-points-source') as maplibregl.GeoJSONSource).setData({
      type: 'FeatureCollection',
      features: feats,
    });
  }, [referencePoints, showReferencePoints, mapLoaded]);

  useEffect(() => {
    const map = mapRef.current;
    const center = jurisdiction.centroid?.coordinates as [number, number] | undefined;
    if (map && center) map.easeTo({ center, duration: 600 });
  }, [jurisdiction]);
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedParcel?.geometry) return;
    const coords = (selectedParcel.geometry as any)?.coordinates?.[0]?.[0];
    if (Array.isArray(coords) && coords.length >= 2) {
      map.easeTo({ center: [coords[0], coords[1]], zoom: Math.max(map.getZoom(), 13), duration: 700 });
    }
  }, [selectedParcel]);

  const subtypesPresent = useMemo(
    () => Array.from(new Set(parcels.map((p) => p.agroforestry_subtype).filter(Boolean))) as string[],
    [parcels],
  );


  return (
    <section aria-labelledby="map-heading" className="bg-white rounded-lg border border-stone-200">
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-stone-100">
        <h2 id="map-heading" className="text-sm font-semibold">2D map workspace</h2>
        <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600">
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={showSynthetic} onChange={(e) => setShowSynthetic(e.target.checked)} className="accent-emerald-700 h-4 w-4" />
            Synthetic parcels
          </label>
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={showReferencePoints} onChange={(e) => setShowReferencePoints(e.target.checked)} className="accent-blue-700 h-4 w-4" />
            Reference points
          </label>
          <label className="flex items-center gap-1.5" aria-label="Basemap style">
            Basemap
            <select
              value={basemap}
              onChange={(e) => setBasemap(e.target.value as 'satellite' | 'osm')}
              className="rounded border border-stone-300 bg-white px-2 py-1"
            >
              <option value="satellite">Satellite</option>
              <option value="osm">Street map</option>
            </select>
          </label>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 px-3 py-2 border-b border-stone-100 text-xs text-stone-600 bg-stone-50">
        <label className="flex items-center gap-1.5">
          Subtype
          <select
            value={subtypeFilter}
            onChange={(e) => setSubtypeFilter(e.target.value)}
            className="rounded border border-stone-300 bg-white px-2 py-1"
            aria-label="Filter parcels by subtype"
          >
            <option value="all">All</option>
            {subtypesPresent.map((s) => (
              <option key={s} value={s}>{SUBTYPE_LABELS[s] || s.replace(/_/g, ' ')}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-1.5">
          Min confidence: <span className="tabular-nums font-medium">{Math.round(minConfidence * 100)}%</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={minConfidence}
            onChange={(e) => setMinConfidence(Number(e.target.value))}
            className="accent-emerald-700 w-28"
            aria-label="Minimum confidence filter"
          />
        </label>
        <span className="text-stone-400 tabular-nums">
          {filteredParcels.length}/{parcels.length} parcels shown
        </span>
      </div>

      <div className="relative">
        <div ref={containerRef} className="h-[420px] sm:h-[520px] rounded-b-lg" aria-label="Parcel map" role="region" />

        <div className="absolute bottom-2 left-2 bg-white/95 border border-stone-200 rounded-lg shadow p-2 max-h-44 overflow-y-auto text-xs z-10" aria-label="Map legend">
          <div className="font-semibold mb-1">Agroforestry subtypes</div>
          <ul className="space-y-0.5">
            {subtypesPresent.length === 0 && <li className="text-stone-400">No parcels loaded yet</li>}
            {subtypesPresent.map((k) => (
              <li key={k} className="flex items-center gap-1.5">
                <span aria-hidden="true" className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: SUBTYPE_COLORS[k] || '#10b981' }} />
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
            <li className="flex items-center gap-1.5">
              <span aria-hidden="true" className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: '#1d4ed8' }} />
              Reference point
            </li>
          </ul>
        </div>

        <p className="absolute top-2 left-2 bg-white/95 border border-stone-200 rounded-lg shadow px-2 py-1 text-xs text-stone-600 z-10">
          Click a parcel to inspect or validate · all data is synthetic demo content
        </p>
      </div>
    </section>
  );
}
