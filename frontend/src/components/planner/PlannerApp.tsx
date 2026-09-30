import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Jurisdiction, Parcel } from '../../types';
import { api } from '../../services/api';
import { PlannerMapWorkspace } from './PlannerMapWorkspace';
import { ParcelDossier } from './ParcelDossier';
import { PlannerAssistant } from './PlannerAssistant';
import { ScenarioWorkbench } from './ScenarioWorkbench';
import { PlannerTour } from './PlannerTour';

type PlannerView = 'map' | 'validation' | 'scenarios' | 'assistant';

type DecisionState = 'saving' | 'saved' | 'failed';
type Decision = { decision: 'confirmed' | 'corrected' | 'rejected'; state: DecisionState };

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

const PAGE_SIZE = 10;

function isReviewed(p: Parcel): boolean {
  const status = p.validation_status;
  return status === 'community_validated' || status === 'expert_reviewed' || status === 'final';
}

export function PlannerApp() {
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>(PLANNER_JURISDICTIONS[0]);
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<PlannerView>('map');
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});
  const [page, setPage] = useState(0);

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
    setPage(0);
  }, [jurisdiction, view]);

  const validationQueue = useMemo(
    () =>
      parcels
        .filter((p) => !isReviewed(p) && !(p.id in decisions))
        .sort((a, b) => (a.confidence_score ?? 1) - (b.confidence_score ?? 1)),
    [parcels, decisions],
  );

  const persistDecision = useCallback(async (parcel: Parcel, decision: 'confirmed' | 'corrected' | 'rejected') => {
    setDecisions((prev) => ({ ...prev, [parcel.id]: { decision, state: 'saving' } }));
    const ok = await api.validateParcel(parcel.id, decision);
    setDecisions((prev) => ({
      ...prev,
      [parcel.id]: { decision, state: ok ? 'saved' : 'failed' },
    }));
    if (ok) {
      setParcels((prev) =>
        prev.map((p) =>
          p.id === parcel.id
            ? {
                ...p,
                validation_status:
                  decision === 'confirmed' ? 'community_validated' : 'expert_reviewed',
              }
            : p,
        ),
      );
    }
  }, []);

  const stats = useMemo(() => {
    const totalHa = parcels.reduce((sum, p) => sum + (p.area_ha || 0), 0);
    const synthetic = parcels.filter((p) => p.data_origin === 'synthetic').length;
    const saved = Object.values(decisions).filter((d) => d.state === 'saved').length;
    const failed = Object.values(decisions).filter((d) => d.state === 'failed').length;
    return {
      parcels: parcels.length,
      totalHa: Math.round(totalHa),
      synthetic,
      saved,
      failed,
      queue: validationQueue.length,
    };
  }, [parcels, decisions, validationQueue.length]);

  const pageCount = Math.max(1, Math.ceil(validationQueue.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageItems = validationQueue.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const goToParcel = useCallback((p: Parcel) => {
    setSelectedParcel(p);
    setView('map');
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <a href="#planner-main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:rounded">
        Skip to main content
      </a>
      <header className="bg-emerald-900 text-emerald-50">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="sm:flex-1 sm:min-w-0">
            <h1 className="text-lg font-semibold leading-tight">RICH Planner</h1>
            <p className="text-xs text-emerald-200">
              Land-use planning workspace for agroforestry landscapes
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
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
              Home
            </a>
          </div>
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
              {item.id === 'validation' && stats.queue > 0 && (
                <span className="ml-1.5 inline-block rounded-full bg-amber-500 text-white text-[10px] px-1.5 py-0.5 align-middle tabular-nums">
                  {stats.queue}
                </span>
              )}
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
            <div className="text-xl font-semibold tabular-nums">{loading ? '…' : stats.saved}</div>
            <div className="text-[11px] text-stone-500">
              Saved to database{stats.failed > 0 ? ` · ${stats.failed} failed` : ''}
            </div>
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
                  selectedParcel={selectedParcel}
                  onSelectParcel={setSelectedParcel}
                  onParcelValidated={(parcelId, decision) => {
                    if (decision === 'confirmed') {
                      setDecisions((prev) => ({ ...prev, [parcelId]: { decision: 'confirmed', state: 'saved' } }));
                      setParcels((prev) =>
                        prev.map((p) =>
                          p.id === parcelId ? { ...p, validation_status: 'community_validated' } : p,
                        ),
                      );
                    }
                  }}
                />
                <ParcelDossier parcel={selectedParcel} />
              </div>
            )}
            {view === 'validation' && (
              <section aria-labelledby="validation-heading">
                <div className="flex flex-wrap items-end justify-between gap-2 mb-1">
                  <h2 id="validation-heading" className="text-base font-semibold">Validation inbox</h2>
                  <p className="text-xs text-stone-500 tabular-nums">
                    {stats.queue} awaiting · {stats.saved} saved · {PAGE_SIZE} per page · sorted by lowest confidence first
                  </p>
                </div>
                <p className="text-sm text-stone-600 mb-3">
                  Each decision is submitted to the database immediately — you can work in short
                  connectivity windows without losing progress.
                  {' '}
                  <span className="text-amber-800 font-medium">
                    All parcels and validation decisions here are synthetic demo records — not real field validation.
                  </span>
                </p>
                {pageItems.length === 0 ? (
                  <p className="text-sm text-stone-500">
                    {validationQueue.length === 0
                      ? 'Queue is empty — every parcel in this landscape has been reviewed.'
                      : 'No items on this page.'}
                  </p>
                ) : (
                  <>
                    <ul className="space-y-2">
                      {pageItems.map((p) => {
                        const d = decisions[p.id];
                        const retry = () => { void persistDecision(p, d.decision); };
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
                                {p.area_ha ? `${p.area_ha.toFixed(1)} ha · ` : ''}
                                confidence {(p.confidence_score * 100).toFixed(0)}% ·
                                origin: {p.data_origin || 'unknown'}
                              </div>
                              <div className="text-xs text-stone-400 truncate" title={`Parcel ${p.id}`}>
                                ID {p.id}
                              </div>
                            </div>
                            {d && (
                              <span
                                role="status"
                                className={
                                  'text-xs px-2 py-1 rounded-full ' +
                                  (d.state === 'saving'
                                    ? 'bg-stone-100 text-stone-600'
                                    : d.state === 'saved'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-red-100 text-red-800')
                                }
                              >
                                {d.state === 'saving' ? 'Saving…' : d.state === 'saved' ? `Saved (${d.decision})` : 'Save failed'}
                              </span>
                            )}
                            <div className="flex flex-wrap gap-2" role="group" aria-label={`Validation actions for parcel ${p.id}`}>
                              {(['confirmed', 'corrected', 'rejected'] as const).map((dec) => (
                                <button
                                  key={dec}
                                  type="button"
                                  disabled={d !== undefined && d.state !== 'failed'}
                                  aria-pressed={d?.decision === dec}
                                  onClick={() => { void persistDecision(p, dec); }}
                                  className={
                                    'px-3 py-1.5 rounded text-xs font-medium border transition-colors disabled:opacity-60 ' +
                                    (d?.decision === dec
                                      ? dec === 'confirmed'
                                        ? 'bg-emerald-700 border-emerald-700 text-white'
                                        : dec === 'corrected'
                                        ? 'bg-amber-600 border-amber-600 text-white'
                                        : 'bg-red-700 border-red-700 text-white'
                                      : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100')
                                  }
                                >
                                  {dec === 'confirmed' ? 'Confirm' : dec === 'corrected' ? 'Correct' : 'Reject'}
                                </button>
                              ))}
                              {d?.state === 'failed' && (
                                <button
                                  type="button"
                                  onClick={retry}
                                  className="px-2 py-1.5 rounded text-xs font-medium border border-stone-400 text-stone-700 hover:bg-stone-100"
                                >
                                  Retry
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => goToParcel(p)}
                                className="px-2 py-1.5 rounded text-xs font-medium border border-stone-300 text-stone-700 hover:bg-stone-100"
                              >
                                Show on map
                              </button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    <nav
                      aria-label="Validation pagination"
                      className="mt-4 flex items-center justify-between gap-2"
                    >
                      <button
                        type="button"
                        onClick={() => setPage((v) => Math.max(0, v - 1))}
                        disabled={safePage === 0}
                        className="px-3 py-1.5 rounded border border-stone-300 bg-white text-sm disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span className="text-xs text-stone-500 tabular-nums">
                        Page {safePage + 1} of {pageCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setPage((v) => Math.min(pageCount - 1, v + 1))}
                        disabled={safePage >= pageCount - 1}
                        className="px-3 py-1.5 rounded border border-stone-300 bg-white text-sm disabled:opacity-50"
                      >
                        Next
                      </button>
                    </nav>
                  </>
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

      <PlannerTour />

      <footer className="border-t border-stone-200 bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 text-xs text-stone-500">
          RICH Planner · Data provenance is shown on every record ·
          {' '}
          <a href="/" className="underline">Home</a>
        </div>
      </footer>
    </div>
  );
}
