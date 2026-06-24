<script lang="ts">
	import maplibre, { type ControlPosition } from 'maplibre-gl';
	import MaplibreGeocoder, { type MaplibreGeocoderApi } from '@maplibre/maplibre-gl-geocoder';
	import { MaptilerGeocoderAPI } from './GeocoderAPIs';
	import MapControl from '../MapControl/MapControl.svelte';
	import type GeocoderProps from '../Geocoder/GeocoderProps';

	interface GeocoderControlProps extends Omit<GeocoderProps, 'map'> {
		position?: ControlPosition;
	}

	const {
		key,
		service = 'maptiler',
		countries = 'de',
		languages = 'en',
		types = [],
		placeholder,
		bbox,
		position = 'top-left',
		limit = 3
	}: GeocoderControlProps = $props();

	const countriesArr = $derived(Array.isArray(countries) ? countries : [countries]);
	const languagesArr = $derived(Array.isArray(languages) ? languages : [languages]);
	const typesArr = $derived(Array.isArray(types) ? types : [types]);

	// Future: initialise a different GeocoderAPI depending on "service"
	let geocoderAPI: MaplibreGeocoderApi = $derived(new MaptilerGeocoderAPI(key));

	const geocoder = $derived(
		new MaplibreGeocoder(geocoderAPI, {
			maplibregl: maplibre,
			language: languagesArr.join(','),
			countries: countriesArr.join(','),
			types: typesArr.join(','),
			bbox,
			showResultsWhileTyping: true,
			showResultMarkers: false,
			debounceSearch: 25,
			placeholder,
			limit
		})
	);
</script>

<MapControl control={geocoder} {position} />

<style lang="scss">
	@use '../Geocoder/geocoder.scss';
</style>
