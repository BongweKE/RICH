# RICH Backend - LUMENS Analysis API Endpoints
# Pre-QuES, QUES-C, QUES-B, Scenario Analysis

import uuid
from datetime import datetime
from typing import Any

from fastapi import APIRouter, BackgroundTasks, Body, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db_session
from app.core.security import get_current_user, require_permission
from app.models import (
    Jurisdiction,
    PreQuESResult,
    Scenario,
    ScenarioResult,
)
from app.services.lumens import (
    LUMENSService,
    run_lasem_tradeoff,
    run_preques_analysis,
    run_ques_biodiversity,
    run_ques_carbon,
    run_ques_hydrology,
    run_scenario_simulation,
    run_ta_profitability,
)

router = APIRouter()


def safe_uuid(val: Any) -> uuid.UUID | None:
    """Safely parse UUID without raising ValueError"""
    if not val:
        return None
    if isinstance(val, uuid.UUID):
        return val
    try:
        return uuid.UUID(str(val))
    except (ValueError, TypeError, AttributeError):
        return None


@router.post("/interactive-preques")
async def interactive_preques(
    jurisdiction_code: str = Body("GH-AH", description="Jurisdiction code"),
    year_t1: int = Body(2018, description="Start year"),
    year_t2: int = Body(2024, description="End year"),
    area_cutoff: float = Body(100.0, description="Area cutoff for Sankey (ha)"),
    change_only: bool = Body(False, description="Exclude persistence in Sankey"),
):
    """DEMO (illustrative): synchronous Pre-QuES-style visualization on a
    synthetic landscape. No real rasters are analyzed; outputs are generated
    from a fixed illustrative baseline and must not be used for decisions."""
    result = await run_preques_analysis(
        raster_t1_path="",
        raster_t2_path="",
        year_t1=year_t1,
        year_t2=year_t2,
        area_cutoff=area_cutoff,
        change_only=change_only,
    )
    result["jurisdiction_code"] = jurisdiction_code
    result["mode"] = "illustrative_demo"
    result["disclaimer"] = (
        "Synthetic demonstration output on an illustrative landscape. "
        "Not computed from real satellite data; do not use for policy, "
        "compliance, or finance decisions."
    )
    return result


@router.post("/interactive-carbon")
async def interactive_carbon(
    jurisdiction_code: str = Body("GH-AH", description="Jurisdiction code"),
    carbon_factors: dict[str, float] | None = Body(None, description="Custom class carbon density in tC/ha"),
):
    """DEMO (illustrative): QUES-C-style carbon visualization on a synthetic
    landscape. No real biomass data is analyzed; outputs are illustrative."""
    result = await run_ques_carbon(
        base_scenario_id="interactive-session",
        biomass_data_path="",
        carbon_density_path=None,
        emission_factors=carbon_factors,
    )
    result["jurisdiction_code"] = jurisdiction_code
    result["mode"] = "illustrative_demo"
    result["disclaimer"] = (
        "Synthetic demonstration output. Carbon figures are illustrative "
        "defaults, not measured stocks; do not use for carbon finance decisions."
    )
    # Add voluntary carbon credit market valuation (~$12 / tCO2e for agroforestry removals)
    removals = result.get("gross_removals_tco2e", 0.0)
    result["voluntary_carbon_credits_potential_usd"] = round(removals * 12.0, 2)
    return result


@router.post("/interactive-tradeoff")
async def interactive_tradeoff(
    jurisdiction_code: str = Body("GH-AH", description="Jurisdiction code"),
    agroforestry_expansion_pct: float = Body(25.0, description="Target agroforestry expansion %"),
    deforestation_enforcement_pct: float = Body(90.0, description="Deforestation enforcement rate %"),
    riparian_restoration_pct: float = Body(75.0, description="Riparian buffer restoration %"),
):
    """DEMO (illustrative): 5-axis scenario tradeoff visualization on a
    synthetic landscape (Carbon, Biodiversity, Hydrology, NPV, Social Equity)."""
    result = await run_lasem_tradeoff(
        jurisdiction_code=jurisdiction_code,
        agroforestry_expansion_pct=agroforestry_expansion_pct,
        deforestation_enforcement_pct=deforestation_enforcement_pct,
        riparian_restoration_pct=riparian_restoration_pct,
    )
    result["mode"] = "illustrative_demo"
    result["disclaimer"] = (
        "Synthetic demonstration output; scenario metrics are illustrative " "and not derived from real land-use data."
    )
    return result


