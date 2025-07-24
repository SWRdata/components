import tokens from '../tokens';
import type { SymbolLayerSpecification } from 'maplibre-gl';

// Hand-authored list of place labes we want to show at low zoom levels
// Ideally majorCities  would include Frankfurt and Leipzig, but they're not
// state capitals so they're not available in the versatiles data until z6

const majorCities = [
	'Stuttgart',
	'München',
	'Mainz',
	'Bremen',
	'Düsseldorf',
	'Hamburg',
	'Bremen',
	'Dresden',
	'Erfurt'
];
const majorCountries = [
	'Deutschland',
	'Dänemark',
	'Frankreich',
	'Niederlande',
	'Belgien',
	'Schweiz',
	'Polen',
	'Österreich',
	'Tschechien',
	'Slowakei',
	'Italien',
	'Ungarn'
];

// For smaller cities we use the population field to derive our hierarchy,
// though that's limited by the fact that versatiles hard-codes population
// values for "city" and anything below.
// See: https://github.com/versatiles-org/shortbread-tilemaker/blob/69e5d4c586a1d2726b746a24829bfb05d4dbeb91/process.lua#L198-L242

export default function makePlaceLabels() {
	const placeLabels: SymbolLayerSpecification[] = [
		{
			id: 'label-place-quarter',
			filter: ['all', ['in', 'kind', 'neighbourhood']],
			minzoom: 12,
			layout: {
				'text-size': {
					stops: [
						[10, 13],
						[15, 16]
					]
				}
			},
			paint: {
				'text-color': tokens.label_tertiary
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
			minzoom: 11.5,
			layout: {
				'text-size': {
					stops: [
						[11, 13],
						[15, 15]
					]
				}
			},
			paint: {
				'text-color': tokens.label_tertiary
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
						[12, 15]
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
				['!in', 'name_de', ...majorCities]
			],
			minzoom: 8.5,
			layout: {
				'text-size': {
					stops: [
						[8, 14],
						[12, 16]
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
				['!in', 'name_de', ...majorCities]
			],
			minzoom: 7,
			maxzoom: 13,
			layout: {
				'text-size': {
					stops: [
						[7, 12],
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
				['!in', 'name_de', ...majorCities]
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
				'text-color': tokens.label_primary
			}
		},
		{
			id: 'label-place-major-city',
			filter: ['all', ['in', 'name_de', ...majorCities]],
			minzoom: 5,
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
				'text-color': tokens.label_primary
			}
		},
		{
			id: 'label-place-capital',
			filter: ['all', ['==', 'kind', 'capital'], ['>', 'population', 1000000]],
			minzoom: 5,
			maxzoom: 12,
			layout: {
				'text-size': {
					stops: [
						[7, 15],
						[14, 23]
					]
				}
			},
			paint: {
				'text-color': tokens.label_primary
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
				'text-letter-spacing': 0.025,
				'text-field': '{name_de}',
				...el.layout
			},

			paint: {
				'text-color': tokens.label_secondary,
				'text-halo-color': tokens.background,
				'text-halo-width': 1,
				...el.paint
			}
		} as SymbolLayerSpecification;
	});

	const boundaryLabels = [
		{
			id: 'label-boundary-country',
			filter: ['all', ['==', 'admin_level', 2], ['in', 'name_de', ...majorCountries]],
			minzoom: 4,
			maxzoom: 8,
			layout: {
				'text-field': '{name_de}',
				'text-letter-spacing': 0.0825,
				'text-font': tokens.sans_regular,
				'text-transform': 'uppercase',
				'text-size': {
					stops: [
						[4, 10],
						[7, 17]
					]
				}
			},
			paint: {
				'text-color': tokens.label_tertiary,
				'text-halo-color': tokens.background,
				'text-halo-width': 1
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
