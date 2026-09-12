import React from 'react';
import { SensorMode } from '../types';

interface SensorOverlayProps {
  mode: SensorMode;
}

export const SensorOverlay: React.FC<SensorOverlayProps> = ({ mode }) => {
  if (mode === 'normal') return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {/* NVG - Night Vision Phosphor Green */}
      {mode === 'nvg' && (
        <div className="w-full h-full relative">
          <div className="absolute inset-0 bg-emerald-500/20 mix-blend-color" />
          <div className="absolute inset-0 bg-green-900/15 mix-blend-multiply" />
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 100, 0.2) 2px, rgba(0, 255, 100, 0.2) 4px)',
            }}
          />
          <div className="absolute inset-0 bg-radial-gradient-vignette" />
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-green-950/80 border border-green-500/40 text-green-400 font-mono text-[10px] tracking-widest uppercase">
            SENSOR MODE: NVG (GEN-3 PHOSPHOR)
          </div>
        </div>
      )}

      {/* FLIR - Thermal Pseudocolor Infrared */}
      {mode === 'flir' && (
        <div className="w-full h-full relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-red-600/20 to-amber-400/20 mix-blend-color-burn" />
          <div className="absolute inset-0 bg-amber-500/10 mix-blend-screen" />
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-purple-950/80 border border-amber-500/50 text-amber-300 font-mono text-[10px] tracking-widest uppercase">
            SENSOR MODE: FLIR THERMAL IR (CALIBRATED EVAPOTRANSPIRATION)
          </div>
          {/* Thermal calibration scale */}
          <div className="absolute bottom-10 right-4 p-2 rounded bg-slate-950/80 border border-slate-800 text-[9px] font-mono text-slate-300 flex flex-col items-end space-y-1">
            <span>34°C Canopy Stress</span>
            <div className="w-24 h-2 rounded bg-gradient-to-r from-blue-600 via-yellow-400 to-red-600" />
            <span>22°C High Moisture</span>
          </div>
        </div>
      )}

      {/* CRT - Tactical Surveillance Monitor */}
      {mode === 'crt' && (
        <div className="w-full h-full relative">
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4) 1px, transparent 1px, transparent 2px)',
            }}
          />
          <div className="absolute inset-0 border-[8px] border-slate-950/80 rounded-2xl shadow-inner pointer-events-none" />
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-slate-950/90 border border-slate-700 text-cyan-300 font-mono text-[10px] tracking-widest uppercase">
            SENSOR MODE: TACTICAL CRT SURVEILLANCE
          </div>
        </div>
      )}

      {/* NOIR - Reconnaissance High-Contrast Panchromatic */}
      {mode === 'noir' && (
        <div className="w-full h-full relative">
          <div className="absolute inset-0 bg-slate-500/20 mix-blend-color" />
          <div className="absolute inset-0 bg-black/15 mix-blend-saturation" />
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-slate-950/90 border border-slate-600 text-slate-200 font-mono text-[10px] tracking-widest uppercase">
            SENSOR MODE: RECON PANCHROMATIC NOIR
          </div>
        </div>
      )}
    </div>
  );
};
