import { type Layer } from '../../types';

export default function makeBuildings(): any {
	const buildings: Layer[] = [
		{
			id: 'building-fill',
			type: 'fill',
			source: 'versatiles-osm',
			'source-layer': 'buildings',
			paint: {
				'fill-color': 'hsl(240, 4%, 95%)',
				'fill-opacity': {
					stops: [
						[14, 0],
						[15, 1]
					]
				}
			}
		}
	];

	return { buildings };
}
