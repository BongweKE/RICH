import React from 'react';
import { Layers, Eye, EyeOff, ShieldAlert, Trees, MapPin, Satellite } from 'lucide-react';
import { LayerState } from '../types';

interface LayerPanelProps {
  layers: LayerState;
  onToggleLayer: (layer: keyof LayerState) => void;
  parcelCount: number;
}

export const LayerPanel: React.FC<LayerPanelProps> = ({
  layers,
  onToggleLayer,
  parcelCount,
}) => {
  return (
    <div className="absolute top-4 left-4 z-20 w-64 bg-slate-950/85 backdrop-blur border border-slate-800 rounded-lg shadow-xl overflow-hidden text-xs">
      <div className="px-3 py-2.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-slate-200 font-semibold">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Geospatial Layers</span>
        </div>
        <span className="text-[10px] text-emerald-400 font-medium px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
          {parcelCount} Active Parcels
        </span>
      </div>

      <div className="p-2 space-y-1.5">
        {/* Agroforestry Parcels Layer */}
        <div
          onClick={() => onToggleLayer('agroforestryParcels')}
          className="flex items-center justify-between p-2 rounded hover:bg-slate-900 cursor-pointer transition-colors"
        >
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-sm bg-emerald-500 border border-emerald-300" />
            <span className="text-slate-200">Agroforestry Parcels</span>
          </div>
          {layers.agroforestryParcels ? (
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <EyeOff className="w-3.5 h-3.5 text-slate-600" />
          )}
        </div>

        {/* Reference Points */}
        <div
          onClick={() => onToggleLayer('referencePoints')}
          className="flex items-center justify-between p-2 rounded hover:bg-slate-900 cursor-pointer transition-colors"
        >
          <div className="flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-200">Ground Reference Points</span>
          </div>
          {layers.referencePoints ? (
            <Eye className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <EyeOff className="w-3.5 h-3.5 text-slate-600" />
          )}
        </div>

        {/* EUDR Deforestation Baseline */}
        <div
          onClick={() => onToggleLayer('eudrDeforestationBaseline')}
          className="flex items-center justify-between p-2 rounded hover:bg-slate-900 cursor-pointer transition-colors"
        >
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-slate-200">EUDR 2020 Forest Baseline</span>
          </div>
          {layers.eudrDeforestationBaseline ? (
            <Eye className="w-3.5 h-3.5 text-rose-400" />
          ) : (
            <EyeOff className="w-3.5 h-3.5 text-slate-600" />
          )}
        </div>

        {/* Tree Canopy Cover */}
        <div
          onClick={() => onToggleLayer('canopyDensity')}
          className="flex items-center justify-between p-2 rounded hover:bg-slate-900 cursor-pointer transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Trees className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-slate-200">Tree Canopy Density</span>
          </div>
          {layers.canopyDensity ? (
            <Eye className="w-3.5 h-3.5 text-teal-400" />
          ) : (
            <EyeOff className="w-3.5 h-3.5 text-slate-600" />
          )}
        </div>

        {/* Satellite Imagery Layer */}
        <div
          onClick={() => onToggleLayer('satelliteBasemap')}
          className="flex items-center justify-between p-2 rounded hover:bg-slate-900 cursor-pointer transition-colors border-t border-slate-800/80 pt-2"
        >
          <div className="flex items-center space-x-2">
            <Satellite className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-slate-200">Satellite Imagery</span>
          </div>
          {layers.satelliteBasemap ? (
            <Eye className="w-3.5 h-3.5 text-sky-400" />
          ) : (
            <EyeOff className="w-3.5 h-3.5 text-slate-600" />
          )}
        </div>
      </div>
    </div>
  );
};
