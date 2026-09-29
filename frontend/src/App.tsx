import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { MapViewer } from './components/MapViewer';
import { LayerPanel } from './components/LayerPanel';
import { ParcelInspector } from './components/ParcelInspector';
import { AIChatDrawer } from './components/AIChatDrawer';
import { LUMENSModal } from './components/LUMENSModal';
import { PolicyModal } from './components/PolicyModal';
import { TacticalHUD } from './components/TacticalHUD';
import { SceneDirector } from './components/SceneDirector';
import { TemporalScrubber } from './components/TemporalScrubber';
import { PlotInboxDrawer } from './components/PlotInboxDrawer';
import { Jurisdiction, Parcel, LayerState, LayerOpacityState, TourWaypoint, AGROFORESTRY_SUBTYPE_COLORS } from './types';
import { api } from './services/api';

import allParcelsData from './data/allParcels.json';

const getFallbackParcels = (code?: string): Parcel[] => {
  const all = allParcelsData as Parcel[];
  if (!code) return all;
  const clean = code.trim();
  const canonical =
    clean === 'ES' || clean === 'ES-EX'
      ? 'ES-EX'
      : clean === 'ET' || clean === 'ET-OR'
      ? 'ET-OR'
      : 'GH-AH';
  const matches = all.filter(
    (p) =>
      p.jurisdiction_code === canonical ||
      Boolean(p.jurisdiction_code?.startsWith(`${canonical}-`)) ||
      Boolean(p.jurisdiction_code?.startsWith(canonical))
  );
  return matches.length > 0 ? matches : all;
};


