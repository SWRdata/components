<script lang="ts">
	import maplibre, { type StyleSpecification, type Map } from 'maplibre-gl';
	import { setContext, onMount, onDestroy, type Snippet } from 'svelte';
	import { SWRDataBaseLight } from '../MapStyle';
	import { dev } from '$app/environment';

	interface Location {
		lat: number;
		lng: number;
		zoom: number;
	}

	interface MapProps {
		style?: StyleSpecification | string;
		minZoom?: number;
		maxZoom?: number;
		zoom?: number;
		center?: maplibre.LngLat;
		pitch?: number;
		bearing?: number;
		loading?: boolean;
		allowRotation?: boolean;
		initialLocation?: Location;
		options?: any;
		children?: Snippet;
	}

	let {
		children,
		options,
		style = SWRDataBaseLight,
		minZoom = 0,
		maxZoom = 14.99,
		zoom = $bindable(),
		center = $bindable(),
		pitch = $bindable(),
		bearing = $bindable(),
		loading = $bindable(true),
		allowRotation = false,
		initialLocation = { lat: 51.5, lng: 10, zoom: 5 }
	}: MapProps = $props();

	let container: HTMLElement;
	let map: Map;

	setContext('map', {
		getMap: () => map
	});

	onMount(() => {
		map = new maplibre.Map({
			container,
			style,
			minZoom,
			maxZoom,
			attributionControl: false,
			center: [initialLocation.lng, initialLocation.lat],
			zoom: initialLocation.zoom,
			...options
		});

		if (!allowRotation) {
			map.touchZoomRotate.disableRotation();
		}

		map.on('load', () => {
			zoom = map.getZoom();
			center = map.getCenter();
			pitch = map.getPitch();
			bearing = map.getBearing();
		});

		map.on('moveend', () => {
			zoom = map.getZoom();
			center = map.getCenter();
			pitch = map.getPitch();
			bearing = map.getBearing();
		});
	});

	onDestroy(async () => {
		if (map) map.remove();
	});

	$effect(() => {
		if (map) map.setStyle(style);
	});
</script>

<div bind:this={container} class="container">
	{#if children}
		{@render children()}
	{/if}
	{#if dev}
		<div class="debug">
			{JSON.stringify({ ...center, zoom })}
		</div>
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
		background: black;
		color: white;
		z-index: 1000;
		font-family: monospace;
	}

	:global {
		.maplibregl-map {
			overflow: hidden;
			position: relative;
		}

		.maplibregl-canvas {
			left: 0;
			position: absolute;
			top: 0;
		}

		.maplibregl-map:fullscreen {
			height: 100%;
			width: 100%;
		}

		.maplibregl-canvas-container.maplibregl-interactive,
		.maplibregl-ctrl-group button.maplibregl-ctrl-compass {
			cursor: grab;
			user-select: none;
		}

		.maplibregl-canvas-container.maplibregl-interactive.maplibregl-track-pointer {
			cursor: pointer;
		}

		.maplibregl-canvas-container.maplibregl-interactive:active,
		.maplibregl-ctrl-group button.maplibregl-ctrl-compass:active {
			cursor: grabbing;
		}

		.maplibregl-canvas-container.maplibregl-touch-zoom-rotate,
		.maplibregl-canvas-container.maplibregl-touch-zoom-rotate .maplibregl-canvas {
			touch-action: pan-x pan-y;
		}

		.maplibregl-canvas-container.maplibregl-touch-drag-pan,
		.maplibregl-canvas-container.maplibregl-touch-drag-pan .maplibregl-canvas {
			touch-action: pinch-zoom;
		}

		.maplibregl-canvas-container.maplibregl-touch-zoom-rotate.maplibregl-touch-drag-pan,
		.maplibregl-canvas-container.maplibregl-touch-zoom-rotate.maplibregl-touch-drag-pan
			.maplibregl-canvas {
			touch-action: none;
		}
	}
</style>
