<script lang="ts">
	import maplibre, {
		type MapLibreEvent,
		type ProjectionSpecification,
		type StyleSpecification
	} from 'maplibre-gl';
	import { onMount, onDestroy, type Snippet, getContext, hasContext } from 'svelte';
	import { createMapContext, MapContext } from '../context.svelte.js';
	import { type Location } from '../types';
	import FallbackStyle from './FallbackStyle';
	import { derived } from 'svelte/store';

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
		mapContext?: MapContext;
		onmovestart?: (e: MapLibreEvent) => null;
		onmoveend?: (e: MapLibreEvent) => null;
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
		initialLocation: receivedInitialLocation,
		// Future: This should become bindable.readonly when that becomes
		// available, see: https://github.com/sveltejs/svelte/issues/7712
		mapContext = $bindable(),
		onmoveend,
		onmovestart
	}: MapProps = $props();

	let container: HTMLElement;

	// Merge initial location with default object so individual
	// properties (like pitch) can be omitted by the caller
	let initialLocation = {
		lat: 51.3,
		lng: 10.2,
		zoom: 5,
		pitch: 0,
		...receivedInitialLocation
	};

	mapContext = createMapContext();
	if (getContext('initialLocation') !== undefined && getContext('initialLocation') !== false) {
		initialLocation = getContext('initialLocation');
	}

	onMount(() => {
		mapContext.map = new maplibre.Map({
			container,
			style,
			minZoom,
			maxZoom,
			bearing,
			attributionControl: false, // Added via component
			center: [initialLocation.lng, initialLocation.lat],
			zoom: initialLocation.zoom,
			pitch: initialLocation.pitch,
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

		if (onmoveend) {
			mapContext.map.on('moveend', onmoveend);
		}
		if (onmovestart) {
			mapContext.map.on('movestart', onmovestart);
		}
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

	const debugValues = $derived(
		Object.entries({ ...center, zoom, pitch, allowZoom, allowRotation })
	);
	const handleDebugValueClick = (e: MouseEvent) => {
		if (e.target) {
			const t = e.target as HTMLElement;
			const s = t.innerText;
			navigator.clipboard.writeText(s);
		}
	};
</script>

<div bind:this={container} class="container" data-testid="map-container">
	{#if mapContext.map}
		{#if children}
			{@render children()}
		{/if}
	{/if}
	{#if showDebug}
		<ul class="debug">
			{#each debugValues as [key, value]}
				<li>
					{key}:
					<button onclick={handleDebugValueClick}
						>{value?.toLocaleString('en', { maximumSignificantDigits: 6 })}</button
					>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss">
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
		button {
			appearance: none;
			background: transparent;
			font-family: inherit;
			color: inherit;
			border: 0;
			cursor: pointer;
			&:hover,
			&:focus-visible {
				text-decoration: underline;
			}
		}
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

		.maplibregl-canvas-container.maplibregl-interactive {
			cursor: grab;
			user-select: none;
		}

		.maplibregl-canvas-container.maplibregl-interactive.maplibregl-track-pointer {
			cursor: pointer;
		}

		.maplibregl-canvas-container.maplibregl-interactive:active {
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
		.maplibregl-ctrl-bottom-left,
		.maplibregl-ctrl-bottom-right,
		.maplibregl-ctrl-top-left,
		.maplibregl-ctrl-top-right {
			position: absolute;
			z-index: 2;
			display: flex;
			flex-flow: column;
			gap: 0.75em;
			align-items: flex-start;
		}

		.maplibregl-ctrl-top-left {
			left: 0.5em;
			top: 0.5em;
		}

		.maplibregl-ctrl-top-right {
			right: 0;
			top: 0;
		}

		.maplibregl-ctrl-bottom-left {
			bottom: 0.5em;
			left: 0.5em;
		}

		.maplibregl-ctrl-bottom-right {
			bottom: 0.5em;
			right: 0.5em;
		}

		.maplibregl-ctrl {
			pointer-events: auto;
			transform: translate(0);
		}

		.maplibregl-ctrl-group {
			background: white;
			border: 1px solid rgba(0, 0, 0, 0.75);
			box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.075);
			border-radius: var(--br-small);
			overflow: hidden;
		}

		.maplibregl-ctrl-group button {
			background-color: transparent;
			border: 0;
			box-sizing: border-box;
			cursor: pointer;
			display: block;
			height: 29px;
			outline: none;
			padding: 0;
			width: 29px;
		}

		.maplibregl-ctrl-group button + button {
			border-top: 1px solid rgba(0, 0, 0, 0.35);
		}

		.maplibregl-ctrl button .maplibregl-ctrl-icon {
			background-position: 50%;
			background-repeat: no-repeat;
			display: block;
			height: 100%;
			width: 100%;
		}

		.maplibregl-ctrl button:disabled {
			cursor: not-allowed;
		}

		.maplibregl-ctrl button:disabled .maplibregl-ctrl-icon {
			opacity: 0.5;
		}

		.maplibregl-ctrl button:not(:disabled):hover {
			background-color: var(--gray-light-5);
		}

		.maplibregl-ctrl-group button:focus:focus-visible {
			box-shadow: 0 0 2px 2px #0096ff;
		}

		.maplibregl-ctrl-group button:focus:not(:focus-visible) {
			box-shadow: none;
		}

		.maplibregl-ctrl-group button:focus:first-child {
			border-radius: 4px 4px 0 0;
		}

		.maplibregl-ctrl-group button:focus:last-child {
			border-radius: 0 0 4px 4px;
		}

		.maplibregl-ctrl-group button:focus:only-child {
			border-radius: inherit;
		}
		.maplibregl-marker {
			left: 0;
			top: 0;
			position: absolute;
			will-change: transform;
		}
		.maplibregl-marker path {
			fill: var(--violet-dark-5);
		}
	}
</style>
