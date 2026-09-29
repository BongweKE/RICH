import React, { useState, useEffect } from 'react';
import { Compass, Radio, Target } from 'lucide-react';
import { Parcel } from '../types';

interface TacticalHUDProps {
  cursorCoords: [number, number] | null;
  cameraPitch: number;
  cameraBearing: number;
  cameraZoom: number;
  parcelCount: number;
  totalDatapoints?: number;
  is3DMode: boolean;
  isChatOpen?: boolean;
  selectedParcel?: Parcel | null;
}

export const TacticalHUD: React.FC<TacticalHUDProps> = ({
  cursorCoords,
  cameraPitch,
  cameraBearing,
  cameraZoom,
  parcelCount,
  totalDatapoints,
  is3DMode,
  isChatOpen = false,
  selectedParcel = null,
}) => {
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const [lat, lon] = cursorCoords || [6.7123, -1.6241];
  const normalizedBearing = ((Math.round(cameraBearing) % 360) + 360) % 360;

  // Cardinal direction
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const cardinalIndex = Math.round(normalizedBearing / 45) % 8;
  const cardinal = directions[cardinalIndex];

  return (
    <div className="absolute inset-0 pointer-events-none z-10 select-none overflow-hidden font-mono text-[11px]">
      {/* Reticle / Crosshair at map center with Target Lock */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
        <div className={`relative flex items-center justify-center ${selectedParcel ? 'opacity-90' : 'opacity-40'}`}>
          <div className={`w-14 h-14 rounded-full border ${selectedParcel ? 'border-emerald-400 border-2' : 'border-dashed border-emerald-400/60'} flex items-center justify-center`}>
            <div className={`w-1.5 h-1.5 rounded-full ${selectedParcel ? 'bg-emerald-300 animate-ping' : 'bg-emerald-400'}`} />
          </div>
          <div className="absolute w-28 h-[1px] bg-emerald-500/40" />
          <div className="absolute h-28 w-[1px] bg-emerald-500/40" />
        </div>
        {selectedParcel && (
          <div className="mt-2 px-2 py-0.5 rounded bg-slate-950/90 border border-emerald-500/60 text-emerald-300 text-[9px] tracking-wider uppercase font-bold flex items-center space-x-1 shadow-lg backdrop-blur-sm">
            <Target className="w-3 h-3 text-emerald-400 animate-spin" />
            <span>Selected: {selectedParcel.id.slice(0, 8)} ({selectedParcel.agroforestry_subtype || selectedParcel.class_label})</span>
          </div>
        )}
      </div>

      {/* Top-right HUD stack: orientation + telemetry, clear of the left rail */}
      <div
        className={`absolute top-16 transition-all duration-300 ${
          isChatOpen ? 'right-[25rem]' : 'right-4'
        } flex flex-col items-end gap-2`}
      >
        {/* Orientation / Compass */}
        <div className="bg-slate-950/70 backdrop-blur-sm border border-emerald-500/30 rounded p-2 text-emerald-400 shadow-lg flex items-center space-x-3">
          <div className="relative w-8 h-8 rounded-full border border-emerald-500/40 flex items-center justify-center">
            <Compass
              className="w-5 h-5 text-emerald-400 transition-transform duration-200"
              style={{ transform: `rotate(${-cameraBearing}deg)` }}
            />
          </div>
          <div className="text-[10px] leading-tight">
            <div className="text-slate-400">HEADING</div>
            <div className="font-bold text-slate-100">{normalizedBearing}° {cardinal}</div>
            <div className="text-[9px] text-slate-400 mt-0.5">PITCH: {Math.round(cameraPitch)}°</div>
          </div>
        </div>

        {/* Telemetry stream */}
        <div className="bg-slate-950/80 backdrop-blur-sm border border-emerald-500/30 rounded p-2 text-emerald-400 shadow-lg space-y-1">
          <div className="flex items-center space-x-2 text-[10px] tracking-wider text-emerald-300 font-bold uppercase border-b border-emerald-500/20 pb-1">
            <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
            <span>RICH Viewer Telemetry</span>
            {selectedParcel && (
              <span className="px-1 bg-emerald-500/30 text-emerald-200 border border-emerald-500/40 rounded text-[8px] animate-pulse">
                SELECTED
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[10px]">
            <span className="text-slate-400">LAT:</span>
            <span className="text-right text-slate-100">{lat.toFixed(5)}°</span>
            <span className="text-slate-400">LON:</span>
            <span className="text-right text-slate-100">{lon.toFixed(5)}°</span>
            <span className="text-slate-400">ALT / ELEV:</span>
            <span className="text-right text-slate-100">{Math.round(240 + Math.abs(lat * 10))} m ASL</span>
            <span className="text-slate-400">ZOOM:</span>
            <span className="text-right text-slate-100">{cameraZoom.toFixed(1)}x</span>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="absolute bottom-1.5 left-4 right-4 flex items-center justify-between text-[10px] text-slate-400 bg-slate-950/80 backdrop-blur-sm border border-slate-800/80 px-3 py-1 rounded">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold">ONLINE</span>
          </span>
          <span>SYS TIME: <strong className="text-slate-200">{utcTime}</strong></span>
          <span>PARCELS IN VIEW: <strong className="text-emerald-400">{parcelCount}</strong> | DATAPOINTS: <strong className="text-emerald-400">{totalDatapoints || parcelCount}</strong></span>
          <span title="All parcels in this demo are synthetic illustrations" className="text-[9px] px-1 py-0.5 rounded bg-amber-900/60 border border-amber-700 text-amber-300 font-semibold">DEMO DATA</span>
          <span>MODE: <strong className="text-slate-200">{is3DMode ? '3D PERSPECTIVE' : '2D ORTHO'}</strong></span>
        </div>
        <div className="hidden md:flex items-center space-x-3 text-slate-400">
          <span className="text-[9px] px-1 py-0.5 rounded bg-slate-900 border border-slate-700">Hotkeys: [T] 3D &middot; [Space] Tour</span>
          <span className="text-[9px] px-1 py-0.5 rounded bg-slate-900 border border-slate-700">[T] 3D Toggle</span>
          <span className="text-[9px] px-1 py-0.5 rounded bg-slate-900 border border-slate-700">[Space] Tour/Time</span>
        </div>
      </div>
    </div>
  );
};