@router.get("/hydrology")
async def get_hydrology_analysis(
    jurisdiction_code: str = Query("GH-AH", description="Jurisdiction code"),
    annual_rainfall_mm: float = Query(1350.0, description="Annual rainfall mm"),
):
    """QUES-H: Hydrological and RUSLE soil erosion assessment"""
    return await run_ques_hydrology(
        jurisdiction_code=jurisdiction_code,
        annual_rainfall_mm=annual_rainfall_mm,
    )


@router.get("/biodiversity")
async def get_biodiversity_analysis(
    jurisdiction_code: str = Query("GH-AH", description="Jurisdiction code"),
):
    """QUES-B: Instant biodiversity, habitat quality index, and MSPA corridor analysis"""
    return await run_ques_biodiversity(
        base_scenario_id="interactive-session",
        species_data_path="",
        habitat_suitability_path=None,
        jurisdiction_code=jurisdiction_code,
    )


@router.get("/profitability")
async def get_profitability_analysis(
    jurisdiction_code: str = Query("GH-AH", description="Jurisdiction code"),
    crop_subtype: str = Query("shade_cocoa", description="Agroforestry subtype"),
):
    """TA-Profit: Economic profitability, NPV, and Opportunity Cost Curve for REDD+"""
    return await run_ta_profitability(
        jurisdiction_code=jurisdiction_code,
        agroforestry_subtype=crop_subtype,
    )


@router.post("/analysis/preques")
async def create_preques_analysis(
    background_tasks: BackgroundTasks,
    raster_t1_path: str = Body(..., description="Path to T1 land cover raster"),
    raster_t2_path: str = Body(..., description="Path to T2 land cover raster"),
    year_t1: int = Body(..., description="Year of first raster"),
    year_t2: int = Body(..., description="Year of second raster"),
    jurisdiction_code: str = Body(..., description="Jurisdiction code"),
    lookup_table: str | None = Body(None, description="Path to lookup table"),
    area_cutoff: float = Body(10000, description="Area cutoff for Sankey (ha)"),
    change_only: bool = Body(False, description="Only show changes in Sankey"),
    db: AsyncSession = Depends(get_db_session),
    user: dict = Depends(get_current_user),
):
    """Create and run Pre-QuES land use change analysis"""

    # Verify jurisdiction
    stmt = select(Jurisdiction).where(Jurisdiction.code == jurisdiction_code)
    result = await db.execute(stmt)
    jurisdiction = result.scalar_one_or_none()

    if not jurisdiction:
        raise HTTPException(status_code=404, detail="Jurisdiction not found")

    # Create scenario record
    scenario = Scenario(
        name=f"Pre-QuES {jurisdiction.name} {year_t1}-{year_t2}",
        description=f"Land use change analysis from {year_t1} to {year_t2}",
        jurisdiction_id=jurisdiction.id,
        scenario_type="baseline",
        parameters={
            "analysis_type": "preques",
            "raster_t1_path": raster_t1_path,
            "raster_t2_path": raster_t2_path,
            "year_t1": year_t1,
            "year_t2": year_t2,
            "lookup_table": lookup_table,
            "area_cutoff": area_cutoff,
            "change_only": change_only,
        },
        created_by=safe_uuid(user.get("sub")) if user else None,
        status="processing",
        started_at=datetime.utcnow(),
    )
    db.add(scenario)
    await db.flush()

    # Run analysis in background
    background_tasks.add_task(
        run_preques_analysis_task,
        scenario_id=scenario.id,
        raster_t1_path=raster_t1_path,
        raster_t2_path=raster_t2_path,
        year_t1=year_t1,
        year_t2=year_t2,
        lookup_table=lookup_table,
        area_cutoff=area_cutoff,
        change_only=change_only,
    )

    return {
        "scenario_id": str(scenario.id),
        "status": "processing",
        "message": "Pre-QuES analysis started. Check status with GET /api/lumens/analysis/{id}/status",
    }


