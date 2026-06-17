<script lang="ts">
	import { onDestroy, onMount, type Snippet } from 'svelte';
	import { type GeoJSONSourceSpecification, type Map, type RasterDEMSourceSpecification, type VectorSourceSpecification } from 'maplibre-gl';
	import { getMapContext } from '../context.svelte.js';

	interface MapSourceProps {
		id: string;
		source?: maplibregl.VectorTileSource | maplibregl.GeoJSONSource;
		sourceSpec: VectorSourceSpecification | GeoJSONSourceSpecification | RasterDEMSourceSpecification;
		onLoad?: (map: Map, url?: string, data?: string) => undefined;
		children?: Snippet;
	}

	let { id, sourceSpec, source = $bindable(), children }: MapSourceProps = $props();

	const ctx = getMapContext();
	let firstRun = $state(true);

	$effect(() => {
		ctx.waitForStyleLoaded(() => {
			ctx.addSource(id, sourceSpec);
		});
		firstRun = false;
	});

	$effect(() => {
		if (!firstRun && source && source.type === 'geojson') {
			source.setData(sourceSpec.data);
		}
	});

	$effect(() => {
		if (!firstRun && source && source.type === 'vector') {
			source.setTiles(sourceSpec.tiles);
		}
	});

	$effect(() => {
		if (!firstRun && source) {
			source.setUrl(sourceSpec.url);
		}
	});

	onDestroy(() => {
		ctx.removeSource(id);
	});
</script>

{#if !firstRun}
	{@render children?.()}
{/if}
