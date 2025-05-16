import type { StyleSpecification } from "maplibre-gl";
import tokens from "./tokens"
import buildAdmin from "./Admin";

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

const style: StyleSpecification = {
	version: 8,
	name: 'swr-datalab-light',
	metadata: {
		license: 'https://creativecommons.org/publicdomain/zero/1.0/'
	},
	glyphs: 'https://static.datenhub.net/maps/fonts/{fontstack}/{range}.pbf',
	sources: {
		'versatiles-shortbread': {
			attribution:
				'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			tiles: ['https://tiles.versatiles.org/tiles/osm/{z}/{x}/{y}'],
			type: 'vector',
			scheme: 'xyz',
			bounds: [-180, -85.0511287798066, 180, 85.0511287798066],
			minzoom: 0,
			maxzoom: 14
		}
	},
	layers: [
		{
			id: 'background',
			type: 'background',
			paint: {
				'background-color': tokens.background
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'water-ocean',
			type: 'fill',
			'source-layer': 'ocean',
			paint: {
				'fill-color': 'hsl(218, 58%, 87%)'
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'land-glacier',
			type: 'fill',
			'source-layer': 'water_polygons',
			filter: ['all', ['==', 'kind', 'glacier']],
			paint: {
				'fill-color': 'hsl(0,0%,100%)'
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'land-industrial',
			type: 'fill',
			'source-layer': 'land',
			filter: ['all', ['in', 'kind', 'industrial', 'quarry', 'railway']],
			paint: {
				'fill-color': tokens.background,
				'fill-opacity': ["interpolate", ["linear"], ["zoom"], 10, 0, 11, 1]
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'land-agriculture',
			type: 'fill',
			'source-layer': 'land',
			filter: [
				'all',
				[
					'in',
					'kind',
					'brownfield',
					'farmland',
					'farmyard',
					'greenfield',
					'greenhouse_horticulture',
					'orchard',
					'plant_nursery',
					'vineyard'
				]
			],
			paint: {
				'fill-color': tokens.grass,
				'fill-opacity': {
					stops: [
						[11, 0],
						[12, 1]
					]
				}
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'land-waste',
			type: 'fill',
			'source-layer': 'land',
			filter: ['all', ['in', 'kind', 'landfill']],
			paint: {
				'fill-color': 'hsl(50,0%,80%)',
				'fill-opacity': {
					stops: [
						[10, 0],
						[11, 1]
					]
				}
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'land-park',
			type: 'fill',
			'source-layer': 'land',
			filter: ['all', ['in', 'kind', 'park', 'village_green', 'recreation_ground']],
			paint: {
				'fill-color': tokens.grass,
				'fill-opacity': {
					stops: [
						[11, 0],
						[12, 1]
					]
				}
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'land-garden',
			type: 'fill',
			'source-layer': 'land',
			filter: ['all', ['in', 'kind', 'allotments', 'garden']],
			paint: {
				'fill-color': tokens.grass,
				'fill-opacity': {
					stops: [
						[14, 0],
						[15, 1]
					]
				}
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'land-burial',
			type: 'fill',
			'source-layer': 'land',
			filter: ['all', ['in', 'kind', 'cemetery', 'grave_yard']],
			paint: {
				'fill-color': tokens.grass,
				'fill-opacity': {
					stops: [
						[12, 0],
						[13, 1]
					]
				}
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'land-leisure',
			type: 'fill',
			'source-layer': 'land',
			filter: ['all', ['in', 'kind', 'miniature_golf', 'playground', 'golf_course']],
			paint: {
				'fill-color': tokens.grass_dark
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'land-rock',
			type: 'fill',
			'source-layer': 'land',
			filter: ['all', ['in', 'kind', 'bare_rock', 'scree', 'shingle']],
			paint: {
				'fill-color': 'hsl(192,0%,89%)'
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'land-forest',
			type: 'fill',
			'source-layer': 'land',
			filter: ['all', ['in', 'kind', 'forest']],
			paint: {
				'fill-color': tokens.grass,
				'fill-opacity': {
					stops: [
						[12, 0],
						[13, 0.25]
					]
				}
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'land-grass',
			type: 'fill',
			'source-layer': 'land',
			filter: ['all', ['in', 'kind', 'grass', 'grassland', 'meadow', 'wet_meadow']],
			paint: {
				'fill-color': tokens.grass,
				'fill-opacity': {
					stops: [
						[11, 0],
						[12, 1]
					]
				}
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'land-vegetation',
			type: 'fill',
			'source-layer': 'land',
			filter: ['all', ['in', 'kind', 'heath', 'scrub']],
			paint: {
				'fill-color': tokens.grass,
				'fill-opacity': {
					stops: [
						[11, 0],
						[12, 1]
					]
				}
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'land-sand',
			type: 'fill',
			'source-layer': 'land',
			filter: ['all', ['in', 'kind', 'beach', 'sand']],
			paint: {
				'fill-color': 'hsl(60,0%,95%)'
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'land-wetland',
			type: 'fill',
			'source-layer': 'land',
			filter: ['all', ['in', 'kind', 'bog', 'marsh', 'string_bog', 'swamp']],
			paint: {
				'fill-color': tokens.marsh,
				'fill-opacity': {
					stops: [
						[10, 0],
						[11, 1]
					]
				}
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'water-river',
			type: 'line',
			'source-layer': 'water_lines',
			filter: ['all', ['in', 'kind', 'river'], ['!=', 'tunnel', true]],
			paint: {
				'line-color': tokens.water,
				'line-width': {
					stops: [
						[8, 0],
						[10, 1],
						[12, 2],
						[15, 4],
						[17, 9],
						[18, 20],
						[20, 60]
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
			id: 'water-canal',
			type: 'line',
			'source-layer': 'water_lines',
			filter: ['all', ['in', 'kind', 'canal'], ['!=', 'tunnel', true], ['!=', 'bridge', true]],
			paint: {
				'line-color': tokens.water,
				'line-width': {
					stops: [
						[9, 0],
						[10, 2],
						[15, 3],
						[17, 8],
						[18, 17],
						[20, 50]
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
			id: 'water-stream',
			type: 'line',
			'source-layer': 'water_lines',
			filter: ['all', ['in', 'kind', 'stream'], ['!=', 'tunnel', true], ['!=', 'bridge', true]],
			paint: {
				'line-color': tokens.water,
				'line-width': {
					stops: [
						[13, 0],
						[14, 1],
						[15, 2],
						[17, 6],
						[18, 12],
						[20, 30]
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
			id: 'water-ditch',
			type: 'line',
			'source-layer': 'water_lines',
			filter: ['all', ['in', 'kind', 'ditch'], ['!=', 'tunnel', true], ['!=', 'bridge', true]],
			paint: {
				'line-color': tokens.water_light,
				'line-width': {
					stops: [
						[14, 0],
						[15, 1],
						[17, 4],
						[18, 8],
						[20, 20]
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
			id: 'water-area',
			type: 'fill',
			'source-layer': 'water_polygons',
			filter: ['==', 'kind', 'water'],
			paint: {
				'fill-color': tokens.water_light,
				'fill-opacity': {
					stops: [
						[4, 0],
						[6, 1]
					]
				}
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'water-area-river',
			type: 'fill',
			'source-layer': 'water_polygons',
			filter: ['==', 'kind', 'river'],
			paint: {
				'fill-color': tokens.water,
				'fill-opacity': {
					stops: [
						[4, 0],
						[6, 1]
					]
				}
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'water-area-small',
			type: 'fill',
			'source-layer': 'water_polygons',
			filter: ['in', 'kind', 'reservoir', 'basin', 'dock'],
			paint: {
				'fill-color': tokens.water,
				'fill-opacity': {
					stops: [
						[4, 0],
						[6, 1]
					]
				}
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'water-dam-area',
			type: 'fill',
			'source-layer': 'dam_polygons',
			filter: ['==', 'kind', 'dam'],
			paint: {
				'fill-color': 'hsl(33,0%,95%)',
				'fill-opacity': {
					stops: [
						[12, 0],
						[13, 1]
					]
				}
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'water-dam',
			type: 'line',
			'source-layer': 'dam_lines',
			filter: ['==', 'kind', 'dam'],
			paint: {
				'line-color': 'hsl(205,0%,85%)'
			},
			layout: {
				'line-cap': 'round',
				'line-join': 'round'
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'water-pier-area',
			type: 'fill',
			'source-layer': 'pier_polygons',
			filter: ['in', 'kind', 'pier', 'breakwater', 'groyne'],
			paint: {
				'fill-color': tokens.street_tertiary,
				'fill-opacity': {
					stops: [
						[14, 0],
						[15, 1]
					]
				}
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'water-pier',
			type: 'line',
			'source-layer': 'pier_lines',
			filter: ['in', 'kind', 'pier', 'breakwater', 'groyne'],
			paint: {
				'line-color': tokens.street_tertiary,
				'line-opacity': {
					stops: [
						[14, 0],
						[15, 1]
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
			id: 'site-dangerarea',
			type: 'fill',
			'source-layer': 'sites',
			filter: ['in', 'kind', 'danger_area'],
			paint: {
				'fill-color': 'hsl(0,0%,50%)',
				'fill-outline-color': 'hsl(0,0%,50%)',
				'fill-opacity': 0.3
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'site-university',
			type: 'fill',
			'source-layer': 'sites',
			filter: ['in', 'kind', 'university'],
			paint: {
				'fill-color': 'hsl(60,0%,75%)',
				'fill-opacity': 0.1
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'site-college',
			type: 'fill',
			'source-layer': 'sites',
			filter: ['in', 'kind', 'college'],
			paint: {
				'fill-color': 'hsl(60,0%,75%)',
				'fill-opacity': 0.1
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'site-school',
			type: 'fill',
			'source-layer': 'sites',
			filter: ['in', 'kind', 'school'],
			paint: {
				'fill-color': 'hsl(60,0%,75%)',
				'fill-opacity': 0.1
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'site-hospital',
			type: 'fill',
			'source-layer': 'sites',
			filter: ['in', 'kind', 'hospital'],
			paint: {
				'fill-color': 'hsl(0,0%,70%)',
				'fill-opacity': 0.1
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'site-prison',
			type: 'fill',
			'source-layer': 'sites',
			filter: ['in', 'kind', 'prison'],
			paint: {
				'fill-color': 'hsl(305,0%,97%)',
				'fill-opacity': 0.1
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'site-parking',
			type: 'fill',
			'source-layer': 'sites',
			filter: ['in', 'kind', 'parking'],
			paint: {
				'fill-color': 'hsl(24,0%,95%)'
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'site-bicycleparking',
			type: 'fill',
			'source-layer': 'sites',
			filter: ['in', 'kind', 'bicycle_parking'],
			paint: {
				'fill-color': 'hsl(24,0%,95%)'
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'site-construction',
			type: 'fill',
			'source-layer': 'sites',
			filter: ['in', 'kind', 'construction'],
			paint: {
				'fill-color': 'hsl(0,0%,66%)',
				'fill-opacity': 0.1
			}
		},
		{
			source: 'versatiles-shortbread',
			id: 'airport-area',
			type: 'fill',
			'source-layer': 'street_polygons',
			filter: ['in', 'kind', 'runway', 'taxiway'],
			paint: {
				'fill-color': 'hsl(0,0%,100%)',
				'fill-opacity': 0.5
			}
		},
		{
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
		},

		{
			source: 'versatiles-shortbread',
			id: 'building',
			type: 'fill',
			'source-layer': 'buildings',
			paint: {
				'fill-color': 'hsl(240, 4%, 90%)',
				'fill-opacity': {
					stops: [
						[14, 0],
						[15, 1]
					]
				}
			}
		},
		{
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
		},
		{
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
			id: 'tunnel-way-footway',
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
		},
		{
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
		},
		{
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
		},
		{
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
		},
		{
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
		{
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
			id: 'tunnel-transport-rail',
			type: 'line',
			'source-layer': 'streets',
			filter: ['all', ['in', 'kind', 'rail'], ['!has', 'service'], ['==', 'tunnel', true]],
			paint: {
				'line-color': rail.line_color,
				'line-width': rail.line_width,
				'line-opacity': rail.line_opacity
			}
		},
		{
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
			id: 'way-steps:outline',
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
			source: 'versatiles-shortbread',
			id: 'way-path:outline',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
			id: 'street-service:outline',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
		},
		{
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
		},
		{
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
		},
		{
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
		{
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
			id: 'bridge-way-footway:outline',
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
			source: 'versatiles-shortbread',
			id: 'bridge-way-steps:outline',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
		{
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
		{
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
			id: 'bridge-transport-rail',
			type: 'line',
			'source-layer': 'streets',
			filter: ['all', ['in', 'kind', 'rail'], ['!has', 'service'], ['==', 'bridge', true]],
			paint: {
				'line-color': rail.line_color,
				'line-width': rail.line_width,
				'line-opacity': rail.line_opacity
			}
		},
		...buildAdmin([0, 1, 2, 3]),

		{
			source: 'versatiles-shortbread',
			id: 'label-street-pedestrian',
			type: 'symbol',
			'source-layer': 'street_labels',
			filter: ['==', 'kind', 'pedestrian'],
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
			source: 'versatiles-shortbread',
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
		{
			source: 'versatiles-shortbread',
			id: 'label-place-neighbourhood',
			type: 'symbol',
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
			source: 'versatiles-shortbread',
			id: 'label-place-quarter',
			type: 'symbol',
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
			source: 'versatiles-shortbread',
			id: 'label-place-suburb',
			type: 'symbol',
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
			source: 'versatiles-shortbread',
			id: 'label-place-hamlet',
			type: 'symbol',
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
				'icon-color': 'rgb(57,57,57)',
				'text-color': 'rgb(57,57,57)',
				'text-halo-color': 'hsla(0,0%,100%,0.8)',
				'text-halo-width': 2
			},
			minzoom: 13
		},
		{
			source: 'versatiles-shortbread',
			id: 'label-place-village',
			type: 'symbol',
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
				'icon-color': 'rgb(57,57,57)',
				'text-color': 'rgb(57,57,57)',
				'text-halo-color': tokens.background,
				'text-halo-width': 2
			},
			minzoom: 11
		},
		{
			source: 'versatiles-shortbread',
			id: 'label-place-town-large',
			type: 'symbol',
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
			source: 'versatiles-shortbread',
			id: 'label-place-town',
			type: 'symbol',
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
			source: 'versatiles-shortbread',
			id: 'label-place-city',
			type: 'symbol',
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
			source: 'versatiles-shortbread',
			id: 'label-place-statecapital',
			type: 'symbol',
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
			source: 'versatiles-shortbread',
			id: 'label-place-capital',
			type: 'symbol',
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
};

export default style;
