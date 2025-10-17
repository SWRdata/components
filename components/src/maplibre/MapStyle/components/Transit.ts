import type { Layer } from '../../types';

export default function makeTransit(tokens) {
	const rail = {
		line_color: tokens.rail,
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

	const rail_case = {
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
	const airports = [
		{
			id: 'airport-area',
			type: 'fill',
			'source-layer': 'street_polygons',
			filter: ['in', 'kind', 'runway', 'taxiway'],
			paint: {
				'fill-color': tokens.street_tertiary,
				'fill-opacity': 0.5
			}
		},

		{
			id: 'airport-taxiway',
			filter: ['==', 'kind', 'taxiway'],
			paint: {
				'line-color': tokens.street_tertiary,
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
			id: 'airport-runway',
			filter: ['==', 'kind', 'runway'],
			paint: {
				'line-color': tokens.street_tertiary,
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
		}
	].map((el) => {
		return {
			type: 'line',
			'source-layer': 'streets',
			source: 'versatiles-osm',
			...el
		} as Layer;
	});

	const transitBridges = [
		{
			id: 'bridge-transport-monorail:case',
			filter: ['all', ['in', 'kind', 'monorail'], ['!has', 'service'], ['==', 'bridge', true]],
			minzoom: 15,
			paint: {
				'line-color': rail_case.line_color,
				'line-width': rail_case.line_width
			}
		},
		{
			id: 'bridge-transport-funicular:case',
			filter: ['all', ['in', 'kind', 'funicular'], ['!has', 'service'], ['==', 'bridge', true]],
			minzoom: 15,
			paint: {
				'line-color': rail_case.line_color,
				'line-width': rail_case.line_width
			}
		},
		{
			id: 'bridge-transport-tram:case',
			filter: ['all', ['in', 'kind', 'tram'], ['!has', 'service'], ['==', 'bridge', true]],
			minzoom: 15,
			paint: {
				'line-color': rail_case.line_color,
				'line-width': rail_case.line_width
			}
		},
		{
			id: 'bridge-transport-narrowgauge:case',
			filter: ['all', ['in', 'kind', 'narrow_gauge'], ['!has', 'service'], ['==', 'bridge', true]],
			minzoom: 15,
			paint: {
				'line-color': rail_case.line_color,
				'line-width': rail_case.line_width
			}
		},
		{
			id: 'bridge-transport-lightrail:case',
			filter: ['all', ['in', 'kind', 'light_rail'], ['!has', 'service'], ['==', 'bridge', true]],
			paint: {
				'line-color': rail_case.line_color,
				'line-width': rail_case.line_width,
				'line-opacity': rail_case.line_opacity
			}
		},
		{
			id: 'bridge-transport-rail:case',
			filter: ['all', ['in', 'kind', 'rail'], ['!has', 'service'], ['==', 'bridge', true]],
			paint: {
				'line-color': rail_case.line_color,
				'line-width': rail_case.line_width,
				'line-opacity': rail_case.line_opacity
			}
		},
		{
			id: 'bridge-transport-monorail',
			filter: ['all', ['in', 'kind', 'monorail'], ['!has', 'service'], ['==', 'bridge', true]],
			minzoom: 13,
			paint: {
				'line-width': rail.line_width,
				'line-color': rail.line_color
			}
		},
		{
			id: 'bridge-transport-funicular',
			filter: ['all', ['in', 'kind', 'funicular'], ['!has', 'service'], ['==', 'bridge', true]],
			minzoom: 13,
			paint: {
				'line-width': rail.line_width,
				'line-color': rail.line_color
			}
		},
		{
			id: 'bridge-transport-tram',
			filter: ['all', ['in', 'kind', 'tram'], ['!has', 'service'], ['==', 'bridge', true]],
			minzoom: 13,
			paint: {
				'line-width': rail.line_width,
				'line-color': rail.line_color
			}
		},
		{
			id: 'bridge-transport-narrowgauge',
			filter: ['all', ['in', 'kind', 'narrow_gauge'], ['!has', 'service'], ['==', 'bridge', true]],
			minzoom: 13,
			paint: {
				'line-width': rail.line_width,
				'line-color': rail.line_color
			}
		},
		{
			id: 'bridge-transport-lightrail',
			filter: ['all', ['in', 'kind', 'light_rail'], ['!has', 'service'], ['==', 'bridge', true]],
			paint: {
				'line-color': rail.line_color,
				'line-width': rail.line_width,
				'line-opacity': rail.line_opacity
			}
		},
		{
			id: 'bridge-transport-rail',
			filter: ['all', ['in', 'kind', 'rail'], ['!has', 'service'], ['==', 'bridge', true]],
			paint: {
				'line-color': rail.line_color,
				'line-width': rail.line_width,
				'line-opacity': rail.line_opacity
			}
		}
	].map((el) => {
		return {
			type: 'line',
			'source-layer': 'streets',
			source: 'versatiles-osm',
			...el
		} as Layer;
	});

	const transitTunnels: Layer[] = [
		{
			id: 'tunnel-transport-monorail',
			filter: ['all', ['in', 'kind', 'monorail'], ['!has', 'service'], ['==', 'tunnel', true]],
			minzoom: 13,
			paint: {
				'line-width': rail.line_width,
				'line-color': rail.line_color
			}
		},
		{
			id: 'tunnel-transport-funicular',
			filter: ['all', ['in', 'kind', 'funicular'], ['!has', 'service'], ['==', 'tunnel', true]],
			minzoom: 13,
			paint: {
				'line-width': rail.line_width,
				'line-color': rail.line_color
			}
		},
		{
			id: 'tunnel-transport-tram',
			filter: ['all', ['in', 'kind', 'tram'], ['!has', 'service'], ['==', 'tunnel', true]],
			minzoom: 13,
			paint: {
				'line-width': rail.line_width,
				'line-color': rail.line_color
			}
		},
		{
			id: 'tunnel-transport-narrowgauge',
			filter: ['all', ['in', 'kind', 'narrow_gauge'], ['!has', 'service'], ['==', 'tunnel', true]],
			minzoom: 13,
			paint: {
				'line-width': rail.line_width,
				'line-color': rail.line_color
			}
		},
		{
			id: 'tunnel-transport-lightrail',
			filter: ['all', ['in', 'kind', 'light_rail'], ['!has', 'service'], ['==', 'tunnel', true]],
			paint: {
				'line-color': rail.line_color,
				'line-width': rail.line_width,
				'line-opacity': rail.line_opacity
			}
		},
		{
			id: 'tunnel-transport-rail',
			filter: ['all', ['in', 'kind', 'rail'], ['!has', 'service'], ['==', 'tunnel', true]],
			paint: {
				'line-color': rail.line_color,
				'line-width': rail.line_width,
				'line-opacity': rail.line_opacity
			}
		}
	].map((el) => {
		return {
			type: 'line',
			'source-layer': 'streets',
			source: 'versatiles-osm',
			...el
		} as Layer;
	});
	const transitSurface: Layer[] = [
		{
			id: 'transport-rail:dashes',
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
			id: 'transport-monorail',
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
			id: 'transport-funicular',
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
			id: 'transport-tram',
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
			id: 'transport-narrowgauge',
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
			id: 'transport-lightrail',
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
			id: 'transport-rail',
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
			id: 'transport-ferry',
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
		}
	].map((el) => {
		return {
			type: 'line',
			'source-layer': 'streets',
			source: 'versatiles-osm',
			...el
		} as Layer;
	});

	return { airports, transitBridges, transitSurface, transitTunnels };
}
