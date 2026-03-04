<script lang="ts">
	import { type VectorSourceSpecification } from 'maplibre-gl';
	import MapSource from '../Source/MapSource.svelte';

	interface VectorTileSourceProps {
		id: string;
		url?: string;
		tiles?: string[];
		minZoom?: number;
		maxZoom?: number;
		/**
		 * Attribution string for your data, usually rendered using an `<AttributionControl>`
		 */
		attribution?: string;
	}

	const {
		minZoom = 0,
		maxZoom = 24,
		id,
		url = '',
		tiles,
		attribution = ''
	}: VectorTileSourceProps = $props();

	// Workaround for https://github.com/versatiles-org/versatiles-rs/issues/184
	// Drop when/if this lands: https://github.com/maplibre/maplibre-gl-js/issues/182

	async function fetchTileJSON(url) {
		const res = await fetch(url);
		const data = await res.json();
		console.log(data);
	}

	if (url) {
		fetchTileJSON(url);
	}

	const sourceSpec: VectorSourceSpecification = {
		type: 'vector',
		...(tiles ? tiles : {}),
		maxzoom: maxZoom,
		minzoom: minZoom,
		attribution
	};
</script>

<MapSource {id} {sourceSpec} />
