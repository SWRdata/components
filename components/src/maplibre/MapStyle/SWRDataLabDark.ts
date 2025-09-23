import type { StyleSpecification } from 'maplibre-gl';

import makeAdmin from './components/Admin';
import makeBuildings from './components/Buildings';
import makeLanduse from './components/Landuse';
import makeTransit from './components/Transit';
import makePlaceLabels from './components/PlaceLabels';
import makeWalking from './components/Walking';
import makeRoads from './components/Roads';

const tokens = {
	sans_regular: ['SWR Sans Regular'],
	sans_medium: ['SWR Sans Medium'],
	sans_bold: ['SWR Sans Bold'],
	background: {
		stops: [
			[8, 'hsl(210, 9%, 13%)'],
			[10, '#1e1f22']
		]
	},
	water: 'hsl(210, 12%, 8%)',
	water_light: 'hsl(210, 12%, 8%)',
	water_ocean: 'hsl(210, 12%, 8%)',
	marsh: 'hsl(180, 3%, 35%)',
	grass: 'hsl(170, 22%, 15%)',
	grass_dark: 'hsl(170, 18%, 15%)',
	street_primary: 'hsl(220, 3%, 20%)',
	street_primary_case: 'hsl(0, 11%, 7%)',
	street_secondary: 'hsl(0, 0%, 22%)',
	street_secondary_case: 'hsl(0, 0%, 0%)',
	street_tertiary: 'hsl(0, 0%, 20%)',
	street_tertiary_case: 'hsl(0, 0%, 14%)',
	label_primary: 'hsl(240, 5%, 82%)',
	label_secondary: 'hsl(0, 2%, 72%)',
	label_tertiary: 'hsl(0, 1%, 55%)',
	boundary_country: '#6e6f71',
	boundary_country_case: '#181818',
	boundary_state: 'hsl(218, 4%, 37%)',
	rail: '#a8a8a8',
	sand: 'hsl(0, 0%, 16%)',
	building: '#232325'
};

const { landuse } = makeLanduse(tokens);
const { placeLabels, boundaryLabels } = makePlaceLabels(tokens);
const { admin } = makeAdmin(tokens);
const { airports, transitBridges, transitSurface, transitTunnels } = makeTransit(tokens);
const { walkingLabels, walkingTunnels, walkingSurface, walkingBridges } = makeWalking(tokens);
const { roadLabels, roadBridges, roadSurface, roadTunnels } = makeRoads(tokens);
const { buildingFootprints, buildingExtrusions, structureExtrusions } = makeBuildings(tokens);

interface StyleOptions {
	enableBuildingExtrusions?: boolean;
}

interface styleFunction {
	(options?: StyleOptions): StyleSpecification;
}

const style: styleFunction = (opts) => {
	const options = {
		enableBuildingExtrusions: false,
		...opts
	} as StyleOptions;

	return {
		version: 8,
		name: 'swr-datalab-dark',
		metadata: { license: 'https://creativecommons.org/publicdomain/zero/1.0/' },
		glyphs: 'https://static.datenhub.net/maps/fonts/{fontstack}/{range}.pbf',
		sprite: 'https://static.datenhub.net/maps/styles/swr-datalab-light/sprite/sprite',
		sources: {
			'versatiles-osm': {
				attribution:
					'<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
				tiles: ['https://tiles.versatiles.org/tiles/osm/{z}/{x}/{y}'],
				bounds: [-180, -85.0511287798066, 180, 85.0511287798066],
				type: 'vector',
				scheme: 'xyz',
				minzoom: 0,
				maxzoom: 14
			},
			...(options.enableBuildingExtrusions && {
				'basemap-de': {
					attribution: 'GeoBasis-DE',
					type: 'vector',
					bounds: [5.8, 47.2, 15.1, 55.1],
					maxzoom: 15,
					minzoom: 0,
					scheme: 'xyz',
					tiles: [
						'https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/tiles/v2/bm_web_de_3857/{z}/{x}/{y}.pbf'
					]
				}
			})
		},
		sky: {
			'atmosphere-blend': ['interpolate', ['linear'], ['zoom'], 0, 0.1, 5, 0.1, 7, 0]
		},
		light: { anchor: 'viewport', color: 'white', intensity: 0.5 },
		layers: [
			// 1. Landuse
			...landuse,
			...airports,

			// 2. Building footprints + Structures (ie. bridges)
			...(!options.enableBuildingExtrusions ? [buildingFootprints] : []),
			...(options.enableBuildingExtrusions ? [structureExtrusions] : []),

			// 3. Tunnels
			...walkingTunnels,
			...roadTunnels,
			...transitTunnels,

			// 4. Surface ways
			...walkingSurface,
			...roadSurface,
			...transitSurface,

			// 5. Bridges ways
			...walkingBridges,
			...roadBridges,
			...transitBridges,

			// 6. Admin boundaries
			...admin,

			// 7. Labels
			...walkingLabels,
			...roadLabels,

			// 8. Building extrusions
			...(options.enableBuildingExtrusions ? [buildingExtrusions] : []),

			// 8. Point labels
			...placeLabels,
			...boundaryLabels
		]
	};
};

export default style;
