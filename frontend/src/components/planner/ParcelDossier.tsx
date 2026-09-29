import type { Parcel } from '../../types';

const ORIGIN_LABELS: Record<string, string> = {
  synthetic: 'Synthetic (demo data)',
  derived: 'Derived from open data',
  field_validated: 'Field-validated',
  model_output: 'Model output',
};

export function ParcelDossier({ parcel }: { parcel: Parcel | null }) {
  if (!parcel) {
    return (
      <aside aria-labelledby="dossier-heading" className="bg-white rounded-lg border border-stone-200 p-4">
        <h2 id="dossier-heading" className="text-sm font-semibold mb-2">Parcel dossier</h2>
        <p className="text-sm text-stone-500">
          Select a parcel on the map to inspect its provenance, evidence status,
          and due-diligence details.
        </p>
      </aside>
    );
  }

  const origin = (parcel as any).data_origin || 'unknown';
  const originLabel = ORIGIN_LABELS[origin] || origin;
  const isSynthetic = origin === 'synthetic';

  return (
    <aside aria-labelledby="dossier-heading" className="bg-white rounded-lg border border-stone-200 p-4 h-fit">
      <h2 id="dossier-heading" className="text-sm font-semibold mb-3">Parcel dossier</h2>

      {isSynthetic && (
        <p role="note" className="mb-3 rounded border border-amber-300 bg-amber-50 text-amber-900 text-xs px-3 py-2">
          <strong>Demo record.</strong> This parcel was generated for illustration.
          It has no field validation and must not be used for compliance or finance decisions.
        </p>
      )}

      <dl className="text-sm space-y-2">
        <div className="flex justify-between gap-3">
          <dt className="text-stone-500">Type</dt>
          <dd className="font-medium text-right">{(parcel.agroforestry_subtype || parcel.class_label || '—').replace(/_/g, ' ')}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-stone-500">Area</dt>
          <dd className="font-medium tabular-nums">{parcel.area_ha != null ? `${parcel.area_ha.toFixed(1)} ha` : 'Unknown'}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-stone-500">EUDR geolocation rule</dt>
          <dd className="font-medium text-right">
            {parcel.area_ha != null && parcel.area_ha < 4 ? 'GPS point sufficient (< 4 ha)' : 'Polygon required (≥ 4 ha)'}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-stone-500">Confidence</dt>
          <dd className="font-medium tabular-nums">{(parcel.confidence_score * 100).toFixed(0)}%</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-stone-500">Uncertainty</dt>
          <dd className="font-medium tabular-nums">{parcel.uncertainty != null ? `${(parcel.uncertainty * 100).toFixed(0)}%` : '—'}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-stone-500">Data origin</dt>
          <dd className="font-medium text-right">{originLabel}</dd>
        </div>
        <div>
          <dt className="text-stone-500">Source</dt>
          <dd className="font-medium break-words">{parcel.source || '—'}</dd>
        </div>
        {(parcel as any).generation_method && (
          <div>
            <dt className="text-stone-500">Generation method</dt>
            <dd className="font-medium break-words">{(parcel as any).generation_method}</dd>
          </div>
        )}
        {parcel.source_url && (
          <div>
            <dt className="text-stone-500">Source URL</dt>
            <dd className="break-words">
              <a href={parcel.source_url} target="_blank" rel="noopener noreferrer" className="text-emerald-800 underline">
                {parcel.source_url}
              </a>
            </dd>
          </div>
        )}
        <div>
          <dt className="text-stone-500">Evidence checklist</dt>
          <dd>
            <ul className="mt-1 space-y-1 text-xs">
              <li>{parcel.geometry ? '✓' : '✗'} Geometry on record</li>
              <li>{origin === 'field_validated' ? '✓' : '✗'} Field validation</li>
              <li>{parcel.source_url ? '✓' : '✗'} Verifiable source URL</li>
            </ul>
          </dd>
        </div>
      </dl>

      <button
        type="button"
        className="mt-4 w-full rounded bg-stone-800 text-white text-xs font-medium px-3 py-2 hover:bg-stone-900"
        onClick={() => {
          const feature = {
            type: 'Feature',
            properties: parcel as unknown as Record<string, unknown>,
            geometry: parcel.geometry,
          };
          const blob = new Blob([JSON.stringify(feature, null, 2)], { type: 'application/geo+json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `parcel-${parcel.id.slice(0, 8)}.geojson`;
          a.click();
          URL.revokeObjectURL(url);
        }}
      >
        Export as GeoJSON
      </button>
    </aside>
  );
}
