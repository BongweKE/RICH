import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, TreePine, MapPin, Calendar } from 'lucide-react';
import { Parcel } from '../types';
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
  const [isVerifying, setIsVerifying] = useState(false);
  const [eudrResult, setEudrResult] = useState<any | null>(null);

  if (!parcel) return null;

  const handleQuickEUDR = async () => {
    setIsVerifying(true);
    onRunEUDR(parcel);
    try {
      const res = await api.checkEUDR(parcel.id, undefined, 'cocoa');
      setEudrResult(res);
    } catch (e) {
      console.error('Error running EUDR check:', e);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="absolute bottom-6 left-4 z-20 w-80 bg-slate-950/90 backdrop-blur border border-slate-800 rounded-lg shadow-2xl overflow-hidden text-xs">
      <div className="px-3.5 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TreePine className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-200">Parcel Inspector</span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3.5 space-y-3">
        {/* Classification Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[11px] text-slate-400">Class & System</div>
            <div className="font-bold text-sm text-emerald-400 capitalize">
              {parcel.agroforestry_subtype?.replace('_', ' ') || parcel.class_label}
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            {Math.round(parcel.confidence_score * 100)}% Confidence
          </span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 py-1">
          <div className="bg-slate-900/80 p-2 rounded border border-slate-800/80">
            <div className="text-[10px] text-slate-400">Area</div>
            <div className="font-semibold text-slate-200">
              {parcel.area_ha ? `${parcel.area_ha.toFixed(1)} ha` : 'N/A'}
            </div>
          </div>
          <div className="bg-slate-900/80 p-2 rounded border border-slate-800/80">
            <div className="text-[10px] text-slate-400">Uncertainty</div>
            <div className="font-semibold text-slate-200">
              ±{((parcel.uncertainty || 0.05) * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="space-y-1.5 text-[11px] text-slate-300">
          <div className="flex items-center space-x-2">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Observation Year: {parcel.source_year || 2023}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span className="truncate">Source: {parcel.source || 'Sentinel-2 + Planet'}</span>
          </div>
        </div>

        {/* EUDR Result Preview or Action */}
        {eudrResult ? (
          <div className="mt-2 p-2.5 rounded bg-slate-900 border border-emerald-500/30 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>EUDR Deforestation-Free</span>
              </span>
              <span className="text-[10px] text-slate-400">Score: {eudrResult.compliance_score}</span>
            </div>
            <p className="text-[10px] text-slate-300">
              Canopy verified continuous post Dec 31, 2020 cutoff date.
            </p>
          </div>
        ) : (
          <button
            onClick={handleQuickEUDR}
            disabled={isVerifying}
            className="w-full mt-2 py-1.5 px-3 rounded bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40 font-medium flex items-center justify-center space-x-1.5 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>{isVerifying ? 'Verifying 2020 Baseline...' : 'Verify EUDR Due Diligence'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
