import type { StyleOptions } from './types';
import type { StyleSpecification } from 'maplibre-gl';

import makeAdmin from './components/Admin';
import makeBuildings from './components/Buildings';
import makeLanduse from './components/Landuse';
import makeTransit from './components/Transit';
import makePlaceLabels from './components/PlaceLabels';
import makeWalking from './components/Walking';
import makeRoads from './components/Roads';
import defaultOptions from './defaultOptions';
import makeHillshade from './components/Hillshade';

const tokens = {
	sans_regular: ['swr_sans_regular'],
	sans_medium: ['swr_sans_medium'],
	sans_bold: ['swr_sans_bold'],
	background: {
		stops: [
			[8, 'hsl(24, 29%, 98%)'],
			[10, 'white']
		]
	},
	water: 'hsl(212, 71%, 83%)',
	water_light: 'hsl(212, 41%, 90%)',
	water_ocean: 'hsl(212, 60%, 83%)',
	marsh: 'hsl(200, 14%, 97%)',
	grass: 'hsl(133, 36%, 95%)',
	grass_dark: 'hsl(127, 49%, 93%)',
	sand: 'hsl(60, 0%, 95%)',
	rock: 'hsl(192, 0%, 90%)',
	street_primary: 'hsl(0, 4%, 95%)',
	street_primary_faded: 'hsl(0, 4%, 96%)',
	street_primary_case: 'hsl(240, 1%, 84%)',
	street_secondary: 'hsl(0, 0%, 95%)',
	street_secondary_case: 'hsl(0, 0%, 75%)',
	street_tertiary: 'hsl(0, 0%, 95%)',
	street_tertiary_case: 'hsl(0, 0%, 70%)',
	label_primary: 'hsl(240, 10%, 2%)',
	label_secondary: 'hsl(0, 0%, 18%)',
	label_tertiary: 'hsl(60, 1%, 50%)',
	building: '#f3f2f1',
	rail: '#d3d3d3',
	boundary_country: '#8b8a89',
	boundary_state: 'hsl(37, 10%, 75%)',
	boundary_country_case: 'white',
	hillshade_light: '#fff',
	hillshade_dark: 'hsla(0, 0%, 53%, 0.15)'
};

const { landuse } = makeLanduse(tokens);
const { placeLabels, boundaryLabels } = makePlaceLabels(tokens);
const { admin } = makeAdmin(tokens);
const { airports, transitBridges, transitSurface, transitTunnels } = makeTransit(tokens);
const { walkingLabels, walkingTunnels, walkingSurface, walkingBridges } = makeWalking(tokens);
const { roadLabels, roadBridges, roadSurface, roadTunnels } = makeRoads(tokens);
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
				'versatiles-hillshade': {
					tilejson: '3.0.0',
					name: 'VersaTiles Hillshade Vectors',
					description: 'VersaTiles Hillshade Vectors based on Mapzen Jörð Terrain Tiles',
					attribution:
						'<a href="https://github.com/tilezen/joerd/blob/master/docs/attribution.md">Mapzen Terrain Tiles, DEM Sources</a>',
					version: '1.0.0',
					tiles: ['https://tiles.datenhub.net/tiles/hillshade/{z}/{x}/{y}'],
					type: 'vector',
					scheme: 'xyz',
					format: 'pbf',
					bounds: [-180, -85.0511287798066, 180, 85.0511287798066],
					minzoom: 0,
					maxzoom: 12,
					vector_layers: [
						{ id: 'hillshade-vectors', fields: { shade: 'String' }, minzoom: 0, maxzoom: 12 }
					]
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
			...(options.roads?.showLabels ? walkingLabels : []),
			...(options.roads?.showLabels ? roadLabels : []),

			// 9. Building extrusions
			...(options.enableBuildingExtrusions ? [buildingExtrusions] : []),

			// 10. Point labels
			...(options.places?.showLabels ? placeLabels : []),

			// 11. Admin boundary labels
			...boundaryLabels
		]
	};
};

export default style;
