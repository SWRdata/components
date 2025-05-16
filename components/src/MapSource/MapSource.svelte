<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { type Map, type Source, type SourceSpecification } from 'maplibre-gl';
	import { getMapContext, createSourceContext } from '../Map/context.svelte.ts';

	type Source = maplibregl.VectorTileSource;

	interface MapSourceProps {
		id: string;
		sourceSpec: SourceSpecification;
		source?: Source;
		onLoad?: (map: Map, url?: string, data?: string) => undefined;
		children?: Snippet;
	}

	let { id, sourceSpec, source = $bindable(), children }: MapSourceProps = $props();
	let firstRun = true;

	// Get map context
	const { map, styleLoaded } = $derived(getMapContext());

	// Create source context
	const sourceContext = createSourceContext();

	// 1. Add the source to the map using the spec, then get the
	// actual source object back from the map instance
	$effect(() => {
		if (map && styleLoaded) {
			// See: https://svelte.dev/docs/svelte/$state#$state.snapshot
			map.addSource(id, $state.snapshot(sourceSpec) as SourceSpecification);
			source = map.getSource(id);
			firstRun = true;
		}
	});

	// 2. Do extra stuff with the source object
	$effect(() => {
		if (source) {
			console.log(`Got source object for ${id}`);
		}
	});

	$effect(() => {
		source;
		firstRun = false;
	});

	onDestroy(() => {
		map?.removeSource(id);
		source = undefined;
	});
</script>

{@render children?.()}
