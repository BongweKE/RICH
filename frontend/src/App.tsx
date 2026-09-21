import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { MapViewer } from './components/MapViewer';
import { LayerPanel } from './components/LayerPanel';
import { ParcelInspector } from './components/ParcelInspector';
import { AIChatDrawer } from './components/AIChatDrawer';
import { LUMENSModal } from './components/LUMENSModal';
import { PolicyModal } from './components/PolicyModal';
import { TacticalHUD } from './components/TacticalHUD';
import { SensorOverlay } from './components/SensorOverlay';
import { SceneDirector } from './components/SceneDirector';
import { TemporalScrubber } from './components/TemporalScrubber';
import { PlotInboxDrawer } from './components/PlotInboxDrawer';
import { Jurisdiction, Parcel, LayerState, LayerOpacityState, SensorMode, TourWaypoint } from './types';
import { api } from './services/api';

const getFallbackParcels = (code?: string): Parcel[] => {
  if (code === 'ES-EX') {
    return [
      {
        id: 'es-af-1',
        jurisdiction_code: 'ES-EX',
        class_label: 'agroforestry',
        agroforestry_subtype: 'dehesa',
        confidence_score: 0.97,
        area_ha: 48.5,
        uncertainty: 0.03,
        source: 'SITEX Extremadura + Sentinel-2',
        source_year: 2023,
        subtype_color: '#827b3d',
        height: 45,
        geometry: {
          type: 'Polygon',
          coordinates: [[[-6.325, 39.185], [-6.312, 39.186], [-6.310, 39.196], [-6.323, 39.197], [-6.325, 39.185]]],
        },
      },
      {
        id: 'es-af-2',
        jurisdiction_code: 'ES-EX',
        class_label: 'agroforestry',
        agroforestry_subtype: 'dehesa',
        confidence_score: 0.94,
        area_ha: 72.3,
        uncertainty: 0.05,
        source: 'SITEX Extremadura + GEDI',
        source_year: 2023,
        subtype_color: '#827b3d',
        height: 52,
        geometry: {
          type: 'Polygon',
          coordinates: [[[-6.305, 39.192], [-6.290, 39.191], [-6.288, 39.204], [-6.303, 39.205], [-6.305, 39.192]]],
        },
      },
      {
        id: 'es-af-3',
        jurisdiction_code: 'ES-EX',
        class_label: 'agroforestry',
        agroforestry_subtype: 'silvopasture',
        confidence_score: 0.91,
        area_ha: 35.0,
        uncertainty: 0.07,
        source: 'Copernicus High Resolution Layer',
        source_year: 2022,
        subtype_color: '#918242',
        height: 38,
        geometry: {
          type: 'Polygon',
          coordinates: [[[-6.338, 39.201], [-6.326, 39.202], [-6.324, 39.211], [-6.336, 39.212], [-6.338, 39.201]]],
        },
      },
      {
        id: 'es-af-4',
        jurisdiction_code: 'ES-EX',
        class_label: 'agroforestry',
        agroforestry_subtype: 'dehesa',
        confidence_score: 0.95,
        area_ha: 55.0,
        uncertainty: 0.04,
        source: 'SITEX Extremadura + Sentinel-2',
        source_year: 2024,
        subtype_color: '#827b3d',
        height: 48,
        geometry: {
          type: 'Polygon',
          coordinates: [[[-6.285, 39.178], [-6.272, 39.179], [-6.270, 39.189], [-6.283, 39.190], [-6.285, 39.178]]],
        },
      },
      {
        id: 'es-af-5',
        jurisdiction_code: 'ES-EX',
        class_label: 'agroforestry',
        agroforestry_subtype: 'parkland',
        confidence_score: 0.89,
        area_ha: 42.1,
        uncertainty: 0.08,
        source: 'Copernicus HRL Forest',
        source_year: 2023,
        subtype_color: '#5e8c61',
        height: 35,
        geometry: {
          type: 'Polygon',
          coordinates: [[[-6.318, 39.214], [-6.305, 39.215], [-6.303, 39.224], [-6.316, 39.225], [-6.318, 39.214]]],
        },
      },
    ];
  }

  if (code === 'ET-OR') {
    return [
      {
        id: 'et-af-1',
        jurisdiction_code: 'ET-OR',
        class_label: 'agroforestry',
        agroforestry_subtype: 'shade_coffee',
        confidence_score: 0.95,
        area_ha: 16.2,
        uncertainty: 0.04,
        source: 'Sentinel-2 + Planet NICFI',
        source_year: 2023,
        subtype_color: '#2d9d78',
        height: 36,
        geometry: {
          type: 'Polygon',
          coordinates: [[[36.792, 7.698], [36.800, 7.699], [36.799, 7.706], [36.791, 7.705], [36.792, 7.698]]],
        },
      },
      {
        id: 'et-af-2',
        jurisdiction_code: 'ET-OR',
        class_label: 'agroforestry',
        agroforestry_subtype: 'shade_coffee',
        confidence_score: 0.93,
        area_ha: 24.5,
        uncertainty: 0.06,
        source: 'CIFOR Ethiopia Forest Survey',
        source_year: 2023,
        subtype_color: '#2d9d78',
        height: 40,
        geometry: {
          type: 'Polygon',
          coordinates: [[[36.805, 7.704], [36.814, 7.703], [36.813, 7.712], [36.804, 7.713], [36.805, 7.704]]],
        },
      },
      {
        id: 'et-af-3',
        jurisdiction_code: 'ET-OR',
        class_label: 'agroforestry',
        agroforestry_subtype: 'homegarden',
        confidence_score: 0.92,
        area_ha: 8.4,
        uncertainty: 0.05,
        source: 'Jimma University Agroforestry DB',
        source_year: 2022,
        subtype_color: '#3a7d44',
        height: 26,
        geometry: {
          type: 'Polygon',
          coordinates: [[[36.782, 7.711], [36.790, 7.712], [36.788, 7.718], [36.781, 7.717], [36.782, 7.711]]],
        },
      },
      {
        id: 'et-af-4',
        jurisdiction_code: 'ET-OR',
        class_label: 'agroforestry',
        agroforestry_subtype: 'parkland',
        confidence_score: 0.88,
        area_ha: 19.1,
        uncertainty: 0.08,
        source: 'Sentinel-2 + GEDI Canopy Top Height',
        source_year: 2023,
        subtype_color: '#5e8c61',
        height: 30,
        geometry: {
          type: 'Polygon',
          coordinates: [[[36.818, 7.691], [36.826, 7.692], [36.825, 7.699], [36.817, 7.698], [36.818, 7.691]]],
        },
      },
      {
        id: 'et-af-5',
        jurisdiction_code: 'ET-OR',
        class_label: 'agroforestry',
        agroforestry_subtype: 'silvopasture',
        confidence_score: 0.90,
        area_ha: 28.0,
        uncertainty: 0.07,
        source: 'Ethiopia Open Data + Landsat-9',
        source_year: 2024,
        subtype_color: '#918242',
        height: 34,
        geometry: {
          type: 'Polygon',
          coordinates: [[[36.796, 7.684], [36.806, 7.685], [36.805, 7.693], [36.795, 7.692], [36.796, 7.684]]],
        },
      },
    ];
  }

  // Default to Ghana Ashanti GH-AH
  return [
    {
      id: 'gh-af-1',
      jurisdiction_code: 'GH-AH',
      class_label: 'agroforestry',
      agroforestry_subtype: 'shade_cocoa',
      confidence_score: 0.96,
      area_ha: 14.8,
      uncertainty: 0.03,
      source: 'CERSGIS + Sentinel-2 + Planet NICFI',
      source_year: 2023,
      subtype_color: '#1f8a70',
      height: 38,
      geometry: {
        type: 'Polygon',
        coordinates: [[[-1.629, 6.708], [-1.621, 6.709], [-1.620, 6.716], [-1.627, 6.717], [-1.629, 6.708]]],
      },
    },
    {
      id: 'gh-af-2',
      jurisdiction_code: 'GH-AH',
      class_label: 'agroforestry',
      agroforestry_subtype: 'shade_cocoa',
      confidence_score: 0.94,
      area_ha: 22.4,
      uncertainty: 0.05,
      source: 'CERSGIS + GEDI Canopy Height',
      source_year: 2023,
      subtype_color: '#1f8a70',
      height: 42,
      geometry: {
        type: 'Polygon',
        coordinates: [[[-1.618, 6.714], [-1.610, 6.713], [-1.609, 6.721], [-1.616, 6.722], [-1.618, 6.714]]],
      },
    },
    {
      id: 'gh-af-3',
      jurisdiction_code: 'GH-AH',
      class_label: 'agroforestry',
      agroforestry_subtype: 'alley_cropping',
      confidence_score: 0.91,
      area_ha: 9.2,
      uncertainty: 0.06,
      source: 'CIFOR-ICRAF Ground Truth Benchmark',
      source_year: 2022,
      subtype_color: '#4a905d',
      height: 28,
      geometry: {
        type: 'Polygon',
        coordinates: [[[-1.635, 6.718], [-1.628, 6.719], [-1.626, 6.725], [-1.634, 6.726], [-1.635, 6.718]]],
      },
    },
    {
      id: 'gh-af-4',
      jurisdiction_code: 'GH-AH',
      class_label: 'agroforestry',
      agroforestry_subtype: 'parkland',
      confidence_score: 0.89,
      area_ha: 18.5,
      uncertainty: 0.08,
      source: 'Sentinel-2 + WorldCover',
      source_year: 2023,
      subtype_color: '#5e8c61',
      height: 32,
      geometry: {
        type: 'Polygon',
        coordinates: [[[-1.615, 6.702], [-1.608, 6.703], [-1.607, 6.710], [-1.614, 6.709], [-1.615, 6.702]]],
      },
    },
    {
      id: 'gh-af-5',
      jurisdiction_code: 'GH-AH',
      class_label: 'agroforestry',
      agroforestry_subtype: 'boundary_planting',
      confidence_score: 0.93,
      area_ha: 11.0,
      uncertainty: 0.04,
      source: 'Planet NICFI + Sentinel-2',
      source_year: 2024,
      subtype_color: '#2a6f3b',
      height: 24,
      geometry: {
        type: 'Polygon',
        coordinates: [[[-1.626, 6.722], [-1.619, 6.723], [-1.618, 6.729], [-1.625, 6.730], [-1.626, 6.722]]],
      },
    },
  ];
};

