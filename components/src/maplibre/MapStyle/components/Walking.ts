import { type Layer } from "./types"
import tokens from "../tokens";
import type { SymbolLayerSpecification } from "maplibre-gl";

const street_layout = {
    'line-join': 'round',
    'line-cap': 'butt'
};

const street_residential = {
    line_color: tokens.street_tertiary,
    line_width: {
        stops: [
            [13, 1],
            [14, 2],
            [16, 5],
            [18, 24],
            [19, 60],
            [20, 120]
        ]
    },
    line_opacity: {
        stops: [
            [12, 0],
            [13, 1]
        ]
    }
};

export default function makeWalking(): any {
    const walkingTunnels: Layer[] = [{
        id: 'tunnel-street-pedestrian-zone',
        type: 'fill',
        'source-layer': 'street_polygons',
        filter: ['all', ['==', 'tunnel', true], ['==', 'kind', 'pedestrian']],
        paint: {
            'fill-color': 'rgb(247,247,247)',
            'fill-opacity': {
                stops: [
                    [12, 0],
                    [13, 1]
                ]
            }
        }
    },
    {
        id: 'tunnel-way-footway:outline',
        type: 'line',
        'source-layer': 'streets',
        filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'footway']],
        layout: {
            'line-cap': 'round'
        },
        paint: {
            'line-width': {
                stops: [
                    [15, 0],
                    [16, 5],
                    [18, 7],
                    [19, 12],
                    [20, 22]
                ]
            },
            'line-color': 'hsl(0,0%,86%)'
        },
        minzoom: 15
    },
    {
        id: 'tunnel-way-steps:outline',
        type: 'line',
        'source-layer': 'streets',
        filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'steps']],
        layout: {
            'line-cap': 'round'
        },
        paint: {
            'line-width': {
                stops: [
                    [15, 0],
                    [16, 5],
                    [18, 7],
                    [19, 12],
                    [20, 22]
                ]
            },
            'line-color': 'hsl(0,0%,86%)'
        },
        minzoom: 15
    },
    {
        id: 'tunnel-way-path:outline',
        type: 'line',
        'source-layer': 'streets',
        filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'path']],
        layout: {
            'line-cap': 'round'
        },
        paint: {
            'line-width': {
                stops: [
                    [15, 0],
                    [16, 5],
                    [18, 7],
                    [19, 12],
                    [20, 22]
                ]
            },
            'line-color': 'hsl(0,0%,86%)'
        },
        minzoom: 15
    },
    {
        id: 'tunnel-way-cycleway:outline',
        type: 'line',
        'source-layer': 'streets',
        filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'cycleway']],
        layout: {
            'line-cap': 'round'
        },
        paint: {
            'line-width': {
                stops: [
                    [15, 0],
                    [16, 5],
                    [18, 7],
                    [19, 12],
                    [20, 22]
                ]
            },
            'line-color': 'hsl(0,0%,87%)'
        },
        minzoom: 15
    }, {
        // See: https://wiki.openstreetmap.org/wiki/Tag:highway%3Dtrack
        id: 'tunnel-street-track:outline',
        type: 'line',
        'source-layer': 'streets',
        filter: ['all', ['==', 'kind', 'track'], ['==', 'tunnel', true]],
        paint: {
            'line-color': 'rgb(222,222,222)',
            'line-width': {
                stops: [
                    [14, 2],
                    [16, 4],
                    [18, 18],
                    [19, 48],
                    [20, 96]
                ]
            },
            'line-opacity': {
                stops: [
                    [14, 0],
                    [15, 1]
                ]
            }
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        }
    },
    {
        id: 'tunnel-street-pedestrian:outline',
        type: 'line',
        'source-layer': 'streets',
        filter: ['all', ['==', 'kind', 'pedestrian'], ['==', 'tunnel', true]],
        paint: {
            'line-color': 'rgb(222,222,222)',
            'line-width': {
                stops: [
                    [12, 2],
                    [14, 3],
                    [16, 6],
                    [18, 26],
                    [19, 64],
                    [20, 128]
                ]
            },
            'line-opacity': {
                stops: [
                    [12, 0],
                    [13, 1]
                ]
            }
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        }
    },
    {
        id: 'tunnel-way-footway', // See: https://wiki.openstreetmap.org/wiki/Tag:highway%3Dfootway
        type: 'line',
        'source-layer': 'streets',
        filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'footway']],
        layout: {
            'line-cap': 'round'
        },
        paint: {
            'line-width': {
                stops: [
                    [15, 0],
                    [16, 4],
                    [18, 6],
                    [19, 10],
                    [20, 20]
                ]
            },
            'line-color': 'hsl(0,0%,94%)',
            'line-dasharray': [1, 0.2]
        },
        minzoom: 15
    }, {
        id: 'tunnel-way-steps',
        type: 'line',
        'source-layer': 'streets',
        filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'steps']],
        layout: {
            'line-cap': 'round'
        },
        paint: {
            'line-width': {
                stops: [
                    [15, 0],
                    [16, 4],
                    [18, 6],
                    [19, 10],
                    [20, 20]
                ]
            },
            'line-color': 'hsl(0,0%,94%)',
            'line-dasharray': [1, 0.2]
        },
        minzoom: 15
    },
    {
        id: 'tunnel-way-path',
        type: 'line',
        'source-layer': 'streets',
        filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'path']],
        layout: {
            'line-cap': 'round'
        },
        paint: {
            'line-width': {
                stops: [
                    [15, 0],
                    [16, 4],
                    [18, 6],
                    [19, 10],
                    [20, 20]
                ]
            },
            'line-color': 'hsl(0,0%,94%)',
            'line-dasharray': [1, 0.2]
        },
        minzoom: 15
    },
    {
        id: 'tunnel-way-cycleway',
        type: 'line',
        'source-layer': 'streets',
        filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'cycleway']],
        layout: {
            'line-cap': 'round'
        },
        paint: {
            'line-width': {
                stops: [
                    [15, 0],
                    [16, 4],
                    [18, 6],
                    [19, 10],
                    [20, 20]
                ]
            },
            'line-color': 'hsl(0,0%,95%)',
            'line-dasharray': [1, 0.2]
        },
        minzoom: 15
    },
    {
        id: 'tunnel-street-track',
        type: 'line',
        'source-layer': 'streets',
        filter: ['all', ['==', 'kind', 'track'], ['==', 'tunnel', true]],
        paint: {
            'line-color': 'rgb(247,247,247)',
            'line-width': {
                stops: [
                    [14, 1],
                    [16, 3],
                    [18, 16],
                    [19, 44],
                    [20, 88]
                ]
            },
            'line-opacity': {
                stops: [
                    [14, 0],
                    [15, 1]
                ]
            }
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        }
    },
    {
        id: 'tunnel-street-pedestrian',
        type: 'line',
        'source-layer': 'streets',
        filter: ['all', ['==', 'kind', 'pedestrian'], ['==', 'tunnel', true]],
        paint: {
            'line-color': 'rgb(247,247,247)',
            'line-width': {
                stops: [
                    [12, 1],
                    [14, 2],
                    [16, 5],
                    [18, 24],
                    [19, 60],
                    [20, 120]
                ]
            },
            'line-opacity': {
                stops: [
                    [12, 0],
                    [13, 1]
                ]
            }
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        }
    }, {
        id: 'tunnel-street-livingstreet-bicycle',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['==', 'kind', 'living_street'],
            ['==', 'bicycle', 'designated'],
            ['==', 'tunnel', true]
        ],
        paint: {
            'line-color': 'hsl(203,0%,97%)',
            'line-width': {
                stops: [
                    [12, 1],
                    [14, 2],
                    [16, 5],
                    [18, 24],
                    [19, 60],
                    [20, 120]
                ]
            },
            'line-opacity': {
                stops: [
                    [12, 0],
                    [13, 1]
                ]
            }
        },
        layout: street_layout
    },
    {
        id: 'tunnel-street-residential-bicycle',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['==', 'kind', 'residential'],
            ['==', 'bicycle', 'designated'],
            ['==', 'tunnel', true]
        ],
        paint: {
            'line-color': street_residential.line_color,
            'line-width': street_residential.line_width,
            'line-opacity': street_residential.line_opacity
        },
        layout: street_layout
    },
    {
        id: 'tunnel-street-unclassified-bicycle',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['==', 'kind', 'unclassified'],
            ['==', 'bicycle', 'designated'],
            ['==', 'tunnel', true]
        ],
        paint: {
            'line-color': 'hsl(203,0%,97%)',
            'line-width': {
                stops: [
                    [12, 1],
                    [14, 2],
                    [16, 5],
                    [18, 24],
                    [19, 60],
                    [20, 120]
                ]
            },
            'line-opacity': {
                stops: [
                    [12, 0],
                    [13, 1]
                ]
            }
        },
        layout: street_layout
    }, {
        id: 'tunnel-street-track-bicycle',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['==', 'kind', 'track'],
            ['==', 'bicycle', 'designated'],
            ['==', 'tunnel', true]
        ],
        paint: {
            'line-color': 'rgb(247,247,247)'
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        }
    },
    {
        id: 'tunnel-street-pedestrian-bicycle',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['==', 'kind', 'pedestrian'],
            ['==', 'bicycle', 'designated'],
            ['==', 'tunnel', true]
        ],
        paint: {
            'line-color': 'hsl(203,0%,97%)',
            'line-width': {
                stops: [
                    [12, 1],
                    [14, 2],
                    [16, 5],
                    [18, 24],
                    [19, 60],
                    [20, 120]
                ]
            },
            'line-opacity': {
                stops: [
                    [12, 0],
                    [13, 1]
                ]
            }
        },
        layout: street_layout
    },
    {
        id: 'tunnel-street-service-bicycle',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['==', 'kind', 'service'],
            ['==', 'bicycle', 'designated'],
            ['==', 'tunnel', true],
            ['!=', 'service', 'driveway']
        ],
        paint: {
            'line-color': 'rgb(247,247,247)'
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        }
    }].map(el => {
        return { 'source': 'versatiles-osm', ...el } as Layer
    })


    const walkingSurface: Layer[] = [
        {
            id: 'street-pedestrian-zone',
            type: 'fill',
            'source-layer': 'street_polygons',
            filter: ['all', ['!=', 'bridge', true], ['!=', 'tunnel', true], ['==', 'kind', 'pedestrian']],
            paint: {
                'fill-color': 'rgba(245,245,245,0.25)',
                'fill-opacity': {
                    stops: [
                        [12, 0],
                        [13, 1],
                        [14, 0],
                        [15, 1]
                    ]
                }
            }
        },
        {
            id: 'way-footway:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['!=', 'bridge', true], ['!=', 'tunnel', true], ['in', 'kind', 'footway']],
            layout: {
                'line-cap': 'round'
            },
            paint: {
                'line-width': {
                    stops: [
                        [15, 0],
                        [16, 5],
                        [18, 7],
                        [19, 12],
                        [20, 22]
                    ]
                },
                'line-color': 'rgb(220,220,220)'
            },
            minzoom: 15
        },
        {
            id: 'way-steps:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['!=', 'bridge', true], ['!=', 'tunnel', true], ['in', 'kind', 'steps']],
            minzoom: 15,
            layout: {
                'line-cap': 'round'
            },
            paint: {
                'line-width': {
                    stops: [
                        [15, 0],
                        [16, 5],
                        [18, 7],
                        [19, 12],
                        [20, 22]
                    ]
                },
                'line-color': 'rgb(220,220,220)'
            },
        },
        {
            id: 'way-path:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['!=', 'bridge', true], ['!=', 'tunnel', true], ['in', 'kind', 'path']],
            minzoom: 15,
            layout: {
                'line-cap': 'round'
            },
            paint: {
                'line-width': {
                    stops: [
                        [15, 0],
                        [16, 5],
                        [18, 7],
                        [19, 12],
                        [20, 22]
                    ]
                },
                'line-color': 'rgb(220,220,220)'
            }
        },
        {
            id: 'way-cycleway:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['!=', 'bridge', true], ['!=', 'tunnel', true], ['in', 'kind', 'cycleway']],
            layout: {
                'line-cap': 'round'
            },
            paint: {
                'line-width': {
                    stops: [
                        [15, 0],
                        [16, 5],
                        [18, 7],
                        [19, 12],
                        [20, 22]
                    ]
                },
                'line-color': 'rgb(222,222,222)'
            },
            minzoom: 15
        },
        {
            id: 'street-track:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'track'], ['!=', 'bridge', true], ['!=', 'tunnel', true]],
            paint: {
                'line-color': 'hsl(36,0%,80%)',
                'line-width': {
                    stops: [
                        [14, 2],
                        [16, 4],
                        [18, 18],
                        [19, 48],
                        [20, 96]
                    ]
                },
                'line-opacity': {
                    stops: [
                        [14, 0],
                        [15, 1]
                    ]
                }
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            }
        },
        {
            id: 'street-pedestrian:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'pedestrian'], ['!=', 'bridge', true], ['!=', 'tunnel', true]],
            paint: {
                'line-color': 'hsl(36,0%,80%)',
                'line-width': {
                    stops: [
                        [12, 2],
                        [14, 3],
                        [16, 6],
                        [18, 26],
                        [19, 64],
                        [20, 128]
                    ]
                },
                'line-opacity': {
                    stops: [
                        [12, 0],
                        [13, 1]
                    ]
                }
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            }
        },
        {
            id: 'way-footway',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['!=', 'bridge', true], ['!=', 'tunnel', true], ['in', 'kind', 'footway']],
            layout: {
                'line-cap': 'round'
            },
            paint: {
                'line-width': {
                    stops: [
                        [15, 0],
                        [16, 4],
                        [18, 6],
                        [19, 10],
                        [20, 20]
                    ]
                },
                'line-color': 'rgb(245,245,245)'
            },
            minzoom: 15
        },
        {
            id: 'way-steps',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['!=', 'bridge', true], ['!=', 'tunnel', true], ['in', 'kind', 'steps']],
            layout: {
                'line-cap': 'round'
            },
            paint: {
                'line-width': {
                    stops: [
                        [15, 0],
                        [16, 4],
                        [18, 6],
                        [19, 10],
                        [20, 20]
                    ]
                },
                'line-color': 'rgb(245,245,245)'
            },
            minzoom: 15
        },
        {
            id: 'way-path',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['!=', 'bridge', true], ['!=', 'tunnel', true], ['in', 'kind', 'path']],
            layout: {
                'line-cap': 'round'
            },
            paint: {
                'line-width': {
                    stops: [
                        [15, 0],
                        [16, 4],
                        [18, 6],
                        [19, 10],
                        [20, 20]
                    ]
                },
                'line-color': 'rgb(245,245,245)'
            },
            minzoom: 15
        },
        {
            id: 'way-cycleway',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['!=', 'bridge', true], ['!=', 'tunnel', true], ['in', 'kind', 'cycleway']],
            layout: {
                'line-cap': 'round'
            },
            paint: {
                'line-width': {
                    stops: [
                        [15, 0],
                        [16, 4],
                        [18, 6],
                        [19, 10],
                        [20, 20]
                    ]
                },
                'line-color': 'hsl(203,0%,97%)'
            },
            minzoom: 15
        },
        {
            id: 'street-track',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'track'], ['!=', 'bridge', true], ['!=', 'tunnel', true]],
            paint: {
                'line-color': 'hsl(0,0%,100%)',
                'line-width': {
                    stops: [
                        [14, 1],
                        [16, 3],
                        [18, 16],
                        [19, 44],
                        [20, 88]
                    ]
                },
                'line-opacity': {
                    stops: [
                        [14, 0],
                        [15, 1]
                    ]
                }
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            }
        },
        {
            id: 'street-pedestrian',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'pedestrian'], ['!=', 'bridge', true], ['!=', 'tunnel', true]],
            paint: {
                'line-color': tokens.street_tertiary,
                'line-width': {
                    stops: [
                        [12, 1],
                        [14, 2],
                        [16, 5],
                        [18, 24],
                        [19, 60],
                        [20, 120]
                    ]
                },
                'line-opacity': {
                    stops: [
                        [12, 0],
                        [13, 0],
                        [14, 1]
                    ]
                }
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            }
        },
        {
            id: 'street-track-bicycle',
            type: 'line',
            'source-layer': 'streets',
            filter: [
                'all',
                ['==', 'kind', 'track'],
                ['==', 'bicycle', 'designated'],
                ['!=', 'bridge', true],
                ['!=', 'tunnel', true]
            ],
            paint: {
                'line-color': 'hsl(0,0%,100%)'
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            }
        },
        {
            id: 'street-pedestrian-bicycle',
            type: 'line',
            'source-layer': 'streets',
            filter: [
                'all',
                ['==', 'kind', 'pedestrian'],
                ['==', 'bicycle', 'designated'],
                ['!=', 'bridge', true],
                ['!=', 'tunnel', true]
            ],
            paint: {
                'line-color': 'hsl(203,0%,97%)',
                'line-width': {
                    stops: [
                        [12, 1],
                        [14, 2],
                        [16, 5],
                        [18, 24],
                        [19, 60],
                        [20, 120]
                    ]
                },
                'line-opacity': {
                    stops: [
                        [12, 0],
                        [13, 1]
                    ]
                }
            },
            layout: street_layout
        },
        {
            id: 'street-service-bicycle',
            type: 'line',
            'source-layer': 'streets',
            filter: [
                'all',
                ['==', 'kind', 'service'],
                ['==', 'bicycle', 'designated'],
                ['!=', 'bridge', true],
                ['!=', 'tunnel', true],
                ['!=', 'service', 'driveway']
            ],
            paint: {
                'line-color': 'hsl(0,0%,100%)'
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            }
        },
        {
            id: 'street-livingstreet-bicycle',
            type: 'line',
            'source-layer': 'streets',
            filter: [
                'all',
                ['==', 'kind', 'living_street'],
                ['==', 'bicycle', 'designated'],
                ['!=', 'bridge', true],
                ['!=', 'tunnel', true]
            ],
            paint: {
                'line-color': 'hsl(203,0%,97%)',
                'line-width': {
                    stops: [
                        [12, 1],
                        [14, 2],
                        [16, 5],
                        [18, 24],
                        [19, 60],
                        [20, 120]
                    ]
                },
                'line-opacity': {
                    stops: [
                        [12, 0],
                        [13, 1]
                    ]
                }
            },
            layout: street_layout
        },
        {
            id: 'street-residential-bicycle',
            type: 'line',
            'source-layer': 'streets',
            filter: [
                'all',
                ['==', 'kind', 'residential'],
                ['==', 'bicycle', 'designated'],
                ['!=', 'bridge', true],
                ['!=', 'tunnel', true]
            ],
            paint: {
                'line-color': street_residential.line_color,
                'line-width': street_residential.line_width,
                'line-opacity': street_residential.line_opacity
            },
            layout: street_layout
        },
        {
            id: 'street-unclassified-bicycle',
            type: 'line',
            'source-layer': 'streets',
            filter: [
                'all',
                ['==', 'kind', 'unclassified'],
                ['==', 'bicycle', 'designated'],
                ['!=', 'bridge', true],
                ['!=', 'tunnel', true]
            ],
            paint: {
                'line-color': 'hsl(203,0%,97%)',
                'line-width': {
                    stops: [
                        [12, 1],
                        [14, 2],
                        [16, 5],
                        [18, 24],
                        [19, 60],
                        [20, 120]
                    ]
                },
                'line-opacity': {
                    stops: [
                        [12, 0],
                        [13, 1]
                    ]
                }
            },
            layout: street_layout
        }
    ].map(el => {
        return { 'source': 'versatiles-osm', ...el } as Layer
    })

    const walkingBridges: Layer[] = [
        {
            id: 'bridge-way-footway:bridge',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'footway']],
            layout: {
                'line-cap': 'butt',
                'line-join': 'round'
            },
            paint: {
                'line-color': 'rgb(239,239,239)',
                'line-opacity': 0.5,
                'line-width': {
                    stops: [
                        [15, 0],
                        [16, 7],
                        [18, 10],
                        [19, 17],
                        [20, 31]
                    ]
                }
            },
            minzoom: 15
        },
        {
            id: 'bridge-way-steps:bridge',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'steps']],
            layout: {
                'line-cap': 'butt',
                'line-join': 'round'
            },
            paint: {
                'line-color': 'rgb(239,239,239)',
                'line-opacity': 0.5,
                'line-width': {
                    stops: [
                        [15, 0],
                        [16, 7],
                        [18, 10],
                        [19, 17],
                        [20, 31]
                    ]
                }
            },
            minzoom: 15
        },
        {
            id: 'bridge-way-path:bridge',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'path']],
            layout: {
                'line-cap': 'butt',
                'line-join': 'round'
            },
            paint: {
                'line-color': 'rgb(239,239,239)',
                'line-opacity': 0.5,
                'line-width': {
                    stops: [
                        [15, 0],
                        [16, 7],
                        [18, 10],
                        [19, 17],
                        [20, 31]
                    ]
                }
            },
            minzoom: 15
        },
        {
            id: 'bridge-way-cycleway:bridge',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'cycleway']],
            layout: {
                'line-cap': 'butt',
                'line-join': 'round'
            },
            paint: {
                'line-color': 'rgb(239,239,239)',
                'line-opacity': 0.5,
                'line-width': {
                    stops: [
                        [15, 0],
                        [16, 7],
                        [18, 10],
                        [19, 17],
                        [20, 31]
                    ]
                }
            },
            minzoom: 15
        },
        {
            id: 'bridge-street-track:bridge',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'track'], ['==', 'bridge', true]],
            layout: {
                'line-cap': 'butt',
                'line-join': 'round'
            },
            paint: {
                'line-color': 'rgb(239,239,239)',
                'line-opacity': {
                    stops: [
                        [14, 0],
                        [15, 1]
                    ]
                },
                'line-width': {
                    stops: [
                        [14, 3],
                        [16, 6],
                        [18, 25],
                        [19, 67],
                        [20, 134]
                    ]
                }
            }
        },
        {
            id: 'bridge-street-pedestrian:bridge',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'pedestrian'], ['==', 'bridge', true]],
            layout: {
                'line-cap': 'butt',
                'line-join': 'round'
            },
            paint: {
                'line-color': 'rgb(239,239,239)',
                'line-opacity': {
                    stops: [
                        [12, 0],
                        [13, 1]
                    ]
                },
                'line-width': {
                    stops: [
                        [12, 3],
                        [14, 4],
                        [16, 8],
                        [18, 36],
                        [19, 90],
                        [20, 179]
                    ]
                }
            }
        },
        {
            id: 'bridge-street-pedestrian-zone',
            type: 'fill',
            'source-layer': 'street_polygons',
            filter: ['all', ['==', 'bridge', true], ['==', 'kind', 'pedestrian']],
            paint: {
                'fill-color': 'hsl(0,0%,100%)',
                'fill-opacity': {
                    stops: [
                        [12, 0],
                        [13, 1]
                    ]
                }
            }
        },
        {
            id: 'bridge-way-footway:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'footway']],
            minzoom: 15,
            layout: {
                'line-cap': 'butt'
            },
            paint: {
                'line-width': {
                    stops: [
                        [15, 0],
                        [16, 5],
                        [18, 7],
                        [19, 12],
                        [20, 22]
                    ]
                },
                'line-color': 'rgb(220,220,220)'
            },
        },
        {
            id: 'bridge-way-steps:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'steps']],
            minzoom: 15,
            layout: {
                'line-cap': 'butt'
            },
            paint: {
                'line-width': {
                    stops: [
                        [15, 0],
                        [16, 5],
                        [18, 7],
                        [19, 12],
                        [20, 22]
                    ]
                },
                'line-color': 'rgb(220,220,220)'
            },
        },
        {
            id: 'bridge-way-path:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'path']],
            layout: {
                'line-cap': 'butt'
            },
            paint: {
                'line-width': {
                    stops: [
                        [15, 0],
                        [16, 5],
                        [18, 7],
                        [19, 12],
                        [20, 22]
                    ]
                },
                'line-color': 'rgb(220,220,220)'
            },
            minzoom: 15
        },
        {
            id: 'bridge-way-cycleway:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'cycleway']],
            layout: {
                'line-cap': 'butt'
            },
            paint: {
                'line-width': {
                    stops: [
                        [15, 0],
                        [16, 5],
                        [18, 7],
                        [19, 12],
                        [20, 22]
                    ]
                },
                'line-color': 'rgb(222,222,222)'
            },
            minzoom: 15
        },
        {
            id: 'bridge-street-track:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'track'], ['==', 'bridge', true]],
            paint: {
                'line-color': 'rgb(217,217,217)',
                'line-width': {
                    stops: [
                        [14, 2],
                        [16, 4],
                        [18, 18],
                        [19, 48],
                        [20, 96]
                    ]
                },
                'line-opacity': {
                    stops: [
                        [14, 0],
                        [15, 1]
                    ]
                }
            },
            layout: street_layout
        },
        {
            id: 'bridge-street-pedestrian:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'pedestrian'], ['==', 'bridge', true]],
            paint: {
                'line-color': 'rgb(217,217,217)',
                'line-width': {
                    stops: [
                        [12, 2],
                        [14, 3],
                        [16, 6],
                        [18, 26],
                        [19, 64],
                        [20, 128]
                    ]
                },
                'line-opacity': {
                    stops: [
                        [12, 0],
                        [13, 1]
                    ]
                }
            },
            layout: street_layout
        },
        {
            id: 'bridge-way-footway',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'footway']],
            layout: {
                'line-cap': 'butt'
            },
            paint: {
                'line-width': {
                    stops: [
                        [15, 0],
                        [16, 4],
                        [18, 6],
                        [19, 10],
                        [20, 20]
                    ]
                },
                'line-color': 'rgb(245,245,245)'
            },
            minzoom: 15
        },
        {
            id: 'bridge-way-steps',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'steps']],
            layout: {
                'line-cap': 'butt'
            },
            paint: {
                'line-width': {
                    stops: [
                        [15, 0],
                        [16, 4],
                        [18, 6],
                        [19, 10],
                        [20, 20]
                    ]
                },
                'line-color': 'rgb(245,245,245)'
            },
            minzoom: 15
        },
        {
            id: 'bridge-way-path',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'path']],
            layout: {
                'line-cap': 'butt'
            },
            paint: {
                'line-width': {
                    stops: [
                        [15, 0],
                        [16, 4],
                        [18, 6],
                        [19, 10],
                        [20, 20]
                    ]
                },
                'line-color': 'rgb(245,245,245)'
            },
            minzoom: 15
        },
        {
            id: 'bridge-way-cycleway',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'cycleway']],
            layout: {
                'line-cap': 'butt'
            },
            paint: {
                'line-width': {
                    stops: [
                        [15, 0],
                        [16, 4],
                        [18, 6],
                        [19, 10],
                        [20, 20]
                    ]
                },
                'line-color': 'hsl(203,0%,97%)'
            },
            minzoom: 15
        },
        {
            id: 'bridge-street-track',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'track'], ['==', 'bridge', true]],
            paint: {
                'line-color': 'hsl(0,0%,100%)',
                'line-width': {
                    stops: [
                        [14, 1],
                        [16, 3],
                        [18, 16],
                        [19, 44],
                        [20, 88]
                    ]
                },
                'line-opacity': {
                    stops: [
                        [14, 0],
                        [15, 1]
                    ]
                }
            },
            layout: street_layout
        },
        {
            id: 'bridge-street-pedestrian',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'pedestrian'], ['==', 'bridge', true]],
            paint: {
                'line-color': 'hsl(0,0%,100%)',
                'line-width': {
                    stops: [
                        [12, 1],
                        [14, 2],
                        [16, 5],
                        [18, 24],
                        [19, 60],
                        [20, 120]
                    ]
                },
                'line-opacity': {
                    stops: [
                        [12, 0],
                        [13, 1]
                    ]
                }
            },
            layout: street_layout
        },
        {
            id: 'bridge-street-track-bicycle',
            type: 'line',
            'source-layer': 'streets',
            filter: [
                'all',
                ['==', 'kind', 'track'],
                ['==', 'bicycle', 'designated'],
                ['==', 'bridge', true]
            ],
            paint: {
                'line-color': 'hsl(0,0%,100%)'
            },
            layout: street_layout
        },
        {
            id: 'bridge-street-pedestrian-bicycle',
            type: 'line',
            'source-layer': 'streets',
            filter: [
                'all',
                ['==', 'kind', 'pedestrian'],
                ['==', 'bicycle', 'designated'],
                ['==', 'bridge', true]
            ],
            paint: {
                'line-color': 'hsl(203,0%,97%)',
                'line-width': {
                    stops: [
                        [12, 1],
                        [14, 2],
                        [16, 5],
                        [18, 24],
                        [19, 60],
                        [20, 120]
                    ]
                },
                'line-opacity': {
                    stops: [
                        [12, 0],
                        [13, 1]
                    ]
                }
            },
            layout: street_layout
        },
        {
            id: 'bridge-street-service-bicycle',
            type: 'line',
            'source-layer': 'streets',
            filter: [
                'all',
                ['==', 'kind', 'service'],
                ['==', 'bicycle', 'designated'],
                ['==', 'bridge', true],
                ['!=', 'service', 'driveway']
            ],
            paint: {
                'line-color': 'hsl(0,0%,100%)'
            },
            layout: street_layout
        },
        {
            id: 'bridge-street-livingstreet-bicycle',
            type: 'line',
            'source-layer': 'streets',
            filter: [
                'all',
                ['==', 'kind', 'living_street'],
                ['==', 'bicycle', 'designated'],
                ['==', 'bridge', true]
            ],
            paint: {
                'line-color': 'hsl(203,0%,97%)',
                'line-width': {
                    stops: [
                        [12, 1],
                        [14, 2],
                        [16, 5],
                        [18, 24],
                        [19, 60],
                        [20, 120]
                    ]
                },
                'line-opacity': {
                    stops: [
                        [12, 0],
                        [13, 1]
                    ]
                }
            },
            layout: street_layout
        },
        {
            id: 'bridge-street-residential-bicycle',
            type: 'line',
            'source-layer': 'streets',
            filter: [
                'all',
                ['==', 'kind', 'residential'],
                ['==', 'bicycle', 'designated'],
                ['==', 'bridge', true]
            ],
            paint: {
                'line-color': street_residential.line_color,
                'line-width': street_residential.line_width,
                'line-opacity': street_residential.line_opacity
            },
            layout: street_layout
        },
        {
            id: 'bridge-street-unclassified-bicycle',
            type: 'line',
            'source-layer': 'streets',
            filter: [
                'all',
                ['==', 'kind', 'unclassified'],
                ['==', 'bicycle', 'designated'],
                ['==', 'bridge', true]
            ],
            paint: {
                'line-color': 'hsl(203,0%,97%)',
                'line-width': {
                    stops: [
                        [12, 1],
                        [14, 2],
                        [16, 5],
                        [18, 24],
                        [19, 60],
                        [20, 120]
                    ]
                },
                'line-opacity': {
                    stops: [
                        [12, 0],
                        [13, 1]
                    ]
                }
            },
            layout: street_layout
        },
    ].map(el => {
        return { 'source': 'versatiles-osm', ...el } as Layer
    })

    const walkingLabels: SymbolLayerSpecification[] = [{
        source: 'versatiles-osm',
        id: 'label-street-pedestrian',
        type: 'symbol',
        'source-layer': 'street_labels',
        filter: ['==', 'kind', 'pedestrian'],
        minzoom: 14,
        layout: {
            'text-field': '{name_de}',
            'text-font': tokens.sans_regular,
            'symbol-placement': 'line',
            'text-anchor': 'center',
            'text-size': {
                stops: [
                    [12, 10],
                    [15, 13]
                ]
            }
        },
        paint: {
            'text-color': 'hsl(240,0%,23%)',
            'text-halo-color': 'hsla(0,0%,100%,0.8)',
            'text-halo-width': 2,
            'text-halo-blur': 1
        }
    }]

    return { walkingTunnels, walkingSurface, walkingBridges, walkingLabels }
}