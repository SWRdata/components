<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import {
		VectorTileSource,
		type VectorSourceSpecification,
		type Map,
		type SourceSpecification
	} from 'maplibre-gl';
	import { getMapContext, createSourceContext, SourceContext } from '../context.svelte.js';

	type Source = maplibregl.VectorTileSource | maplibregl.GeoJSONSource;

	interface MapSourceProps {
		id: string;
		sourceSpec: SourceSpecification;
		source?: Source;
		onLoad?: (map: Map, url?: string, data?: string) => undefined;
		children?: Snippet;
	}

	let { id, sourceSpec, source = $bindable(), children }: MapSourceProps = $props();

	let firstRun = $state(true);

	// Get map context
	const { map, styleLoaded } = $derived(getMapContext());

	// Create source context
	const sourceContext = createSourceContext();

	// 1. Add the source to the map using the spec, then get the
	// actual source object back from the map instance
	$effect(() => {
		if (map && styleLoaded && firstRun) {
			map.addSource(id, $state.snapshot(sourceSpec));
			source = map.getSource(id);
			firstRun = false;
		}
	});

	$effect(() => {
		if (source && sourceSpec.type === 'geojson') {
			if (firstRun === false) {
				source.setData(sourceSpec.data);
			}
		}
	});

	$effect(() => {
		if (!firstRun && source instanceof VectorTileSource) {
			source.setTiles(sourceSpec.tiles);
		}
	});

	$effect(() => {
		if (!firstRun && source instanceof VectorTileSource) {
			source.setUrl(sourceSpec.url);
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
