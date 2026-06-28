import type { SymbolLayerSpecification } from 'maplibre-gl';
import type { styleTokens } from '../../types';

// Hand-authored list of place labes we want to show at low zoom levels
// Ideally majorCities  would include Frankfurt and Leipzig, but they're not
// state capitals so they're not available in the versatiles data until z6

const majorCities = ['Berlin', 'Stuttgart', 'München', 'Frankfurt', 'Hamburg', 'Mainz'];

// For smaller cities we use the population field to derive our hierarchy,
// though that's limited by the fact that versatiles hard-codes population
// values for "city" and anything below.
// See: https://github.com/versatiles-org/shortbread-tilemaker/blob/69e5d4c586a1d2726b746a24829bfb05d4dbeb91/process.lua#L198-L242

export default function makePlaceLabels(tokens: styleTokens) {
	const placeLabels: SymbolLayerSpecification[] = [
		{
			id: 'label-place-quarter',
			filter: ['all', ['in', 'kind', 'neighbourhood']],
			minzoom: 14.5,
			layout: {
				'text-size': {
					stops: [
						[10, 11],
						[15, 13]
					]
				},
				'text-letter-spacing': 0.1,
				'text-transform': 'uppercase',
				'text-overlap': 'never'
			},
			paint: {
				'text-color': tokens.label_secondary
			}
		},
		{
			id: 'label-place-suburb',
			filter: [
				'all',
				['in', 'kind', 'suburb', 'village', 'hamlet', 'town'],
				['>', 'population', 1000],
				['<', 'population', 15_000]
			],
			minzoom: 12,
			layout: {
				'text-size': {
					stops: [
						[14, 14],
						[16, 17]
					]
				},
				'text-letter-spacing': 0.1,
				'text-transform': 'uppercase'
			},
			paint: {
				'text-color': tokens.label_secondary
			}
		},
		{
			id: 'label-place-town',
			filter: [
				'all',
				['in', 'kind', 'village', 'hamlet', 'town'],
				['<', 'population', 50_000],
				['>', 'population', 15_000]
			],
			minzoom: 10,
			layout: {
				'text-size': {
					stops: [
						[10, 14],
						[12, 16]
					]
				}
			}
		},

		{
			id: 'label-small-city',
			filter: [
				'all',
				['in', 'kind', 'city', 'town'],
				['>', 'population', 50_000],
				['<', 'population', 100_000],
				['!in', 'name', ...majorCities]
			],
			minzoom: 8.5,
			maxzoom: 13,

			layout: {
				'text-size': {
					stops: [
						[8, 14],
						[12, 18]
					]
				}
			}
		},

		{
			id: 'label-place-medium-city',
			filter: [
				'all',
				['in', 'kind', 'city', 'town'],
				['>', 'population', 100_000],
				['<', 'population', 400_000],
				['!in', 'name', ...majorCities]
			],
			minzoom: 7,
			maxzoom: 13,
			layout: {
				'text-size': {
					stops: [
						[7, 13],
						[13, 17]
					]
				}
			}
		},
		{
			id: 'label-place-big-city',
			filter: [
				'all',
				['in', 'kind', 'city', 'town', 'state_capital'],
				['>', 'population', 400_000],
				['!in', 'name', ...majorCities]
			],
			minzoom: 7,
			maxzoom: 12,
			layout: {
				'text-size': {
					stops: [
						[7, 14],
						[15, 20]
					]
				}
			},
			paint: {
				'text-color': {
					stops: [
						[7, tokens.label_tertiary],
						[9, tokens.label_secondary]
					]
				}
			}
		},
		{
			id: 'label-place-major-city',
			filter: ['in', 'name', ...majorCities],
			minzoom: 5.5,
			maxzoom: 12,
			layout: {
				'text-size': {
					stops: [
						[7, 14],
						[15, 25]
					]
				}
			},
			paint: {
				'text-color': {
					stops: [
						[7, tokens.label_tertiary],
						[9, tokens.label_secondary]
					]
				}
			}
		}
	].map((el) => {
		return {
			...el,
			type: 'symbol',
			source: 'versatiles-osm',
			'source-layer': 'place_labels',
			layout: {
				'text-font': tokens.sans_regular,
				'text-letter-spacing': 0.01,
				'text-field': '{name}',
				...el.layout
			},

			paint: {
				'text-color': tokens.label_secondary,
				'text-halo-color': tokens.background,
				'text-halo-width': 2,
				'text-halo-blur': 0.5,
				...el.paint
			}
		} as SymbolLayerSpecification;
	});

	const boundaryLabels = [
		{
			id: 'label-boundary-country',
			filter: ['all', ['==', 'admin_level', 2], ['!in', 'name', 'Jersey', 'Guernsey', 'Insel Man']],
			minzoom: 4,
			maxzoom: 8,
			layout: {
				'text-field': '{name}',
				'text-letter-spacing': 0.02,
				'text-font': tokens.sans_regular,
				'text-size': {
					stops: [
						[4, 13],
						[7, 18]
					]
				}
			},
			paint: {
				'text-color': tokens.label_tertiary,
				'text-halo-color': tokens.background,
				'text-halo-width': 2,
				'text-halo-blur': 0.5
			}
		}
	].map((el) => {
		return {
			type: 'symbol',
			source: 'versatiles-osm',
			'source-layer': 'boundary_labels',
			...el
		} as SymbolLayerSpecification;
	});

	return { placeLabels, boundaryLabels };
}
