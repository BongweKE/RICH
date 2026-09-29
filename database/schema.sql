-- RICH Database Schema
-- PostgreSQL + PostGIS + pgvector
-- Version: 0.1.0

-- =============================================================================
-- EXTENSIONS
-- =============================================================================

-- Enable PostGIS for geospatial operations
CREATE EXTENSION IF NOT EXISTS postgis;

-- Enable pgvector for vector similarity search
CREATE EXTENSION IF NOT EXISTS vector;

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- ENUMS
-- =============================================================================

-- Land cover class types
CREATE TYPE land_cover_class AS ENUM (
    'agroforestry',
    'forest',
    'cropland',
    'grassland',
    'settlement',
    'water',
    'bare_soil',
    'wetland',
    'other'
);

-- Agroforestry sub-types
CREATE TYPE agroforestry_subtype AS ENUM (
    'dehesa',           -- Spain/Portugal oak + pasture
    'montado',          -- Portugal cork oak + crops
    'silvopasture',     -- General trees + pasture
    'shade_coffee',     -- Coffee under shade trees
    'shade_cocoa',      -- Cocoa under shade trees
    'alley_cropping',   -- Trees in rows between crops
    'parkland',         -- Scattered trees in cropland
    'homegarden',       -- Multi-species around homestead
    'forest_farming',   -- Non-timber forest products
    'woodlot',          -- Small forest patches
    'other'
);

-- Validation status
CREATE TYPE validation_status AS ENUM (
    'unvalidated',
    'ai_reviewed',
    'expert_reviewed',
    'community_validated',
    'final'
);

-- Analysis status
CREATE TYPE analysis_status AS ENUM (
    'pending',
    'processing',
    'completed',
    'failed',
    'cancelled'
);

-- Scenario types
CREATE TYPE scenario_type AS ENUM (
    'baseline',
    'conservation',
    'intensification',
    'restoration',
    'deforestation',
    'custom'
);

-- =============================================================================
-- CORE TABLES
-- =============================================================================

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255),
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'guest' CHECK (role IN ('guest', 'researcher', 'policy_maker', 'admin')),
    organization VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User sessions
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- GEOSPATIAL DATA TABLES
-- =============================================================================

-- Jurisdictions (countries, regions, provinces)
CREATE TABLE jurisdictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    level INTEGER NOT NULL,  -- 0=country, 1=region/province, 2=district
    parent_id UUID REFERENCES jurisdictions(id) ON DELETE CASCADE,
    geometry GEOMETRY(POLYGON, 4326),
    centroid GEOMETRY(POINT, 4326),
    area_km2 FLOAT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create spatial index on jurisdictions
CREATE INDEX idx_jurisdictions_geometry ON jurisdictions USING GIST(geometry);

