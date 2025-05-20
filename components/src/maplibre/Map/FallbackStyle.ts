import type { StyleSpecification } from 'maplibre-gl';

const style: StyleSpecification = {
	version: 8,
	name: 'default',
	sources: {},
	layers: [
		{
			id: 'background',
			type: 'background',
			paint: {
				'background-color': 'lightgray'
			}
		}
	]
};

export default style;
