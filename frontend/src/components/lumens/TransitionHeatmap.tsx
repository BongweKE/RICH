import React from 'react';
import { PontiusMetrics } from '../../types';

interface TransitionHeatmapProps {
  matrix: Record<string, Record<string, number>>;
  pontius?: PontiusMetrics;
}

export const TransitionHeatmap: React.FC<TransitionHeatmapProps> = ({ matrix, pontius }) => {
  const classes = Object.keys(matrix);
  if (classes.length === 0) return null;

  // Calculate totals and metrics per class
  const classStats = classes.map((c) => {
    const t1_area = Object.values(matrix[c] || {}).reduce((a, b) => a + b, 0);
    const persistence = matrix[c]?.[c] || 0;
    const gross_loss = t1_area - persistence;
    const t2_area = classes.reduce((sum, from_c) => sum + (matrix[from_c]?.[c] || 0), 0);
    const gross_gain = t2_area - persistence;
    const net_change = t2_area - t1_area;
    const persistence_pct = t1_area > 0 ? (persistence / t1_area) * 100 : 0;

    return {
      name: c,
      t1_area,
      t2_area,
      persistence,
      gross_loss,
      gross_gain,
      net_change,
      persistence_pct,
    };
  });

  return (
    <div className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs font-sans space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div>
          <span className="font-bold text-slate-200">Land Cover Transition Matrix (Heatmap)</span>
          <p className="text-[11px] text-slate-400">Rows = T1 Baseline • Columns = T2 Monitoring (Hectares)</p>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
          Diagonal = Persistence
        </span>
      </div>

      {/* Heatmap Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-[11px]">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="p-2 font-semibold">T1 \ T2</th>
              {classes.map((c) => (
                <th key={c} className="p-2 font-semibold capitalize text-center">
                  {c.replace('_', ' ')}
                </th>
              ))}
              <th className="p-2 font-semibold text-right text-slate-300">T1 Total</th>
              <th className="p-2 font-semibold text-right text-rose-400">Gross Loss</th>
              <th className="p-2 font-semibold text-right text-emerald-400">Persistence %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900">
            {classStats.map((row) => (
              <tr key={row.name} className="hover:bg-slate-900/50 transition-colors">
                <td className="p-2 font-bold capitalize text-slate-200">{row.name.replace('_', ' ')}</td>
                {classes.map((c) => {
                  const val = matrix[row.name]?.[c] || 0;
                  const isDiagonal = row.name === c;
                  return (
                    <td
                      key={c}
                      className={`p-2 text-center font-mono ${
                        isDiagonal
                          ? 'bg-emerald-950/40 text-emerald-300 font-bold border border-emerald-900/40 rounded'
                          : val > 500
                          ? 'bg-amber-950/30 text-amber-300 font-medium'
                          : val > 0
                          ? 'text-slate-300'
                          : 'text-slate-600'
                      }`}
                    >
                      {val > 0 ? val.toLocaleString() : '—'}
                    </td>
                  );
                })}
                <td className="p-2 text-right font-mono font-bold text-slate-200">
                  {row.t1_area.toLocaleString()}
                </td>
                <td className="p-2 text-right font-mono text-rose-400">
                  -{row.gross_loss.toLocaleString()}
                </td>
                <td className="p-2 text-right font-mono font-semibold text-emerald-400">
                  {row.persistence_pct.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-slate-800 text-slate-200 font-semibold">
              <td className="p-2">T2 Total</td>
              {classStats.map((c) => (
                <td key={c.name} className="p-2 text-center font-mono">
                  {c.t2_area.toLocaleString()}
                </td>
              ))}
              <td colSpan={3} />
            </tr>
            <tr className="text-[10px] text-slate-400">
              <td className="p-2">Net Change</td>
              {classStats.map((c) => (
                <td
                  key={c.name}
                  className={`p-2 text-center font-mono font-bold ${
                    c.net_change > 0 ? 'text-emerald-400' : c.net_change < 0 ? 'text-rose-400' : 'text-slate-500'
                  }`}
                >
                  {c.net_change > 0 ? `+${c.net_change.toLocaleString()}` : c.net_change.toLocaleString()}
                </td>
              ))}
              <td colSpan={3} />
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Pontius Decomposition Card */}
      {pontius && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
            <div className="text-slate-400 text-[10px] uppercase font-semibold">Quantity Disagreement</div>
            <div className="text-base font-bold text-sky-400 mt-0.5">
              {pontius.quantity_disagreement_ha.toLocaleString()} ha
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {pontius.quantity_pct}% of total landscape change (net shifts)
            </div>
          </div>
          <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
            <div className="text-slate-400 text-[10px] uppercase font-semibold">Allocation Disagreement</div>
            <div className="text-base font-bold text-amber-400 mt-0.5">
              {pontius.allocation_disagreement_ha.toLocaleString()} ha
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {pontius.allocation_pct}% of change (spatial swap between locations)
            </div>
          </div>
          <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
            <div className="text-slate-400 text-[10px] uppercase font-semibold">Total Gross Dynamics</div>
            <div className="text-base font-bold text-emerald-400 mt-0.5">
              {pontius.total_change_ha.toLocaleString()} ha
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Pontius Land Change Decomposition</div>
          </div>
        </div>
      )}
    </div>
  );
};
