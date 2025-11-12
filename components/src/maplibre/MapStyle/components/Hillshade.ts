import { type Layer } from '../../types';

export default function makeHillshade(tokens): any {
	const hillshade: Layer[] = [
		{
			id: 'hillshade-light',
			filter: ['all', ['==', 'shade', 'light']],
			paint: {
				'fill-color': '#ffffff',
				'fill-opacity': 1,
				'fill-opacity': {
					stops: [
						[0, 0],
						[4, 0.2]
					]
				},
				'fill-antialias': true
			}
		},
		{
			id: 'hillshade-dark',
			filter: ['all', ['==', 'shade', 'dark']],
			paint: {
				'fill-color': '#000000',
				'fill-opacity': 1,
				'fill-opacity': {
					stops: [
						[0, 0],
						[4, 0.2]
					]
				},
				'fill-antialias': true
			}
		}
	].map((el) => {
		return {
			type: 'fill',
			'source-layer': 'hillshade-vectors',
			source: 'versatiles-hillshade',
			...el
		} as Layer;
	});

	return { hillshade };
}
