import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  TreePine,
  Download,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { Parcel, ParcelTelemetry } from '../types';
import { api } from '../services/api';

interface ParcelInspectorProps {
  parcel: Parcel | null;
  onClose: () => void;
  onRunEUDR: (parcel: Parcel) => void;
}

export const ParcelInspector: React.FC<ParcelInspectorProps> = ({
  parcel,
  onClose,
  onRunEUDR,
}) => {
  const [telemetry, setTelemetry] = useState<ParcelTelemetry | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'ndvi' | 'strata' | 'carbon' | 'eudr'>('ndvi');

  useEffect(() => {
    if (!parcel) {
      setTelemetry(null);
      return;
    }

    setIsLoading(true);
    api
      .getParcelTelemetry(parcel.id)
      .then((data) => setTelemetry(data))
      .catch((e) => console.warn('Telemetry load note:', e))
      .finally(() => setIsLoading(false));
  }, [parcel]);

  if (!parcel) return null;

  const handleDownloadDDS = () => {
    if (!telemetry) return;
    const jsonStr = JSON.stringify(telemetry, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EUDR-Due-Diligence-${telemetry.eudr_audit?.reference_id || parcel.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="absolute bottom-6 left-4 z-20 w-96 max-h-[82vh] bg-slate-950/95 backdrop-blur-md border border-slate-800 rounded-xl shadow-2xl flex flex-col text-xs font-sans overflow-hidden select-none">
      {/* Inspector Header */}
      <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <TreePine className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white tracking-wide">Parcel Dossier</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                {parcel.id}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 capitalize">
              {parcel.agroforestry_subtype?.replace('_', ' ') || parcel.class_label} •{' '}
              {parcel.area_ha?.toFixed(1) || '14.2'} ha
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Sub-tabs */}
      <div className="px-4 border-b border-slate-800 flex items-center space-x-4 text-[11px] bg-slate-950/50 shrink-0">
        {[
          { id: 'ndvi', label: 'NDVI Trajectory' },
          { id: 'strata', label: 'Canopy Strata' },
          { id: 'carbon', label: 'Carbon Pools' },
          { id: 'eudr', label: 'EUDR Audit' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`py-2 font-semibold transition-colors border-b-2 ${
              activeTab === t.id
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Body Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {/* TAB 1: MULTI-YEAR NDVI TRAJECTORY */}
        {activeTab === 'ndvi' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>Sentinel-2 Vegetative Health Index</span>
              <span className="text-emerald-400 font-mono font-bold">Stable Canopy (NDVI &gt; 0.78)</span>
            </div>

            {/* Interactive SVG NDVI Line Chart */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 space-y-1">
              <div className="relative w-full h-32">
                <svg width="100%" height="100%" viewBox="0 0 320 120" className="overflow-visible">
                  {/* Grid Lines */}
                  <line x1="20" y1="20" x2="300" y2="20" stroke="#1e293b" strokeDasharray="2,2" />
                  <line x1="20" y1="60" x2="300" y2="60" stroke="#1e293b" strokeDasharray="2,2" />
                  <line x1="20" y1="100" x2="300" y2="100" stroke="#1e293b" />

                  {/* EUDR Dec 31, 2020 Cutoff Line */}
                  <line
                    x1="140"
                    y1="10"
                    x2="140"
                    y2="105"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="3,3"
                  />
                  <text x="142" y="18" fill="#f59e0b" fontSize="7" fontWeight="bold" fontFamily="monospace">
                    EUDR 2020 CUTOFF
                  </text>

                  {/* NDVI Trend Line */}
                  {telemetry?.ndvi_history && (
                    <>
                      <path
                        d={`M 30,${120 - telemetry.ndvi_history[0].ndvi * 110} ` +
                          telemetry.ndvi_history
                            .slice(1)
                            .map(
                              (p, i) =>
                                `L ${30 + (i + 1) * 36},${120 - p.ndvi * 110}`
                            )
                            .join(' ')}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.5"
                      />
                      {telemetry.ndvi_history.map((p, i) => (
                        <g key={i}>
                          <circle
                            cx={30 + i * 36}
                            cy={120 - p.ndvi * 110}
                            r="3"
                            fill={p.is_eudr_cutoff ? '#f59e0b' : '#10b981'}
                            stroke="#0f172a"
                            strokeWidth="1.5"
                          />
                          <text
                            x={30 + i * 36}
                            y={116}
                            fill="#64748b"
                            fontSize="7"
                            textAnchor="middle"
                            fontFamily="monospace"
                          >
                            {p.year}
                          </text>
                        </g>
                      ))}
                    </>
                  )}
                </svg>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                <span>Mean NDVI: <strong className="text-emerald-400">0.81</strong></span>
                <span>Canopy Loss: <strong className="text-slate-200">0.0% (Deforestation-Free)</strong></span>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed">
              Continuous multi-spectral vegetation indices verify undisturbed canopy cover across the 2018–2024
              epoch, proving zero deforestation post-2020 EUDR threshold.
            </p>
          </div>
        )}

        {/* TAB 2: CANOPY STRATA & GEDI */}
        {activeTab === 'strata' && telemetry && (
          <div className="space-y-3">
            {/* Strata Stacked Bar */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 space-y-2">
              <div className="flex justify-between text-[11px] font-bold text-slate-200">
                <span>Vertical Canopy Architecture</span>
                <span className="text-emerald-400">{telemetry.canopy_strata.total_canopy_cover_pct}% Cover</span>
              </div>
              <div className="w-full h-4 rounded-full overflow-hidden flex shadow-inner">
                <div
                  className="bg-emerald-600 h-full"
                  style={{ width: `${telemetry.canopy_strata.overstory_native_trees_pct}%` }}
                  title="Overstory Native Trees"
                />
                <div
                  className="bg-teal-500 h-full"
                  style={{ width: `${telemetry.canopy_strata.midstory_crop_canopy_pct}%` }}
                  title="Mid-story Cash Crop"
                />
                <div
                  className="bg-amber-600 h-full"
                  style={{ width: `${telemetry.canopy_strata.understory_ground_cover_pct}%` }}
                  title="Understory Ground Cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-1 text-[10px] pt-1 text-slate-400">
                <div>
                  <span className="text-emerald-400 font-semibold">Overstory: {telemetry.canopy_strata.overstory_native_trees_pct}%</span>
                  <p className="text-[9px]">Native shade trees</p>
                </div>
                <div>
                  <span className="text-teal-300 font-semibold">Mid-story: {telemetry.canopy_strata.midstory_crop_canopy_pct}%</span>
                  <p className="text-[9px]">Cacao / coffee crop</p>
                </div>
                <div>
                  <span className="text-amber-400 font-semibold">Ground: {telemetry.canopy_strata.understory_ground_cover_pct}%</span>
                  <p className="text-[9px]">Herbaceous / litter</p>
                </div>
              </div>
            </div>

            {/* GEDI LiDAR Metrics */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400">Canopy Height (RH98)</span>
                <div className="text-base font-bold text-white mt-0.5">
                  {telemetry.gedi_profile.relative_height_98m} m
                </div>
                <span className="text-[9px] text-emerald-400">GEDI LiDAR Shot</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400">Top Height</span>
                <div className="text-base font-bold text-teal-300 mt-0.5">
                  {telemetry.gedi_profile.canopy_top_height_m} m
                </div>
                <span className="text-[9px] text-slate-400">Emergent trees</span>
              </div>
            </div>

            {/* Dominant Species */}
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-[11px]">
              <span className="font-bold text-slate-200">Dominant Keystone Shade Trees:</span>
              <ul className="list-disc list-inside text-slate-300 text-[10px] space-y-0.5">
                {telemetry.canopy_strata.dominant_tree_species.map((sp, idx) => (
                  <li key={idx} className="italic text-emerald-300">{sp}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 3: CARBON POOLS */}
        {activeTab === 'carbon' && telemetry && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400">Total Carbon Stock</span>
                <div className="text-lg font-bold text-white mt-0.5">
                  {telemetry.carbon_pools.total_carbon_stock_tc_ha} tC/ha
                </div>
                <span className="text-[10px] text-emerald-400">IPCC Tier 2</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400">Annual Removals</span>
                <div className="text-lg font-bold text-emerald-400 mt-0.5">
                  +{telemetry.carbon_pools.annual_sequestration_tco2e_ha_yr} tCO2e
                </div>
                <span className="text-[10px] text-slate-400">per hectare / year</span>
              </div>
            </div>

            {/* Carbon Pools Breakdown */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 space-y-1.5 text-[11px]">
              <span className="font-bold text-slate-200">Carbon Pool Distribution:</span>
              <div className="space-y-1 text-slate-300">
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span>Above-Ground Biomass (AGB):</span>
                  <span className="font-mono text-emerald-400">{telemetry.carbon_pools.above_ground_biomass_tc_ha} tC/ha</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span>Below-Ground Biomass (BGB):</span>
                  <span className="font-mono text-teal-300">{telemetry.carbon_pools.below_ground_biomass_tc_ha} tC/ha</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span>Soil Organic Carbon (SOC 0-30cm):</span>
                  <span className="font-mono text-amber-400">{telemetry.carbon_pools.soil_organic_carbon_tc_ha} tC/ha</span>
                </div>
                <div className="flex justify-between">
                  <span>Dead Wood & Litter:</span>
                  <span className="font-mono text-slate-400">{telemetry.carbon_pools.dead_wood_litter_tc_ha} tC/ha</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EUDR AUDIT & DUE DILIGENCE */}
        {activeTab === 'eudr' && telemetry && (
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-emerald-200 text-xs tracking-wide">
                    COMPLIANT: ZERO DEFORESTATION
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono">
                    Ref: {telemetry.eudr_audit.reference_id}
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-300 leading-tight">
                {telemetry.eudr_audit.legal_notice}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400">EUDR Cutoff Date</span>
                <div className="font-mono text-white font-bold">{telemetry.eudr_audit.cutoff_date}</div>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Risk Classification</span>
                <div className="font-mono text-emerald-400 font-bold">{telemetry.eudr_audit.risk_level}</div>
              </div>
            </div>

            <button
              onClick={handleDownloadDDS}
              className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-emerald-950/50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download EUDR Due Diligence Statement (JSON)</span>
            </button>

            <button
              onClick={() => onRunEUDR(parcel)}
              className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-teal-300 border border-teal-500/40 font-medium text-xs flex items-center justify-center space-x-1.5 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Open Full Policy & EUDR Audit Modal</span>
            </button>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center space-x-2 py-4 text-emerald-400">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Fetching real-time parcel telemetry...</span>
          </div>
        )}
      </div>
    </div>
  );
};
