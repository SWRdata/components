import type { styleTokens } from '../../types';
import type { SymbolLayerSpecification } from 'maplibre-gl';
import type { LabelDensity } from '../types';

export default function makeRoadLabels(tokens: styleTokens, density: LabelDensity = 'default') {
	if (density === 'none') return { roadLabels: [] };

	const roadLabels: SymbolLayerSpecification[] = [
		...(density === 'dense'
			? [
					{
						id: 'label-street-misc',
						filter: [
							'in',
							'kind',
							'residential',
							'pedestrian',
							'path',
							'track',
							'steps',
							'service',
							'livingstreet',
							'living_street',
							'unclassified',
							'footway'
						],
						minzoom: 15,
						layout: {
							'text-letter-spacing': 0.025,
							'text-overlap': 'cooperative',
							'text-size': {
								stops: [
									[12, 10],
									[15, 12]
								]
							}
						},
						paint: {
							'text-color': tokens.label_secondary
						}
					},
					{
						id: 'label-street-tertiary',
						filter: ['==', 'kind', 'tertiary'],
						minzoom: 15,
						layout: {
							'text-overlap': 'cooperative',
							'text-size': {
								stops: [
									[12, 10],
									[15, 14]
								]
							}
						}
					}
				]
			: []),
		{
			id: 'label-street-secondary',
			filter: ['==', 'kind', 'secondary'],
			minzoom: 14,
			layout: {
				'text-letter-spacing': 0.01,
				'text-size': {
					stops: [
						[12, 9],
						[15, 13]
					]
				}
			},
			'text-overlap': 'always'
		},
		{
			id: 'label-street-primary',
			filter: ['in', 'kind', 'primary', 'trunk'],
			minzoom: 14,
			layout: {
				'text-letter-spacing': 0.03,
				'text-size': {
					stops: [
						[12, 10],
						[15, 14]
					]
				},
				'text-overlap': 'always'
			}
		}
	].map((el) => {
		return {
			type: 'symbol',
			source: 'versatiles-osm',
			'source-layer': 'street_labels',
			...el,
			layout: {
				'text-field': '{name}',
				'symbol-placement': 'line',
				'text-font': tokens.sans_medium,
				'text-max-angle': 20,
				'text-variable-anchor': ['center', 'left', 'right'],
				...el.layout
			},
			paint: {
				'text-color': tokens.label_secondary,
				'text-halo-color': tokens.background,
				'text-halo-width': 2,
				'text-halo-blur': 2,
				...el.paint
			}
		};
	});

	return { roadLabels };
}
