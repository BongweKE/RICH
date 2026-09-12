// RICH Frontend API Client
import { Jurisdiction, Parcel, PromptPill } from '../types';

const API_BASE = '/api';

export const api = {
  // Jurisdictions
  async getJurisdictions(): Promise<Jurisdiction[]> {
    try {
      const res = await fetch(`${API_BASE}/geospatial/jurisdictions`);
      if (!res.ok) throw new Error('Failed to fetch jurisdictions');
      const data = await res.json();
      return data.jurisdictions || [];
    } catch (e) {
      console.warn('Using fallback jurisdictions:', e);
      return [
        { id: '1', name: 'Spain (Extremadura Dehesa)', code: 'ES-EX', level: 1, centroid: { type: 'Point', coordinates: [-6.3, 39.2] } },
        { id: '2', name: 'Ghana (Ashanti Cocoa)', code: 'GH-AH', level: 1, centroid: { type: 'Point', coordinates: [-1.6, 6.7] } },
        { id: '3', name: 'Ethiopia (Oromia Coffee)', code: 'ET-OR', level: 1, centroid: { type: 'Point', coordinates: [36.8, 7.7] } },
      ];
    }
  },

  // Parcels Search
  async searchParcels(bbox: number[], jurisdictionCode?: string): Promise<Parcel[]> {
    try {
      const res = await fetch(`${API_BASE}/geospatial/parcels/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bbox, jurisdiction_code: jurisdictionCode, limit: 100 }),
      });
      if (!res.ok) throw new Error('Failed to search parcels');
      const data = await res.json();
      return data.parcels || [];
    } catch (e) {
      console.warn('Using fallback parcels:', e);
      return [];
    }
  },

  // AI Chat & Prompt Pills
  async getPromptPills(jurisdictionCode?: string): Promise<PromptPill[]> {
    try {
      const url = jurisdictionCode
        ? `${API_BASE}/ai/prompt-pills?jurisdiction_code=${encodeURIComponent(jurisdictionCode)}`
        : `${API_BASE}/ai/prompt-pills`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch prompt pills');
      const data = await res.json();
      return data.pills || [];
    } catch (e) {
      return [
        { id: '1', label: '🇪🇺 EUDR Compliance Check', prompt: 'Evaluate EUDR compliance for agroforestry parcels post Dec 31, 2020 cut-off date.', category: 'policy' },
        { id: '2', label: '🌳 Dehesa Agroforestry', prompt: 'Summarize agroforestry parcel coverage and tree canopy density in Extremadura Dehesa.', category: 'geospatial' },
        { id: '3', label: '📊 Pre-QuES Sankey Flux', prompt: 'Explain land use transitions between forest and agroforestry using Pre-QuES matrix analysis.', category: 'lumens' },
        { id: '4', label: '🌿 QUES-C Carbon Stocks', prompt: 'Calculate estimated carbon stock and annual removals for shade cocoa agroforestry.', category: 'carbon' },
      ];
    }
  },

  async sendChatMessage(
    query: string,
    history: Array<{ role: string; content: string }>,
    jurisdictionCode?: string,
    bbox?: number[]
  ) {
    const res = await fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        conversation_history: history,
        jurisdiction_code: jurisdictionCode,
        bbox,
      }),
    });
    if (!res.ok) throw new Error('Chat failed');
    return res.json();
  },

  async submitFeedback(logId: string, rating: number, comment?: string) {
    const res = await fetch(`${API_BASE}/ai/chat/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ log_id: logId, rating, correction_text: comment }),
    });
    return res.json();
  },

  // Policy Checks
  async checkEUDR(parcelId?: string, coordinates?: number[], commodity = 'cocoa') {
    const res = await fetch(`${API_BASE}/policy/eudr-check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        parcel_id: parcelId,
        coordinates,
        commodity,
        store_assessment: false,
      }),
    });
    if (!res.ok) throw new Error('EUDR check failed');
    return res.json();
  },

  async getREDDReport(jurisdictionCode: string) {
    const res = await fetch(`${API_BASE}/policy/redd-report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jurisdiction_code: jurisdictionCode,
        reference_years: [2015, 2020],
        monitoring_year: 2024,
      }),
    });
    if (!res.ok) throw new Error('REDD report failed');
    return res.json();
  },

  // LUMENS Simulation
  async runPreQUES(jurisdictionCode: string, yearT1 = 2018, yearT2 = 2024) {
    const res = await fetch(`${API_BASE}/lumens/analysis/preques`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jurisdiction_code: jurisdictionCode,
        year_t1: yearT1,
        year_t2: yearT2,
        raster_t1_path: `/storage/rasters/${jurisdictionCode}_${yearT1}.tif`,
        raster_t2_path: `/storage/rasters/${jurisdictionCode}_${yearT2}.tif`,
      }),
    });
    return res.json();
  },
};
