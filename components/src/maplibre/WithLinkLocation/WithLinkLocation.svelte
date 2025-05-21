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
		languages?: GeocodingLanguage | GeocodingLanguage[];
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

	const countriesArr = Array.isArray(countries) ? countries : [countries];
	const languagesArr = Array.isArray(languages) ? languages : [languages];

	let geocoder: MaplibreGeocoderApi;
	if (service === 'maptiler') {
		geocoder = new MaptilerGeocoderAPI(key);
	}

	let location: Location | boolean | undefined = $state();

	function bboxToArea(bbox: [number, number, number, number]) {
		return (bbox[2] - bbox[0]) * (bbox[3] - bbox[1]);
	}

	onMount(async () => {
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
				location = {
					lat: res.features[0].geometry.coordinates[1],
					lng: res.features[0].geometry.coordinates[0],
					zoom: 11 - bboxToArea(res.features[0].bbox) * 5.5
				};
			}
		} else {
			location = false;
		}
	});

	$effect.pre(() => {
		setContext('initialLocation', location);
	});
</script>

{#if location !== undefined}
	{@render children?.()}
{/if}
