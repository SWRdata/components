<script lang="ts">
	import { onMount, setContext, type Snippet } from 'svelte';
	import { MaptilerGeocoderAPI } from '../GeocoderControl/GeocoderAPIs';
	import {
		type GeocodingCountry,
		type GeocodingLanguage,
		type GeocodingService,
		type Location
	} from '../types';

	import type {
		MaplibreGeocoderApi,
		MaplibreGeocoderApiConfig
	} from '@maplibre/maplibre-gl-geocoder';

	interface WithLinkLocationProps {
		service?: GeocodingService;
		/**
		 * API key for selected geocoding `service`
		 */
		key: string;
		/**
		 * Limit search to one or more countries
		 */
		countries?: GeocodingLanguage | GeocodingCountry[];
		/**
		 * Limit search to one or more languages
		 */
		languages?: GeocodingLanguage | GeocodingLanguage[];
		/**
		 * Customise the URL parameter used to set the initial location
		 */
		urlParameter?: string;
		children: Snippet;
	}

	const {
		key,
		service = 'maptiler',
		countries = 'de',
		languages = 'de',
		urlParameter = 'location',
		children
	}: WithLinkLocationProps = $props();

	const countriesArr = $derived(Array.isArray(countries) ? countries : [countries]);
	const languagesArr = $derived(Array.isArray(languages) ? languages : [languages]);

	const geocoder: MaplibreGeocoderApi = $derived(new MaptilerGeocoderAPI(key));

	let location: any = $state({});

	function bboxToArea(bbox: [number, number, number, number]) {
		return (bbox[2] - bbox[0]) * (bbox[3] - bbox[1]);
	}

	$effect(async () => {
		const params = new URLSearchParams(window.location.search);

		if (params.has(urlParameter)) {
			const config: MaplibreGeocoderApiConfig = {
				countries: countriesArr.join(','),
				language: languagesArr.join(','),
				query: params.get(urlParameter)?.toString(),
				limit: 1
			};

			const res = await geocoder.forwardGeocode(config);

			if (res.features[0].bbox && res.features[0].geometry.type === 'Point') {
				location.lat = res.features[0].geometry.coordinates[1];
				location.lng = res.features[0].geometry.coordinates[0];
				location.zoom = 11 - bboxToArea(res.features[0].bbox) * 5.5;
				location.active = true;
			}
		} else {
			location = {};
		}
	});

	setContext('initialLocation', location);
</script>

{@render children?.()}
