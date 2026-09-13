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
import { Jurisdiction, Parcel, LayerState, SensorMode, TourWaypoint } from './types';
import { api } from './services/api';

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
        const isSpain = selectedJurisdiction.code === 'ES-EX';
        const isGhana = selectedJurisdiction.code === 'GH-AH';
        setParcels([
          {
            id: 'p-1',
            class_label: 'agroforestry',
            agroforestry_subtype: isSpain ? 'dehesa' : isGhana ? 'shade_cocoa' : 'shade_coffee',
            confidence_score: 0.95,
            area_ha: isSpain ? 48.5 : isGhana ? 14.2 : 18.0,
            uncertainty: 0.04,
            source: 'Sentinel-2 + Planet AlphaEarth',
            source_year: 2023,
            geometry: { type: 'Polygon', coordinates: [] },
          },
          {
            id: 'p-2',
            class_label: 'agroforestry',
            agroforestry_subtype: isSpain ? 'dehesa' : isGhana ? 'shade_cocoa' : 'shade_coffee',
            confidence_score: 0.92,
            area_ha: isSpain ? 72.3 : isGhana ? 28.6 : 24.5,
            uncertainty: 0.06,
            source: 'Sentinel-2 + GEDI Canopy',
            source_year: 2022,
            geometry: { type: 'Polygon', coordinates: [] },
          },
          {
            id: 'p-3',
            class_label: 'agroforestry',
            agroforestry_subtype: isSpain ? 'silvopasture' : isGhana ? 'alley_cropping' : 'homegarden',
            confidence_score: 0.88,
            area_ha: isSpain ? 35.0 : isGhana ? 9.5 : 12.0,
            uncertainty: 0.08,
            source: 'Sentinel-2 + CIFOR Ground Truth',
            source_year: 2023,
            geometry: { type: 'Polygon', coordinates: [] },
          },
          {
            id: 'p-4',
            class_label: 'agroforestry',
            agroforestry_subtype: isSpain ? 'dehesa' : isGhana ? 'shade_cocoa' : 'shade_coffee',
            confidence_score: 0.94,
            area_ha: isSpain ? 55.0 : isGhana ? 21.0 : 16.5,
            uncertainty: 0.05,
            source: 'Sentinel-2 + Planet NICFI',
            source_year: 2024,
            geometry: { type: 'Polygon', coordinates: [] },
          },
        ]);
      }
    });
  }, [selectedJurisdiction]);

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
      </div>
    </div>
  );
}

export default App;
