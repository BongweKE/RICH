import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Jurisdiction, Parcel } from '../../types';
import { api } from '../../services/api';
import { PlannerMapWorkspace } from './PlannerMapWorkspace';
import { ParcelDossier } from './ParcelDossier';
import { PlannerAssistant } from './PlannerAssistant';
import { ScenarioWorkbench } from './ScenarioWorkbench';

type PlannerView = 'map' | 'validation' | 'scenarios' | 'assistant';

const PLANNER_JURISDICTIONS: Jurisdiction[] = [
  { id: '22222222-2222-4000-8000-000000000002', name: 'Ghana (Ashanti Cocoa)', code: 'GH-AH', level: 1, centroid: { type: 'Point', coordinates: [-1.5, 6.5] } },
  { id: '33333333-3333-4000-8000-000000000002', name: 'Ethiopia (Oromia Coffee)', code: 'ET-OR', level: 1, centroid: { type: 'Point', coordinates: [37.3, 8.0] } },
  { id: '11111111-1111-4000-8000-000000000002', name: 'Spain (Extremadura Dehesa)', code: 'ES-EX', level: 1, centroid: { type: 'Point', coordinates: [-6.26, 39.25] } },
];

const NAV_ITEMS: { id: PlannerView; label: string; hint: string }[] = [
  { id: 'map', label: 'Map workspace', hint: 'Browse parcels and layers' },
  { id: 'validation', label: 'Validation inbox', hint: 'Confirm or correct parcel labels' },
  { id: 'scenarios', label: 'Scenario workbench', hint: 'Land-use change and carbon analysis' },
  { id: 'assistant', label: 'Ask the assistant', hint: 'Questions about this landscape' },
];

