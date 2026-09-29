import { useEffect, useState } from 'react';
import type { Jurisdiction } from '../../types';

interface ScenarioResult {
  mode?: string;
  disclaimer?: string;
  parcels_considered?: number;
  baseline?: { carbon_tco2e?: number; profit_usd?: number };
  scenario?: { carbon_tco2e?: number; profit_usd?: number };
  deltas?: { carbon_tco2e?: number; profit_usd?: number };
  major_transitions?: Array<{ from: string; to: string; area_ha: number }>;
  parameters?: Record<string, unknown>;
}

export function ScenarioWorkbench({ jurisdiction }: { jurisdiction: Jurisdiction }) {
  const [conservation, setConservation] = useState(10);
  const [expansion, setExpansion] = useState(5);
  const [intensification, setIntensification] = useState(false);
  const [years, setYears] = useState(10);
  const [result, setResult] = useState<ScenarioResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/lumens/scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jurisdiction_code: jurisdiction.code,
          conservation_target_pct: conservation,
          agroforestry_expansion_pct: expansion,
          intensification,
          years,
        }),
      });
      if (!res.ok) throw new Error(`Scenario failed (${res.status})`);
      setResult(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Scenario failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResult(null);
    setError(null);
  }, [jurisdiction]);

  const fmt = (n?: number) =>
    n == null ? '—' : Math.abs(n) >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toLocaleString();

  return (
    <section aria-labelledby="scenario-heading" className="bg-white rounded-lg border border-stone-200 p-4">
      <h2 id="scenario-heading" className="text-sm font-semibold mb-1">Scenario workbench</h2>
      <p className="text-xs text-stone-500 mb-3">
        Explore illustrative green-growth pathways over this landscape&apos;s parcel catalogue.
        Outputs are demo projections from documented proxy coefficients — not measurements.
      </p>

      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <label className="text-xs text-stone-600 block">
          Conservation conversion: <span className="tabular-nums font-medium">{conservation}%</span> of lowest-carbon area
          <input
            type="range"
            min={0}
            max={50}
            step={5}
            value={conservation}
            onChange={(e) => setConservation(Number(e.target.value))}
            className="w-full accent-emerald-700"
            aria-label="Conservation conversion percentage"
          />
        </label>
        <label className="text-xs text-stone-600 block">
          Agroforestry expansion: <span className="tabular-nums font-medium">{expansion}%</span> of surrounding land
          <input
            type="range"
            min={0}
            max={50}
            step={5}
            value={expansion}
            onChange={(e) => setExpansion(Number(e.target.value))}
            className="w-full accent-emerald-700"
            aria-label="Agroforestry expansion percentage"
          />
        </label>
        <label className="text-xs text-stone-600 block">
          Planning horizon: <span className="tabular-nums font-medium">{years} years</span>
          <input
            type="range"
            min={1}
            max={30}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-emerald-700"
            aria-label="Planning horizon in years"
          />
        </label>
        <label className="flex items-center gap-2 text-xs text-stone-600 self-end">
          <input
            type="checkbox"
            checked={intensification}
            onChange={(e) => setIntensification(e.target.checked)}
            className="accent-emerald-700 h-4 w-4"
          />
          Intensification (+15% productivity on existing agroforestry)
        </label>
      </div>

      <button
        type="button"
        onClick={run}
        disabled={loading}
        className="rounded-md bg-emerald-700 text-white px-4 py-2 text-sm font-medium hover:bg-emerald-800 disabled:opacity-50"
      >
        {loading ? 'Running…' : 'Run scenario'}
      </button>

      {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}

      {result && (
        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-md border border-stone-200 p-3">
              <div className="text-xs text-stone-500">Carbon stock change</div>
              <div className={`text-lg font-semibold tabular-nums ${((result.deltas?.carbon_tco2e ?? 0) >= 0) ? 'text-emerald-700' : 'text-red-700'}`}>
                {((result.deltas?.carbon_tco2e ?? 0) >= 0 ? '+' : '') + fmt(result.deltas?.carbon_tco2e)} tCO₂e
              </div>
              <div className="text-[11px] text-stone-400">
                baseline {fmt(result.baseline?.carbon_tco2e)} → scenario {fmt(result.scenario?.carbon_tco2e)}
              </div>
            </div>
            <div className="rounded-md border border-stone-200 p-3">
              <div className="text-xs text-stone-500">Smallholder profit change</div>
              <div className={`text-lg font-semibold tabular-nums ${((result.deltas?.profit_usd ?? 0) >= 0) ? 'text-emerald-700' : 'text-red-700'}`}>
                {((result.deltas?.profit_usd ?? 0) >= 0 ? '+' : '') + fmt(result.deltas?.profit_usd)} USD
              </div>
              <div className="text-[11px] text-stone-400">
                baseline {fmt(result.baseline?.profit_usd)} → scenario {fmt(result.scenario?.profit_usd)}
              </div>
            </div>
          </div>

          {result.major_transitions && result.major_transitions.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold mb-1">Major land-use transitions</h3>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-stone-500 text-left border-b border-stone-200">
                    <th className="py-1 font-medium">From</th>
                    <th className="py-1 font-medium">To</th>
                    <th className="py-1 font-medium text-right">Area (ha)</th>
                  </tr>
                </thead>
                <tbody>
                  {result.major_transitions.map((t, i) => (
                    <tr key={i} className="border-b border-stone-100">
                      <td className="py-1 capitalize">{t.from.replace(/_/g, ' ')}</td>
                      <td className="py-1 capitalize">{t.to.replace(/_/g, ' ')}</td>
                      <td className="py-1 text-right tabular-nums">{t.area_ha.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="text-[11px] text-stone-500 border-t border-stone-100 pt-2">
            {result.disclaimer} Computed over {result.parcels_considered} catalogue parcels.
          </p>
        </div>
      )}
    </section>
  );
}
