import React, { useState, useRef, useCallback } from 'react';
import { X, Upload, FileJson, CheckCircle2, AlertTriangle, MapPin, Trash2 } from 'lucide-react';

interface PlotInboxDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadParcels: (features: any[]) => void;
}

interface ParsedFile {
  name: string;
  featureCount: number;
  features: any[];
  error?: string;
}

export const PlotInboxDrawer: React.FC<PlotInboxDrawerProps> = ({
  isOpen,
  onClose,
  onLoadParcels,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [parsedFile, setParsedFile] = useState<ParsedFile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseGeoJSON = useCallback((text: string, fileName: string) => {
    try {
      const json = JSON.parse(text);
      let features: any[] = [];

      if (json.type === 'FeatureCollection' && Array.isArray(json.features)) {
        features = json.features.filter(
          (f: any) => f && f.geometry && f.geometry.type
        );
      } else if (json.type === 'Feature' && json.geometry) {
        features = [json];
      } else if (json.type === 'Polygon' || json.type === 'MultiPolygon') {
        features = [{ type: 'Feature', properties: {}, geometry: json }];
      } else if (Array.isArray(json)) {
        features = json
          .map((item: any) => {
            if (item && item.type === 'Feature' && item.geometry) return item;
            if (item && (item.type === 'Polygon' || item.type === 'MultiPolygon'))
              return { type: 'Feature', properties: {}, geometry: item };
            return null;
          })
          .filter(Boolean);
      } else {
        setParsedFile({ name: fileName, featureCount: 0, features: [], error: 'Invalid GeoJSON: No FeatureCollection, Feature, or Polygon geometry found.' });
        return;
      }

      if (features.length === 0) {
        setParsedFile({ name: fileName, featureCount: 0, features: [], error: 'GeoJSON parsed but contains no valid features with geometry.' });
        return;
      }

      setParsedFile({ name: fileName, featureCount: features.length, features });
      setIsLoaded(false);
    } catch (e) {
      setParsedFile({ name: fileName, featureCount: 0, features: [], error: `JSON parse error: ${(e as Error).message}` });
    }
  }, []);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.endsWith('.geojson') && !file.name.endsWith('.json')) {
        setParsedFile({ name: file.name, featureCount: 0, features: [], error: 'Only .geojson or .json files are accepted.' });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        parseGeoJSON(text, file.name);
      };
      reader.readAsText(file);
    },
    [parseGeoJSON]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleLoadToMap = () => {
    if (!parsedFile || parsedFile.features.length === 0) return;
    onLoadParcels(parsedFile.features);
    setIsLoaded(true);
  };

  const handleClear = () => {
    setParsedFile(null);
    setIsLoaded(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Compute a simple bounding-box preview summary
  const bboxSummary = React.useMemo(() => {
    if (!parsedFile || parsedFile.features.length === 0) return null;
    const coords: number[][] = [];
    const collectCoords = (geom: any) => {
      if (!geom) return;
      if (geom.type === 'Point') coords.push(geom.coordinates);
      else if (geom.type === 'LineString' || geom.type === 'MultiPoint')
        geom.coordinates.forEach((c: number[]) => coords.push(c));
      else if (geom.type === 'Polygon' || geom.type === 'MultiLineString')
        geom.coordinates.forEach((ring: number[][]) => ring.forEach((c) => coords.push(c)));
      else if (geom.type === 'MultiPolygon')
        geom.coordinates.forEach((poly: number[][][]) =>
          poly.forEach((ring) => ring.forEach((c) => coords.push(c)))
        );
    };
    parsedFile.features.forEach((f: any) => collectCoords(f.geometry));
    if (coords.length === 0) return null;
    const lons = coords.map((c) => c[0]);
    const lats = coords.map((c) => c[1]);
    return {
      minLon: Math.min(...lons).toFixed(4),
      maxLon: Math.max(...lons).toFixed(4),
      minLat: Math.min(...lats).toFixed(4),
      maxLat: Math.max(...lats).toFixed(4),
    };
  }, [parsedFile]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-950/95 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-xs font-sans select-none">
        {/* Header */}
        <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-white">Plot Inbox</span>
              <p className="text-[10px] text-slate-400">Upload farm parcels via GeoJSON drag-and-drop</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3 flex-1">
          {/* Drop zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`relative w-full rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center py-8 px-4 space-y-2 ${
              isDragOver
                ? 'border-sky-400 bg-sky-500/10 scale-[1.01]'
                : 'border-slate-700 bg-slate-900/60 hover:border-slate-500 hover:bg-slate-900/90'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".geojson,.json"
              className="hidden"
              onChange={handleFileInput}
            />
            <FileJson className={`w-10 h-10 ${isDragOver ? 'text-sky-400' : 'text-slate-500'}`} />
            <div className="text-center">
              <p className={`font-semibold text-sm ${isDragOver ? 'text-sky-300' : 'text-slate-300'}`}>
                {isDragOver ? 'Drop your GeoJSON here' : 'Drag & Drop GeoJSON'}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">or click to browse • .geojson / .json</p>
            </div>
          </div>

          {/* Parsed file result */}
          {parsedFile && (
            <div className={`rounded-xl border p-3 space-y-2 ${
              parsedFile.error
                ? 'border-rose-500/40 bg-rose-950/30'
                : isLoaded
                ? 'border-emerald-500/40 bg-emerald-950/30'
                : 'border-sky-500/30 bg-slate-900/80'
            }`}>
              {/* File row */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2 min-w-0">
                  {parsedFile.error ? (
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  ) : isLoaded ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <FileJson className="w-4 h-4 text-sky-400 shrink-0" />
                  )}
                  <span className="font-mono text-[11px] text-slate-200 truncate">{parsedFile.name}</span>
                </div>
                <button
                  onClick={handleClear}
                  className="text-slate-500 hover:text-rose-400 p-0.5 rounded transition-colors shrink-0 ml-2"
                  title="Clear"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {parsedFile.error ? (
                <p className="text-rose-400 text-[11px] leading-relaxed">{parsedFile.error}</p>
              ) : (
                <div className="space-y-1.5">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                      <div className="text-[9px] text-slate-400 uppercase tracking-wider">Features</div>
                      <div className="text-base font-bold text-sky-300">{parsedFile.featureCount}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                      <div className="text-[9px] text-slate-400 uppercase tracking-wider">Geometry</div>
                      <div className="text-sm font-bold text-slate-200 capitalize">
                        {parsedFile.features[0]?.geometry?.type || '—'}
                      </div>
                    </div>
                  </div>

                  {/* Bounding box */}
                  {bboxSummary && (
                    <div className="flex items-start space-x-1.5 text-[10px] text-slate-400 p-2 rounded bg-slate-950/60 border border-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <div className="font-mono leading-relaxed">
                        <span className="text-slate-300">BBox:</span>{' '}
                        [{bboxSummary.minLon}, {bboxSummary.minLat}] →{' '}
                        [{bboxSummary.maxLon}, {bboxSummary.maxLat}]
                      </div>
                    </div>
                  )}

                  {/* Status message */}
                  {isLoaded && (
                    <div className="text-emerald-400 text-[11px] font-semibold flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Loaded to map! Parcels added as user layer.</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Supported formats note */}
          <p className="text-[10px] text-slate-500 text-center leading-relaxed">
            Supports GeoJSON FeatureCollections with Polygon / MultiPolygon geometry.
            <br />Uploaded parcels appear as a temporary "User Upload" layer.
          </p>
        </div>

        {/* Footer actions */}
        <div className="px-4 py-3 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between space-x-2">
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleLoadToMap}
            disabled={!parsedFile || !!parsedFile.error || parsedFile.featureCount === 0 || isLoaded}
            className="flex-1 py-2 px-4 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-sky-950/50"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>
              {isLoaded
                ? `✓ ${parsedFile?.featureCount} Parcels Loaded`
                : parsedFile?.featureCount
                ? `Load ${parsedFile.featureCount} Feature${parsedFile.featureCount !== 1 ? 's' : ''} to Map`
                : 'Load to Map'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
