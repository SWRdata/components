import type { FillLayerSpecification, LineLayerSpecification } from "maplibre-gl"
import tokens from "./tokens"
type Layer = LineLayerSpecification | FillLayerSpecification
type AdminLevel = 1 | 2 | 3 | 4

export default function buildAdmin(levels: AdminLevel[]): Layer[] {
    const layers = [{
        source: 'versatiles-shortbread',
        id: 'boundary-country:outline',
        type: 'line',
        'source-layer': 'boundaries',
        filter: [
            'all',
            ['==', 'admin_level', 2],
            ['!=', 'maritime', true],
            ['!=', 'disputed', true],
            ['!=', 'coastline', true]
        ],
        paint: {
            'line-color': tokens.background,
            'line-blur': 1,
            'line-width': {
                stops: [
                    [2, 0],
                    [3, 2],
                    [10, 8]
                ]
            },
            'line-opacity': 0.75
        },
        layout: {
            'line-cap': 'round',
            'line-join': 'round'
        }
    },
    {
        source: 'versatiles-shortbread',
        id: 'boundary-country-disputed:outline',
        type: 'line',
        'source-layer': 'boundaries',
        filter: [
            'all',
            ['==', 'admin_level', 2],
            ['==', 'disputed', true],
            ['!=', 'maritime', true],
            ['!=', 'coastline', true]
        ],
        paint: {
            'line-width': {
                stops: [
                    [2, 0],
                    [3, 2],
                    [10, 8]
                ]
            },
            'line-opacity': 0.75,
            'line-color': tokens.background
        }
    },
    {
        source: 'versatiles-shortbread',
        id: 'boundary-state:outline',
        type: 'line',
        'source-layer': 'boundaries',
        filter: [
            'all',
            ['==', 'admin_level', 4],
            ['!=', 'maritime', true],
            ['!=', 'disputed', true],
            ['!=', 'coastline', true]
        ],
        paint: {
            'line-color': tokens.background,
            'line-blur': 1,
            'line-width': {
                stops: [
                    [7, 0],
                    [8, 2],
                    [10, 4]
                ]
            },
            'line-opacity': 0.75
        },
        layout: {
            'line-cap': 'round',
            'line-join': 'round'
        }
    },
    {
        source: 'versatiles-shortbread',
        id: 'boundary-country',
        type: 'line',
        'source-layer': 'boundaries',
        filter: [
            'all',
            ['==', 'admin_level', 2],
            ['!=', 'maritime', true],
            ['!=', 'disputed', true],
            ['!=', 'coastline', true]
        ],
        paint: {
            'line-color': {
                stops: [
                    [7, '#cecdcd'],
                    [10, 'black']
                ]
            },

            'line-width': {
                stops: [
                    [2, 0],
                    [5, 1],
                    [8, 1],
                    [12, 3]
                ]
            }
        },
        layout: {
            'line-cap': 'round',
            'line-join': 'round'
        }
    },
    {
        source: 'versatiles-shortbread',
        id: 'boundary-country-disputed',
        type: 'line',
        'source-layer': 'boundaries',
        filter: [
            'all',
            ['==', 'admin_level', 2],
            ['==', 'disputed', true],
            ['!=', 'maritime', true],
            ['!=', 'coastline', true]
        ],
        paint: {
            'line-width': {
                stops: [
                    [2, 0],
                    [3, 1],
                    [10, 4]
                ]
            },
            'line-color': 'hsl(246,0%,77%)',
            'line-dasharray': [2, 1]
        },
        layout: {
            'line-cap': 'square'
        }
    },
    {
        source: 'versatiles-shortbread',
        id: 'boundary-state',
        type: 'line',
        'source-layer': 'boundaries',
        filter: [
            'all',
            ['==', 'admin_level', 4],
            ['!=', 'maritime', true],
            ['!=', 'disputed', true],
            ['!=', 'coastline', true]
        ],
        paint: {
            'line-color': 'hsl(37, 34%, 79%)',
            'line-width': {
                stops: [
                    [7, 1],
                    [8, 1.5]
                ]
            },
            'line-opacity': {
                stops: [
                    [7, 0],
                    [8, 1]
                ]
            }
        },
        layout: {
            'line-cap': 'round',
            'line-join': 'round'
        }
    }]
    return layers
}