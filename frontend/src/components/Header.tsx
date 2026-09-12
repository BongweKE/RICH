import React from 'react';
import { Globe, Layers, BarChart3, ShieldCheck, Sparkles } from 'lucide-react';
import { Jurisdiction } from '../types';

interface HeaderProps {
  jurisdictions: Jurisdiction[];
  selectedJurisdiction: Jurisdiction | null;
  onSelectJurisdiction: (j: Jurisdiction) => void;
  is3DMode: boolean;
  onToggle3D: () => void;
  onOpenLumens: () => void;
  onOpenPolicy: () => void;
  onToggleChat: () => void;
  isChatOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  jurisdictions,
  selectedJurisdiction,
  onSelectJurisdiction,
  is3DMode,
  onToggle3D,
  onOpenLumens,
  onOpenPolicy,
  onToggleChat,
  isChatOpen,
}) => {
  return (
    <header className="h-14 bg-slate-950/90 backdrop-blur border-b border-slate-800 px-4 flex items-center justify-between z-30 shrink-0 select-none">
      {/* Brand & Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center shadow-lg shadow-green-950/50">
          <Globe className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg text-white tracking-wide">RICH</span>
            <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              AI4D Platform
            </span>
          </div>
          <p className="text-[10px] text-slate-400 hidden sm:block">
            Climate & Agroforestry Geospatial Intelligence
          </p>
        </div>
      </div>

      {/* Jurisdiction Selector */}
      <div className="flex items-center space-x-2">
        <label htmlFor="jurisdiction-select" className="text-xs text-slate-400 hidden md:inline">
          Pilot Landscape:
        </label>
        <select
          id="jurisdiction-select"
          value={selectedJurisdiction?.code || ''}
          onChange={(e) => {
            const found = jurisdictions.find((j) => j.code === e.target.value);
            if (found) onSelectJurisdiction(found);
          }}
          className="bg-slate-900 text-xs text-slate-200 border border-slate-700 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors cursor-pointer"
        >
          {jurisdictions.map((j) => (
            <option key={j.code} value={j.code}>
              {j.code === 'ES-EX' ? '🇪🇸 ' : j.code.startsWith('GH') ? '🇬🇭 ' : '🇪🇹 '}
              {j.name} ({j.code})
            </option>
          ))}
        </select>
      </div>

      {/* Action Tools & Modals */}
      <div className="flex items-center space-x-2">
        {/* 2D / 3D Mode Toggle */}
        <button
          onClick={onToggle3D}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
            is3DMode
              ? 'bg-blue-600/20 text-blue-300 border-blue-500/40 shadow-sm shadow-blue-900/30'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
          title="Toggle 2D / 3D Perspective"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{is3DMode ? '3D View' : '2D Map'}</span>
        </button>

        {/* LUMENS Analysis Button */}
        <button
          onClick={onOpenLumens}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
        >
          <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
          <span>LUMENS Analysis</span>
        </button>

        {/* Policy & EUDR Button */}
        <button
          onClick={onOpenPolicy}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Policy & EUDR</span>
        </button>

        {/* AI Assistant Drawer Toggle */}
        <button
          onClick={onToggleChat}
          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium border transition-all ${
            isChatOpen
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950/50'
              : 'bg-gradient-to-r from-emerald-600/90 to-teal-600/90 hover:from-emerald-500 hover:to-teal-500 text-white border-transparent'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-200 animate-pulse" />
          <span>AI Assistant</span>
        </button>
      </div>
    </header>
  );
};