export function App() {
  const [jurisdictions, setJurisdictions] = useState<Jurisdiction[]>([]);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction | null>(null);
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);

  const [layers, setLayers] = useState<LayerState>({
    agroforestryParcels: true,
    referencePoints: true,
    deforestationAlerts: true,
    eudrDeforestationBaseline: true,
    canopyDensity: true,
    satelliteBasemap: false,
    carbonDensityHeatmap: false,
    uncertaintyOverlay: false,
  });

  const [opacities, setOpacities] = useState<LayerOpacityState>({
    agroforestryParcels: 85,
    referencePoints: 90,
    deforestationAlerts: 85,
    eudrDeforestationBaseline: 70,
    canopyDensity: 60,
    satelliteBasemap: 100,
    carbonDensityHeatmap: 50,
    uncertaintyOverlay: 70,
  });

  const [referencePoints, setReferencePoints] = useState<any[]>([]);
  const [deforestationAlerts, setDeforestationAlerts] = useState<any[]>([]);

  const [is3DMode, setIs3DMode] = useState(true); // default to 3D perspective
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

  // UI SFX audio synthesizer
  const playSfx = useCallback(
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
      const pilotJurisdictions: Jurisdiction[] = [
        { id: '22222222-2222-4000-8000-000000000002', name: 'Ghana (Ashanti Cocoa Agroforestry)', code: 'GH-AH', level: 1, centroid: { type: 'Point', coordinates: [-1.50, 6.50] } },
        { id: '11111111-1111-4000-8000-000000000002', name: 'Spain (Extremadura Dehesa Oak Silvopasture)', code: 'ES-EX', level: 1, centroid: { type: 'Point', coordinates: [-6.26, 39.25] } },
        { id: '33333333-3333-4000-8000-000000000002', name: 'Ethiopia (Oromia Cloud Forest Shade Coffee)', code: 'ET-OR', level: 1, centroid: { type: 'Point', coordinates: [37.29, 8.00] } },
      ];
      try {
        const list = await api.getJurisdictions();
        const merged = [...pilotJurisdictions];
        if (list && list.length > 0) {
          for (const item of list) {
            if (!merged.some((m) => m.code === item.code)) {
              merged.push(item);
            }
          }
        }
        setJurisdictions(merged);
        const ghana = merged.find((j) => j.code === 'GH-AH') || merged[0];
        setSelectedJurisdiction(ghana);
      } catch {
        setJurisdictions(pilotJurisdictions);
        setSelectedJurisdiction(pilotJurisdictions[0]);
      }
    };
    loadJurisdictions();
  }, []);

  // Load Parcels when jurisdiction changes
  useEffect(() => {
    if (!selectedJurisdiction) return;

    let isCurrent = true;
    const jCode = selectedJurisdiction.code;
    const canonicalCode =
      jCode === 'ES' || jCode === 'ES-EX'
        ? 'ES-EX'
        : jCode === 'ET' || jCode === 'ET-OR'
        ? 'ET-OR'
        : 'GH-AH';


    const loadLandscapeData = async () => {
      try {
        const [parcelData, refData, alertData] = await Promise.all([
          api.getParcels(canonicalCode, 500).catch(() => getFallbackParcels(canonicalCode)),
          api.getReferencePoints(canonicalCode).catch(() => []),
          api.getDeforestationAlerts(canonicalCode).catch(() => []),
        ]);

        if (isCurrent) {
          const finalParcels = parcelData && parcelData.length > 0 ? parcelData : getFallbackParcels(canonicalCode);
          setParcels(finalParcels);
          setReferencePoints(refData || []);
          setDeforestationAlerts(alertData || []);
        }
      } catch (e) {
        console.warn('Error loading landscape data, using exhaustive local datasets:', e);
        if (isCurrent) {
          setParcels(getFallbackParcels(canonicalCode));
        }
      }
    };

    loadLandscapeData();

    return () => {
      isCurrent = false;
    };
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
        const areaHa = Number(props.area_ha || props.area || 14.5);
        return {
          id: props.id || props.name || `user-parcel-${Date.now()}-${idx + 1}`,
          jurisdiction_code: selectedJurisdiction?.code || 'USER',
          geometry: f.geometry,
          class_label: props.class_label || 'agroforestry',
          agroforestry_subtype: subtype,
          confidence_score: Number(props.confidence_score || props.confidence || 0.94),
          area_ha: areaHa,
          uncertainty: Number(props.uncertainty || 0.05),
          source: props.source || 'User Upload (Plot Inbox)',
          source_year: Number(props.source_year || new Date().getFullYear()),
          subtype_color:
            props.subtype_color ||
            AGROFORESTRY_SUBTYPE_COLORS[subtype] ||
            AGROFORESTRY_SUBTYPE_COLORS.default,
          height: Math.max(5.0, Math.min(50.0, areaHa * 0.8)),
        };
      });

      setParcels((prev) => [...newParcels, ...prev]);
      if (newParcels.length > 0) {
        setSelectedParcel(newParcels[0]);
      }
      setLayers((prev) => ({ ...prev, agroforestryParcels: true }));
      playSfx('beep');
    },
    [selectedJurisdiction, playSfx]
  );

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) return;

      if (e.key === 't' || e.key === 'T') {
        setIs3DMode((prev) => !prev);
        playSfx('toggle');
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsTourOpen((prev) => !prev);
        playSfx('tour');
      } else if (e.key === 'Escape') {
        setSelectedParcel(null);
        setIsTourOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playSfx]);

  const toggleLayer = (layer: keyof LayerState) => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
    playSfx('toggle');
  };

  const handleOpacityChange = (layer: keyof LayerOpacityState, value: number) => {
    setOpacities((prev) => ({ ...prev, [layer]: value }));
    playSfx('beep');
  };

  const totalDatapoints = parcels.length + referencePoints.length + deforestationAlerts.length;

  return (
    <div className="flex flex-col w-screen h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans select-none">
      {/* Top Navigation Bar */}
      <Header
        jurisdictions={jurisdictions}
        selectedJurisdiction={selectedJurisdiction}
        onSelectJurisdiction={(j) => {
          setSelectedJurisdiction(j);
          setSelectedParcel(null);
          playSfx('beep');
        }}
        parcelCount={parcels.length}
        totalDatapoints={totalDatapoints}
        referenceCount={referencePoints.length}
        alertsCount={deforestationAlerts.length}
        onOpenInbox={() => {
          setIsInboxOpen(true);
          playSfx('beep');
        }}
        isInboxOpen={isInboxOpen}
        is3DMode={is3DMode}
        onToggle3D={() => {
          setIs3DMode(!is3DMode);
          playSfx('toggle');
        }}
        onOpenLumens={() => {
          setIsLumensOpen(true);
          playSfx('beep');
        }}
        onOpenPolicy={() => {
          setIsPolicyOpen(true);
          playSfx('beep');
        }}
        onToggleChat={() => {
          setIsChatOpen(!isChatOpen);
          playSfx('beep');
        }}
        isChatOpen={isChatOpen}
        onOpenTour={() => {
          setIsTourOpen(!isTourOpen);
          playSfx('tour');
        }}
        isTourOpen={isTourOpen}
        isAudioMuted={isAudioMuted}
        onToggleAudio={() => setIsAudioMuted(!isAudioMuted)}
      />

      {/* Main Map Viewer & Interactivity Area */}
      <div className="relative flex-1 flex overflow-hidden">
        {/* Viewer Telemetry HUD */}
        <TacticalHUD
          cursorCoords={cursorCoords}
          cameraPitch={cameraTelemetry.pitch}
          cameraBearing={cameraTelemetry.bearing}
          cameraZoom={cameraTelemetry.zoom}
          parcelCount={parcels.length}
          totalDatapoints={totalDatapoints}
          is3DMode={is3DMode}
          isChatOpen={isChatOpen}
          selectedParcel={selectedParcel}
        />


        {/* Scene Director Guided Tour Controller */}
        <SceneDirector
          isOpen={isTourOpen}
          onClose={() => setIsTourOpen(false)}
          jurisdictionCode={selectedJurisdiction?.code || 'GH-AH'}
          onFlyToWaypoint={(wp) => {
            setTourWaypoint(wp);
            playSfx('beep');
          }}
          onSelectNearestParcel={(coords) => {
            if (parcels.length > 0) {
              let closest = parcels[0];
              let minD = Infinity;
              for (const p of parcels) {
                if (p.geometry?.coordinates) {
                  const ring = p.geometry.coordinates[0];
                  const c = Array.isArray(ring) ? ring[0] : null;
                  if (c && typeof c[0] === 'number') {
                    const d = (c[0] - coords[0]) ** 2 + (c[1] - coords[1]) ** 2;
                    if (d < minD) {
                      minD = d;
                      closest = p;
                    }
                  }
                }
              }
              setSelectedParcel(closest);
            }
          }}
        />

        {/* Temporal Scrubber & Split Comparison */}
        <TemporalScrubber
          currentYear={currentYear}
          onYearChange={(yr) => {
            setCurrentYear(yr);
            playSfx('beep');
          }}
          isSplitCompare={isSplitCompare}
          onToggleSplitCompare={() => {
            setIsSplitCompare(!isSplitCompare);
            playSfx('toggle');
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
            playSfx('beep');
          }}
          layers={layers}
          opacities={opacities}
          is3DMode={is3DMode}
          currentYear={currentYear}
          isSplitCompare={isSplitCompare}
          tourWaypoint={tourWaypoint}
          referencePoints={referencePoints}
          deforestationAlerts={deforestationAlerts}
          onCameraChange={setCameraTelemetry}
          onCursorMove={setCursorCoords}
        />

        {/* Elite Parcel Telemetry Dossier Drawer */}
        <ParcelInspector
          parcel={selectedParcel}
          hidden={isChatOpen}
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
              playSfx('beep');
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
