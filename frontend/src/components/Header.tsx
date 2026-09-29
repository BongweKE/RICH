import React from 'react';
import {
  Globe,
  Layers,
  BarChart3,
  ShieldCheck,
  Sparkles,
  Video,
  Volume2,
  VolumeX,
  Upload,
} from 'lucide-react';
import { Jurisdiction } from '../types';

interface HeaderProps {
  jurisdictions: Jurisdiction[];
  selectedJurisdiction: Jurisdiction | null;
  onSelectJurisdiction: (j: Jurisdiction) => void;
  parcelCount: number;
  totalDatapoints?: number;
  referenceCount?: number;
  alertsCount?: number;
  onOpenInbox: () => void;
  isInboxOpen: boolean;
  is3DMode: boolean;
  onToggle3D: () => void;
  onOpenLumens: () => void;
  onOpenPolicy: () => void;
  onToggleChat: () => void;
  isChatOpen: boolean;
  onOpenTour: () => void;
  isTourOpen: boolean;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  jurisdictions,
  selectedJurisdiction,
  onSelectJurisdiction,
  parcelCount,
  totalDatapoints,
  referenceCount,
  alertsCount,
  onOpenInbox,
  isInboxOpen,
  is3DMode,
  onToggle3D,
  onOpenLumens,
  onOpenPolicy,
  onToggleChat,
  isChatOpen,
  onOpenTour,
  isTourOpen,
  isAudioMuted,
  onToggleAudio,
}) => {
  return (
    <header className="h-14 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 flex items-center justify-between z-30 shrink-0 select-none font-sans">
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
        <a
          href="/"
          className="ml-2 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded bg-slate-500/20 text-slate-300 border border-slate-500/40 hover:bg-slate-500/30"
          title="RICH home"
        >
          Home
        </a>
        <a
          href="/planner"
          className="ml-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30"
          title="Open the governance planner workspace (map, validation inbox, assistant)"
        >
          Planner
        </a>
      </div>

      {/* Jurisdiction Selector & Active Parcels Badge */}
      <div className="flex items-center space-x-2.5">
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

        {/* Active Parcels & Exhaustive Datapoints Reactive Badge */}
        <div
          className="flex items-center space-x-2 px-2.5 py-1 rounded-md bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-mono text-xs shadow-sm cursor-help"
          title={`${parcelCount} Agroforestry Parcels · ${referenceCount || 0} Field Observatories · ${alertsCount || 0} GFW Disturbance Alerts (${totalDatapoints || parcelCount} Total Open-Access Datapoints)`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <div className="flex items-baseline space-x-1">
            <span className="font-bold text-white text-xs">{parcelCount}</span>
            <span className="text-[10px] text-emerald-400/80 tracking-wide hidden sm:inline">Parcels</span>
          </div>
          {totalDatapoints && totalDatapoints > parcelCount && (
            <div className="hidden md:flex items-baseline space-x-1 pl-1.5 border-l border-emerald-500/30 text-[10px] text-slate-400">
              <span className="text-emerald-400 font-semibold">{totalDatapoints}</span>
              <span>pts</span>
            </div>
          )}
        </div>
      </div>

      {/* Map Interactivity Controls */}
      <div className="flex items-center space-x-2">
        {/* Plot Inbox (User Upload) */}
        <button
          onClick={onOpenInbox}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
            isInboxOpen
              ? 'bg-sky-600/30 text-sky-300 border-sky-500/50 shadow-sm shadow-sky-900/30'
              : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-sky-300'
          }`}
          title="Upload Farm Parcels (GeoJSON Drag & Drop)"
        >
          <Upload className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">Plot Inbox</span>
        </button>

        {/* Scene Director Guided Tour */}
        <button
          onClick={onOpenTour}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
            isTourOpen
              ? 'bg-purple-600/30 text-purple-300 border-purple-500/50 shadow-sm'
              : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
          }`}
          title="Scene Director Cinematic Guided Tour"
        >
          <Video className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden lg:inline">Cinematic Tour</span>
        </button>

        {/* 2D / 3D Extrusion Mode Toggle */}
        <button
          onClick={onToggle3D}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
            is3DMode
              ? 'bg-blue-600/30 text-blue-300 border-blue-500/50 shadow-sm shadow-blue-900/30'
              : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200'
          }`}
          title="Toggle 2D / 3D Canopy Extrusion (Key T)"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{is3DMode ? '3D View' : '2D Map'}</span>
        </button>

        {/* LUMENS Analysis Laboratory Button */}
        <button
          onClick={onOpenLumens}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors"
          title="Open LUMENS Scientific Analysis Suite"
        >
          <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">LUMENS Analysis</span>
        </button>

        {/* Policy & EUDR Button */}
        <button
          onClick={onOpenPolicy}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
          title="Open EUDR Compliance Verification"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
          <span className="hidden md:inline">EUDR Audit</span>
        </button>

        {/* Audio Mute Toggle */}
        <button
          onClick={onToggleAudio}
          className="p-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
          title={isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isAudioMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
        </button>

        {/* AI Assistant Chat Toggle */}
        <button
          onClick={onToggleChat}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
            isChatOpen
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950/50'
              : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
          }`}
          title="Toggle AI Geospatial Assistant"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
          <span className="hidden sm:inline">AI Copilot</span>
        </button>
      </div>
    </header>
  );
};
