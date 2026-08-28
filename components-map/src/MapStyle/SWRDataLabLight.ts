import type { StyleOptions } from './types';
import type { StyleSpecification } from 'maplibre-gl';

import makeAdmin from './components/Admin';
import makeBuildings from './components/Buildings';
import makeLanduse from './components/Landuse';
import makeTransit from './components/Transit';
import makePlaceLabels from './components/PlaceLabels';
import makeWalking from './components/Walking';
import makeRoadLabels from './components/RoadLabels';
import makeRoads from './components/Roads';
import defaultOptions from './defaultOptions';
import makeHillshade from './components/Hillshade';

import type { styleTokens } from '../types';

const water = {
	stops: [
		[6, 'white'],
		[6.5, 'hsl(216, 50%, 92%)']
	]
};

const tokens: styleTokens = {
	sans_regular: ['swr_sans_regular'],
	sans_medium: ['swr_sans_medium'],
	sans_bold: ['swr_sans_bold'],
	background: {
		stops: [
			[6, 'hsl(24, 20%, 96%)'],
			[6.5, 'hsl(24, 10%, 99%)']
		]
	},
	water,
	water_light: water,
	water_ocean: water,
	marsh: 'hsl(200, 14%, 93%)',
	grass: 'hsl(133, 36%, 95%)',
	grass_dark: 'hsl(127, 49%, 93%)',
	sand: 'hsl(60, 0%, 95%)',
	rock: 'hsl(192, 0%, 90%)',
	street_primary: 'hsl(0, 4%, 95%)',
	street_primary_faded: 'hsl(0, 4%, 90%)',
	street_primary_case: 'hsl(240, 1%, 84%)',
	street_secondary: 'hsl(0, 0%, 95%)',
	street_secondary_case: 'hsl(0, 0%, 75%)',
	street_tertiary: 'hsl(0, 0%, 95%)',
	street_tertiary_case: 'hsl(0, 0%, 70%)',
	label_primary: 'hsl(240, 10%, 2%)',
	label_secondary: 'hsl(0, 0%, 18%)',
	label_tertiary: 'hsl(60, 1%, 35%)',
	building: '#e9e9e9',
	building_outline: '#999',
	rail: '#d3d3d3',
	boundary_country: '#8b8a89',
	boundary_state: 'hsl(37, 10%, 75%)',
	boundary_country_case: 'white',
	hillshade_light: '#fff',
	hillshade_dark: 'hsl(30, 20%, 20%)',
	hillshade_accent: 'white'
};

const { landuse } = makeLanduse(tokens);
const { placeLabels, boundaryLabels, placeDots } = makePlaceLabels(tokens, {});
const { airports, transitBridges, transitSurface, transitTunnels } = makeTransit(tokens);
const { walkingLabels, walkingTunnels, walkingSurface, walkingBridges } = makeWalking(tokens);
const { roadBridges, roadSurface, roadTunnels } = makeRoads(tokens);
const { buildingFootprints, buildingExtrusions, structureExtrusions } = makeBuildings(tokens);
const { hillshade } = makeHillshade(tokens);

interface styleFunction {
	(options?: StyleOptions): StyleSpecification;
}

const style: styleFunction = (opts) => {
	const options = {
		...defaultOptions,
		...opts
	} as StyleOptions;

	const { admin } = makeAdmin(tokens, options?.admin);
	const { roadLabels } = makeRoadLabels(tokens, options?.roads?.labels);

	return {
		version: 8,
		name: 'swr-datalab-light',
		metadata: { license: 'https://creativecommons.org/publicdomain/zero/1.0/' },
		glyphs: 'https://static.datenhub.net/maps/fonts/{fontstack}/{range}.pbf',
		sprite: 'https://static.datenhub.net/maps/styles/swr-datalab-light/sprite/sprite',
		sources: {
			'versatiles-osm': {
				attribution:
					'<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Mitwirkende',
				tiles: ['https://tiles.datenhub.net/tiles/osm/{z}/{x}/{y}'],
				bounds: [-180, -85.0511287798066, 180, 85.0511287798066],
				type: 'vector',
				scheme: 'xyz',
				minzoom: 0,
				maxzoom: 14
			},
			...(options.enableHillshade && {
				...(options.enableHillshade && {
					'versatiles-elevation': {
						type: 'raster-dem',
						tileSize: 256,
						maxzoom: 12,
						minzoom: 0,
						tiles: ['https://tiles.datenhub.net/tiles/elevation/{z}/{x}/{y}'],
						attribution: '<a href="https://mapterhorn.com/attribution">© Mapterhorn</a>'
					}
				})
			}),
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
		light: { anchor: 'viewport', color: 'white', intensity: 0.175 },
		layers: [
			// 1. Landuse
			...landuse,
			...airports,

			// 2. Building footprints + Structures (ie. bridges)
			...(!options.enableBuildingExtrusions ? [buildingFootprints] : []),
			...(options.enableBuildingExtrusions ? [structureExtrusions] : []),

			// 3. Shaded relief
			...(options.enableHillshade ? hillshade : []),

			// 4. Tunnels
			...walkingTunnels,
			...roadTunnels,
			...transitTunnels,

			// 5. Surface ways
			...walkingSurface,
			...roadSurface,
			...transitSurface,

			// 6. Bridges ways
			...walkingBridges,
			...roadBridges,
			...transitBridges,

			// 7. Admin boundaries
			...admin,

			// 8. Labels
			...(options.roads?.labels !== 'none' ? walkingLabels : []),
			...roadLabels,

			// 9. Building extrusions
			...(options.enableBuildingExtrusions ? [buildingExtrusions] : []),

			// 10. Point labels
			...(options.places?.showLabels ? placeLabels : []),
			...(options.places?.showLabels ? placeDots : []),
			// 11. Admin boundary labels
			...(options.admin?.showLabels ? boundaryLabels : [])
		]
	};
};

export default style;