async def run_preques_analysis_task(
    scenario_id: uuid.UUID,
    raster_t1_path: str,
    raster_t2_path: str,
    year_t1: int,
    year_t2: int,
    lookup_table: str | None,
    area_cutoff: float,
    change_only: bool,
):
    """Background task for Pre-QuES analysis"""
    from app.core.database import async_session_maker

    async with async_session_maker() as db:
        try:
            # Run the analysis
            results = await run_preques_analysis(
                raster_t1_path=raster_t1_path,
                raster_t2_path=raster_t2_path,
                year_t1=year_t1,
                year_t2=year_t2,
                lookup_table=lookup_table,
                area_cutoff=area_cutoff,
                change_only=change_only,
            )

            # Save results
            preques_result = PreQuESResult(
                scenario_id=scenario_id,
                raster_t1_path=raster_t1_path,
                raster_t2_path=raster_t2_path,
                year_t1=year_t1,
                year_t2=year_t2,
                crosstab_long=results["crosstab_long"],
                crosstab_matrix=results["crosstab_matrix"],
                sankey_data=results["sankey_data"],
                change_metrics=results["change_metrics"],
                statistics=results["statistics"],
            )
            db.add(preques_result)

            # Update scenario
            stmt = select(Scenario).where(Scenario.id == scenario_id)
            result = await db.execute(stmt)
            scenario = result.scalar_one()
            scenario.status = "completed"
            scenario.completed_at = datetime.utcnow()
            scenario.results_summary = {
                "total_changes": results["statistics"].get("total_changes", 0),
                "major_transitions": results["statistics"].get("major_transitions", []),
            }

            await db.commit()

        except Exception as e:
            # Update scenario with error
            stmt = select(Scenario).where(Scenario.id == scenario_id)
            result = await db.execute(stmt)
            scenario = result.scalar_one()
            scenario.status = "failed"
            scenario.completed_at = datetime.utcnow()
            scenario.results_summary = {"error": str(e)}
            await db.commit()


@router.post("/analysis/ques-carbon")
async def create_ques_carbon_analysis(
    background_tasks: BackgroundTasks,
    scenario_id: str = Body(..., description="Base scenario ID"),
    biomass_data_path: str = Body(..., description="Path to biomass data"),
    carbon_density_path: str | None = Body(None, description="Path to carbon density data"),
    emission_factors: dict[str, float] | None = Body(None, description="Emission factors by class"),
    db: AsyncSession = Depends(get_db_session),
    user: dict = Depends(get_current_user),
):
    """Run QUES-C carbon assessment"""

    # Verify scenario
    parsed_id = safe_uuid(scenario_id)
    if not parsed_id:
        raise HTTPException(status_code=404, detail="Scenario not found")

    stmt = select(Scenario).where(Scenario.id == parsed_id)
    result = await db.execute(stmt)
    scenario = result.scalar_one_or_none()

    if not scenario:
        raise HTTPException(status_code=404, detail="Scenario not found")

    # Create carbon scenario
    carbon_scenario = Scenario(
        name=f"{scenario.name} - Carbon Assessment",
        description="QUES-C carbon stock and emission analysis",
        jurisdiction_id=scenario.jurisdiction_id,
        scenario_type="conservation",
        parameters={
            "analysis_type": "ques_carbon",
            "base_scenario_id": str(scenario.id),
            "biomass_data_path": biomass_data_path,
            "carbon_density_path": carbon_density_path,
            "emission_factors": emission_factors,
        },
        created_by=safe_uuid(user.get("sub")) if user else None,
        status="processing",
        started_at=datetime.utcnow(),
    )
    db.add(carbon_scenario)
    await db.flush()

    background_tasks.add_task(
        run_ques_carbon_task,
        scenario_id=carbon_scenario.id,
        base_scenario_id=scenario_id,
        biomass_data_path=biomass_data_path,
        carbon_density_path=carbon_density_path,
        emission_factors=emission_factors,
    )

    return {
        "scenario_id": str(carbon_scenario.id),
        "status": "processing",
        "message": "QUES-C carbon analysis started",
    }


