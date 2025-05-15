<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { type Map, type SourceSpecification } from 'maplibre-gl';
	import { getMapContext, updatedSourceContext } from '../Map/context.svelte.ts';
	import { addSource, removeSource } from './source.js';

	interface MapSourceProps {
		id: string;
		url?: string;
		data?: string;
		minZoom?: number;
		maxZoom?: number;
		tileSize?: number;
		sourceSpec: SourceSpecification;
		onLoad?: (url?: string, data?: string, map: Map) => undefined;
		children?: Snippet;
	}

	const { id, sourceSpec, children }: MapSourceProps = $props();

	const { map, loaded: mapLoaded } = $derived(getMapContext());
	let loaded = $state(false);

	const sleep = (ms: number) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	const pollSourceLoaded = async () => {
		await sleep(10);
		if (map.isSourceLoaded(id)) {
			console.log(`Source ${id} loaded`);
			loaded = true;
		} else {
			pollSourceLoaded();
		}
	};

	$effect(() => {
		if (mapLoaded) {
			map.addSource(id, sourceSpec);
			pollSourceLoaded();
		}
	});

	onDestroy(async () => {
		if (mapLoaded) {
			map.removeSource(id);
		}
	});
</script>

{#if loaded}
	{@render children?.()}
{/if}
