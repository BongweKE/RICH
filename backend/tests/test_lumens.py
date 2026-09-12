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


@pytest.mark.asyncio
async def test_pontius_decomposition_unit():
    """Test Pontius land cover transition matrix decomposition"""
    matrix_data = {
        "forest": {"forest": 20000.0, "cropland": 500.0, "agroforestry": 1500.0},
        "cropland": {"forest": 100.0, "cropland": 8000.0, "agroforestry": 1900.0},
        "agroforestry": {"forest": 200.0, "cropland": 100.0, "agroforestry": 9700.0},
    }
    pontius = LUMENSService.calculate_pontius_decomposition(matrix_data, 42000.0)
    assert "quantity_disagreement_ha" in pontius
    assert "allocation_disagreement_ha" in pontius
    assert "total_change_ha" in pontius
    assert pontius["total_change_ha"] == pontius["quantity_disagreement_ha"] + pontius["allocation_disagreement_ha"]


@pytest.mark.asyncio
async def test_ques_hydrology_unit():
    """Test RUSLE hydrology and soil erosion model"""
    hydro = await LUMENSService.run_ques_hydrology(
        jurisdiction_code="GH-AH",
        total_landscape_ha=50000.0,
        agroforestry_ha=10200.0,
        forest_ha=21200.0,
        cropland_ha=10100.0,
        annual_rainfall_mm=1350.0,
    )
    assert hydro["jurisdiction_code"] == "GH-AH"
    assert hydro["mean_soil_loss_t_ha_yr"] > 0
    assert hydro["avoided_erosion_tons_yr"] > 0
    assert hydro["sediment_retention_pct"] > 50


@pytest.mark.asyncio
async def test_ta_profitability_unit():
    """Test TA-profit economics and opportunity cost abatement curve"""
    profit = await LUMENSService.run_ta_profitability(jurisdiction_code="GH-AH")
    assert len(profit["systems"]) == 3
    assert profit["systems"][0]["npv_20yr_usd_ha"] > profit["systems"][1]["npv_20yr_usd_ha"]
    assert len(profit["abatement_curve"]) > 0


@pytest.mark.asyncio
async def test_lasem_tradeoff_unit():
    """Test LASEM 5-axis trade-off radar calculations"""
    lasem = await LUMENSService.run_lasem_tradeoff(
        jurisdiction_code="GH-AH",
        agroforestry_expansion_pct=30.0,
    )
    assert len(lasem["axes"]) == 5
    assert len(lasem["scenarios"]) == 3
    for s in lasem["scenarios"]:
        assert all(0.0 <= v <= 1.0 for v in s["metrics"].values())


@pytest.mark.asyncio
async def test_interactive_lumens_endpoints(async_client):
    """Test instant interactive Pre-QuES and Carbon endpoints"""
    preques_resp = await async_client.post(
        "/api/lumens/interactive-preques",
        json={"jurisdiction_code": "GH-AH", "year_t1": 2018, "year_t2": 2024, "area_cutoff": 50.0},
    )
    assert preques_resp.status_code == 200
    preques_data = preques_resp.json()
    assert "sankey_data" in preques_data
    assert "pontius" in preques_data["statistics"]

    carbon_resp = await async_client.post(
        "/api/lumens/interactive-carbon",
        json={"jurisdiction_code": "GH-AH"},
    )
    assert carbon_resp.status_code == 200
    carbon_data = carbon_resp.json()
    assert "voluntary_carbon_credits_potential_usd" in carbon_data

