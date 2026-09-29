import { useEffect, useState } from 'react';
import type { Jurisdiction } from '../../types';

interface PrequesResult {
  mode?: string;
  disclaimer?: string;
  statistics?: {
    total_landscape_ha?: number;
    pct_landscape_changed?: number;
    major_transitions?: Array<{ from: string; to: string; area_ha: number }>;
  };
}

export function ScenarioWorkbench({ jurisdiction }: { jurisdiction: Jurisdiction }) {
  const [result, setResult] = useState<PrequesResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const runDemo = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/lumens/interactive-preques', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jurisdiction_code: jurisdiction.code, year_t1: 2018, year_t2: 2024 }),
      });
      if (!res.ok) throw new Error(`Analysis failed (${res.status})`);
      setResult(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResult(null);
    setError(null);
  }, [jurisdiction]);

  return (
    <section aria-labelledby="scenario-heading" className="bg-white rounded-lg border border-stone-200 p-4">
      <h2 id="scenario-heading" className="text-sm font-semibold mb-1">Scenario workbench</h2>
      <p className="text-sm text-stone-600 mb-3">
        Land-use change analysis (Pre-QuES) for {jurisdiction.name}. The demo run
        illustrates the workflow on a synthetic landscape; production runs require
        ingested satellite land-cover rasters for the period.
      </p>
      <button
        type="button"
        onClick={runDemo}
        disabled={loading}
        className="rounded bg-stone-800 text-white text-sm font-medium px-4 py-2 hover:bg-stone-900 disabled:opacity-50"
      >
        {loading ? 'Running…' : 'Run illustrative 2018–2024 change demo'}
      </button>

      {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}

      {result && (
        <div className="mt-4">
          <p role="note" className="rounded border border-amber-300 bg-amber-50 text-amber-900 text-xs px-3 py-2 mb-3">
            <strong>Illustrative demo output.</strong> {result.disclaimer}
          </p>
          <dl className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded border border-stone-200 px-3 py-2">
              <dt className="text-stone-500 text-xs">Landscape area (demo)</dt>
              <dd className="font-semibold tabular-nums">
                {result.statistics?.total_landscape_ha?.toLocaleString() ?? '—'} ha
              </dd>
            </div>
            <div className="rounded border border-stone-200 px-3 py-2">
              <dt className="text-stone-500 text-xs">Changed share of landscape</dt>
              <dd className="font-semibold tabular-nums">
                {result.statistics?.pct_landscape_changed ?? '—'}%
              </dd>
            </div>
          </dl>
          {result.statistics?.major_transitions?.length ? (
            <table className="mt-3 w-full text-sm">
              <caption className="text-xs text-stone-500 text-left mb-1">Major land-use transitions (illustrative)</caption>
              <thead>
                <tr className="text-left text-xs text-stone-500 border-b border-stone-200">
                  <th scope="col" className="py-1 font-medium">From</th>
                  <th scope="col" className="py-1 font-medium">To</th>
                  <th scope="col" className="py-1 font-medium text-right">Area (ha)</th>
                </tr>
              </thead>
              <tbody>
                {result.statistics.major_transitions.slice(0, 8).map((t, i) => (
                  <tr key={i} className="border-b border-stone-100">
                    <td className="py-1 capitalize">{t.from}</td>
                    <td className="py-1 capitalize">{t.to}</td>
                    <td className="py-1 text-right tabular-nums">{t.area_ha.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
      )}
    </section>
  );
}
