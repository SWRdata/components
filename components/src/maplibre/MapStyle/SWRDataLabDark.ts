import type { StyleOptions } from './types';
import type { StyleSpecification } from 'maplibre-gl';

import defaultOptions from './defaultOptions';

import makeAdmin from './components/Admin';
import makeBuildings from './components/Buildings';
import makeLanduse from './components/Landuse';
import makeTransit from './components/Transit';
import makeWalking from './components/Walking';
import makeRoads from './components/Roads';
import makePlaceLabels from './components/PlaceLabels';
import makeRoadLabels from './components/RoadLabels';
import makeHillshade from './components/Hillshade';

import type { styleTokens } from '../types';

const tokens: styleTokens = {
	sans_regular: ['swr_sans_regular'],
	sans_medium: ['swr_sans_medium'],
	sans_bold: ['swr_sans_bold'],
	background: {
		stops: [
			[8, 'hsl(210, 3%, 10%)'],
			[10, '#181818']
		]
	},
	water: 'hsl(210, 12%, 7%)',
	water_light: 'hsl(210, 12%, 8%)',
	water_ocean: 'hsl(214, 5%, 5%)',
	marsh: 'hsl(160, 5%, 9%)',
	grass: 'hsl(170, 15%, 12%)',
	grass_dark: 'hsl(170, 12%, 10%)',
	sand: 'hsl(0, 0%, 16%)',
	rock: 'hsl(0, 0%, 20%)',
	street_primary: 'hsl(220, 3%, 20%)',
	street_primary_faded: '#252525',
	street_primary_case: 'hsl(0, 11%, 7%)',
	street_secondary: 'hsl(220, 3%, 20%)',
	street_secondary_case: 'hsl(0, 0%, 0%)',
	street_tertiary: 'hsl(0, 0%, 15%)',
	street_tertiary_case: 'hsl(0, 0%, 14%)',
	label_primary: 'hsl(240, 5%, 96%)',
	label_secondary: 'hsl(0, 2%, 85%)',
	label_tertiary: 'hsl(0, 1%, 60%)',
	boundary_country: '#6e6f71',
	boundary_country_case: '#181818',
	boundary_state: 'hsl(218, 4%, 37%)',
	rail: 'hsl(0, 0%, 33%)',
	building: '#111',
	hillshade_light: 'hsl(0, 0%, 50%)',
	hillshade_dark: 'hsl(0, 0%, 0%)',
	hillshade_accent: 'black'
};

const { landuse } = makeLanduse(tokens);
const { placeLabels, boundaryLabels } = makePlaceLabels(tokens);
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
		name: 'swr-datalab-dark',
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
				'versatiles-elevation': {
					type: 'raster-dem',
					tileSize: 256,
					maxzoom: 12,
					minzoom: 0,
					tiles: ['https://tiles.datenhub.net/tiles/elevation/{z}/{x}/{y}'],
					attribution: '<a href="https://mapterhorn.com/attribution">© Mapterhorn</a>'
				}
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
		light: { anchor: 'viewport', color: 'white', intensity: 0.5 },
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

			// 11. Admin boundary labels
			...(options.admin?.showLabels ? boundaryLabels : [])
		]
	};
};

export default style;
