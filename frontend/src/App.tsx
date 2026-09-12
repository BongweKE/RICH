import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MapViewer } from './components/MapViewer';
import { LayerPanel } from './components/LayerPanel';
import { ParcelInspector } from './components/ParcelInspector';
import { AIChatDrawer } from './components/AIChatDrawer';
import { LUMENSModal } from './components/LUMENSModal';
import { PolicyModal } from './components/PolicyModal';
import { Jurisdiction, Parcel, LayerState } from './types';
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
  });

  const [is3DMode, setIs3DMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLumensOpen, setIsLumensOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  // Load Jurisdictions
  useEffect(() => {
    const loadJurisdictions = async () => {
      const list = await api.getJurisdictions();
      setJurisdictions(list);
      if (list.length > 0) {
        setSelectedJurisdiction(list[0]);
      }
    };
    loadJurisdictions();
  }, []);

  // Load Parcels when jurisdiction changes
  useEffect(() => {
    if (!selectedJurisdiction) return;

    const bbox = selectedJurisdiction.code === 'ES-EX'
      ? [-7.5, 38.0, -5.0, 40.5]
      : selectedJurisdiction.code === 'GH-AH'
      ? [-2.4, 5.8, -1.0, 7.4]
      : [35.0, 6.5, 39.5, 9.5];

    api.searchParcels(bbox, selectedJurisdiction.code).then((data) => {
      if (data && data.length > 0) {
        setParcels(data);
      } else {
        // Sample realistic demo parcels for this jurisdiction
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
        ]);
      }
    });
  }, [selectedJurisdiction]);

  const toggleLayer = (layer: keyof LayerState) => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Navigation Bar */}
      <Header
        jurisdictions={jurisdictions}
        selectedJurisdiction={selectedJurisdiction}
        onSelectJurisdiction={(j) => {
          setSelectedJurisdiction(j);
          setSelectedParcel(null);
        }}
        is3DMode={is3DMode}
        onToggle3D={() => setIs3DMode(!is3DMode)}
        onOpenLumens={() => setIsLumensOpen(true)}
        onOpenPolicy={() => setIsPolicyOpen(true)}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        isChatOpen={isChatOpen}
      />

      {/* Main Map Viewer Area */}
      <div className="relative flex-1 flex overflow-hidden">
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
          onSelectParcel={setSelectedParcel}
          layers={layers}
          is3DMode={is3DMode}
        />

        {/* Parcel Inspector Drawer */}
        <ParcelInspector
          parcel={selectedParcel}
          onClose={() => setSelectedParcel(null)}
          onRunEUDR={() => setIsPolicyOpen(true)}
        />

        {/* AI Assistant Drawer */}
        <AIChatDrawer
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          jurisdictionCode={selectedJurisdiction?.code}
          onSelectParcelCitation={(id) => {
            const found = parcels.find((p) => p.id === id);
            if (found) setSelectedParcel(found);
          }}
        />
      </div>

      {/* LUMENS Analysis Modal */}
      <LUMENSModal
        isOpen={isLumensOpen}
        onClose={() => setIsLumensOpen(false)}
        jurisdictionCode={selectedJurisdiction?.code || 'ES-EX'}
      />

      {/* Policy & Compliance Modal */}
      <PolicyModal
        isOpen={isPolicyOpen}
        onClose={() => setIsPolicyOpen(false)}
        jurisdictionCode={selectedJurisdiction?.code || 'GH-AH'}
      />
    </div>
  );
}

export default App;
