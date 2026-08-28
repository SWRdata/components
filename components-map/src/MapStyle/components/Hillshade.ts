import { type Layer, type styleTokens } from '../../types';

export default function makeHillshade(tokens: styleTokens): any {
	const hillshade: Layer[] = [
		{
			id: 'hillshade',
			type: 'hillshade',
			maxzoom: 14,
			source: 'versatiles-elevation',
			paint: {
				'hillshade-exaggeration': ['interpolate', ['linear'], ['zoom'], 13, 0.05, 13.5, 0],
				'hillshade-shadow-color': tokens.hillshade_dark,
				'hillshade-highlight-color': tokens.hillshade_light,
				'hillshade-accent-color': tokens.hillshade_accent,
				'hillshade-illumination-direction': 315,
				'hillshade-illumination-altitude': 45,
				'hillshade-illumination-anchor': 'map',
				'hillshade-method': 'standard'
			}
		}
	];
	return { hillshade };
}
