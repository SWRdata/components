<script lang="ts">
	import { type AddLayerObject } from 'maplibre-gl';

	import { getMapContext } from '../context.svelte.js';
	import { onDestroy } from 'svelte';
	import { resetLayerEventListener } from '../utils.js';

	interface HillshadeLayerProps extends Omit<
		maplibregl.HillshadeLayerSpecification,
		'id' | 'source' | 'source-layer'
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
		type,
		paint,
		layout,
		hovered = $bindable(),
		selected = $bindable(),
		minZoom = 0,
		maxZoom = 24,
		onclick,
		onmousemove,
		onmouseleave
	}: HillshadeLayerProps = $props();

	const ctx = getMapContext();
	let beforeId: string | undefined = $state();

	const layerSpec = $derived({
		id,
		type,
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
