import { type Layer } from '../../types';
import tokens from '../tokens';

export default function makeBuildings(): any {
	const buildingFootprints: Layer = {
		id: 'building-footprints',
		type: 'fill',
		source: 'versatiles-osm',
		'source-layer': 'buildings',
		paint: {
			'fill-color': tokens.building,
			'fill-opacity': {
				stops: [
					[14, 0],
					[15, 1]
				]
			}
		}
	};
	const buildingExtrusions: Layer = {
		id: 'building-extrusions',
		source: 'basemap-de',
		'source-layer': 'Gebaeudeflaeche',
		type: 'fill-extrusion',
		minzoom: 14,
		maxzoom: 20,
		paint: {
			'fill-extrusion-color': tokens.building,
			'fill-extrusion-opacity': ['interpolate', ['linear'], ['zoom'], 14.5, 0, 15, 1],
			'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 14.5, 0, 15, ['get', 'hoehe']]
		}
	};

	return { buildingFootprints, buildingExtrusions };
}
