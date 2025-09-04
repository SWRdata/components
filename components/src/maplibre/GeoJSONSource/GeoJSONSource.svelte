<script lang="ts">
	// See: https://maplibre.org/maplibre-gl-js/docs/API/classes/GeoJSONSource/
	import { type GeoJSONSourceSpecification } from 'maplibre-gl';
	import MapSource from '../Source/MapSource.svelte';

	interface GeoJSONSourceProps {
		id: string;
		/**
		 * GeoJSON object or URL
		 */
		data: GeoJSON.GeoJSON | string;
		/**
		 * Attribution string for your data, usually rendered using an `<AttributionControl>`
		 */
		attribution?: string;
		maxZoom?: number;
	}

	const { maxZoom = 24, id, data, attribution = '' }: GeoJSONSourceProps = $props();

	const sourceSpec: GeoJSONSourceSpecification = {
		type: 'geojson',
		maxzoom: maxZoom,
		attribution,
		data
	};
</script>

<MapSource {id} {sourceSpec} />
