-- RICH Sample Parcel Data
-- Generated: 2026-09-19T14:42:35.169447Z

INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '861c2aaa-304b-450e-9098-76c3bb341b1a'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-0.6024185252835149, 5.647057688803006], [-0.6022965155419099, 5.648906371865848], [-0.6037523029969438, 5.650461202496195], [-0.6055519367255874, 5.650239888746166], [-0.6081461783319136, 5.6490720530236445], [-0.6085253279631324, 5.646900268540507], [-0.6079006150705252, 5.644602592365955], [-0.6063151661591305, 5.643907142605714], [-0.6046655904375192, 5.644791449673994], [-0.6018102418670019, 5.644656675780361], [-0.6024185252835149, 5.647057688803006]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.779,
    42.98,
    0.216,
    'GEDI Canopy LiDAR Validation',
    2022,
    'https://gedi.umd.edu/',
    'Sentinel-2 + Random Forest',
    'v2.1',
    '2026-09-19T14:42:35.138356Z'::timestamptz,
    '2026-09-19T14:42:35.138356Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '7361251c-353d-4d3d-8321-0f8445cf0554'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.8859841408483893, 6.981002981262481], [-1.8871833130473492, 6.983137636875443], [-1.8895712029963008, 6.98503388588106], [-1.8910426608651336, 6.984169230482586], [-1.8927040764756828, 6.981171872260735], [-1.8913889160188717, 6.979181126342497], [-1.8890705746596346, 6.978902888734499], [-1.8863343179880259, 6.979090167172399], [-1.8859841408483893, 6.981002981262481]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.925,
    38.35,
    0.039,
    'GEDI Canopy LiDAR Validation',
    2023,
    'https://gedi.umd.edu/',
    'Sentinel-2 + Random Forest',
    'v2.3',
    '2026-09-19T14:42:35.138413Z'::timestamptz,
    '2026-09-19T14:42:35.138413Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '0c825cb1-8a3a-441f-83d5-e2b920ae644d'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.4889305299525937, 6.122042910754234], [-2.491097171720241, 6.124497043840277], [-2.4933407528039915, 6.12336787575691], [-2.493962949099731, 6.12093481913165], [-2.4913703544888635, 6.11946003620269], [-2.4889305299525937, 6.122042910754234]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.851,
    21.15,
    0.21,
    'Planet NICFI High-Resolution',
    2021,
    'https://www.planet.com/',
    'Hybrid Remote Sensing',
    'v1.7',
    '2026-09-19T14:42:35.138447Z'::timestamptz,
    '2026-09-19T14:42:35.138447Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '2816ce5c-ab93-402d-a47a-4892e9d8d0dc'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.001655531184579, 6.108947157638589], [-2.00218393154082, 6.109585509168979], [-2.0026195047106965, 6.110524422790014], [-2.0038141055239325, 6.110870103154251], [-2.00453811990117, 6.109834663360506], [-2.0050621406154923, 6.10866633114586], [-2.005460010629133, 6.107635201919521], [-2.0037919452180346, 6.106729763550173], [-2.0027423872768373, 6.1074305976045125], [-2.0014657495709933, 6.107599979373456], [-2.001655531184579, 6.108947157638589]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.824,
    16.18,
    0.169,
    'Planet NICFI High-Resolution',
    2022,
    'https://www.planet.com/',
    'PlanetScope + CNN',
    'v1.5',
    '2026-09-19T14:42:35.138486Z'::timestamptz,
    '2026-09-19T14:42:35.138486Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'ab037357-00c5-423f-a917-15b848b5de6e'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-0.9265173190465315, 6.8415089216856595], [-0.9280381377481524, 6.844442784382456], [-0.9314896299571649, 6.843055025855551], [-0.9311390253663732, 6.839097408103717], [-0.92890663303751, 6.838775867137249], [-0.9265173190465315, 6.8415089216856595]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.848,
    23.87,
    0.077,
    'Planet NICFI High-Resolution',
    2021,
    'https://www.planet.com/',
    'PlanetScope + CNN',
    'v1.0',
    '2026-09-19T14:42:35.138515Z'::timestamptz,
    '2026-09-19T14:42:35.138515Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '9d3d3958-e1a0-4917-914a-a88769f86609'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-0.7874017279651789, 7.057220803125329], [-0.7878567515306084, 7.058330998257671], [-0.7896212600824548, 7.059275629410108], [-0.7912404357105353, 7.058859359502049], [-0.7918241853516617, 7.0581973821945], [-0.7927610108008737, 7.055824300512121], [-0.7904959067770575, 7.05510780330201], [-0.7886151066563665, 7.053807247252926], [-0.7874776014723076, 7.055013861561334], [-0.7874017279651789, 7.057220803125329]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.81,
    29.05,
    0.183,
    'Planet NICFI High-Resolution',
    2024,
    'https://www.planet.com/',
    'GEDI LiDAR + ML',
    'v3.0',
    '2026-09-19T14:42:35.138569Z'::timestamptz,
    '2026-09-19T14:42:35.138569Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '44a9342d-3c7c-4f97-b6c2-11919c631c7f'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-0.6296758501295708, 7.443527691690936], [-0.6305899401740054, 7.44441948415565], [-0.6321370586467949, 7.445465869230975], [-0.6335113843317323, 7.443751204088437], [-0.6327090807640627, 7.442370595965591], [-0.631654124292947, 7.441363521384147], [-0.6302576950202938, 7.441810260736075], [-0.6296758501295708, 7.443527691690936]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'homegarden'::agroforestry_subtype,
    0.901,
    13.41,
    0.09,
    'GEDI Canopy LiDAR Validation',
    2024,
    'https://gedi.umd.edu/',
    'Hybrid Remote Sensing',
    'v2.0',
    '2026-09-19T14:42:35.138598Z'::timestamptz,
    '2026-09-19T14:42:35.138598Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '8803a013-eed4-45f6-94ba-09ed50fdef00'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.7730438008196006, 6.816237379339726], [-1.7737227181874031, 6.820546596730663], [-1.7779051227026978, 6.819982888385498], [-1.7785348715514195, 6.815925368529758], [-1.7767995187007515, 6.813560328397499], [-1.7744682927401199, 6.813853785332095], [-1.7730438008196006, 6.816237379339726]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.869,
    29.65,
    0.118,
    'CERSGIS Sentinel-2 Classification',
    2022,
    'https://zenodo.org/records/16579443',
    'GEDI LiDAR + ML',
    'v2.9',
    '2026-09-19T14:42:35.138642Z'::timestamptz,
    '2026-09-19T14:42:35.138642Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '4e9ae462-ab74-42f4-8124-5d7a88a4beeb'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.5324254142083402, 6.796947233523895], [-1.5329007905071868, 6.799140243323587], [-1.5354187395931838, 6.799114523410291], [-1.5358329579752112, 6.7967143001776025], [-1.535382989269885, 6.794893943869517], [-1.533034557394087, 6.794335357942203], [-1.5324254142083402, 6.796947233523895]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.882,
    12.71,
    0.125,
    'CIFOR Ground Truth Survey',
    2023,
    NULL,
    'Sentinel-2 + Random Forest',
    'v2.4',
    '2026-09-19T14:42:35.138710Z'::timestamptz,
    '2026-09-19T14:42:35.138710Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '064f92d5-fcc5-4b28-b111-327386d3656b'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.0968689074392004, 6.218867623567188], [-2.097576654715118, 6.22140887889702], [-2.101300608199314, 6.2219041014288345], [-2.10195637259805, 6.21873121971015], [-2.1009582408658565, 6.2159886331922385], [-2.0973315764052987, 6.216475374634539], [-2.0968689074392004, 6.218867623567188]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.911,
    28.45,
    0.045,
    'CERSGIS Sentinel-2 Classification',
    2021,
    'https://zenodo.org/records/16579443',
    'Hybrid Remote Sensing',
    'v3.9',
    '2026-09-19T14:42:35.138738Z'::timestamptz,
    '2026-09-19T14:42:35.138738Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'b2c3818e-5af9-44da-b7e1-9d66f32afa9a'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.5517705290451556, 5.980003306861437], [-1.5524500616070633, 5.981223872298081], [-1.5532725821299889, 5.98245645811047], [-1.5544496390324083, 5.9820464698026], [-1.5555120920173129, 5.980757365853609], [-1.5554622451323195, 5.979579311009228], [-1.5545896272151791, 5.979061584496853], [-1.5530129766429548, 5.978366654077555], [-1.552572855033535, 5.979325376693549], [-1.5517705290451556, 5.980003306861437]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.803,
    14.13,
    0.12,
    'Planet NICFI High-Resolution',
    2024,
    'https://www.planet.com/',
    'Hybrid Remote Sensing',
    'v2.3',
    '2026-09-19T14:42:35.138848Z'::timestamptz,
    '2026-09-19T14:42:35.138848Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'fee6d683-f334-4377-833d-3b1a3c2a0ed8'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.31108057083179, 7.29915800317762], [-2.3117482215239695, 7.301114492381256], [-2.3141475867222487, 7.301235793213022], [-2.315737099975301, 7.301975540414612], [-2.316771721410781, 7.299644310023354], [-2.316210117668375, 7.29800647371772], [-2.31591825155398, 7.295840784298597], [-2.314486489038473, 7.296709472412802], [-2.3125409059888766, 7.297625968326059], [-2.31108057083179, 7.29915800317762]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.857,
    28.56,
    0.206,
    'GEDI Canopy LiDAR Validation',
    2020,
    'https://gedi.umd.edu/',
    'Sentinel-2 + Random Forest',
    'v2.3',
    '2026-09-19T14:42:35.138882Z'::timestamptz,
    '2026-09-19T14:42:35.138882Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '479bc880-48f9-4ebc-aebe-756588f8ed11'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.6952691190069027, 7.04651340697429], [-1.6954317742382357, 7.04791088956516], [-1.698328493625596, 7.048475635745348], [-1.7007157454113053, 7.04838084542958], [-1.7004909511804323, 7.046186560502399], [-1.6993785191124777, 7.044658985548406], [-1.6984620173045109, 7.042816378916949], [-1.6960401904353548, 7.044212338695409], [-1.6952691190069027, 7.04651340697429]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'homegarden'::agroforestry_subtype,
    0.819,
    33.91,
    0.196,
    'CERSGIS Sentinel-2 Classification',
    2023,
    'https://zenodo.org/records/16579443',
    'Hybrid Remote Sensing',
    'v1.7',
    '2026-09-19T14:42:35.138914Z'::timestamptz,
    '2026-09-19T14:42:35.138914Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '68daecef-de6f-4c36-92ee-7c9da9d4a335'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.911698983692538, 6.41016915212645], [-1.9139080320954365, 6.413241458060975], [-1.9164002268294822, 6.413108453312634], [-1.9190110289231062, 6.409417402215536], [-1.9171518660182667, 6.407383819886457], [-1.9130781150770353, 6.406089815395008], [-1.911698983692538, 6.41016915212645]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.842,
    54.84,
    0.229,
    'Planet NICFI High-Resolution',
    2024,
    'https://www.planet.com/',
    'Hybrid Remote Sensing',
    'v2.2',
    '2026-09-19T14:42:35.138962Z'::timestamptz,
    '2026-09-19T14:42:35.138962Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '619e3047-6212-48c0-a4d9-101eb35e6874'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-0.829750421894887, 5.774982222263773], [-0.8297549340687895, 5.776025206751176], [-0.8312592120075363, 5.77705001967822], [-0.8327279494035214, 5.776613578676951], [-0.833328480717845, 5.775749878854447], [-0.8333647186886897, 5.774698064683209], [-0.8326907358454501, 5.773329644279851], [-0.8308273634385234, 5.7729009128472955], [-0.8296104884014147, 5.773894517490821], [-0.829750421894887, 5.774982222263773]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.773,
    14.71,
    0.121,
    'CIFOR Ground Truth Survey',
    2023,
    NULL,
    'Sentinel-2 + Random Forest',
    'v1.0',
    '2026-09-19T14:42:35.138991Z'::timestamptz,
    '2026-09-19T14:42:35.138991Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'f94a6c3c-85d9-43c1-9883-8a9fe44c5f53'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-0.9657349872972107, 6.7188132957647415], [-0.9668294245408412, 6.720273305826696], [-0.9680302868861439, 6.72180921989798], [-0.9698146163742704, 6.721165642952465], [-0.9712862077005925, 6.720437940345036], [-0.9711340443180244, 6.718150188257089], [-0.9701115320488257, 6.7167779962449705], [-0.9678197133524101, 6.715740034254161], [-0.9664490252184511, 6.716971635778869], [-0.9657349872972107, 6.7188132957647415]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.847,
    27.27,
    0.147,
    'CERSGIS Sentinel-2 Classification',
    2020,
    'https://zenodo.org/records/16579443',
    'Hybrid Remote Sensing',
    'v3.5',
    '2026-09-19T14:42:35.139017Z'::timestamptz,
    '2026-09-19T14:42:35.139017Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'f56e9351-032b-4289-8913-eb46f1ca0dd3'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.407955742787605, 6.516153286751537], [-2.410027690255459, 6.520142389367977], [-2.4127511728828326, 6.520092524310957], [-2.4143492572586065, 6.5192855505049385], [-2.4166188882093937, 6.517623842874154], [-2.4145688059553523, 6.513910382660285], [-2.4119762948326797, 6.512789078837771], [-2.4094864104077716, 6.513707953608887], [-2.407955742787605, 6.516153286751537]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.817,
    68.78,
    0.198,
    'CERSGIS Sentinel-2 Classification',
    2023,
    'https://zenodo.org/records/16579443',
    'Sentinel-2 + Random Forest',
    'v2.2',
    '2026-09-19T14:42:35.139042Z'::timestamptz,
    '2026-09-19T14:42:35.139042Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'f58c7bbe-505b-4ecd-afe3-4721c637de8f'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.8123825507781466, 6.310816201505426], [-1.8139921525213418, 6.312899622330159], [-1.815801091528568, 6.312594259817756], [-1.8170598404315763, 6.311883921256446], [-1.8186179092915262, 6.310320923217809], [-1.8169979827437648, 6.3092766109796745], [-1.8154907931639936, 6.309011350030262], [-1.812946066446579, 6.308921058067879], [-1.8123825507781466, 6.310816201505426]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.905,
    20.43,
    0.087,
    'GEDI Canopy LiDAR Validation',
    2021,
    'https://gedi.umd.edu/',
    'Sentinel-2 + Random Forest',
    'v1.6',
    '2026-09-19T14:42:35.139065Z'::timestamptz,
    '2026-09-19T14:42:35.139065Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'c05721cc-ef92-4f60-b3dc-16595d8469a3'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.594249975962313, 7.448468779399116], [-1.5943438619898536, 7.4493727979400575], [-1.5959024608978167, 7.4506019561317345], [-1.5976254580638223, 7.449805832087894], [-1.5978714514674643, 7.448419265513802], [-1.5967397302891642, 7.447139172981245], [-1.5958242546054187, 7.445857095075209], [-1.5943757599715365, 7.446987349768305], [-1.594249975962313, 7.448468779399116]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.797,
    16.49,
    0.115,
    'GEDI Canopy LiDAR Validation',
    2022,
    'https://gedi.umd.edu/',
    'Sentinel-2 + Random Forest',
    'v3.9',
    '2026-09-19T14:42:35.139092Z'::timestamptz,
    '2026-09-19T14:42:35.139092Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '52f2c7cc-a81e-4996-96cd-8e8a6646ef30'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.418468657197766, 6.777308719430373], [-2.420166075134452, 6.778865721741132], [-2.423305892191619, 6.779404913267547], [-2.422848906444378, 6.7754555109790875], [-2.419850192972398, 6.774374774301597], [-2.418468657197766, 6.777308719430373]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.905,
    26.5,
    0.141,
    'GEDI Canopy LiDAR Validation',
    2022,
    'https://gedi.umd.edu/',
    'PlanetScope + CNN',
    'v1.7',
    '2026-09-19T14:42:35.139115Z'::timestamptz,
    '2026-09-19T14:42:35.139115Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '14b14f9d-b2bc-4577-a20e-93fd93a8a6f5'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.848810988593013, 5.97351460099262], [-1.8491978521873098, 5.974302901974954], [-1.8500907908482132, 5.975023657422155], [-1.8511318831797783, 5.974783005574283], [-1.8518736881546465, 5.973973211731622], [-1.8517821711977789, 5.972914045164296], [-1.8510644622324155, 5.97240517939143], [-1.8501522962644141, 5.972211048903639], [-1.8492431281712651, 5.972857077419289], [-1.848810988593013, 5.97351460099262]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.945,
    8.26,
    0.042,
    'Planet NICFI High-Resolution',
    2021,
    'https://www.planet.com/',
    'Hybrid Remote Sensing',
    'v3.3',
    '2026-09-19T14:42:35.139141Z'::timestamptz,
    '2026-09-19T14:42:35.139141Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '153224a3-44e4-426e-bfa4-925281b4e76e'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.1608859679194754, 6.909556396510498], [-1.1622971871451937, 6.910613260106015], [-1.1634922315290654, 6.913416741509645], [-1.1663799465167615, 6.913364974456429], [-1.166717060622331, 6.911474617617529], [-1.1671961789919374, 6.909488546887479], [-1.1679794330037565, 6.906799003234385], [-1.1661507637755233, 6.905450128597534], [-1.1637000876980736, 6.905464552623087], [-1.1618632929914592, 6.907713623275898], [-1.1608859679194754, 6.909556396510498]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.953,
    60.92,
    0.036,
    'CERSGIS Sentinel-2 Classification',
    2021,
    'https://zenodo.org/records/16579443',
    'PlanetScope + CNN',
    'v1.3',
    '2026-09-19T14:42:35.139167Z'::timestamptz,
    '2026-09-19T14:42:35.139167Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '4987830e-6098-41cc-83a7-ac12d4707f1c'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.4037705006350407, 6.562205295732567], [-1.4047147416572718, 6.56302138381739], [-1.4057324845048524, 6.5639861420551], [-1.4074824381445112, 6.563119760938498], [-1.4073694495334126, 6.5617872014664815], [-1.407575276288147, 6.560423327847173], [-1.4054520329977238, 6.559317729275027], [-1.4040039072475075, 6.560271251404783], [-1.4037705006350407, 6.562205295732567]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.934,
    19.27,
    0.066,
    'Planet NICFI High-Resolution',
    2021,
    'https://www.planet.com/',
    'Hybrid Remote Sensing',
    'v2.4',
    '2026-09-19T14:42:35.139193Z'::timestamptz,
    '2026-09-19T14:42:35.139193Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '92dca104-64c6-493a-ac1a-7c824c880cb0'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.225116094803428, 7.307809955413836], [-1.2263394684610507, 7.310974339188982], [-1.2294242668995783, 7.308985109609746], [-1.2310944295455548, 7.304958161229923], [-1.2266348349234724, 7.304786476143923], [-1.225116094803428, 7.307809955413836]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.952,
    36.62,
    0.033,
    'Planet NICFI High-Resolution',
    2020,
    'https://www.planet.com/',
    'Hybrid Remote Sensing',
    'v3.0',
    '2026-09-19T14:42:35.139215Z'::timestamptz,
    '2026-09-19T14:42:35.139215Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'c114c59e-0a34-4cdc-9da1-f04e25e5406a'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-0.5060246092060996, 6.040816138761704], [-0.5092854936197447, 6.042429434634269], [-0.5127396192002701, 6.042713107211009], [-0.5123208114001065, 6.038957425659126], [-0.5095269105346839, 6.036484513711789], [-0.5060246092060996, 6.040816138761704]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.849,
    34.63,
    0.122,
    'CIFOR Ground Truth Survey',
    2022,
    NULL,
    'GEDI LiDAR + ML',
    'v3.6',
    '2026-09-19T14:42:35.139240Z'::timestamptz,
    '2026-09-19T14:42:35.139240Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'efb6a50a-5c27-4b39-9d30-ebc193774090'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.5740299626332424, 5.757894092678569], [-1.5739831185313256, 5.760916134945382], [-1.5776390887670788, 5.761790754892207], [-1.580189510193588, 5.760141907221156], [-1.5819047945428322, 5.758901276696663], [-1.5799328223611617, 5.754173688590569], [-1.5769254608561092, 5.755017616733872], [-1.5740895599071134, 5.754905434669436], [-1.5740299626332424, 5.757894092678569]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.826,
    48.44,
    0.216,
    'GEDI Canopy LiDAR Validation',
    2024,
    'https://gedi.umd.edu/',
    'Sentinel-2 + Random Forest',
    'v2.4',
    '2026-09-19T14:42:35.139266Z'::timestamptz,
    '2026-09-19T14:42:35.139266Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'f88b4e26-fce5-478d-b1ff-2ca4767384c1'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.5595608316561436, 6.887353385327129], [-1.5603429753008264, 6.889129887720569], [-1.56225451146805, 6.8896857643814196], [-1.5640542886029392, 6.888799055611246], [-1.5648116633252391, 6.887799005740351], [-1.5648766208252864, 6.8852105885828925], [-1.5624937942004147, 6.885068044062121], [-1.560616278112842, 6.885365704804821], [-1.5595608316561436, 6.887353385327129]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.852,
    25.03,
    0.117,
    'CIFOR Ground Truth Survey',
    2021,
    NULL,
    'PlanetScope + CNN',
    'v2.9',
    '2026-09-19T14:42:35.139315Z'::timestamptz,
    '2026-09-19T14:42:35.139315Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '0607b0dd-db7d-445e-9308-b5b9c11c2431'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.3862898063298879, 5.884690132223917], [-1.3873437379316953, 5.885955934916923], [-1.3893218073973765, 5.8861237116584215], [-1.3892699576111298, 5.884533041892174], [-1.3885961642785856, 5.88319002043368], [-1.3872035496342443, 5.883198152994942], [-1.3862898063298879, 5.884690132223917]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.914,
    8.07,
    0.073,
    'CIFOR Ground Truth Survey',
    2024,
    NULL,
    'Sentinel-2 + Random Forest',
    'v2.7',
    '2026-09-19T14:42:35.139339Z'::timestamptz,
    '2026-09-19T14:42:35.139339Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'bcc71432-1aa3-4717-9496-30d09566b8c4'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.2249421531330333, 6.1476560317152], [-1.2259803179989275, 6.149726957658603], [-1.2285108274604204, 6.1496624888157365], [-1.2309021923079078, 6.147978594624837], [-1.2303450051548237, 6.146235032988407], [-1.228328837076392, 6.143253579226372], [-1.2256893770282031, 6.145039651495864], [-1.2249421531330333, 6.1476560317152]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.973,
    42.29,
    0.027,
    'CERSGIS Sentinel-2 Classification',
    2021,
    'https://zenodo.org/records/16579443',
    'Sentinel-2 + Random Forest',
    'v2.0',
    '2026-09-19T14:42:35.139362Z'::timestamptz,
    '2026-09-19T14:42:35.139362Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '8ecc4bf4-18a5-40c8-9d1b-959d182aa952'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-0.6291878187003773, 5.811307609850234], [-0.6297712439427364, 5.8143229094859095], [-0.6326848205288538, 5.814092526570841], [-0.6350448644135386, 5.813159969955853], [-0.6348148454796757, 5.81008479159478], [-0.6328797676129958, 5.809171324849651], [-0.6310512526464773, 5.809146361463386], [-0.6291878187003773, 5.811307609850234]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.879,
    29.32,
    0.08,
    'GEDI Canopy LiDAR Validation',
    2023,
    'https://gedi.umd.edu/',
    'Sentinel-2 + Random Forest',
    'v1.4',
    '2026-09-19T14:42:35.139398Z'::timestamptz,
    '2026-09-19T14:42:35.139398Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '417d47cc-8316-4e79-9049-cd63207f29e1'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.034137648404539, 6.357854445278586], [-1.0344849476768265, 6.358400226277009], [-1.0349468599180967, 6.358809002623559], [-1.0355790369109787, 6.358777323584869], [-1.0357182220405514, 6.358362372058187], [-1.0366316783413392, 6.357780571969634], [-1.0359606204111511, 6.356855721406517], [-1.03522632574536, 6.356710530938845], [-1.034504214496662, 6.3563587621807125], [-1.0343643269291827, 6.3571652881381], [-1.034137648404539, 6.357854445278586]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.835,
    4.9,
    0.123,
    'CIFOR Ground Truth Survey',
    2021,
    NULL,
    'Sentinel-2 + Random Forest',
    'v2.5',
    '2026-09-19T14:42:35.139427Z'::timestamptz,
    '2026-09-19T14:42:35.139427Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'ddfada00-7bc0-48c1-bda5-bc6a7052a141'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.2235406122039107, 7.079976819926009], [-1.2244432607109283, 7.081004858944505], [-1.2252093864178066, 7.081800977830463], [-1.226789977567313, 7.081312017248058], [-1.226815273161986, 7.080349800602561], [-1.2269746424205996, 7.078773130523985], [-1.2255171680414791, 7.078215989596346], [-1.2244867371788206, 7.079115245981302], [-1.2235406122039107, 7.079976819926009]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.876,
    10.64,
    0.145,
    'CIFOR Ground Truth Survey',
    2022,
    NULL,
    'Sentinel-2 + Random Forest',
    'v2.9',
    '2026-09-19T14:42:35.139451Z'::timestamptz,
    '2026-09-19T14:42:35.139451Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'e756862c-ed65-4fd2-bfc2-b76f9da41b17'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.365549091429016, 7.056943145780601], [-2.3665758764082097, 7.058214770245089], [-2.3681752436044525, 7.058800305406581], [-2.3695648282686985, 7.059854596855058], [-2.371088443948023, 7.058978813813384], [-2.3714857922606956, 7.057021397458104], [-2.3718737693942904, 7.055454642207268], [-2.3698850390015176, 7.0546732218653405], [-2.3685637818609004, 7.055067227946882], [-2.366305293857252, 7.055500403435341], [-2.365549091429016, 7.056943145780601]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.81,
    35.56,
    0.211,
    'Planet NICFI High-Resolution',
    2023,
    'https://www.planet.com/',
    'Hybrid Remote Sensing',
    'v1.9',
    '2026-09-19T14:42:35.139478Z'::timestamptz,
    '2026-09-19T14:42:35.139478Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '445b689c-2daf-4207-bebc-33374af38e45'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.1024547142072052, 5.773226434755157], [-1.1027423415890736, 5.773966534081037], [-1.1037014767774185, 5.77428109074798], [-1.104481796527668, 5.773600871191733], [-1.105185635824337, 5.772216031743155], [-1.1037438376915139, 5.771546641991245], [-1.102781011738566, 5.772276647194311], [-1.1024547142072052, 5.773226434755157]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.938,
    5.96,
    0.068,
    'Planet NICFI High-Resolution',
    2021,
    'https://www.planet.com/',
    'Sentinel-2 + Random Forest',
    'v1.2',
    '2026-09-19T14:42:35.139502Z'::timestamptz,
    '2026-09-19T14:42:35.139502Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'a53ea199-9123-4306-ab14-eb7c9106fcb4'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.3750363806541537, 6.699365164773922], [-2.375129015606069, 6.70110649287389], [-2.376002869430708, 6.701565856870687], [-2.3772817593456312, 6.701696371216627], [-2.3780187510250994, 6.700424485292085], [-2.3784433911352845, 6.699881072670697], [-2.3781315354128103, 6.698798525862866], [-2.376909438857848, 6.698061288863836], [-2.376030662624161, 6.698193401947508], [-2.3749543196701506, 6.697789158529067], [-2.3750363806541537, 6.699365164773922]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.854,
    13.73,
    0.211,
    'Planet NICFI High-Resolution',
    2024,
    'https://www.planet.com/',
    'PlanetScope + CNN',
    'v2.8',
    '2026-09-19T14:42:35.139538Z'::timestamptz,
    '2026-09-19T14:42:35.139538Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '2a51d7cd-d586-419b-915a-aa0785b8e9e5'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.1340350840918467, 6.72147303634017], [-1.1347866139421108, 6.7229158622489384], [-1.1362175134454933, 6.723555238273761], [-1.1373622780736015, 6.72254755359939], [-1.1383969913660725, 6.721223748452139], [-1.137158413836601, 6.720241887723941], [-1.1366440082962208, 6.719381958152358], [-1.1347355021784005, 6.71975095928883], [-1.1340350840918467, 6.72147303634017]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'parkland'::agroforestry_subtype,
    0.951,
    19.51,
    0.036,
    'CIFOR Ground Truth Survey',
    2020,
    NULL,
    'GEDI LiDAR + ML',
    'v1.6',
    '2026-09-19T14:42:35.139566Z'::timestamptz,
    '2026-09-19T14:42:35.139566Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'a21e1cd9-ff14-435d-85c4-30251925afb9'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.106351739324928, 7.085201073378917], [-2.1077421264226404, 7.086944468679716], [-2.1101416297140534, 7.0878988434176], [-2.1112929371479217, 7.084743613255167], [-2.1105167631236887, 7.0829004120547685], [-2.1072565641963004, 7.082672225078245], [-2.106351739324928, 7.085201073378917]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.815,
    27.21,
    0.131,
    'GEDI Canopy LiDAR Validation',
    2020,
    'https://gedi.umd.edu/',
    'PlanetScope + CNN',
    'v2.7',
    '2026-09-19T14:42:35.139590Z'::timestamptz,
    '2026-09-19T14:42:35.139590Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '72926eb2-0a88-4412-8c3f-50e59fe8cf91'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.1209107440683548, 5.945756123011252], [-1.1213851505996497, 5.946377220855454], [-1.1223392839947872, 5.946122266585638], [-1.1223775368268063, 5.945292137031892], [-1.1215244752927644, 5.944943096214875], [-1.1209107440683548, 5.945756123011252]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'parkland'::agroforestry_subtype,
    0.861,
    1.62,
    0.093,
    'GEDI Canopy LiDAR Validation',
    2024,
    'https://gedi.umd.edu/',
    'Sentinel-2 + Random Forest',
    'v2.7',
    '2026-09-19T14:42:35.139613Z'::timestamptz,
    '2026-09-19T14:42:35.139613Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '373f3a5e-0d4f-41c1-81ee-24f13828e265'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.0434832104033602, 5.9608151438269665], [-2.044330618693018, 5.9622950251547575], [-2.0463054798457634, 5.963137305090408], [-2.048066260701263, 5.962070440005147], [-2.048033982081216, 5.959175561373069], [-2.046143728324485, 5.958686093714871], [-2.0447866444936404, 5.958997797094231], [-2.0434832104033602, 5.9608151438269665]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'homegarden'::agroforestry_subtype,
    0.875,
    18.72,
    0.151,
    'CERSGIS Sentinel-2 Classification',
    2020,
    'https://zenodo.org/records/16579443',
    'PlanetScope + CNN',
    'v2.2',
    '2026-09-19T14:42:35.139638Z'::timestamptz,
    '2026-09-19T14:42:35.139638Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '91715589-b291-49dd-b2ea-7490599b50e6'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-0.8238856465199713, 6.514714338548735], [-0.8238712291310073, 6.516686155914233], [-0.8259777361708697, 6.51758244211792], [-0.8272632793297715, 6.517902489348095], [-0.8290004986216701, 6.5169044731866785], [-0.8303683395895032, 6.515152591905756], [-0.8296505049058156, 6.51319261964648], [-0.8267356731241616, 6.511889637859603], [-0.8257341462343266, 6.511407381540113], [-0.8237230533183988, 6.513197919924223], [-0.8238856465199713, 6.514714338548735]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.753,
    39.08,
    0.335,
    'GEDI Canopy LiDAR Validation',
    2024,
    'https://gedi.umd.edu/',
    'PlanetScope + CNN',
    'v1.4',
    '2026-09-19T14:42:35.139665Z'::timestamptz,
    '2026-09-19T14:42:35.139665Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '16e2891d-ef02-44e9-b106-7abf176cfc5d'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-0.5638258918540507, 7.360924903214263], [-0.5637237611686516, 7.36253041948124], [-0.5650774949697229, 7.363416640126006], [-0.5669759232983235, 7.364147036902651], [-0.568345574606367, 7.362591146190197], [-0.5697918148550024, 7.360230723331102], [-0.5687355981879513, 7.359501284302611], [-0.5677358147665711, 7.357721260292774], [-0.5647026581512697, 7.357549141786824], [-0.5641175703755269, 7.359450673203517], [-0.5638258918540507, 7.360924903214263]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.976,
    30.11,
    0.018,
    'CERSGIS Sentinel-2 Classification',
    2022,
    'https://zenodo.org/records/16579443',
    'Hybrid Remote Sensing',
    'v3.7',
    '2026-09-19T14:42:35.139689Z'::timestamptz,
    '2026-09-19T14:42:35.139689Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '1fac5a38-6c1e-478c-917e-2cdacca1a4ca'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.2895670922269717, 6.854415657812292], [-2.290058889461993, 6.8574960147710575], [-2.2939145356502144, 6.85754602680145], [-2.2945750573295984, 6.85571163104766], [-2.2949109724567585, 6.853736111840329], [-2.292934174232077, 6.851618729455138], [-2.2906444252342295, 6.851767929868783], [-2.2895670922269717, 6.854415657812292]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.859,
    34.24,
    0.208,
    'Planet NICFI High-Resolution',
    2022,
    'https://www.planet.com/',
    'GEDI LiDAR + ML',
    'v1.6',
    '2026-09-19T14:42:35.139712Z'::timestamptz,
    '2026-09-19T14:42:35.139712Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'e13f15bf-b00a-4257-9e3c-40d26015158b'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.157268769705454, 5.972059076650859], [-1.1576314800736405, 5.974428169095626], [-1.1604242122042754, 5.97399613237844], [-1.160833372822628, 5.972150307882556], [-1.1597826844501566, 5.970382855504962], [-1.1579697226395156, 5.969956228912243], [-1.157268769705454, 5.972059076650859]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.918,
    16.63,
    0.055,
    'CIFOR Ground Truth Survey',
    2022,
    NULL,
    'PlanetScope + CNN',
    'v2.6',
    '2026-09-19T14:42:35.139734Z'::timestamptz,
    '2026-09-19T14:42:35.139734Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '29b631c8-16b8-4987-9134-052756e52173'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.2435389148884537, 6.381110845659958], [-1.24375318142729, 6.382533902691217], [-1.2445055969438525, 6.382167230631729], [-1.2458116079914276, 6.382046515252913], [-1.245513688341632, 6.380820718886508], [-1.2449974819749168, 6.379800775356583], [-1.2436839986635664, 6.3801485627832975], [-1.2435389148884537, 6.381110845659958]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.93,
    6.59,
    0.046,
    'CIFOR Ground Truth Survey',
    2020,
    NULL,
    'Sentinel-2 + Random Forest',
    'v1.0',
    '2026-09-19T14:42:35.139762Z'::timestamptz,
    '2026-09-19T14:42:35.139762Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '4cdc8aca-7593-40bd-9fe7-0d9cb8cfe1c9'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.244481770667147, 5.517567052074791], [-1.2462745298954998, 5.520357318837512], [-1.2478861127484815, 5.520845997855716], [-1.2496139587598611, 5.5221869231855], [-1.2519165752158012, 5.518819783878883], [-1.2511544376658674, 5.517655236320734], [-1.2495752358443037, 5.515306678702209], [-1.2469992104892529, 5.514160198186826], [-1.2448632268792226, 5.515631594667754], [-1.244481770667147, 5.517567052074791]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.772,
    47.24,
    0.154,
    'CIFOR Ground Truth Survey',
    2023,
    NULL,
    'PlanetScope + CNN',
    'v2.0',
    '2026-09-19T14:42:35.139787Z'::timestamptz,
    '2026-09-19T14:42:35.139787Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '0a49d9cf-c90c-4672-9ea4-60c47dd6fcff'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-0.8243255622816846, 7.188457496254546], [-0.8256079039595262, 7.1898906887298], [-0.8276065584437496, 7.191324901068831], [-0.8295527570656865, 7.18957931547865], [-0.8296324867381408, 7.188295602870478], [-0.8289495998843329, 7.1864769702058], [-0.8274369560862035, 7.186158538378516], [-0.8257689075159855, 7.186342051496355], [-0.8243255622816846, 7.188457496254546]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.976,
    27.63,
    0.015,
    'CIFOR Ground Truth Survey',
    2020,
    NULL,
    'Sentinel-2 + Random Forest',
    'v3.7',
    '2026-09-19T14:42:35.139815Z'::timestamptz,
    '2026-09-19T14:42:35.139815Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '14cb2923-e7b9-4110-b16f-9f50d6642b65'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.6560881707936332, 6.065760447503452], [-1.6578092294755524, 6.067081661167164], [-1.6600321770829989, 6.06758124285441], [-1.6619320876249752, 6.066970940919206], [-1.6612396952422357, 6.064729087310061], [-1.6601645047942983, 6.062734532252408], [-1.65738010925228, 6.063684589567649], [-1.6560881707936332, 6.065760447503452]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.818,
    26.55,
    0.139,
    'CERSGIS Sentinel-2 Classification',
    2020,
    'https://zenodo.org/records/16579443',
    'Sentinel-2 + Random Forest',
    'v3.9',
    '2026-09-19T14:42:35.139863Z'::timestamptz,
    '2026-09-19T14:42:35.139863Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '02154904-3bce-45d4-a315-06184bc9c991'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-0.6287310368030146, 6.4463460722250305], [-0.6299279905190787, 6.4482196551399475], [-0.6319643834388001, 6.448515140879263], [-0.6335314869240452, 6.4486249558700015], [-0.6345876769033043, 6.446444333193305], [-0.6337947857096318, 6.443640439175067], [-0.6319060785384574, 6.443338473120185], [-0.6284497550265505, 6.443555177499744], [-0.6287310368030146, 6.4463460722250305]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.874,
    34.93,
    0.133,
    'GEDI Canopy LiDAR Validation',
    2022,
    'https://gedi.umd.edu/',
    'Sentinel-2 + Random Forest',
    'v1.1',
    '2026-09-19T14:42:35.139887Z'::timestamptz,
    '2026-09-19T14:42:35.139887Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '9de5fae7-18e6-4294-9a93-f2f6e379009b'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.0156306070465266, 6.224957225850623], [-2.0164529956371866, 6.226584100337383], [-2.0181199391325433, 6.226559406924734], [-2.018872592973478, 6.225067486012682], [-2.0180844451848685, 6.22343118844434], [-2.0168691417635314, 6.223696946002917], [-2.0156306070465266, 6.224957225850623]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.968,
    7.77,
    0.036,
    'Planet NICFI High-Resolution',
    2020,
    'https://www.planet.com/',
    'GEDI LiDAR + ML',
    'v2.9',
    '2026-09-19T14:42:35.139910Z'::timestamptz,
    '2026-09-19T14:42:35.139910Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '5b7f1301-b40a-4cfa-b9f1-d62f7170fee9'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.425461658562684, 5.8554831951541075], [-2.426704808936735, 5.857880365255714], [-2.4281354259604893, 5.858944727366454], [-2.4302863849413563, 5.857305125934214], [-2.4313513425050517, 5.8557565825729165], [-2.430487450898075, 5.854014907297382], [-2.427991297046604, 5.853741685040008], [-2.425972741103193, 5.853404166133453], [-2.425461658562684, 5.8554831951541075]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'parkland'::agroforestry_subtype,
    0.93,
    33.31,
    0.088,
    'CERSGIS Sentinel-2 Classification',
    2023,
    'https://zenodo.org/records/16579443',
    'GEDI LiDAR + ML',
    'v2.1',
    '2026-09-19T14:42:35.139933Z'::timestamptz,
    '2026-09-19T14:42:35.139933Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '2bacc660-2b16-4b3c-8230-670540fe005c'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.591161596927536, 6.990532346931349], [-1.5920787457025587, 6.9928542696102705], [-1.5941950814389714, 6.99304357720229], [-1.5953403253136524, 6.992454544399937], [-1.59577654747863, 6.990897977377875], [-1.5953287015912063, 6.989779643679268], [-1.5936098366134754, 6.989097985701098], [-1.592016676237813, 6.988448337407109], [-1.591161596927536, 6.990532346931349]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.931,
    22.33,
    0.084,
    'CIFOR Ground Truth Survey',
    2021,
    NULL,
    'PlanetScope + CNN',
    'v2.9',
    '2026-09-19T14:42:35.139956Z'::timestamptz,
    '2026-09-19T14:42:35.139956Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'b801d1ae-9515-4010-8eee-1a7b21a62035'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.1198796396864683, 7.401001418975076], [-2.1209835952640237, 7.402543702990513], [-2.1219713831901403, 7.403356026659634], [-2.1233911517894772, 7.403190345577069], [-2.1245655742293548, 7.402149220492616], [-2.125011555061143, 7.399815576842931], [-2.1237792993422357, 7.398592264932157], [-2.122183398812857, 7.39863055840129], [-2.121206690550186, 7.399716157087189], [-2.1198796396864683, 7.401001418975076]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.913,
    26.48,
    0.078,
    'Planet NICFI High-Resolution',
    2024,
    'https://www.planet.com/',
    'GEDI LiDAR + ML',
    'v2.1',
    '2026-09-19T14:42:35.139985Z'::timestamptz,
    '2026-09-19T14:42:35.139985Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'fccf9f32-0760-4ca8-91f4-ccabddb1ac52'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.020887927704798, 6.902431470483732], [-2.0207337345527785, 6.903700046492094], [-2.021960881982888, 6.904149704607122], [-2.0228591488020884, 6.903585632184738], [-2.023686023082886, 6.903170611567876], [-2.0234856996528365, 6.9022917239444], [-2.0226304086065374, 6.90159311298223], [-2.022078886777616, 6.901084057038594], [-2.0212714992407794, 6.901873769753653], [-2.020887927704798, 6.902431470483732]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.827,
    7.18,
    0.229,
    'GEDI Canopy LiDAR Validation',
    2024,
    'https://gedi.umd.edu/',
    'GEDI LiDAR + ML',
    'v2.2',
    '2026-09-19T14:42:35.140009Z'::timestamptz,
    '2026-09-19T14:42:35.140009Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'acc24171-7a7f-4bf4-909d-eff82d017dc7'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-0.7777696196473239, 5.552943893467413], [-0.778133094291107, 5.553605548036788], [-0.7789752301032064, 5.554215259150489], [-0.7795256898246347, 5.554076123703453], [-0.7805530269440026, 5.553254435968594], [-0.7803951184321175, 5.552419227452708], [-0.7797494619756236, 5.551742941636861], [-0.779082959858256, 5.551293507416515], [-0.7776603304623594, 5.551769836869035], [-0.7777696196473239, 5.552943893467413]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.911,
    7.64,
    0.089,
    'Planet NICFI High-Resolution',
    2022,
    'https://www.planet.com/',
    'Hybrid Remote Sensing',
    'v2.1',
    '2026-09-19T14:42:35.140035Z'::timestamptz,
    '2026-09-19T14:42:35.140035Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '7d046c94-2d9f-4c3d-a49f-7b5b93303959'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.962212067466321, 5.670930558913646], [-1.9629923008181338, 5.672860875016923], [-1.9652413796711872, 5.672779835766212], [-1.966221005300566, 5.671505150462034], [-1.9649668527763893, 5.669345828690062], [-1.9627343970468403, 5.669726861699226], [-1.962212067466321, 5.670930558913646]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.794,
    12.02,
    0.105,
    'CIFOR Ground Truth Survey',
    2020,
    NULL,
    'PlanetScope + CNN',
    'v1.7',
    '2026-09-19T14:42:35.140081Z'::timestamptz,
    '2026-09-19T14:42:35.140081Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '94f423a4-2d95-4977-9f0d-145eefbeecb3'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.4717467433643003, 5.735598614311282], [-2.471909794226733, 5.7365231972176485], [-2.4729265503247975, 5.736955609170647], [-2.473667595204823, 5.736586322850709], [-2.474312347027901, 5.735706756095729], [-2.4738297667252027, 5.734347907476454], [-2.4727486555083757, 5.73452186872119], [-2.4722592144222757, 5.7346799003339335], [-2.4717467433643003, 5.735598614311282]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.855,
    5.01,
    0.176,
    'CIFOR Ground Truth Survey',
    2021,
    NULL,
    'Sentinel-2 + Random Forest',
    'v2.0',
    '2026-09-19T14:42:35.140104Z'::timestamptz,
    '2026-09-19T14:42:35.140104Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '582070d8-1861-4c35-b9c0-fd723e7bd2f7'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-0.6134289646395885, 5.706075236585742], [-0.6163824891221711, 5.709693398841811], [-0.6222104512039984, 5.708248641616222], [-0.620256067451061, 5.703874082655323], [-0.6165100319213253, 5.703337324054635], [-0.6134289646395885, 5.706075236585742]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.813,
    50.71,
    0.195,
    'CIFOR Ground Truth Survey',
    2023,
    NULL,
    'Hybrid Remote Sensing',
    'v1.3',
    '2026-09-19T14:42:35.140124Z'::timestamptz,
    '2026-09-19T14:42:35.140124Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '5af8a867-2479-4209-9af9-4bafad50f235'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-0.8697366282261365, 6.723588122336366], [-0.8700558469266672, 6.723961934327572], [-0.870252277835549, 6.724355001185901], [-0.8707506271937973, 6.724181472428387], [-0.8709260841233968, 6.724027979466599], [-0.8711433848219599, 6.723727376760905], [-0.871069646666962, 6.723338214895594], [-0.8707718062482434, 6.722941474181183], [-0.870150862215221, 6.7229670966961], [-0.8699362505379745, 6.723128320273242], [-0.8697366282261365, 6.723588122336366]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.839,
    1.88,
    0.225,
    'CIFOR Ground Truth Survey',
    2021,
    NULL,
    'Sentinel-2 + Random Forest',
    'v3.1',
    '2026-09-19T14:42:35.140149Z'::timestamptz,
    '2026-09-19T14:42:35.140149Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '52680432-7742-45b9-aac1-486d57d8b29d'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.7995789041640444, 6.91713767274168], [-1.7999737762741235, 6.918768186623012], [-1.801599806528665, 6.9188221390942415], [-1.802174610404056, 6.917403951838354], [-1.8016043589053774, 6.916332377213821], [-1.7998482442668897, 6.9161272604920265], [-1.7995789041640444, 6.91713767274168]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.918,
    6.17,
    0.053,
    'CERSGIS Sentinel-2 Classification',
    2023,
    'https://zenodo.org/records/16579443',
    'GEDI LiDAR + ML',
    'v1.7',
    '2026-09-19T14:42:35.140174Z'::timestamptz,
    '2026-09-19T14:42:35.140174Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'fdd9207d-45be-4e1d-844b-83a7281b3381'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.369590061302402, 7.478095746033024], [-1.3693952996416885, 7.478800603369137], [-1.3704727870277953, 7.4792972497102665], [-1.3707558868140024, 7.478783588582948], [-1.3712143583587015, 7.478247969085666], [-1.3710398546453075, 7.477466654287703], [-1.3704477200065897, 7.477332253255222], [-1.3695148749409878, 7.477567448608894], [-1.369590061302402, 7.478095746033024]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.921,
    3.57,
    0.089,
    'GEDI Canopy LiDAR Validation',
    2021,
    'https://gedi.umd.edu/',
    'Sentinel-2 + Random Forest',
    'v2.6',
    '2026-09-19T14:42:35.140196Z'::timestamptz,
    '2026-09-19T14:42:35.140196Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '284ef38b-f7dc-46c5-994a-9fb4f3489a15'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.7331792845410157, 6.548070817772413], [-1.7319704321162805, 6.550175359746839], [-1.7342665609292591, 6.552151309842725], [-1.7368872880149795, 6.550750886820817], [-1.7394441576161883, 6.550206266867107], [-1.7398020357281694, 6.547945326977806], [-1.7388114803401704, 6.5465774737719125], [-1.7367029893634698, 6.543998252242622], [-1.735206797055262, 6.544884077654131], [-1.7329634331254056, 6.546320269235403], [-1.7331792845410157, 6.548070817772413]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.753,
    48.17,
    0.35,
    'CERSGIS Sentinel-2 Classification',
    2023,
    'https://zenodo.org/records/16579443',
    'PlanetScope + CNN',
    'v3.0',
    '2026-09-19T14:42:35.140221Z'::timestamptz,
    '2026-09-19T14:42:35.140221Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '5640d910-85db-4dd9-9ec2-6b17cdd679fc'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.4273231832078266, 7.37954010554942], [-1.4283919422561644, 7.381523192699815], [-1.4297143618342907, 7.381502421142706], [-1.4315776361619552, 7.3807151786723795], [-1.4314317633151554, 7.3783060156674525], [-1.429471291123877, 7.377935860077522], [-1.4283879453213182, 7.378153450860946], [-1.4273231832078266, 7.37954010554942]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.978,
    12.49,
    0.018,
    'GEDI Canopy LiDAR Validation',
    2022,
    'https://gedi.umd.edu/',
    'GEDI LiDAR + ML',
    'v1.5',
    '2026-09-19T14:42:35.140245Z'::timestamptz,
    '2026-09-19T14:42:35.140245Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '28bf9086-299b-4d8f-a9ce-96fd7ae8c2b5'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.9840476076670943, 6.3236795400560695], [-1.9844993453067084, 6.325224016849815], [-1.986144621469401, 6.325620087031214], [-1.9880301851036328, 6.324430014256964], [-1.9873604687402122, 6.322869169340919], [-1.986331398686762, 6.321651939500084], [-1.984565045876087, 6.322703218396575], [-1.9840476076670943, 6.3236795400560695]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.857,
    16.04,
    0.203,
    'Planet NICFI High-Resolution',
    2023,
    'https://www.planet.com/',
    'Sentinel-2 + Random Forest',
    'v2.3',
    '2026-09-19T14:42:35.140267Z'::timestamptz,
    '2026-09-19T14:42:35.140267Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '7610319c-23a7-46c4-bc59-a77874ad0f2c'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.2500346495455212, 6.425367558595094], [-2.249878204176791, 6.426737630669513], [-2.251468978320736, 6.427484647194322], [-2.2532648706278366, 6.4265911027989935], [-2.2533033950383365, 6.425122657058498], [-2.252953436106668, 6.423415272967548], [-2.2515894847326003, 6.4228470513188105], [-2.2505456089229865, 6.424006837761105], [-2.2500346495455212, 6.425367558595094]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.883,
    17.44,
    0.112,
    'GEDI Canopy LiDAR Validation',
    2023,
    'https://gedi.umd.edu/',
    'Hybrid Remote Sensing',
    'v3.7',
    '2026-09-19T14:42:35.140291Z'::timestamptz,
    '2026-09-19T14:42:35.140291Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '0df4ca83-5e48-4012-b624-9c7aafb2eec1'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.213789774016152, 7.384868369316961], [-2.2161085378921523, 7.387831423684135], [-2.2188826523099827, 7.386311267426604], [-2.218919469616519, 7.383854249118883], [-2.2155036565586843, 7.382129162837542], [-2.213789774016152, 7.384868369316961]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.834,
    26.78,
    0.106,
    'CERSGIS Sentinel-2 Classification',
    2022,
    'https://zenodo.org/records/16579443',
    'Sentinel-2 + Random Forest',
    'v3.7',
    '2026-09-19T14:42:35.140313Z'::timestamptz,
    '2026-09-19T14:42:35.140313Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'ae3c46d4-a33a-4fcc-a06a-c6b3f9b6e4e7'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.1097200998986587, 5.734428514027597], [-1.1102151005950063, 5.736180995480248], [-1.1119754644370017, 5.7359889489515306], [-1.1140291454254467, 5.735027953120039], [-1.1135596666129333, 5.732880771871464], [-1.1117578239814743, 5.73257896553426], [-1.1106968213928443, 5.732550968110441], [-1.1097200998986587, 5.734428514027597]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.771,
    15.46,
    0.211,
    'GEDI Canopy LiDAR Validation',
    2021,
    'https://gedi.umd.edu/',
    'Hybrid Remote Sensing',
    'v1.5',
    '2026-09-19T14:42:35.140339Z'::timestamptz,
    '2026-09-19T14:42:35.140339Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '3fd5d179-3a4d-42c1-9a96-5c378c891378'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-0.966167212877391, 6.43796295310924], [-0.9687328746565467, 6.442044754595799], [-0.9722507378204276, 6.440267542401487], [-0.9724104890552708, 6.436626556754796], [-0.968997346814881, 6.435349117867144], [-0.966167212877391, 6.43796295310924]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.944,
    36.83,
    0.069,
    'GEDI Canopy LiDAR Validation',
    2022,
    'https://gedi.umd.edu/',
    'Sentinel-2 + Random Forest',
    'v2.6',
    '2026-09-19T14:42:35.140361Z'::timestamptz,
    '2026-09-19T14:42:35.140361Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '4f1318ec-dd62-45eb-b9a0-08deccdbe807'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-0.6324031983222035, 7.418617089514147], [-0.6329598231124245, 7.420033818845784], [-0.6344425593928879, 7.420702157652059], [-0.6359341743281355, 7.419962974021496], [-0.6354230223107526, 7.418251000375486], [-0.634962857887647, 7.416542183469533], [-0.6330444581519818, 7.417596926284491], [-0.6324031983222035, 7.418617089514147]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.796,
    12.0,
    0.185,
    'GEDI Canopy LiDAR Validation',
    2020,
    'https://gedi.umd.edu/',
    'Hybrid Remote Sensing',
    'v2.5',
    '2026-09-19T14:42:35.140385Z'::timestamptz,
    '2026-09-19T14:42:35.140385Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '6abf9b4a-2f87-4798-a914-975652a05539'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.5368573525242897, 5.895823307883636], [-1.538168194153601, 5.898679493394972], [-1.5416685570402828, 5.89860410332481], [-1.5427033037309144, 5.896481286630346], [-1.5430981601304485, 5.893341077007194], [-1.5413151511702952, 5.892613934856286], [-1.5372252444669219, 5.892434241291173], [-1.5368573525242897, 5.895823307883636]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'homegarden'::agroforestry_subtype,
    0.905,
    38.78,
    0.103,
    'GEDI Canopy LiDAR Validation',
    2023,
    'https://gedi.umd.edu/',
    'PlanetScope + CNN',
    'v2.0',
    '2026-09-19T14:42:35.140409Z'::timestamptz,
    '2026-09-19T14:42:35.140409Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'aa4c59e2-4909-48bb-8da3-6a1c13c7401c'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-0.7628392854694231, 5.74370377704387], [-0.763661845649467, 5.745637025930816], [-0.7643558193819368, 5.746712392352523], [-0.7667303898911096, 5.746663941128576], [-0.7676147176206172, 5.745295325151813], [-0.7686628133852339, 5.742742324424242], [-0.7666701113515214, 5.741426608000527], [-0.7653409394499059, 5.740911801991963], [-0.7629547089871149, 5.742057759454844], [-0.7628392854694231, 5.74370377704387]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.808,
    26.99,
    0.143,
    'CERSGIS Sentinel-2 Classification',
    2023,
    'https://zenodo.org/records/16579443',
    'Sentinel-2 + Random Forest',
    'v2.7',
    '2026-09-19T14:42:35.140432Z'::timestamptz,
    '2026-09-19T14:42:35.140432Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '2fa1e175-340e-4d4a-8819-3f4eeb2ea455'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.325680456018716, 6.303300957899568], [-2.326342851539921, 6.304573637741755], [-2.32754502524705, 6.305563808353538], [-2.3293805960575034, 6.3052472157183015], [-2.329617077841201, 6.302813626399082], [-2.3298409583976367, 6.300763614052727], [-2.3270983416051365, 6.299910967313831], [-2.325747303156935, 6.300676574624926], [-2.325680456018716, 6.303300957899568]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.871,
    23.35,
    0.168,
    'CIFOR Ground Truth Survey',
    2023,
    NULL,
    'Hybrid Remote Sensing',
    'v3.0',
    '2026-09-19T14:42:35.140455Z'::timestamptz,
    '2026-09-19T14:42:35.140455Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '0790e07c-4005-446e-b656-073f51e3bbe9'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.887371216838636, 6.224685715890267], [-1.8880498186536485, 6.226824349115945], [-1.8917403787736975, 6.227477401344994], [-1.893707318591226, 6.225319711299287], [-1.8931255917160266, 6.222714441312201], [-1.8916886386323775, 6.220962528259065], [-1.8885318184593256, 6.2217421144137806], [-1.887371216838636, 6.224685715890267]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.77,
    30.87,
    0.164,
    'GEDI Canopy LiDAR Validation',
    2021,
    'https://gedi.umd.edu/',
    'Hybrid Remote Sensing',
    'v3.7',
    '2026-09-19T14:42:35.140510Z'::timestamptz,
    '2026-09-19T14:42:35.140510Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'd3bbd1b2-ce56-4ac9-8a5f-08df822292fe'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.2011752422091027, 6.635134597497856], [-1.201243211906581, 6.635835294587153], [-1.2019529752463682, 6.63594536976822], [-1.2021472358674916, 6.6352858067775164], [-1.2022565372029286, 6.634740504039805], [-1.2019068564099384, 6.6344561835159], [-1.2012887649439923, 6.634540307104835], [-1.2011752422091027, 6.635134597497856]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.906,
    1.41,
    0.14,
    'Planet NICFI High-Resolution',
    2021,
    'https://www.planet.com/',
    'PlanetScope + CNN',
    'v1.1',
    '2026-09-19T14:42:35.140583Z'::timestamptz,
    '2026-09-19T14:42:35.140583Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'd41b2781-6fd4-43ca-9e20-c05ffc306c32'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.5299715047365199, 6.69596514865547], [-1.5299462572791704, 6.696851276076409], [-1.5318748563868636, 6.697185068721015], [-1.5326032820259223, 6.6978407214228355], [-1.534300348678962, 6.696869095693129], [-1.5339455589716189, 6.69529008863465], [-1.5338370071782557, 6.6939684628014255], [-1.5326848028134588, 6.694018652017402], [-1.531589638362403, 6.6942529088884575], [-1.5299517306005055, 6.694660307674775], [-1.5299715047365199, 6.69596514865547]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.882,
    13.74,
    0.066,
    'GEDI Canopy LiDAR Validation',
    2021,
    'https://gedi.umd.edu/',
    'GEDI LiDAR + ML',
    'v3.2',
    '2026-09-19T14:42:35.140612Z'::timestamptz,
    '2026-09-19T14:42:35.140612Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'a669f93b-ae39-4369-9aa3-bac5dedcf0c6'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.961954166752872, 7.223353250217653], [-1.9626515219167158, 7.224442137942875], [-1.964434546584859, 7.22407565411045], [-1.9642675566688794, 7.222252689204671], [-1.9629177096133372, 7.22174591963069], [-1.961954166752872, 7.223353250217653]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.967,
    5.97,
    0.023,
    'GEDI Canopy LiDAR Validation',
    2023,
    'https://gedi.umd.edu/',
    'PlanetScope + CNN',
    'v3.9',
    '2026-09-19T14:42:35.140633Z'::timestamptz,
    '2026-09-19T14:42:35.140633Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'c281ecd7-2c32-42f9-a716-a6ab947c75ef'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.9925681912400663, 5.668648129600599], [-1.9921762386086275, 5.669521530980519], [-1.9937863898930412, 5.670483891012835], [-1.9947750405625821, 5.670210660593716], [-1.995733915553989, 5.669462379896003], [-1.9957433668427722, 5.66822820779571], [-1.995754797109876, 5.667333494990586], [-1.9944263573275427, 5.6671199239872205], [-1.9931305345912909, 5.666677728755667], [-1.9922932834198974, 5.667501132425421], [-1.9925681912400663, 5.668648129600599]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.819,
    14.11,
    0.157,
    'GEDI Canopy LiDAR Validation',
    2023,
    'https://gedi.umd.edu/',
    'GEDI LiDAR + ML',
    'v2.4',
    '2026-09-19T14:42:35.140658Z'::timestamptz,
    '2026-09-19T14:42:35.140658Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '2c9ab64b-7fb4-4bdc-9fba-e7b9318ace9a'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.2183466184663345, 6.822592622540809], [-2.2179961848003105, 6.825327604636924], [-2.220072963049748, 6.825241849549734], [-2.2221800887195107, 6.82531510432758], [-2.2233023231749973, 6.82402766609117], [-2.223729256306007, 6.823134088416673], [-2.223048208703586, 6.8214175741144345], [-2.2220277646526054, 6.820288002293396], [-2.2194924611482825, 6.819733016251489], [-2.2185120018561295, 6.820391131962519], [-2.2183466184663345, 6.822592622540809]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'homegarden'::agroforestry_subtype,
    0.975,
    32.25,
    0.022,
    'GEDI Canopy LiDAR Validation',
    2021,
    'https://gedi.umd.edu/',
    'PlanetScope + CNN',
    'v3.1',
    '2026-09-19T14:42:35.140682Z'::timestamptz,
    '2026-09-19T14:42:35.140682Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '586e3fe8-371b-49ed-8753-1b5d66151b99'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.6732887579378746, 5.767110250432869], [-1.6733873582909848, 5.767417787800795], [-1.6741661605539921, 5.767863728898719], [-1.6745379427884821, 5.7680482081388345], [-1.6749882512780438, 5.767321567386877], [-1.675036910681318, 5.766888460535027], [-1.6753010232936056, 5.766274093076081], [-1.67440555457087, 5.766165338163204], [-1.6740238343080325, 5.76627791658872], [-1.673643791206359, 5.766271237544865], [-1.6732887579378746, 5.767110250432869]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.932,
    3.46,
    0.041,
    'GEDI Canopy LiDAR Validation',
    2021,
    'https://gedi.umd.edu/',
    'PlanetScope + CNN',
    'v2.7',
    '2026-09-19T14:42:35.140711Z'::timestamptz,
    '2026-09-19T14:42:35.140711Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '65df6ec1-65c6-4771-a8b6-6c36a53ae8e7'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.1556998361980417, 5.871270787900177], [-2.1555281155341666, 5.873397514805194], [-2.1581790892207473, 5.876028159436865], [-2.1612888302806845, 5.875326131313777], [-2.1626883808631305, 5.873363955281215], [-2.162723702835711, 5.870192513152958], [-2.1614542700058, 5.868106139649732], [-2.1583431464373213, 5.8670020054367615], [-2.1559546687373903, 5.869570760179712], [-2.1556998361980417, 5.871270787900177]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'homegarden'::agroforestry_subtype,
    0.795,
    67.24,
    0.15,
    'Planet NICFI High-Resolution',
    2022,
    'https://www.planet.com/',
    'Sentinel-2 + Random Forest',
    'v3.9',
    '2026-09-19T14:42:35.140764Z'::timestamptz,
    '2026-09-19T14:42:35.140764Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '0c17a70c-2f35-4d4d-8db7-87f9cfce9d76'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.5342327819021777, 6.974113274931942], [-1.53532625049214, 6.976816737789537], [-1.538217245954269, 6.9754654835003995], [-1.5378783696814682, 6.973222134025682], [-1.5361307580594408, 6.972642475217856], [-1.5342327819021777, 6.974113274931942]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.787,
    12.81,
    0.235,
    'Planet NICFI High-Resolution',
    2023,
    'https://www.planet.com/',
    'PlanetScope + CNN',
    'v2.3',
    '2026-09-19T14:42:35.140789Z'::timestamptz,
    '2026-09-19T14:42:35.140789Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'a4c8b5a6-6a1c-4740-8ffb-5d507213b1eb'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.463004994159911, 7.065702614758711], [-2.4650017877138963, 7.067749197396907], [-2.4667518340105703, 7.06872249223908], [-2.4684405353922774, 7.066084627612418], [-2.469428669143833, 7.0639833778894], [-2.4671209421049425, 7.062399913911391], [-2.4638735798680473, 7.062884799266633], [-2.463004994159911, 7.065702614758711]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.901,
    39.46,
    0.084,
    'CIFOR Ground Truth Survey',
    2023,
    NULL,
    'GEDI LiDAR + ML',
    'v3.2',
    '2026-09-19T14:42:35.140813Z'::timestamptz,
    '2026-09-19T14:42:35.140813Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '2a761b65-67ce-4c42-835d-136f691dc936'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.1566544732665425, 6.6803336132496876], [-2.159218190879486, 6.685082730593332], [-2.162850364218579, 6.684148329935101], [-2.16630556000046, 6.6819129687276515], [-2.164860116570184, 6.679011799137722], [-2.1620136298576855, 6.676367301986732], [-2.15837225632306, 6.677554940260492], [-2.1566544732665425, 6.6803336132496876]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.856,
    71.37,
    0.18,
    'CERSGIS Sentinel-2 Classification',
    2024,
    'https://zenodo.org/records/16579443',
    'GEDI LiDAR + ML',
    'v3.6',
    '2026-09-19T14:42:35.140835Z'::timestamptz,
    '2026-09-19T14:42:35.140835Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'dd9f85ef-c61d-4ed5-8501-8a12564864d2'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.6720294580387363, 7.049872027602034], [-1.6724523433522127, 7.0503132498219205], [-1.6730730936089677, 7.050219725570051], [-1.673604892443725, 7.049797127679853], [-1.6729030589659923, 7.0492923347553464], [-1.67238338076542, 7.0493682069664105], [-1.6720294580387363, 7.049872027602034]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.913,
    1.65,
    0.068,
    'CIFOR Ground Truth Survey',
    2020,
    NULL,
    'PlanetScope + CNN',
    'v1.2',
    '2026-09-19T14:42:35.140860Z'::timestamptz,
    '2026-09-19T14:42:35.140860Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '4e8070e0-be92-4d98-87ea-bba6a3b0888d'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-0.642866636043169, 6.958469003051894], [-0.6429591178004208, 6.9589335853192225], [-0.6435484238812617, 6.959363539781689], [-0.6441150011587777, 6.95893619548978], [-0.6443915295240372, 6.958426720048679], [-0.6443526852359032, 6.957867885575181], [-0.6435475831635312, 6.9578218312131215], [-0.642895491706765, 6.957866180223668], [-0.642866636043169, 6.958469003051894]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.817,
    2.52,
    0.114,
    'Planet NICFI High-Resolution',
    2021,
    'https://www.planet.com/',
    'GEDI LiDAR + ML',
    'v2.0',
    '2026-09-19T14:42:35.140883Z'::timestamptz,
    '2026-09-19T14:42:35.140883Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'eb89f137-88d1-4417-81c4-864e32cd5986'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.014086983707334, 5.6595939781186715], [-1.0138940605686562, 5.662090057653724], [-1.0155172229350709, 5.661823768410212], [-1.0177326343039717, 5.661518398658777], [-1.0184989468430132, 5.659884154031251], [-1.0170453064744338, 5.658601550341635], [-1.015794404061645, 5.656883094267902], [-1.0141969945060232, 5.658863936270548], [-1.014086983707334, 5.6595939781186715]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.835,
    21.37,
    0.237,
    'CERSGIS Sentinel-2 Classification',
    2021,
    'https://zenodo.org/records/16579443',
    'PlanetScope + CNN',
    'v3.6',
    '2026-09-19T14:42:35.140906Z'::timestamptz,
    '2026-09-19T14:42:35.140906Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '20ef9dac-e6fb-43d2-b619-77859a94ae82'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.6338907890023835, 5.536893776359784], [-1.6343024712354457, 5.537997850041726], [-1.6355799897254695, 5.538007199220828], [-1.636125732988578, 5.537142957717977], [-1.635729502501215, 5.535668733723239], [-1.634041276516945, 5.535888078395385], [-1.6338907890023835, 5.536893776359784]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.878,
    5.73,
    0.108,
    'CERSGIS Sentinel-2 Classification',
    2022,
    'https://zenodo.org/records/16579443',
    'GEDI LiDAR + ML',
    'v3.8',
    '2026-09-19T14:42:35.140930Z'::timestamptz,
    '2026-09-19T14:42:35.140930Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'a4ee4ebf-9344-4613-9391-5deb6122f044'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.1782181400581972, 6.17948806673234], [-1.1789765411349673, 6.182604809699458], [-1.182793064742227, 6.183743926021835], [-1.185014166288474, 6.180963942531722], [-1.184433929912361, 6.178741808471857], [-1.1821878292435521, 6.176230627166912], [-1.1806374005667255, 6.178335445164496], [-1.1782181400581972, 6.17948806673234]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.903,
    43.06,
    0.078,
    'GEDI Canopy LiDAR Validation',
    2022,
    'https://gedi.umd.edu/',
    'GEDI LiDAR + ML',
    'v1.6',
    '2026-09-19T14:42:35.140953Z'::timestamptz,
    '2026-09-19T14:42:35.140953Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '82a16405-069b-45b3-808a-e7d8b33baac0'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-0.9767684975209673, 5.988376542742964], [-0.9773900060492381, 5.990136672023489], [-0.9790682005107497, 5.99110324594166], [-0.9805640608031947, 5.990101700682994], [-0.9814501695478814, 5.989492934753896], [-0.9814867844922879, 5.987698449395005], [-0.9801401123525647, 5.98690304342924], [-0.9786263791808452, 5.98603860772802], [-0.9784746222084884, 5.987496873158813], [-0.9767684975209673, 5.988376542742964]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.863,
    23.7,
    0.146,
    'CERSGIS Sentinel-2 Classification',
    2021,
    'https://zenodo.org/records/16579443',
    'Sentinel-2 + Random Forest',
    'v3.9',
    '2026-09-19T14:42:35.140987Z'::timestamptz,
    '2026-09-19T14:42:35.140987Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'e39498c8-6f2f-4915-843d-596093c24e6f'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-0.8991524700468508, 5.62336136309157], [-0.9009444726802789, 5.625488408498914], [-0.9025386219098629, 5.625899169586525], [-0.9052217115680771, 5.624271977841884], [-0.905589176371423, 5.622045181440601], [-0.9036275252476339, 5.619834925281779], [-0.9004355295567346, 5.621127260269337], [-0.8991524700468508, 5.62336136309157]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.977,
    35.69,
    0.024,
    'CERSGIS Sentinel-2 Classification',
    2020,
    'https://zenodo.org/records/16579443',
    'Hybrid Remote Sensing',
    'v1.2',
    '2026-09-19T14:42:35.141010Z'::timestamptz,
    '2026-09-19T14:42:35.141010Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'd05c96b3-eefb-4a68-9d49-ecf9180cdcc7'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.415193523680095, 6.5597213874668165], [-2.416091138449881, 6.560705903138852], [-2.4185461696077444, 6.562037465902247], [-2.421737363061385, 6.562166412981031], [-2.4232418229603825, 6.559620467444319], [-2.4219653496361033, 6.557688258514276], [-2.4199217700243945, 6.556642276553937], [-2.4185864353776996, 6.555587872781436], [-2.4162127056916214, 6.557123401082272], [-2.415193523680095, 6.5597213874668165]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.885,
    54.59,
    0.146,
    'GEDI Canopy LiDAR Validation',
    2023,
    'https://gedi.umd.edu/',
    'GEDI LiDAR + ML',
    'v1.8',
    '2026-09-19T14:42:35.141033Z'::timestamptz,
    '2026-09-19T14:42:35.141033Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'ff0fdb30-57ee-4c33-8dad-41148475d4fc'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.6022300198111368, 6.686171524368114], [-1.6024618190747895, 6.68668508926106], [-1.603521057227136, 6.687341470370543], [-1.6047412776767715, 6.6879066449022835], [-1.6055877047305638, 6.686893308948711], [-1.60596311820017, 6.685848678222298], [-1.6052917563330333, 6.684490169273192], [-1.6040049300621648, 6.684598535490783], [-1.603603788112679, 6.684861818031678], [-1.6024979111000113, 6.68463010561415], [-1.6022300198111368, 6.686171524368114]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.821,
    12.56,
    0.203,
    'CIFOR Ground Truth Survey',
    2023,
    NULL,
    'GEDI LiDAR + ML',
    'v1.2',
    '2026-09-19T14:42:35.141057Z'::timestamptz,
    '2026-09-19T14:42:35.141057Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '81008cc9-f321-426a-b897-f1c28bc22433'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-0.5852756810714258, 7.0898074310091594], [-0.5839988648048839, 7.091640818327069], [-0.5868908664473964, 7.0938131667131845], [-0.5885536508961772, 7.091995190460494], [-0.5909555020899677, 7.092345773186886], [-0.5910850281176135, 7.08927842714462], [-0.590591975452566, 7.08702096827203], [-0.5886144301918284, 7.085366512195578], [-0.586940456373576, 7.086863923886259], [-0.5856939929821556, 7.087961298542127], [-0.5852756810714258, 7.0898074310091594]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.902,
    61.7,
    0.11,
    'GEDI Canopy LiDAR Validation',
    2021,
    'https://gedi.umd.edu/',
    'Sentinel-2 + Random Forest',
    'v3.1',
    '2026-09-19T14:42:35.141083Z'::timestamptz,
    '2026-09-19T14:42:35.141083Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '2570ba12-56dd-422f-b643-fdb029ad2487'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-0.5152116637132611, 6.765621603543226], [-0.5164455212201299, 6.7667122494784095], [-0.5184108567834561, 6.766756171003956], [-0.5195194666058972, 6.765724249340222], [-0.5178240642165679, 6.763960087881689], [-0.5161212330271163, 6.763701012148899], [-0.5152116637132611, 6.765621603543226]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.805,
    11.43,
    0.133,
    'CERSGIS Sentinel-2 Classification',
    2023,
    'https://zenodo.org/records/16579443',
    'Sentinel-2 + Random Forest',
    'v1.1',
    '2026-09-19T14:42:35.141107Z'::timestamptz,
    '2026-09-19T14:42:35.141107Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '92bfe40b-07e6-420f-92b7-d7a23ea3edfe'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.3663326721900613, 6.678710876729608], [-2.3679956208740798, 6.681244235910248], [-2.369921420359072, 6.6815598211358065], [-2.371286733412188, 6.679195441243527], [-2.369754345674203, 6.67745101406587], [-2.3679129677018933, 6.677792754369175], [-2.3663326721900613, 6.678710876729608]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.774,
    18.54,
    0.271,
    'GEDI Canopy LiDAR Validation',
    2023,
    'https://gedi.umd.edu/',
    'Hybrid Remote Sensing',
    'v2.7',
    '2026-09-19T14:42:35.141130Z'::timestamptz,
    '2026-09-19T14:42:35.141130Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'c92275dc-e409-4fae-a477-a03fd1876ef1'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.0204732268724115, 6.976144536493296], [-1.0206489203323854, 6.976797373708546], [-1.0211012557591512, 6.977789398593771], [-1.0218603754360984, 6.977470709452536], [-1.022318097946722, 6.9771992685294215], [-1.022391071397141, 6.976400080060507], [-1.0221771222084508, 6.975493397927678], [-1.0219433298607685, 6.975034395430774], [-1.0208527239586813, 6.974815147528003], [-1.0204217863346587, 6.975615675532065], [-1.0204732268724115, 6.976144536493296]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.751,
    4.61,
    0.281,
    'Planet NICFI High-Resolution',
    2020,
    'https://www.planet.com/',
    'GEDI LiDAR + ML',
    'v3.1',
    '2026-09-19T14:42:35.141157Z'::timestamptz,
    '2026-09-19T14:42:35.141157Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '99c33935-afdd-4df5-bf83-36da20ac1808'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.6353721688756186, 7.338730896380636], [-1.6362284816014365, 7.339494334615506], [-1.636739611600872, 7.340444971215762], [-1.6373153977329158, 7.339878240975341], [-1.638465203346461, 7.339247625403949], [-1.6385285587351315, 7.338374188581561], [-1.637357402963256, 7.337918690088813], [-1.6364947281544084, 7.337125799564627], [-1.6356305016340544, 7.337874398919898], [-1.6353721688756186, 7.338730896380636]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.864,
    9.3,
    0.143,
    'Planet NICFI High-Resolution',
    2022,
    'https://www.planet.com/',
    'Hybrid Remote Sensing',
    'v3.8',
    '2026-09-19T14:42:35.141180Z'::timestamptz,
    '2026-09-19T14:42:35.141180Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '75a23bf7-e2d9-47d5-82bd-59f908590142'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.6628866782225422, 6.215086539158345], [-1.6633685178650934, 6.2170553001895605], [-1.6654579696207175, 6.218814670273082], [-1.667417235743347, 6.218001389465546], [-1.6699540701592261, 6.21589048592534], [-1.6681642163977095, 6.213738519188155], [-1.666966460174432, 6.21261557598695], [-1.6658049421469054, 6.211722998386764], [-1.6639495665336976, 6.213035913962296], [-1.6628866782225422, 6.215086539158345]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'alley_cropping'::agroforestry_subtype,
    0.922,
    45.76,
    0.1,
    'GEDI Canopy LiDAR Validation',
    2023,
    'https://gedi.umd.edu/',
    'PlanetScope + CNN',
    'v3.9',
    '2026-09-19T14:42:35.141206Z'::timestamptz,
    '2026-09-19T14:42:35.141206Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '3b241a3d-cd2f-46dc-9f28-2dc663ee9d46'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.10417777980202, 7.3721816036605725], [-1.1049812033422473, 7.373625825213012], [-1.1065002907683537, 7.373919495835229], [-1.108436343103389, 7.37244870911337], [-1.108058243140287, 7.3714124042685105], [-1.1069233398138285, 7.369922278698742], [-1.1042904713457489, 7.3698363509336735], [-1.10417777980202, 7.3721816036605725]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.871,
    13.86,
    0.116,
    'GEDI Canopy LiDAR Validation',
    2021,
    'https://gedi.umd.edu/',
    'GEDI LiDAR + ML',
    'v1.0',
    '2026-09-19T14:42:35.141232Z'::timestamptz,
    '2026-09-19T14:42:35.141232Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '843de4bb-eba9-485b-960a-746593eea491'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-2.005674603468015, 5.661881846952886], [-2.007346828302913, 5.663944049037039], [-2.009250673831642, 5.662893698746593], [-2.0091593130855134, 5.660092370064755], [-2.007458112899297, 5.659701141046735], [-2.005674603468015, 5.661881846952886]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'homegarden'::agroforestry_subtype,
    0.915,
    13.37,
    0.044,
    'CIFOR Ground Truth Survey',
    2022,
    NULL,
    'Sentinel-2 + Random Forest',
    'v2.9',
    '2026-09-19T14:42:35.141255Z'::timestamptz,
    '2026-09-19T14:42:35.141255Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'd031c111-7f65-4c5d-a4c7-c0130f002a6e'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'GH-AH' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-1.2422208977513811, 6.716049063112622], [-1.2437766876987517, 6.7181630545285635], [-1.2457558555916513, 6.717119770484011], [-1.2461899079620415, 6.714954960618453], [-1.2441305529461448, 6.714223812159134], [-1.2422208977513811, 6.716049063112622]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_cocoa'::agroforestry_subtype,
    0.956,
    13.85,
    0.041,
    'CERSGIS Sentinel-2 Classification',
    2023,
    'https://zenodo.org/records/16579443',
    'GEDI LiDAR + ML',
    'v3.1',
    '2026-09-19T14:42:35.141289Z'::timestamptz,
    '2026-09-19T14:42:35.141289Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '23e181ba-6ead-40fd-943b-793be9f281c6'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[36.78884440789311, 6.530969837227786], [36.78869470599022, 6.53175166071382], [36.78769910962012, 6.532567993503047], [36.78701685475645, 6.531747906746818], [36.78637202787977, 6.531457791847285], [36.78587380768123, 6.530646540057646], [36.78703900528384, 6.529796289207035], [36.788089176543906, 6.529461027394327], [36.78855977555245, 6.529861732247121], [36.78884440789311, 6.530969837227786]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'woodlot'::agroforestry_subtype,
    0.928,
    9.52,
    0.075,
    'Local Extension Agent Surveys',
    2021,
    NULL,
    'Hybrid Remote Sensing',
    'v3.6',
    '2026-09-19T14:42:35.141319Z'::timestamptz,
    '2026-09-19T14:42:35.141319Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'ae3ea09a-3eac-46b1-8e2c-8207e3f7360f'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[35.881392068716046, 6.758110645842978], [35.881404768895415, 6.7594929092567], [35.8796664682477, 6.76001138211224], [35.87820908423767, 6.758928378608762], [35.87818353322067, 6.757717736377157], [35.878930783728315, 6.75655069567911], [35.88019140742606, 6.755937878845755], [35.881003690046995, 6.756937474508318], [35.881392068716046, 6.758110645842978]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'woodlot'::agroforestry_subtype,
    0.764,
    14.35,
    0.284,
    'Local Extension Agent Surveys',
    2023,
    NULL,
    'Hybrid Remote Sensing',
    'v1.9',
    '2026-09-19T14:42:35.141365Z'::timestamptz,
    '2026-09-19T14:42:35.141365Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '5f0938ef-b092-43da-9e90-69d61dbb8cc4'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[39.16551020549504, 9.128358353129359], [39.16487940544706, 9.129806039388583], [39.16372107676706, 9.130748359235922], [39.16266580362931, 9.130474666265908], [39.16136862821217, 9.12912607771252], [39.1610760392123, 9.127857384709031], [39.16118032923042, 9.126210047354556], [39.16296009749459, 9.12639933167461], [39.16403455255161, 9.126080373250495], [39.16507363736191, 9.126762644771702], [39.16551020549504, 9.128358353129359]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'forest_farming'::agroforestry_subtype,
    0.846,
    18.15,
    0.17,
    'Ethiopia Open Data Portal',
    2022,
    NULL,
    'Sentinel-2 + Random Forest',
    'v2.3',
    '2026-09-19T14:42:35.141389Z'::timestamptz,
    '2026-09-19T14:42:35.141389Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '60d56256-94bf-4628-82f5-c9646c8ef85f'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[35.66004560983124, 6.6148562364108505], [35.65952389294353, 6.6162676303312535], [35.65899679390261, 6.618034196483161], [35.65628978040439, 6.617388061662266], [35.65590231112125, 6.615682241210851], [35.65546267327059, 6.613248641693566], [35.65651041525477, 6.613078767311757], [35.65819425686972, 6.612478274173917], [35.66069317947064, 6.612836320278153], [35.66004560983124, 6.6148562364108505]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'forest_farming'::agroforestry_subtype,
    0.927,
    31.19,
    0.065,
    'Sentinel-2 NDVI Time Series',
    2021,
    NULL,
    'Hybrid Remote Sensing',
    'v1.7',
    '2026-09-19T14:42:35.141413Z'::timestamptz,
    '2026-09-19T14:42:35.141413Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '371e98e1-4dea-43b7-b0c3-6c0c11034a54'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[36.397474945747796, 8.536832534307461], [36.396582751833265, 8.538409710862176], [36.394946834250895, 8.539598782636306], [36.39356395800996, 8.539168223279054], [36.39248392633747, 8.537644128262992], [36.39365051130621, 8.535837482974042], [36.39488123170447, 8.535691782945298], [36.397070654234035, 8.535804561644724], [36.397474945747796, 8.536832534307461]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.896,
    19.25,
    0.143,
    'Sentinel-2 NDVI Time Series',
    2020,
    NULL,
    'Sentinel-2 + Random Forest',
    'v1.1',
    '2026-09-19T14:42:35.141442Z'::timestamptz,
    '2026-09-19T14:42:35.141442Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '49b44c05-c9de-460f-aac6-deaed636a4b9'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[39.46985323581076, 6.916148833475492], [39.469702689500906, 6.917239169697256], [39.46852520981053, 6.917043440163573], [39.46738991555886, 6.917478026935151], [39.46674834812267, 6.916119874346598], [39.46752926514064, 6.915372757040387], [39.46861300991904, 6.914806899439346], [39.46938829743126, 6.914732791972907], [39.46985323581076, 6.916148833475492]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.847,
    6.83,
    0.229,
    'Sentinel-2 NDVI Time Series',
    2021,
    NULL,
    'PlanetScope + CNN',
    'v2.3',
    '2026-09-19T14:42:35.141466Z'::timestamptz,
    '2026-09-19T14:42:35.141466Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'a5166e4e-f6ea-4747-ac84-386dae3c02d7'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[35.88902731595357, 8.406658739415882], [35.886532890847235, 8.408611745526809], [35.884611464059724, 8.408037609297898], [35.88430759246719, 8.404892835536842], [35.88661109527356, 8.404603731053461], [35.88902731595357, 8.406658739415882]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.939,
    17.97,
    0.058,
    'Sentinel-2 NDVI Time Series',
    2022,
    NULL,
    'Hybrid Remote Sensing',
    'v3.7',
    '2026-09-19T14:42:35.141489Z'::timestamptz,
    '2026-09-19T14:42:35.141489Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'c35cf2cc-0334-4790-9127-0ea1824de798'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.225340899907685, 9.19664611413623], [37.224551856373594, 9.19733064878381], [37.223233998214525, 9.197346102291844], [37.22274875603085, 9.196391841257537], [37.223425302648856, 9.19571037996633], [37.22453532256409, 9.195235064410566], [37.225340899907685, 9.19664611413623]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.74,
    4.68,
    0.343,
    'Sentinel-2 NDVI Time Series',
    2024,
    NULL,
    'Sentinel-2 + Random Forest',
    'v2.8',
    '2026-09-19T14:42:35.141510Z'::timestamptz,
    '2026-09-19T14:42:35.141510Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'e69f5749-990c-4baf-9adc-dcc8d4ecb230'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.50270147898298, 7.38474368492288], [37.50194154832209, 7.385096809967204], [37.50182282664644, 7.385671353471992], [37.50093647853844, 7.385394593375693], [37.50055259123414, 7.384769761897898], [37.50052677038106, 7.384082822551336], [37.5008105609791, 7.383692526739075], [37.50156407499057, 7.383685007463941], [37.502026844723915, 7.384050004103382], [37.50270147898298, 7.38474368492288]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.77,
    3.63,
    0.22,
    'Agroforestry Research Network',
    2024,
    NULL,
    'Sentinel-2 + Random Forest',
    'v2.7',
    '2026-09-19T14:42:35.141541Z'::timestamptz,
    '2026-09-19T14:42:35.141541Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'd60e96c2-32da-4c65-b44b-947fcc32d905'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[36.200339045977586, 9.216103375208867], [36.19854413178847, 9.217204587651317], [36.19644783830211, 9.218157017943714], [36.19484953937547, 9.21696729292562], [36.19418575193736, 9.21374358057871], [36.19668594470117, 9.213582917071083], [36.198635568105615, 9.212921609262883], [36.200339045977586, 9.216103375208867]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.767,
    32.47,
    0.229,
    'Sentinel-2 NDVI Time Series',
    2024,
    NULL,
    'Sentinel-2 + Random Forest',
    'v2.9',
    '2026-09-19T14:42:35.141564Z'::timestamptz,
    '2026-09-19T14:42:35.141564Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'd8586d22-3419-438c-9df5-d1303e5c8d3a'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[38.281080904499476, 8.837649145504862], [38.28108316338942, 8.837992876246995], [38.28067281897812, 8.838160189475213], [38.28027653094175, 8.83833034580344], [38.280046132013375, 8.83787095180088], [38.279970442046206, 8.83743239273658], [38.28028836963772, 8.837082172459509], [38.28066109173111, 8.837034345545327], [38.28120304871349, 8.837262529872367], [38.281080904499476, 8.837649145504862]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.909,
    1.29,
    0.125,
    'Sentinel-2 NDVI Time Series',
    2023,
    NULL,
    'Sentinel-2 + Random Forest',
    'v1.3',
    '2026-09-19T14:42:35.141588Z'::timestamptz,
    '2026-09-19T14:42:35.141588Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '4d1f320c-dfcd-4bcd-a973-8380199e3023'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[38.833354326832044, 7.011292711960897], [38.832934496835556, 7.01293035434476], [38.83155125951723, 7.012558368440366], [38.83065335254002, 7.012026443488014], [38.8304588146277, 7.010602272562286], [38.83184015254479, 7.009853827870323], [38.83272411171519, 7.009796221272649], [38.833354326832044, 7.011292711960897]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.825,
    8.51,
    0.14,
    'Ethiopia Open Data Portal',
    2023,
    NULL,
    'Sentinel-2 + Random Forest',
    'v2.0',
    '2026-09-19T14:42:35.141614Z'::timestamptz,
    '2026-09-19T14:42:35.141614Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'd8524e21-b3b5-4493-b436-fb7f7cbc5bee'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[35.12055154137735, 6.573583366314063], [35.119054335175974, 6.575999826903849], [35.11600369074376, 6.574472579645217], [35.11598930034074, 6.572002205335707], [35.11840695251044, 6.570458659083192], [35.12055154137735, 6.573583366314063]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.822,
    20.38,
    0.24,
    'Sentinel-2 NDVI Time Series',
    2023,
    NULL,
    'Sentinel-2 + Random Forest',
    'v1.3',
    '2026-09-19T14:42:35.141638Z'::timestamptz,
    '2026-09-19T14:42:35.141638Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '3727c776-b117-431b-8afe-64b4971e4fd3'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[36.97763740533268, 8.519967002094072], [36.97646385203569, 8.521942662920877], [36.975371693618385, 8.523319944989229], [36.97337378169655, 8.522364427370642], [36.973108114304644, 8.520863410050568], [36.97311736882857, 8.519911940134705], [36.973752791157565, 8.518161832831716], [36.97552050871998, 8.518082699006582], [36.976945016214124, 8.518670776863951], [36.97763740533268, 8.519967002094072]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.754,
    23.71,
    0.343,
    'Sentinel-2 NDVI Time Series',
    2023,
    NULL,
    'Hybrid Remote Sensing',
    'v3.8',
    '2026-09-19T14:42:35.141664Z'::timestamptz,
    '2026-09-19T14:42:35.141664Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '19009451-a5c0-443a-baf9-0d18ba275920'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.084067454835704, 8.128014180502776], [37.083690717221444, 8.12960837169361], [37.08212943867313, 8.128744405501727], [37.08209359458962, 8.127534124548033], [37.08310621664353, 8.127189975209907], [37.084067454835704, 8.128014180502776]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'woodlot'::agroforestry_subtype,
    0.743,
    4.28,
    0.222,
    'Agroforestry Research Network',
    2022,
    NULL,
    'GEDI LiDAR + ML',
    'v3.6',
    '2026-09-19T14:42:35.141734Z'::timestamptz,
    '2026-09-19T14:42:35.141734Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '57ccc5c1-577f-421a-b70d-4106a3f1b184'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[36.81101521493407, 8.76464616051385], [36.81076855948551, 8.76648215904173], [36.80764595779154, 8.76720392098257], [36.80598888137726, 8.766157562397092], [36.80586298118953, 8.763676740880932], [36.80817455206326, 8.762716837441756], [36.80993688237492, 8.76268737801641], [36.81101521493407, 8.76464616051385]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.783,
    21.32,
    0.153,
    'Ethiopia Open Data Portal',
    2024,
    NULL,
    'GEDI LiDAR + ML',
    'v1.8',
    '2026-09-19T14:42:35.141788Z'::timestamptz,
    '2026-09-19T14:42:35.141788Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'b42d4aa3-684a-482a-8f19-1719dc9e7d6b'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[36.12704049222221, 8.90225915479193], [36.12570577568156, 8.903847112912915], [36.12415024200001, 8.904540870232081], [36.1221805981753, 8.90437846547102], [36.12250490471647, 8.902242615353055], [36.122358817689545, 8.900749430445355], [36.12384658836039, 8.899761700963621], [36.125725861317385, 8.901146469352865], [36.12704049222221, 8.90225915479193]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.84,
    23.09,
    0.08,
    'Agroforestry Research Network',
    2021,
    NULL,
    'PlanetScope + CNN',
    'v2.5',
    '2026-09-19T14:42:35.141818Z'::timestamptz,
    '2026-09-19T14:42:35.141818Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '074cb844-49ae-42bb-a594-dbb5ec8f7555'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[38.67396069882668, 7.612896766536527], [38.67403440840793, 7.613906030248606], [38.67252901883709, 7.61439670215325], [38.67178721647154, 7.613751703798375], [38.671440822035564, 7.613384933819214], [38.67144810717049, 7.6122793709771495], [38.67176611664903, 7.611602822316983], [38.672963145268845, 7.61127384136107], [38.67365611055022, 7.611838625669381], [38.67396069882668, 7.612896766536527]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.812,
    8.57,
    0.264,
    'Sentinel-2 NDVI Time Series',
    2020,
    NULL,
    'GEDI LiDAR + ML',
    'v3.0',
    '2026-09-19T14:42:35.141845Z'::timestamptz,
    '2026-09-19T14:42:35.141845Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'b4069985-0cec-4976-a3db-669eb4cb9e2c'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.30949370868027, 6.89075867999635], [37.309204391082034, 6.891343294761593], [37.30848437810009, 6.891148006884401], [37.30847617906424, 6.890299858184403], [37.30901273686016, 6.8902978889088144], [37.30949370868027, 6.89075867999635]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.92,
    0.93,
    0.114,
    'Ethiopia Open Data Portal',
    2024,
    NULL,
    'Hybrid Remote Sensing',
    'v2.4',
    '2026-09-19T14:42:35.141871Z'::timestamptz,
    '2026-09-19T14:42:35.141871Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'b747ff11-99cf-4318-bf9b-5b91dbf67afc'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[39.201612739745926, 9.12363557240184], [39.19953327997712, 9.125399599121392], [39.1960692274927, 9.125111089726557], [39.19672536863708, 9.122342803590985], [39.19881485083458, 9.121373627194567], [39.201612739745926, 9.12363557240184]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.733,
    22.1,
    0.151,
    'Local Extension Agent Surveys',
    2021,
    NULL,
    'GEDI LiDAR + ML',
    'v1.6',
    '2026-09-19T14:42:35.141893Z'::timestamptz,
    '2026-09-19T14:42:35.141893Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '8fb2bf89-1be5-47e4-8e7a-15340a4d83fe'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[38.55512460224828, 7.390929815840442], [38.55464088066131, 7.391814121623819], [38.55434516535543, 7.392544279716842], [38.55307939635421, 7.392406127779767], [38.55234258235089, 7.39217951454966], [38.55223955547471, 7.391244784104062], [38.552706883979766, 7.390545951290948], [38.553367903005885, 7.389697403583042], [38.553941875076895, 7.389773574268436], [38.55513207860506, 7.390350455696345], [38.55512460224828, 7.390929815840442]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.8,
    8.54,
    0.177,
    'Ethiopia Open Data Portal',
    2023,
    NULL,
    'Hybrid Remote Sensing',
    'v1.4',
    '2026-09-19T14:42:35.141918Z'::timestamptz,
    '2026-09-19T14:42:35.141918Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '76fa956a-fa57-4fa5-b939-72914434c110'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[36.57420356252714, 7.6452540873244885], [36.57343964026284, 7.646652777981477], [36.57212237295508, 7.647170758677178], [36.57078096340357, 7.646051027046639], [36.570559729129315, 7.643997632217842], [36.57210768969537, 7.642865010834051], [36.57374508646426, 7.643784986647989], [36.57420356252714, 7.6452540873244885]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.757,
    13.7,
    0.128,
    'Ethiopia Open Data Portal',
    2024,
    NULL,
    'Sentinel-2 + Random Forest',
    'v1.2',
    '2026-09-19T14:42:35.141969Z'::timestamptz,
    '2026-09-19T14:42:35.141969Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '1e4a9043-5de2-442e-9334-2f63e0ee85f6'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.28833533077602, 7.82876964333738], [37.28673860472184, 7.830958741456582], [37.28423882939428, 7.83007683406672], [37.282703321717335, 7.828619106939207], [37.284431314077295, 7.826544043872999], [37.286489262441755, 7.826585903689438], [37.28833533077602, 7.82876964333738]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'forest_farming'::agroforestry_subtype,
    0.901,
    26.55,
    0.086,
    'Local Extension Agent Surveys',
    2024,
    NULL,
    'PlanetScope + CNN',
    'v3.7',
    '2026-09-19T14:42:35.141992Z'::timestamptz,
    '2026-09-19T14:42:35.141992Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '796bc480-1825-467e-96aa-b3db19717fac'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[35.40865190262296, 7.591312805056199], [35.40745130412725, 7.593940881443112], [35.40485667486022, 7.593022358329481], [35.40501592121505, 7.590427387296373], [35.40698956776002, 7.589409971348932], [35.40865190262296, 7.591312805056199]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.854,
    14.56,
    0.119,
    'Ethiopia Open Data Portal',
    2024,
    NULL,
    'GEDI LiDAR + ML',
    'v1.1',
    '2026-09-19T14:42:35.142014Z'::timestamptz,
    '2026-09-19T14:42:35.142014Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '31401b03-0dc8-405a-a044-c5e709110be1'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[38.61752466650084, 6.9031822266784015], [38.61753604456613, 6.905422209780966], [38.61489843913362, 6.906687771193974], [38.613650888452966, 6.904284963521614], [38.61346726286512, 6.902460456881146], [38.61495394572263, 6.901155072851902], [38.61711132327887, 6.90150046468975], [38.61752466650084, 6.9031822266784015]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'woodlot'::agroforestry_subtype,
    0.899,
    24.27,
    0.14,
    'Agroforestry Research Network',
    2021,
    NULL,
    'GEDI LiDAR + ML',
    'v1.1',
    '2026-09-19T14:42:35.142044Z'::timestamptz,
    '2026-09-19T14:42:35.142044Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '1105db32-914d-4ae0-961c-d6183592e500'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.618762920368596, 8.034886965554255], [37.61846866049889, 8.03577731393328], [37.61756103252698, 8.036103831483018], [37.61692531927684, 8.035638060473396], [37.61690957417158, 8.034510840749103], [37.61755087182295, 8.033746541995482], [37.618362653548175, 8.03435270603952], [37.618762920368596, 8.034886965554255]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'woodlot'::agroforestry_subtype,
    0.789,
    3.78,
    0.228,
    'Sentinel-2 NDVI Time Series',
    2021,
    NULL,
    'PlanetScope + CNN',
    'v2.9',
    '2026-09-19T14:42:35.142069Z'::timestamptz,
    '2026-09-19T14:42:35.142069Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '1bc2bfd9-390f-4aff-9846-9c57a81d4144'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[38.01626400553825, 7.630463597891296], [38.01599145593413, 7.631691342493838], [38.014581434236554, 7.632948325714388], [38.01303330679259, 7.633639603617447], [38.01174327341352, 7.631880559553939], [38.01202165646971, 7.630532199176397], [38.01243665608857, 7.629197537308072], [38.01340269364802, 7.6274609995964955], [38.014383722049864, 7.62864033625023], [38.015817792072255, 7.628729410505924], [38.01626400553825, 7.630463597891296]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'forest_farming'::agroforestry_subtype,
    0.717,
    25.39,
    0.258,
    'Local Extension Agent Surveys',
    2022,
    NULL,
    'GEDI LiDAR + ML',
    'v2.0',
    '2026-09-19T14:42:35.142096Z'::timestamptz,
    '2026-09-19T14:42:35.142096Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'acc22f6d-198b-4b35-ae97-985781d93122'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[35.710725256460115, 8.617911610509337], [35.710097315259226, 8.619431125315042], [35.70813093084302, 8.619495601164868], [35.7068980993687, 8.619093725552757], [35.706296576912564, 8.617679826930205], [35.706764992933685, 8.616444476124983], [35.70843108523888, 8.615923987715776], [35.710158934085136, 8.616456431600374], [35.710725256460115, 8.617911610509337]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'woodlot'::agroforestry_subtype,
    0.72,
    15.29,
    0.329,
    'Sentinel-2 NDVI Time Series',
    2024,
    NULL,
    'Sentinel-2 + Random Forest',
    'v1.6',
    '2026-09-19T14:42:35.142121Z'::timestamptz,
    '2026-09-19T14:42:35.142121Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '2e77dd1b-a52b-4f43-9867-f81f238dd7d5'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[35.913727309710914, 7.083482482313604], [35.913273401253, 7.084731926326577], [35.91146759832764, 7.085099125456201], [35.910991443404626, 7.083416471841505], [35.9114942152433, 7.081760609933956], [35.91287611302042, 7.081937341145249], [35.913727309710914, 7.083482482313604]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.789,
    8.11,
    0.152,
    'Sentinel-2 NDVI Time Series',
    2022,
    NULL,
    'Sentinel-2 + Random Forest',
    'v1.2',
    '2026-09-19T14:42:35.142142Z'::timestamptz,
    '2026-09-19T14:42:35.142142Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'ba60ab11-7af0-4e0a-ade6-25737fde1333'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[38.69236218760091, 6.638454131417823], [38.691556343649715, 6.639836782154017], [38.69056147948453, 6.640835236138381], [38.68928983943967, 6.639777470724426], [38.68816308261457, 6.63881499121978], [38.68919464807072, 6.637414522390213], [38.69035783143619, 6.636664397945445], [38.691826793031346, 6.637058354210382], [38.69236218760091, 6.638454131417823]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.841,
    15.77,
    0.123,
    'Local Extension Agent Surveys',
    2023,
    NULL,
    'PlanetScope + CNN',
    'v3.5',
    '2026-09-19T14:42:35.142165Z'::timestamptz,
    '2026-09-19T14:42:35.142165Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '6e20f742-1922-41df-82a5-94675d701b4e'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.02821178413574, 7.724818003499076], [37.02809570532255, 7.726513938431081], [37.026029975801784, 7.726751732638993], [37.02480074072901, 7.725537408474425], [37.024968912723224, 7.723745210079937], [37.026576122192914, 7.722247243566374], [37.02823870198183, 7.723002717734183], [37.02821178413574, 7.724818003499076]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.933,
    14.82,
    0.066,
    'Local Extension Agent Surveys',
    2021,
    NULL,
    'PlanetScope + CNN',
    'v1.7',
    '2026-09-19T14:42:35.142190Z'::timestamptz,
    '2026-09-19T14:42:35.142190Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '710c80d3-64b7-4785-b5a8-e2e93ffd87ae'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.38357246303113, 8.610919946915086], [37.383828137261425, 8.61163480428791], [37.38292509713044, 8.61206391100964], [37.382168655134706, 8.612210466494139], [37.381517946280404, 8.611464319146066], [37.38130478661152, 8.610929602790183], [37.38173308229947, 8.610125821004214], [37.38242832388545, 8.60989627597973], [37.382767480545006, 8.609924711422602], [37.383935838909736, 8.610157716817664], [37.38357246303113, 8.610919946915086]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'forest_farming'::agroforestry_subtype,
    0.882,
    5.43,
    0.091,
    'Sentinel-2 NDVI Time Series',
    2023,
    NULL,
    'Hybrid Remote Sensing',
    'v1.6',
    '2026-09-19T14:42:35.142254Z'::timestamptz,
    '2026-09-19T14:42:35.142254Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '70bb55b7-83a5-4969-8f23-9e13dc490a7e'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[35.75381568347147, 7.983009318961113], [35.7535160105456, 7.984930783900346], [35.75144286306898, 7.985990534143615], [35.749306473201734, 7.985909324407213], [35.749444314885345, 7.9839664924937], [35.74829580866677, 7.981434910879468], [35.75000978028779, 7.9811963035685], [35.75181089693208, 7.98096723701017], [35.7534464608837, 7.9808132469662585], [35.75381568347147, 7.983009318961113]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'forest_farming'::agroforestry_subtype,
    0.86,
    28.93,
    0.094,
    'Ethiopia Open Data Portal',
    2023,
    NULL,
    'PlanetScope + CNN',
    'v1.4',
    '2026-09-19T14:42:35.142295Z'::timestamptz,
    '2026-09-19T14:42:35.142295Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '2b3c59c7-e8fa-42c3-a95d-cf04fca4d7cc'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[38.62337043858357, 8.3432856109607], [38.62307415619781, 8.345390811838891], [38.62047260929322, 8.346097043012], [38.61785774537788, 8.345028983541937], [38.61780003973066, 8.341885216674012], [38.620100589863135, 8.341097135798753], [38.62243288149225, 8.341326212975693], [38.62337043858357, 8.3432856109607]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'forest_farming'::agroforestry_subtype,
    0.709,
    22.33,
    0.197,
    'Ethiopia Open Data Portal',
    2020,
    NULL,
    'Sentinel-2 + Random Forest',
    'v3.8',
    '2026-09-19T14:42:35.142318Z'::timestamptz,
    '2026-09-19T14:42:35.142318Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '2460959c-76b4-4075-9301-009bdc138e13'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.542910094604714, 9.454520267587203], [37.5424816943048, 9.454863261238296], [37.54200970449254, 9.455777873347124], [37.540970092375844, 9.455728995045357], [37.54056025885545, 9.454931940247356], [37.54080741768424, 9.453938673641805], [37.541044405073606, 9.453640860665404], [37.54221758971996, 9.452925682917321], [37.54244617086729, 9.45389478934938], [37.542910094604714, 9.454520267587203]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.81,
    7.18,
    0.271,
    'Ethiopia Open Data Portal',
    2021,
    NULL,
    'PlanetScope + CNN',
    'v2.8',
    '2026-09-19T14:42:35.142345Z'::timestamptz,
    '2026-09-19T14:42:35.142345Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'ee733118-8335-49c7-bc1c-1893ba4d765d'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.287360334766404, 9.179026088876226], [37.28723777956058, 9.18125315140579], [37.28451641802733, 9.18223605507986], [37.282846018552604, 9.180892052538356], [37.28160375913449, 9.179003645191784], [37.28236901935068, 9.176155927351012], [37.28378054060496, 9.175204629060223], [37.2865667359745, 9.17737801089991], [37.287360334766404, 9.179026088876226]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'forest_farming'::agroforestry_subtype,
    0.758,
    40.45,
    0.228,
    'Ethiopia Open Data Portal',
    2023,
    NULL,
    'GEDI LiDAR + ML',
    'v3.9',
    '2026-09-19T14:42:35.142368Z'::timestamptz,
    '2026-09-19T14:42:35.142368Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '6a0b5598-86b9-4cfb-8685-b54ebe50039a'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[35.369161893397916, 9.27253951649164], [35.36881340509806, 9.273287315551725], [35.36736245047777, 9.274047194051496], [35.36660651432952, 9.27424743477661], [35.36532508855514, 9.273890370600903], [35.36481878637309, 9.272399587585685], [35.36564905679378, 9.271322875420234], [35.366278389151496, 9.270558341830672], [35.36785896797616, 9.270663813647127], [35.36890364244557, 9.270700052646655], [35.369161893397916, 9.27253951649164]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.841,
    16.95,
    0.224,
    'Sentinel-2 NDVI Time Series',
    2020,
    NULL,
    'Hybrid Remote Sensing',
    'v1.2',
    '2026-09-19T14:42:35.142395Z'::timestamptz,
    '2026-09-19T14:42:35.142395Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'c55eafc7-c268-441d-ac92-0eeeaeea51f0'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.24186269905516, 9.27550536288003], [37.241434433630324, 9.277110578874373], [37.23946549220109, 9.277972156771252], [37.2375763858983, 9.277823623146643], [37.23590797407878, 9.276498952728227], [37.23685206124851, 9.274788486084775], [37.23760494175028, 9.273907631564958], [37.23912086884357, 9.273172474430595], [37.24132995561865, 9.27334497366122], [37.24186269905516, 9.27550536288003]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.852,
    27.87,
    0.106,
    'Sentinel-2 NDVI Time Series',
    2020,
    NULL,
    'Sentinel-2 + Random Forest',
    'v3.4',
    '2026-09-19T14:42:35.142421Z'::timestamptz,
    '2026-09-19T14:42:35.142421Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'ad3202b7-de42-40dd-a817-775469c7c843'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[36.92652403147628, 9.213234194376588], [36.92546491776108, 9.214942082837034], [36.92367119792384, 9.214849386773661], [36.92190906222679, 9.21324342500881], [36.922984016595144, 9.211038281056352], [36.925225643999084, 9.210735097105795], [36.92652403147628, 9.213234194376588]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.893,
    18.27,
    0.16,
    'Local Extension Agent Surveys',
    2021,
    NULL,
    'Hybrid Remote Sensing',
    'v2.9',
    '2026-09-19T14:42:35.142443Z'::timestamptz,
    '2026-09-19T14:42:35.142443Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '4768438f-719c-4104-a027-6c41ae586d41'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[36.43974022898096, 8.129925958899316], [36.439211286759004, 8.130398809206682], [36.43858233938257, 8.130664512047854], [36.4382399952709, 8.130505256326375], [36.43734082915626, 8.130140197901664], [36.43780879403614, 8.129410037128608], [36.43779197202125, 8.128602728728545], [36.438689998218464, 8.128909349664863], [36.4392143859321, 8.129236705860421], [36.43974022898096, 8.129925958899316]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.752,
    4.87,
    0.187,
    'Ethiopia Open Data Portal',
    2021,
    NULL,
    'Sentinel-2 + Random Forest',
    'v3.8',
    '2026-09-19T14:42:35.142467Z'::timestamptz,
    '2026-09-19T14:42:35.142467Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '15e9b6cf-8e3e-494f-b67a-a7ff17408d1c'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[35.988814799663785, 6.8929638312234776], [35.98834663113611, 6.893792462719153], [35.987184521165624, 6.894062081152885], [35.98650523344335, 6.893618648864355], [35.98668603121306, 6.892241502470729], [35.98748916415963, 6.891830100745655], [35.98870520492082, 6.891813126089592], [35.988814799663785, 6.8929638312234776]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'forest_farming'::agroforestry_subtype,
    0.914,
    5.19,
    0.084,
    'Local Extension Agent Surveys',
    2022,
    NULL,
    'PlanetScope + CNN',
    'v1.5',
    '2026-09-19T14:42:35.142491Z'::timestamptz,
    '2026-09-19T14:42:35.142491Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'd31aa1d8-77ce-4398-b4ee-0a79eabc1082'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[35.281151079549964, 7.671247734077373], [35.27959773766765, 7.672800134388577], [35.27888824530906, 7.6742937370019675], [35.27658590872372, 7.673494086946936], [35.27519372460976, 7.672642525853232], [35.2748475240198, 7.670524480320401], [35.27713969103259, 7.669322466808441], [35.278817564483035, 7.668491142198177], [35.28008203949055, 7.668901501556472], [35.281151079549964, 7.671247734077373]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.732,
    28.78,
    0.352,
    'Sentinel-2 NDVI Time Series',
    2024,
    NULL,
    'Sentinel-2 + Random Forest',
    'v2.8',
    '2026-09-19T14:42:35.142514Z'::timestamptz,
    '2026-09-19T14:42:35.142514Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'a087ca16-fc58-4deb-96ba-284fde44a75f'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[38.478266105551214, 7.005152770668457], [38.47805591441323, 7.005605860221641], [38.477793132602336, 7.006033419262733], [38.477510047823465, 7.005837864980831], [38.476984639204474, 7.005555498421518], [38.47700851901829, 7.00509648757086], [38.47702696020939, 7.00491259924844], [38.47741731280959, 7.004675437515884], [38.477706022612686, 7.004683472884751], [38.478428653176564, 7.00473843401547], [38.478266105551214, 7.005152770668457]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'woodlot'::agroforestry_subtype,
    0.892,
    2.0,
    0.093,
    'Sentinel-2 NDVI Time Series',
    2024,
    NULL,
    'PlanetScope + CNN',
    'v1.6',
    '2026-09-19T14:42:35.142565Z'::timestamptz,
    '2026-09-19T14:42:35.142565Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'eda12227-ccdf-4393-8a6a-65250caa3b7c'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[38.54636644542413, 9.167952811068615], [38.54668861143547, 9.169286125271633], [38.545158301230494, 9.170554752607996], [38.542491567516954, 9.169871825733795], [38.54223622160544, 9.168560128635368], [38.54154531536631, 9.16673034847356], [38.54205034907926, 9.16475979582295], [38.54454509124504, 9.165089173506521], [38.54639914215978, 9.165015339773499], [38.54636644542413, 9.167952811068615]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'parkland'::agroforestry_subtype,
    0.772,
    24.75,
    0.149,
    'Local Extension Agent Surveys',
    2023,
    NULL,
    'Hybrid Remote Sensing',
    'v3.4',
    '2026-09-19T14:42:35.142591Z'::timestamptz,
    '2026-09-19T14:42:35.142591Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'e27ca39f-c5e6-4376-90ce-703d7a39c7f4'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[36.77649099171144, 9.291075560489269], [36.77623800777372, 9.292008443372938], [36.77486942926061, 9.292788097257683], [36.77406760355233, 9.293327927139673], [36.77211371415912, 9.291917318581625], [36.772052377791454, 9.290589127642026], [36.77264954243079, 9.289275568488954], [36.77412080281206, 9.288915896533137], [36.77532428871266, 9.288472119380877], [36.77703385269937, 9.289343841980878], [36.77649099171144, 9.291075560489269]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.939,
    26.44,
    0.049,
    'Sentinel-2 NDVI Time Series',
    2020,
    NULL,
    'PlanetScope + CNN',
    'v3.8',
    '2026-09-19T14:42:35.142618Z'::timestamptz,
    '2026-09-19T14:42:35.142618Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'b1d0fdd7-7577-4a14-ad39-4bca2ab9569a'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[36.700972837541904, 6.88197888175271], [36.69880449524857, 6.884116505137692], [36.695862017986514, 6.8834676387157305], [36.69688848660912, 6.881230465860787], [36.699077972879905, 6.880409698153728], [36.700972837541904, 6.88197888175271]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.854,
    14.51,
    0.118,
    'Local Extension Agent Surveys',
    2022,
    NULL,
    'Sentinel-2 + Random Forest',
    'v2.4',
    '2026-09-19T14:42:35.142658Z'::timestamptz,
    '2026-09-19T14:42:35.142658Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '95ec0548-41a0-4058-bc95-b1daac666891'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[36.48776022635039, 6.971080007050991], [36.48643043679281, 6.973228933880017], [36.48362541436018, 6.972922589229436], [36.483315971880295, 6.969077760886982], [36.48662875512929, 6.96927910356313], [36.48776022635039, 6.971080007050991]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'parkland'::agroforestry_subtype,
    0.901,
    17.2,
    0.138,
    'Local Extension Agent Surveys',
    2020,
    NULL,
    'Hybrid Remote Sensing',
    'v1.7',
    '2026-09-19T14:42:35.142679Z'::timestamptz,
    '2026-09-19T14:42:35.142679Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'e6fca173-2ff6-4dbc-8752-71c1da31e51f'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[39.469342641177434, 8.622835034317793], [39.46815475540186, 8.6250212636504], [39.466699487434134, 8.62566203271436], [39.46494327437478, 8.62537287468297], [39.464241683238285, 8.624600157806425], [39.46381589495185, 8.62240448908646], [39.466032904244045, 8.62165270333412], [39.46712281268689, 8.620646075677804], [39.46801831062917, 8.621891261330719], [39.469342641177434, 8.622835034317793]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.885,
    22.6,
    0.119,
    'Sentinel-2 NDVI Time Series',
    2021,
    NULL,
    'Sentinel-2 + Random Forest',
    'v1.9',
    '2026-09-19T14:42:35.142701Z'::timestamptz,
    '2026-09-19T14:42:35.142701Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'f17343b8-6632-4cfc-95fb-a47aecf6a1d4'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[38.58084960049219, 7.247740249591037], [38.57971493538722, 7.248737599420496], [38.57837188794697, 7.248538740936744], [38.57831522669835, 7.247125940678668], [38.579584926960855, 7.246386344764187], [38.58084960049219, 7.247740249591037]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.721,
    5.19,
    0.144,
    'Agroforestry Research Network',
    2024,
    NULL,
    'Hybrid Remote Sensing',
    'v3.3',
    '2026-09-19T14:42:35.142720Z'::timestamptz,
    '2026-09-19T14:42:35.142720Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '2deaa743-bb15-459f-a501-547a3c53570e'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[35.98732492862586, 7.589380547945788], [35.986300228245376, 7.5915235062353235], [35.98446575788652, 7.590340507462873], [35.9842228925768, 7.588604169703037], [35.98582023983741, 7.588184626201658], [35.98732492862586, 7.589380547945788]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.872,
    10.01,
    0.17,
    'Ethiopia Open Data Portal',
    2023,
    NULL,
    'Hybrid Remote Sensing',
    'v1.8',
    '2026-09-19T14:42:35.142739Z'::timestamptz,
    '2026-09-19T14:42:35.142739Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '5c080a6a-574f-4851-a1c7-a49059dab203'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.214647511365854, 8.99102147835173], [37.214376345242464, 8.992218684561127], [37.21305248137043, 8.992882684477628], [37.211877350197234, 8.992261346711379], [37.21140899996862, 8.99121873698341], [37.211644774198746, 8.989956487879887], [37.2129560038112, 8.989610467332158], [37.21436665126209, 8.990339897192344], [37.214647511365854, 8.99102147835173]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'forest_farming'::agroforestry_subtype,
    0.768,
    8.31,
    0.309,
    'Local Extension Agent Surveys',
    2023,
    NULL,
    'PlanetScope + CNN',
    'v3.0',
    '2026-09-19T14:42:35.142764Z'::timestamptz,
    '2026-09-19T14:42:35.142764Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '0604b28d-f809-441c-8681-9b6f60957b23'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[35.8479869913314, 7.56458127520107], [35.84736237501821, 7.566125928783965], [35.846972325501916, 7.566373680630553], [35.84549823461506, 7.566171636338881], [35.84472282384038, 7.566143502418845], [35.84415571312374, 7.565036087912167], [35.84445590738204, 7.563651674728755], [35.845706668625446, 7.562930100700481], [35.84684936727277, 7.56285320564068], [35.84747313713815, 7.5636466630411565], [35.8479869913314, 7.56458127520107]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.92,
    11.34,
    0.097,
    'Sentinel-2 NDVI Time Series',
    2024,
    NULL,
    'GEDI LiDAR + ML',
    'v3.5',
    '2026-09-19T14:42:35.142789Z'::timestamptz,
    '2026-09-19T14:42:35.142789Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '33ae2c51-41d3-4170-9df1-4a62c524ead9'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[38.28831853159648, 7.331777455418695], [38.28784513386765, 7.333701306970448], [38.28566534036413, 7.334293033495369], [38.28382112464472, 7.3357247141157185], [38.28146730344276, 7.3339032194215426], [38.282057827495066, 7.3319824962954945], [38.28302079312173, 7.330357190596459], [38.28423525282939, 7.329485977513464], [38.28567760104924, 7.3291191322395575], [38.28632093611985, 7.3306489009557625], [38.28831853159648, 7.331777455418695]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.828,
    42.03,
    0.22,
    'Sentinel-2 NDVI Time Series',
    2020,
    NULL,
    'Sentinel-2 + Random Forest',
    'v3.1',
    '2026-09-19T14:42:35.142812Z'::timestamptz,
    '2026-09-19T14:42:35.142812Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '09ce14e7-db03-46a4-9af9-c4892c446dae'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[38.894564962558796, 8.633023909294923], [38.89398148891368, 8.634731521765294], [38.89225743122262, 8.63548688289075], [38.89073559214395, 8.635130158858672], [38.89011006719952, 8.633113814792104], [38.891474725415314, 8.632108847498385], [38.89227758455783, 8.631307293868963], [38.89391252248504, 8.631900539614794], [38.894564962558796, 8.633023909294923]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.822,
    20.3,
    0.152,
    'Sentinel-2 NDVI Time Series',
    2021,
    NULL,
    'Sentinel-2 + Random Forest',
    'v2.6',
    '2026-09-19T14:42:35.142835Z'::timestamptz,
    '2026-09-19T14:42:35.142835Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '07427721-9d0f-49f3-90c7-cd0a522a9c20'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.07418917981141, 8.610741562601886], [37.07409351593652, 8.611327134668276], [37.073408482840144, 8.611535018911267], [37.07289322744726, 8.611642266453034], [37.072769281939195, 8.610847780066312], [37.07244209073013, 8.610257062384676], [37.07292720728295, 8.609927216742845], [37.07353106099635, 8.609784981851254], [37.0739321024042, 8.61020255810908], [37.07418917981141, 8.610741562601886]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'forest_farming'::agroforestry_subtype,
    0.845,
    3.13,
    0.185,
    'Sentinel-2 NDVI Time Series',
    2022,
    NULL,
    'Sentinel-2 + Random Forest',
    'v3.3',
    '2026-09-19T14:42:35.142861Z'::timestamptz,
    '2026-09-19T14:42:35.142861Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '765f7209-93a5-475c-b7c1-2299e151186c'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[38.96961825930949, 7.328298125523318], [38.968519815805784, 7.329037991166972], [38.967630724647236, 7.3289052806068655], [38.96659629219478, 7.3279631287382685], [38.967352901760194, 7.327019334566114], [38.96872995966717, 7.327200583479709], [38.96961825930949, 7.328298125523318]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'forest_farming'::agroforestry_subtype,
    0.701,
    4.7,
    0.39,
    'Local Extension Agent Surveys',
    2021,
    NULL,
    'Hybrid Remote Sensing',
    'v1.6',
    '2026-09-19T14:42:35.142887Z'::timestamptz,
    '2026-09-19T14:42:35.142887Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'd597d0b9-10ed-49fa-9e04-8c0189d75e9a'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[36.04643683783284, 8.154495211487292], [36.046082399835036, 8.156429439695954], [36.044211261288446, 8.156931312642895], [36.04245064296137, 8.155812446598873], [36.0418303337229, 8.154870121447246], [36.04222577214661, 8.152270165352988], [36.04389943848909, 8.15285449308485], [36.04632881238256, 8.152574923613678], [36.04643683783284, 8.154495211487292]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'woodlot'::agroforestry_subtype,
    0.746,
    22.31,
    0.188,
    'Ethiopia Open Data Portal',
    2021,
    NULL,
    'PlanetScope + CNN',
    'v2.7',
    '2026-09-19T14:42:35.142910Z'::timestamptz,
    '2026-09-19T14:42:35.142910Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '2e7f02e8-6a82-43ee-93f8-ca40adbbdb2f'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.76358708119797, 9.114823359038597], [37.763746750733375, 9.115564857895368], [37.76269653110596, 9.11563956076671], [37.7620249578391, 9.11552880701663], [37.76146003763627, 9.115113507968273], [37.76156767172352, 9.114544818005058], [37.76220096926861, 9.114028858173997], [37.76292900220084, 9.113763725437359], [37.76343407603242, 9.113850785069605], [37.76358708119797, 9.114823359038597]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.892,
    3.15,
    0.085,
    'Ethiopia Open Data Portal',
    2022,
    NULL,
    'GEDI LiDAR + ML',
    'v2.0',
    '2026-09-19T14:42:35.142935Z'::timestamptz,
    '2026-09-19T14:42:35.142935Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '6ef0934c-400d-40cf-aa42-3db0356f31af'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[36.342711137859695, 7.429767176689084], [36.34152002184437, 7.4312381467801325], [36.34009700774232, 7.432383340309897], [36.33883539286423, 7.431834421392045], [36.33820387649114, 7.4303967206190435], [36.33761133255172, 7.429247413000658], [36.3382505216588, 7.428506244381168], [36.33899055983424, 7.426646317873169], [36.34001135065985, 7.42674829481986], [36.341487320707614, 7.428549725130485], [36.342711137859695, 7.429767176689084]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.716,
    30.56,
    0.214,
    'Sentinel-2 NDVI Time Series',
    2024,
    NULL,
    'GEDI LiDAR + ML',
    'v3.7',
    '2026-09-19T14:42:35.142958Z'::timestamptz,
    '2026-09-19T14:42:35.142958Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'e48f843e-a39c-4b2f-b036-43ae02c702c4'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[35.55615607374237, 6.828423467906116], [35.55526281854118, 6.829291428870023], [35.55429114994157, 6.829236685408127], [35.55350404069854, 6.828979772087915], [35.55337430371307, 6.827320124273433], [35.554128002007126, 6.826721695081163], [35.55534034940433, 6.826846737532324], [35.55615607374237, 6.828423467906116]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'forest_farming'::agroforestry_subtype,
    0.922,
    7.2,
    0.115,
    'Agroforestry Research Network',
    2023,
    NULL,
    'GEDI LiDAR + ML',
    'v2.9',
    '2026-09-19T14:42:35.142981Z'::timestamptz,
    '2026-09-19T14:42:35.142981Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '275171de-c213-4495-88c8-a945eab92f9f'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[38.90908927811742, 6.682716443516906], [38.90819690464323, 6.683590313646862], [38.90773530629962, 6.685151832599702], [38.905272828631155, 6.684281259314375], [38.905120060152825, 6.683157517201486], [38.904405704380494, 6.6820017574845], [38.90568524338305, 6.6809945335766585], [38.90730800470294, 6.6807067242227625], [38.908041899891835, 6.681016800185332], [38.90908927811742, 6.682716443516906]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.784,
    17.81,
    0.286,
    'Agroforestry Research Network',
    2023,
    NULL,
    'GEDI LiDAR + ML',
    'v3.8',
    '2026-09-19T14:42:35.143003Z'::timestamptz,
    '2026-09-19T14:42:35.143003Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '19983259-732c-43ef-9366-d84e6fad7063'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[36.28676209848124, 8.767651416746718], [36.28603182691099, 8.769733737090183], [36.28391686568522, 8.770103714526675], [36.282907268459304, 8.769557565934873], [36.28257289137454, 8.767663061645171], [36.28302352758074, 8.76647401791773], [36.28379755564947, 8.765731193240379], [36.28625449636708, 8.766285815939757], [36.28676209848124, 8.767651416746718]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.844,
    17.54,
    0.213,
    'Ethiopia Open Data Portal',
    2023,
    NULL,
    'Sentinel-2 + Random Forest',
    'v3.4',
    '2026-09-19T14:42:35.143028Z'::timestamptz,
    '2026-09-19T14:42:35.143028Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'e8038af0-84b5-4e65-b0bd-edc47ee2bcce'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[38.25923929994886, 8.431256574036649], [38.25740497435245, 8.433042729450916], [38.25565601948398, 8.432761022045893], [38.255495753913735, 8.430408301191285], [38.25745565842028, 8.430078044216653], [38.25923929994886, 8.431256574036649]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.905,
    8.27,
    0.122,
    'Local Extension Agent Surveys',
    2023,
    NULL,
    'GEDI LiDAR + ML',
    'v1.6',
    '2026-09-19T14:42:35.143053Z'::timestamptz,
    '2026-09-19T14:42:35.143053Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'cb1d452b-b64e-4589-b66c-fdc974f266dc'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[38.16484945861085, 8.902641271840213], [38.16487761663983, 8.903050041107385], [38.16426592708878, 8.903333103067345], [38.16394889600252, 8.903031342703443], [38.16334582346644, 8.902520225938499], [38.1636313495381, 8.90211204979901], [38.164261631886106, 8.901971097985104], [38.164947825929325, 8.902118092932694], [38.16484945861085, 8.902641271840213]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'forest_farming'::agroforestry_subtype,
    0.766,
    2.17,
    0.201,
    'Agroforestry Research Network',
    2022,
    NULL,
    'Sentinel-2 + Random Forest',
    'v3.6',
    '2026-09-19T14:42:35.143078Z'::timestamptz,
    '2026-09-19T14:42:35.143078Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '5300ea12-8dbe-46e1-b3e5-75850b1cb462'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[38.68802998475042, 9.174952879840491], [38.6875909460085, 9.177117897364292], [38.685127451835356, 9.177596959073336], [38.68427933031086, 9.176551679077171], [38.684595980074, 9.174582165893542], [38.685692209543376, 9.172536158657323], [38.68735750235515, 9.173133635713338], [38.68802998475042, 9.174952879840491]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.765,
    14.19,
    0.34,
    'Local Extension Agent Surveys',
    2023,
    NULL,
    'PlanetScope + CNN',
    'v2.5',
    '2026-09-19T14:42:35.143103Z'::timestamptz,
    '2026-09-19T14:42:35.143103Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'c03594c7-c1d9-43ff-860c-cc8026c8e40b'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[38.908980996623896, 7.277393540922562], [38.90866810768779, 7.278659297761039], [38.907943834668174, 7.280334895580221], [38.905984429096065, 7.2797931148701975], [38.90522642161996, 7.279016724478139], [38.90483013466012, 7.277886049678156], [38.904651727140354, 7.275432452190036], [38.9054276754986, 7.2747215546457555], [38.90721695894851, 7.2747974291611275], [38.908919854449145, 7.276278282682567], [38.908980996623896, 7.277393540922562]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.777,
    24.64,
    0.219,
    'Local Extension Agent Surveys',
    2021,
    NULL,
    'Hybrid Remote Sensing',
    'v2.1',
    '2026-09-19T14:42:35.143127Z'::timestamptz,
    '2026-09-19T14:42:35.143127Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '49137b07-bf64-4cec-ace7-8269c3d28d65'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[38.91226177334936, 6.758702908445532], [38.911448807589295, 6.759933885436305], [38.91011523970128, 6.759502241929193], [38.910094852126406, 6.757940103954933], [38.911382988244, 6.757593222771223], [38.91226177334936, 6.758702908445532]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.81,
    4.59,
    0.237,
    'Sentinel-2 NDVI Time Series',
    2023,
    NULL,
    'Hybrid Remote Sensing',
    'v1.5',
    '2026-09-19T14:42:35.143148Z'::timestamptz,
    '2026-09-19T14:42:35.143148Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '809617fe-5958-4814-9025-572a4b35dd66'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[35.836993422906154, 7.803486261148217], [35.83604987009712, 7.8040518084568875], [35.83574861074588, 7.805758785133268], [35.83427805415447, 7.8051372389823666], [35.833398408084044, 7.804746057049192], [35.83269891078527, 7.8035811469327925], [35.833202747802474, 7.802595664826373], [35.83456585165341, 7.8020488656926315], [35.83586820375369, 7.8014319118525], [35.836814698473795, 7.802274114790985], [35.836993422906154, 7.803486261148217]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'forest_farming'::agroforestry_subtype,
    0.852,
    18.52,
    0.177,
    'Agroforestry Research Network',
    2024,
    NULL,
    'Hybrid Remote Sensing',
    'v1.4',
    '2026-09-19T14:42:35.143172Z'::timestamptz,
    '2026-09-19T14:42:35.143172Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '271eadc4-3f38-43f0-99fe-4cce09ad7930'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.27856836186338, 9.22193007805933], [37.27794972897529, 9.222961619278601], [37.276750850895404, 9.223321778312695], [37.2756327418086, 9.223017131688252], [37.27513531675462, 9.22213887579323], [37.2749782146315, 9.221308203843213], [37.27559224403863, 9.220457311615915], [37.27675181905864, 9.220445478847592], [37.27793943618526, 9.220920028004098], [37.27856836186338, 9.22193007805933]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.892,
    8.85,
    0.123,
    'Local Extension Agent Surveys',
    2024,
    NULL,
    'GEDI LiDAR + ML',
    'v3.9',
    '2026-09-19T14:42:35.143194Z'::timestamptz,
    '2026-09-19T14:42:35.143194Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '7b15fc5d-45bb-4ce1-983c-b444ad48eb94'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[36.28874906553948, 7.540251377763011], [36.28837125811323, 7.541092688825079], [36.28717613773361, 7.54330928818054], [36.28595362552241, 7.5426353011559355], [36.2848969074713, 7.540961955029374], [36.28387323632779, 7.53941119865802], [36.285081430322094, 7.538860602159751], [36.28588547837864, 7.537929848718607], [36.287732347316904, 7.536906582317572], [36.28868741123625, 7.538475261061293], [36.28874906553948, 7.540251377763011]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.836,
    22.99,
    0.231,
    'Agroforestry Research Network',
    2022,
    NULL,
    'Sentinel-2 + Random Forest',
    'v1.7',
    '2026-09-19T14:42:35.143221Z'::timestamptz,
    '2026-09-19T14:42:35.143221Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '9cfd6876-812a-42c7-8c31-a7e7b6d37f84'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[35.740749014926095, 6.983559596549082], [35.74054022403115, 6.984202055185002], [35.73980824177489, 6.985000065445053], [35.73841064159608, 6.98511094579983], [35.738183959887365, 6.983599722673185], [35.737600378139796, 6.982999478965511], [35.73830896361795, 6.982092510343973], [35.73978231607787, 6.9819216359289635], [35.74040726449169, 6.982691668432284], [35.740749014926095, 6.983559596549082]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'forest_farming'::agroforestry_subtype,
    0.702,
    8.02,
    0.229,
    'Agroforestry Research Network',
    2022,
    NULL,
    'Sentinel-2 + Random Forest',
    'v1.7',
    '2026-09-19T14:42:35.143244Z'::timestamptz,
    '2026-09-19T14:42:35.143244Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'bc759013-87ec-43ba-a2c7-b99ab1f5b660'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.00222200217204, 6.750345872701689], [37.00223776893864, 6.750696954329648], [37.001862861480106, 6.750973606865942], [37.00140316120735, 6.750943013390852], [37.0013460984833, 6.750535324686757], [37.00130654442209, 6.750213014731664], [37.00138336800577, 6.749933565589358], [37.0018821677681, 6.749910420861907], [37.002114108886396, 6.750233396209365], [37.00222200217204, 6.750345872701689]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.798,
    0.82,
    0.175,
    'Agroforestry Research Network',
    2024,
    NULL,
    'Sentinel-2 + Random Forest',
    'v1.2',
    '2026-09-19T14:42:35.143267Z'::timestamptz,
    '2026-09-19T14:42:35.143267Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'a8e31a36-1994-41e0-a65d-c85f21053ec2'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[35.32405118014089, 7.450192139009624], [35.32195950075649, 7.451512957360824], [35.32044052788209, 7.45171769554553], [35.31881933381989, 7.449745306033953], [35.319885664602694, 7.448076354334161], [35.32295337599169, 7.447460163564236], [35.32405118014089, 7.450192139009624]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.759,
    22.39,
    0.129,
    'Agroforestry Research Network',
    2024,
    NULL,
    'Sentinel-2 + Random Forest',
    'v2.9',
    '2026-09-19T14:42:35.143288Z'::timestamptz,
    '2026-09-19T14:42:35.143288Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '01b9e4cd-25d0-4622-b176-99bd537bd7be'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.94561221002263, 7.175127725571455], [37.94464710591252, 7.178103960935822], [37.94105581848185, 7.17854349075925], [37.93843312347565, 7.176229614088605], [37.9390491831257, 7.1730633521135], [37.942145168679474, 7.1719306430048135], [37.94387520437652, 7.1735375798838135], [37.94561221002263, 7.175127725571455]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'woodlot'::agroforestry_subtype,
    0.733,
    44.37,
    0.177,
    'Local Extension Agent Surveys',
    2024,
    NULL,
    'GEDI LiDAR + ML',
    'v1.4',
    '2026-09-19T14:42:35.143309Z'::timestamptz,
    '2026-09-19T14:42:35.143309Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '9d5de690-120e-49c2-b3d7-5c74dea77a3c'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[39.45953696868828, 7.331391030118374], [39.458283504699246, 7.333806733751278], [39.456222771207365, 7.334704016546204], [39.45457473615477, 7.333290917006904], [39.45405064404174, 7.3297507374699435], [39.45582799677566, 7.328453207474079], [39.458374620281134, 7.329350278892943], [39.45953696868828, 7.331391030118374]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'forest_farming'::agroforestry_subtype,
    0.871,
    29.62,
    0.134,
    'Local Extension Agent Surveys',
    2024,
    NULL,
    'Sentinel-2 + Random Forest',
    'v2.4',
    '2026-09-19T14:42:35.143335Z'::timestamptz,
    '2026-09-19T14:42:35.143335Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '046f6703-5530-4925-a755-a7fe09e90719'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.37506639905406, 8.241047185211313], [37.374609033830865, 8.242429889086162], [37.37353113292816, 8.242436422067103], [37.37164353943874, 8.243317677700404], [37.37148404800185, 8.241961626808276], [37.37068441179116, 8.240682317186415], [37.371195616755706, 8.240003309813305], [37.37240373776409, 8.238381622544983], [37.37335149637129, 8.23877782956727], [37.374922701817745, 8.23896937136436], [37.37506639905406, 8.241047185211313]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.917,
    20.65,
    0.046,
    'Ethiopia Open Data Portal',
    2024,
    NULL,
    'GEDI LiDAR + ML',
    'v1.3',
    '2026-09-19T14:42:35.143359Z'::timestamptz,
    '2026-09-19T14:42:35.143359Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'ab97e4c5-2012-4728-838e-297db132d520'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.22856325205932, 6.866831486354946], [37.22826859008845, 6.867247311480514], [37.22777401443194, 6.867227658230072], [37.22732416105686, 6.866840532039586], [37.2276787716676, 6.8660545549582865], [37.22826919330748, 6.866177714617593], [37.22856325205932, 6.866831486354946]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.75,
    1.35,
    0.355,
    'Sentinel-2 NDVI Time Series',
    2021,
    NULL,
    'GEDI LiDAR + ML',
    'v1.9',
    '2026-09-19T14:42:35.143382Z'::timestamptz,
    '2026-09-19T14:42:35.143382Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '6a27aeb7-6a4c-4086-9843-7316b3d68dd0'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.85916092849135, 8.91051272337835], [37.85808002403181, 8.911873527724902], [37.85693211327, 8.912411522349592], [37.85541236132624, 8.912306510265283], [37.85576858253535, 8.910632743117636], [37.85609301116061, 8.909482673447622], [37.85718615213319, 8.908764455961864], [37.85885818177361, 8.90894604086657], [37.85916092849135, 8.91051272337835]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.906,
    12.84,
    0.087,
    'Agroforestry Research Network',
    2022,
    NULL,
    'Hybrid Remote Sensing',
    'v2.9',
    '2026-09-19T14:42:35.143407Z'::timestamptz,
    '2026-09-19T14:42:35.143407Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '2f226a9c-a8de-4edd-9b85-9f47404bf414'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.36730553024096, 7.635448902117716], [37.366448049212174, 7.6361457744652705], [37.36525917064137, 7.636133914970082], [37.36529215212888, 7.634623913407712], [37.366348691149895, 7.634494123434005], [37.36730553024096, 7.635448902117716]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.887,
    2.79,
    0.104,
    'Agroforestry Research Network',
    2020,
    NULL,
    'PlanetScope + CNN',
    'v3.8',
    '2026-09-19T14:42:35.143428Z'::timestamptz,
    '2026-09-19T14:42:35.143428Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '43cae8aa-599c-4dcf-b040-4cb7abc489e6'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[36.70364928072829, 6.548112045787136], [36.70234577410034, 6.550341480039741], [36.700051223564536, 6.550791696248108], [36.69737318175041, 6.549871847736692], [36.698212284821416, 6.546660312477772], [36.69997644635942, 6.545223176824052], [36.70204714313081, 6.545541361120818], [36.70364928072829, 6.548112045787136]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.948,
    33.11,
    0.038,
    'Agroforestry Research Network',
    2020,
    NULL,
    'Sentinel-2 + Random Forest',
    'v2.3',
    '2026-09-19T14:42:35.143452Z'::timestamptz,
    '2026-09-19T14:42:35.143452Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'b940ccd1-ae8a-4aaa-a131-f819431777c9'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[36.31526251761096, 8.450974376983213], [36.31567333396235, 8.452927354707121], [36.313417799826105, 8.45388983547015], [36.310962885429326, 8.453062793631245], [36.3108757341796, 8.451100166794733], [36.31089493532027, 8.449164238802352], [36.313089323758696, 8.449100471280452], [36.31427436296004, 8.449105039091792], [36.31526251761096, 8.450974376983213]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.79,
    18.23,
    0.141,
    'Local Extension Agent Surveys',
    2022,
    NULL,
    'PlanetScope + CNN',
    'v1.7',
    '2026-09-19T14:42:35.143475Z'::timestamptz,
    '2026-09-19T14:42:35.143475Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '3691c6c0-a24b-41b3-ae81-00e2895c9710'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.27727609158643, 8.812097340526012], [37.2769536531591, 8.812927346148706], [37.2751820666099, 8.813402500500466], [37.27382400704287, 8.813209526374889], [37.272399859443716, 8.81248456525538], [37.27272722858831, 8.810502139272778], [37.2739519756636, 8.809872235394378], [37.275075666435974, 8.809579834702921], [37.276830757843086, 8.810549149286578], [37.27727609158643, 8.812097340526012]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.858,
    17.24,
    0.185,
    'Sentinel-2 NDVI Time Series',
    2020,
    NULL,
    'GEDI LiDAR + ML',
    'v1.9',
    '2026-09-19T14:42:35.143499Z'::timestamptz,
    '2026-09-19T14:42:35.143499Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '4bca5ef5-bfd2-495f-8ffb-aea7ac2b5e6a'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[38.76097774248494, 7.595130517704318], [38.75954125980767, 7.597313689837471], [38.75820656717641, 7.596760448520093], [38.756896679997, 7.594985762651732], [38.75809412645391, 7.593360256705382], [38.75937107525418, 7.59394258411928], [38.76097774248494, 7.595130517704318]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'forest_farming'::agroforestry_subtype,
    0.877,
    13.37,
    0.121,
    'Local Extension Agent Surveys',
    2020,
    NULL,
    'GEDI LiDAR + ML',
    'v3.9',
    '2026-09-19T14:42:35.143521Z'::timestamptz,
    '2026-09-19T14:42:35.143521Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '750d6984-6717-4cc5-b28a-0c59a8716f51'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[38.09101903213912, 7.166295961004332], [38.09142860797749, 7.167646851464854], [38.089528113027285, 7.168657042156771], [38.08874795709748, 7.168435805199617], [38.08678907466698, 7.168375315300977], [38.08713541375978, 7.166349956023112], [38.08736707937081, 7.164798786577251], [38.088249313462136, 7.164771299568399], [38.090028530979566, 7.163706449443658], [38.0916753366731, 7.165005033433777], [38.09101903213912, 7.166295961004332]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.751,
    20.21,
    0.304,
    'Sentinel-2 NDVI Time Series',
    2020,
    NULL,
    'GEDI LiDAR + ML',
    'v3.1',
    '2026-09-19T14:42:35.143557Z'::timestamptz,
    '2026-09-19T14:42:35.143557Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '1fa06e5b-2c65-420e-a63e-48d8e4f32d5c'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[36.19517997505571, 7.618176139654288], [36.19515091980028, 7.620250833697561], [36.194058596892845, 7.621025714183855], [36.19190889361924, 7.620876178304295], [36.19093579618695, 7.618882030154784], [36.19165148228334, 7.617804856575049], [36.191978680664946, 7.615878036401437], [36.19394883450894, 7.615991199244665], [36.195163502206796, 7.616356502119234], [36.19517997505571, 7.618176139654288]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.774,
    18.13,
    0.151,
    'Local Extension Agent Surveys',
    2020,
    NULL,
    'PlanetScope + CNN',
    'v3.4',
    '2026-09-19T14:42:35.143584Z'::timestamptz,
    '2026-09-19T14:42:35.143584Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'd0ce72f0-06c9-4c7a-8952-58abc6bdf07c'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[35.886777124271774, 7.732779793506002], [35.88658376606303, 7.73339782104328], [35.88596909717706, 7.733868402170639], [35.88546548891441, 7.733403645273904], [35.88511474796671, 7.732725133653994], [35.885565364553145, 7.732271047343878], [35.88580172784308, 7.731912936831758], [35.88661048920557, 7.731950233225844], [35.886777124271774, 7.732779793506002]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.852,
    3.1,
    0.107,
    'Ethiopia Open Data Portal',
    2024,
    NULL,
    'Sentinel-2 + Random Forest',
    'v3.2',
    '2026-09-19T14:42:35.143611Z'::timestamptz,
    '2026-09-19T14:42:35.143611Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '7ddae733-505d-4ea8-886f-5b0ff6772b19'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[39.47022271289898, 6.754803054784814], [39.46992654806409, 6.756627320415642], [39.46877282667631, 6.757453527900879], [39.46695663644393, 6.756596053996762], [39.46669855562848, 6.755321541725406], [39.46587352616136, 6.754397220123302], [39.46728632299432, 6.75308484015553], [39.46870955292753, 6.753423370336913], [39.469436209523096, 6.753825732581198], [39.47022271289898, 6.754803054784814]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.747,
    16.05,
    0.233,
    'Agroforestry Research Network',
    2022,
    NULL,
    'GEDI LiDAR + ML',
    'v3.9',
    '2026-09-19T14:42:35.143636Z'::timestamptz,
    '2026-09-19T14:42:35.143636Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'c5c83911-1131-4353-a04c-fdfeac6b0dca'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.96860797598841, 8.725923059031471], [37.967153182286786, 8.728299112089687], [37.96489988622925, 8.727774174372357], [37.9622695335548, 8.726355040640648], [37.963016146037155, 8.724169887936068], [37.964362325668375, 8.722638076604873], [37.967427433898706, 8.72314942214835], [37.96860797598841, 8.725923059031471]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.874,
    36.33,
    0.178,
    'Local Extension Agent Surveys',
    2020,
    NULL,
    'Hybrid Remote Sensing',
    'v1.3',
    '2026-09-19T14:42:35.143657Z'::timestamptz,
    '2026-09-19T14:42:35.143657Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '72a07a5f-c3ae-41f7-b3ad-577c0a6667bc'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[35.87437752536365, 9.462068094439463], [35.873891673736836, 9.462774900104776], [35.87323623432721, 9.463035313911629], [35.87256927576294, 9.46333092289779], [35.87141495572189, 9.462990526189055], [35.8713162827501, 9.46215612127943], [35.87194830536702, 9.461357712987162], [35.872642980285676, 9.460573179943061], [35.87303815109724, 9.460706493587864], [35.87449901904244, 9.460937399928257], [35.87437752536365, 9.462068094439463]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.729,
    8.37,
    0.299,
    'Sentinel-2 NDVI Time Series',
    2022,
    NULL,
    'GEDI LiDAR + ML',
    'v3.1',
    '2026-09-19T14:42:35.143727Z'::timestamptz,
    '2026-09-19T14:42:35.143727Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '7cd02d6f-8705-4b22-a9de-dcd996617b46'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.02557460931279, 8.500277035501584], [37.02533753192574, 8.502466083709972], [37.02346619479964, 8.502054159958211], [37.0219755369173, 8.501404785955323], [37.02162143241156, 8.50015325309258], [37.02192347382513, 8.498908753729678], [37.023234162431024, 8.497138138695858], [37.025240768944165, 8.498092128097523], [37.02557460931279, 8.500277035501584]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'forest_farming'::agroforestry_subtype,
    0.792,
    18.98,
    0.127,
    'Ethiopia Open Data Portal',
    2020,
    NULL,
    'PlanetScope + CNN',
    'v3.1',
    '2026-09-19T14:42:35.143817Z'::timestamptz,
    '2026-09-19T14:42:35.143817Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '24fd6719-e408-4c14-bb5e-d01a50115880'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[35.375552488308145, 7.024747622046452], [35.37457434730798, 7.026408620288223], [35.37305551247232, 7.026231929023094], [35.37135140488509, 7.026890687918506], [35.37092592905669, 7.025922824345343], [35.3701800655587, 7.024268892500015], [35.37026054975036, 7.022915323077265], [35.37230136858105, 7.022672856038524], [35.37312614291384, 7.022600907304504], [35.37512577936102, 7.023273565413983], [35.375552488308145, 7.024747622046452]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'forest_farming'::agroforestry_subtype,
    0.868,
    19.44,
    0.189,
    'Agroforestry Research Network',
    2020,
    NULL,
    'PlanetScope + CNN',
    'v2.7',
    '2026-09-19T14:42:35.143844Z'::timestamptz,
    '2026-09-19T14:42:35.143844Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'de1577a7-86af-42a8-88f8-7c1d05d0faba'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[35.39323204800404, 6.836863973420702], [35.392471918935506, 6.83783991906218], [35.391161408402084, 6.839068787681334], [35.389830521088825, 6.838335302673289], [35.389289930419515, 6.83727872743749], [35.38923230429987, 6.836497684532209], [35.38940774411925, 6.835152314064968], [35.39176168966277, 6.834375903668171], [35.3920452762204, 6.835748449023899], [35.39323204800404, 6.836863973420702]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'woodlot'::agroforestry_subtype,
    0.707,
    18.68,
    0.395,
    'Agroforestry Research Network',
    2023,
    NULL,
    'PlanetScope + CNN',
    'v3.4',
    '2026-09-19T14:42:35.143869Z'::timestamptz,
    '2026-09-19T14:42:35.143869Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'b2c0451c-e7d6-472a-aecd-4f9cd10d6463'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.01617189668201, 6.690581801789991], [37.0161120128713, 6.690755648311639], [37.015917295040126, 6.691013838968972], [37.01572274816463, 6.690930780102893], [37.01552042171185, 6.69082693120765], [37.01528927173604, 6.6906144997265775], [37.01526040944245, 6.690249354433746], [37.015668832127304, 6.690028980384305], [37.016011214628676, 6.6901305910688045], [37.01606604620353, 6.690248562517898], [37.01617189668201, 6.690581801789991]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.878,
    0.73,
    0.104,
    'Sentinel-2 NDVI Time Series',
    2020,
    NULL,
    'Sentinel-2 + Random Forest',
    'v2.8',
    '2026-09-19T14:42:35.143894Z'::timestamptz,
    '2026-09-19T14:42:35.143894Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'bcbcba3e-7485-4fd4-919d-b08a5ac1e622'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.35366870246148, 8.573449206401863], [37.35262407580879, 8.574748275116727], [37.35099859612519, 8.576216928746508], [37.34954649568053, 8.57613735469123], [37.34753066506142, 8.575142931908307], [37.34809243306222, 8.5737979650103], [37.34839582748461, 8.572510722816968], [37.348743573549825, 8.570809553327825], [37.35075880657125, 8.57061370966583], [37.352553279602176, 8.572495305986758], [37.35366870246148, 8.573449206401863]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.937,
    29.31,
    0.033,
    'Local Extension Agent Surveys',
    2024,
    NULL,
    'GEDI LiDAR + ML',
    'v1.7',
    '2026-09-19T14:42:35.143920Z'::timestamptz,
    '2026-09-19T14:42:35.143920Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '0bfc682d-5514-4b7c-866a-6096a220b6a7'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[38.089781227113725, 6.897741805780729], [38.08977751015489, 6.898109165423515], [38.089454300351505, 6.898100854277141], [38.089034057796034, 6.89825916915033], [38.08874948104622, 6.8978313276610494], [38.08875173798997, 6.897553964422055], [38.08905713288814, 6.897183531929593], [38.089494126902785, 6.89726874095147], [38.089753341890095, 6.89748986163395], [38.089781227113725, 6.897741805780729]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.801,
    0.98,
    0.177,
    'Agroforestry Research Network',
    2020,
    NULL,
    'Sentinel-2 + Random Forest',
    'v1.8',
    '2026-09-19T14:42:35.143944Z'::timestamptz,
    '2026-09-19T14:42:35.143944Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'f4580709-209e-44a0-9677-ecb28214b6c2'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[39.42292843169645, 7.594280349522053], [39.422752411834495, 7.595837480958361], [39.42141862975747, 7.5966173482533685], [39.41900864716581, 7.596105241479545], [39.41816509797726, 7.594845756063106], [39.41830974861059, 7.593664443371205], [39.41906830887768, 7.592024925625939], [39.42107727652947, 7.592248399533589], [39.42186461211112, 7.593295428400297], [39.42292843169645, 7.594280349522053]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'forest_farming'::agroforestry_subtype,
    0.705,
    22.3,
    0.254,
    'Local Extension Agent Surveys',
    2021,
    NULL,
    'GEDI LiDAR + ML',
    'v3.6',
    '2026-09-19T14:42:35.143966Z'::timestamptz,
    '2026-09-19T14:42:35.143966Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'f612a684-7035-497a-9675-c8d51a555676'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[38.97900373867079, 7.031267025844206], [38.97874184198237, 7.032936359788552], [38.97522790642522, 7.033119509957162], [38.97444244774536, 7.031316224841596], [38.97605927859381, 7.028370640116505], [38.97823251081557, 7.028988861865926], [38.97900373867079, 7.031267025844206]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.805,
    20.21,
    0.144,
    'Ethiopia Open Data Portal',
    2020,
    NULL,
    'GEDI LiDAR + ML',
    'v3.5',
    '2026-09-19T14:42:35.143987Z'::timestamptz,
    '2026-09-19T14:42:35.143987Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '7e69bbbb-275c-4fd6-920a-2da313d3483d'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[36.334423541143245, 7.685531630764209], [36.33445177991665, 7.686196362814364], [36.33312390702845, 7.686975541101533], [36.33261774641762, 7.686256845913872], [36.3319774808671, 7.685315259030737], [36.33286066040545, 7.684599630322218], [36.333536260905824, 7.684294798388532], [36.33423856986539, 7.684229802644233], [36.334423541143245, 7.685531630764209]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'parkland'::agroforestry_subtype,
    0.841,
    5.04,
    0.198,
    'Sentinel-2 NDVI Time Series',
    2022,
    NULL,
    'Sentinel-2 + Random Forest',
    'v2.7',
    '2026-09-19T14:42:35.144010Z'::timestamptz,
    '2026-09-19T14:42:35.144010Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '52b847e8-0d85-4086-bc16-43f019f6abee'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[36.17624459523487, 9.296779008204444], [36.1766994250163, 9.297988706593971], [36.175599989875025, 9.298397972624457], [36.17450626574042, 9.298852805886238], [36.17284179934269, 9.298348096160538], [36.17351864008004, 9.296823764598694], [36.17339509714126, 9.295829612253314], [36.17435222070786, 9.295339548084973], [36.175128566506324, 9.295367350836246], [36.176542933095845, 9.295942578666759], [36.17624459523487, 9.296779008204444]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'forest_farming'::agroforestry_subtype,
    0.757,
    12.85,
    0.129,
    'Ethiopia Open Data Portal',
    2022,
    NULL,
    'GEDI LiDAR + ML',
    'v2.4',
    '2026-09-19T14:42:35.144034Z'::timestamptz,
    '2026-09-19T14:42:35.144034Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '46fc7ef0-5f6e-4161-982a-167ad101e9a3'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ET-OR' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[37.51199133917265, 6.873363182245699], [37.51094052903342, 6.875277058726698], [37.50909808904629, 6.874472360543624], [37.509097363080116, 6.871800442078014], [37.511098739618255, 6.871241802236448], [37.51199133917265, 6.873363182245699]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'shade_coffee'::agroforestry_subtype,
    0.836,
    12.72,
    0.178,
    'Agroforestry Research Network',
    2024,
    NULL,
    'Hybrid Remote Sensing',
    'v3.8',
    '2026-09-19T14:42:35.144053Z'::timestamptz,
    '2026-09-19T14:42:35.144053Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '5d8076e7-3aa3-48cc-aa86-659efe150427'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-7.485347106550817, 39.497340582902915], [-7.484527714549854, 39.50015912378457], [-7.489565010541937, 39.50156213131912], [-7.491832353579827, 39.499608693235096], [-7.491921632550765, 39.4974980142419], [-7.491806867904971, 39.49557552154937], [-7.488858174498904, 39.49504352136442], [-7.484771072983186, 39.49505639386395], [-7.485347106550817, 39.497340582902915]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'montado'::agroforestry_subtype,
    0.939,
    38.21,
    0.077,
    'Copernicus Sentinel-2',
    2023,
    NULL,
    'Hybrid Remote Sensing',
    'v3.6',
    '2026-09-19T14:42:35.144082Z'::timestamptz,
    '2026-09-19T14:42:35.144082Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'ef5f4666-9e9c-4f1b-abb0-e677e096e39e'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.4529151670450915, 40.35658002047906], [-6.4556340719745995, 40.35962586558407], [-6.458282881750922, 40.36152404247887], [-6.461661196174004, 40.36157669321914], [-6.466129858956219, 40.35826670960409], [-6.464650747381501, 40.35525511222409], [-6.461373824085466, 40.35328224849207], [-6.458536553176189, 40.35321747688559], [-6.452309270822456, 40.35344590201666], [-6.4529151670450915, 40.35658002047906]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'montado'::agroforestry_subtype,
    0.879,
    77.39,
    0.138,
    'IDEE Land Cover 2023',
    2022,
    NULL,
    'GEDI LiDAR + ML',
    'v2.3',
    '2026-09-19T14:42:35.144108Z'::timestamptz,
    '2026-09-19T14:42:35.144108Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'b0e31af4-e6c4-4b18-b442-6bf2eda2f29f'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.760722560871111, 39.416725011990124], [-6.766629486576671, 39.42320065379324], [-6.7734080704644954, 39.42025304676213], [-6.776890761051299, 39.416193945906585], [-6.775659170102884, 39.41107615300902], [-6.766459995482095, 39.41154192458938], [-6.760722560871111, 39.416725011990124]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.902,
    122.21,
    0.122,
    'IDEE Land Cover 2023',
    2023,
    NULL,
    'PlanetScope + CNN',
    'v3.6',
    '2026-09-19T14:42:35.144131Z'::timestamptz,
    '2026-09-19T14:42:35.144131Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '646d39ab-1cad-487e-b8fb-53db84db73da'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.213571899579103, 40.228587030312546], [-6.217633422371517, 40.23184818461886], [-6.223881265204598, 40.230205029616194], [-6.2238607946610545, 40.22528118821779], [-6.2179209743098935, 40.22508982296904], [-6.213571899579103, 40.228587030312546]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'montado'::agroforestry_subtype,
    0.903,
    53.36,
    0.121,
    'IDEE Land Cover 2023',
    2022,
    NULL,
    'Hybrid Remote Sensing',
    'v2.3',
    '2026-09-19T14:42:35.144154Z'::timestamptz,
    '2026-09-19T14:42:35.144154Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '50918d6e-4bec-4f97-9d34-9dd69a4c0688'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.557825885831019, 39.036084164649196], [-5.5595442742396255, 39.03784263825241], [-5.562097237733868, 39.03738939848613], [-5.562740273543963, 39.03568419384962], [-5.562569928784425, 39.034041145715044], [-5.5589898002169305, 39.03420318869036], [-5.557825885831019, 39.036084164649196]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.932,
    15.75,
    0.088,
    'Copernicus Sentinel-2',
    2021,
    NULL,
    'Hybrid Remote Sensing',
    'v2.2',
    '2026-09-19T14:42:35.144175Z'::timestamptz,
    '2026-09-19T14:42:35.144175Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '4138271a-e046-425b-942a-d0b8dd0f4024'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.309045086721584, 40.39807344191038], [-5.310673099834643, 40.39982365726656], [-5.312144274464173, 40.40142651010526], [-5.314063302126514, 40.39962178262654], [-5.316600531860015, 40.398898972448485], [-5.314745377733534, 40.39604844413149], [-5.312273488071476, 40.39574886952486], [-5.309474875519923, 40.396205336997234], [-5.309045086721584, 40.39807344191038]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'montado'::agroforestry_subtype,
    0.924,
    24.61,
    0.098,
    'IDEE Land Cover 2023',
    2022,
    NULL,
    'PlanetScope + CNN',
    'v3.5',
    '2026-09-19T14:42:35.144198Z'::timestamptz,
    '2026-09-19T14:42:35.144198Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'f86e8bcf-45cf-45eb-8dd0-47338c5069f4'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.318700388262379, 38.744246023705394], [-6.319538108121866, 38.74572768001153], [-6.320779221263037, 38.74843725839782], [-6.324801153527576, 38.74765913749304], [-6.327901426098049, 38.74674465079573], [-6.32912991065803, 38.74307393141509], [-6.329127735634898, 38.739707730960966], [-6.3258180040393786, 38.73992715886987], [-6.322218055745714, 38.73988807286994], [-6.319793290277389, 38.7404655679429], [-6.318700388262379, 38.744246023705394]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.86,
    60.42,
    0.096,
    'IDEE Land Cover 2023',
    2021,
    NULL,
    'Sentinel-2 + Random Forest',
    'v2.9',
    '2026-09-19T14:42:35.144222Z'::timestamptz,
    '2026-09-19T14:42:35.144222Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '11f6c15e-c928-4f36-92ff-8671a65afdfd'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.089532113087174, 39.08884240896625], [-5.090763711195385, 39.09046533274156], [-5.095220736786892, 39.094211941521124], [-5.09912782908405, 39.09350127634336], [-5.104061606859667, 39.0911774280293], [-5.103824649630267, 39.086901577841665], [-5.105189431853998, 39.08446341189392], [-5.101590027176079, 39.08079163607242], [-5.09463994189276, 39.081640254488285], [-5.090400032750346, 39.08357922405709], [-5.089532113087174, 39.08884240896625]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.856,
    160.4,
    0.209,
    'Spanish Forest Inventory',
    2022,
    NULL,
    'PlanetScope + CNN',
    'v1.5',
    '2026-09-19T14:42:35.144249Z'::timestamptz,
    '2026-09-19T14:42:35.144249Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'aebdf11d-ee0f-44c6-b355-f3990d3d02de'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.820965428440297, 39.12778949625142], [-6.822971760091523, 39.132771805619875], [-6.828805681067828, 39.13186919828509], [-6.834361915385122, 39.131691482806076], [-6.834532952633995, 39.12543751214263], [-6.828298631856266, 39.1218769190022], [-6.822552214045317, 39.12330448697797], [-6.820965428440297, 39.12778949625142]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.899,
    89.77,
    0.053,
    'Spanish Forest Inventory',
    2022,
    NULL,
    'Sentinel-2 + Random Forest',
    'v3.3',
    '2026-09-19T14:42:35.144271Z'::timestamptz,
    '2026-09-19T14:42:35.144271Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '122f9431-f1e8-4b7e-810e-07d50ec00e4f'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.874466387862824, 40.36775662342105], [-6.8749106302487055, 40.37313392664806], [-6.880966291577012, 40.37310472500457], [-6.884716855433051, 40.37168315932052], [-6.886562193187515, 40.368868665137526], [-6.885303336121828, 40.36393848190382], [-6.880024540150032, 40.36353821914326], [-6.87417331633177, 40.364102154025], [-6.874466387862824, 40.36775662342105]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.916,
    98.31,
    0.124,
    'Spanish Forest Inventory',
    2020,
    NULL,
    'PlanetScope + CNN',
    'v3.3',
    '2026-09-19T14:42:35.144294Z'::timestamptz,
    '2026-09-19T14:42:35.144294Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '9f451032-1985-41c1-aaa7-767c3f826bd6'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.776707168698128, 40.158731446046836], [-5.777947479335668, 40.16180159793295], [-5.779988030354859, 40.16410528838902], [-5.785351902906862, 40.16272509905548], [-5.788365320858835, 40.16155749257613], [-5.7878732732115585, 40.15733805847053], [-5.784409502993322, 40.15517318989555], [-5.78210698317913, 40.155695704684724], [-5.777642496939509, 40.155665025973136], [-5.776707168698128, 40.158731446046836]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'montado'::agroforestry_subtype,
    0.922,
    83.59,
    0.105,
    'Copernicus Sentinel-2',
    2022,
    NULL,
    'GEDI LiDAR + ML',
    'v2.1',
    '2026-09-19T14:42:35.144318Z'::timestamptz,
    '2026-09-19T14:42:35.144318Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '874b1914-1f96-40e6-b15e-d062c851a392'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.632430702408071, 39.98426763434264], [-6.633682632696409, 39.98478190705139], [-6.634886951733359, 39.985447577371666], [-6.6367496211286126, 39.986001421694084], [-6.637833358288404, 39.984793322694486], [-6.637778560163156, 39.98371679280912], [-6.637903785737051, 39.98273483919919], [-6.635705585128093, 39.98223386943618], [-6.633951485907654, 39.98151311385245], [-6.632806397472525, 39.98256294282705], [-6.632430702408071, 39.98426763434264]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.984,
    17.13,
    0.013,
    'SITEX Extremadura Geospatial',
    2022,
    'https://sitex.gobex.es/',
    'PlanetScope + CNN',
    'v2.6',
    '2026-09-19T14:42:35.144344Z'::timestamptz,
    '2026-09-19T14:42:35.144344Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '3dadf870-11d3-4876-a27c-017c95bcdb6f'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.134075476156872, 38.95845698938996], [-5.142888871468536, 38.9625558912379], [-5.146730233885906, 38.96313553648915], [-5.154941475202038, 38.96099455069835], [-5.152382484536425, 38.95613137315144], [-5.148949270807618, 38.95028733571107], [-5.1386685383417, 38.9528590210514], [-5.134075476156872, 38.95845698938996]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.943,
    169.29,
    0.039,
    'Spanish Forest Inventory',
    2023,
    NULL,
    'GEDI LiDAR + ML',
    'v1.5',
    '2026-09-19T14:42:35.144367Z'::timestamptz,
    '2026-09-19T14:42:35.144367Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '7aaa3aec-af68-41e9-9435-069db4e65c2a'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-7.0004146378213195, 39.179270123649005], [-7.003007918783008, 39.1820391163707], [-7.006884986895318, 39.181481209768215], [-7.010779274889898, 39.18075988458226], [-7.010696029375101, 39.177251820385415], [-7.006700829149496, 39.17515299707878], [-7.00310216827349, 39.1760097621833], [-7.0004146378213195, 39.179270123649005]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.94,
    49.74,
    0.059,
    'Spanish Forest Inventory',
    2022,
    NULL,
    'GEDI LiDAR + ML',
    'v3.7',
    '2026-09-19T14:42:35.144388Z'::timestamptz,
    '2026-09-19T14:42:35.144388Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '938d19e0-3779-4f30-8365-f9f9e205933a'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.026259282746828, 39.29114298467888], [-6.028309418064401, 39.29322330854018], [-6.031640895871414, 39.29327864282192], [-6.032440448151748, 39.29028733921981], [-6.028226644377938, 39.289153765453186], [-6.026259282746828, 39.29114298467888]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.957,
    14.62,
    0.025,
    'Spanish Forest Inventory',
    2023,
    NULL,
    'PlanetScope + CNN',
    'v3.1',
    '2026-09-19T14:42:35.144411Z'::timestamptz,
    '2026-09-19T14:42:35.144411Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'f4f8ce89-3768-4a4f-984e-312e2c12d7c1'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.344463271253566, 38.32917676070189], [-6.349790236939989, 38.33191511267603], [-6.353345673817893, 38.33199702283117], [-6.3601855403776035, 38.32966578618562], [-6.354998747917394, 38.32462617791082], [-6.347945923210224, 38.32333683735791], [-6.344463271253566, 38.32917676070189]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'woodlot'::agroforestry_subtype,
    0.876,
    85.98,
    0.084,
    'Copernicus Sentinel-2',
    2023,
    NULL,
    'PlanetScope + CNN',
    'v2.4',
    '2026-09-19T14:42:35.144432Z'::timestamptz,
    '2026-09-19T14:42:35.144432Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '1989cfe1-a555-4d01-9c58-bf51794bd1b5'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-7.288524468442921, 38.96839007407136], [-7.294247981601387, 38.971834475762584], [-7.299787440371588, 38.97639304310744], [-7.304852002260669, 38.9741260854712], [-7.308820331995757, 38.97087564644959], [-7.310275927635799, 38.96361382058923], [-7.304261465849539, 38.96373669666446], [-7.299968467177093, 38.96165930934426], [-7.294239120060091, 38.96327673778099], [-7.288524468442921, 38.96839007407136]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'montado'::agroforestry_subtype,
    0.947,
    274.91,
    0.046,
    'Spanish Forest Inventory',
    2024,
    NULL,
    'PlanetScope + CNN',
    'v2.1',
    '2026-09-19T14:42:35.144454Z'::timestamptz,
    '2026-09-19T14:42:35.144454Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '563cca99-c7b5-44f2-a5dd-1b1979eac1f1'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.672804851624407, 38.7175758049063], [-6.6787440603267685, 38.72468176545357], [-6.683915620657889, 38.72134338479371], [-6.684317061249898, 38.71640200046205], [-6.678916174473255, 38.713543686838534], [-6.672804851624407, 38.7175758049063]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.889,
    88.46,
    0.148,
    'Copernicus Sentinel-2',
    2020,
    NULL,
    'Sentinel-2 + Random Forest',
    'v1.7',
    '2026-09-19T14:42:35.144477Z'::timestamptz,
    '2026-09-19T14:42:35.144477Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '686e2bb3-488f-4525-983c-ece4947fc864'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.783366763770921, 39.52159931857994], [-5.785087706838554, 39.52320759965774], [-5.786590620355662, 39.52333954832477], [-5.787766343364567, 39.52409306261025], [-5.789346030275247, 39.52222544223703], [-5.789063533673234, 39.521004361722184], [-5.788213502441904, 39.51972136983143], [-5.786531218537916, 39.52031487525012], [-5.784620016248624, 39.520532912098155], [-5.783366763770921, 39.52159931857994]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'woodlot'::agroforestry_subtype,
    0.883,
    14.97,
    0.112,
    'Spanish Forest Inventory',
    2020,
    NULL,
    'Sentinel-2 + Random Forest',
    'v3.9',
    '2026-09-19T14:42:35.144499Z'::timestamptz,
    '2026-09-19T14:42:35.144499Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '6ca79434-67e7-4782-bac6-ed4e2df74f75'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-7.376377935706085, 39.06180577322327], [-7.379414117159657, 39.06387821664665], [-7.385854976872311, 39.065972913341], [-7.38703524027029, 39.06181923396185], [-7.384822794965816, 39.05789384365654], [-7.380532346521389, 39.057687513118296], [-7.376377935706085, 39.06180577322327]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'silvopasture'::agroforestry_subtype,
    0.928,
    62.17,
    0.091,
    'Spanish Forest Inventory',
    2022,
    NULL,
    'PlanetScope + CNN',
    'v1.5',
    '2026-09-19T14:42:35.144518Z'::timestamptz,
    '2026-09-19T14:42:35.144518Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'ff9e48df-1e31-4233-8919-6affc54a23b2'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.259583635344335, 40.004299347316056], [-6.259763061246082, 40.010252627908166], [-6.266313493354489, 40.00990526854983], [-6.27178115108959, 40.008518357867175], [-6.276495604784696, 40.006703574094566], [-6.277522913273392, 40.00207873328677], [-6.271033155096871, 39.99757855366749], [-6.264237385245227, 39.99581951270968], [-6.2588527506432685, 39.999412136601826], [-6.259583635344335, 40.004299347316056]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'silvopasture'::agroforestry_subtype,
    0.952,
    179.93,
    0.026,
    'IDEE Land Cover 2023',
    2022,
    NULL,
    'Hybrid Remote Sensing',
    'v3.1',
    '2026-09-19T14:42:35.144604Z'::timestamptz,
    '2026-09-19T14:42:35.144604Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '7afde431-7dfe-4722-ae53-a8022088bdb2'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.621431405075658, 40.06730477199925], [-5.629877136303691, 40.073491447594], [-5.637282582532222, 40.07179602706092], [-5.640286858351274, 40.06693258393628], [-5.63594324886187, 40.06271239107215], [-5.62830105085403, 40.061994297056785], [-5.621431405075658, 40.06730477199925]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.94,
    174.94,
    0.055,
    'IDEE Land Cover 2023',
    2024,
    NULL,
    'GEDI LiDAR + ML',
    'v2.4',
    '2026-09-19T14:42:35.144640Z'::timestamptz,
    '2026-09-19T14:42:35.144640Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'e0bc35e7-88de-475c-9eb8-8ea16d7bafb1'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.038222169871816, 39.600490361552936], [-6.038068394497872, 39.60299730701745], [-6.041076037084753, 39.60480485318153], [-6.044837811505522, 39.60388170200899], [-6.045680843146862, 39.60133448078], [-6.044497012878801, 39.59936230486898], [-6.042310846228255, 39.59871241458487], [-6.038339925543703, 39.5979681113397], [-6.038222169871816, 39.600490361552936]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'montado'::agroforestry_subtype,
    0.925,
    33.95,
    0.048,
    'SITEX Extremadura Geospatial',
    2020,
    'https://sitex.gobex.es/',
    'Sentinel-2 + Random Forest',
    'v3.6',
    '2026-09-19T14:42:35.144665Z'::timestamptz,
    '2026-09-19T14:42:35.144665Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '63107d33-5327-4b0d-98e5-fdf8a802e0b0'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.6326498079479865, 38.50285014304783], [-5.633136748839917, 38.50759183940889], [-5.6393770779836165, 38.50848569551022], [-5.641903059608128, 38.50727775967225], [-5.6496977434511715, 38.504371998369045], [-5.647247749926296, 38.50036105580118], [-5.642855481493669, 38.4944168193472], [-5.637172599460132, 38.49569160217019], [-5.631367009426484, 38.4971032718706], [-5.6326498079479865, 38.50285014304783]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.944,
    179.38,
    0.069,
    'IDEE Land Cover 2023',
    2022,
    NULL,
    'Sentinel-2 + Random Forest',
    'v3.5',
    '2026-09-19T14:42:35.144687Z'::timestamptz,
    '2026-09-19T14:42:35.144687Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'b8c48145-5d55-4711-a764-3ffec1d4d7af'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.3000822038892075, 38.43964597241944], [-6.301222443241373, 38.44372685187732], [-6.307033661310086, 38.44871522869639], [-6.310980347456858, 38.44665223677114], [-6.317896313825751, 38.44153266330687], [-6.314072600967482, 38.436542767236375], [-6.311977378406727, 38.434401471821516], [-6.307402248195106, 38.432738485553564], [-6.29759803019927, 38.43342796967016], [-6.3000822038892075, 38.43964597241944]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.953,
    197.9,
    0.027,
    'Copernicus Sentinel-2',
    2024,
    NULL,
    'GEDI LiDAR + ML',
    'v1.3',
    '2026-09-19T14:42:35.144711Z'::timestamptz,
    '2026-09-19T14:42:35.144711Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '262e0464-636b-45ff-82b1-6bb5daab8f8a'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.893574392553858, 40.011498974936], [-5.893543360479961, 40.014074052977314], [-5.8964896999841345, 40.01573497386204], [-5.898288094172477, 40.014258385859684], [-5.902641052429705, 40.013885587707854], [-5.902164895355775, 40.01185579538972], [-5.901546631030581, 40.00886859894348], [-5.899047956682266, 40.00837886285205], [-5.895088337830265, 40.00835888691414], [-5.8947873125723325, 40.00949306422666], [-5.893574392553858, 40.011498974936]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'silvopasture'::agroforestry_subtype,
    0.929,
    38.52,
    0.053,
    'SITEX Extremadura Geospatial',
    2024,
    'https://sitex.gobex.es/',
    'Hybrid Remote Sensing',
    'v1.2',
    '2026-09-19T14:42:35.144735Z'::timestamptz,
    '2026-09-19T14:42:35.144735Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'fb9bd952-a3f0-46ad-8905-3990662d56ab'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.466696635596154, 38.735090429160046], [-6.468976617576386, 38.73775781789251], [-6.474046427010651, 38.74084835376935], [-6.476252727674342, 38.73755678266551], [-6.478492882166987, 38.73298198225792], [-6.474477383441611, 38.731239354813354], [-6.469573000688646, 38.73232602851873], [-6.466696635596154, 38.735090429160046]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.951,
    93.21,
    0.026,
    'IDEE Land Cover 2023',
    2023,
    NULL,
    'Hybrid Remote Sensing',
    'v3.9',
    '2026-09-19T14:42:35.144759Z'::timestamptz,
    '2026-09-19T14:42:35.144759Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'b6d81517-cdae-4d99-acde-c1c2e8332b22'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.94302056486429, 39.85943660037871], [-5.940441857271546, 39.864067621874916], [-5.9487907525548165, 39.86660354174943], [-5.9528216668940415, 39.86562176298606], [-5.959701800750934, 39.86293251327816], [-5.955551391870951, 39.85797482221366], [-5.954076078638258, 39.85277145890448], [-5.94861758338453, 39.85535652708796], [-5.943432720131604, 39.854860989494206], [-5.94302056486429, 39.85943660037871]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'silvopasture'::agroforestry_subtype,
    0.94,
    169.16,
    0.073,
    'IDEE Land Cover 2023',
    2022,
    NULL,
    'Hybrid Remote Sensing',
    'v3.6',
    '2026-09-19T14:42:35.144785Z'::timestamptz,
    '2026-09-19T14:42:35.144785Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '7a08693a-1759-4181-94a3-931e09c14dd9'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.489810817086419, 38.00864517816478], [-5.492815184244436, 38.01374050322651], [-5.5017752558465, 38.012728871021714], [-5.50202087875456, 38.00594746043071], [-5.495480069745568, 38.00462881657039], [-5.489810817086419, 38.00864517816478]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.976,
    76.13,
    0.032,
    'Copernicus Sentinel-2',
    2020,
    NULL,
    'GEDI LiDAR + ML',
    'v3.1',
    '2026-09-19T14:42:35.144806Z'::timestamptz,
    '2026-09-19T14:42:35.144806Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '94cb7e4e-2f6a-4e9f-b809-e1143c780fc7'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.827193308895946, 38.59077043364174], [-5.828641394450032, 38.59487042928094], [-5.8336895871523184, 38.594672439833516], [-5.838469114370958, 38.59197143430438], [-5.838451852725422, 38.58758415343447], [-5.834799149378046, 38.58458405274902], [-5.829319606136424, 38.584856775441075], [-5.827193308895946, 38.59077043364174]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.905,
    74.99,
    0.081,
    'IDEE Land Cover 2023',
    2021,
    NULL,
    'GEDI LiDAR + ML',
    'v3.4',
    '2026-09-19T14:42:35.144827Z'::timestamptz,
    '2026-09-19T14:42:35.144827Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '36a9cd6f-1c7f-48a6-8c45-c266df030ce5'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-7.420742448555488, 38.504005027767406], [-7.421504990877455, 38.506079379889705], [-7.422817916700566, 38.50713634007592], [-7.425969435188485, 38.50636687741992], [-7.427632121869914, 38.50677415294763], [-7.428134632079684, 38.50431183703813], [-7.426911858458148, 38.503199338036424], [-7.426194754020016, 38.502037793004284], [-7.423663042855519, 38.502477204766386], [-7.42217363353215, 38.50318226022378], [-7.420742448555488, 38.504005027767406]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'montado'::agroforestry_subtype,
    0.961,
    32.51,
    0.033,
    'IDEE Land Cover 2023',
    2022,
    NULL,
    'Hybrid Remote Sensing',
    'v1.2',
    '2026-09-19T14:42:35.144851Z'::timestamptz,
    '2026-09-19T14:42:35.144851Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '8c82001a-9ade-4881-b2b1-b1ed0652bdf9'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.40801400409799, 40.25202545457722], [-5.411675699598121, 40.256499292714764], [-5.416210762551409, 40.25642328375866], [-5.422176747292186, 40.25522094639021], [-5.420965437705043, 40.249827943492036], [-5.41578264984333, 40.24945633305843], [-5.412611307920557, 40.249107804929075], [-5.40801400409799, 40.25202545457722]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.959,
    67.45,
    0.057,
    'SITEX Extremadura Geospatial',
    2021,
    'https://sitex.gobex.es/',
    'PlanetScope + CNN',
    'v3.8',
    '2026-09-19T14:42:35.144877Z'::timestamptz,
    '2026-09-19T14:42:35.144877Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'd44fd9bf-c624-4038-8fa2-d70027a113d3'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.366910085127464, 40.01761142707671], [-6.36967515923388, 40.022754321923316], [-6.374852559130225, 40.02643580842328], [-6.383538624648315, 40.02276976235307], [-6.381627106528464, 40.01786078829423], [-6.383349117789966, 40.01376181240919], [-6.375218255021133, 40.013753683022564], [-6.368678837394668, 40.01449528050166], [-6.366910085127464, 40.01761142707671]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'silvopasture'::agroforestry_subtype,
    0.896,
    154.69,
    0.103,
    'IDEE Land Cover 2023',
    2023,
    NULL,
    'PlanetScope + CNN',
    'v2.2',
    '2026-09-19T14:42:35.144900Z'::timestamptz,
    '2026-09-19T14:42:35.144900Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '669ad5be-bb36-4d2d-abdf-a7511da25d2c'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.827269886941994, 39.904493201292304], [-5.829147408305308, 39.90740100336892], [-5.8319333674079825, 39.90852329316212], [-5.8349744076429095, 39.907651938048275], [-5.840176197033236, 39.906319283625464], [-5.840302351232399, 39.902210153846774], [-5.836560069446699, 39.9008128017306], [-5.831604061890052, 39.898792479357596], [-5.8292685218820885, 39.90139838387927], [-5.827269886941994, 39.904493201292304]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.924,
    95.97,
    0.082,
    'Spanish Forest Inventory',
    2021,
    NULL,
    'GEDI LiDAR + ML',
    'v3.5',
    '2026-09-19T14:42:35.144926Z'::timestamptz,
    '2026-09-19T14:42:35.144926Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '9b48dad9-be35-4109-8d83-cfbbf577bb32'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.767064910056289, 38.18512251447594], [-6.76876616691614, 38.185831597295284], [-6.772102242592004, 38.18709607304717], [-6.773994173522766, 38.1892665607832], [-6.776200397909012, 38.186362321933316], [-6.777701992708484, 38.18448667973921], [-6.776227432966868, 38.18269889405999], [-6.773905301283991, 38.18127047267145], [-6.771505430707566, 38.181461066669115], [-6.768699360275237, 38.18234865333171], [-6.767064910056289, 38.18512251447594]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'montado'::agroforestry_subtype,
    0.888,
    69.92,
    0.141,
    'Spanish Forest Inventory',
    2022,
    NULL,
    'Hybrid Remote Sensing',
    'v3.2',
    '2026-09-19T14:42:35.144951Z'::timestamptz,
    '2026-09-19T14:42:35.144951Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '21305bd9-abba-4132-a744-02165fcaeae3'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-7.4658410977296805, 38.01335386595654], [-7.4667566769251374, 38.016499297426385], [-7.4700312065161265, 38.017646574471016], [-7.47390292145951, 38.01705244897825], [-7.476610852043392, 38.01602456786445], [-7.47633003075475, 38.012260635039354], [-7.473364271661664, 38.010871575863995], [-7.470663606288842, 38.01071563234925], [-7.4679084086579035, 38.0110611590841], [-7.4658410977296805, 38.01335386595654]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'silvopasture'::agroforestry_subtype,
    0.909,
    44.28,
    0.092,
    'SITEX Extremadura Geospatial',
    2020,
    'https://sitex.gobex.es/',
    'PlanetScope + CNN',
    'v3.5',
    '2026-09-19T14:42:35.144975Z'::timestamptz,
    '2026-09-19T14:42:35.144975Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '26c98b27-054e-4f69-b1a9-6a2c8d7d2cad'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.196347351856944, 40.15327087726429], [-5.197734403038471, 40.155403419374444], [-5.199846045536186, 40.15566752442146], [-5.200923686381408, 40.154058377740014], [-5.200866656628254, 40.15280625719465], [-5.199434467464731, 40.15165867304064], [-5.19735096503858, 40.15232060865051], [-5.196347351856944, 40.15327087726429]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.873,
    14.29,
    0.172,
    'IDEE Land Cover 2023',
    2023,
    NULL,
    'Sentinel-2 + Random Forest',
    'v3.3',
    '2026-09-19T14:42:35.145000Z'::timestamptz,
    '2026-09-19T14:42:35.145000Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '4a443c17-c874-469f-a299-17cae83e8ea5'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.917008259390222, 39.06256058699139], [-5.917441561574184, 39.063293220185294], [-5.919022547409127, 39.06471014112666], [-5.9207717034207255, 39.064596333741704], [-5.922381595879789, 39.062738579752924], [-5.921109509869854, 39.06165336438575], [-5.920312003444943, 39.061066531443885], [-5.919441370196095, 39.060032111321924], [-5.917867863507416, 39.06129550400158], [-5.917008259390222, 39.06256058699139]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.979,
    15.47,
    0.022,
    'IDEE Land Cover 2023',
    2024,
    NULL,
    'PlanetScope + CNN',
    'v2.9',
    '2026-09-19T14:42:35.145023Z'::timestamptz,
    '2026-09-19T14:42:35.145023Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'f8eee9f4-7762-42f5-9448-6232f176732d'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.130943176560456, 38.9724242978876], [-5.136465613047923, 38.97456301947107], [-5.1412144052682, 38.97807561887941], [-5.148494412522423, 38.975722550463274], [-5.149741782066093, 38.97224796626929], [-5.146599034007029, 38.96795193399394], [-5.140505717968241, 38.96602547822804], [-5.135975464383243, 38.96775303335302], [-5.130943176560456, 38.9724242978876]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'woodlot'::agroforestry_subtype,
    0.85,
    140.38,
    0.179,
    'Spanish Forest Inventory',
    2020,
    NULL,
    'Sentinel-2 + Random Forest',
    'v3.0',
    '2026-09-19T14:42:35.145047Z'::timestamptz,
    '2026-09-19T14:42:35.145047Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '6d590e85-d432-4c78-a540-f5993f374d31'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.843201827666478, 39.983073384332116], [-6.846853491565578, 39.986120513032006], [-6.8541963722219155, 39.98601987688567], [-6.855136683918157, 39.98007521940404], [-6.848330987233734, 39.97905326818605], [-6.843201827666478, 39.983073384332116]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.933,
    65.27,
    0.075,
    'Copernicus Sentinel-2',
    2020,
    NULL,
    'Hybrid Remote Sensing',
    'v1.4',
    '2026-09-19T14:42:35.145069Z'::timestamptz,
    '2026-09-19T14:42:35.145069Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'd266416a-c1e1-4428-973b-ace06ebf5cc2'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.605556751044703, 39.14681254623252], [-5.611817223443893, 39.15255008552909], [-5.619415852527568, 39.15012954664068], [-5.617384044000096, 39.1448229924661], [-5.61172356864812, 39.1439886348917], [-5.605556751044703, 39.14681254623252]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.86,
    85.91,
    0.111,
    'SITEX Extremadura Geospatial',
    2023,
    'https://sitex.gobex.es/',
    'GEDI LiDAR + ML',
    'v3.2',
    '2026-09-19T14:42:35.145094Z'::timestamptz,
    '2026-09-19T14:42:35.145094Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '7c93010c-9253-408c-a8c8-ed5176a4cdaf'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.631033577562682, 38.6013776372681], [-5.636895013121439, 38.60809151382037], [-5.642359330183647, 38.60478767946152], [-5.645191721561062, 38.59722462868109], [-5.635532321774208, 38.596723400340124], [-5.631033577562682, 38.6013776372681]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.931,
    133.9,
    0.079,
    'IDEE Land Cover 2023',
    2023,
    NULL,
    'PlanetScope + CNN',
    'v1.1',
    '2026-09-19T14:42:35.145116Z'::timestamptz,
    '2026-09-19T14:42:35.145116Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '9ef91aa3-a86e-4285-8b50-9806de89cfcc'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.0385589192649824, 38.48727244065503], [-5.040395814228233, 38.48954148431883], [-5.045128383312507, 38.4901033726734], [-5.047299136124175, 38.489736771098734], [-5.048473725607606, 38.487746991347805], [-5.048171383878451, 38.48492930664317], [-5.044992214979905, 38.482494829286765], [-5.041302595380197, 38.484528410510485], [-5.0385589192649824, 38.48727244065503]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.969,
    59.63,
    0.027,
    'IDEE Land Cover 2023',
    2024,
    NULL,
    'Sentinel-2 + Random Forest',
    'v2.7',
    '2026-09-19T14:42:35.145139Z'::timestamptz,
    '2026-09-19T14:42:35.145139Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '7557a4bb-0dd3-4b0c-9ff2-e2f4e19ec986'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-7.210739423089261, 39.237239435515235], [-7.210906804358972, 39.239652589610344], [-7.212824354555892, 39.23904192618404], [-7.214528862523856, 39.238999918331714], [-7.21624686418455, 39.23791719088304], [-7.214773229727586, 39.2362798956383], [-7.2131563480610845, 39.235460205406454], [-7.210817750350197, 39.235655412250786], [-7.210739423089261, 39.237239435515235]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'montado'::agroforestry_subtype,
    0.985,
    18.75,
    0.016,
    'SITEX Extremadura Geospatial',
    2024,
    'https://sitex.gobex.es/',
    'GEDI LiDAR + ML',
    'v2.4',
    '2026-09-19T14:42:35.145162Z'::timestamptz,
    '2026-09-19T14:42:35.145162Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '0f0dd5d8-95d0-4d22-8760-a05019597bac'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.966553253816874, 40.48932150748438], [-6.965698740953427, 40.490385074154496], [-6.968413026354525, 40.49200825918397], [-6.969385436251354, 40.491613658011815], [-6.9718607258451035, 40.49093244957157], [-6.971290049364898, 40.48877291991218], [-6.971894108227873, 40.48779746953347], [-6.969731269222505, 40.48598736905628], [-6.968548994058325, 40.48725477146337], [-6.965599155415005, 40.48752546016224], [-6.966553253816874, 40.48932150748438]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.979,
    25.69,
    0.03,
    'Spanish Forest Inventory',
    2024,
    NULL,
    'Sentinel-2 + Random Forest',
    'v3.6',
    '2026-09-19T14:42:35.145185Z'::timestamptz,
    '2026-09-19T14:42:35.145185Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'e2e71f65-cdfe-4325-922c-d20ed6b4ed73'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.046982953014635, 40.2050455405157], [-6.050069010908598, 40.20768649379781], [-6.054897218284123, 40.2086530247894], [-6.058467944771845, 40.20740729785933], [-6.05925100670805, 40.20248355407723], [-6.05385600651103, 40.20014286280657], [-6.050688831122305, 40.20221505680598], [-6.046982953014635, 40.2050455405157]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'silvopasture'::agroforestry_subtype,
    0.889,
    74.96,
    0.075,
    'Spanish Forest Inventory',
    2021,
    NULL,
    'Sentinel-2 + Random Forest',
    'v3.9',
    '2026-09-19T14:42:35.145210Z'::timestamptz,
    '2026-09-19T14:42:35.145210Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'f3acf928-1fa9-445e-8a5a-3a34dec0bc28'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.783928822809363, 39.273225999669016], [-5.789116898955828, 39.279316894031524], [-5.795810149683787, 39.27971887636612], [-5.798034209656242, 39.27392952309628], [-5.794440569128559, 39.26942418834903], [-5.788566600547191, 39.26817223728534], [-5.783928822809363, 39.273225999669016]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.95,
    115.21,
    0.05,
    'IDEE Land Cover 2023',
    2024,
    NULL,
    'PlanetScope + CNN',
    'v1.2',
    '2026-09-19T14:42:35.145234Z'::timestamptz,
    '2026-09-19T14:42:35.145234Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '726f0e1c-922d-4fda-9621-fe95a8d0b317'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-7.472545341654728, 38.456281574217975], [-7.479818347688635, 38.459786558723486], [-7.485311176755726, 38.46105173349756], [-7.491033620661517, 38.45766400375103], [-7.4956870204169475, 38.452039017474576], [-7.486546593904526, 38.44859314368756], [-7.47944229108058, 38.45153973088718], [-7.472545341654728, 38.456281574217975]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.862,
    167.52,
    0.195,
    'Spanish Forest Inventory',
    2023,
    NULL,
    'Sentinel-2 + Random Forest',
    'v1.6',
    '2026-09-19T14:42:35.145257Z'::timestamptz,
    '2026-09-19T14:42:35.145257Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '00fcfd0e-6e92-40ca-88c4-faa20a69d4b7'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-7.214160052643355, 40.19290428803961], [-7.218246115259574, 40.19588336599172], [-7.224630143330761, 40.19782190921818], [-7.228495516539555, 40.19565040597392], [-7.230957271042777, 40.19245453022376], [-7.23096841828464, 40.188211283915436], [-7.224228976149815, 40.186924566997426], [-7.219990674514186, 40.18913293404741], [-7.214160052643355, 40.19290428803961]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'montado'::agroforestry_subtype,
    0.923,
    133.56,
    0.106,
    'SITEX Extremadura Geospatial',
    2020,
    'https://sitex.gobex.es/',
    'GEDI LiDAR + ML',
    'v2.6',
    '2026-09-19T14:42:35.145312Z'::timestamptz,
    '2026-09-19T14:42:35.145312Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'f807b0ce-40cd-45eb-8bae-a30edafc25d4'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.336906743107612, 38.59971950309262], [-6.338011470801963, 38.601032732699245], [-6.340412826592267, 38.60322887297069], [-6.34520199748134, 38.60185615728172], [-6.346604391320539, 38.60081857709668], [-6.347295762088626, 38.59828073840548], [-6.345257185402751, 38.596151547922574], [-6.341145725403871, 38.59551262733298], [-6.340176917516402, 38.5971649660784], [-6.336906743107612, 38.59971950309262]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.858,
    67.29,
    0.206,
    'IDEE Land Cover 2023',
    2024,
    NULL,
    'Sentinel-2 + Random Forest',
    'v3.6',
    '2026-09-19T14:42:35.145340Z'::timestamptz,
    '2026-09-19T14:42:35.145340Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '8ed63541-fa2d-4f23-a88f-3821c573ed05'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.388581872501009, 38.3657029540462], [-6.390093738171533, 38.368698858954886], [-6.393158303617088, 38.37056973994062], [-6.396661031364998, 38.36984897034202], [-6.399060919452282, 38.36788572232982], [-6.398380316333432, 38.36599752820288], [-6.396576269228318, 38.36275299886848], [-6.394734064756687, 38.36232177878171], [-6.390561668161196, 38.36297031234592], [-6.388581872501009, 38.3657029540462]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'montado'::agroforestry_subtype,
    0.85,
    72.3,
    0.191,
    'Copernicus Sentinel-2',
    2020,
    NULL,
    'Hybrid Remote Sensing',
    'v3.4',
    '2026-09-19T14:42:35.145365Z'::timestamptz,
    '2026-09-19T14:42:35.145365Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '1532944d-ad93-4e17-aad6-1be7608e07a4'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.947778077343959, 39.73302513846757], [-6.954455551563393, 39.73688350753149], [-6.960614591381647, 39.73509580035807], [-6.959789867104638, 39.72940307443086], [-6.955045856653025, 39.72855798304562], [-6.947778077343959, 39.73302513846757]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'silvopasture'::agroforestry_subtype,
    0.92,
    90.91,
    0.094,
    'SITEX Extremadura Geospatial',
    2023,
    'https://sitex.gobex.es/',
    'Sentinel-2 + Random Forest',
    'v3.9',
    '2026-09-19T14:42:35.145396Z'::timestamptz,
    '2026-09-19T14:42:35.145396Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '7c41a25d-1f79-4c7d-ba0c-a035b7b3fb03'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.736238712948935, 40.315759545632936], [-6.738367935453331, 40.321003648048695], [-6.743646897807093, 40.31766864508367], [-6.745270310905606, 40.31356149974027], [-6.73746449208226, 40.31199886653309], [-6.736238712948935, 40.315759545632936]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.985,
    63.7,
    0.021,
    'SITEX Extremadura Geospatial',
    2024,
    'https://sitex.gobex.es/',
    'GEDI LiDAR + ML',
    'v2.5',
    '2026-09-19T14:42:35.145416Z'::timestamptz,
    '2026-09-19T14:42:35.145416Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '7db5210e-70dd-4774-a493-8518ee90dfb1'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.143466876861018, 38.29365039643553], [-5.146298167463723, 38.29673191620673], [-5.150949119690993, 38.2984079642241], [-5.153090276611933, 38.29592966672917], [-5.153826686050123, 38.29300366346866], [-5.1511071194502795, 38.29035326224043], [-5.147316013898487, 38.29162568895827], [-5.143466876861018, 38.29365039643553]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.987,
    57.64,
    0.014,
    'SITEX Extremadura Geospatial',
    2021,
    'https://sitex.gobex.es/',
    'PlanetScope + CNN',
    'v3.8',
    '2026-09-19T14:42:35.145438Z'::timestamptz,
    '2026-09-19T14:42:35.145438Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '1addb1a9-fb15-4f0d-a349-42f69f4f7fd5'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.748818700542834, 39.67751549931692], [-6.752928167287113, 39.682264717081594], [-6.761364977275696, 39.68368856696687], [-6.762968645664013, 39.677207072435], [-6.760591068888588, 39.672029945499155], [-6.753609303452548, 39.673871983773985], [-6.748818700542834, 39.67751549931692]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.866,
    119.73,
    0.189,
    'Spanish Forest Inventory',
    2021,
    NULL,
    'PlanetScope + CNN',
    'v2.2',
    '2026-09-19T14:42:35.145464Z'::timestamptz,
    '2026-09-19T14:42:35.145464Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '28a57986-a93d-42ca-bd46-f63003141b0d'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.982799323517327, 39.38303160639597], [-6.985276186926655, 39.387007396818746], [-6.989674146133641, 39.389378554763894], [-6.994477781701278, 39.388718596947555], [-6.996120211126669, 39.38448675016445], [-6.994373115420355, 39.37776015252011], [-6.989442280535803, 39.37651194549055], [-6.983693019461404, 39.378004216491306], [-6.982799323517327, 39.38303160639597]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.977,
    117.57,
    0.023,
    'Copernicus Sentinel-2',
    2020,
    NULL,
    'GEDI LiDAR + ML',
    'v1.2',
    '2026-09-19T14:42:35.145487Z'::timestamptz,
    '2026-09-19T14:42:35.145487Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'eda94b43-17d2-4275-8666-8199e694154f'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-7.187135330437401, 38.282808745119375], [-7.191891134584591, 38.286012971563345], [-7.19773580882752, 38.28970767064844], [-7.201058970868065, 38.28634820650479], [-7.20423280109853, 38.28303756153544], [-7.20288444638193, 38.2765076851166], [-7.197061862072909, 38.27471731020062], [-7.189649953322002, 38.27821467199059], [-7.187135330437401, 38.282808745119375]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'montado'::agroforestry_subtype,
    0.948,
    212.04,
    0.035,
    'SITEX Extremadura Geospatial',
    2024,
    'https://sitex.gobex.es/',
    'Sentinel-2 + Random Forest',
    'v2.1',
    '2026-09-19T14:42:35.145512Z'::timestamptz,
    '2026-09-19T14:42:35.145512Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'b1dd8e05-2251-4c81-8897-abc4163ec258'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.97328084131379, 39.838265184380994], [-5.978474878874553, 39.8429420611536], [-5.9838011194930605, 39.842615640453154], [-5.99133122584322, 39.83864151383045], [-5.991703815740299, 39.83348301773236], [-5.984862344563309, 39.82888363050688], [-5.978257483395906, 39.83073353525096], [-5.97328084131379, 39.838265184380994]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'silvopasture'::agroforestry_subtype,
    0.965,
    216.37,
    0.021,
    'Spanish Forest Inventory',
    2022,
    NULL,
    'PlanetScope + CNN',
    'v2.9',
    '2026-09-19T14:42:35.145538Z'::timestamptz,
    '2026-09-19T14:42:35.145538Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'cbbb7022-92c1-4676-b519-f23ae0d98ebd'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.339526507987563, 39.106962107473436], [-6.343503204391155, 39.11096701122878], [-6.347381369337723, 39.10976647891517], [-6.347775976592258, 39.10513510681935], [-6.343336598196156, 39.10480193119392], [-6.339526507987563, 39.106962107473436]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'montado'::agroforestry_subtype,
    0.975,
    34.3,
    0.019,
    'IDEE Land Cover 2023',
    2024,
    NULL,
    'Hybrid Remote Sensing',
    'v3.3',
    '2026-09-19T14:42:35.145560Z'::timestamptz,
    '2026-09-19T14:42:35.145560Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '7373ca29-e683-4fe1-b03a-4abb47c35442'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.3102686442109395, 39.64992509565319], [-5.314926757603654, 39.65329725772166], [-5.319902295643283, 39.6545771854261], [-5.324080741321468, 39.649363475100394], [-5.3193041267661325, 39.64566491187239], [-5.31335232331126, 39.6448965013912], [-5.3102686442109395, 39.64992509565319]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'silvopasture'::agroforestry_subtype,
    0.906,
    88.25,
    0.103,
    'IDEE Land Cover 2023',
    2022,
    NULL,
    'GEDI LiDAR + ML',
    'v3.6',
    '2026-09-19T14:42:35.145582Z'::timestamptz,
    '2026-09-19T14:42:35.145582Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '0684321d-88be-43fa-b3c1-32b61114badc'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.051785423034678, 38.81662889358634], [-6.055557518708155, 38.819669604856806], [-6.057909836950653, 38.820717746832585], [-6.062973658166353, 38.81825516271086], [-6.061139280036674, 38.81505690874091], [-6.058832997620076, 38.81417995892109], [-6.05537144646345, 38.814361432841665], [-6.051785423034678, 38.81662889358634]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'silvopasture'::agroforestry_subtype,
    0.906,
    43.03,
    0.063,
    'SITEX Extremadura Geospatial',
    2024,
    'https://sitex.gobex.es/',
    'PlanetScope + CNN',
    'v1.0',
    '2026-09-19T14:42:35.145604Z'::timestamptz,
    '2026-09-19T14:42:35.145604Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '1403b344-6dc6-4791-b5aa-b7298bed7311'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-7.473679492910809, 39.74168613741793], [-7.479299160509046, 39.74697890733292], [-7.489260010749514, 39.745126635096355], [-7.493683515003653, 39.739121100876964], [-7.491063023455079, 39.73259738844609], [-7.478257868927054, 39.73289091356212], [-7.473679492910809, 39.74168613741793]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.878,
    234.22,
    0.152,
    'Spanish Forest Inventory',
    2021,
    NULL,
    'Sentinel-2 + Random Forest',
    'v3.2',
    '2026-09-19T14:42:35.145629Z'::timestamptz,
    '2026-09-19T14:42:35.145629Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '37ba3003-93a9-4e7f-a6a1-92254cad0ed9'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.373778813086207, 38.135550993117924], [-6.375997614148357, 38.14153961483178], [-6.384963004120223, 38.143580284178036], [-6.388452846179777, 38.13921915307573], [-6.388376882065628, 38.13392700372052], [-6.383851708449538, 38.12851683873692], [-6.376140781924353, 38.13059055485209], [-6.373778813086207, 38.135550993117924]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'montado'::agroforestry_subtype,
    0.888,
    154.87,
    0.066,
    'IDEE Land Cover 2023',
    2021,
    NULL,
    'GEDI LiDAR + ML',
    'v3.3',
    '2026-09-19T14:42:35.145669Z'::timestamptz,
    '2026-09-19T14:42:35.145669Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'eab11e7a-764a-4263-85f8-44060d7245b9'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.109779417951132, 38.29690502367248], [-6.10970562270893, 38.29911760134603], [-6.11365872237194, 38.298664579092986], [-6.1143111511317, 38.2968554645112], [-6.113354004189035, 38.295434393365966], [-6.110737976700908, 38.29457800874513], [-6.109779417951132, 38.29690502367248]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'montado'::agroforestry_subtype,
    0.912,
    15.59,
    0.086,
    'Spanish Forest Inventory',
    2024,
    NULL,
    'GEDI LiDAR + ML',
    'v3.4',
    '2026-09-19T14:42:35.145694Z'::timestamptz,
    '2026-09-19T14:42:35.145694Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'e890802d-cee8-4400-bc7c-df5d2b543885'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.278535611939869, 40.225954639017246], [-5.282117011110647, 40.23144385242357], [-5.289464731231873, 40.22968590555834], [-5.287642216002583, 40.224644857983776], [-5.281230519065914, 40.221361243111964], [-5.278535611939869, 40.225954639017246]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'montado'::agroforestry_subtype,
    0.885,
    74.13,
    0.148,
    'IDEE Land Cover 2023',
    2021,
    NULL,
    'PlanetScope + CNN',
    'v2.0',
    '2026-09-19T14:42:35.145715Z'::timestamptz,
    '2026-09-19T14:42:35.145715Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'f4cba338-eba1-4ae6-b247-bf50820b66cc'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.013082234869359, 39.426650883853895], [-6.020538938077513, 39.430209499395254], [-6.025447169167328, 39.43551191432942], [-6.034517882526529, 39.42923505755618], [-6.033026859353639, 39.42262077390896], [-6.026750745126407, 39.41975049861432], [-6.020130462517019, 39.42070504667132], [-6.013082234869359, 39.426650883853895]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'montado'::agroforestry_subtype,
    0.936,
    202.4,
    0.076,
    'Copernicus Sentinel-2',
    2023,
    NULL,
    'Sentinel-2 + Random Forest',
    'v3.3',
    '2026-09-19T14:42:35.145741Z'::timestamptz,
    '2026-09-19T14:42:35.145741Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '7fda8705-d93f-4865-b3d3-0327b5c1a7e5'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.540174658840905, 38.006862385397945], [-5.544703157901088, 38.010873155259226], [-5.551773662021837, 38.00856432863596], [-5.551395171830304, 38.00210715531538], [-5.5427702639405, 38.00100441315008], [-5.540174658840905, 38.006862385397945]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'silvopasture'::agroforestry_subtype,
    0.945,
    71.66,
    0.034,
    'Copernicus Sentinel-2',
    2021,
    NULL,
    'PlanetScope + CNN',
    'v3.6',
    '2026-09-19T14:42:35.145764Z'::timestamptz,
    '2026-09-19T14:42:35.145764Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '8b353c23-62b0-4593-9b87-8e26343cb1c6'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.315666983924119, 40.23611114379915], [-5.3181048142504395, 40.24029795241021], [-5.322052609292514, 40.239173359522866], [-5.324870582084195, 40.23477981407264], [-5.322309937174944, 40.23240283687414], [-5.31800405491171, 40.23129688530751], [-5.315666983924119, 40.23611114379915]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.975,
    67.81,
    0.017,
    'SITEX Extremadura Geospatial',
    2023,
    'https://sitex.gobex.es/',
    'PlanetScope + CNN',
    'v2.4',
    '2026-09-19T14:42:35.145786Z'::timestamptz,
    '2026-09-19T14:42:35.145786Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'e1b6cce4-5b4d-4042-9d8b-bfc5094d82f1'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.11182388780893, 40.49057021241544], [-6.113853471351596, 40.49568197230209], [-6.119571869622724, 40.501061009111226], [-6.124665956302152, 40.49705180998612], [-6.133973265615865, 40.49490389047187], [-6.13575119502982, 40.48941759543385], [-6.135077670821116, 40.48679031196099], [-6.126023174964019, 40.48152095716162], [-6.119362269202442, 40.48065755737976], [-6.116969636079195, 40.48577530570025], [-6.11182388780893, 40.49057021241544]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'woodlot'::agroforestry_subtype,
    0.865,
    360.44,
    0.167,
    'IDEE Land Cover 2023',
    2023,
    NULL,
    'Sentinel-2 + Random Forest',
    'v3.7',
    '2026-09-19T14:42:35.145810Z'::timestamptz,
    '2026-09-19T14:42:35.145810Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'd051d345-bbf7-4249-b8bf-ee01c9927fc1'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.671332117818764, 39.45498903160933], [-5.677049843858063, 39.4596903283243], [-5.6782660365155, 39.46404121297874], [-5.686595606072661, 39.46309778975991], [-5.689359111193949, 39.45762673087527], [-5.6882035959721025, 39.45286368063426], [-5.685961283586277, 39.44914379843752], [-5.679551794182705, 39.44952568065164], [-5.675423518404294, 39.45109689942157], [-5.671332117818764, 39.45498903160933]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.96,
    222.47,
    0.05,
    'Spanish Forest Inventory',
    2024,
    NULL,
    'Hybrid Remote Sensing',
    'v2.3',
    '2026-09-19T14:42:35.145836Z'::timestamptz,
    '2026-09-19T14:42:35.145836Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '7c70f2aa-57ac-4483-91e9-4cd52d58b27d'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.259240741797531, 38.408239472696664], [-6.259420092765036, 38.4136045980448], [-6.2665152346074775, 38.41291090022177], [-6.272076242508734, 38.411678298828015], [-6.274740369215621, 38.40676679324387], [-6.2710065255026946, 38.402258475819785], [-6.26448430301404, 38.40000930680745], [-6.261273008422687, 38.40268928564345], [-6.259240741797531, 38.408239472696664]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.851,
    160.41,
    0.098,
    'Copernicus Sentinel-2',
    2024,
    NULL,
    'GEDI LiDAR + ML',
    'v1.3',
    '2026-09-19T14:42:35.145859Z'::timestamptz,
    '2026-09-19T14:42:35.145859Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'cb049c06-460a-453b-90c3-00bdcc44b6ab'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.12508057897509, 39.151858288096946], [-6.126798191054221, 39.155451280915365], [-6.13302885039939, 39.15927069554687], [-6.137730489250806, 39.15502520114363], [-6.140015602082494, 39.151828345294476], [-6.136047861236924, 39.1483495479694], [-6.1308332891027275, 39.146928856166795], [-6.127000995795434, 39.147603203787895], [-6.12508057897509, 39.151858288096946]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.911,
    106.63,
    0.101,
    'Spanish Forest Inventory',
    2024,
    NULL,
    'Hybrid Remote Sensing',
    'v1.5',
    '2026-09-19T14:42:35.145884Z'::timestamptz,
    '2026-09-19T14:42:35.145884Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '9aa7c901-d139-4aee-a18e-f3ff2765472e'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.210347435302695, 40.00862576135768], [-6.2097497271417925, 40.01111658465645], [-6.213744195473212, 40.01301917192912], [-6.217505566824528, 40.01161294165639], [-6.220215368690712, 40.009577950928204], [-6.218719812834615, 40.00811551426339], [-6.218635973843803, 40.00549585876275], [-6.214105902726964, 40.00491631685065], [-6.211470170945521, 40.00648179288182], [-6.210347435302695, 40.00862576135768]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.865,
    69.34,
    0.171,
    'Spanish Forest Inventory',
    2020,
    NULL,
    'GEDI LiDAR + ML',
    'v3.9',
    '2026-09-19T14:42:35.145907Z'::timestamptz,
    '2026-09-19T14:42:35.145907Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'f8b806b2-3b03-4893-9d20-a55fb9a56e4c'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.12429197117323, 40.33641057698792], [-6.125767843819374, 40.339305914218215], [-6.127745276272545, 40.34067402388161], [-6.131159748428358, 40.34172000826783], [-6.133892654335602, 40.34002500103392], [-6.134499468852655, 40.33663344158698], [-6.135043692483218, 40.33463976066184], [-6.129650563217319, 40.33401338572063], [-6.128158760128179, 40.332902871316385], [-6.125471067225336, 40.3342801591559], [-6.12429197117323, 40.33641057698792]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.973,
    59.14,
    0.021,
    'SITEX Extremadura Geospatial',
    2021,
    'https://sitex.gobex.es/',
    'Hybrid Remote Sensing',
    'v3.7',
    '2026-09-19T14:42:35.145931Z'::timestamptz,
    '2026-09-19T14:42:35.145931Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '7c56e474-6331-4f02-acff-6b91a914d9d5'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.673594883829653, 38.48338485852739], [-5.676526002523383, 38.4895494039164], [-5.68287722534795, 38.48822229799924], [-5.688476133785801, 38.489680350305946], [-5.691168765900182, 38.483925012327056], [-5.689649452596671, 38.47726246519968], [-5.680712985902356, 38.475488983864025], [-5.674215196784783, 38.47754113725957], [-5.673594883829653, 38.48338485852739]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'silvopasture'::agroforestry_subtype,
    0.888,
    200.28,
    0.077,
    'Copernicus Sentinel-2',
    2022,
    NULL,
    'Hybrid Remote Sensing',
    'v3.7',
    '2026-09-19T14:42:35.145954Z'::timestamptz,
    '2026-09-19T14:42:35.145954Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '10be6a7f-f23d-4f0d-82ac-669b95f49ec9'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.339781427959627, 39.325593277162476], [-5.341484979517751, 39.326815330427245], [-5.343025789770801, 39.32752194199824], [-5.344188601262171, 39.32734119805461], [-5.344543242654513, 39.325377407105876], [-5.344758755394005, 39.32388766938878], [-5.34297797740543, 39.3237841760377], [-5.3413005165408, 39.324444310861246], [-5.339781427959627, 39.325593277162476]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'montado'::agroforestry_subtype,
    0.927,
    15.94,
    0.062,
    'IDEE Land Cover 2023',
    2023,
    NULL,
    'GEDI LiDAR + ML',
    'v1.3',
    '2026-09-19T14:42:35.145978Z'::timestamptz,
    '2026-09-19T14:42:35.145978Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '7161d6e7-5686-499d-845c-2f67ce8dc047'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.678010986850931, 39.318448575913415], [-6.680500045046611, 39.32315882356414], [-6.687545029005567, 39.32537416808539], [-6.693314209373517, 39.32106061519578], [-6.692397990420952, 39.31594254050516], [-6.687406316913326, 39.31242503923005], [-6.677536446968063, 39.31153721733795], [-6.678010986850931, 39.318448575913415]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.89,
    146.43,
    0.153,
    'SITEX Extremadura Geospatial',
    2021,
    'https://sitex.gobex.es/',
    'PlanetScope + CNN',
    'v3.0',
    '2026-09-19T14:42:35.146005Z'::timestamptz,
    '2026-09-19T14:42:35.146005Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '1dad1b5c-bce5-43db-b76e-80c08a385f98'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.237469469259894, 40.273373457147706], [-5.2404930524596836, 40.27576943210592], [-5.245176322592005, 40.27881225966132], [-5.250961778123169, 40.274888919610746], [-5.248842009292914, 40.27149177467052], [-5.245533490130665, 40.26658603032484], [-5.240256475984225, 40.270299785967325], [-5.237469469259894, 40.273373457147706]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'silvopasture'::agroforestry_subtype,
    0.949,
    136.61,
    0.066,
    'SITEX Extremadura Geospatial',
    2023,
    'https://sitex.gobex.es/',
    'Hybrid Remote Sensing',
    'v2.4',
    '2026-09-19T14:42:35.146028Z'::timestamptz,
    '2026-09-19T14:42:35.146028Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'f4699fff-c457-41e6-8ccd-3096f355591f'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.696868456678107, 39.292024040827066], [-5.699384751499968, 39.2944187080724], [-5.701921694933151, 39.296971129740776], [-5.706730157109004, 39.29688013724717], [-5.711302663073458, 39.29487503615184], [-5.708474457787771, 39.29176096654443], [-5.711417272107907, 39.28867319743273], [-5.703982551231056, 39.287381196094515], [-5.701961006150916, 39.28476992288311], [-5.699429270785388, 39.28832747043744], [-5.696868456678107, 39.292024040827066]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.979,
    139.26,
    0.011,
    'SITEX Extremadura Geospatial',
    2022,
    'https://sitex.gobex.es/',
    'PlanetScope + CNN',
    'v2.0',
    '2026-09-19T14:42:35.146053Z'::timestamptz,
    '2026-09-19T14:42:35.146053Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'd15cd045-a38d-4ef3-bbe5-92aa6252eb74'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.580810399012333, 38.42098094404211], [-5.582122873482766, 38.42276360140494], [-5.58334825811677, 38.42368695360386], [-5.586169816491663, 38.423118017237385], [-5.586528501089959, 38.42151098428443], [-5.586609350977902, 38.42072228206413], [-5.58503729256284, 38.41916366549295], [-5.583162344710304, 38.41857112651824], [-5.58190451333924, 38.419761909858906], [-5.580810399012333, 38.42098094404211]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.903,
    17.66,
    0.127,
    'SITEX Extremadura Geospatial',
    2021,
    'https://sitex.gobex.es/',
    'Hybrid Remote Sensing',
    'v2.5',
    '2026-09-19T14:42:35.146077Z'::timestamptz,
    '2026-09-19T14:42:35.146077Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '6714f3ea-7a12-4f32-b0f7-b243de0593cf'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.130449337120211, 38.68974258925998], [-6.137168645614255, 38.69681041998586], [-6.145088491283136, 38.69419955405839], [-6.146070108875409, 38.687366381309495], [-6.137104953832571, 38.68500971398955], [-6.130449337120211, 38.68974258925998]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'silvopasture'::agroforestry_subtype,
    0.975,
    131.41,
    0.037,
    'Spanish Forest Inventory',
    2020,
    NULL,
    'PlanetScope + CNN',
    'v1.5',
    '2026-09-19T14:42:35.146099Z'::timestamptz,
    '2026-09-19T14:42:35.146099Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '0342ce95-8039-4ec7-9631-ed4506024b6e'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.6095365824857915, 38.732411780461305], [-5.6118799762954845, 38.73579814962013], [-5.61485348501052, 38.737334569906885], [-5.61855538057667, 38.734260022442854], [-5.619225629831989, 38.72981769713461], [-5.615414304067557, 38.727716139872776], [-5.611093954132943, 38.72857492335697], [-5.6095365824857915, 38.732411780461305]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.933,
    75.47,
    0.039,
    'Copernicus Sentinel-2',
    2023,
    NULL,
    'Hybrid Remote Sensing',
    'v1.5',
    '2026-09-19T14:42:35.146126Z'::timestamptz,
    '2026-09-19T14:42:35.146126Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '2e78adef-6787-430b-8a59-8ace1c262365'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.237974409195559, 39.79397688759288], [-6.2371050203398966, 39.79580621748228], [-6.242395353685434, 39.796425321060354], [-6.244419609791537, 39.79664409830989], [-6.247809423461282, 39.79437700566325], [-6.247976677070425, 39.792234362072456], [-6.245840190570675, 39.788869328710724], [-6.240967162591531, 39.78933878020146], [-6.23704970738337, 39.789897122489805], [-6.237974409195559, 39.79397688759288]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.944,
    57.01,
    0.038,
    'Copernicus Sentinel-2',
    2022,
    NULL,
    'Sentinel-2 + Random Forest',
    'v2.6',
    '2026-09-19T14:42:35.146152Z'::timestamptz,
    '2026-09-19T14:42:35.146152Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'f49fd519-ced8-4d89-9252-d10b70da3662'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.461522964286936, 38.27094748342047], [-5.4623434577295935, 38.272412016682786], [-5.46417149395363, 38.27259930173914], [-5.466355480304091, 38.27269362330283], [-5.466914223120322, 38.271020748747844], [-5.4665858276472585, 38.270008062176615], [-5.464639492299193, 38.269666258116416], [-5.4629264436309075, 38.26993496994612], [-5.461522964286936, 38.27094748342047]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.904,
    11.96,
    0.1,
    'Copernicus Sentinel-2',
    2021,
    NULL,
    'GEDI LiDAR + ML',
    'v3.8',
    '2026-09-19T14:42:35.146176Z'::timestamptz,
    '2026-09-19T14:42:35.146176Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '2faca9da-885a-4d47-baf1-a94186337f00'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.3788876669915, 39.37591848819637], [-6.3817141042504275, 39.37895550131474], [-6.387307779370206, 39.38127044333971], [-6.392119237565261, 39.3768994227374], [-6.392539743675746, 39.37303459770439], [-6.387205409016037, 39.3710586923331], [-6.380236229944303, 39.37133902779244], [-6.3788876669915, 39.37591848819637]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'silvopasture'::agroforestry_subtype,
    0.906,
    105.07,
    0.13,
    'Spanish Forest Inventory',
    2023,
    NULL,
    'PlanetScope + CNN',
    'v3.1',
    '2026-09-19T14:42:35.146198Z'::timestamptz,
    '2026-09-19T14:42:35.146198Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'e97a0205-8cb3-4f0d-8f99-1f203c8f17cf'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.200313875983591, 38.48934861813663], [-5.199800223911265, 38.49084772456791], [-5.202230260328824, 38.49105156596513], [-5.2048908559598885, 38.491593755495295], [-5.205537824843376, 38.48955457765829], [-5.205747510594748, 38.488569100530164], [-5.205165810604238, 38.48636504167243], [-5.202378119203147, 38.487002068951426], [-5.201237592997839, 38.48792598139311], [-5.200313875983591, 38.48934861813663]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'montado'::agroforestry_subtype,
    0.926,
    22.44,
    0.053,
    'Spanish Forest Inventory',
    2022,
    NULL,
    'PlanetScope + CNN',
    'v1.2',
    '2026-09-19T14:42:35.146223Z'::timestamptz,
    '2026-09-19T14:42:35.146223Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'a0519c96-f060-4c1d-9e36-01b1947d3aa4'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.593101092511642, 38.491420232611524], [-5.593984066915209, 38.49370678924962], [-5.597563112885783, 38.49576728292687], [-5.601989090748796, 38.496186017478884], [-5.6052375548921205, 38.49252276117189], [-5.605885006547749, 38.488100949424826], [-5.601420828681186, 38.4872791862676], [-5.5958227024763705, 38.48488676824878], [-5.594481034407336, 38.487465618347954], [-5.593101092511642, 38.491420232611524]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'woodlot'::agroforestry_subtype,
    0.969,
    108.92,
    0.027,
    'IDEE Land Cover 2023',
    2022,
    NULL,
    'PlanetScope + CNN',
    'v1.7',
    '2026-09-19T14:42:35.146247Z'::timestamptz,
    '2026-09-19T14:42:35.146247Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'c486681b-f0e7-44bd-a869-9e132e35b883'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.11837724154179, 39.24171453961712], [-5.118186373474674, 39.24674219305706], [-5.126195538411228, 39.247166656017086], [-5.1288951725259615, 39.243680241754205], [-5.1284643152296505, 39.240821354816084], [-5.125054074829478, 39.237053398991634], [-5.12073781663732, 39.2388954879942], [-5.11837724154179, 39.24171453961712]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.854,
    90.93,
    0.147,
    'Copernicus Sentinel-2',
    2021,
    NULL,
    'Sentinel-2 + Random Forest',
    'v1.6',
    '2026-09-19T14:42:35.146272Z'::timestamptz,
    '2026-09-19T14:42:35.146272Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '787d4d98-6a00-4f7d-8162-f10d3d55e71f'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.448853914695222, 40.046731721510014], [-5.455176852740173, 40.05491264349263], [-5.4649367506392466, 40.05169541072133], [-5.4672590976226525, 40.04290976395867], [-5.456057984297423, 40.04158512914787], [-5.448853914695222, 40.046731721510014]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'silvopasture'::agroforestry_subtype,
    0.851,
    164.27,
    0.182,
    'Copernicus Sentinel-2',
    2020,
    NULL,
    'PlanetScope + CNN',
    'v2.2',
    '2026-09-19T14:42:35.146295Z'::timestamptz,
    '2026-09-19T14:42:35.146295Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '99ae7df2-7991-407c-809a-c269a1d8de4a'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-7.207653692385344, 38.097666338542616], [-7.209392652490365, 38.102510935851015], [-7.21561381709043, 38.10471684467063], [-7.218206987222295, 38.103488933111265], [-7.225085470701647, 38.09976048353504], [-7.223340810764874, 38.09550347109058], [-7.2202538241652725, 38.09234243979014], [-7.215681448426503, 38.09302821542981], [-7.207894392958238, 38.09266679684098], [-7.207653692385344, 38.097666338542616]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.948,
    130.09,
    0.058,
    'IDEE Land Cover 2023',
    2021,
    NULL,
    'PlanetScope + CNN',
    'v3.1',
    '2026-09-19T14:42:35.146318Z'::timestamptz,
    '2026-09-19T14:42:35.146318Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '465fe27b-b574-45de-824e-ee7b2262ec9d'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.030228304553937, 39.71293230369957], [-5.033926316063334, 39.71573526414834], [-5.040164544733213, 39.715441296447615], [-5.042333532623348, 39.712489664348624], [-5.040168427876507, 39.708602490114124], [-5.034533267596493, 39.70909818326721], [-5.030228304553937, 39.71293230369957]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'silvopasture'::agroforestry_subtype,
    0.988,
    57.71,
    0.014,
    'Copernicus Sentinel-2',
    2022,
    NULL,
    'GEDI LiDAR + ML',
    'v1.3',
    '2026-09-19T14:42:35.146343Z'::timestamptz,
    '2026-09-19T14:42:35.146343Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '8d60efd8-d4f1-4166-916c-df3d15ce6127'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.067819066383793, 39.294441040494355], [-6.071644193839929, 39.29920714814508], [-6.076752126385026, 39.29863416583236], [-6.0792858992638825, 39.293987166008954], [-6.078654445976374, 39.28958763269668], [-6.071394720594134, 39.28997027642493], [-6.067819066383793, 39.294441040494355]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'montado'::agroforestry_subtype,
    0.867,
    69.13,
    0.13,
    'Spanish Forest Inventory',
    2023,
    NULL,
    'GEDI LiDAR + ML',
    'v2.3',
    '2026-09-19T14:42:35.146364Z'::timestamptz,
    '2026-09-19T14:42:35.146364Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '6b77f5b9-b663-476e-afa1-705a009a47df'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.185694157271897, 38.62858596262272], [-6.192915499277595, 38.63351832638525], [-6.199975668754513, 38.63175754510094], [-6.201323600592901, 38.62557699187509], [-6.192238796247272, 38.622660189490006], [-6.185694157271897, 38.62858596262272]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.859,
    99.51,
    0.125,
    'Spanish Forest Inventory',
    2022,
    NULL,
    'PlanetScope + CNN',
    'v2.6',
    '2026-09-19T14:42:35.146398Z'::timestamptz,
    '2026-09-19T14:42:35.146398Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '37860dde-98c9-4cc8-9101-50d853051a41'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.0934796698787395, 38.374375180412315], [-5.094597697368351, 38.37825565560073], [-5.101392156694655, 38.37758770131439], [-5.104187775980505, 38.37488343503319], [-5.102545542767376, 38.36989905288163], [-5.0942878708887065, 38.370497926352726], [-5.0934796698787395, 38.374375180412315]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'silvopasture'::agroforestry_subtype,
    0.876,
    56.35,
    0.064,
    'Spanish Forest Inventory',
    2021,
    NULL,
    'PlanetScope + CNN',
    'v3.8',
    '2026-09-19T14:42:35.146419Z'::timestamptz,
    '2026-09-19T14:42:35.146419Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'b94d9691-e667-4d2b-8fec-bd2426eadd9c'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-5.185188191312385, 38.69588667380077], [-5.187752636103002, 38.69835836716006], [-5.191138050324851, 38.69698761888267], [-5.190319513299499, 38.69478545815294], [-5.187263964779066, 38.69366688644227], [-5.185188191312385, 38.69588667380077]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'montado'::agroforestry_subtype,
    0.924,
    21.88,
    0.071,
    'Spanish Forest Inventory',
    2022,
    NULL,
    'GEDI LiDAR + ML',
    'v2.3',
    '2026-09-19T14:42:35.146439Z'::timestamptz,
    '2026-09-19T14:42:35.146439Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '49ba1855-9f44-42bc-ba24-ebb698608f7b'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.338741065631229, 39.36908476076777], [-6.337479194930326, 39.37148362988641], [-6.340929671699329, 39.37338565489452], [-6.3437733856006195, 39.373451318378486], [-6.346924871884207, 39.37082997292095], [-6.350171562344743, 39.3701262719676], [-6.34678154139661, 39.36734871830472], [-6.345142650457471, 39.36581598494192], [-6.341818747227683, 39.36425759016768], [-6.338745237044463, 39.36682759755501], [-6.338741065631229, 39.36908476076777]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.979,
    75.37,
    0.023,
    'Spanish Forest Inventory',
    2023,
    NULL,
    'GEDI LiDAR + ML',
    'v2.7',
    '2026-09-19T14:42:35.146467Z'::timestamptz,
    '2026-09-19T14:42:35.146467Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '4141b542-03ce-41e2-b453-2d0773aafff3'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-7.09192514385415, 39.29600967032089], [-7.095624578040046, 39.298862312058546], [-7.099948857973357, 39.30209404367033], [-7.106312735139431, 39.29856310734499], [-7.1071515788432125, 39.29262574774428], [-7.09966178268788, 39.288258034218146], [-7.095359305161832, 39.29217925115648], [-7.09192514385415, 39.29600967032089]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'dehesa'::agroforestry_subtype,
    0.969,
    161.06,
    0.04,
    'Spanish Forest Inventory',
    2023,
    NULL,
    'PlanetScope + CNN',
    'v3.2',
    '2026-09-19T14:42:35.146490Z'::timestamptz,
    '2026-09-19T14:42:35.146490Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '51ee28e4-c82d-424d-9023-05662bdc5713'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-7.300635002332434, 38.37479354272088], [-7.303653195074818, 38.377122395972805], [-7.307856968786255, 38.37820545160916], [-7.30960581330911, 38.37479302472786], [-7.306533094196979, 38.37056810643871], [-7.3012657697594845, 38.37056066201445], [-7.300635002332434, 38.37479354272088]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'montado'::agroforestry_subtype,
    0.983,
    56.16,
    0.025,
    'SITEX Extremadura Geospatial',
    2022,
    'https://sitex.gobex.es/',
    'Sentinel-2 + Random Forest',
    'v1.5',
    '2026-09-19T14:42:35.146512Z'::timestamptz,
    '2026-09-19T14:42:35.146512Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    '8c714e30-7d00-4a08-abdc-cb017ded0ce4'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-6.098864256626326, 38.60094672852461], [-6.097852033168861, 38.605115171334276], [-6.107436484073731, 38.608318774904774], [-6.110524837849627, 38.604486602435415], [-6.1111966056649285, 38.60170273414037], [-6.110512872768281, 38.598047281759214], [-6.1065377007133925, 38.593770662413014], [-6.101724153734078, 38.596156967869675], [-6.098864256626326, 38.60094672852461]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'woodlot'::agroforestry_subtype,
    0.964,
    155.79,
    0.054,
    'Spanish Forest Inventory',
    2024,
    NULL,
    'Hybrid Remote Sensing',
    'v2.1',
    '2026-09-19T14:42:35.146549Z'::timestamptz,
    '2026-09-19T14:42:35.146549Z'::timestamptz
);
INSERT INTO agroforestry_parcels (
    id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
    confidence_score, area_ha, uncertainty, source, source_year,
    source_url, processing_method, model_version, created_at, updated_at
) VALUES (
    'a5a1d449-a540-4b0d-8028-33fcae9300a6'::uuid,
    (SELECT id FROM jurisdictions WHERE code = 'ES-EX' LIMIT 1),
    ST_GeomFromGeoJSON('{"type": "Polygon", "coordinates": [[[-7.442141339577201, 39.93292918155863], [-7.443808721098213, 39.93401799342893], [-7.446539397692737, 39.93406604729396], [-7.448302714029619, 39.932356056279346], [-7.446548796130617, 39.931368498419964], [-7.443332722653156, 39.930469600291545], [-7.442141339577201, 39.93292918155863]]]}')::geometry(POLYGON, 4326),
    'agroforestry'::land_cover_class,
    'montado'::agroforestry_subtype,
    0.891,
    12.69,
    0.083,
    'Copernicus Sentinel-2',
    2021,
    NULL,
    'GEDI LiDAR + ML',
    'v1.9',
    '2026-09-19T14:42:35.146575Z'::timestamptz,
    '2026-09-19T14:42:35.146575Z'::timestamptz
);