async def run_ques_carbon_task(
    scenario_id: uuid.UUID,
    base_scenario_id: str,
    biomass_data_path: str,
    carbon_density_path: str | None,
    emission_factors: dict[str, float] | None,
):
    """Background task for QUES-C carbon analysis"""
    from app.core.database import async_session_maker

    async with async_session_maker() as db:
        try:
            results = await run_ques_carbon(
                base_scenario_id=base_scenario_id,
                biomass_data_path=biomass_data_path,
                carbon_density_path=carbon_density_path,
                emission_factors=emission_factors,
            )

            # Save results
            scenario_result = ScenarioResult(
                scenario_id=scenario_id,
                carbon_metrics=results,
            )
            db.add(scenario_result)

            # Update scenario
            stmt = select(Scenario).where(Scenario.id == scenario_id)
            result = await db.execute(stmt)
            scenario = result.scalar_one()
            scenario.status = "completed"
            scenario.completed_at = datetime.utcnow()
            scenario.results_summary = {
                "total_carbon_stock": results.get("total_carbon_stock", 0),
                "total_emissions": results.get("total_emissions", 0),
            }

            await db.commit()

        except Exception as e:
            stmt = select(Scenario).where(Scenario.id == scenario_id)
            result = await db.execute(stmt)
            scenario = result.scalar_one()
            scenario.status = "failed"
            scenario.completed_at = datetime.utcnow()
            scenario.results_summary = {"error": str(e)}
            await db.commit()


@router.post("/analysis/ques-biodiversity")
async def create_ques_biodiversity_analysis(
    background_tasks: BackgroundTasks,
    scenario_id: str = Body(..., description="Base scenario ID"),
    species_data_path: str = Body(..., description="Path to species occurrence data"),
    habitat_suitability_path: str | None = Body(None, description="Path to habitat suitability"),
    db: AsyncSession = Depends(get_db_session),
    user: dict = Depends(get_current_user),
):
    """Run QUES-B biodiversity assessment"""

    parsed_id = safe_uuid(scenario_id)
    if not parsed_id:
        raise HTTPException(status_code=404, detail="Scenario not found")

    stmt = select(Scenario).where(Scenario.id == parsed_id)
    result = await db.execute(stmt)
    scenario = result.scalar_one_or_none()

    if not scenario:
        raise HTTPException(status_code=404, detail="Scenario not found")

    bio_scenario = Scenario(
        name=f"{scenario.name} - Biodiversity Assessment",
        description="QUES-B biodiversity and habitat analysis",
        jurisdiction_id=scenario.jurisdiction_id,
        scenario_type="conservation",
        parameters={
            "analysis_type": "ques_biodiversity",
            "base_scenario_id": str(scenario.id),
            "species_data_path": species_data_path,
            "habitat_suitability_path": habitat_suitability_path,
        },
        created_by=safe_uuid(user.get("sub")) if user else None,
        status="processing",
        started_at=datetime.utcnow(),
    )
    db.add(bio_scenario)
    await db.flush()

    background_tasks.add_task(
        run_ques_biodiversity_task,
        scenario_id=bio_scenario.id,
        base_scenario_id=scenario_id,
        species_data_path=species_data_path,
        habitat_suitability_path=habitat_suitability_path,
    )

    return {
        "scenario_id": str(bio_scenario.id),
        "status": "processing",
        "message": "QUES-B biodiversity analysis started",
    }


async def run_ques_biodiversity_task(
    scenario_id: uuid.UUID,
    base_scenario_id: str,
    species_data_path: str,
    habitat_suitability_path: str | None,
):
    """Background task for QUES-B biodiversity analysis"""
    from app.core.database import async_session_maker

    async with async_session_maker() as db:
        try:
            results = await run_ques_biodiversity(
                base_scenario_id=base_scenario_id,
                species_data_path=species_data_path,
                habitat_suitability_path=habitat_suitability_path,
            )

            scenario_result = ScenarioResult(
                scenario_id=scenario_id,
                biodiversity_metrics=results,
            )
            db.add(scenario_result)

            stmt = select(Scenario).where(Scenario.id == scenario_id)
            result = await db.execute(stmt)
            scenario = result.scalar_one()
            scenario.status = "completed"
            scenario.completed_at = datetime.utcnow()
            scenario.results_summary = {
                "species_richness": results.get("species_richness", 0),
                "habitat_quality": results.get("habitat_quality", 0),
            }

            await db.commit()

        except Exception as e:
            stmt = select(Scenario).where(Scenario.id == scenario_id)
            result = await db.execute(stmt)
            scenario = result.scalar_one()
            scenario.status = "failed"
            scenario.completed_at = datetime.utcnow()
            scenario.results_summary = {"error": str(e)}
            await db.commit()


