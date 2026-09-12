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

  const waypointsByJurisdiction: Record<string, TourWaypoint[]> = {
    'GH-AH': [
      {
        id: 'gh-1',
        title: 'Ashanti Landscape Overview',
        subtitle: 'Flagship Cocoa Agroforestry Belt',
        center: [-1.624, 6.712],
        zoom: 11,
        pitch: 50,
        bearing: -20,
        badge: 'LANDSCAPE SCALE',
        description:
          'Continental cocoa hotspot in Ghana where multi-strata shade cacao farms bridge protected forest reserves and agricultural land.',
      },
      {
        id: 'gh-2',
        title: 'Shade Cocoa Agroforestry Cluster',
        subtitle: 'Canopy Density 85% • Multi-Strata Native Trees',
        center: [-1.642, 6.728],
        zoom: 13.5,
        pitch: 60,
        bearing: 45,
        badge: 'MODEL AGROFORESTRY',
        description:
          'High structural diversity with emergent Milicia excelsa and Terminalia superba canopy providing shade, moisture conservation, and biodiversity corridors.',
      },
      {
        id: 'gh-3',
        title: 'EUDR 2020 Forest Baseline Frontier',
        subtitle: 'Zero Deforestation Verification Zone',
        center: [-1.589, 6.695],
        zoom: 14,
        pitch: 55,
        bearing: 110,
        badge: 'EUDR AUDIT ZONE',
        description:
          'Intersection analysis against JRC 2020 forest baseline confirms continuous agricultural tree cover prior to Dec 31, 2020, qualifying for EU market compliance.',
      },
      {
        id: 'gh-4',
        title: 'Restoration & Carbon Enhancement Zone',
        subtitle: 'QUES-C Sequestration Pipeline',
        center: [-1.615, 6.745],
        zoom: 13,
        pitch: 45,
        bearing: 180,
        badge: 'CARBON FINANCE',
        description:
          'Active tree enrichment zone generating 5.4 tCO2e/ha/yr in Tier 2 IPCC carbon removals, linked to voluntary carbon market crediting.',
      },
    ],
    'ET-OR': [
      {
        id: 'et-1',
        title: 'Oromia Coffee Forest Overview',
        subtitle: 'Shade-Grown Arabica Highlands',
        center: [36.85, 7.72],
        zoom: 11,
        pitch: 55,
        bearing: -15,
        badge: 'COFFEE AGROFORESTRY',
        description: 'Montane rainforest coffee systems preserving wild Coffea arabica genetic diversity under native Podocarpus falcatus canopy.',
      },
      {
        id: 'et-2',
        title: 'Bale Biodiversity Corridor',
        subtitle: 'Ecological Connectivity & Habitat Integrity',
        center: [36.88, 7.76],
        zoom: 13.5,
        pitch: 60,
        bearing: 60,
        badge: 'QUES-B CORRIDOR',
        description: 'Biological bridge maintaining structural connectivity between fragmented protected forest reserves and highland smallholder parcels.',
      },
    ],
    'ES-EX': [
      {
        id: 'es-1',
        title: 'Extremadura Dehesa Silvopasture',
        subtitle: 'Holm Oak (Quercus ilex) Cultural Landscape',
        center: [-6.32, 39.21],
        zoom: 11.5,
        pitch: 52,
        bearing: 30,
        badge: 'MEDITERRANEAN AGROFORESTRY',
        description: 'Ancient silvopastoral system combining open oak woodland with extensive Iberian livestock grazing and high natural conservation value.',
      },
    ],
  };

  const waypoints = waypointsByJurisdiction[jurisdictionCode] || waypointsByJurisdiction['GH-AH'];
  const activeWp = waypoints[currentIndex] || waypoints[0];

  // Auto-advance when playing
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const timer = setTimeout(() => {
      handleNext();
    }, 9000);
    return () => clearTimeout(timer);
  }, [isOpen, isPlaying, currentIndex]);

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
