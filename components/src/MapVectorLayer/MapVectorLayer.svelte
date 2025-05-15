<script lang="ts">
	import type { LineLayoutProps, LinePaintProps } from 'maplibre-gl';
	import { getMapContext, getSourceContext, setLayerContext } from '../Map/context.svelte.ts';
	import { onDestroy } from 'svelte';

	interface MapVectorLayerProps {
		id: string;
		/**
		 * ID for a VectorTileSource
		 */
		sourceId: string;
		visible?: boolean;
		placeBelow?: string;
		minZoom?: number;
		maxZoom?: number;
		paint?: LinePaintProps;
		layout?: LineLayoutProps;
	}
	const {
		id,
		sourceId,
		visible = true,
		placeBelow = 'label-place-capital',
		paint,
		layout,
		minZoom = 0,
		maxZoom = 24
	}: MapVectorLayerProps = $props();

	const { map, loaded: mapLoaded } = $derived(getMapContext());
	const { source } = $derived(getSourceContext());
	setLayerContext(id);

	$effect(() => {
		if (mapLoaded) {
			console.log(`Rendering layer ${id}`);
			map.addLayer({ id: id, type: 'line', 'source-layer': sourceId, source: source });
		}
	});

	onDestroy(async () => {
		if (map && map.getLayer(id)) map.removeLayer(id);
	});
</script>

<style>
</style>