@router.post("/analysis/scenario")
async def create_scenario_simulation(
    background_tasks: BackgroundTasks,
    name: str = Body(..., description="Scenario name"),
    description: str = Body(..., description="Scenario description"),
    jurisdiction_code: str = Body(..., description="Jurisdiction code"),
    scenario_type: str = Body("custom", description="Scenario type"),
    parameters: dict[str, Any] = Body(..., description="Scenario parameters"),
    intervention_layers: list[dict] | None = Body(None, description="Intervention layers"),
    db: AsyncSession = Depends(get_db_session),
    user: dict = Depends(get_current_user),
):
    """Create and run a land use scenario simulation"""

    stmt = select(Jurisdiction).where(Jurisdiction.code == jurisdiction_code)
    result = await db.execute(stmt)
    jurisdiction = result.scalar_one_or_none()

    if not jurisdiction:
        raise HTTPException(status_code=404, detail="Jurisdiction not found")

    scenario = Scenario(
        name=name,
        description=description,
        jurisdiction_id=jurisdiction.id,
        scenario_type=scenario_type,
        parameters=parameters,
        created_by=safe_uuid(user.get("sub")) if user else None,
        status="processing",
        started_at=datetime.utcnow(),
    )
    db.add(scenario)
    await db.flush()

    background_tasks.add_task(
        run_scenario_simulation_task,
        scenario_id=scenario.id,
        intervention_layers=intervention_layers,
    )

    return {
        "scenario_id": str(scenario.id),
        "status": "processing",
        "message": "Scenario simulation started",
    }


async def run_scenario_simulation_task(
    scenario_id: uuid.UUID,
    intervention_layers: list[dict] | None,
):
    """Background task for scenario simulation"""
    from app.core.database import async_session_maker

    async with async_session_maker() as db:
        try:
            results = await run_scenario_simulation(
                scenario_id=scenario_id,
                intervention_layers=intervention_layers,
            )

            # Save results
            for parcel_result in results.get("parcel_results", []):
                scenario_result = ScenarioResult(
                    scenario_id=scenario_id,
                    parcel_id=parcel_result.get("parcel_id"),
                    land_cover_change=parcel_result.get("land_cover_change"),
                    carbon_metrics=parcel_result.get("carbon_metrics"),
                    biodiversity_metrics=parcel_result.get("biodiversity_metrics"),
                    economic_metrics=parcel_result.get("economic_metrics"),
                    uncertainty=parcel_result.get("uncertainty"),
                )
                db.add(scenario_result)

            # Update scenario
            stmt = select(Scenario).where(Scenario.id == scenario_id)
            result = await db.execute(stmt)
            scenario = result.scalar_one()
            scenario.status = "completed"
            scenario.completed_at = datetime.utcnow()
            scenario.results_summary = {
                "total_parcels_affected": len(results.get("parcel_results", [])),
                "total_area_changed_ha": results.get("total_area_changed_ha", 0),
            }

            await db.commit()

        except Exception as e:
            stmt = select(Scenario).where(Scenario.id == scenario_id)
            result = await db.execute(stmt)
            scenario = result.scalar_one()
            scenario.status = "failed"
            scenario.completed_at = datetime.utcnow()
            scenario.results_summary = {"error": str(e)}
            await db.commit()


