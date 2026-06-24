<script lang="ts">
	import maplibre from 'maplibre-gl';
	import MaplibreGeocoder, {
		type CarmenGeojsonFeature,
		type MaplibreGeocoderApi
	} from '@maplibre/maplibre-gl-geocoder';
	import { MaptilerGeocoderAPI } from './GeocoderAPIs';

	import type { Attachment } from 'svelte/attachments';
	import type GeocoderProps from './GeocoderProps';

	const {
		key,
		service = 'maptiler',
		countries = 'de',
		languages = 'en',
		types = [],
		bbox,
		placeholder,
		limit = 3,
		size = 'default',
		map
	}: GeocoderProps = $props();

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
			bbox: bbox,
			showResultsWhileTyping: true,
			showResultMarkers: false,
			debounceSearch: 25,
			placeholder,
			limit
		})
	);

	const handleResult = (r: { result: CarmenGeojsonFeature }) => {
		const res = r.result;
		if (res.bbox && map) {
			map.fitBounds([
				[res.bbox[0], res.bbox[1]],
				[res.bbox[2], res.bbox[3]]
			]);
		}
	};

	const attachGeocoder: Attachment = (el) => {
		geocoder.addTo(el as HTMLElement);
		geocoder.on('result', handleResult);
	};
</script>

<div class={['container', size]} {@attach attachGeocoder}></div>

<style lang="scss">
	@use 'geocoder.scss';
</style>
