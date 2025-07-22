<script lang="ts">
	// See: https://maplibre.org/maplibre-gl-js/docs/API/classes/GeoJSONSource/
	import { type Snippet } from 'svelte';
	import { type GeoJSONSourceSpecification } from 'maplibre-gl';
	import MapSource from '../Source/MapSource.svelte';

	interface GeoJSONSourceProps {
		id: string;
		maxzoom?: number;
		data: GeoJSON.GeoJSON | string;
		attribution?: string;
		children?: Snippet;
	}

	const { maxzoom = 24, id, data, attribution }: GeoJSONSourceProps = $props();

	const sourceSpec: GeoJSONSourceSpecification = {
		type: 'geojson',
		data,
		maxzoom,
		attribution
	};
</script>

<MapSource {id} {sourceSpec} />
