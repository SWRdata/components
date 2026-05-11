import {
	type CarmenGeojsonFeature,
	type MaplibreGeocoderApi,
	type MaplibreGeocoderApiConfig,
	type MaplibreGeocoderFeatureResults
} from '@maplibre/maplibre-gl-geocoder';

export class MaptilerGeocoderAPI implements MaplibreGeocoderApi {
	key: string;

	constructor(key: string) {
		this.key = key;
	}

	async forwardGeocode(config: MaplibreGeocoderApiConfig): Promise<MaplibreGeocoderFeatureResults> {
		const result: MaplibreGeocoderFeatureResults = {
			type: 'FeatureCollection',
			features: []
		};
		try {
			const params = new URLSearchParams(
				Object.fromEntries(
					Object.entries({
						country: config.countries || '',
						language: config.language || '',
						types: config.types || '',
						key: this.key || ''
					}).filter(([_, value]) => {
						return value !== '';
					})
				)
			);

			const response = await fetch(
				`https://api.maptiler.com/geocoding/${config.query}.json?${params.toString()}`
			);
			const geojson = await response.json();
			for (const feature of geojson.features) {
				const res: CarmenGeojsonFeature = {
					type: 'Feature',
					id: feature.id,
					place_type: ['place'],
					place_name: feature.place_name,
					language: feature.properties.display_name,
					text: feature.text,
					bbox: feature.bbox,
					geometry: {
						type: 'Point',
						coordinates: feature.center
					},
					properties: {
						text: feature.text
					}
				};
				result.features.push(res);
			}
		} catch (e) {
			console.error(`Failed to forwardGeocode with error: ${e}`);
		}
		return result;
	}
}
