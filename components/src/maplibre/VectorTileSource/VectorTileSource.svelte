<script lang="ts">
	import { type SourceSpecification } from 'maplibre-gl';
	import MapSource from '../Source/MapSource.svelte';

	interface VectorTileSourceProps {
		id: string;
		url: string;
		minZoom?: number;
		maxZoom?: number;
		/**
		 * Attribution string for your data, usually rendered using an `<AttributionControl>`
		 */
		attribution?: string;
	}

	const { minZoom = 0, maxZoom = 24, id, url, attribution = '' }: VectorTileSourceProps = $props();

	const sourceSpec: SourceSpecification = {
		type: 'vector',
		tiles: [url],
		maxzoom: maxZoom,
		minzoom: minZoom,
		attribution
	};
</script>

<MapSource {id} {sourceSpec} />
