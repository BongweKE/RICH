import pytest

from app.services.lumens import LUMENSService


@pytest.mark.asyncio
async def test_run_preques_analysis_unit():
    """Test Pre-QuES land use change, crosstabulation, and Sankey generation"""
    results = await LUMENSService.run_preques_analysis(
        raster_t1_path="/storage/rasters/t1.tif",
        raster_t2_path="/storage/rasters/t2.tif",
        year_t1=2018,
        year_t2=2024,
        area_cutoff=500.0,
    )

    assert "crosstab_long" in results
    assert "crosstab_matrix" in results
    assert "sankey_data" in results
    assert "change_metrics" in results
    assert "statistics" in results

    # Check Sankey nodes & links
    sankey = results["sankey_data"]
    assert len(sankey["nodes"]) > 0
    assert len(sankey["links"]) > 0
    for link in sankey["links"]:
        assert link["value"] > 0
        assert "from_class" in link
        assert "to_class" in link

    # Check statistics
    stats = results["statistics"]
    assert stats["year_t1"] == 2018
    assert stats["year_t2"] == 2024
    assert stats["period_years"] == 6
    assert stats["total_landscape_ha"] > 0
    assert len(stats["major_transitions"]) > 0


@pytest.mark.asyncio
async def test_run_ques_carbon_unit():
    """Test QUES-C carbon stocks and greenhouse gas emissions calculations"""
    carbon_results = await LUMENSService.run_ques_carbon(
        base_scenario_id="scenario-test-123",
        biomass_data_path="/storage/biomass/agb.tif",
    )

    assert carbon_results["scenario_id"] == "scenario-test-123"
    assert "total_carbon_stock_t1_tc" in carbon_results
    assert "net_climate_impact_tco2e" in carbon_results
    assert "gross_emissions_tco2e" in carbon_results
    assert "gross_removals_tco2e" in carbon_results
    assert carbon_results["tier_level"] == "Tier 2"


@pytest.mark.asyncio
async def test_run_ques_biodiversity_unit():
    """Test QUES-B biodiversity and landscape connectivity assessment"""
    bio_results = await LUMENSService.run_ques_biodiversity(
        base_scenario_id="scenario-test-123",
        species_data_path="/storage/species/occurrences.csv",
    )

    assert bio_results["scenario_id"] == "scenario-test-123"
    assert bio_results["species_richness_index"] > 0.0
    assert bio_results["habitat_quality_score"] > 0.0
    assert "keystone_species_impact" in bio_results


@pytest.mark.asyncio
async def test_run_scenario_simulation_unit():
    """Test multi-benefit scenario simulation"""
    sim_results = await LUMENSService.run_scenario_simulation(
        scenario_id="sim-456",
        intervention_layers=[
            {"type": "shade_enrichment", "area_ha": 300.0},
            {"type": "corridor_restoration", "area_ha": 150.0},
        ],
    )

    assert sim_results["scenario_id"] == "sim-456"
    assert sim_results["total_area_changed_ha"] == 450.0
    assert len(sim_results["parcel_results"]) == 2
    assert "total_carbon_benefit_tco2e_yr" in sim_results["summary"]


@pytest.mark.asyncio
async def test_get_lumens_status_invalid_scenario_id(async_client):
    """Test get analysis status with non-UUID returns 404 cleanly"""
    response = await async_client.get("/api/lumens/analysis/not-a-valid-uuid/status")
    assert response.status_code == 404
