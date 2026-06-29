import { type Layer, type styleTokens } from '../../types';

export default function makeHillshade(tokens: styleTokens): any {
	const hillshade: Layer[] = [
		{
			id: 'hillshade-light',
			filter: ['all', ['==', 'shade', 'light']],
			paint: {
				'fill-color': tokens.hillshade_light,
				'fill-opacity': {
					stops: [
						[0, 0],
						[4, 1]
					]
				},
				'fill-outline-color': 'transparent',
				'fill-antialias': true
			}
		},
		{
			id: 'hillshade-dark',
			filter: ['all', ['==', 'shade', 'dark']],
			paint: {
				'fill-color': tokens.hillshade_dark,
				'fill-opacity': {
					stops: [
						[0, 0],
						[4, 1]
					]
				},
				'fill-outline-color': 'transparent',
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
