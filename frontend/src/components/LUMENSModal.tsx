import React, { useState, useEffect } from 'react';
import { X, BarChart3, RefreshCw } from 'lucide-react';
import { api } from '../services/api';
import {
  PreQuESResponse,
  CarbonResponse,
  LASEMTradeoffResponse,
  HydrologyResponse,
  ProfitabilityResponse,
} from '../types';
import { SankeyDiagram } from './lumens/SankeyDiagram';
import { TransitionHeatmap } from './lumens/TransitionHeatmap';
import { TradeoffRadar } from './lumens/TradeoffRadar';
import { OpportunityCostCurve } from './lumens/OpportunityCostCurve';

interface LUMENSModalProps {
  isOpen: boolean;
  onClose: () => void;
  jurisdictionCode: string;
}

export const LUMENSModal: React.FC<LUMENSModalProps> = ({
  isOpen,
  onClose,
  jurisdictionCode,
}) => {
  const [tab, setTab] = useState<'preques' | 'carbon' | 'biodiversity' | 'hydrology' | 'profitability' | 'sciendo'>('preques');
  const [isRunning, setIsRunning] = useState(false);

  // Pre-QuES State
  const [prequesData, setPrequesData] = useState<PreQuESResponse | null>(null);
  const [cutoffHa, setCutoffHa] = useState<number>(100);

  // Carbon State
  const [carbonData, setCarbonData] = useState<CarbonResponse | null>(null);
  const [carbonFactors, setCarbonFactors] = useState({
    forest: 150.0,
    agroforestry: 85.0,
    cropland: 25.0,
    grassland: 45.0,
  });

  // Hydrology State
  const [hydrologyData, setHydrologyData] = useState<HydrologyResponse | null>(null);

  // Profitability State
  const [profitabilityData, setProfitabilityData] = useState<ProfitabilityResponse | null>(null);

  // LASEM Trade-off State
  const [tradeoffData, setTradeoffData] = useState<LASEMTradeoffResponse | null>(null);
  const [levers, setLevers] = useState({
    agroforestry_expansion_pct: 25,
    deforestation_enforcement_pct: 90,
    riparian_restoration_pct: 75,
  });

  // Load analytical models when opened or when jurisdiction changes
  useEffect(() => {
    if (!isOpen) return;

    const loadData = async () => {
      setIsRunning(true);
      try {
        const [pq, cb, hy, pr, tr] = await Promise.all([
          api.getInteractivePreQUES(jurisdictionCode, 2018, 2024, cutoffHa),
          api.getInteractiveCarbon(jurisdictionCode, carbonFactors),
          api.getHydrology(jurisdictionCode, 1350),
          api.getProfitability(jurisdictionCode, 'shade_cocoa'),
          api.getInteractiveTradeoff(
            jurisdictionCode,
            levers.agroforestry_expansion_pct,
            levers.deforestation_enforcement_pct,
            levers.riparian_restoration_pct
          ),
        ]);
        setPrequesData(pq);
        setCarbonData(cb);
        setHydrologyData(hy);
        setProfitabilityData(pr);
        setTradeoffData(tr);
      } catch (e) {
        console.error('Error loading LUMENS data:', e);
      } finally {
        setIsRunning(false);
      }
    };

    loadData();
  }, [isOpen, jurisdictionCode]);

  // Handle Carbon parameter updates
  const handleUpdateCarbon = async (classKey: keyof typeof carbonFactors, val: number) => {
    const updated = { ...carbonFactors, [classKey]: val };
    setCarbonFactors(updated);
    const res = await api.getInteractiveCarbon(jurisdictionCode, updated);
    setCarbonData(res);
  };

  // Handle LASEM lever updates
  const handleUpdateLever = async (leverKey: keyof typeof levers, val: number) => {
    const updated = { ...levers, [leverKey]: val };
    setLevers(updated);
    const res = await api.getInteractiveTradeoff(
      jurisdictionCode,
      updated.agroforestry_expansion_pct,
      updated.deforestation_enforcement_pct,
      updated.riparian_restoration_pct
    );
    setTradeoffData(res);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 select-none font-sans">
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="h-14 px-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-sm font-bold text-white tracking-wide">LUMENS Scientific Laboratory</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {jurisdictionCode} Pilot
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Land Use Planning for Multiple Environmental Services (CIFOR-ICRAF)
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {isRunning && (
              <span className="flex items-center space-x-1.5 text-xs text-emerald-400">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Computing...</span>
              </span>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Subnav Tabs */}
        <div className="px-6 border-b border-slate-800 flex items-center space-x-6 text-xs bg-slate-900/40 overflow-x-auto">
          {[
            { id: 'preques', label: 'Pre-QuES (Land Use Flux & Matrix)' },
            { id: 'carbon', label: 'QUES-C (4-Pool Carbon Accounting)' },
            { id: 'biodiversity', label: 'QUES-B (Habitat & Wildlife Corridors)' },
            { id: 'hydrology', label: 'QUES-H (RUSLE Soil & Water)' },
            { id: 'profitability', label: 'TA-Profit (Economics & REDD+ MACC)' },
            { id: 'sciendo', label: 'SCIENDO & LASEM (Trade-off Spider)' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`py-3 font-semibold transition-colors border-b-2 whitespace-nowrap ${
                tab === t.id
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-200">
          {/* TAB 1: PRE-QUES */}
          {tab === 'preques' && prequesData && (
            <div className="space-y-6">
              <SankeyDiagram
                data={prequesData.sankey_data}
                cutoffHa={cutoffHa}
                onCutoffChange={(val) => {
                  setCutoffHa(val);
                  api.getInteractivePreQUES(jurisdictionCode, 2018, 2024, val).then(setPrequesData);
                }}
              />
              <TransitionHeatmap
                matrix={prequesData.crosstab_matrix}
                pontius={prequesData.statistics.pontius}
              />
            </div>
          )}

          {/* TAB 2: QUES-C CARBON */}
          {tab === 'carbon' && carbonData && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Baseline Stock (T1)</div>
                  <div className="text-xl font-bold text-white mt-1">
                    {(carbonData.total_carbon_stock_t1_tc / 1e6).toFixed(2)} MtC
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">4 IPCC Pools modeled</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Agroforestry Removals</div>
                  <div className="text-xl font-bold text-emerald-400 mt-1">
                    +{(carbonData.gross_removals_tco2e / 1e3).toFixed(1)}k tCO2e
                  </div>
                  <div className="text-[10px] text-emerald-500 mt-1">Cumulative over 6 years</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Net Climate Impact</div>
                  <div className="text-xl font-bold text-teal-300 mt-1">
                    +{(carbonData.net_climate_impact_tco2e / 1e3).toFixed(1)}k tCO2e
                  </div>
                  <div className="text-[10px] text-teal-400 mt-1">{carbonData.tier_level}</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">VCM Revenue Potential</div>
                  <div className="text-xl font-bold text-sky-400 mt-1">
                    ${((carbonData.voluntary_carbon_credits_potential_usd || 0) / 1e6).toFixed(2)}M
                  </div>
                  <div className="text-[10px] text-sky-500 mt-1">@ $12/tCO2e removal credit</div>
                </div>
              </div>

              {/* Dynamic Emission Factor Sliders */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div>
                    <span className="font-bold text-slate-200">Interactive Carbon Density Parameters (tC / ha)</span>
                    <p className="text-[11px] text-slate-400">
                      Adjust factors to simulate Tier 1 (IPCC Defaults) vs Tier 2 (Regional) vs Tier 3 (GEDI LiDAR)
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                    Real-time Recalculation
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">Forest Carbon Density:</span>
                      <span className="font-mono text-emerald-400 font-bold">{carbonFactors.forest} tC/ha</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="220"
                      step="5"
                      value={carbonFactors.forest}
                      onChange={(e) => handleUpdateCarbon('forest', Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">Shaded Agroforestry Density:</span>
                      <span className="font-mono text-teal-400 font-bold">{carbonFactors.agroforestry} tC/ha</span>
                    </div>
                    <input
                      type="range"
                      min="40"
                      max="140"
                      step="5"
                      value={carbonFactors.agroforestry}
                      onChange={(e) => handleUpdateCarbon('agroforestry', Number(e.target.value))}
                      className="w-full accent-teal-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">Annual Cropland Density:</span>
                      <span className="font-mono text-amber-400 font-bold">{carbonFactors.cropland} tC/ha</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      step="2"
                      value={carbonFactors.cropland}
                      onChange={(e) => handleUpdateCarbon('cropland', Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">Grassland Density:</span>
                      <span className="font-mono text-lime-400 font-bold">{carbonFactors.grassland} tC/ha</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="70"
                      step="2"
                      value={carbonFactors.grassland}
                      onChange={(e) => handleUpdateCarbon('grassland', Number(e.target.value))}
                      className="w-full accent-lime-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: QUES-B BIODIVERSITY */}
          {tab === 'biodiversity' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-400">Habitat Quality Index</div>
                  <div className="text-2xl font-bold text-emerald-400 mt-1">0.82 / 1.0</div>
                  <div className="text-[11px] text-slate-500 mt-1">InVEST model equivalent</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-400">Corridor Connectivity</div>
                  <div className="text-2xl font-bold text-teal-300 mt-1">0.76 / 1.0</div>
                  <div className="text-[11px] text-teal-500 mt-1">Connects 8 primary forest patches</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-400">Landscape Fragmentation</div>
                  <div className="text-2xl font-bold text-sky-400 mt-1">0.26 / 1.0</div>
                  <div className="text-[11px] text-sky-500 mt-1">Low edge-effect disturbance</div>
                </div>
              </div>

              {/* MSPA Corridors Breakdown */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="font-bold text-slate-200">
                  Morphological Spatial Pattern Analysis (MSPA Landscape Corridors)
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-emerald-400 font-semibold">Core Habitats: 54.2%</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Continuous interior forest</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-teal-400 font-semibold">Bridges / Corridors: 22.8%</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Shade agroforestry connecting cores</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-amber-400 font-semibold">Edge Buffer: 14.5%</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Perimeter forest-cropland boundary</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-rose-400 font-semibold">Islets / Stepping Stones: 8.5%</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Isolated native tree patches</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: QUES-H HYDROLOGY */}
          {tab === 'hydrology' && hydrologyData && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-400">Mean Soil Erosion</div>
                  <div className="text-2xl font-bold text-emerald-400 mt-1">
                    {hydrologyData.mean_soil_loss_t_ha_yr} t/ha/yr
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">RUSLE Equation Model</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-400">Avoided Soil Loss</div>
                  <div className="text-2xl font-bold text-teal-300 mt-1">
                    {(hydrologyData.avoided_erosion_tons_yr / 1e3).toFixed(1)}k tons/yr
                  </div>
                  <div className="text-[10px] text-teal-500 mt-1">Retained by agroforestry canopy</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-400">Sediment Retention</div>
                  <div className="text-2xl font-bold text-sky-400 mt-1">
                    {hydrologyData.sediment_retention_pct}%
                  </div>
                  <div className="text-[10px] text-sky-500 mt-1">Riparian watershed filter</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-400">Vulnerability</div>
                  <div className="text-2xl font-bold text-white mt-1">
                    {hydrologyData.watershed_vulnerability_index}
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-1">Buffer integrity: {Math.round(hydrologyData.riparian_buffer_integrity * 100)}%</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-slate-300">
                <span className="font-bold text-white">RUSLE Cover Management (C-Factor) Analysis: </span>
                Multi-strata agroforestry reduces surface runoff velocity by 68% compared to annual crops.
                The dense litter layer and deep root architecture of native shade trees (Terminalia, Iroko)
                anchor topsoil, preventing sediment siltation into downstream reservoirs and drinking water intakes.
              </div>
            </div>
          )}

          {/* TAB 5: TA-PROFIT PROFITABILITY */}
          {tab === 'profitability' && profitabilityData && (
            <OpportunityCostCurve data={profitabilityData} />
          )}

          {/* TAB 6: SCIENDO & LASEM TRADEOFF */}
          {tab === 'sciendo' && tradeoffData && (
            <div className="space-y-6">
              <TradeoffRadar axes={tradeoffData.axes} scenarios={tradeoffData.scenarios} />

              {/* Scenario Interactive Levers */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div>
                    <span className="font-bold text-slate-200">SCIENDO Policy Levers (2030 Horizon)</span>
                    <p className="text-[11px] text-slate-400">
                      Simulate landscape-scale policy interventions and observe multi-criteria spider response
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">Agroforestry Expansion Target:</span>
                      <span className="font-mono text-emerald-400 font-bold">
                        +{levers.agroforestry_expansion_pct}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="60"
                      step="5"
                      value={levers.agroforestry_expansion_pct}
                      onChange={(e) => handleUpdateLever('agroforestry_expansion_pct', Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">Deforestation Moratorium:</span>
                      <span className="font-mono text-sky-400 font-bold">
                        {levers.deforestation_enforcement_pct}% enforcement
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      step="5"
                      value={levers.deforestation_enforcement_pct}
                      onChange={(e) => handleUpdateLever('deforestation_enforcement_pct', Number(e.target.value))}
                      className="w-full accent-sky-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">Riparian Buffer Restoration:</span>
                      <span className="font-mono text-teal-400 font-bold">
                        {levers.riparian_restoration_pct}% coverage
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      step="5"
                      value={levers.riparian_restoration_pct}
                      onChange={(e) => handleUpdateLever('riparian_restoration_pct', Number(e.target.value))}
                      className="w-full accent-teal-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