export function App() {
  const [jurisdictions, setJurisdictions] = useState<Jurisdiction[]>([]);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction | null>(null);
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);

  const [layers, setLayers] = useState<LayerState>({
    agroforestryParcels: true,
    referencePoints: true,
    eudrDeforestationBaseline: true,
    canopyDensity: true,
    satelliteBasemap: false,
    carbonDensityHeatmap: false,
  });

  const [opacities, setOpacities] = useState<LayerOpacityState>({
    agroforestryParcels: 85,
    referencePoints: 90,
    eudrDeforestationBaseline: 70,
    canopyDensity: 60,
    satelliteBasemap: 100,
    carbonDensityHeatmap: 50,
  });

  const [is3DMode, setIs3DMode] = useState(true); // default to 3D perspective
  const [sensorMode, setSensorMode] = useState<SensorMode>('normal');
  const [currentYear, setCurrentYear] = useState<number>(2024);
  const [isSplitCompare, setIsSplitCompare] = useState<boolean>(false);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [tourWaypoint, setTourWaypoint] = useState<TourWaypoint | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true); // default muted

  // Telemetry state
  const [cursorCoords, setCursorCoords] = useState<[number, number] | null>(null);
  const [cameraTelemetry, setCameraTelemetry] = useState<{
    pitch: number;
    bearing: number;
    zoom: number;
    center: [number, number];
  }>({
    pitch: 55,
    bearing: -15,
    zoom: 11,
    center: [-1.624, 6.712],
  });

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialChatPrompt, setInitialChatPrompt] = useState<string | null>(null);
  const [isLumensOpen, setIsLumensOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  // Tactical SFX audio synthesizer
  const playTacticalSFX = useCallback(
    (type: 'beep' | 'toggle' | 'sensor' | 'tour') => {
      if (isAudioMuted) return;
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'beep') {
          osc.frequency.setValueAtTime(880, ctx.currentTime);
          gain.gain.setValueAtTime(0.04, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
          osc.start();
          osc.stop(ctx.currentTime + 0.1);
        } else if (type === 'sensor') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(440, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.15);
          gain.gain.setValueAtTime(0.03, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
          osc.start();
          osc.stop(ctx.currentTime + 0.15);
        } else {
          osc.frequency.setValueAtTime(587.33, ctx.currentTime);
          gain.gain.setValueAtTime(0.03, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
          osc.start();
          osc.stop(ctx.currentTime + 0.08);
        }
      } catch (e) {
        // ignore
      }
    },
    [isAudioMuted]
  );

  // Load Jurisdictions (Default to Ghana Ashanti GH-AH)
  useEffect(() => {
    const loadJurisdictions = async () => {
      const list = await api.getJurisdictions();
      setJurisdictions(list);
      if (list.length > 0) {
        // Find Ghana Ashanti as flagship, or default to first
        const ghana = list.find((j) => j.code === 'GH-AH') || list[0];
        setSelectedJurisdiction(ghana);
      }
    };
    loadJurisdictions();
  }, []);

  // Load Parcels when jurisdiction changes
  useEffect(() => {
    if (!selectedJurisdiction) return;

    const bbox =
      selectedJurisdiction.code === 'ES-EX'
        ? [-7.5, 38.0, -5.0, 40.5]
        : selectedJurisdiction.code === 'GH-AH'
        ? [-2.4, 5.8, -1.0, 7.4]
        : [35.0, 6.5, 39.5, 9.5];

    api.searchParcels(bbox, selectedJurisdiction.code).then((data) => {
      if (data && data.length > 0) {
        setParcels(data);
      } else {
        setParcels(getFallbackParcels(selectedJurisdiction.code));
      }
    });
  }, [selectedJurisdiction]);

  const handleLoadUploadedParcels = useCallback(
    (features: any[]) => {
      const newParcels: Parcel[] = features.map((f: any, idx: number) => {
        const props = f.properties || {};
        const subtype =
          props.agroforestry_subtype ||
          props.subtype ||
          (selectedJurisdiction?.code === 'ES-EX'
            ? 'dehesa'
            : selectedJurisdiction?.code === 'ET-OR'
            ? 'shade_coffee'
            : 'shade_cocoa');
        return {
          id: props.id || props.name || `user-parcel-${Date.now()}-${idx + 1}`,
          jurisdiction_code: selectedJurisdiction?.code || 'USER',
          geometry: f.geometry,
          class_label: props.class_label || 'agroforestry',
          agroforestry_subtype: subtype,
          confidence_score: Number(props.confidence_score || props.confidence || 0.94),
          area_ha: Number(props.area_ha || props.area || 14.5),
          uncertainty: Number(props.uncertainty || 0.05),
          source: props.source || 'User Upload (Plot Inbox)',
          source_year: Number(props.source_year || new Date().getFullYear()),
        };
      });

      setParcels((prev) => [...newParcels, ...prev]);
      if (newParcels.length > 0) {
        setSelectedParcel(newParcels[0]);
      }
      setLayers((prev) => ({ ...prev, agroforestryParcels: true }));
      playTacticalSFX('beep');
    },
    [selectedJurisdiction, playTacticalSFX]
  );

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) return;

      if (e.key === '1') {
        setSensorMode('normal');
        playTacticalSFX('sensor');
      } else if (e.key === '2') {
        setSensorMode('nvg');
        playTacticalSFX('sensor');
      } else if (e.key === '3') {
        setSensorMode('flir');
        playTacticalSFX('sensor');
      } else if (e.key === '4') {
        setSensorMode('crt');
        playTacticalSFX('sensor');
      } else if (e.key === '5') {
        setSensorMode('noir');
        playTacticalSFX('sensor');
      } else if (e.key === 't' || e.key === 'T') {
        setIs3DMode((prev) => !prev);
        playTacticalSFX('toggle');
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsTourOpen((prev) => !prev);
        playTacticalSFX('tour');
      } else if (e.key === 'Escape') {
        setSelectedParcel(null);
        setIsTourOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playTacticalSFX]);

  const toggleLayer = (layer: keyof LayerState) => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
    playTacticalSFX('toggle');
  };

  const handleOpacityChange = (layer: keyof LayerOpacityState, value: number) => {
    setOpacities((prev) => ({ ...prev, [layer]: value }));
    playTacticalSFX('beep');
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans select-none">
      {/* Top Tactical Navigation Bar */}
      <Header
        jurisdictions={jurisdictions}
        selectedJurisdiction={selectedJurisdiction}
        onSelectJurisdiction={(j) => {
          setSelectedJurisdiction(j);
          setSelectedParcel(null);
          playTacticalSFX('beep');
        }}
        parcelCount={parcels.length}
        onOpenInbox={() => {
          setIsInboxOpen(true);
          playTacticalSFX('beep');
        }}
        isInboxOpen={isInboxOpen}
        is3DMode={is3DMode}
        onToggle3D={() => {
          setIs3DMode(!is3DMode);
          playTacticalSFX('toggle');
        }}
        onOpenLumens={() => {
          setIsLumensOpen(true);
          playTacticalSFX('beep');
        }}
        onOpenPolicy={() => {
          setIsPolicyOpen(true);
          playTacticalSFX('beep');
        }}
        onToggleChat={() => {
          setIsChatOpen(!isChatOpen);
          playTacticalSFX('beep');
        }}
        isChatOpen={isChatOpen}
        sensorMode={sensorMode}
        onSelectSensorMode={(mode) => {
          setSensorMode(mode);
          playTacticalSFX('sensor');
        }}
        onOpenTour={() => {
          setIsTourOpen(!isTourOpen);
          playTacticalSFX('tour');
        }}
        isTourOpen={isTourOpen}
        isAudioMuted={isAudioMuted}
        onToggleAudio={() => setIsAudioMuted(!isAudioMuted)}
      />

      {/* Main Map Viewer & Interactivity Area */}
      <div className="relative flex-1 flex overflow-hidden">
        {/* God's Eye View Tactical HUD */}
        <TacticalHUD
          cursorCoords={cursorCoords}
          cameraPitch={cameraTelemetry.pitch}
          cameraBearing={cameraTelemetry.bearing}
          cameraZoom={cameraTelemetry.zoom}
          sensorMode={sensorMode}
          parcelCount={parcels.length}
          is3DMode={is3DMode}
          isChatOpen={isChatOpen}
          selectedParcel={selectedParcel}
        />

        {/* Post-Processing Sensor Mode Shader Overlay */}
        <SensorOverlay mode={sensorMode} />

        {/* Scene Director Guided Tour Controller */}
        <SceneDirector
          isOpen={isTourOpen}
          onClose={() => setIsTourOpen(false)}
          jurisdictionCode={selectedJurisdiction?.code || 'GH-AH'}
          onFlyToWaypoint={(wp) => {
            setTourWaypoint(wp);
            playTacticalSFX('beep');
          }}
        />

        {/* Temporal Scrubber & Split Comparison */}
        <TemporalScrubber
          currentYear={currentYear}
          onYearChange={(yr) => {
            setCurrentYear(yr);
            playTacticalSFX('beep');
          }}
          isSplitCompare={isSplitCompare}
          onToggleSplitCompare={() => {
            setIsSplitCompare(!isSplitCompare);
            playTacticalSFX('toggle');
          }}
        />

        {/* Layer Panel Widget */}
        <LayerPanel
          layers={layers}
          onToggleLayer={toggleLayer}
          parcelCount={parcels.length}
          opacities={opacities}
          onOpacityChange={handleOpacityChange}
        />

        {/* 2D / 3D Map Component */}
        <MapViewer
          jurisdiction={selectedJurisdiction}
          parcels={parcels}
          selectedParcel={selectedParcel}
          onSelectParcel={(p) => {
            setSelectedParcel(p);
            playTacticalSFX('beep');
          }}
          layers={layers}
          opacities={opacities}
          is3DMode={is3DMode}
          sensorMode={sensorMode}
          currentYear={currentYear}
          isSplitCompare={isSplitCompare}
          tourWaypoint={tourWaypoint}
          onCameraChange={setCameraTelemetry}
          onCursorMove={setCursorCoords}
        />

        {/* Elite Parcel Telemetry Dossier Drawer */}
        <ParcelInspector
          parcel={selectedParcel}
          onClose={() => setSelectedParcel(null)}
          onRunEUDR={() => setIsPolicyOpen(true)}
          onAskAI={(prompt) => {
            setInitialChatPrompt(prompt);
            setIsChatOpen(true);
          }}
        />

        {/* AI Assistant Copilot Drawer */}
        <AIChatDrawer
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          jurisdictionCode={selectedJurisdiction?.code}
          activeBbox={
            selectedJurisdiction?.code === 'ES-EX'
              ? [-7.5, 38.0, -5.0, 40.5]
              : selectedJurisdiction?.code === 'GH-AH'
              ? [-2.4, 5.8, -1.0, 7.4]
              : [35.0, 6.5, 39.5, 9.5]
          }
          initialPrompt={initialChatPrompt}
          onClearInitialPrompt={() => setInitialChatPrompt(null)}
          onSelectParcelCitation={async (parcelId) => {
            let found = parcels.find((p) => p.id === parcelId);
            if (!found) {
              const fetched = await api.getParcel(parcelId);
              if (fetched) {
                setParcels((prev) => [...prev, fetched]);
                found = fetched;
              }
            }
            if (found) {
              setSelectedParcel(found);
              playTacticalSFX('beep');
            }
          }}
        />

        {/* Dynamic LUMENS Scientific Suite Modal */}
        <LUMENSModal
          isOpen={isLumensOpen}
          onClose={() => setIsLumensOpen(false)}
          jurisdictionCode={selectedJurisdiction?.code || 'GH-AH'}
        />

        {/* Policy & EUDR Modal */}
        <PolicyModal
          isOpen={isPolicyOpen}
          onClose={() => setIsPolicyOpen(false)}
          jurisdictionCode={selectedJurisdiction?.code || 'GH-AH'}
        />

        {/* Plot Inbox (User Upload Drawer) */}
        <PlotInboxDrawer
          isOpen={isInboxOpen}
          onClose={() => setIsInboxOpen(false)}
          onLoadParcels={handleLoadUploadedParcels}
        />
      </div>
    </div>
  );
}

export default App;
// Deployment trigger
