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
    parcel_id?: string;
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

export type SensorMode = 'normal' | 'nvg' | 'flir' | 'crt' | 'noir';

export interface NDVIHistoryPoint {
  year: number;
  month: number;
  ndvi: number;
  evi?: number;
  nirv?: number;
  sensor?: string;
  is_eudr_cutoff?: boolean;
}

export interface CanopyStrata {
  overstory_native_trees_pct: number;
  midstory_crop_canopy_pct: number;
  understory_ground_cover_pct: number;
  total_canopy_cover_pct: number;
  dominant_tree_species: string[];
}

export interface GEDIProfile {
  relative_height_98m: number;
  canopy_top_height_m: number;
  foliage_height_diversity: number;
  plant_area_index: number;
  shot_number: string;
}

export interface CarbonPools {
  above_ground_biomass_tc_ha: number;
  below_ground_biomass_tc_ha: number;
  soil_organic_carbon_tc_ha: number;
  dead_wood_litter_tc_ha: number;
  total_carbon_stock_tc_ha: number;
  annual_sequestration_tco2e_ha_yr: number;
}

export interface SoilClimate {
  soil_organic_carbon_g_kg: number;
  soil_ph: number;
  soil_texture_class: string;
  mean_annual_precipitation_mm: number;
  mean_annual_temperature_c: number;
}

export interface EUDRAudit {
  reference_id: string;
  cutoff_date: string;
  forest_loss_post_cutoff: boolean;
  degradation_detected: boolean;
  jrc_forest_baseline_intersection_pct?: number;
  compliance_status: string;
  risk_level: string;
  audit_timestamp: string;
  issuing_authority: string;
  legal_notice: string;
}

export interface ParcelTelemetry {
  parcel_id: string;
  subtype: string;
  area_ha: number;
  confidence_score: number;
  source_year: number;
  ndvi_history: NDVIHistoryPoint[];
  canopy_strata: CanopyStrata;
  gedi_profile: GEDIProfile;
  carbon_pools: CarbonPools;
  soil_climate: SoilClimate;
  eudr_audit: EUDRAudit;
}

export interface SankeyNode {
  name: string;
  category?: string;
}

export interface SankeyLink {
  source: number;
  target: number;
  value: number;
  from_class?: string;
  to_class?: string;
}

export interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

export interface PontiusMetrics {
  quantity_disagreement_ha: number;
  allocation_disagreement_ha: number;
  total_change_ha: number;
  quantity_pct: number;
  allocation_pct: number;
}

export interface PreQuESResponse {
  jurisdiction_code?: string;
  crosstab_long: Array<{ from_class: string; to_class: string; area_ha: number; percentage: number }>;
  crosstab_matrix: Record<string, Record<string, number>>;
  sankey_data: SankeyData;
  change_metrics: Record<string, any>;
  statistics: {
    year_t1: number;
    year_t2: number;
    period_years: number;
    total_landscape_ha: number;
    total_changed_ha: number;
    pct_landscape_changed: number;
    major_transitions: Array<{ from: string; to: string; area_ha: number; annual_rate_ha_yr: number }>;
    pontius?: PontiusMetrics;
  };
}

export interface CarbonResponse {
  jurisdiction_code?: string;
  scenario_id: string;
  total_carbon_stock_t1_tc: number;
  total_carbon_stock_t2_tc: number;
  net_carbon_stock_change_tc: number;
  net_climate_impact_tco2e: number;
  gross_emissions_tco2e: number;
  gross_removals_tco2e: number;
  carbon_density_by_class: Record<string, number>;
  voluntary_carbon_credits_potential_usd?: number;
  tier_level: string;
}

export interface LASEMAxis {
  key: string;
  label: string;
  unit: string;
}

export interface LASEMScenario {
  id: string;
  name: string;
  color: string;
  metrics: Record<string, number>;
  net_carbon_mtco2e: number;
  forest_cover_pct: number;
}

export interface LASEMTradeoffResponse {
  jurisdiction_code: string;
  axes: LASEMAxis[];
  scenarios: LASEMScenario[];
  levers: {
    agroforestry_expansion_pct: number;
    deforestation_enforcement_pct: number;
    riparian_restoration_pct: number;
  };
}

export interface HydrologyResponse {
  jurisdiction_code: string;
  annual_rainfall_mm: number;
  mean_soil_loss_t_ha_yr: number;
  total_soil_loss_tons_yr: number;
  avoided_erosion_tons_yr: number;
  sediment_retention_pct: number;
  watershed_vulnerability_index: string;
  riparian_buffer_integrity: number;
  streamflow_regulation_score: number;
}

export interface BiodiversityResponse {
  scenario_id: string;
  jurisdiction_code: string;
  species_richness_index: number;
  habitat_quality_score: number;
  landscape_connectivity_index: number;
  fragmentation_index: number;
  keystone_species_impact: Record<string, { score: number; trend: string }>;
  mspa_corridors: {
    core_pct: number;
    bridge_pct: number;
    edge_buffer_pct: number;
    islet_pct: number;
  };
  agroforestry_biodiversity_benefit: string;
}

export interface ProfitabilitySystem {
  system: string;
  type: string;
  annual_gross_revenue_usd_ha: number;
  annual_production_cost_usd_ha: number;
  annual_net_profit_usd_ha: number;
  npv_20yr_usd_ha: number;
  labor_days_ha_yr: number;
  carbon_stock_tc_ha: number;
  carbon_credit_yield_usd_ha_yr: number;
}

export interface AbatementPoint {
  tier: string;
  opp_cost_usd_tco2e: number;
  cumulative_potential_mtco2e: number;
}

export interface ProfitabilityResponse {
  jurisdiction_code: string;
  systems: ProfitabilitySystem[];
  opportunity_cost_forest_to_monoculture_usd_tco2e: number;
  opportunity_cost_agroforestry_to_monoculture_usd_tco2e: number;
  abatement_curve: AbatementPoint[];
  key_finding: string;
}

export interface TourWaypoint {
  id: string;
  title: string;
  subtitle: string;
  center: [number, number];
  zoom: number;
  pitch: number;
  bearing: number;
  badge: string;
  description: string;
}

export interface LayerState {
  agroforestryParcels: boolean;
  referencePoints: boolean;
  eudrDeforestationBaseline: boolean;
  canopyDensity: boolean;
  satelliteBasemap: boolean;
  carbonDensityHeatmap?: boolean;
}

export interface LayerOpacityState {
  agroforestryParcels: number;
  referencePoints: number;
  eudrDeforestationBaseline: number;
  canopyDensity: number;
  satelliteBasemap: number;
  carbonDensityHeatmap?: number;
}