@router.get("/analysis/{scenario_id}/status")
async def get_analysis_status(
    scenario_id: str,
    db: AsyncSession = Depends(get_db_session),
):
    """Get analysis status"""
    parsed_id = safe_uuid(scenario_id)
    if not parsed_id:
        raise HTTPException(status_code=404, detail="Scenario not found")

    stmt = select(Scenario).where(Scenario.id == parsed_id)
    result = await db.execute(stmt)
    scenario = result.scalar_one_or_none()

    if not scenario:
        raise HTTPException(status_code=404, detail="Scenario not found")

    return {
        "scenario_id": str(scenario.id),
        "name": scenario.name,
        "status": scenario.status.value if hasattr(scenario.status, "value") else str(scenario.status),
        "started_at": scenario.started_at.isoformat() if scenario.started_at else None,
        "completed_at": scenario.completed_at.isoformat() if scenario.completed_at else None,
        "results_summary": scenario.results_summary,
    }


@router.get("/analysis/{scenario_id}/results")
async def get_analysis_results(
    scenario_id: str,
    db: AsyncSession = Depends(get_db_session),
):
    """Get analysis results"""
    parsed_id = safe_uuid(scenario_id)
    if not parsed_id:
        raise HTTPException(status_code=404, detail="Scenario not found")

    stmt = select(Scenario).where(Scenario.id == parsed_id)
    result = await db.execute(stmt)
    scenario = result.scalar_one_or_none()

    if not scenario:
        raise HTTPException(status_code=404, detail="Scenario not found")

    status_val = scenario.status.value if hasattr(scenario.status, "value") else str(scenario.status)
    if status_val != "completed":
        raise HTTPException(status_code=400, detail="Analysis not completed")

    # Get Pre-QuES results if available
    stmt = select(PreQuESResult).where(PreQuESResult.scenario_id == parsed_id)
    result = await db.execute(stmt)
    preques = result.scalar_one_or_none()

    # Get scenario results
    stmt = select(ScenarioResult).where(ScenarioResult.scenario_id == scenario_id)
    result = await db.execute(stmt)
    scenario_results = result.scalars().all()

    return {
        "scenario": {
            "id": str(scenario.id),
            "name": scenario.name,
            "description": scenario.description,
            "scenario_type": (
                scenario.scenario_type.value
                if hasattr(scenario.scenario_type, "value")
                else str(scenario.scenario_type)
            ),
            "parameters": scenario.parameters,
        },
        "preques_results": (
            {
                "crosstab_long": preques.crosstab_long if preques else None,
                "crosstab_matrix": preques.crosstab_matrix if preques else None,
                "sankey_data": preques.sankey_data if preques else None,
                "change_metrics": preques.change_metrics if preques else None,
                "statistics": preques.statistics if preques else None,
            }
            if preques
            else None
        ),
        "scenario_results": [
            {
                "id": str(r.id),
                "parcel_id": str(r.parcel_id) if r.parcel_id else None,
                "land_cover_change": r.land_cover_change,
                "carbon_metrics": r.carbon_metrics,
                "biodiversity_metrics": r.biodiversity_metrics,
                "economic_metrics": r.economic_metrics,
                "uncertainty": r.uncertainty,
            }
            for r in scenario_results
        ],
    }


@router.get("/scenarios")
async def list_scenarios(
    jurisdiction_code: str | None = Query(None),
    status: str | None = Query(None),
    limit: int = Query(50),
    offset: int = Query(0),
    db: AsyncSession = Depends(get_db_session),
):
    """List scenarios"""

    stmt = select(Scenario)

    if jurisdiction_code:
        stmt = stmt.join(Jurisdiction).where(Jurisdiction.code == jurisdiction_code)

    if status:
        stmt = stmt.where(Scenario.status == status)

    stmt = stmt.order_by(Scenario.created_at.desc()).limit(limit).offset(offset)
    result = await db.execute(stmt)
    scenarios: list[Any] = list(result.scalars().all())

    return {
        "scenarios": [
            {
                "id": str(s.id),
                "name": s.name,
                "description": s.description,
                "jurisdiction_code": s.jurisdiction.code if getattr(s, "jurisdiction", None) else None,
                "scenario_type": s.scenario_type.value if hasattr(s.scenario_type, "value") else str(s.scenario_type),
                "status": s.status.value if hasattr(s.status, "value") else str(s.status),
                "created_at": s.created_at.isoformat(),
                "completed_at": s.completed_at.isoformat() if s.completed_at else None,
                "results_summary": s.results_summary,
            }
            for s in scenarios
        ],
        "count": len(scenarios),
    }


