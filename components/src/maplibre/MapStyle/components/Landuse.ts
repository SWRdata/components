import tokens from '../tokens';
import { type Layer } from '../../types';

export default function makeLanduse(): any {
	const landuse: Layer[] = [
		{
			id: 'background',
			type: 'background',
			paint: {
				'background-color': {
					stops: [
						[8, tokens.background],
						[10, 'white']
					]
				}
			}
		},
		{
			id: 'water-ocean',
			type: 'fill',
			'source-layer': 'ocean',
			paint: {
				'fill-color': tokens.water_ocean
			}
		},
		{
			id: 'land-glacier',
			type: 'fill',
			'source-layer': 'water_polygons',
			filter: ['all', ['==', 'kind', 'glacier']],
			paint: {
				'fill-color': 'hsl(0,0%,100%)'
			}
		},
		{
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
			id: 'land-waste',
			type: 'fill',
			'source-layer': 'land',
			filter: ['all', ['in', 'kind', 'landfill']],
			paint: {
				'fill-color': 'hsl(50,0%,95%)',
				'fill-opacity': {
					stops: [
						[10, 0],
						[11, 1]
					]
				}
			}
		},
		{
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
			id: 'land-leisure',
			type: 'fill',
			'source-layer': 'land',
			filter: [
				'all',
				['in', 'kind', 'cemetery', 'grave_yard', 'miniature_golf', 'playground', 'golf_course']
			],
			paint: {
				'fill-color': tokens.grass_dark
			}
		},
		{
			id: 'land-rock',
			type: 'fill',
			'source-layer': 'land',
			filter: ['all', ['in', 'kind', 'bare_rock', 'scree', 'shingle']],
			paint: {
				'fill-color': 'hsl(192,0%,90%)'
			}
		},
		{
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
			id: 'land-grass',
			type: 'fill',
			'source-layer': 'land',
			filter: [
				'all',
				['in', 'kind', 'heath', 'scrub', 'grass', 'grassland', 'meadow', 'wet_meadow']
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
			id: 'land-sand',
			type: 'fill',
			'source-layer': 'land',
			filter: ['all', ['in', 'kind', 'beach', 'sand']],
			paint: {
				'fill-color': 'hsl(60,0%,95%)'
			}
		},
		{
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
			id: 'water-area',
			type: 'fill',
			'source-layer': 'water_polygons',
			filter: ['==', 'kind', 'water'],
			paint: {
				'fill-color': tokens.water,
				'fill-opacity': {
					stops: [
						[3, 0],
						[4, 1]
					]
				}
			}
		},
		{
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
			id: 'site-any',
			type: 'fill',
			'source-layer': 'sites',
			paint: {
				'fill-color': tokens.street_tertiary,
				'fill-opacity': 0.1
			}
		}
	].map((el) => {
		return { source: 'versatiles-osm', ...el } as Layer;
	});

	return { landuse };
}
