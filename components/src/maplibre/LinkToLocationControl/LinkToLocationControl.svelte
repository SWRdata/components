<script lang="ts">
	import { onMount } from 'svelte';
	import { MaptilerGeocoderAPI } from '../GeocoderControl/GeocoderAPIs';
	import { getMapContext } from '../context.svelte';

	import type {
		MaplibreGeocoderApi,
		MaplibreGeocoderApiConfig
	} from '@maplibre/maplibre-gl-geocoder';

	type Language = 'de' | 'en';
	type Country = 'de' | 'at';

	interface LinkToLocationControlProps {
		key: string;
		urlParameter?: string;
		service?: 'maptiler';
		countries?: Country[] | Country;
		languages?: Language[] | Language;
	}

	const {
		key,
		urlParameter = 'location',
		service = 'maptiler',
		countries = 'de',
		languages = 'de'
	}: LinkToLocationControlProps = $props();

	const { map } = $derived(getMapContext());
	const countriesArr = Array.isArray(countries) ? countries : [countries];
	const languagesArr = Array.isArray(languages) ? languages : [languages];

	let geocoder: MaplibreGeocoderApi;
	if (service === 'maptiler') {
		geocoder = new MaptilerGeocoderAPI(key);
	}

	function bboxToArea(bbox: [number, number, number, number]) {
		return (bbox[2] - bbox[0]) * (bbox[3] - bbox[1]);
	}

	onMount(async () => {
		const params = new URLSearchParams(window.location.search);
		if (params.has(urlParameter)) {
			console.log(params.get(urlParameter));
			const config: MaplibreGeocoderApiConfig = {
				countries: countriesArr.join(','),
				language: languagesArr.join(','),
				query: params.get(urlParameter)?.toString(),
				limit: 1
			};
			const res = await geocoder.forwardGeocode(config);
			if (res.features[0].bbox && res.features[0].geometry.type === 'Point') {
				map?.jumpTo({
					center: [
						res.features[0].geometry.coordinates[0],
						res.features[0].geometry.coordinates[1]
					],
					zoom: 11 - bboxToArea(res.features[0].bbox) * 5.5
				});
			}
		}
	});
</script>
