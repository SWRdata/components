import tokens from '../tokens';
import type { SymbolLayerSpecification } from 'maplibre-gl';

// Hand-authored list of German cities we want to show at low zoom levels
// Ideally this would include Frankfurt and Leipzig, but they're not state
// capitals so they're not available in the versatiles data until z6

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

export default function makePlaceLabels() {
	const placeLabels: SymbolLayerSpecification[] = [
		{
			id: 'label-place-neighbourhood',
			filter: ['==', 'kind', 'neighbourhood'],
			minzoom: 14,
			layout: {
				'text-size': {
					stops: [[14, 14]]
				}
			},
			paint: {
				'text-color': tokens.label_secondary
			}
		},
		{
			id: 'label-place-quarter',
			filter: ['==', 'kind', 'quarter'],
			minzoom: 14,
			layout: {
				'text-size': {
					stops: [[10, 14]]
				}
			},
			paint: {
				'text-color': tokens.label_secondary
			}
		},
		{
			id: 'label-place-suburb',
			filter: ['==', 'kind', 'suburb'],
			minzoom: 11,
			layout: {
				'text-size': {
					stops: [
						[11, 13],
						[13, 15]
					]
				}
			},
			paint: {
				'text-color': tokens.label_secondary
			}
		},
		{
			id: 'label-place-hamlet',
			filter: ['==', 'kind', 'hamlet'],
			minzoom: 13,
			layout: {
				'text-size': {
					stops: [
						[10, 11],
						[12, 14]
					]
				}
			},
			paint: {
				'text-color': tokens.label_secondary
			}
		},
		{
			id: 'label-place-village',
			filter: ['==', 'kind', 'village'],
			minzoom: 11,
			layout: {
				'text-size': {
					stops: [
						[9, 11],
						[12, 14]
					]
				}
			},
			paint: {
				'text-color': tokens.label_secondary
			}
		},

		{
			id: 'label-place-town',
			filter: ['==', 'kind', 'town'],
			minzoom: 9,
			layout: {
				'text-letter-spacing': 0.015,
				'text-size': {
					stops: [
						[8, 13],
						[12, 16]
					]
				}
			},
			paint: {
				'text-color': tokens.label_primary
			}
		},

		{
			id: 'label-place-city',
			filter: ['==', 'kind', 'city'],
			minzoom: 6,
			maxzoom: 11,
			layout: {
				'text-letter-spacing': 0.015,
				'text-size': {
					stops: [
						[8, 14],
						[10, 14]
					]
				}
			},
			paint: {
				'text-color': tokens.label_secondary
			}
		},
		{
			id: 'label-place-state-capital',
			filter: [
				'all',
				['==', 'kind', 'state_capital'],
				['<', 'population', 500000],
				['!in', 'name_de', ...majorCities]
			],
			minzoom: 7,
			maxzoom: 12,
			layout: {
				'text-letter-spacing': 0.025,
				'text-size': {
					stops: [
						[6, 13],
						[14, 20]
					]
				}
			},
			paint: {
				'text-color': tokens.label_secondary
			}
		},
		{
			id: 'label-place-major-city',
			filter: ['all', ['in', 'name_de', ...majorCities]],
			minzoom: 5,
			maxzoom: 12,
			layout: {
				'text-letter-spacing': 0.025,
				'text-size': {
					stops: [
						[7, 13],
						[14, 20]
					]
				}
			},
			paint: {
				'text-color': tokens.label_secondary
			}
		},
		{
			id: 'label-place-capital',
			filter: ['all', ['==', 'kind', 'capital'], ['>', 'population', 1000000]],
			minzoom: 5,
			maxzoom: 12,
			layout: {
				'text-letter-spacing': 0.025,
				'text-size': {
					stops: [
						[5, 14],
						[14, 20]
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
				'text-field': '{name_de}',
				...el.layout
			},

			paint: {
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
			minzoom: 5,
			maxzoom: 7,
			layout: {
				'text-field': '{name_de}',
				'text-letter-spacing': 0.085,
				'text-font': tokens.sans_regular,
				'text-transform': 'uppercase',
				'text-size': {
					stops: [
						[5, 12],
						[14, 20]
					]
				}
			},
			paint: {
				'text-color': tokens.label_tertiary,
				'text-halo-color': tokens.background,
				'text-halo-width': 2
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
