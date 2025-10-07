<script lang="ts">
	import {
		type AddLayerObject,
		type CircleLayoutProps,
		type CirclePaintProps,
		type FillLayoutProps,
		type FillPaintProps,
		type LineLayoutProps,
		type SymbolPaintProps,
		type SymbolLayoutProps,
		type LinePaintProps,
		type MapGeoJSONFeature,
		type MapLayerMouseEvent
	} from 'maplibre-gl';

	import { getMapContext } from '../context.svelte.js';
	import { onDestroy } from 'svelte';
	import { resetLayerEventListener } from '../utils.js';

	interface VectorLayerProps {
		id: string;
		sourceId: string;
		sourceLayer?: string;
		/**
		 * Maplibre [filter expression](https://maplibre.org/maplibre-style-spec/layers/#filter)
		 */
		filter?: any[];
		type: 'line' | 'fill' | 'circle' | 'symbol';
		placeBelow?: string;
		visible?: boolean;
		minZoom?: number;
		maxZoom?: number;
		paint?: LinePaintProps | FillPaintProps | CirclePaintProps | SymbolPaintProps;
		layout?: LineLayoutProps | FillLayoutProps | CircleLayoutProps | SymbolLayoutProps;
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
		visible = true,
		placeBelow = 'label-place-major-city',
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

	const { map, styleLoaded } = $derived(getMapContext());

	let beforeId: string | undefined = $state();
	let prevSelected: string | number | undefined = $state();
	let prevHovered: string | number | undefined = $state();

	const layerSpec = {
		id,
		type,
		...(filter ? { filter } : {}),
		source: sourceId,
		'source-layer': sourceLayer || '',
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
			map.addLayer(layerSpec, beforeId);
		}
	});

	$effect(() => resetLayerEventListener(map, 'click', id, onclick));
	$effect(() => resetLayerEventListener(map, 'mousemove', id, onmousemove));
	$effect(() => resetLayerEventListener(map, 'mouseleave', id, onmouseleave));

	// Set hovered feature state
	$effect(() => {
		if (styleLoaded) {
			if (hovered) {
				if (prevHovered || prevHovered === 0) {
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
				if (prevHovered || prevHovered === 0) {
					map?.setFeatureState(
						{ source: sourceId, sourceLayer: sourceLayer, id: prevHovered },
						{ hovered: false }
					);
				}
			}
		}
	});

	// Set selected feature state
	$effect(() => {
		if (styleLoaded) {
			if (selected) {
				if (prevSelected || prevSelected === 0) {
					map?.setFeatureState(
						{ source: sourceId, sourceLayer: sourceLayer, id: prevSelected },
						{ selected: false }
					);
				}
				map?.setFeatureState(
					{ source: sourceId, sourceLayer: sourceLayer, id: selected.id },
					{ selected: true }
				);
				prevSelected = selected.id;
			} else {
				if (prevSelected || prevSelected === 0) {
					map?.setFeatureState(
						{ source: sourceId, sourceLayer: sourceLayer, id: prevSelected },
						{ selected: false }
					);
				}
			}
		}
	});

	onDestroy(() => {
		if (map && map.getLayer(id)) map.removeLayer(id);
	});
</script>
