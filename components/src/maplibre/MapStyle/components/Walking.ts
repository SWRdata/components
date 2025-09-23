import { type Layer } from '../../types';
import type { SymbolLayerSpecification } from 'maplibre-gl';

const street_layout = {
	'line-join': 'round',
	'line-cap': 'butt'
};

export default function makeWalking(tokens): any {
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

	const walkingTunnels: Layer[] = [
		{
			id: 'tunnel-street-pedestrian-zone',
			type: 'fill',
			'source-layer': 'street_polygons',
			filter: ['all', ['==', 'tunnel', true], ['==', 'kind', 'pedestrian']],
			paint: {
				'fill-color': tokens.street_tertiary,
				'fill-opacity': {
					stops: [
						[12, 0],
						[13, 1]
					]
				}
			}
		},
		{
			id: 'tunnel-way-footway:case',
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
				'line-color': tokens.street_tertiary_case
			},
			minzoom: 15
		},
		{
			id: 'tunnel-way-steps:case',
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
				'line-color': tokens.street_tertiary_case
			},
			minzoom: 15
		},
		{
			id: 'tunnel-way-path:case',
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
				'line-color': tokens.street_tertiary_case
			},
			minzoom: 15
		},
		{
			id: 'tunnel-way-cycleway:case',
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
				'line-color': tokens.street_tertiary_case
			},
			minzoom: 15
		},
		{
			// See: https://wiki.openstreetmap.org/wiki/Tag:highway%3Dtrack
			id: 'tunnel-street-track:case',
			type: 'line',
			'source-layer': 'streets',
			filter: ['all', ['==', 'kind', 'track'], ['==', 'tunnel', true]],
			paint: {
				'line-color': tokens.street_secondary_case,
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
			id: 'tunnel-street-pedestrian:case',
			type: 'line',
			'source-layer': 'streets',
			filter: ['all', ['==', 'kind', 'pedestrian'], ['==', 'tunnel', true]],
			paint: {
				'line-color': tokens.street_tertiary_case,
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
				'line-color': tokens.street_tertiary,
				'line-dasharray': [1, 0.2]
			},
			minzoom: 15
		},
		{
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
				'line-color': tokens.street_tertiary,
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
				'line-color': tokens.street_tertiary,
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
				'line-color': tokens.street_tertiary,
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
				'line-color': tokens.street_secondary,
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
						[13, 1]
					]
				}
			},
			layout: street_layout
		},
		{
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
				'line-color': tokens.street_tertiary
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
				'line-color': tokens.street_tertiary
			},
			layout: {
				'line-join': 'round',
				'line-cap': 'round'
			}
		}
	].map((el) => {
		return { source: 'versatiles-osm', ...el } as Layer;
	});

	const walkingSurface: Layer[] = [
		{
			id: 'way-footway:case',
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
				'line-color': tokens.street_tertiary
			},
			minzoom: 15
		},
		{
			id: 'way-steps:case',
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
				'line-color': tokens.street_tertiary_case
			}
		},
		{
			id: 'way-path:case',
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
				'line-color': tokens.street_tertiary_case
			}
		},
		{
			id: 'way-cycleway:case',
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
				'line-color': tokens.street_tertiary
			},
			minzoom: 15
		},
		{
			id: 'street-track:case',
			type: 'line',
			'source-layer': 'streets',
			filter: ['all', ['==', 'kind', 'track'], ['!=', 'bridge', true], ['!=', 'tunnel', true]],
			paint: {
				'line-color': tokens.street_secondary_case,
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
			id: 'street-pedestrian:case',
			type: 'line',
			'source-layer': 'streets',
			filter: ['all', ['==', 'kind', 'pedestrian'], ['!=', 'bridge', true], ['!=', 'tunnel', true]],
			paint: {
				'line-color': tokens.street_tertiary_case,
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
						[14, 0],
						[15, 1]
					]
				}
			},
			layout: street_layout
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
				'line-color': tokens.street_tertiary
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
				'line-color': tokens.street_tertiary
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
				'line-color': tokens.street_tertiary
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
				'line-color': tokens.street_tertiary
			},
			minzoom: 15
		},
		{
			id: 'street-track',
			type: 'line',
			'source-layer': 'streets',
			filter: ['all', ['==', 'kind', 'track'], ['!=', 'bridge', true], ['!=', 'tunnel', true]],
			paint: {
				'line-color': tokens.street_tertiary,
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
						[13, 0],
						[14, 1]
					]
				}
			},
			layout: street_layout
		}
	].map((el) => {
		return { source: 'versatiles-osm', ...el } as Layer;
	});

	const walkingBridges: Layer[] = [
		{
			id: 'bridge-street-pedestrian-zone',
			type: 'fill',
			'source-layer': 'street_polygons',
			filter: ['all', ['==', 'bridge', true], ['==', 'kind', 'pedestrian']],
			paint: {
				'fill-color': tokens.street_tertiary,
				'fill-opacity': {
					stops: [
						[12, 0],
						[13, 1]
					]
				}
			}
		},
		{
			id: 'bridge-way-footway:case',
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
				'line-color': tokens.street_tertiary_case
			}
		},
		{
			id: 'bridge-way-steps:case',
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
				'line-color': tokens.street_tertiary_case
			}
		},
		{
			id: 'bridge-way-path:case',
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
				'line-color': tokens.street_tertiary_case
			},
			minzoom: 15
		},
		{
			id: 'bridge-way-cycleway:case',
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
				'line-color': tokens.street_tertiary_case
			},
			minzoom: 15
		},
		{
			id: 'bridge-street-track:case',
			filter: ['all', ['==', 'kind', 'track'], ['==', 'bridge', true]],
			paint: {
				'line-color': tokens.street_tertiary_case,
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
			id: 'bridge-street-pedestrian:case',
			filter: ['all', ['==', 'kind', 'pedestrian'], ['==', 'bridge', true]],
			paint: {
				'line-color': tokens.street_tertiary_case,
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
			filter: ['all', ['==', 'kind', 'pedestrian'], ['==', 'bridge', true]],
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
						[13, 1]
					]
				}
			},
			layout: street_layout
		},
		{
			id: 'bridge-street-track-bicycle',
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
			filter: [
				'all',
				['==', 'kind', 'service'],
				['==', 'bicycle', 'designated'],
				['==', 'bridge', true],
				['!=', 'service', 'driveway']
			],
			paint: {
				'line-color': tokens.street_tertiary
			},
			layout: street_layout
		},
		{
			id: 'bridge-street-livingstreet-bicycle',
			filter: [
				'all',
				['==', 'kind', 'living_street'],
				['==', 'bicycle', 'designated'],
				['==', 'bridge', true]
			],
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
						[13, 1]
					]
				}
			},
			layout: street_layout
		},
		{
			id: 'bridge-street-residential-bicycle',
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
			filter: [
				'all',
				['==', 'kind', 'unclassified'],
				['==', 'bicycle', 'designated'],
				['==', 'bridge', true]
			],
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
						[13, 1]
					]
				}
			},
			layout: street_layout
		}
	].map((el) => {
		return {
			type: 'line',
			'source-layer': 'streets',
			source: 'versatiles-osm',
			...el
		} as Layer;
	});

	const walkingLabels: SymbolLayerSpecification[] = [
		{
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
				'text-color': tokens.label_secondary,
				'text-halo-color': tokens.background,
				'text-halo-width': 2,
				'text-halo-blur': 1
			}
		}
	];

	return { walkingTunnels, walkingSurface, walkingBridges, walkingLabels };
}
