<script lang="ts">
	import { type AddLayerObject } from 'maplibre-gl';

	import { getMapContext } from '../context.svelte.js';
	import { onDestroy } from 'svelte';

	interface HillshadeLayerProps extends Omit<
		maplibregl.HillshadeLayerSpecification,
		'id' | 'source' | 'source-layer' | 'type'
	> {
		id: string;
		sourceId: string;
		sourceLayer?: string;
		placeBelow?: string;
		visible?: boolean;
		minZoom?: number;
		maxZoom?: number;
	}
	const {
		id,
		sourceId,
		sourceLayer,
		placeBelow,
		paint,
		layout,
		minZoom = 0,
		maxZoom = 24,
	}: HillshadeLayerProps = $props();

	const ctx = getMapContext();

	const layerSpec = $derived({
		id,
		type: "hillshade",
		source: sourceId,
		'source-layer': sourceLayer || '',
		layout: layout ?? {},
		paint: paint ?? {},
		minzoom: minZoom,
		maxzoom: maxZoom
	}) as AddLayerObject;

	$effect(() => {
		ctx.waitForStyleLoaded((m) => {
			ctx.addLayer(layerSpec, placeBelow);
		});
	});
	onDestroy(() => {
		if (ctx.map && ctx.map.getLayer(id)) ctx.map.removeLayer(id);
	});
</script>
