export interface Jurisdiction {
  id: string;
  name: string;
  code: string;
  level: number;
  parent_code?: string | null;
  area_km2?: number | null;
  centroid?: {
    type: string;
    coordinates: [number, number];
  } | null;
  geometry?: any;
}

export interface Parcel {
  id: string;
  jurisdiction_code?: string;
  geometry: {
    type: string;
    coordinates: any;
  };
  class_label: string;
  agroforestry_subtype?: string | null;
  confidence_score: number;
  area_ha?: number | null;
  uncertainty?: number | null;
  source?: string | null;
  source_year?: number | null;
}

export interface PromptPill {
  id: string;
  label: string;
  prompt: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: Array<{
    id: string;
    title: string;
    type: string;
    subtype?: string;
    area_ha?: number;
    confidence?: number;
    doi?: string;
  }>;
  sources?: Array<{
    type: string;
    name?: string;
    code?: string;
  }>;
  rating?: number;
}

export interface LayerState {
  agroforestryParcels: boolean;
  referencePoints: boolean;
  eudrDeforestationBaseline: boolean;
  canopyDensity: boolean;
  satelliteBasemap: boolean;
}
