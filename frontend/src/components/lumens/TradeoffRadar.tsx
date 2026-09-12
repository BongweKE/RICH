import React from 'react';
import { LASEMAxis, LASEMScenario } from '../../types';

interface TradeoffRadarProps {
  axes: LASEMAxis[];
  scenarios: LASEMScenario[];
}

export const TradeoffRadar: React.FC<TradeoffRadarProps> = ({ axes, scenarios }) => {
  const size = 320;
  const center = size / 2;
  const radius = size * 0.38;
  const numAxes = axes.length;

  if (numAxes === 0) return null;

  // Compute coordinate for an axis angle and value (0 to 1)
  const getCoordinates = (index: number, value: number) => {
    const angle = (Math.PI * 2 / numAxes) * index - Math.PI / 2;
    const r = radius * Math.max(0, Math.min(1, value));
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Concentric polygon grids (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs font-sans space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div>
          <span className="font-bold text-slate-200">LASEM 5-Axis Scenario Evaluation (Spider Chart)</span>
          <p className="text-[11px] text-slate-400">Multi-benefit Trade-Off Assessment (Normalized 0.0 – 1.0)</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around gap-4">
        {/* Radar SVG */}
        <div className="relative">
          <svg width={size} height={size} className="overflow-visible select-none">
            {/* Background Grid Circles / Polygons */}
            {gridLevels.map((lvl) => {
              const points = axes
                .map((_, i) => {
                  const { x, y } = getCoordinates(i, lvl);
                  return `${x},${y}`;
                })
                .join(' ');
              return (
                <polygon
                  key={lvl}
                  points={points}
                  fill="none"
                  stroke="#334155"
                  strokeWidth="1"
                  strokeDasharray={lvl === 1.0 ? 'none' : '2,2'}
                />
              );
            })}

            {/* Radial Axis Spokes & Labels */}
            {axes.map((axis, i) => {
              const { x, y } = getCoordinates(i, 1.0);
              const labelCoord = getCoordinates(i, 1.22);
              return (
                <g key={axis.key}>
                  <line x1={center} y1={center} x2={x} y2={y} stroke="#334155" strokeWidth="1" />
                  <text
                    x={labelCoord.x}
                    y={labelCoord.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-slate-300 text-[9px] font-semibold"
                  >
                    {axis.label}
                  </text>
                </g>
              );
            })}

            {/* Scenario Polygons */}
            {scenarios.map((sc) => {
              const points = axes
                .map((axis, i) => {
                  const val = sc.metrics[axis.key] || 0.5;
                  const { x, y } = getCoordinates(i, val);
                  return `${x},${y}`;
                })
                .join(' ');

              return (
                <g key={sc.id}>
                  <polygon
                    points={points}
                    fill={sc.color}
                    fillOpacity="0.25"
                    stroke={sc.color}
                    strokeWidth="2.5"
                    className="transition-all duration-300 hover:fill-opacity-40"
                  />
                  {axes.map((axis, i) => {
                    const val = sc.metrics[axis.key] || 0.5;
                    const { x, y } = getCoordinates(i, val);
                    return <circle key={axis.key} cx={x} cy={y} r="3" fill={sc.color} />;
                  })}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend & Scenario Impact Cards */}
        <div className="flex-1 space-y-2 max-w-xs">
          {scenarios.map((sc) => (
            <div
              key={sc.id}
              className="p-2.5 rounded-lg bg-slate-900 border transition-all"
              style={{ borderColor: `${sc.color}40` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sc.color }} />
                  <span className="font-bold text-slate-100 text-[11px]">{sc.name}</span>
                </div>
                <span
                  className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: `${sc.color}20`, color: sc.color }}
                >
                  {sc.net_carbon_mtco2e > 0 ? `+${sc.net_carbon_mtco2e}` : sc.net_carbon_mtco2e} MtCO2e
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-400 mt-1.5">
                <span>Forest Cover: <strong className="text-slate-200">{sc.forest_cover_pct}%</strong></span>
                <span>Bio Index: <strong className="text-slate-200">{Math.round((sc.metrics.biodiversity || 0) * 100)}%</strong></span>
                <span>NPV Index: <strong className="text-slate-200">{Math.round((sc.metrics.economic_npv || 0) * 100)}%</strong></span>
                <span>Water Retention: <strong className="text-slate-200">{Math.round((sc.metrics.hydrology_soil || 0) * 100)}%</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
