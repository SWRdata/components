import { type Layer, type styleTokens } from '../../types';

export default function makeBuildings(tokens: styleTokens): any {
	const extrusionLayer = {
		source: 'basemap-de',
		type: 'fill-extrusion',
		minzoom: 14,
		maxzoom: 20,
		paint: {
			'fill-extrusion-color': tokens.building,
			'fill-extrusion-opacity': ['interpolate', ['linear'], ['zoom'], 15.5, 0, 16, 1],
			'fill-extrusion-height': [
				'interpolate',
				['linear'],
				['zoom'],
				15.5,
				0,
				16,
				['to-number', ['get', 'hoehe']]
			]
		}
	};

	const buildingFootprints: Layer = {
		id: 'building-footprints',
		type: 'fill',
		source: 'versatiles-osm',
		'source-layer': 'buildings',
		paint: {
			'fill-color': tokens.building,
			'fill-opacity': {
				stops: [
					[15, 0],
					[16, 1]
				]
			}
		}
	};
	const structureExtrusions = {
		id: 'building-extrusions-structures',
		'source-layer': 'Bauwerksflaeche',
		...extrusionLayer
	} as Layer;

	const buildingExtrusions = {
		id: 'building-extrusions-buildings',
		'source-layer': 'Gebaeudeflaeche',
		...extrusionLayer
	} as Layer;

	return { buildingFootprints, buildingExtrusions, structureExtrusions };
}
