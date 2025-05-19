import { type Layer } from "./types"
import tokens from "../tokens";

const street_layout = {
    'line-join': 'round',
    'line-cap': 'butt'
};

const motorway = {
    line_color: tokens.street_primary,
    line_width: {
        stops: [
            [6, 1],
            [7, 1.5],
            [11, 2],
            [14, 12]
        ]
    },
    line_opacity: {
        stops: [
            [6, 0],
            [7, 1]
        ]
    }
};

const motorway_outline = {
    line_color: tokens.street_primary_outline,
    line_width: {
        stops: [
            [10, 0],
            [11, 2],
            [14, 14]
        ]
    }
};

const motorway_link = {
    line_width: {
        stops: [
            [6, 0],
            [7, 1],
            [12, 2],
            [14, 6]
        ]
    }
};

const motorway_link_outline = {
    line_width: {
        stops: [
            [6, 0],
            [7, 2],
            [12, 3],
            [14, 8]
        ]
    }
};

const street_primary = {
    line_color: tokens.street_primary,
    line_width: {
        stops: [
            [8, 0],
            [10, 1],
            [12, 2],
            [14, 3],
            [16, 10],
            [18, 34],
            [19, 70],
            [20, 140]
        ]
    },
    line_opacity: {
        stops: [
            [8, 0],
            [9, 1]
        ]
    }
};
const street_primary_outline = {
    line_color: tokens.street_primary_outline,
    line_width: {
        stops: [
            [11, 0],
            [14, 5],
            [16, 12],
            [18, 36],
            [19, 74],
            [20, 144]
        ]
    },
    line_opacity: {
        stops: [
            [8, 0],
            [9, 1]
        ]
    }
};