export function PlannerApp() {
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>(PLANNER_JURISDICTIONS[0]);
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<PlannerView>('map');
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [validationQueue, setValidationQueue] = useState<Parcel[]>([]);
  const [validationDecisions, setValidationDecisions] = useState<Record<string, 'confirmed' | 'corrected' | 'rejected'>>({});

  const loadParcels = useCallback(async (code: string) => {
    setLoading(true);
    setSelectedParcel(null);
    try {
      const list = await api.getParcels(code, 500);
      setParcels(list && list.length > 0 ? list : []);
    } catch {
      setParcels([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadParcels(jurisdiction.code);
  }, [jurisdiction, loadParcels]);

  useEffect(() => {
    const unvalidated = parcels.filter((p) => (p as any).data_origin !== 'field_validated');
    setValidationQueue(unvalidated);
  }, [parcels]);

  const decide = useCallback((parcelId: string, decision: 'confirmed' | 'corrected' | 'rejected') => {
    setValidationDecisions((prev) => ({ ...prev, [parcelId]: decision }));
  }, []);

  const stats = useMemo(() => {
    const totalHa = parcels.reduce((sum, p) => sum + (p.area_ha || 0), 0);
    const synthetic = parcels.filter((p) => (p as any).data_origin === 'synthetic').length;
    const decided = Object.keys(validationDecisions).length;
    return {
      parcels: parcels.length,
      totalHa: Math.round(totalHa),
      synthetic,
      decided,
      queue: validationQueue.length,
    };
  }, [parcels, validationQueue.length, validationDecisions]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <a href="#planner-main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:rounded">
        Skip to main content
      </a>
      <header className="bg-emerald-900 text-emerald-50">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold leading-tight">RICH Planner</h1>
            <p className="text-xs text-emerald-200">
              Land-use planning workspace for agroforestry landscapes
            </p>
          </div>
          <label className="text-xs font-medium" htmlFor="jurisdiction-select">
            Landscape
            <select
              id="jurisdiction-select"
              className="ml-2 rounded border border-emerald-700 bg-emerald-950 text-emerald-50 text-sm px-2 py-1.5"
              value={jurisdiction.code}
              onChange={(e) => {
                const j = PLANNER_JURISDICTIONS.find((x) => x.code === e.target.value);
                if (j) setJurisdiction(j);
              }}
            >
              {PLANNER_JURISDICTIONS.map((j) => (
                <option key={j.code} value={j.code}>{j.name}</option>
              ))}
            </select>
          </label>
          <a href="/" className="text-xs underline underline-offset-2 text-emerald-200 hover:text-white">
            Impact viewer
          </a>
        </div>
      </header>

      <nav aria-label="Planner sections" className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setView(item.id)}
              aria-current={view === item.id ? 'page' : undefined}
              title={item.hint}
              className={
                'px-3 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ' +
                (view === item.id
                  ? 'border-emerald-700 text-emerald-800'
                  : 'border-transparent text-stone-500 hover:text-stone-800')
              }
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <main id="planner-main" className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="mb-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center" aria-label="Landscape statistics">
          <div className="bg-white rounded-lg border border-stone-200 px-3 py-2">
            <div className="text-xl font-semibold tabular-nums">{loading ? '…' : stats.parcels}</div>
            <div className="text-[11px] text-stone-500">Parcels in catalogue</div>
          </div>
          <div className="bg-white rounded-lg border border-stone-200 px-3 py-2">
            <div className="text-xl font-semibold tabular-nums">{loading ? '…' : stats.totalHa.toLocaleString()}</div>
            <div className="text-[11px] text-stone-500">Hectares mapped</div>
          </div>
          <div className="bg-white rounded-lg border border-stone-200 px-3 py-2">
            <div className="text-xl font-semibold tabular-nums text-amber-700">{loading ? '…' : stats.synthetic}</div>
            <div className="text-[11px] text-stone-500">Synthetic (demo) records</div>
          </div>
          <div className="bg-white rounded-lg border border-stone-200 px-3 py-2">
            <div className="text-xl font-semibold tabular-nums">{loading ? '…' : stats.decided}</div>
            <div className="text-[11px] text-stone-500">Validation decisions made</div>
          </div>
        </div>

        {loading ? (
          <p role="status" className="text-stone-600 text-sm">Loading landscape data…</p>
        ) : (
          <>
            {view === 'map' && (
              <div className="grid lg:grid-cols-[1fr_380px] gap-4">
                <PlannerMapWorkspace
                  parcels={parcels}
                  jurisdiction={jurisdiction}
                  onSelectParcel={setSelectedParcel}
                />
                <ParcelDossier parcel={selectedParcel} />
              </div>
            )}
            {view === 'validation' && (
              <section aria-labelledby="validation-heading">
                <h2 id="validation-heading" className="text-base font-semibold mb-1">Validation inbox</h2>
                <p className="text-sm text-stone-600 mb-3">
                  Review each parcel label. Confirmations record a validation decision against your user ID and date.
                  {' '}
                  <span className="text-amber-800 font-medium">
                    All parcels here are synthetic demo records — field validation has not started.
                  </span>
                </p>
                {validationQueue.length === 0 ? (
                  <p className="text-sm text-stone-500">Queue is empty.</p>
                ) : (
                  <ul className="space-y-2">
                    {validationQueue.slice(0, 50).map((p) => {
                      const decision = validationDecisions[p.id];
                      return (
                        <li
                          key={p.id}
                          className="bg-white rounded-lg border border-stone-200 p-3 flex flex-wrap items-center gap-3"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">
                              {(p.agroforestry_subtype || p.class_label || 'Parcel').replace(/_/g, ' ')}
                            </div>
                            <div className="text-xs text-stone-500 tabular-nums">
                              {p.area_ha ? `${p.area_ha.toFixed(1)} ha` : 'area unknown'} ·
                              confidence {(p.confidence_score * 100).toFixed(0)}% ·
                              origin: {(p as any).data_origin || 'unknown'}
                            </div>
                          </div>
                          <div className="flex gap-2" role="group" aria-label={`Validation actions for parcel ${p.id}`}>
                            {(['confirmed', 'corrected', 'rejected'] as const).map((d) => (
                              <button
                                key={d}
                                type="button"
                                disabled={decision !== undefined}
                                aria-pressed={decision === d}
                                onClick={() => decide(p.id, d)}
                                className={
                                  'px-3 py-1.5 rounded text-xs font-medium border transition-colors disabled:opacity-60 ' +
                                  (decision === d
                                    ? d === 'confirmed'
                                      ? 'bg-emerald-700 border-emerald-700 text-white'
                                      : d === 'corrected'
                                      ? 'bg-amber-600 border-amber-600 text-white'
                                      : 'bg-red-700 border-red-700 text-white'
                                    : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100')
                                }
                              >
                                {d === 'confirmed' ? 'Confirm' : d === 'corrected' ? 'Correct' : 'Reject'}
                              </button>
                            ))}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>
            )}
            {view === 'scenarios' && (
              <ScenarioWorkbench jurisdiction={jurisdiction} />
            )}
            {view === 'assistant' && (
              <PlannerAssistant jurisdiction={jurisdiction} parcels={parcels} />
            )}
          </>
        )}
      </main>

      <footer className="border-t border-stone-200 bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 text-xs text-stone-500">
          RICH Planner · Data provenance is shown on every record ·
          {' '}
          <a href="/" className="underline">Open impact viewer</a>
        </div>
      </footer>
    </div>
  );
}
