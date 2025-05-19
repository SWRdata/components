import { type Layer } from "./types"
import tokens from "../tokens"
import type { SymbolLayerSpecification } from "maplibre-gl"

export default function makePlaceLabels() {
    const placeLabels: Layer[] = [
        {
            id: 'label-place-neighbourhood',
            filter: ['==', 'kind', 'neighbourhood'],
            minzoom: 14,
            layout: {
                'text-field': '{name_de}',
                'text-font': tokens.sans_regular,
                'text-size': {
                    stops: [[14, 14]]
                }
            },
            paint: {
                'text-color': tokens.label_secondary,
                'text-halo-color': tokens.background,
                'text-halo-width': 2
            },
        },
        {
            id: 'label-place-quarter',
            filter: ['==', 'kind', 'quarter'],
            minzoom: 14,
            layout: {
                'text-field': '{name_de}',
                'text-font': tokens.sans_regular,
                'text-size': {
                    stops: [[10, 14]]
                }
            },
            paint: {
                'text-color': 'rgb(57,57,57)',
                'text-halo-color': tokens.background,
                'text-halo-width': 2
            },
        },
        {
            id: 'label-place-suburb',
            filter: ['==', 'kind', 'suburb'],
            minzoom: 11,
            layout: {
                'text-field': '{name_de}',
                'text-font': tokens.sans_regular,
                'text-size': {
                    stops: [
                        [11, 13],
                        [13, 15]
                    ]
                }
            },
            paint: {
                'text-color': 'rgb(57,57,57)',
                'text-halo-color': tokens.background,
                'text-halo-width': 1.5
            },
        },
        {
            id: 'label-place-hamlet',
            filter: ['==', 'kind', 'hamlet'],
            minzoom: 13,
            layout: {
                'text-field': '{name_de}',
                'text-font': tokens.sans_regular,
                'text-size': {
                    stops: [
                        [10, 11],
                        [12, 14]
                    ]
                }
            },
            paint: {
                'text-color': 'rgb(57,57,57)',
                'text-halo-color': 'hsla(0,0%,100%,0.8)',
                'text-halo-width': 2
            },
        },
        {
            id: 'label-place-village',
            filter: ['==', 'kind', 'village'],
            minzoom: 11,
            layout: {
                'text-field': '{name_de}',
                'text-font': tokens.sans_regular,
                'text-size': {
                    stops: [
                        [9, 11],
                        [12, 14]
                    ]
                }
            },
            paint: {
                'text-color': 'rgb(57,57,57)',
                'text-halo-color': tokens.background,
                'text-halo-width': 2
            },
        },
        {
            id: 'label-place-town-large',
            filter: ['all', ['==', 'kind', 'town'], ['>', 'population', 30000]],
            minzoom: 8,
            layout: {
                'text-field': '{name_de}',
                'text-font': tokens.sans_regular,
                'text-size': {
                    stops: [
                        [8, 13],
                        [12, 16]
                    ]
                }
            },
            paint: {
                'text-color': tokens.label_primary,
                'text-halo-color': tokens.background,
                'text-halo-width': 2
            },
        },
        {
            id: 'label-place-town',
            filter: ['all', ['==', 'kind', 'town'], ['<', 'population', 30000]],
            minzoom: 9,
            layout: {
                'text-field': '{name_de}',
                'text-font': tokens.sans_regular,
                'text-size': {
                    stops: [
                        [8, 13],
                        [12, 16]
                    ]
                }
            },
            paint: {
                'text-color': tokens.label_primary,
                'text-halo-color': tokens.background,
                'text-halo-width': 2
            },
        },

        {
            id: 'label-place-city',
            filter: ['==', 'kind', 'city'],
            minzoom: 6,
            maxzoom: 11,
            layout: {
                'text-field': '{name_de}',
                'text-font': tokens.sans_medium,
                'text-size': {
                    stops: [
                        [8, 11],
                        [10, 14]
                    ]
                }
            },
            paint: {
                'text-color': tokens.label_primary,
                'text-halo-color': tokens.background,
                'text-halo-width': 2
            },
        },
        {
            id: 'label-place-statecapital',
            filter: [
                'all',
                ['==', 'kind', 'state_capital'],
                ['in', 'name_de', 'Hannover', 'München', 'Stuttgart', 'Hamburg', 'Köln', 'Essen', 'Mainz']
            ],
            minzoom: 5,
            maxzoom: 12,
            layout: {
                'text-field': '{name_de}',
                'text-font': tokens.sans_regular,
                'text-size': {
                    stops: [
                        [5, 12],
                        [14, 20]
                    ]
                }
            },
            paint: {
                'text-color': tokens.label_primary,
                'text-halo-color': tokens.background,
                'text-halo-width': 2
            },
        },
        {
            id: 'label-place-capital',
            filter: ['all', ['==', 'kind', 'capital'], ['==', 'name_de', 'Berlin']],
            minzoom: 5,
            maxzoom: 12,
            layout: {
                'text-field': '{name_de}',
                'text-font': tokens.sans_medium,
                'text-size': {
                    stops: [
                        [7, 14],
                        [10, 20]
                    ]
                }
            },
            paint: {
                'text-color': tokens.label_primary,
                'text-halo-color': tokens.background,
                'text-halo-width': 2
            },
        }
    ].map(el => {
        return {
            'type': 'symbol',
            'source': 'versatiles-osm',
            'source-layer': 'place_labels',
            ...el
        } as SymbolLayerSpecification
    })

    return { placeLabels }
}