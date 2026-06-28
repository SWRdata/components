import type { styleTokens } from '../../types';
import type { SymbolLayerSpecification } from 'maplibre-gl';

export default function makeRoadLabels(tokens: styleTokens) {
	const roadLabels: SymbolLayerSpecification[] = [
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
			minzoom: 14,
			layout: {
				'text-letter-spacing': 0.05,
				'text-overlap': 'cooperative',
				'text-size': {
					stops: [
						[12, 10],
						[15, 11]
					]
				}
			},
			paint: {
				'text-color': tokens.label_tertiary
			}
		},
		{
			id: 'label-street-tertiary',
			filter: ['==', 'kind', 'tertiary'],
			minzoom: 14,
			layout: {
				'text-overlap': 'cooperative',
				'text-size': {
					stops: [
						[12, 10],
						[15, 13]
					]
				}
			}
		},
		{
			id: 'label-street-secondary',
			filter: ['==', 'kind', 'secondary'],
			minzoom: 14,
			layout: {
				'text-letter-spacing': 0.01,
				'text-size': {
					stops: [
						[12, 10],
						[15, 14]
					]
				}
			},
			'text-overlap': 'always'
		},
		{
			id: 'label-street-primary',
			filter: ['==', 'kind', 'primary'],
			minzoom: 14,
			layout: {
				'text-letter-spacing': 0.05,
				'text-size': {
					stops: [
						[12, 10],
						[15, 13]
					]
				},
				'text-overlap': 'always'
			},
			paint: {
				'text-color': tokens.label_secondary
			}
		},
		{
			id: 'label-street-trunk',
			filter: ['==', 'kind', 'trunk'],
			minzoom: 13,
			layout: {
				'text-overlap': 'always',
				'text-offset': [0, 4],
				'text-size': {
					stops: [
						[12, 10],
						[15, 13]
					]
				}
			},
			paint: {
				'text-color': tokens.label_primary
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
				'text-font': tokens.sans_regular,
				'symbol-placement': 'line',
				'text-variable-anchor': ['center', 'left', 'right'],
				...el.layout
			},
			paint: {
				'text-color': tokens.label_secondary,
				'text-halo-color': tokens.background,
				'text-halo-width': 1,
				...el.paint
			}
		};
	});

	return { roadLabels };
}
