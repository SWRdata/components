<script lang="ts">
	import maplibre from 'maplibre-gl';
	import MaplibreGeocoder, { type MaplibreGeocoderApi } from '@maplibre/maplibre-gl-geocoder';
	import { MaptilerGeocoderAPI } from './GeocoderAPIs';
	import MapControl from '../MapControl/MapControl.svelte';
	import { type GeocodingCountry, type GeocodingLanguage, type GeocodingService } from '../types';

	interface GeocoderControlProps {
		service: GeocodingService;
		/**
		 * API key for selected geocoding `service`
		 */
		key: string;
		/**
		 * Maximum number of suggestions to display
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
		 * Overwrite the default input placeholder text
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
		placeholder,
		limit
	});
</script>

<MapControl control={geocoder} position="top-left" />

<style lang="scss">
	:global {
		.maplibregl-ctrl-geocoder {
			background-color: #fff;
			position: relative;
			width: 100%;
			z-index: 1;
			font-family: var(--swr-sans);
			font-size: var(--fs-small-1);
			border-radius: var(--br-small);
			border: 1px solid rgba(0, 0, 0, 0.75);
			box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.075);
		}

		.maplibre-gl-geocoder--error {
			font-size: var(--fs-small-2);
			color: var(--gray-dark-2);
			padding: 0.4em 0.65em;
		}

		.maplibregl-ctrl-geocoder--input {
			width: 100%;
			height: 100%;
			font-family: inherit;
			font-size: inherit;
			background-color: transparent;
			color: var(--gray-dark-5);
			border: 0;
			height: 1.85em;
			padding: 0 1.85em;
			padding-top: 0.1em;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}

		.maplibregl-ctrl-geocoder--input::placeholder {
			opacity: 1;
			color: var(--gray-dark-2);
		}
		.maplibregl-ctrl-geocoder--input:focus {
			color: var(--gray-dark-5);
			outline: 0;
		}

		.maplibregl-ctrl-geocoder .maplibregl-ctrl-geocoder--pin-right > * {
			display: none;
			position: absolute;
			z-index: 2;
			right: 0.5em;
			top: 50%;
			transform: translateY(-50%);
			border: 0;
		}

		/* Suggestions */
		.maplibregl-ctrl-geocoder .suggestions {
			background: white;
			border: 1px solid rgba(0, 0, 0, 0.75);
			box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
			border-radius: var(--br-small);
			left: 0;
			list-style: none;
			position: absolute;
			width: 100%;
			top: calc(100% + 0.5em);
			z-index: 1000;
			overflow: hidden;
		}

		.maplibregl-ctrl-bottom-left .suggestions,
		.maplibregl-ctrl-bottom-right .suggestions {
			top: auto;
			bottom: 100%;
		}

		.maplibregl-ctrl-geocoder .suggestions > li > a {
			cursor: default;
			display: block;
			padding: 0.5em 0.75em;
			color: var(--gray-dark-5);
			padding-bottom: 0.5em;
			border-bottom: 1px solid var(--gray-light-3);
		}
		.maplibregl-ctrl-geocoder .suggestions > li:last-child > a {
			border-bottom: 0;
		}

		.maplibregl-ctrl-geocoder .suggestions > .active > a,
		.maplibregl-ctrl-geocoder .suggestions > li > a:hover {
			background: var(--gray-light-5);
			text-decoration: none;
			cursor: pointer;
		}
		.maplibregl-ctrl-geocoder .suggestions > .active .maplibregl-ctrl-geocoder--result-title,
		.maplibregl-ctrl-geocoder .suggestions > li > a:hover .maplibregl-ctrl-geocoder--result-title {
			text-decoration: underline;
		}

		.maplibregl-ctrl-geocoder--suggestion {
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		.maplibregl-ctrl-geocoder--suggestion-info {
			display: flex;
			flex-direction: column;
		}

		.maplibregl-ctrl-geocoder--suggestion-match {
			font-weight: bold;
		}

		.maplibregl-ctrl-geocoder--suggestion-title,
		.maplibregl-ctrl-geocoder--suggestion-address,
		.maplibregl-ctrl-geocoder--result-address {
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}

		.maplibregl-ctrl-geocoder--result-icon {
			display: none;
		}
		.maplibregl-ctrl-geocoder--result-title {
			font-weight: 600;
			letter-spacing: 0;
		}
		.maplibregl-ctrl-geocoder--result-address {
			font-size: var(--fs-small-2);
			color: var(--gray-dark-2);
			line-height: 1.3;
		}

		.maplibregl-ctrl-geocoder--icon {
			display: inline-block;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			height: 1em;
		}

		.maplibregl-ctrl-geocoder--icon-close {
			right: 0;
		}
		.maplibregl-ctrl-geocoder--icon-search {
			left: 0.5em;
			height: 1.5em;
		}
	}
</style>
