<script lang="ts">
	import type {
		AddLayerObject,
		FillLayoutProps,
		FillPaintProps,
		LineLayoutProps,
		LinePaintProps
	} from 'maplibre-gl';
	import { getMapContext } from '../Map/context.svelte.ts';
	import { onDestroy } from 'svelte';

	interface MapVectorLayerProps {
		id: string;
		sourceId: string;
		sourceLayer: string;
		type: 'line' | 'fill';
		placeBelow: string;
		visible?: boolean;
		minZoom?: number;
		maxZoom?: number;
		paint?: LinePaintProps | FillPaintProps;
		layout?: LineLayoutProps | FillLayoutProps;
	}
	const {
		id,
		sourceId,
		sourceLayer,
		visible = true,
		placeBelow = 'label-place-capital',
		type,
		paint,
		layout,
		minZoom = 0,
		maxZoom = 24
	}: MapVectorLayerProps = $props();

	const { map, styleLoaded } = $derived(getMapContext());
	let beforeId: string | undefined = $state();

	const layerSpec = {
		id,
		type,
		source: sourceId,
		'source-layer': sourceLayer,
		layout: $state.snapshot(layout) ?? {},
		paint: $state.snapshot(paint) ?? {},
		minzoom: minZoom,
		maxzoom: maxZoom
	} as AddLayerObject;

	$effect(() => {
		if (map && styleLoaded) {
			const style = map.getStyle();
			beforeId = style.layers.find((l) => {
				return l.id === placeBelow;
			})?.id;
		}
	});
	$effect(() => {
		if (map && styleLoaded && beforeId) {
			console.log(`Rendering layer ${id}`);
			map.addLayer(layerSpec, beforeId);
		}
	});

	onDestroy(() => {
		if (map && map.getLayer(id)) map.removeLayer(id);
	});
</script>
