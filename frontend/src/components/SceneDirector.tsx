import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, X, Video, MapPin } from 'lucide-react';
import { TourWaypoint } from '../types';

interface SceneDirectorProps {
  isOpen: boolean;
  onClose: () => void;
  jurisdictionCode: string;
  onFlyToWaypoint: (wp: TourWaypoint) => void;
}

export const SceneDirector: React.FC<SceneDirectorProps> = ({
  isOpen,
  onClose,
  jurisdictionCode,
  onFlyToWaypoint,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // 4-Stage Scientific Storytelling Arc for all Pilot Landscapes
  const waypointsByJurisdiction: Record<string, TourWaypoint[]> = {
    'GH-AH': [
      {
        id: 'gh-1',
        title: 'Ashanti Regional Basin & Agroforestry Mosaic',
        subtitle: 'Continental Flagship Cocoa Agroforestry Belt',
        center: [-1.624, 6.712],
        zoom: 9.0,
        pitch: 45,
        bearing: -15,
        badge: 'STAGE 1: REGIONAL BASELINE',
        description:
          'Macro-scale landscape overview showing the Guinean moist forest eco-region in Ghana where smallholder shade cacao agroforests connect protected reserves with the Offin River agricultural basin.',
      },
      {
        id: 'gh-2',
        title: 'Canopy Strata & Bobiri Forest Buffer',
        subtitle: '85% Canopy Cover • Native Shade Trees',
        center: [-1.34, 6.68],
        zoom: 12.8,
        pitch: 58,
        bearing: 35,
        badge: 'STAGE 2: 3D CANOPY BUFFER',
        description:
          '3D tree height model revealing emergent Milicia excelsa and Terminalia superba canopies (>28m) buffering the Bobiri Forest Reserve, mitigating edge effects and cooling regional microclimates.',
      },
      {
        id: 'gh-3',
        title: 'Ground-Truth Shade Cacao Plot Inspection',
        subtitle: 'GEDI LiDAR RH98 Profile • Multi-Strata Polyculture',
        center: [-1.642, 6.728],
        zoom: 15.2,
        pitch: 65,
        bearing: 75,
        badge: 'STAGE 3: PARCEL TELEMETRY',
        description:
          'High-resolution ground inspection of certified shade cacao parcel. GEDI LiDAR profile confirms 28.4m canopy height, 4 distinct strata, and 124.5 tCO2e/ha net carbon sequestration.',
      },
      {
        id: 'gh-4',
        title: 'EUDR 2020 Cut-Off & Carbon Resolution',
        subtitle: 'Zero Deforestation Verified • QUES-C Compliant',
        center: [-1.589, 6.695],
        zoom: 13.8,
        pitch: 50,
        bearing: 130,
        badge: 'STAGE 4: DUE DILIGENCE RESOLUTION',
        description:
          'Spatial intersection against the Dec 31, 2020 JRC forest baseline confirms unbroken agricultural tree cover without post-cutoff deforestation, qualifying smallholder yields for unrestricted EU market entry.',
      },
    ],
    'ES-EX': [
      {
        id: 'es-1',
        title: 'Extremadura Iberian Dehesa Landscape',
        subtitle: 'Continental Mediterranean Silvopastoral Belt',
        center: [-6.26, 39.25],
        zoom: 8.5,
        pitch: 45,
        bearing: 15,
        badge: 'STAGE 1: REGIONAL BASELINE',
        description:
          'Macro continental overview across Cáceres and Badajoz. The Dehesa is Europe’s premier high-nature-value agroforestry ecosystem, uniting ancient oak woodlands with sustainable grazing.',
      },
      {
        id: 'es-2',
        title: 'Quercus ilex Canopy Architecture & Monfragüe Corridor',
        subtitle: 'Holm & Cork Oak Stands • Natura 2000 Buffer',
        center: [-6.12, 39.76],
        zoom: 12.8,
        pitch: 58,
        bearing: -35,
        badge: 'STAGE 2: 3D CANOPY BUFFER',
        description:
          '3D canopy extrusion displays open Quercus ilex and Quercus suber canopy stands (48-55% cover) creating ecological stepping stones toward the Monfragüe Biosphere Reserve.',
      },
      {
        id: 'es-3',
        title: 'Ground-Truth Dehesa Parcel & Silvopastoral Telemetry',
        subtitle: 'CSIC Station Cáceres • Acorn Mast & Grassland Strata',
        center: [-6.325, 39.185],
        zoom: 15.0,
        pitch: 62,
        bearing: 50,
        badge: 'STAGE 3: PARCEL TELEMETRY',
        description:
          'Deep 3D inspection of an Iberian silvopastoral parcel. Sentinel-2 multi-year NDVI confirms stable tree vitality, active soil carbon accumulation (74 tC/ha), and low wildfire fuel loads.',
      },
      {
        id: 'es-4',
        title: 'EUDR & Common Agricultural Policy Verification',
        subtitle: 'Article 2(4-6) Exemption • Land Cover Stability',
        center: [-6.338, 39.201],
        zoom: 13.5,
        pitch: 48,
        bearing: 105,
        badge: 'STAGE 4: DUE DILIGENCE RESOLUTION',
        description:
          'Compliance confirmation: Dehesa tree cover constitutes permanent agricultural land use under EUDR Article 2(4-6), with zero forest conversion and guaranteed legal provenance for premium livestock exports.',
      },
    ],
    'ET-OR': [
      {
        id: 'et-1',
        title: 'Oromia Afromontane Rainforest Highlands',
        subtitle: 'Birthplace of Wild Arabica Coffee',
        center: [37.29, 8.00],
        zoom: 8.2,
        pitch: 48,
        bearing: -20,
        badge: 'STAGE 1: REGIONAL BASELINE',
        description:
          'Landscape establishing shot of the Jimma and Didessa highlands. Pristine montane rainforests shelter the global genetic reservoir of Coffea arabica under complex indigenous agroforestry management.',
      },
      {
        id: 'et-2',
        title: 'Montane Cloud Canopy & Yayu Biosphere Buffer',
        subtitle: '30m+ Multi-Strata Podocarpus Canopy',
        center: [36.792, 7.698],
        zoom: 12.9,
        pitch: 60,
        bearing: 35,
        badge: 'STAGE 2: 3D CANOPY BUFFER',
        description:
          '3D extrusion showcases high-altitude canopy (>30m) dominated by Podocarpus falcatus and Albizia gummifera, providing thermal insulation against highland frost and preserving soil moisture.',
      },
      {
        id: 'et-3',
        title: 'Gomma Smallholder Polyculture Coffee Parcel',
        subtitle: 'Jimma University Benchmark • 88% Canopy Density',
        center: [36.81, 7.66],
        zoom: 15.2,
        pitch: 65,
        bearing: 80,
        badge: 'STAGE 3: PARCEL TELEMETRY',
        description:
          'Micro-scale parcel inspection of a smallholder cooperative plot. High-density canopy (88%) intercropped with enset and native legumes yields 192 tC/ha total carbon stock and exceptional cup quality.',
      },
      {
        id: 'et-4',
        title: 'EUDR Article 9 Geolocation & Compliance Resolution',
        subtitle: 'Zero Deforestation • Smallholder Legal Due Diligence',
        center: [36.805, 7.704],
        zoom: 13.8,
        pitch: 50,
        bearing: 140,
        badge: 'STAGE 4: DUE DILIGENCE RESOLUTION',
        description:
          'Autonomous due diligence statement: Satellite multi-spectral time series confirms agricultural coffee production under natural shade canopy since 2017, proving zero forest conversion post-2020.',
      },
    ],
  };

  const canonicalCode =
    jurisdictionCode.startsWith('ES')
      ? 'ES-EX'
      : jurisdictionCode.startsWith('ET')
      ? 'ET-OR'
      : 'GH-AH';

  const waypoints = waypointsByJurisdiction[canonicalCode] || waypointsByJurisdiction['GH-AH'];
  const activeWp = waypoints[currentIndex] || waypoints[0];

  // Auto-advance when playing
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const timer = setTimeout(() => {
      handleNext();
    }, 9000);
    return () => clearTimeout(timer);
  }, [isOpen, isPlaying, currentIndex, waypoints]);

  // Trigger flyTo whenever waypoint changes
  useEffect(() => {
    if (isOpen && activeWp) {
      onFlyToWaypoint(activeWp);
    }
  }, [isOpen, currentIndex, activeWp]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % waypoints.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + waypoints.length) % waypoints.length);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 w-full max-w-xl px-4 pointer-events-auto">
      <div className="bg-slate-950/90 backdrop-blur-md border border-emerald-500/40 rounded-xl p-4 shadow-2xl text-slate-100 space-y-3 font-sans">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center space-x-2">
            <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-white tracking-wide">SCENE DIRECTOR: GUIDED TOUR</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                  {currentIndex + 1} / {waypoints.length}
                </span>
              </div>
              <span className="text-[10px] text-slate-400">Cinematic Inspection of Strategic Agroforestry Zones</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Waypoint content card */}
        <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-800 space-y-1.5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[9px] font-mono tracking-wider font-semibold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60">
                {activeWp.badge}
              </span>
              <h3 className="text-sm font-bold text-white mt-1">{activeWp.title}</h3>
              <p className="text-[11px] text-emerald-300 font-medium">{activeWp.subtitle}</p>
            </div>
            <div className="flex items-center space-x-1 text-[10px] text-slate-400 font-mono">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {activeWp.center[1].toFixed(3)}°N, {activeWp.center[0].toFixed(3)}°E
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed pt-1">{activeWp.description}</p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
              title="Previous Waypoint"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center space-x-1.5 transition-colors shadow-sm"
              title={isPlaying ? 'Pause Tour' : 'Play Tour'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Tour' : 'Resume'}</span>
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
              title="Next Waypoint"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[10px] text-slate-400 font-mono">
            Auto-orbits every 9s • Pitch: {activeWp.pitch}°
          </div>
        </div>
      </div>
    </div>
  );
};
