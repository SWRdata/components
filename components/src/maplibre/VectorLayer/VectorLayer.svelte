<script lang="ts">
	import {
		type AddLayerObject,
		type MapGeoJSONFeature,
		type MapLayerMouseEvent,
		type FilterSpecification
	} from 'maplibre-gl';

	import { getMapContext } from '../context.svelte.js';
	import { onDestroy, onMount } from 'svelte';
	import { resetLayerEventListener } from '../utils.js';

	interface VectorLayerProps extends Omit<
		maplibregl.LayerSpecification,
		'id' | 'source' | 'source-layer'
	> {
		id: string;
		sourceId: string;
		sourceLayer?: string;
		filter?: FilterSpecification;
		type: 'line' | 'fill' | 'circle' | 'symbol';
		placeBelow?: string;
		visible?: boolean;
		minZoom?: number;
		maxZoom?: number;
		hovered?: MapGeoJSONFeature | undefined;
		selected?: MapGeoJSONFeature | undefined;

		onclick?: (e: MapLayerMouseEvent) => any;
		onmousemove?: (e: MapLayerMouseEvent) => any;
		onmouseleave?: (e: MapLayerMouseEvent) => any;
	}
	const {
		id,
		sourceId,
		sourceLayer,
		filter,
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
	}: VectorLayerProps = $props();

	const ctx = getMapContext();

	let beforeId: string | undefined = $state();
	let prevSelected: string | number | undefined = $state();
	let prevHovered: string | number | undefined = $state();

	const layerSpec = $derived({
		id,
		type,
		source: sourceId,
		'source-layer': sourceLayer || '',
		...(filter ? { filter } : {}),
		layout: layout ?? {},
		paint: paint ?? {},
		minzoom: minZoom,
		maxzoom: maxZoom
	}) as AddLayerObject;

	$effect(() => {
		console.log('layer effect');

		ctx.waitForStyleLoaded((m) => {
			ctx.addLayer(layerSpec, placeBelow);
		});
	});

	// Make filter reactive
	$effect(() => {
		if (ctx.map && ctx.styleLoaded && filter) {
			ctx.map.setFilter(id, filter);
		}
	});

	// $effect(() => resetLayerEventListener(map, 'click', id, onclick));
	// $effect(() => resetLayerEventListener(map, 'mousemove', id, onmousemove));
	// $effect(() => resetLayerEventListener(map, 'mouseleave', id, onmouseleave));

	// // Set hovered feature state
	// $effect(() => {
	// 	if (styleLoaded) {
	// 		if (hovered) {
	// 			if (prevHovered || prevHovered === 0) {
	// 				map?.setFeatureState(
	// 					{ source: sourceId, sourceLayer: sourceLayer, id: prevHovered },
	// 					{ hovered: false }
	// 				);
	// 			}
	// 			map?.setFeatureState(
	// 				{ source: sourceId, sourceLayer: sourceLayer, id: hovered.id },
	// 				{ hovered: true }
	// 			);
	// 			prevHovered = hovered.id;
	// 		} else {
	// 			if (prevHovered || prevHovered === 0) {
	// 				map?.setFeatureState(
	// 					{ source: sourceId, sourceLayer: sourceLayer, id: prevHovered },
	// 					{ hovered: false }
	// 				);
	// 			}
	// 		}
	// 	}
	// });

	// // Set selected feature state
	// $effect(() => {
	// 	if (styleLoaded) {
	// 		if (selected) {
	// 			if (prevSelected || prevSelected === 0) {
	// 				map?.setFeatureState(
	// 					{ source: sourceId, sourceLayer: sourceLayer, id: prevSelected },
	// 					{ selected: false }
	// 				);
	// 			}
	// 			map?.setFeatureState(
	// 				{ source: sourceId, sourceLayer: sourceLayer, id: selected.id },
	// 				{ selected: true }
	// 			);
	// 			prevSelected = selected.id;
	// 		} else {
	// 			if (prevSelected || prevSelected === 0) {
	// 				map?.setFeatureState(
	// 					{ source: sourceId, sourceLayer: sourceLayer, id: prevSelected },
	// 					{ selected: false }
	// 				);
	// 			}
	// 		}
	// 	}
	// });

	onDestroy(() => {
		if (ctx.map && ctx.map.getLayer(id)) ctx.map.removeLayer(id);
	});
</script>
