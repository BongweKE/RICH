import React from 'react';
import {
  Globe,
  Layers,
  BarChart3,
  ShieldCheck,
  Sparkles,
  Video,
  Eye,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Jurisdiction, SensorMode } from '../types';

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
  sensorMode: SensorMode;
  onSelectSensorMode: (mode: SensorMode) => void;
  onOpenTour: () => void;
  isTourOpen: boolean;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
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
  sensorMode,
  onSelectSensorMode,
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

      {/* Action Tools & God's Eye View Interactivity Controls */}
      <div className="flex items-center space-x-2">
        {/* Sensor Mode Selector */}
        <div className="relative flex items-center bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-xs">
          <Eye className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
          <select
            value={sensorMode}
            onChange={(e) => onSelectSensorMode(e.target.value as SensorMode)}
            className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
            title="Sensor Mode (Hotkeys 1-5)"
          >
            <option value="normal" className="bg-slate-900">Sensor: Normal</option>
            <option value="nvg" className="bg-slate-900">Sensor: NVG Green</option>
            <option value="flir" className="bg-slate-900">Sensor: FLIR Thermal</option>
            <option value="crt" className="bg-slate-900">Sensor: CRT Tactical</option>
            <option value="noir" className="bg-slate-900">Sensor: Noir Recon</option>
          </select>
        </div>

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
          title={isAudioMuted ? 'Unmute Tactical Audio' : 'Mute Tactical Audio'}
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
