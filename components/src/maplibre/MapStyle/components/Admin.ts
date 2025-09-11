import tokens from '../tokens';
import { type Layer } from '../../types';

export default function makeAdmin(): any {
	const admin: Layer[] = [
		{
			id: 'boundary-country:case',
			filter: [
				'all',
				['==', 'admin_level', 2],
				['!=', 'maritime', true],
				['!=', 'disputed', true],
				['!=', 'coastline', true]
			],
			paint: {
				'line-color': '#ffffff',
				'line-blur': 1,
				'line-width': {
					stops: [
						[2, 0],
						[3, 6],
						[10, 8]
					]
				},
				'line-opacity': 0.95
			}
		},
		{
			id: 'boundary-country-disputed:case',
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
			id: 'boundary-state:case',
			filter: [
				'all',
				['==', 'admin_level', 4],
				['!=', 'maritime', true],
				['!=', 'disputed', true],
				['!=', 'coastline', true]
			],
			paint: {
				'line-color': 'white',
				'line-blur': 1,
				'line-width': {
					stops: [
						[7, 0],
						[8, 5],
						[10, 6]
					]
				},
				'line-opacity': 0.75
			}
		},
		{
			id: 'boundary-country',
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
						[7, '#a5a5a5'],
						[10, '#161616']
					]
				},

				'line-width': {
					stops: [
						[2, 0],
						[5, 1],
						[7, 1.5],
						[12, 3]
					]
				}
			}
		},
		{
			id: 'boundary-country-disputed',
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
			}
		},
		{
			id: 'boundary-state',
			filter: [
				'all',
				['==', 'admin_level', 4],
				['!=', 'maritime', true],
				['!=', 'disputed', true],
				['!=', 'coastline', true]
			],
			paint: {
				'line-color': 'hsl(37, 10%, 75%)',
				'line-width': {
					stops: [
						[7, 1],
						[8, 1.5]
					]
				},
				'line-opacity': {
					stops: [
						[7, 0],
						[7.5, 1]
					]
				}
			}
		}
	].map((el) => {
		return {
			source: 'versatiles-osm',
			'source-layer': 'boundaries',
			type: 'line',
			...el,
			layout: {
				'line-cap': 'round',
				'line-join': 'round'
			}
		} as Layer;
	});

	return { admin };
}
