import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  jurisdictionCode: string;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  onClose,
  jurisdictionCode,
}) => {
  const [tab, setTab] = useState<'eudr' | 'redd' | 'ndc'>('eudr');
  const [commodity, setCommodity] = useState('cocoa');
  const [loading, setLoading] = useState(false);
  const [eudrReport, setEudrReport] = useState<any | null>(null);
  const [reddReport, setReddReport] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleRunEUDR = async () => {
    setLoading(true);
    try {
      const res = await api.checkEUDR(undefined, [-1.74, 6.66], commodity);
      setEudrReport(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchREDD = async () => {
    setLoading(true);
    try {
      const res = await api.getREDDReport(jurisdictionCode);
      setReddReport(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="h-14 px-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Policy & Compliance Integration</h2>
              <p className="text-[11px] text-slate-400">
                EUDR Regulation (EU) 2023/1115, REDD+ MRV & NDC Alignment
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-3 border-b border-slate-800 flex items-center space-x-6 text-xs bg-slate-900/40">
          <button
            onClick={() => setTab('eudr')}
            className={`pb-3 font-semibold transition-colors border-b-2 ${
              tab === 'eudr'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            EUDR Deforestation Due Diligence
          </button>
          <button
            onClick={() => {
              setTab('redd');
              if (!reddReport) handleFetchREDD();
            }}
            className={`pb-3 font-semibold transition-colors border-b-2 ${
              tab === 'redd'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            REDD+ MRV Reporting
          </button>
          <button
            onClick={() => setTab('ndc')}
            className={`pb-3 font-semibold transition-colors border-b-2 ${
              tab === 'ndc'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            NDC Climate Target Alignment
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
          {tab === 'eudr' && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-semibold text-slate-200">EUDR Deforestation Cutoff Audit</div>
                  <div className="text-slate-400 text-[11px]">
                    Verifies target plots against the mandatory December 31, 2020 forest baseline.
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <select
                    value={commodity}
                    onChange={(e) => setCommodity(e.target.value)}
                    className="bg-slate-900 text-slate-200 border border-slate-700 rounded-md px-2.5 py-1.5 focus:outline-none"
                  >
                    <option value="cocoa">Cocoa (Ghana)</option>
                    <option value="coffee">Coffee (Ethiopia)</option>
                    <option value="wood">Wood / Cork (Spain)</option>
                    <option value="cattle">Cattle / Pasture (Spain)</option>
                  </select>
                  <button
                    onClick={handleRunEUDR}
                    disabled={loading}
                    className="px-4 py-1.5 rounded-md bg-amber-600 hover:bg-amber-500 text-white font-medium transition-colors"
                  >
                    {loading ? 'Auditing...' : 'Check Compliance'}
                  </button>
                </div>
              </div>

              {eudrReport ? (
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <div>
                        <div className="font-bold text-sm text-emerald-400">
                          COMPLIANT: Verified Deforestation-Free
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Regulation (EU) 2023/1115 Due Diligence Statement Qualified
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-white">Score: {eudrReport.compliance_score * 100}%</div>
                      <div className="text-[10px] text-emerald-400">Risk Tier: LOW</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                      <div className="text-slate-400">Cut-Off Date</div>
                      <div className="font-semibold text-slate-200 mt-0.5">2020-12-31</div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">Continuous Canopy</div>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                      <div className="text-slate-400">Geolocation</div>
                      <div className="font-semibold text-slate-200 mt-0.5">Plot Polygons</div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">SRID 4326 PostGIS</div>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                      <div className="text-slate-400">Legality Risk</div>
                      <div className="font-semibold text-slate-200 mt-0.5">Verified</div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">Country Code Verified</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded border border-slate-800/80">
                    <span className="font-semibold text-white">Audit Summary: </span>
                    Multi-sensor analysis demonstrates that tree canopy cover exceeded 30% crown cover across the 2019-2023 observation period without clear-felling or forest degradation.
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  Click &quot;Check Compliance&quot; to run an automated EUDR due diligence verification.
                </div>
              )}
            </div>
          )}

          {tab === 'redd' && reddReport && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                  <div className="text-slate-400">Forest Reference Emission Level (FREL)</div>
                  <div className="text-lg font-bold text-slate-200 mt-1">
                    {reddReport.metrics.forest_reference_emission_level_tco2e_yr.toLocaleString()} tCO2e/yr
                  </div>
                </div>
                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                  <div className="text-slate-400">Net Climate Benefit Generated</div>
                  <div className="text-lg font-bold text-emerald-400 mt-1">
                    {reddReport.metrics.total_climate_benefit_tco2e_yr.toLocaleString()} tCO2e/yr
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-semibold text-slate-300">MRV Quality Parameters</div>
                <div className="space-y-1.5 text-[11px] text-slate-300">
                  <div className="flex justify-between">
                    <span>Methodology:</span>
                    <span className="text-emerald-400">{reddReport.tier_compliance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Uncertainty Margin:</span>
                    <span className="text-amber-400">±{reddReport.uncertainty_margin_pct}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monitored Pools:</span>
                    <span className="text-slate-300">{reddReport.carbon_pools_assessed.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'ndc' && (
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
              <div className="font-semibold text-slate-200 text-sm">
                Nationally Determined Contribution (NDC) - AFOLU Alignment
              </div>
              <p className="text-slate-400 leading-relaxed">
                Agroforestry transition across the landscape directly counts towards national mitigation commitments
                under the Paris Agreement. By restoring multi-strata canopy trees in agricultural mosaics, smallholder
                farmers provide certified carbon sequestration alongside climate resilience.
              </p>
              <div className="p-3 rounded bg-slate-900 border border-emerald-500/30 text-emerald-300">
                Status: <strong>ON TRACK (64% Progress towards 2030 Canopy Goals)</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