const street_secondary = {
    line_width: {
        stops: [
            [11, 1],
            [14, 4],
            [16, 6],
            [18, 28],
            [19, 64],
            [20, 130]
        ]
    }
};
const street_secondary_outline = {
    line_width: {
        stops: [
            [12, 2],
            [14, 5],
            [16, 7],
            [18, 14],
            [20, 40]
        ]
    }
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

const street_residential_outline = {
    line_color: tokens.street_tertiary_outline,
    line_width: {
        stops: [
            [14, 0],
            [15, 4]
        ]
    },
    line_opacity: {
        stops: [
            [12, 0],
            [13, 1]
        ]
    }
};

export default function makeRoads() {
    const roadLabels: Layer[] = [
        {
            source: 'versatiles-osm',
            id: 'label-street-livingstreet',
            type: 'symbol',
            'source-layer': 'street_labels',
            filter: ['==', 'kind', 'living_street'],
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
            },
            minzoom: 14
        },
        {
            source: 'versatiles-osm',
            id: 'label-street-residential',
            type: 'symbol',
            'source-layer': 'street_labels',
            filter: ['==', 'kind', 'residential'],
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
            },
            minzoom: 15
        },
        {
            source: 'versatiles-osm',
            id: 'label-street-unclassified',
            type: 'symbol',
            'source-layer': 'street_labels',
            filter: ['==', 'kind', 'unclassified'],
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
                'text-color': tokens.label_secondary,
                'text-halo-color': tokens.background,
                'text-halo-width': 2
            },
            minzoom: 14
        },
        {
            source: 'versatiles-osm',
            id: 'label-street-tertiary',
            type: 'symbol',
            'source-layer': 'street_labels',
            filter: ['==', 'kind', 'tertiary'],
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
            },
            minzoom: 14
        },
        {
            source: 'versatiles-osm',
            id: 'label-street-secondary',
            type: 'symbol',
            'source-layer': 'street_labels',
            filter: ['==', 'kind', 'secondary'],
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
                'text-color': tokens.label_primary,
                'text-halo-color': tokens.background,
                'text-halo-width': 2
            },
            minzoom: 14
        },
        {
            source: 'versatiles-osm',
            id: 'label-street-primary',
            type: 'symbol',
            'source-layer': 'street_labels',
            filter: ['==', 'kind', 'primary'],
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
                'text-color': tokens.label_primary,
                'text-halo-color': 'hsla(0,0%,100%,0.8)',
                'text-halo-width': 2
            },
            minzoom: 14
        },
        {
            source: 'versatiles-osm',
            id: 'label-street-trunk',
            type: 'symbol',
            'source-layer': 'street_labels',
            filter: ['==', 'kind', 'trunk'],
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
                'text-color': tokens.label_primary,
                'text-halo-color': tokens.background,
                'text-halo-width': 2
            },
            minzoom: 13
        },
    ]
    const roadBridges: Layer[] = [
        {
            source: 'versatiles-osm',
            id: 'bridge-street-service:bridge',
            type: 'line',
            'source-layer': 'streets',
            filter: [
                'all',
                ['==', 'kind', 'service'],
                ['==', 'bridge', true],
                ['!=', 'service', 'driveway']
            ],
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
            source: 'versatiles-osm',
            id: 'bridge-street-livingstreet:bridge',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'living_street'], ['==', 'bridge', true]],
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
            source: 'versatiles-osm',
            id: 'bridge-street-residential:bridge',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'residential'], ['==', 'bridge', true]],
            layout: {
                'line-cap': 'butt',
                'line-join': 'round'
            },
            paint: {
                'line-color': street_residential.line_color,
                'line-opacity': street_residential.line_opacity,
                'line-width': street_residential.line_opacity
            }
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-unclassified:bridge',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'unclassified'], ['==', 'bridge', true]],
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
            source: 'versatiles-osm',
            id: 'bridge-street-tertiary-link:bridge',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'tertiary'], ['==', 'link', true]],
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
            source: 'versatiles-osm',
            id: 'bridge-street-secondary-link:bridge',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'secondary'], ['==', 'link', true]],
            layout: {
                'line-cap': 'butt',
                'line-join': 'round'
            },
            paint: {
                'line-color': 'rgb(239,239,239)',
                'line-opacity': 0.5,
                'line-width': {
                    stops: [
                        [12, 3],
                        [14, 4],
                        [16, 10],
                        [18, 20],
                        [20, 56]
                    ]
                }
            },
            minzoom: 13
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-primary-link:bridge',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'primary'], ['==', 'link', true]],
            layout: {
                'line-cap': 'butt',
                'line-join': 'round'
            },
            paint: {
                'line-color': street_primary.line_color,
                'line-width': street_primary.line_width
            },
            minzoom: 13
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-trunk-link:bridge',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'trunk'], ['==', 'link', true]],
            layout: {
                'line-cap': 'butt',
                'line-join': 'round'
            },
            paint: {
                'line-color': motorway.line_color,
                'line-opacity': 0.5,
                'line-width': {
                    stops: [
                        [12, 3],
                        [14, 4],
                        [16, 10],
                        [18, 20],
                        [20, 56]
                    ]
                }
            },
            minzoom: 13
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-motorway-link:bridge',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'motorway'], ['==', 'link', true]],
            layout: {
                'line-cap': 'butt',
                'line-join': 'round'
            },
            paint: {
                'line-color': tokens.street_primary,
                'line-width': motorway_link.line_width,
                'line-opacity': motorway.line_opacity
            },
            minzoom: 12
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-tertiary:bridge',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'tertiary'], ['!=', 'link', true]],
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
            source: 'versatiles-osm',
            id: 'bridge-street-secondary:bridge',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'secondary'], ['!=', 'link', true]],
            layout: {
                'line-cap': 'butt',
                'line-join': 'round'
            },
            paint: {
                'line-color': 'rgb(239,239,239)',
                'line-opacity': {
                    stops: [
                        [11, 0],
                        [12, 1]
                    ]
                },
                'line-width': {
                    stops: [
                        [11, 3],
                        [14, 7],
                        [16, 11],
                        [18, 42],
                        [19, 95],
                        [20, 193]
                    ]
                }
            }
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-primary:bridge',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'primary'], ['!=', 'link', true]],
            layout: {
                'line-cap': 'butt',
                'line-join': 'round'
            },
            paint: {
                'line-color': street_primary.line_color,
                'line-width': street_primary.line_width
            }
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-trunk:bridge',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'trunk'], ['!=', 'link', true]],
            layout: {
                'line-cap': 'butt',
                'line-join': 'round'
            },
            paint: {
                'line-color': motorway.line_color,
                'line-width': motorway.line_width,
                'line-opacity': motorway.line_opacity
            }
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-motorway:bridge',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'motorway'], ['!=', 'link', true]],
            layout: {
                'line-cap': 'butt',
                'line-join': 'round'
            },
            paint: {
                'line-color': tokens.street_primary,
                'line-width': motorway.line_width,
                'line-opacity': motorway.line_opacity
            }
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-service:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: [
                'all',
                ['==', 'kind', 'service'],
                ['==', 'bridge', true],
                ['!=', 'service', 'driveway']
            ],
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
            source: 'versatiles-osm',
            id: 'bridge-street-livingstreet:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'living_street'], ['==', 'bridge', true]],
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
            source: 'versatiles-osm',
            id: 'bridge-street-residential:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'residential'], ['==', 'bridge', true]],
            paint: {
                'line-color': street_residential_outline.line_color,
                'line-width': street_residential_outline.line_width,
                'line-opacity': street_residential_outline.line_opacity
            },
            layout: street_layout
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-unclassified:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'unclassified'], ['==', 'bridge', true]],
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
            source: 'versatiles-osm',
            id: 'bridge-street-tertiary-link:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'tertiary'], ['==', 'link', true]],
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
            source: 'versatiles-osm',
            id: 'bridge-street-secondary-link:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'secondary'], ['==', 'link', true]],
            paint: {
                'line-color': 'hsl(28,0%,69%)',
                'line-width': {
                    stops: [
                        [12, 2],
                        [14, 3],
                        [16, 7],
                        [18, 14],
                        [20, 40]
                    ]
                }
            },
            layout: street_layout,
            minzoom: 13
        },
        {
            'source-layer': 'streets',
            source: 'versatiles-osm',
            id: 'bridge-street-primary-link:outline',
            type: 'line',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'primary'], ['==', 'link', true]],
            paint: {
                'line-color': street_primary.line_color,
                'line-width': street_primary.line_width
            },
            layout: street_layout,
            minzoom: 13
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-trunk-link:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'trunk'], ['==', 'link', true]],
            paint: {
                'line-color': motorway_outline.line_color,
                'line-width': motorway_outline.line_width
            },
            layout: street_layout,
            minzoom: 13
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-motorway-link:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'motorway'], ['==', 'link', true]],
            paint: {
                'line-color': motorway_outline.line_color,
                'line-width': motorway_link_outline.line_width
            },
            layout: street_layout,
            minzoom: 12
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-tertiary:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'tertiary'], ['!=', 'link', true]],
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
            source: 'versatiles-osm',
            id: 'bridge-street-secondary:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'secondary'], ['!=', 'link', true]],
            paint: {
                'line-color': 'hsl(28,0%,69%)',
                'line-width': {
                    stops: [
                        [11, 2],
                        [14, 5],
                        [16, 8],
                        [18, 30],
                        [19, 68],
                        [20, 138]
                    ]
                },
                'line-opacity': {
                    stops: [
                        [11, 0],
                        [12, 1]
                    ]
                }
            },
            layout: street_layout
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-primary:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'primary'], ['!=', 'link', true]],
            paint: {
                'line-color': street_primary_outline.line_color,
                'line-width': street_primary_outline.line_width
            },
            layout: street_layout
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-trunk:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'trunk'], ['!=', 'link', true]],
            paint: {
                'line-color': motorway_outline.line_color,
                'line-width': motorway_outline.line_width
            },
            layout: street_layout
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-motorway:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'motorway'], ['!=', 'link', true]],
            paint: {
                'line-color': motorway_outline.line_color,
                'line-width': motorway_outline.line_width
            },
            layout: street_layout
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-service',
            type: 'line',
            'source-layer': 'streets',
            filter: [
                'all',
                ['==', 'kind', 'service'],
                ['==', 'bridge', true],
                ['!=', 'service', 'driveway']
            ],
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
            source: 'versatiles-osm',
            id: 'bridge-street-livingstreet',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'living_street'], ['==', 'bridge', true]],
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
            source: 'versatiles-osm',
            id: 'bridge-street-residential',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'residential'], ['==', 'bridge', true]],
            paint: {
                'line-color': street_residential.line_color,
                'line-width': street_residential.line_width,
                'line-opacity': street_residential.line_opacity
            },
            layout: street_layout
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-unclassified',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'unclassified'], ['==', 'bridge', true]],
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
            source: 'versatiles-osm',
            id: 'bridge-street-tertiary-link',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'tertiary'], ['==', 'link', true]],
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
            source: 'versatiles-osm',
            id: 'bridge-street-secondary-link',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'secondary'], ['==', 'link', true]],
            paint: {
                'line-color': 'hsl(48,0%,83%)',
                'line-width': {
                    stops: [
                        [12, 1],
                        [14, 2],
                        [16, 5],
                        [18, 12],
                        [20, 38]
                    ]
                }
            },
            layout: street_layout,
            minzoom: 13
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-primary-link',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'primary'], ['==', 'link', true]],
            paint: {
                'line-color': street_primary.line_color,
                'line-width': street_primary.line_width
            },
            layout: street_layout,
            minzoom: 13
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-trunk-link',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'trunk'], ['==', 'link', true]],
            paint: {
                'line-color': tokens.street_primary,
                'line-width': motorway_link.line_width
            },
            layout: street_layout,
            minzoom: 13
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-motorway-link',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'motorway'], ['==', 'link', true]],
            paint: {
                'line-color': tokens.street_primary,
                'line-width': motorway_link.line_width,
                'line-opacity': motorway.line_opacity
            },
            layout: street_layout,
            minzoom: 12
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-tertiary',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'tertiary'], ['!=', 'link', true]],
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
            source: 'versatiles-osm',
            id: 'bridge-street-secondary',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'secondary'], ['!=', 'link', true]],
            paint: {
                'line-color': tokens.street_secondary,
                'line-width': street_secondary.line_width,
                'line-opacity': {
                    stops: [
                        [11, 0],
                        [12, 1]
                    ]
                }
            },
            layout: street_layout
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-primary',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'primary'], ['!=', 'link', true]],
            paint: {
                'line-color': street_primary.line_color,
                'line-width': street_primary.line_width,
                'line-opacity': {
                    stops: [
                        [8, 0],
                        [9, 1]
                    ]
                }
            },
            layout: street_layout
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-trunk',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'trunk'], ['!=', 'link', true]],
            paint: {
                'line-color': tokens.street_primary,
                'line-width': motorway.line_width,
                'line-opacity': motorway.line_opacity
            },
            layout: street_layout
        },
        {
            source: 'versatiles-osm',
            id: 'bridge-street-motorway',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'motorway'], ['!=', 'link', true]],
            paint: {
                'line-color': tokens.street_primary,
                'line-width': motorway.line_width,
                'line-opacity': motorway.line_opacity
            },
            layout: street_layout
        },
    ]
    const roadTunnels: Layer[] = [
        {
            source: 'versatiles-osm',
            id: 'tunnel-street-service:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: [
                'all',
                ['==', 'kind', 'service'],
                ['==', 'tunnel', true],
                ['!=', 'service', 'driveway']
            ],
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
            source: 'versatiles-osm',
            id: 'tunnel-street-livingstreet:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'living_street'], ['==', 'tunnel', true]],
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
            source: 'versatiles-osm',
            id: 'tunnel-street-residential:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'residential'], ['==', 'tunnel', true]],
            paint: {
                'line-color': street_residential_outline.line_color,
                'line-width': street_residential_outline.line_width,
                'line-opacity': street_residential_outline.line_opacity
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'butt'
            }
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-street-unclassified:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'unclassified'], ['==', 'tunnel', true]],
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
            source: 'versatiles-osm',
            id: 'tunnel-street-tertiary-link:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'tertiary'], ['==', 'link', true]],
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
            source: 'versatiles-osm',
            id: 'tunnel-street-secondary-link:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'secondary'], ['==', 'link', true]],
            paint: {
                'line-color': 'rgb(180,180,180)',
                'line-dasharray': [1, 0.3],
                'line-width': {
                    stops: [
                        [12, 2],
                        [14, 3],
                        [16, 7],
                        [18, 14],
                        [20, 40]
                    ]
                }
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            minzoom: 13
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-street-primary-link:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'primary'], ['==', 'link', true]],
            paint: {
                'line-color': street_primary_outline.line_color,
                'line-dasharray': [1, 0.3],
                'line-width': street_primary_outline.line_width
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'butt'
            },
            minzoom: 13
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-street-trunk-link:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'trunk'], ['==', 'link', true]],
            paint: {
                'line-color': motorway_outline.line_color,
                'line-width': motorway_outline.line_width
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'butt'
            },
            minzoom: 13
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-street-motorway-link:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'motorway'], ['==', 'link', true]],
            paint: {
                'line-color': motorway_outline.line_color,
                'line-width': motorway_link_outline.line_width,
                'line-dasharray': [1, 0.3]
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            minzoom: 12
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-street-tertiary:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'tertiary'], ['!=', 'link', true]],
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
            source: 'versatiles-osm',
            id: 'tunnel-street-secondary:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'secondary'], ['!=', 'link', true]],
            paint: {
                'line-color': 'rgb(180,180,180)',
                'line-dasharray': [1, 0.3],
                'line-width': {
                    stops: [
                        [11, 2],
                        [14, 5],
                        [16, 8],
                        [18, 30],
                        [19, 68],
                        [20, 138]
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
                'line-join': 'round',
                'line-cap': 'round'
            }
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-street-primary:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'primary'], ['!=', 'link', true]],
            paint: {
                'line-color': tokens.street_primary_outline,
                'line-dasharray': [1, 0.3],
                'line-width': {
                    stops: [
                        [8, 0],
                        [9, 1],
                        [10, 4],
                        [14, 6],
                        [16, 12],
                        [18, 36],
                        [19, 74],
                        [20, 144]
                    ]
                }
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            }
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-street-trunk:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'trunk'], ['!=', 'link', true]],
            paint: {
                'line-color': motorway_outline.line_color,
                'line-dasharray': [1, 0.3],
                'line-width': motorway_outline.line_width
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            }
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-street-motorway:outline',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'motorway'], ['!=', 'link', true]],
            paint: {
                'line-color': motorway_outline.line_color,
                'line-width': motorway_outline.line_width,
                'line-dasharray': [1, 0.3]
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            }
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-street-service',
            type: 'line',
            'source-layer': 'streets',
            filter: [
                'all',
                ['==', 'kind', 'service'],
                ['==', 'tunnel', true],
                ['!=', 'service', 'driveway']
            ],
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
            source: 'versatiles-osm',
            id: 'tunnel-street-livingstreet',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'living_street'], ['==', 'tunnel', true]],
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
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-street-residential',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'residential'], ['==', 'tunnel', true]],
            paint: {
                'line-color': street_residential.line_color,
                'line-width': street_residential.line_width,
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
            source: 'versatiles-osm',
            id: 'tunnel-street-unclassified',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'kind', 'unclassified'], ['==', 'tunnel', true]],
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
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-street-tertiary-link',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'tertiary'], ['==', 'link', true]],
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
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-street-secondary-link',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'secondary'], ['==', 'link', true]],
            paint: {
                'line-color': tokens.street_secondary,
                'line-width': street_secondary.line_width
            },
            layout: street_layout,
            minzoom: 13
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-street-primary-link',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'primary'], ['==', 'link', true]],
            paint: {
                'line-color': street_primary.line_color,
                'line-width': street_primary.line_width
            },
            layout: street_layout,
            minzoom: 13
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-street-trunk-link',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'trunk'], ['==', 'link', true]],
            paint: {
                'line-color': tokens.street_primary,
                'line-width': motorway_link.line_width
            },
            layout: street_layout,
            minzoom: 13
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-street-motorway-link',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'motorway'], ['==', 'link', true]],
            paint: {
                'line-color': tokens.street_primary,
                'line-width': motorway_link.line_width,
                'line-opacity': motorway.line_opacity
            },
            layout: street_layout,
            minzoom: 12
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-street-tertiary',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'tertiary'], ['!=', 'link', true]],
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
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-street-secondary',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'secondary'], ['!=', 'link', true]],
            paint: {
                'line-color': 'rgb(217,217,217)',
                'line-width': {
                    stops: [
                        [11, 1],
                        [14, 4],
                        [16, 6],
                        [18, 28],
                        [19, 64],
                        [20, 130]
                    ]
                },
                'line-opacity': {
                    stops: [
                        [11, 0],
                        [12, 1]
                    ]
                }
            },
            layout: street_layout
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-street-primary',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'primary'], ['!=', 'link', true]],
            paint: {
                'line-color': street_primary.line_color,
                'line-width': street_primary.line_width,
                'line-opacity': {
                    stops: [
                        [8, 0],
                        [9, 1]
                    ]
                }
            },
            layout: street_layout
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-street-trunk',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'trunk'], ['!=', 'link', true]],
            paint: {
                'line-color': tokens.street_primary,
                'line-width': motorway.line_width,
                'line-opacity': {
                    stops: [
                        [7, 0],
                        [8, 0.75]
                    ]
                }
            },
            layout: street_layout
        },
        {
            source: 'versatiles-osm',
            id: 'tunnel-street-motorway',
            type: 'line',
            'source-layer': 'streets',
            filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'motorway'], ['!=', 'link', true]],
            paint: {
                'line-color': tokens.street_primary,
                'line-width': motorway.line_width,
                'line-opacity': motorway.line_opacity
            },
            layout: street_layout
        },
    ]

    const roadSurface: Layer[] = [{
        source: 'versatiles-osm',
        id: 'street-service:outline', // See: https://wiki.openstreetmap.org/wiki/Tag:highway%3Dservice
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['==', 'kind', 'service'],
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true],
            ['!=', 'service', 'driveway']
        ],
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
        source: 'versatiles-osm',
        id: 'street-livingstreet:outline',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['==', 'kind', 'living_street'],
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true]
        ],
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
        source: 'versatiles-osm',
        id: 'street-residential:outline',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['==', 'kind', 'residential'],
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true]
        ],
        paint: {
            'line-color': street_residential_outline.line_color,
            'line-width': street_residential_outline.line_width,
            'line-opacity': street_residential_outline.line_opacity
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        }
    },
    {
        source: 'versatiles-osm',
        id: 'street-unclassified:outline',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['==', 'kind', 'unclassified'],
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true]
        ],
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
        source: 'versatiles-osm',
        id: 'street-tertiary-link:outline',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true],
            ['in', 'kind', 'tertiary'],
            ['==', 'link', true]
        ],
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
        source: 'versatiles-osm',
        id: 'street-secondary-link:outline',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true],
            ['in', 'kind', 'secondary'],
            ['==', 'link', true]
        ],
        paint: {
            'line-color': tokens.street_secondary_outline,
            'line-width': street_secondary_outline.line_width
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'butt'
        },
        minzoom: 13
    },
    {
        source: 'versatiles-osm',
        id: 'street-primary-link:outline',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true],
            ['in', 'kind', 'primary'],
            ['==', 'link', true]
        ],
        paint: {
            'line-color': tokens.street_primary_outline,
            'line-width': street_primary_outline.line_width
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        minzoom: 13
    },
    {
        source: 'versatiles-osm',
        id: 'street-trunk-link:outline',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true],
            ['in', 'kind', 'trunk'],
            ['==', 'link', true]
        ],
        paint: {
            'line-color': motorway_outline.line_color,
            'line-width': motorway_link_outline.line_width
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'butt'
        },
        minzoom: 13
    },
    {
        source: 'versatiles-osm',
        id: 'street-motorway-link:outline',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true],
            ['in', 'kind', 'motorway'],
            ['==', 'link', true]
        ],
        paint: {
            'line-color': motorway_outline.line_color,
            'line-width': motorway_link_outline.line_width
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'butt'
        },
        minzoom: 12
    },
    {
        source: 'versatiles-osm',
        id: 'street-tertiary:outline',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true],
            ['in', 'kind', 'tertiary'],
            ['!=', 'link', true]
        ],
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
        source: 'versatiles-osm',
        id: 'street-secondary:outline',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true],
            ['in', 'kind', 'secondary'],
            ['!=', 'link', true]
        ],
        paint: {
            'line-color': 'hsl(28,0%,69%)',
            'line-width': {
                stops: [
                    [11, 2],
                    [14, 5],
                    [16, 8],
                    [18, 30],
                    [19, 68],
                    [20, 138]
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
            'line-join': 'round',
            'line-cap': 'round'
        }
    },
    {
        source: 'versatiles-osm',
        id: 'street-primary:outline',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true],
            ['in', 'kind', 'primary'],
            ['!=', 'link', true]
        ],
        paint: {
            'line-color': street_primary_outline.line_color,
            'line-width': street_primary_outline.line_width
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'butt'
        }
    },
    {
        source: 'versatiles-osm',
        id: 'street-trunk:outline',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true],
            ['in', 'kind', 'trunk'],
            ['!=', 'link', true]
        ],
        paint: {
            'line-color': motorway_outline.line_color,
            'line-width': motorway_outline.line_width
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'butt'
        }
    },
    {
        source: 'versatiles-osm',
        id: 'street-motorway:outline',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true],
            ['in', 'kind', 'motorway'],
            ['!=', 'link', true]
        ],
        paint: {
            'line-color': motorway_outline.line_color,
            'line-width': motorway_outline.line_width
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'butt'
        }
    },
    {
        source: 'versatiles-osm',
        id: 'street-service',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['==', 'kind', 'service'],
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true],
            ['!=', 'service', 'driveway']
        ],
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
        source: 'versatiles-osm',
        id: 'street-livingstreet',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['==', 'kind', 'living_street'],
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true]
        ],
        paint: {
            'line-color': street_residential.line_color,
            'line-width': street_residential.line_width,
            'line-opacity': street_residential.line_opacity
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        }
    },
    {
        source: 'versatiles-osm',
        id: 'street-residential',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['==', 'kind', 'residential'],
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true]
        ],
        paint: {
            'line-color': street_residential.line_color,
            'line-width': street_residential.line_width,
            'line-opacity': street_residential.line_opacity
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        }
    },
    {
        source: 'versatiles-osm',
        id: 'street-unclassified',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['==', 'kind', 'unclassified'],
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true]
        ],
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
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        }
    }, {
        source: 'versatiles-osm',
        id: 'street-tertiary-link',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true],
            ['in', 'kind', 'tertiary'],
            ['==', 'link', true]
        ],
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
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        }
    },
    {
        source: 'versatiles-osm',
        id: 'street-secondary-link',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true],
            ['in', 'kind', 'secondary'],
            ['==', 'link', true]
        ],
        paint: {
            'line-color': tokens.street_secondary,
            'line-width': street_secondary.line_width
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        minzoom: 13
    },
    {
        source: 'versatiles-osm',
        id: 'street-primary-link',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true],
            ['in', 'kind', 'primary'],
            ['==', 'link', true]
        ],
        paint: {
            'line-color': street_primary.line_color,
            'line-width': street_primary.line_width
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        minzoom: 13
    },
    {
        source: 'versatiles-osm',
        id: 'street-trunk-link',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true],
            ['in', 'kind', 'trunk'],
            ['==', 'link', true]
        ],
        paint: {
            'line-color': tokens.street_primary,
            'line-width': motorway_link.line_width
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        minzoom: 13
    },
    {
        source: 'versatiles-osm',
        id: 'street-motorway-link',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true],
            ['in', 'kind', 'motorway'],
            ['==', 'link', true]
        ],
        paint: {
            'line-color': tokens.street_primary,
            'line-width': motorway_link.line_width,
            'line-opacity': motorway.line_opacity
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        minzoom: 12
    },
    {
        source: 'versatiles-osm',
        id: 'street-tertiary',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true],
            ['in', 'kind', 'tertiary'],
            ['!=', 'link', true]
        ],
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
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        }
    },
    {
        source: 'versatiles-osm',
        id: 'street-secondary',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true],
            ['in', 'kind', 'secondary'],
            ['!=', 'link', true]
        ],
        paint: {
            'line-color': tokens.street_secondary,
            'line-width': street_secondary.line_width,
            'line-opacity': {
                stops: [
                    [9, 0],
                    [10, 1]
                ]
            }
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        }
    },
    {
        source: 'versatiles-osm',
        id: 'street-primary',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true],
            ['in', 'kind', 'primary'],
            ['!=', 'link', true]
        ],
        paint: {
            'line-color': street_primary.line_color,
            'line-width': street_primary.line_width,
            'line-opacity': {
                stops: [
                    [8, 0],
                    [9, 1]
                ]
            }
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        }
    },
    {
        source: 'versatiles-osm',
        id: 'street-trunk',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true],
            ['in', 'kind', 'trunk'],
            ['!=', 'link', true]
        ],
        paint: {
            'line-color': motorway.line_color,
            'line-width': motorway.line_width,
            'line-opacity': motorway.line_opacity
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        }
    },
    {
        source: 'versatiles-osm',
        id: 'street-motorway',
        type: 'line',
        'source-layer': 'streets',
        filter: [
            'all',
            ['!=', 'bridge', true],
            ['!=', 'tunnel', true],
            ['in', 'kind', 'motorway'],
            ['!=', 'link', true]
        ],
        paint: {
            'line-color': tokens.street_primary,
            'line-width': motorway.line_width,
            'line-opacity': motorway.line_opacity
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        }
    },]

    return { roadLabels, roadBridges, roadSurface, roadTunnels }
}