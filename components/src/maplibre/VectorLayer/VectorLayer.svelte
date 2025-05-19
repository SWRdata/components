<script lang="ts">
	import type {
		AddLayerObject,
		FillLayoutProps,
		FillPaintProps,
		LineLayoutProps,
		LinePaintProps,
		MapGeoJSONFeature,
		MapLayerMouseEvent
	} from 'maplibre-gl';

	import { getMapContext } from '../context.svelte.ts';
	import { onDestroy } from 'svelte';
	import { resetLayerEventListener } from '../utils.ts';

	interface VectorLayerProps {
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
		hovered?: MapGeoJSONFeature | undefined;

		onclick: (e: MapLayerMouseEvent) => any;
		onmousemove: (e: MapLayerMouseEvent) => any;
		onmouseleave: (e: MapLayerMouseEvent) => any;
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
		hovered = $bindable(),
		minZoom = 0,
		maxZoom = 24,
		onclick,
		onmousemove,
		onmouseleave
	}: VectorLayerProps = $props();

	const { map, styleLoaded } = $derived(getMapContext());
	let beforeId: string | undefined = $state();
	let prevSelected: string | number | undefined = $state();
	let prevHovered: string | number | undefined = $state();

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

	$effect(() => resetLayerEventListener(map, 'click', id, onclick));
	$effect(() => resetLayerEventListener(map, 'mousemove', id, onmousemove));
	$effect(() => resetLayerEventListener(map, 'mouseleave', id, onmouseleave));

	$effect(() => {
		if (styleLoaded) {
			if (hovered) {
				if (prevHovered) {
					map?.setFeatureState(
						{ source: sourceId, sourceLayer: sourceLayer, id: prevHovered },
						{ hovered: false }
					);
				}
				map?.setFeatureState(
					{ source: sourceId, sourceLayer: sourceLayer, id: hovered.id },
					{ hovered: true }
				);
				prevHovered = hovered.id;
			} else {
				if (prevHovered) {
					map?.setFeatureState(
						{ source: sourceId, sourceLayer: sourceLayer, id: prevHovered },
						{ hovered: false }
					);
				}
			}
		}
	});

	onDestroy(() => {
		if (map && map.getLayer(id)) map.removeLayer(id);
	});
</script>