@router.get("/scenarios/{scenario_id}")
async def get_scenario(
    scenario_id: str,
    db: AsyncSession = Depends(get_db_session),
):
    """Get scenario details"""
    parsed_id = safe_uuid(scenario_id)
    if not parsed_id:
        raise HTTPException(status_code=404, detail="Scenario not found")

    stmt = select(Scenario).where(Scenario.id == parsed_id)
    result = await db.execute(stmt)
    scenario = result.scalar_one_or_none()

    if not scenario:
        raise HTTPException(status_code=404, detail="Scenario not found")

    return {
        "id": str(scenario.id),
        "name": scenario.name,
        "description": scenario.description,
        "jurisdiction_code": scenario.jurisdiction.code if getattr(scenario, "jurisdiction", None) else None,
        "scenario_type": (
            scenario.scenario_type.value if hasattr(scenario.scenario_type, "value") else str(scenario.scenario_type)
        ),
        "parameters": scenario.parameters,
        "status": scenario.status.value if hasattr(scenario.status, "value") else str(scenario.status),
        "created_by": str(scenario.created_by) if scenario.created_by else None,
        "created_at": scenario.created_at.isoformat(),
        "started_at": scenario.started_at.isoformat() if scenario.started_at else None,
        "completed_at": scenario.completed_at.isoformat() if scenario.completed_at else None,
        "results_summary": scenario.results_summary,
    }


@router.delete("/scenarios/{scenario_id}")
async def delete_scenario(
    scenario_id: str,
    db: AsyncSession = Depends(get_db_session),
    user: dict = Depends(require_permission("write:all")),
):
    """Delete a scenario"""
    parsed_id = safe_uuid(scenario_id)
    if not parsed_id:
        raise HTTPException(status_code=404, detail="Scenario not found")

    stmt = select(Scenario).where(Scenario.id == parsed_id)
    result = await db.execute(stmt)
    scenario = result.scalar_one_or_none()

    if not scenario:
        raise HTTPException(status_code=404, detail="Scenario not found")

    await db.delete(scenario)
    await db.commit()

    return {"message": "Scenario deleted"}


# Illustrative coefficients for synthetic scenario modelling (documented, not empirical).
# Per-subtype proxies: tCO2e/ha carbon stock and USD/ha/yr smallholder gross margin.
SCENARIO_COEFFICIENTS = {
    "shade_cocoa": {"carbon": 120.0, "profit": 1450.0},
    "shade_coffee": {"carbon": 110.0, "profit": 1300.0},
    "dehesa": {"carbon": 95.0, "profit": 380.0},
    "montado": {"carbon": 95.0, "profit": 370.0},
    "silvopasture": {"carbon": 75.0, "profit": 520.0},
    "alley_cropping": {"carbon": 85.0, "profit": 700.0},
    "parkland": {"carbon": 60.0, "profit": 300.0},
    "homegarden": {"carbon": 90.0, "profit": 900.0},
    "forest_farming": {"carbon": 130.0, "profit": 800.0},
    "woodlot": {"carbon": 140.0, "profit": 250.0},
    "other": {"carbon": 70.0, "profit": 400.0},
}
NON_AGROFORESTRY_PROXY = {"carbon": 40.0, "profit": 550.0}
SCENARIO_DISCLAIMER = (
    "Illustrative scenario on synthetic demo parcels. Coefficients are documented "
    "proxies, not measured values; outputs must not be used for policy, compliance, "
    "or finance decisions."
)


