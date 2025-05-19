import tokens from "../tokens";
import type { Layer } from "./types";

const rail = {
    line_color: '#d3d3d3',
    line_dasharray: [2, 2],
    line_width: {
        stops: [
            [8, 1],
            [13, 1],
            [20, 2]
        ]
    },
    line_opacity: {
        stops: [
            [12, 0],
            [13, 1]
        ]
    }
};

const rail_overlay = {
    line_width: {
        stops: [
            [8, 1],
            [13, 6],
            [20, 12]
        ]
    },
    line_dasharray: [0.125, 6]
};

const rail_outline = {
    line_color: tokens.background,
    line_width: {
        stops: [
            [13, 2],
            [20, 4]
        ]
    },
    line_opacity: {
        stops: [
            [12, 0],
            [13, 1]
        ]
    }
};

export default function makeTransit() {
    const airports = [{
        source: 'versatiles-osm',
        id: 'airport-taxiway:outline',
        type: 'line',
        'source-layer': 'streets',
        filter: ['==', 'kind', 'taxiway'],
        paint: {
            'line-color': 'hsl(36,0%,80%)',
            'line-width': {
                stops: [
                    [13, 0],
                    [14, 2],
                    [15, 10],
                    [16, 14],
                    [18, 20],
                    [20, 40]
                ]
            }
        },
        layout: {
            'line-join': 'round'
        }
    },
    {
        source: 'versatiles-osm',
        id: 'airport-runway:outline',
        type: 'line',
        'source-layer': 'streets',
        filter: ['==', 'kind', 'runway'],
        paint: {
            'line-color': 'hsl(36,0%,80%)',
            'line-width': {
                stops: [
                    [11, 0],
                    [12, 6],
                    [13, 9],
                    [14, 16],
                    [15, 24],
                    [16, 40],
                    [17, 100],
                    [18, 160],
                    [20, 300]
                ]
            }
        },
        layout: {
            'line-join': 'round'
        }
    },
    {
        source: 'versatiles-osm',
        id: 'airport-taxiway',
        type: 'line',
        'source-layer': 'streets',
        filter: ['==', 'kind', 'taxiway'],
        paint: {
            'line-color': 'hsl(0,0%,100%)',
            'line-width': {
                stops: [
                    [13, 0],
                    [14, 1],
                    [15, 8],
                    [16, 12],
                    [18, 18],
                    [20, 36]
                ]
            },
            'line-opacity': {
                stops: [
                    [13, 0],
                    [14, 1]
                ]
            }
        },
        layout: {
            'line-join': 'round'
        }
    },
    {
        source: 'versatiles-osm',
        id: 'airport-runway',
        type: 'line',
        'source-layer': 'streets',
        filter: ['==', 'kind', 'runway'],
        paint: {
            'line-color': 'hsl(0,0%,100%)',
            'line-width': {
                stops: [
                    [11, 0],
                    [12, 5],
                    [13, 8],
                    [14, 14],
                    [15, 22],
                    [16, 38],
                    [17, 98],
                    [18, 158],
                    [20, 298]
                ]
            },
            'line-opacity': {
                stops: [
                    [11, 0],
                    [12, 1]
                ]
            }
        },
        layout: {
            'line-join': 'round'
        }
    }]

    const transitBridges = [
        {
            source: 'versatiles-osm',
            id: 'bridge-transport-monorail:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['in', 'kind', 'monorail'], ['!has', 'service'], ['==', 'bridge', true]],
            minzoom: 15,
            paint: {
                'line-color': rail_outline.line_color,
                'line-width': rail_outline.line_width
            }
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-transport-funicular:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['in', 'kind', 'funicular'], ['!has', 'service'], ['==', 'bridge', true]],
            minzoom: 15,
            paint: {
                'line-color': rail_outline.line_color,
                'line-width': rail_outline.line_width
            }
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-transport-tram:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['in', 'kind', 'tram'], ['!has', 'service'], ['==', 'bridge', true]],
            minzoom: 15,
            paint: {
                'line-color': rail_outline.line_color,
                'line-width': rail_outline.line_width
            }
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-transport-narrowgauge:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['in', 'kind', 'narrow_gauge'], ['!has', 'service'], ['==', 'bridge', true]],
            minzoom: 15,
            paint: {
                'line-color': rail_outline.line_color,
                'line-width': rail_outline.line_width
            }
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-transport-lightrail:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['in', 'kind', 'light_rail'], ['!has', 'service'], ['==', 'bridge', true]],
            paint: {
                'line-color': rail_outline.line_color,
                'line-width': rail_outline.line_width,
                'line-opacity': rail_outline.line_opacity
            }
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-transport-rail:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['in', 'kind', 'rail'], ['!has', 'service'], ['==', 'bridge', true]],
            paint: {
                'line-color': rail_outline.line_color,
                'line-width': rail_outline.line_width,
                'line-opacity': rail_outline.line_opacity
            }
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-transport-monorail',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['in', 'kind', 'monorail'], ['!has', 'service'], ['==', 'bridge', true]],
            minzoom: 13,
            paint: {
                'line-width': rail.line_width,
                'line-color': rail.line_color
            }
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-transport-funicular',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['in', 'kind', 'funicular'], ['!has', 'service'], ['==', 'bridge', true]],
            minzoom: 13,
            paint: {
                'line-width': rail.line_width,
                'line-color': rail.line_color
            }
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-transport-tram',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['in', 'kind', 'tram'], ['!has', 'service'], ['==', 'bridge', true]],
            minzoom: 13,
            paint: {
                'line-width': rail.line_width,
                'line-color': rail.line_color
            }
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-transport-narrowgauge',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['in', 'kind', 'narrow_gauge'], ['!has', 'service'], ['==', 'bridge', true]],
            minzoom: 13,
            paint: {
                'line-width': rail.line_width,
                'line-color': rail.line_color
            }
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-transport-lightrail',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['in', 'kind', 'light_rail'], ['!has', 'service'], ['==', 'bridge', true]],
            paint: {
                'line-color': rail.line_color,
                'line-width': rail.line_width,
                'line-opacity': rail.line_opacity
            }
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-transport-rail',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['in', 'kind', 'rail'], ['!has', 'service'], ['==', 'bridge', true]],
            paint: {
                'line-color': rail.line_color,
                'line-width': rail.line_width,
                'line-opacity': rail.line_opacity
            }
        }
    ]

    const transitTunnels: Layer[] = [
        {
            source: 'versatiles-osm',
            id: 'tunnel-transport-monorail',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['in', 'kind', 'monorail'], ['!has', 'service'], ['==', 'tunnel', true]],
            minzoom: 13,
            paint: {
                'line-width': rail.line_width,
                'line-color': rail.line_color
            }
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-transport-funicular',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['in', 'kind', 'funicular'], ['!has', 'service'], ['==', 'tunnel', true]],
            minzoom: 13,
            paint: {
                'line-width': rail.line_width,
                'line-color': rail.line_color
            }
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-transport-tram',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['in', 'kind', 'tram'], ['!has', 'service'], ['==', 'tunnel', true]],
            minzoom: 13,
            paint: {
                'line-width': rail.line_width,
                'line-color': rail.line_color
            }
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-transport-narrowgauge',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['in', 'kind', 'narrow_gauge'], ['!has', 'service'], ['==', 'tunnel', true]],
            minzoom: 13,
            paint: {
                'line-width': rail.line_width,
                'line-color': rail.line_color
            }
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-transport-lightrail',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['in', 'kind', 'light_rail'], ['!has', 'service'], ['==', 'tunnel', true]],
            paint: {
                'line-color': rail.line_color,
                'line-width': rail.line_width,
                'line-opacity': rail.line_opacity
            }
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-transport-rail',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['in', 'kind', 'rail'], ['!has', 'service'], ['==', 'tunnel', true]],
            paint: {
                'line-color': rail.line_color,
                'line-width': rail.line_width,
                'line-opacity': rail.line_opacity
            }
        }
    ]
    const transitSurface: Layer[] = [
        {
            source: 'versatiles-osm',
            id: 'transport-rail:dashes',
            type: 'line',
            'source-layer': 'streets',
            filter: [
                'all',
                ['in', 'kind', 'rail'],
                ['!has', 'service'],
                ['!=', 'bridge', true],
                ['!=', 'tunnel', true]
            ],
            paint: {
                'line-color': rail.line_color,
                'line-opacity': rail.line_opacity,
                'line-width': rail_overlay.line_width,
                'line-dasharray': rail_overlay.line_dasharray
            }
        },
        {
            source: 'versatiles-osm',
            id: 'transport-monorail',
            type: 'line',
            'source-layer': 'streets',
            filter: [
                'all',
                ['in', 'kind', 'monorail'],
                ['!has', 'service'],
                ['!=', 'bridge', true],
                ['!=', 'tunnel', true]
            ],
            minzoom: 13,
            paint: {
                'line-width': {
                    stops: [
                        [13, 0],
                        [16, 1],
                        [17, 2],
                        [18, 3],
                        [20, 5]
                    ]
                },
                'line-color': 'hsl(208,0%,73%)'
            }
        },
        {
            source: 'versatiles-osm',
            id: 'transport-funicular',
            type: 'line',
            'source-layer': 'streets',
            filter: [
                'all',
                ['in', 'kind', 'funicular'],
                ['!has', 'service'],
                ['!=', 'bridge', true],
                ['!=', 'tunnel', true]
            ],
            minzoom: 13,
            paint: {
                'line-width': {
                    stops: [
                        [13, 0],
                        [16, 1],
                        [17, 2],
                        [18, 3],
                        [20, 5]
                    ]
                },
                'line-color': 'hsl(208,0%,73%)'
            }
        },
        {
            source: 'versatiles-osm',
            id: 'transport-tram',
            type: 'line',
            'source-layer': 'streets',
            filter: [
                'all',
                ['in', 'kind', 'tram'],
                ['!has', 'service'],
                ['!=', 'bridge', true],
                ['!=', 'tunnel', true]
            ],
            minzoom: 13,
            paint: {
                'line-width': rail.line_width,
                'line-color': rail.line_color
            }
        },
        {
            source: 'versatiles-osm',
            id: 'transport-narrowgauge',
            type: 'line',
            'source-layer': 'streets',
            filter: [
                'all',
                ['in', 'kind', 'narrow_gauge'],
                ['!has', 'service'],
                ['!=', 'bridge', true],
                ['!=', 'tunnel', true]
            ],
            minzoom: 13,
            paint: {
                'line-width': rail.line_width,
                'line-color': rail.line_color
            }
        },
        {
            source: 'versatiles-osm',
            id: 'transport-lightrail',
            type: 'line',
            'source-layer': 'streets',
            filter: [
                'all',
                ['in', 'kind', 'light_rail'],
                ['!has', 'service'],
                ['!=', 'bridge', true],
                ['!=', 'tunnel', true]
            ],
            paint: {
                'line-color': rail.line_color,
                'line-width': rail.line_width,
                'line-opacity': {
                    stops: [
                        [14, 0],
                        [15, 1]
                    ]
                }
            }
        },
        {
            source: 'versatiles-osm',
            id: 'transport-rail',
            type: 'line',
            'source-layer': 'streets',
            filter: [
                'all',
                ['in', 'kind', 'rail'],
                ['!has', 'service'],
                ['!=', 'bridge', true],
                ['!=', 'tunnel', true]
            ],
            paint: {
                'line-color': rail.line_color,
                'line-width': rail.line_width,
                'line-opacity': rail.line_opacity
            }
        },
        {
            source: 'versatiles-osm',
            id: 'transport-ferry',
            type: 'line',
            'source-layer': 'ferries',
            minzoom: 10,
            paint: {
                'line-color': 'rgb(184, 189, 207)',
                'line-width': {
                    stops: [
                        [10, 1],
                        [13, 2],
                        [14, 3],
                        [16, 4],
                        [17, 6]
                    ]
                },
                'line-opacity': {
                    stops: [[10, 0]]
                },
                'line-dasharray': [1, 1]
            }
        },
    ]

    return { airports, transitBridges, transitSurface, transitTunnels }
}