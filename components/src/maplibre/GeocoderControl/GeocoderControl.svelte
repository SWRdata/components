<script lang="ts">
	import maplibre from 'maplibre-gl';
	import MaplibreGeocoder, { type MaplibreGeocoderApi } from '@maplibre/maplibre-gl-geocoder';
	import { MaptilerGeocoderAPI } from './GeocoderAPIs';
	import MapControl from '../MapControl/MapControl.svelte';
	import { type GeocodingCountry, type GeocodingLanguage, type GeocodingService } from '../types';
	import './GeocoderControl.css';

	interface GeocoderControlProps {
		service: GeocodingService;
		/**
		 * API key for selected geocoding `service`
		 */
		key: string;
		/**
		 * Limit the number of returned suggestions
		 */
		limit?: number;
		/**
		 * Limit search to one or more countries
		 */
		countries?: GeocodingCountry | GeocodingCountry[];
		/**
		 * Limit search to one or more languages. The UI is localised to the first language specified if [available](https://github.com/maplibre/maplibre-gl-geocoder/blob/main/lib/localization.ts).
		 */
		languages?: GeocodingLanguage | GeocodingLanguage[];
		/**
		 * Overwrite the default input placeholder
		 */
		placeholder?: string;
	}

	const {
		key,
		service = 'maptiler',
		countries = 'de',
		languages = 'en',
		placeholder,
		limit = 3
	}: GeocoderControlProps = $props();

	const countriesArr = Array.isArray(countries) ? countries : [countries];
	const languagesArr = Array.isArray(languages) ? languages : [languages];

	// Future: initialise a different GeocoderAPI depending on "service"
	let geocoderAPI: MaplibreGeocoderApi = new MaptilerGeocoderAPI(key);

	const geocoder = new MaplibreGeocoder(geocoderAPI, {
		maplibregl: maplibre,
		language: languagesArr.join(','),
		countries: countriesArr.join(','),
		showResultsWhileTyping: true,
		showResultMarkers: false,
		debounceSearch: 25,
		placeholder,
		limit
	});
</script>

<MapControl control={geocoder} position="top-left" />
