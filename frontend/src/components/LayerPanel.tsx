import React, { useState } from 'react';
import {
  Layers,
  Eye,
  EyeOff,
  ShieldAlert,
  Trees,
  MapPin,
  Satellite,
  ChevronDown,
  ChevronUp,
  Flame,
} from 'lucide-react';
import { LayerState, LayerOpacityState } from '../types';

interface LayerPanelProps {
  layers: LayerState;
  onToggleLayer: (layer: keyof LayerState) => void;
  parcelCount: number;
  opacities: LayerOpacityState;
  onOpacityChange: (layer: keyof LayerOpacityState, value: number) => void;
}

export const LayerPanel: React.FC<LayerPanelProps> = ({
  layers,
  onToggleLayer,
  parcelCount,
  opacities,
  onOpacityChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleOpacityChangeLocal = (layerKey: keyof LayerOpacityState, val: number) => {
    onOpacityChange(layerKey, val);
  };

  return (
    <div className="absolute top-16 left-4 z-20 w-80 bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-xl shadow-2xl overflow-hidden text-xs font-sans select-none">
      {/* Panel Header */}
      <div className="px-3.5 py-2.5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
        <div className="flex items-center space-x-2 text-slate-200 font-semibold">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Geospatial Intelligence Layers</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="text-[10px] text-emerald-400 font-mono font-medium px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
            {parcelCount} Parcels
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-white p-0.5 rounded"
          >
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-3 space-y-3">
          {/* Layer List */}
          <div className="space-y-2">
            {/* 1. Agroforestry Parcels */}
            <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800/80 space-y-1.5">
              <div
                onClick={() => onToggleLayer('agroforestryParcels')}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-sm bg-emerald-500 border border-emerald-300 shadow-sm" />
                  <span className="text-slate-200 font-medium">Agroforestry Parcels (3D Extrusion)</span>
                </div>
                {layers.agroforestryParcels ? (
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                )}
              </div>
              {layers.agroforestryParcels && (
                <div className="flex items-center space-x-2 text-[10px] text-slate-400 pl-5">
                  <span>Opacity:</span>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={opacities.agroforestryParcels}
                    onChange={(e) => handleOpacityChangeLocal('agroforestryParcels', Number(e.target.value))}
                    className="w-24 accent-emerald-500 cursor-pointer h-1"
                  />
                  <span className="font-mono text-emerald-400">{opacities.agroforestryParcels}%</span>
                </div>
              )}
            </div>

            {/* 2. Ground Reference Points */}
            <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800/80 space-y-1.5">
              <div
                onClick={() => onToggleLayer('referencePoints')}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-slate-200 font-medium">CIFOR Field Reference Points</span>
                </div>
                {layers.referencePoints ? (
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                )}
              </div>
              {layers.referencePoints && (
                <div className="flex items-center space-x-2 text-[10px] text-slate-400 pl-5">
                  <span>Opacity:</span>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={opacities.referencePoints}
                    onChange={(e) => handleOpacityChangeLocal('referencePoints', Number(e.target.value))}
                    className="w-24 accent-amber-500 cursor-pointer h-1"
                  />
                  <span className="font-mono text-amber-400">{opacities.referencePoints}%</span>
                </div>
              )}
            </div>

            {/* 3. GFW Deforestation & Disturbance Alerts */}
            <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800/80 space-y-1.5">
              <div
                onClick={() => onToggleLayer('deforestationAlerts')}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                  <span className="text-slate-200 font-medium">GFW Deforestation Alerts</span>
                </div>
                {layers.deforestationAlerts !== false ? (
                  <Eye className="w-3.5 h-3.5 text-rose-400" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                )}
              </div>
              {layers.deforestationAlerts !== false && (
                <div className="flex items-center space-x-2 text-[10px] text-slate-400 pl-5">
                  <span>Opacity:</span>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={opacities.deforestationAlerts || 85}
                    onChange={(e) => handleOpacityChangeLocal('deforestationAlerts', Number(e.target.value))}
                    className="w-24 accent-rose-500 cursor-pointer h-1"
                  />
                  <span className="font-mono text-rose-400">{opacities.deforestationAlerts || 85}%</span>
                </div>
              )}
            </div>

            {/* 4. EUDR 2020 Forest Baseline */}
            <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800/80 space-y-1.5">
              <div
                onClick={() => onToggleLayer('eudrDeforestationBaseline')}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-slate-200 font-medium">EUDR 2020 Forest Reserves</span>
                </div>
                {layers.eudrDeforestationBaseline ? (
                  <Eye className="w-3.5 h-3.5 text-rose-400" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                )}
              </div>
              {layers.eudrDeforestationBaseline && (
                <div className="flex items-center space-x-2 text-[10px] text-slate-400 pl-5">
                  <span>Opacity:</span>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={opacities.eudrDeforestationBaseline}
                    onChange={(e) => handleOpacityChangeLocal('eudrDeforestationBaseline', Number(e.target.value))}
                    className="w-24 accent-rose-500 cursor-pointer h-1"
                  />
                  <span className="font-mono text-rose-400">{opacities.eudrDeforestationBaseline}%</span>
                </div>
              )}
            </div>

            {/* 4. Tree Canopy Density */}
            <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800/80 space-y-1.5">
              <div
                onClick={() => onToggleLayer('canopyDensity')}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <Trees className="w-3.5 h-3.5 text-teal-400" />
                  <span className="text-slate-200 font-medium">Canopy Cover % (Lang et al.)</span>
                </div>
                {layers.canopyDensity ? (
                  <Eye className="w-3.5 h-3.5 text-teal-400" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                )}
              </div>
              {layers.canopyDensity && (
                <div className="flex items-center space-x-2 text-[10px] text-slate-400 pl-5">
                  <span>Opacity:</span>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={opacities.canopyDensity}
                    onChange={(e) => handleOpacityChangeLocal('canopyDensity', Number(e.target.value))}
                    className="w-24 accent-teal-500 cursor-pointer h-1"
                  />
                  <span className="font-mono text-teal-400">{opacities.canopyDensity}%</span>
                </div>
              )}
            </div>

            {/* 5. QUES-C Biomass Carbon Density Heatmap */}
            <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800/80 space-y-1.5">
              <div
                onClick={() => onToggleLayer('carbonDensityHeatmap')}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-slate-200 font-medium">LUMENS QUES-C Carbon Density</span>
                </div>
                {layers.carbonDensityHeatmap ? (
                  <Eye className="w-3.5 h-3.5 text-orange-400" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                )}
              </div>
              {layers.carbonDensityHeatmap && (
                <div className="flex items-center space-x-2 text-[10px] text-slate-400 pl-5">
                  <span>Opacity:</span>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={opacities.carbonDensityHeatmap || 50}
                    onChange={(e) => handleOpacityChangeLocal('carbonDensityHeatmap', Number(e.target.value))}
                    className="w-24 accent-orange-500 cursor-pointer h-1"
                  />
                  <span className="font-mono text-orange-400">{opacities.carbonDensityHeatmap || 50}%</span>
                </div>
              )}
            </div>

            {/* 6. Satellite Imagery */}
            <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800/80 space-y-1.5">
              <div
                onClick={() => onToggleLayer('satelliteBasemap')}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <Satellite className="w-3.5 h-3.5 text-sky-400" />
                  <span className="text-slate-200 font-medium">High-Res Satellite Basemap</span>
                </div>
                {layers.satelliteBasemap ? (
                  <Eye className="w-3.5 h-3.5 text-sky-400" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                )}
              </div>
            </div>
          </div>

          {/* Scientific Legends */}
          <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2.5">
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] text-slate-300 font-semibold uppercase tracking-wider">
                <span>Canopy Cover Density</span>
                <span className="text-teal-400 font-mono text-[9px]">% Cover</span>
              </div>
              <div className="w-full h-2 rounded bg-gradient-to-r from-amber-400 via-teal-500 to-emerald-800 shadow-inner" />
              <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                <span>0% (Field)</span>
                <span>40% (Shade)</span>
                <span>100% (Dense)</span>
              </div>
            </div>

            <div className="space-y-1 pt-1 border-t border-slate-800">
              <div className="flex justify-between items-center text-[10px] text-slate-300 font-semibold uppercase tracking-wider">
                <span>Biomass Carbon Stock</span>
                <span className="text-orange-400 font-mono text-[9px]">tCO2e/ha</span>
              </div>
              <div className="w-full h-2 rounded bg-gradient-to-r from-blue-500 via-emerald-500 via-amber-500 to-rose-600 shadow-inner" />
              <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                <span>&lt; 30 (Low)</span>
                <span>85 (Tier 1)</span>
                <span>&gt; 180 (Tier 2)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