-- Land cover reference points (for model training and validation)
CREATE TABLE land_cover_reference_points (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    jurisdiction_id UUID REFERENCES jurisdictions(id) ON DELETE SET NULL,
    geometry GEOMETRY(POINT, 4326) NOT NULL,
    class_label land_cover_class NOT NULL,
    agroforestry_subtype agroforestry_subtype,
    validation_status validation_status DEFAULT 'unvalidated',
    validator_id UUID REFERENCES users(id) ON DELETE SET NULL,
    validation_date TIMESTAMP WITH TIME ZONE,
    quality_score FLOAT CHECK (quality_score BETWEEN 0 AND 1),
    -- Provenance: no output without provenance
    data_origin VARCHAR(30),
    generation_method VARCHAR(255),
    source VARCHAR(255),
    source_url VARCHAR(512),
    -- AlphaEarth embedding (64-dim)
    geospatial_embedding vector(64),
    -- Document embedding (384-dim from bge-small)
    document_embedding vector(384),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Spatial index for reference points
CREATE INDEX idx_reference_points_geometry ON land_cover_reference_points USING GIST(geometry);

-- HNSW index for geospatial embeddings
CREATE INDEX idx_reference_points_geospatial_embedding 
    ON land_cover_reference_points USING hnsw (geospatial_embedding vector_cosine_ops);

-- HNSW index for document embeddings
CREATE INDEX idx_reference_points_document_embedding 
    ON land_cover_reference_points USING hnsw (document_embedding vector_cosine_ops);

-- Agroforestry parcels (classified areas)
CREATE TABLE agroforestry_parcels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    jurisdiction_id UUID REFERENCES jurisdictions(id) ON DELETE SET NULL,
    geometry GEOMETRY(POLYGON, 4326) NOT NULL,
    class_label land_cover_class NOT NULL,
    agroforestry_subtype agroforestry_subtype,
    confidence_score FLOAT CHECK (confidence_score BETWEEN 0 AND 1),
    area_ha FLOAT,
    uncertainty FLOAT,
    -- Vector embeddings for similarity search
    geospatial_embedding vector(64),
    -- Source information
    source VARCHAR(255),
    source_year INTEGER,
    source_url VARCHAR(512),
    -- Provenance: no output without provenance
    data_origin VARCHAR(30),
    generation_method VARCHAR(255),
    -- Processing metadata
    processing_method VARCHAR(255),
    model_version VARCHAR(50),
    -- Planner validation audit trail (ADR 0003)
    validation_status VARCHAR(50) NOT NULL DEFAULT 'unvalidated',
    validator_id UUID REFERENCES users(id) ON DELETE SET NULL,
    validation_date TIMESTAMP WITH TIME ZONE,
    validation_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Spatial index for parcels
CREATE INDEX idx_parcels_geometry ON agroforestry_parcels USING GIST(geometry);

-- HNSW index for parcel embeddings
CREATE INDEX idx_parcels_geospatial_embedding 
    ON agroforestry_parcels USING hnsw (geospatial_embedding vector_cosine_ops);

-- Satellite imagery metadata
CREATE TABLE satellite_imagery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    jurisdiction_id UUID REFERENCES jurisdictions(id) ON DELETE SET NULL,
    sensor VARCHAR(50) NOT NULL,  -- sentinel-2, sentinel-1, landsat-8, etc.
    product_id VARCHAR(255) UNIQUE NOT NULL,
    date_acquired DATE NOT NULL,
    cloud_cover FLOAT,
    -- Storage information
    storage_path VARCHAR(512),  -- Path in object storage
    storage_size_bytes BIGINT,
    -- Coverage
    bbox GEOMETRY(POLYGON, 4326),
    footprint GEOMETRY(POLYGON, 4326),
    -- Processing
    processed BOOLEAN DEFAULT false,
    processing_status VARCHAR(50),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Spatial index for imagery
CREATE INDEX idx_satellite_imagery_bbox ON satellite_imagery USING GIST(bbox);

-- =============================================================================
-- LUMENS ANALYSIS TABLES
-- =============================================================================

-- Scenarios
CREATE TABLE scenarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    jurisdiction_id UUID REFERENCES jurisdictions(id) ON DELETE SET NULL,
    scenario_type scenario_type DEFAULT 'custom',
    parameters JSONB NOT NULL,  -- Input parameters for the scenario
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    status analysis_status DEFAULT 'pending',
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    results_summary JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scenario results (per-parcel or aggregated)
CREATE TABLE scenario_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scenario_id UUID REFERENCES scenarios(id) ON DELETE CASCADE NOT NULL,
    parcel_id UUID REFERENCES agroforestry_parcels(id) ON DELETE SET NULL,
    jurisdiction_id UUID REFERENCES jurisdictions(id) ON DELETE SET NULL,
    -- Results data
    land_cover_change JSONB,  -- Transition matrix, etc.
    carbon_metrics JSONB,     -- Carbon stocks, emissions, etc.
    biodiversity_metrics JSONB,
    economic_metrics JSONB,
    uncertainty JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pre-QuES analysis results
CREATE TABLE preques_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scenario_id UUID REFERENCES scenarios(id) ON DELETE CASCADE,
    -- Input rasters
    raster_t1_path VARCHAR(512),
    raster_t2_path VARCHAR(512),
    year_t1 INTEGER,
    year_t2 INTEGER,
    -- Results
    crosstab_long JSONB NOT NULL,
    crosstab_matrix JSONB,
    sankey_data JSONB,
    change_metrics JSONB,
    statistics JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- AI/RAG TABLES (from acAIcia pattern)
-- =============================================================================

-- Documents catalog
CREATE TABLE documents_catalog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    authors TEXT[],
    publication_year INTEGER,
    topic_keywords TEXT[],
    url_link TEXT,
    doi TEXT,
    source VARCHAR(255),
    license VARCHAR(100),
    jurisdiction_ids UUID[],  -- Array of relevant jurisdictions
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Document embeddings
CREATE TABLE document_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID REFERENCES documents_catalog(id) ON DELETE CASCADE NOT NULL,
    chunk_text TEXT NOT NULL,
    chunk_index INTEGER NOT NULL,
    -- BGE small embedding (384-dim)
    embedding vector(384) NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- HNSW index for document embeddings
CREATE INDEX idx_document_embeddings 
    ON document_embeddings USING hnsw (embedding vector_cosine_ops);

-- Query interaction logs (for evaluation and debugging)
CREATE TABLE query_interaction_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(255),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    original_query TEXT NOT NULL,
    -- Processing
    guardian_passed BOOLEAN,
    guardian_reason TEXT,
    architect_query TEXT,
    retrieved_doc_ids UUID[],
    retrieved_parcel_ids UUID[],
    synthesis_source TEXT,
    -- Results
    response_text TEXT,
    sources JSONB,
    citations JSONB,
    -- Metrics
    total_tokens_used INTEGER,
    latency_ms INTEGER,
    cache_hit BOOLEAN DEFAULT false,
    -- Evaluation
    rating INTEGER,  -- -1 (downvote), 0 (none), 1 (upvote)
    feedback_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ingestion logs
CREATE TABLE ingestion_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data_type VARCHAR(50) NOT NULL,  -- satellite, reference, document, etc.
    source VARCHAR(255) NOT NULL,
    filename VARCHAR(255),
    record_count INTEGER,
    success_count INTEGER,
    failure_count INTEGER DEFAULT 0,
    status VARCHAR(50) NOT NULL,  -- pending, processing, completed, failed
    error_message TEXT,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- POLICY TOOLS TABLES
-- =============================================================================

-- Policy frameworks (EUDR, REDD+, NDCs)
CREATE TABLE policy_frameworks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    jurisdiction_ids UUID[],  -- Applicable jurisdictions
    requirements JSONB,  -- Framework requirements
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Policy compliance assessments
CREATE TABLE policy_compliance_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    framework_id UUID REFERENCES policy_frameworks(id) ON DELETE CASCADE NOT NULL,
    scenario_id UUID REFERENCES scenarios(id) ON DELETE SET NULL,
    parcel_id UUID REFERENCES agroforestry_parcels(id) ON DELETE SET NULL,
    jurisdiction_id UUID REFERENCES jurisdictions(id) ON DELETE SET NULL,
    -- Assessment results
    compliance_status BOOLEAN,
    compliance_score FLOAT CHECK (compliance_score BETWEEN 0 AND 1),
    gaps JSONB,  -- Areas of non-compliance
    recommendations JSONB,
    report_json JSONB,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- USER FEEDBACK AND EVALUATION
-- =============================================================================

-- User feedback on AI responses
CREATE TABLE ai_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_log_id UUID REFERENCES query_interaction_logs(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN -1 AND 1),
    correction_text TEXT,
    feedback_type VARCHAR(50),  -- accuracy, relevance, completeness, etc.
    resolved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Model evaluation runs
CREATE TABLE model_evaluation_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_name VARCHAR(255) NOT NULL,
    dataset VARCHAR(255) NOT NULL,
    metrics JSONB NOT NULL,  -- accuracy, precision, recall, f1, etc.
    configuration JSONB,
    results_summary TEXT,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- SUPPORTING TABLES
-- =============================================================================

-- Data sources catalog
CREATE TABLE data_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    source_type VARCHAR(50) NOT NULL,  -- satellite, vector, raster, document
    url TEXT,
    license VARCHAR(100),
    attribution TEXT,
    temporal_coverage TSTZRANGE,
    spatial_coverage GEOMETRY(POLYGON, 4326),
    update_frequency VARCHAR(50),
    access_method VARCHAR(50),  -- api, download, stream
    is_active BOOLEAN DEFAULT true,
    last_updated TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API keys (for external services)
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_name VARCHAR(255) NOT NULL,
    key_name VARCHAR(255) NOT NULL,
    key_value TEXT NOT NULL,  -- Encrypted in production
    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- FUNCTIONS
-- =============================================================================

-- Function to match documents by similarity
CREATE OR REPLACE FUNCTION match_documents(
    query_embedding vector(384),
    match_threshold float DEFAULT 0.6,
    match_count int DEFAULT 5
)
RETURNS TABLE (
    id UUID,
    document_id UUID,
    chunk_text TEXT,
    title TEXT,
    authors TEXT[],
    similarity FLOAT
)
LANGUAGE sql STABLE
AS $$
    SELECT
        e.id,
        e.document_id,
        e.chunk_text,
        c.title,
        c.authors,
        1 - (e.embedding <=> query_embedding) as similarity
    FROM document_embeddings e
    JOIN documents_catalog c ON e.document_id = c.id
    WHERE 1 - (e.embedding <=> query_embedding) > match_threshold
    ORDER BY e.embedding <=> query_embedding
    LIMIT match_count;
$$;

-- Function to match land cover reference points by geospatial similarity
CREATE OR REPLACE FUNCTION match_reference_points(
    query_embedding vector(64),
    match_threshold float DEFAULT 0.7,
    match_count int DEFAULT 10
)
RETURNS TABLE (
    id UUID,
    geometry GEOMETRY(POINT, 4326),
    class_label land_cover_class,
    agroforestry_subtype agroforestry_subtype,
    similarity FLOAT
)
LANGUAGE sql STABLE
AS $$
    SELECT
        id,
        geometry,
        class_label,
        agroforestry_subtype,
        1 - (geospatial_embedding <=> query_embedding) as similarity
    FROM land_cover_reference_points
    WHERE geospatial_embedding IS NOT NULL
    AND 1 - (geospatial_embedding <=> query_embedding) > match_threshold
    ORDER BY geospatial_embedding <=> query_embedding
    LIMIT match_count;
$$;

-- Function to search parcels by bounding box
CREATE OR REPLACE FUNCTION search_parcels_by_bbox(
    bbox GEOMETRY(POLYGON, 4326),
    class_filter land_cover_class[] DEFAULT NULL,
    min_confidence float DEFAULT 0.5,
    limit_count int DEFAULT 100
)
RETURNS TABLE (
    id UUID,
    jurisdiction_id UUID,
    geometry GEOMETRY(POLYGON, 4326),
    class_label land_cover_class,
    agroforestry_subtype agroforestry_subtype,
    confidence_score FLOAT,
    area_ha FLOAT
)
LANGUAGE sql STABLE
AS $$
    SELECT
        id,
        jurisdiction_id,
        geometry,
        class_label,
        agroforestry_subtype,
        confidence_score,
        area_ha
    FROM agroforestry_parcels
    WHERE ST_Intersects(geometry, bbox)
    AND (class_filter IS NULL OR class_label = ANY(class_filter))
    AND confidence_score >= min_confidence
    ORDER BY confidence_score DESC, area_ha DESC
    LIMIT limit_count;
$$;

-- Function to calculate land use change statistics
CREATE OR REPLACE FUNCTION calculate_land_use_change(
    jurisdiction_id UUID,
    start_date DATE,
    end_date DATE
)
RETURNS TABLE (
    class_from land_cover_class,
    class_to land_cover_class,
    area_ha FLOAT,
    percentage FLOAT
)
LANGUAGE sql STABLE
AS $$
    -- This would be implemented based on actual temporal data
    -- Placeholder for the function signature
    SELECT NULL::land_cover_class as class_from,
           NULL::land_cover_class as class_to,
           NULL::FLOAT as area_ha,
           NULL::FLOAT as percentage
    WHERE 1=0;  -- Empty result placeholder
$$;

-- =============================================================================
-- TRIGGERS
-- =============================================================================

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to tables that need it
CREATE TRIGGER trigger_update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_update_land_cover_reference_points_updated_at
    BEFORE UPDATE ON land_cover_reference_points
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_update_agroforestry_parcels_updated_at
    BEFORE UPDATE ON agroforestry_parcels
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_update_scenarios_updated_at
    BEFORE UPDATE ON scenarios
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- =============================================================================
-- INDEXES ON JSONB COLUMNS (for faster queries)
-- =============================================================================

-- GIN indexes for JSONB columns
CREATE INDEX idx_scenarios_parameters ON scenarios USING gin(parameters);
CREATE INDEX idx_scenarios_results_summary ON scenarios USING gin(results_summary);

CREATE INDEX idx_scenario_results_land_cover_change ON scenario_results USING gin(land_cover_change);
CREATE INDEX idx_scenario_results_carbon_metrics ON scenario_results USING gin(carbon_metrics);

CREATE INDEX idx_preques_crosstab ON preques_results USING gin(crosstab_long);

-- =============================================================================
-- COMMENTS
-- =============================================================================

COMMENT ON TABLE land_cover_reference_points IS 'Ground truth data points for model training and validation. Each point represents a known land cover class.';
COMMENT ON TABLE agroforestry_parcels IS 'Classified agroforestry parcels with confidence scores and metadata.';
COMMENT ON TABLE satellite_imagery IS 'Metadata for satellite imagery used in analysis.';
COMMENT ON TABLE scenarios IS 'Land use scenario definitions and configurations.';
COMMENT ON TABLE scenario_results IS 'Results from running LUMENS analysis on scenarios.';
COMMENT ON TABLE documents_catalog IS 'Catalog of research documents for RAG retrieval.';
COMMENT ON TABLE document_embeddings IS 'Vector embeddings of document chunks for similarity search.';
COMMENT ON TABLE query_interaction_logs IS 'Logs of all AI queries and interactions for debugging and evaluation.';

-- =============================================================================
-- INITIAL DATA (Optional)
-- =============================================================================

-- Insert basic land cover classes if needed
-- INSERT INTO ... VALUES ...;
