<script lang="ts">
	import maplibre, { type ProjectionSpecification, type StyleSpecification } from 'maplibre-gl';
	import { onMount, onDestroy, type Snippet, getContext, hasContext } from 'svelte';
	import { createMapContext } from '../context.svelte.js';
	import { type Location } from '../types';
	import FallbackStyle from './FallbackStyle';
	import './Map.css';

	interface MapProps {
		style?: StyleSpecification | string;
		initialLocation?: Location;
		allowRotation?: boolean;
		allowZoom?: boolean;
		minZoom?: number;
		maxZoom?: number;
		zoom?: number;
		center?: maplibre.LngLat;
		pitch?: number;
		bearing?: number;
		loading?: boolean;
		projection?: ProjectionSpecification;
		showDebug?: boolean;
		options?: any;
		children?: Snippet;
	}

	let {
		children,
		options,
		style = FallbackStyle,
		minZoom = 0,
		maxZoom = 14.99,
		zoom = $bindable(),
		center = $bindable(),
		pitch = $bindable(0),
		bearing = $bindable(0),
		loading = $bindable(true),
		projection = { type: 'mercator' },
		allowRotation = false,
		allowZoom = true,
		showDebug = false,
		initialLocation = { lat: 51.3, lng: 10.2, zoom: 5 }
	}: MapProps = $props();

	let container: HTMLElement;

	const mapContext = createMapContext();
	if (getContext('initialLocation') !== undefined && getContext('initialLocation') !== false) {
		initialLocation = getContext('initialLocation');
	}

	onMount(() => {
		mapContext.map = new maplibre.Map({
			container,
			style,
			minZoom,
			maxZoom,
			pitch,
			bearing,
			attributionControl: false, // Added via component
			center: [initialLocation.lng, initialLocation.lat],
			zoom: initialLocation.zoom,
			...options
		});

		mapContext.map.on('load', () => {
			zoom = mapContext.map?.getZoom();
			center = mapContext.map?.getCenter();
			pitch = mapContext.map?.getPitch();
			bearing = mapContext.map?.getBearing();
		});

		mapContext.map.on('moveend', () => {
			zoom = mapContext.map?.getZoom();
			center = mapContext.map?.getCenter();
			pitch = mapContext.map?.getPitch();
			bearing = mapContext.map?.getBearing();
		});
	});

	onDestroy(async () => {
		if (mapContext.map) mapContext.map.remove();
	});

	$effect(() => {
		if (mapContext.map) mapContext.map.setStyle(style);
	});
	$effect(() => {
		if (mapContext.styleLoaded) {
			mapContext.map?.setProjection(projection);
		}
	});

	$effect(() => {
		if (allowZoom === false) {
			mapContext.map?.scrollZoom.disable();
		} else {
			mapContext.map?.scrollZoom.enable();
		}
	});
</script>

<div bind:this={container} class="container" data-testid="map-container">
	{#if mapContext.map}
		{#if children}
			{@render children()}
		{/if}
	{/if}
	{#if showDebug}
		<pre class="debug">
{Object.entries({ ...center, zoom, allowZoom, allowRotation })
				.map(([key, val]) => `${key}: ${val}`)
				.join('\n')}</pre>
	{/if}
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
	}

	.debug {
		position: absolute;
		top: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.9);
		color: white;
		z-index: 1000;
		padding: 2px;
		font-family: monospace;
	}
</style>
