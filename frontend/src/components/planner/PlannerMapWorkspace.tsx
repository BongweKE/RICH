import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { Jurisdiction, Parcel } from '../../types';
import {
  AGROFORESTRY_SUBTYPE_COLORS,
  subtypeColor,
  subtypeLabel,
  isReviewedStatus,
  VALIDATED_OUTLINE,
  UNVALIDATED_OUTLINE,
} from '../../types';
import { api } from '../../services/api';

// Kept as a named export for callers that import the palette from here.
export const SUBTYPE_COLORS = AGROFORESTRY_SUBTYPE_COLORS;

// Fill colour is always the subtype hue; validation is a separate visual
// channel (outline + opacity) so it never erases the subtype identity.
function parcelColor(p: Parcel): string {
  return subtypeColor(p.agroforestry_subtype);
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
    const label = subtypeLabel(p.agroforestry_subtype || p.class_label);
    const swatch = subtypeColor(p.agroforestry_subtype);
    const area = p.area_ha != null ? `${p.area_ha.toFixed(1)} ha` : 'area unknown';
    const conf = p.confidence_score != null ? `${Math.round(p.confidence_score * 100)}%` : '—';
    const origin = p.data_origin || 'unknown';
    const reviewed = isReviewedStatus(p.validation_status);
    const statusChip = reviewed
      ? `<span style="font-size:10px;color:#065f46;background:#d1fae5;padding:1px 6px;border-radius:999px">validated · demo</span>`
      : `<span style="font-size:10px;color:#92400e;background:#fef3c7;padding:1px 6px;border-radius:999px">unvalidated model label</span>`;
    return (
      `<div style="font-family:inherit;min-width:210px">` +
      `<div style="display:flex;align-items:center;gap:6px">` +
      `<span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${swatch};border:2px solid ${reviewed ? VALIDATED_OUTLINE : 'transparent'}"></span>` +
      `<strong>${label}</strong></div>` +
      `<div style="margin-top:4px">${statusChip}</div>` +
      `<div style="margin-top:6px;color:#57534e;font-size:12px">${area} · confidence ${conf}<br/>origin: ${origin}</div>` +
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
          'fill-opacity': ['get', 'fill_opacity'],
        },
      });
      map.addLayer({
        id: 'parcels-outline',
        type: 'line',
        source: 'planner-parcels',
        paint: {
          'line-color': ['case', ['boolean', ['get', 'validated'], false], VALIDATED_OUTLINE, UNVALIDATED_OUTLINE],
          'line-width': ['case', ['boolean', ['get', 'validated'], false], 1.4, 0.5],
        },
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
        const reviewed = isReviewedStatus(props.validation_status);
        const typeLabel = props.subtype ? subtypeLabel(props.subtype) : (props.class_label || '—');
        new maplibregl.Popup({ closeButton: true, maxWidth: '280px' })
          .setLngLat(e.lngLat)
          .setHTML(
            `<div style="font-family:inherit;min-width:200px">` +
            `<div style="font-size:10px;font-weight:700;color:#1d4ed8;text-transform:uppercase;letter-spacing:.05em">Point of interest</div>` +
            `<div style="display:flex;align-items:center;gap:6px;margin-top:3px">` +
            `<span style="display:inline-block;width:10px;height:10px;border-radius:999px;background:#1d4ed8"></span>` +
            `<strong>${props.name || 'Ground reference point'}</strong>` +
            (reviewed ? ` <span style="font-size:10px;color:#065f46;background:#d1fae5;padding:1px 5px;border-radius:8px">validated</span>` : '') +
            `</div>` +
            `<div style="margin-top:5px;color:#57534e;font-size:12px">` +
            `type: ${typeLabel}<br/>` +
            `canopy: ${props.canopy_cover_pct != null ? `${props.canopy_cover_pct}%` : '—'}<br/>` +
            `status: ${props.validation_status || 'unvalidated'}${props.quality_score != null ? ` · ${Math.round(props.quality_score * 100)}% quality` : ''}<br/>` +
            `source: ${props.source || 'unknown'}</div>` +
            `<div style="margin-top:6px;font-size:10px;color:#92400e;background:#fef3c7;border:1px solid #fcd34d;border-radius:6px;padding:4px 6px">` +
            `Synthetic PoC demo data — validation decisions are illustrative, not field validation.` +
            `</div></div>`,
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
      features: filteredParcels.map((p) => {
        const reviewed = isReviewedStatus(p.validation_status);
        return {
          type: 'Feature' as const,
          id: p.id,
          geometry: p.geometry as any,
          properties: {
            id: p.id,
            color: parcelColor(p),
            validated: reviewed,
            // Validated parcels read as solid figures; unvalidated model
            // labels recede (lower opacity) — figure/ground without recolouring.
            fill_opacity: reviewed ? 0.85 : 0.32,
            subtype: p.agroforestry_subtype,
            confidence: p.confidence_score,
          },
        };
      }),
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
        name: pt.name,
        class_label: pt.class_label,
        subtype: pt.agroforestry_subtype,
        validation_status: pt.validation_status,
        quality_score: pt.quality_score,
        canopy_cover_pct: pt.canopy_cover_pct,
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

  // Subtype distribution for the legend, ordered by frequency so the reader's
  // eye lands on what dominates the landscape first (Gestalt: proximity +
  // a stable, meaningful order rather than arbitrary first-seen).
  const subtypeCounts = useMemo(() => {
    const counts = new Map<string, number>();
    parcels.forEach((p) => {
      const key = p.agroforestry_subtype || 'other';
      counts.set(key, (counts.get(key) || 0) + 1);
    });
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [parcels]);

  const validatedCount = useMemo(
    () => parcels.filter((p) => isReviewedStatus(p.validation_status)).length,
    [parcels],
  );

  // Shared between the desktop overlay and the mobile in-flow card.
  const legendContent = (
    <>
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-semibold">Agroforestry types</span>
        <span className="text-[10px] text-stone-400 tabular-nums">{parcels.length} parcels</span>
      </div>
      {subtypeCounts.length === 0 ? (
        <p className="text-stone-400">No parcels loaded yet</p>
      ) : (
        <ul className="space-y-1">
          {subtypeCounts.map(([k, n]) => (
            <li key={k} className="flex items-center gap-2">
              <span aria-hidden="true" className="inline-block w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: subtypeColor(k) }} />
              <span className="flex-1 truncate text-stone-700">{subtypeLabel(k)}</span>
              <span className="tabular-nums text-stone-500">{n}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-2 pt-2 border-t border-stone-100">
        <div className="font-semibold mb-1">
          Review status <span className="font-normal text-stone-400">({validatedCount} validated)</span>
        </div>
        <ul className="space-y-1">
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="inline-block w-3 h-3 rounded-sm shrink-0 border-2" style={{ backgroundColor: subtypeColor('shade_cocoa'), borderColor: VALIDATED_OUTLINE }} />
            Validated — solid fill, dark outline
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="inline-block w-3 h-3 rounded-sm shrink-0 opacity-40" style={{ backgroundColor: subtypeColor('shade_cocoa') }} />
            Unvalidated model label — faded
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="inline-block w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: '#1d4ed8' }} />
            Reference point
          </li>
        </ul>
      </div>
      <p className="mt-2 text-[10px] leading-snug text-amber-800 bg-amber-50 border border-amber-200 rounded px-2 py-1">
        Validation is synthetic demo data — not field validation.
      </p>
    </>
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
            {subtypeCounts.map(([s, n]) => (
              <option key={s} value={s}>{subtypeLabel(s)} ({n})</option>
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

        {/* Desktop: overlay legend; hidden on mobile where it would cover the map. */}
        <div className="hidden sm:block absolute bottom-2 left-2 bg-white/95 border border-stone-200 rounded-lg shadow p-2.5 max-h-56 overflow-y-auto text-xs z-10 w-60" aria-label="Map legend">
          {legendContent}
        </div>

        <p className="hidden sm:block absolute top-2 left-2 bg-white/95 border border-stone-200 rounded-lg shadow px-2 py-1 text-xs text-stone-600 z-10">
          Click a parcel to inspect or validate · all data is synthetic demo content
        </p>
      </div>

      {/* Mobile: legend in normal flow below the map so it never covers the view. */}
      <div className="sm:hidden px-3 py-3 border-t border-stone-100 text-xs space-y-2">
        <p className="text-stone-600">Tap a parcel to inspect or validate · all data is synthetic demo content</p>
        <div className="bg-stone-50 border border-stone-200 rounded-lg p-2.5" aria-label="Map legend">
          {legendContent}
        </div>
      </div>
    </section>
  );
}
