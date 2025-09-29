<script lang="ts">
	import maplibre, {
		type LngLatBoundsLike,
		type MapLibreEvent,
		type ProjectionSpecification,
		type StyleSpecification
	} from 'maplibre-gl';
	import { onMount, onDestroy, type Snippet, getContext, hasContext } from 'svelte';
	import { createMapContext, MapContext } from '../context.svelte.js';
	import { type Location } from '../types';
	import FallbackStyle from './FallbackStyle';
	import { de } from './locale';

	interface MapProps {
		style?: StyleSpecification | string;
		/**
		 * The initial bounds of the map. If specified, it overrides initialLocation.
		 */
		initialBounds?: LngLatBoundsLike;
		maxBounds?: LngLatBoundsLike;
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
		/**
		 * Set the mouse cursor. `""` (empty string) restores Maplibre's default behaviour. See VectorLayer/Default for a common usage example
		 */
		cursor?: string;
		mapContext?: MapContext;
		/**
		 * Show "Use Ctrl + scroll to zoom" overlay
		 */
		cooperativeGestures?: boolean;
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
		cursor,
		initialBounds,
		maxBounds,
		initialLocation: receivedInitialLocation,
		// Future: This should become bindable.readonly when that becomes
		// available, see: https://github.com/sveltejs/svelte/issues/7712
		mapContext = $bindable(),
		cooperativeGestures = false,
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
			attributionControl: false,
			center: [initialLocation.lng, initialLocation.lat],
			bounds: initialBounds || null,
			maxBounds: maxBounds || null,
			zoom: initialLocation.zoom,
			pitch: initialLocation.pitch,
			cooperativeGestures,
			locale: de,
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
		if (mapContext.map) {
			mapContext.map.getCanvas().style.cursor = cursor ?? '';
		}
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

	const debugValues = $derived(Object.entries({ zoom, pitch, allowZoom, allowRotation }));
	const handleDebugValueClick = (e: MouseEvent) => {
		if (e.target) {
			const t = e.target as HTMLElement;
			const s = t.innerText;
			navigator.clipboard.writeText(s);
		}
	};
	const handleDebugCopyLocationClick = (e: MouseEvent) => {
		if (e.target) {
			const s = JSON.stringify({ lng: center?.lng, lat: center?.lat, zoom, pitch });
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
			<li>
				[{center?.lat.toFixed(2)}, {center?.lng.toFixed(2)}]
			</li>
			{#each debugValues as [key, value]}
				<li>
					{key}=<button onclick={handleDebugValueClick}
						>{value?.toLocaleString('en', { maximumSignificantDigits: 6 })}</button
					>
				</li>
			{/each}
			<li><button onclick={handleDebugCopyLocationClick}>[Copy Location]</button></li>
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
		background: rgba(0, 0, 0, 0.75);
		color: white;
		z-index: 1000;
		padding: 2px;
		font-size: 10px;
		font-family: monospace;
		display: flex;
		gap: 1em;
		li {
			list-style: none;
		}
		button {
			appearance: none;
			background: transparent;
			font-family: inherit;
			color: inherit;
			font-size: inherit;
			border: 0;
			text-transform: uppercase;
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
			background: var(--color-surfaceFill);
			border: 1px solid var(--color-textSecondary);
			box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.075);
			border-radius: var(--br-small);
			overflow: hidden;
		}

		.maplibregl-ctrl-group button {
			background-color: transparent;
			color: var(--color-textPrimary);
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
			border-top: 1px solid var(--color-surfaceBorder);
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
			background-color: var(--color-surfaceHover);
		}

		.maplibregl-ctrl-group button:focus:focus-visible {
			box-shadow: 0 0 2px 2px #0096ff;
		}

		.maplibregl-ctrl-group button:focus:not(:focus-visible) {
			box-shadow: none;
		}

		.maplibregl-ctrl-group button:focus:first-child {
			border-radius: 2px 2px 0 0;
		}

		.maplibregl-ctrl-group button:focus:last-child {
			border-radius: 0 0 2px 2px;
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
			fill: var(--color-textPrimary);
		}
		.maplibregl-cooperative-gesture-screen {
			align-items: center;
			font-family: var(--swr-sans);
			background: rgba(10, 10, 10, 0.4);
			text-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
			color: #fff;
			font-size: var(--fs-base);
			font-weight: 400;
			display: flex;
			inset: 0;
			justify-content: center;
			line-height: 1.2;
			opacity: 0;
			padding: 1rem;
			pointer-events: none;
			position: absolute;
			transition: opacity 1s ease 1s;
			z-index: 9999;
		}
		.maplibregl-cooperative-gesture-screen.maplibregl-show {
			opacity: 1;
			transition: opacity 100ms;
		}
		.maplibregl-cooperative-gesture-screen .maplibregl-mobile-message {
			display: none;
		}
		@media (hover: none), (pointer: coarse) {
			.maplibregl-cooperative-gesture-screen .maplibregl-desktop-message {
				display: none;
			}
			.maplibregl-cooperative-gesture-screen .maplibregl-mobile-message {
				display: block;
			}
		}
	}
</style>
