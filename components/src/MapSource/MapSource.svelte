<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { type VectorTileSource } from 'maplibre-gl';
	import { getMapContext, updatedSourceContext } from '../Map/context.svelte.ts';
	import { addSource, removeSource } from './source.js';

	interface MapSourceProps {
		id: string;
		type: 'vector' | 'geojson' | 'raster' | 'raster-dem';
		url?: string;
		minZoom?: number;
		maxZoom?: number;
		tileSize?: number;
		children?: Snippet;
	}

	const { minZoom = 0, maxZoom = 24, tileSize = 256, id, children }: MapSourceProps = $props();
	const { map } = $derived(getMapContext());
	let loaded = $state(false);
	let sourceObj: VectorTileSource | undefined = $state();
	const { source } = updatedSourceContext();

	onDestroy(async () => {
		if (source.value && map) {
			removeSource(map, source.value, sourceObj);
			source.value = undefined;
			sourceObj = undefined;
		}
	});
</script>

{#if loaded}
	{@render children?.()}
{/if}