@router.post("/scenario")
async def run_scenario(
    jurisdiction_code: str = Body("GH-AH", description="Jurisdiction code"),
    conservation_target_pct: float = Body(
        0.0, ge=0, le=50, description="Share of lowest-carbon parcels converted to conservation agroforestry"
    ),
    agroforestry_expansion_pct: float = Body(
        0.0, ge=0, le=50, description="Share of non-parcel area converted to agroforestry (adds area)"
    ),
    intensification: bool = Body(False, description="Raise productivity/profit on existing agroforestry"),
    years: int = Body(10, ge=1, le=30, description="Planning horizon"),
    db: AsyncSession = Depends(get_db_session),
):
    """DEMO (illustrative): parameterized scenario over the synthetic parcel catalogue.

    Converts real catalogue rows under user-defined levers and reports carbon
    and profitability deltas from documented per-subtype proxy coefficients.
    """
    from app.models import AgroforestryParcel, Jurisdiction

    jur = await db.execute(select(Jurisdiction).where(Jurisdiction.code == jurisdiction_code))
    jurisdiction = jur.scalar_one_or_none()
    if not jurisdiction:
        raise HTTPException(status_code=404, detail="Unknown jurisdiction")

    result = await db.execute(select(AgroforestryParcel).where(AgroforestryParcel.jurisdiction_id == jurisdiction.id))
    parcels = list(result.scalars().all())
    if not parcels:
        raise HTTPException(status_code=404, detail="No parcels for jurisdiction")

    def coeff(subtype):
        return SCENARIO_COEFFICIENTS.get(subtype, SCENARIO_COEFFICIENTS["other"])

    baseline_carbon = 0.0
    baseline_profit = 0.0
    for p in parcels:
        c = coeff(p.agroforestry_subtype)
        baseline_carbon += c["carbon"] * (p.area_ha or 0)
        baseline_profit += c["profit"] * (p.area_ha or 0) * years

    scenario_carbon = baseline_carbon
    scenario_profit = baseline_profit
    transitions = []

    if conservation_target_pct > 0:
        by_carbon = sorted(parcels, key=lambda p: coeff(p.agroforestry_subtype)["carbon"])
        target_area = sum((p.area_ha or 0) for p in parcels) * conservation_target_pct / 100
        converted = 0.0
        for p in by_carbon:
            if converted >= target_area:
                break
            ha = min(p.area_ha or 0, target_area - converted)
            old_c = coeff(p.agroforestry_subtype)
            scenario_carbon += (SCENARIO_COEFFICIENTS["woodlot"]["carbon"] - old_c["carbon"]) * ha
            scenario_profit += (SCENARIO_COEFFICIENTS["woodlot"]["profit"] - old_c["profit"]) * ha * years
            transitions.append(
                {
                    "from": p.agroforestry_subtype or "other",
                    "to": "woodlot (conservation)",
                    "area_ha": round(ha, 1),
                }
            )
            converted += ha

    if agroforestry_expansion_pct > 0:
        total_area = sum((p.area_ha or 0) for p in parcels)
        new_area = total_area * agroforestry_expansion_pct / 100
        target = SCENARIO_COEFFICIENTS["shade_cocoa"]
        scenario_carbon += (target["carbon"] - NON_AGROFORESTRY_PROXY["carbon"]) * new_area
        scenario_profit += (target["profit"] - NON_AGROFORESTRY_PROXY["profit"]) * new_area * years
        transitions.append(
            {
                "from": "non-parcel land (proxy)",
                "to": "shade_cocoa (expansion)",
                "area_ha": round(new_area, 1),
            }
        )

    if intensification:
        scenario_profit *= 1.15

    return {
        "jurisdiction_code": jurisdiction_code,
        "mode": "illustrative_demo",
        "disclaimer": SCENARIO_DISCLAIMER,
        "parameters": {
            "conservation_target_pct": conservation_target_pct,
            "agroforestry_expansion_pct": agroforestry_expansion_pct,
            "intensification": intensification,
            "years": years,
        },
        "parcels_considered": len(parcels),
        "baseline": {
            "carbon_tco2e": round(baseline_carbon, 0),
            "profit_usd": round(baseline_profit, 0),
        },
        "scenario": {
            "carbon_tco2e": round(scenario_carbon, 0),
            "profit_usd": round(scenario_profit, 0),
        },
        "deltas": {
            "carbon_tco2e": round(scenario_carbon - baseline_carbon, 0),
            "profit_usd": round(scenario_profit - baseline_profit, 0),
        },
        "major_transitions": sorted(transitions, key=lambda t: -t["area_ha"])[:8],
    }
