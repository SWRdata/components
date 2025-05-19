import { type Layer } from "./types"
import tokens from "../tokens"

export default function makePlaceLabels() {
    const placeLabels: Layer[] = [
        {
            id: 'label-place-neighbourhood',
            'source-layer': 'place_labels',
            filter: ['==', 'kind', 'neighbourhood'],
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
            minzoom: 14
        },
        {
            id: 'label-place-quarter',
            'source-layer': 'place_labels',
            filter: ['==', 'kind', 'quarter'],
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
            minzoom: 14
        },
        {
            id: 'label-place-suburb',
            'source-layer': 'place_labels',
            filter: ['==', 'kind', 'suburb'],
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
            minzoom: 11
        },
        {
            id: 'label-place-hamlet',
            'source-layer': 'place_labels',
            filter: ['==', 'kind', 'hamlet'],
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
            minzoom: 13
        },
        {
            id: 'label-place-village',
            'source-layer': 'place_labels',
            filter: ['==', 'kind', 'village'],
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
            minzoom: 11
        },
        {
            id: 'label-place-town-large',
            'source-layer': 'place_labels',
            filter: ['all', ['==', 'kind', 'town'], ['>', 'population', 30000]],
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
            minzoom: 8
        },
        {
            id: 'label-place-town',
            'source-layer': 'place_labels',
            filter: ['all', ['==', 'kind', 'town'], ['<', 'population', 30000]],
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
            minzoom: 9
        },

        {
            id: 'label-place-city',
            'source-layer': 'place_labels',
            filter: ['==', 'kind', 'city'],
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
            minzoom: 6,
            maxzoom: 11
        },
        {
            id: 'label-place-statecapital',
            'source-layer': 'place_labels',
            filter: [
                'all',
                ['==', 'kind', 'state_capital'],
                ['in', 'name_de', 'Hannover', 'München', 'Stuttgart', 'Hamburg', 'Köln', 'Essen', 'Mainz']
            ],
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
            minzoom: 5,
            maxzoom: 12
        },
        {
            id: 'label-place-capital',
            'source-layer': 'place_labels',
            filter: ['all', ['==', 'kind', 'capital'], ['==', 'name_de', 'Berlin']],
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
            minzoom: 5,
            maxzoom: 12
        }
    ]

    // Set common properties
    placeLabels.forEach((_, i) => {
        placeLabels[i]["type"] = "symbol"
        placeLabels[i]["source"] = "versatiles-osm"
    })

    return { placeLabels }
}