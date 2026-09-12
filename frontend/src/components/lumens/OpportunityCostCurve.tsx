import React from 'react';
import { ProfitabilityResponse } from '../../types';

interface OpportunityCostCurveProps {
  data: ProfitabilityResponse;
}

export const OpportunityCostCurve: React.FC<OpportunityCostCurveProps> = ({ data }) => {
  const { systems = [], abatement_curve = [], key_finding } = data;

  return (
    <div className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs font-sans space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div>
          <span className="font-bold text-slate-200">TA-Profit: Economic Returns & Opportunity Cost Curve</span>
          <p className="text-[11px] text-slate-400">20-Year Net Present Value (NPV @ 10%) and REDD+ Abatement Costs</p>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
          IPCC Tier 2 Valuation
        </span>
      </div>

      {/* Systems Comparison Table */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {systems.map((sys, idx) => {
          const isAgro = sys.type === 'agroforestry';
          return (
            <div
              key={idx}
              className={`p-3 rounded-lg border space-y-2 ${
                isAgro
                  ? 'bg-emerald-950/20 border-emerald-500/50 shadow-md shadow-emerald-950/30'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="font-bold text-slate-200 text-xs">{sys.system}</span>
                {isAgro && (
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded">
                    HIGHEST NPV
                  </span>
                )}
              </div>

              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>20-Yr NPV:</span>
                  <span className="font-mono font-bold text-white">${sys.npv_20yr_usd_ha.toLocaleString()} / ha</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Annual Profit:</span>
                  <span className="font-mono text-emerald-300">${sys.annual_net_profit_usd_ha.toLocaleString()} / ha</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Carbon Revenue:</span>
                  <span className="font-mono text-teal-300">${sys.carbon_credit_yield_usd_ha_yr} / ha / yr</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Labor Demand:</span>
                  <span className="font-mono text-slate-300">{sys.labor_days_ha_yr} days / ha / yr</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Abatement Curve Visualization */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 space-y-2">
        <div className="text-[11px] font-bold text-slate-200 flex items-center justify-between">
          <span>Marginal Abatement Cost Curve (MACC for Landscape REDD+)</span>
          <span className="text-[10px] text-slate-400">USD per Ton CO2e Avoided</span>
        </div>

        <div className="space-y-2 pt-1">
          {abatement_curve.map((tier, idx) => {
            const isNegative = tier.opp_cost_usd_tco2e < 0;
            return (
              <div key={idx} className="flex items-center space-x-3 text-[11px]">
                <span className="w-56 text-slate-300 truncate">{tier.tier}</span>
                <div className="flex-1 flex items-center space-x-2">
                  <div
                    className={`h-4 rounded font-mono text-[9px] flex items-center px-1.5 font-bold ${
                      isNegative
                        ? 'bg-emerald-600/60 text-emerald-200 border border-emerald-500/50'
                        : 'bg-amber-600/60 text-amber-200 border border-amber-500/50'
                    }`}
                    style={{ width: `${Math.max(25, tier.cumulative_potential_mtco2e * 10)}%` }}
                  >
                    {isNegative ? '' : '+'}${tier.opp_cost_usd_tco2e.toFixed(2)} / tCO2e
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {tier.cumulative_potential_mtco2e} MtCO2e
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Scientific Finding */}
      {key_finding && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-[11px] leading-relaxed">
          <strong className="text-white">Scientific Finding (LUMENS TA-Profit): </strong>
          {key_finding}
        </div>
      )}
    </div>
  );
};
