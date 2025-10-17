<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { type Map, type SourceSpecification } from 'maplibre-gl';
	import { getMapContext, createSourceContext } from '../context.svelte.js';

	type Source = maplibregl.VectorTileSource | maplibregl.GeoJSONSource;

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
		if (map && styleLoaded && firstRun) {
			map.addSource(id, $state.snapshot(sourceSpec) as SourceSpecification);
			source = map.getSource(id);
			firstRun = false;
		}
	});

	// 2. Do extra stuff with the source object
	$effect(() => {
		if (source && sourceSpec.type === 'geojson') {
			if (firstRun === false) {
				source.setData(sourceSpec.data);
			}
		}
	});

	onDestroy(() => {
		if (map && styleLoaded) {
			const layers = map?.getStyle().layers;
			layers
				.filter((l) => l.type !== 'background' && l.source == id)
				.forEach((l) => {
					map?.removeLayer(l.id);
				});
			map.removeSource(id);
			source = undefined;
		}
	});
</script>

{@render children?.()}
