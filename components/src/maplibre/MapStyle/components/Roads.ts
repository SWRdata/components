import { type Layer } from '../../types';
import type { SymbolLayerSpecification } from 'maplibre-gl';

const street_layout = {
	'line-join': 'round',
	'line-cap': 'round'
};
const case_layout = {
	'line-join': 'round',
	'line-cap': 'butt'
};

export default function makeRoads(tokens) {
	const motorway = {
		line_color: tokens.street_primary,
		line_width: {
			stops: [
				[6, 1],
				[7, 1.5],
				[11, 2],
				[12, 3],
				[13, 5],
				[14, 9]
			]
		},
		line_opacity: {
			stops: [
				[4, 0],
				[5, 0.8],
				[11, 0.8],
				[12, 1]
			]
		}
	};

	const motorway_case = {
		line_color: tokens.street_primary_case,
		line_width: {
			stops: [
				[10, 0],
				[11, 2],
				[12, 5],
				[13, 7],
				[14, 11]
			]
		}
	};

	const motorway_link = {
		paint: {
			'line-color': tokens.street_primary,
			'line-width': motorway.line_width,
			'line-opacity': {
				stops: [
					[6, 0],
					[7, 1]
				]
			}
		},
		layout: street_layout
	};

	const motorway_link_case = {
		paint: {
			'line-color': tokens.street_primary_case,
			'line-width': motorway_case.line_width
		},
		layout: case_layout
	};

	const street_primary = {
		paint: {
			'line-color': tokens.street_primary,
			'line-width': motorway.line_width,
			'line-opacity': {
				stops: [
					[8, 0],
					[9, 1]
				]
			}
		},
		layout: street_layout
	};

	const street_primary_case = {
		paint: {
			'line-color': tokens.street_primary_case,
			'line-width': motorway_case.line_width,
			'line-opacity': {
				stops: [
					[8, 0],
					[9, 1]
				]
			}
		},
		layout: case_layout
	};

	const street_secondary = {
		line_color: tokens.street_secondary,
		line_width: {
			stops: [
				[12, 1],
				[14, 2],
				[16, 8],
				[18, 28],
				[19, 64],
				[20, 130]
			]
		}
	};
	const street_secondary_case = {
		paint: {
			'line-color': tokens.street_secondary_case,
			'line-width': {
				stops: [
					[12, 0],
					[14, 3],
					[16, 11],
					[18, 30],
					[19, 66],
					[20, 40]
				]
			},
			'line-opacity': {
				stops: [
					[11, 0],
					[12, 1]
				]
			}
		},
		layout: case_layout
	};
	const street_tertiary_case = {
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
		layout: case_layout
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

	const street_residential_case = {
		line_color: tokens.street_tertiary_case,
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

	const roadLabels: SymbolLayerSpecification[] = [
		{
			id: 'label-street-misc',
			filter: ['in', 'kind', 'residential', 'livingstreet', 'unclassified'],
			minzoom: 15,
			layout: {
				'text-size': {
					stops: [
						[12, 10],
						[15, 13]
					]
				}
			}
		},
		{
			id: 'label-street-tertiary',
			filter: ['==', 'kind', 'tertiary'],
			minzoom: 15,
			layout: {
				'text-size': {
					stops: [
						[12, 10],
						[15, 13]
					]
				}
			}
		},
		{
			id: 'label-street-secondary',
			filter: ['==', 'kind', 'secondary'],
			minzoom: 14,
			layout: {
				'text-letter-spacing': 0.025,
				'text-size': {
					stops: [
						[12, 10],
						[15, 14]
					]
				}
			}
		},
		{
			id: 'label-street-primary',
			filter: ['==', 'kind', 'primary'],
			minzoom: 14,
			layout: {
				'text-letter-spacing': 0.025,
				'text-size': {
					stops: [
						[12, 10],
						[15, 14]
					]
				}
			},
			paint: {
				'text-color': tokens.label_primary
			}
		},
		{
			id: 'label-street-trunk',
			filter: ['==', 'kind', 'trunk'],
			minzoom: 13,
			layout: {
				'text-size': {
					stops: [
						[12, 10],
						[15, 13]
					]
				}
			},
			paint: {
				'text-color': tokens.label_primary
			}
		}
	].map((el) => {
		return {
			type: 'symbol',
			source: 'versatiles-osm',
			'source-layer': 'street_labels',
			...el,
			layout: {
				'text-field': '{name_de}',
				'text-font': tokens.sans_regular,
				'symbol-placement': 'line',
				'text-anchor': 'center',

				...el.layout
			},
			paint: {
				'text-color': tokens.label_secondary,
				'text-halo-color': tokens.background,
				'text-halo-width': 1.5,
				...el.paint
			}
		} as SymbolLayerSpecification;
	});

	const roadBridges: Layer[] = [
		{
			id: 'bridge-street-service:case',
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
			layout: case_layout
		},
		{
			id: 'bridge-street-livingstreet:case',
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
			id: 'bridge-street-residential:case',
			filter: ['all', ['==', 'kind', 'residential'], ['==', 'bridge', true]],
			paint: {
				'line-color': street_residential_case.line_color,
				'line-width': street_residential_case.line_width,
				'line-opacity': street_residential_case.line_opacity
			},
			layout: case_layout
		},
		{
			id: 'bridge-street-unclassified:case',
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
			layout: case_layout
		},
		{
			id: 'bridge-street-tertiary-link:case',
			filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'tertiary'], ['==', 'link', true]],
			...street_tertiary_case
		},
		{
			id: 'bridge-street-secondary-link:case',
			filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'secondary'], ['==', 'link', true]],
			minzoom: 13,
			...street_secondary_case
		},
		{
			...street_primary_case,
			id: 'bridge-street-primary-link:case',
			filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'primary'], ['==', 'link', true]],
			minzoom: 13
		},
		{
			...motorway_link_case,
			id: 'bridge-street-trunk-link:case',
			filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'trunk'], ['==', 'link', true]],
			minzoom: 13
		},
		{
			...motorway_link_case,
			id: 'bridge-street-motorway-link:case',
			filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'motorway'], ['==', 'link', true]],
			minzoom: 12
		},
		{
			id: 'bridge-street-tertiary:case',
			filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'tertiary'], ['!=', 'link', true]],
			...street_tertiary_case
		},
		{
			id: 'bridge-street-secondary:case',
			filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'secondary'], ['!=', 'link', true]],
			...street_secondary_case
		},
		{
			...street_primary_case,
			id: 'bridge-street-primary:case',
			filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'primary'], ['!=', 'link', true]]
		},
		{
			id: 'bridge-street-trunk:case',
			filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'trunk'], ['!=', 'link', true]],
			paint: {
				'line-color': motorway_case.line_color,
				'line-width': motorway_case.line_width
			},
			layout: case_layout
		},
		{
			id: 'bridge-street-motorway:case',
			filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'motorway'], ['!=', 'link', true]],
			paint: {
				'line-color': motorway_case.line_color,
				'line-width': motorway_case.line_width
			},
			layout: case_layout
		},
		{
			id: 'bridge-street-service',
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
			id: 'bridge-street-livingstreet',
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
			id: 'bridge-street-residential',
			filter: ['all', ['==', 'kind', 'residential'], ['==', 'bridge', true]],
			paint: {
				'line-color': street_residential.line_color,
				'line-width': street_residential.line_width,
				'line-opacity': street_residential.line_opacity
			},
			layout: street_layout
		},
		{
			id: 'bridge-street-unclassified',
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
			id: 'bridge-street-tertiary-link',
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
			id: 'bridge-street-secondary-link',
			filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'secondary'], ['==', 'link', true]],
			paint: {
				'line-color': tokens.street_secondary,
				'line-width': street_secondary.line_width
			},
			layout: street_layout,
			minzoom: 13
		},
		{
			...street_primary_case,
			id: 'bridge-street-primary-link',
			filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'primary'], ['==', 'link', true]],
			minzoom: 13
		},
		{
			...street_primary,
			id: 'bridge-street-trunk-link',
			filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'trunk'], ['==', 'link', true]],
			minzoom: 13
		},
		{
			...motorway_link,
			id: 'bridge-street-motorway-link',
			filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'motorway'], ['==', 'link', true]],
			minzoom: 12
		},
		{
			id: 'bridge-street-tertiary',
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
			id: 'bridge-street-secondary',
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
			id: 'bridge-street-primary',
			filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'primary'], ['!=', 'link', true]],
			...street_primary
		},
		{
			id: 'bridge-street-trunk',
			filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'trunk'], ['!=', 'link', true]],
			...street_primary
		},
		{
			id: 'bridge-street-motorway',
			filter: ['all', ['==', 'bridge', true], ['in', 'kind', 'motorway'], ['!=', 'link', true]],
			paint: {
				'line-color': tokens.street_primary,
				'line-width': motorway.line_width,
				'line-opacity': motorway.line_opacity
			},
			layout: street_layout
		}
	].map((el) => {
		return { source: 'versatiles-osm', type: 'line', 'source-layer': 'streets', ...el } as Layer;
	});

	const roadTunnels: Layer[] = [
		{
			id: 'tunnel-street-service:case',
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
			layout: case_layout
		},
		{
			id: 'tunnel-street-livingstreet:case',
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
			layout: case_layout
		},
		{
			id: 'tunnel-street-residential:case',
			filter: ['all', ['==', 'kind', 'residential'], ['==', 'tunnel', true]],
			paint: {
				'line-color': street_residential_case.line_color,
				'line-width': street_residential_case.line_width,
				'line-opacity': street_residential_case.line_opacity
			},
			layout: case_layout
		},
		{
			id: 'tunnel-street-unclassified:case',
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
			layout: case_layout
		},
		{
			id: 'tunnel-street-tertiary-link:case',
			filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'tertiary'], ['==', 'link', true]],
			...street_tertiary_case
		},
		{
			id: 'tunnel-street-secondary-link:case',
			type: 'line',
			filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'secondary'], ['==', 'link', true]],
			paint: {
				...street_secondary_case.paint,
				'line-dasharray': [1, 0.3]
			},
			layout: street_secondary_case.layout,
			minzoom: 13
		},
		{
			...street_primary,
			id: 'tunnel-street-primary-link:case',
			filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'primary'], ['==', 'link', true]],
			paint: {
				...street_primary.paint,
				'line-dasharray': [1, 0.3]
			},
			minzoom: 13
		},
		{
			id: 'tunnel-street-trunk-link:case',
			filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'trunk'], ['==', 'link', true]],
			paint: {
				'line-color': motorway_case.line_color,
				'line-width': motorway_case.line_width
			},
			layout: case_layout,
			minzoom: 13
		},
		{
			...motorway_link_case,
			id: 'tunnel-street-motorway-link:case',
			filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'motorway'], ['==', 'link', true]],
			paint: {
				...motorway_link_case.paint,
				'line-dasharray': [1, 0.3]
			},
			minzoom: 12
		},
		{
			id: 'tunnel-street-tertiary:case',
			filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'tertiary'], ['!=', 'link', true]],
			...street_tertiary_case
		},
		{
			id: 'tunnel-street-secondary:case',
			filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'secondary'], ['!=', 'link', true]],
			...street_secondary_case
		},
		{
			...street_primary_case,
			id: 'tunnel-street-primary:case',
			filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'primary'], ['!=', 'link', true]],
			paint: {
				...street_primary_case.paint,
				'line-dasharray': [1, 0.3]
			}
		},
		{
			id: 'tunnel-street-trunk:case',
			filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'trunk'], ['!=', 'link', true]],
			paint: {
				'line-color': motorway_case.line_color,
				'line-dasharray': [1, 0.3],
				'line-width': motorway_case.line_width
			},
			layout: case_layout
		},
		{
			id: 'tunnel-street-motorway:case',
			filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'motorway'], ['!=', 'link', true]],
			paint: {
				'line-color': motorway_case.line_color,
				'line-width': motorway_case.line_width,
				'line-dasharray': [1, 0.3]
			},
			layout: case_layout
		},
		{
			id: 'tunnel-street-service',
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
			layout: street_layout
		},
		{
			id: 'tunnel-street-livingstreet',
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
			layout: street_layout
		},
		{
			id: 'tunnel-street-residential',
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
			layout: street_layout
		},
		{
			id: 'tunnel-street-unclassified',
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
			layout: street_layout
		},
		{
			id: 'tunnel-street-tertiary-link',
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
			layout: street_layout
		},
		{
			id: 'tunnel-street-secondary-link',
			filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'secondary'], ['==', 'link', true]],
			paint: {
				'line-color': tokens.street_secondary,
				'line-width': street_secondary.line_width
			},
			layout: street_layout,
			minzoom: 13
		},
		{
			...street_primary,
			id: 'tunnel-street-primary-link',
			filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'primary'], ['==', 'link', true]],
			minzoom: 13
		},
		{
			...motorway_link,
			id: 'tunnel-street-trunk-link',
			filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'trunk'], ['==', 'link', true]],
			minzoom: 13
		},
		{
			...motorway_link,
			id: 'tunnel-street-motorway-link',
			filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'motorway'], ['==', 'link', true]],
			paint: {
				...motorway_link.paint
			},
			minzoom: 12
		},
		{
			id: 'tunnel-street-tertiary',
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
			layout: street_layout
		},
		{
			id: 'tunnel-street-secondary',
			filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'secondary'], ['!=', 'link', true]],
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
			...street_primary,
			id: 'tunnel-street-primary',
			filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'primary'], ['!=', 'link', true]]
		},
		{
			id: 'tunnel-street-trunk',
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
			id: 'tunnel-street-motorway',
			filter: ['all', ['==', 'tunnel', true], ['in', 'kind', 'motorway'], ['!=', 'link', true]],
			paint: {
				'line-color': tokens.street_primary,
				'line-width': motorway.line_width,
				'line-opacity': motorway.line_opacity
			},
			layout: street_layout
		}
	].map((el) => {
		return { source: 'versatiles-osm', type: 'line', 'source-layer': 'streets', ...el } as Layer;
	});

	const roadSurface: Layer[] = [
		{
			id: 'street-service:case', // See: https://wiki.openstreetmap.org/wiki/Tag:highway%3Dservice
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
			layout: case_layout
		},
		{
			id: 'street-livingstreet:case',
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
						[13, 0],
						[14, 1]
					]
				}
			},
			layout: case_layout
		},
		{
			id: 'street-residential:case',
			filter: [
				'all',
				['==', 'kind', 'residential'],
				['!=', 'bridge', true],
				['!=', 'tunnel', true]
			],
			paint: {
				'line-color': street_residential_case.line_color,
				'line-width': street_residential_case.line_width,
				'line-opacity': street_residential_case.line_opacity
			},
			layout: case_layout
		},
		{
			id: 'street-unclassified:case',
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
						[13, 0],
						[14, 1]
					]
				}
			},
			layout: case_layout
		},
		{
			id: 'street-tertiary-link:case',
			filter: [
				'all',
				['!=', 'bridge', true],
				['!=', 'tunnel', true],
				['in', 'kind', 'tertiary'],
				['==', 'link', true]
			],
			...street_tertiary_case
		},
		{
			id: 'street-secondary-link:case',
			filter: [
				'all',
				['!=', 'bridge', true],
				['!=', 'tunnel', true],
				['in', 'kind', 'secondary'],
				['==', 'link', true]
			],
			...street_secondary_case
		},
		{
			...street_primary_case,
			id: 'street-primary-link:case',
			filter: [
				'all',
				['!=', 'bridge', true],
				['!=', 'tunnel', true],
				['in', 'kind', 'primary'],
				['==', 'link', true]
			],
			minzoom: 13
		},
		{
			...motorway_link_case,
			id: 'street-trunk-link:case',
			filter: [
				'all',
				['!=', 'bridge', true],
				['!=', 'tunnel', true],
				['in', 'kind', 'trunk'],
				['==', 'link', true]
			],
			minzoom: 13
		},
		{
			...motorway_link_case,
			id: 'street-motorway-link:case',
			filter: [
				'all',
				['!=', 'bridge', true],
				['!=', 'tunnel', true],
				['in', 'kind', 'motorway'],
				['==', 'link', true]
			],
			minzoom: 12
		},
		{
			id: 'street-tertiary:case',
			filter: [
				'all',
				['!=', 'bridge', true],
				['!=', 'tunnel', true],
				['in', 'kind', 'tertiary'],
				['!=', 'link', true]
			],
			...street_tertiary_case
		},
		{
			id: 'street-secondary:case',
			filter: [
				'all',
				['!=', 'bridge', true],
				['!=', 'tunnel', true],
				['in', 'kind', 'secondary'],
				['!=', 'link', true]
			],
			...street_secondary_case
		},
		{
			...street_primary_case,
			id: 'street-primary:case',
			filter: [
				'all',
				['!=', 'bridge', true],
				['!=', 'tunnel', true],
				['in', 'kind', 'primary'],
				['!=', 'link', true]
			]
		},
		{
			id: 'street-trunk:case',
			filter: [
				'all',
				['!=', 'bridge', true],
				['!=', 'tunnel', true],
				['in', 'kind', 'trunk'],
				['!=', 'link', true]
			],
			paint: {
				'line-color': motorway_case.line_color,
				'line-width': motorway_case.line_width
			},
			layout: case_layout
		},
		{
			id: 'street-motorway:case',
			filter: [
				'all',
				['!=', 'bridge', true],
				['!=', 'tunnel', true],
				['in', 'kind', 'motorway'],
				['!=', 'link', true]
			],
			paint: {
				'line-color': motorway_case.line_color,
				'line-width': motorway_case.line_width
			},
			layout: case_layout
		},
		{
			id: 'street-service',
			filter: [
				'all',
				['==', 'kind', 'service'],
				['!=', 'bridge', true],
				['!=', 'tunnel', true],
				['!=', 'service', 'driveway']
			],
			paint: {
				'line-color': street_residential.line_color,
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
			id: 'street-livingstreet',
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
			layout: street_layout
		},
		{
			id: 'street-residential',
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
			layout: street_layout
		},
		{
			id: 'street-unclassified',
			filter: [
				'all',
				['==', 'kind', 'unclassified'],
				['!=', 'bridge', true],
				['!=', 'tunnel', true]
			],
			paint: {
				'line-color': street_secondary.line_color,
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
			id: 'street-tertiary-link',
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
			layout: street_layout
		},
		{
			id: 'street-secondary-link',
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
			layout: street_layout,
			minzoom: 13
		},
		{
			...street_primary,
			id: 'street-primary-link',
			filter: [
				'all',
				['!=', 'bridge', true],
				['!=', 'tunnel', true],
				['in', 'kind', 'primary'],
				['==', 'link', true]
			],
			minzoom: 13
		},
		{
			...motorway_link,
			id: 'street-trunk-link',
			filter: [
				'all',
				['!=', 'bridge', true],
				['!=', 'tunnel', true],
				['in', 'kind', 'trunk'],
				['==', 'link', true]
			],
			minzoom: 13
		},
		{
			...motorway_link,
			id: 'street-motorway-link',
			filter: [
				'all',
				['!=', 'bridge', true],
				['!=', 'tunnel', true],
				['in', 'kind', 'motorway'],
				['==', 'link', true]
			],
			minzoom: 12
		},
		{
			id: 'street-tertiary',
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
			layout: street_layout
		},
		{
			id: 'street-secondary',
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
			layout: street_layout
		},
		{
			...street_primary,
			id: 'street-primary',
			filter: [
				'all',
				['!=', 'bridge', true],
				['!=', 'tunnel', true],
				['in', 'kind', 'primary'],
				['!=', 'link', true]
			]
		},
		{
			id: 'street-trunk',
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
			layout: street_layout
		},
		{
			id: 'street-motorway',
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
			layout: street_layout
		}
	].map((el) => {
		return { source: 'versatiles-osm', type: 'line', 'source-layer': 'streets', ...el } as Layer;
	});

	return { roadLabels, roadBridges, roadSurface, roadTunnels };
}
