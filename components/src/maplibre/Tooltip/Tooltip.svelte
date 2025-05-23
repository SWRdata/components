<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import maplibre, { type Listener, type LngLatLike } from 'maplibre-gl';
	import { getMapContext } from '../context.svelte.js';
	import { resetPopupEventListener } from '../utils';

	interface TooltipProps {
		position: LngLatLike | undefined;
		children?: Snippet;
		maxWidth?: number;
		showCloseButton?: boolean;
		/**
		 * Close the tooltip if the user clicks anywhere on the map
		 */
		closeOnClick?: boolean;
		/**
		 * y axis offset (px)
		 */
		offset?: number;
		/**
		 * Toggle mouse events on the tooltip element. Should be false if the tooltip appears on hover to avoid flickering.
		 */
		mouseEvents?: boolean;
		onClose?: Listener | undefined;
		onOpen?: Listener | undefined;
	}

	let {
		position,
		children,
		offset = 20,
		maxWidth = 360,
		showCloseButton = false,
		closeOnClick = true,
		mouseEvents = false,
		onClose,
		onOpen
	}: TooltipProps = $props();

	const { map } = $derived(getMapContext());

	let tooltip = new maplibre.Popup({
		closeButton: showCloseButton,
		closeOnClick: closeOnClick,
		maxWidth: `${maxWidth}px`,
		offset: offset
	});

	let el: Node | undefined = $state();

	$effect(() => {
		if (position && el && map) {
			tooltip.setLngLat(position).setDOMContent(el).addTo(map);
		} else {
			tooltip.remove();
		}
	});

	// Bind events
	$effect(() => resetPopupEventListener(tooltip, 'open', onOpen));
	$effect(() => resetPopupEventListener(tooltip, 'close', onClose));

	onDestroy(() => tooltip.remove());
</script>

<div bind:this={el} class="container" class:mouseEvents>
	{@render children?.()}
</div>

<style>
	.container {
		background: white;
		padding: 0.65em;
		border-radius: 2px;
		border: 1px solid rgba(0, 0, 0, 0.75);
		filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.1));
		pointer-events: none;
	}

	.mouseEvents {
		pointer-events: all;
	}

	:global {
		.maplibregl-popup {
			top: 0;
			left: 0;
			display: flex;
			position: absolute;
			will-change: transform;
		}
		.maplibregl-popup-anchor-top,
		.maplibregl-popup-anchor-top-left,
		.maplibregl-popup-anchor-top-right {
			flex-direction: column;
		}
		.maplibregl-popup-anchor-bottom,
		.maplibregl-popup-anchor-bottom-left,
		.maplibregl-popup-anchor-bottom-right {
			flex-direction: column-reverse;
		}

		.maplibregl-popup-anchor-left {
			flex-direction: row;
		}
		.maplibregl-popup-anchor-right {
			flex-direction: row-reverse;
		}
		.maplibregl-popup-anchor-bottom .maplibregl-popup-tip {
			transform: translateY(50%) rotate(45deg);
			align-self: center;
		}
		.maplibregl-popup-anchor-top .maplibregl-popup-tip {
			transform: translateY(-50%) rotate(-135deg);
			align-self: center;
		}

		.maplibregl-popup-anchor-left .maplibregl-popup-tip {
			transform: translateX(-50%) rotate(135deg);
			align-self: center;
		}
		.maplibregl-popup-anchor-top-left .maplibregl-popup-tip {
			transform: translateY(1em) translateX(-50%) rotate(135deg);
		}
		.maplibregl-popup-anchor-bottom-left .maplibregl-popup-tip {
			transform: translateY(-1em) translateX(-50%) rotate(135deg);
		}
		.maplibregl-popup-anchor-right .maplibregl-popup-tip {
			transform: translateX(50%) rotate(-45deg);
			align-self: center;
		}
		.maplibregl-popup-anchor-top-right .maplibregl-popup-tip {
			transform: translateX(-1em) translateY(-50%) rotate(-135deg);
			align-self: flex-end;
		}
		.maplibregl-popup-anchor-bottom-right .maplibregl-popup-tip {
			transform: translateX(-1em) translateY(50%) rotate(45deg);
			align-self: flex-end;
		}

		.maplibregl-popup-close-button {
			background-color: transparent;
			border: 0;
			cursor: pointer;
			position: absolute;
			top: 0.45em;
			right: 0.45em;
			display: flex;
			border-radius: var(--br-small);
			justify-content: center;
			align-items: center;
			padding-bottom: 0.1em;
			border: 1px solid var(--violet-dark-5);
			font-size: 1.2rem;
			width: 1em;
			height: 1em;
			z-index: 100;
		}

		.maplibregl-popup-close-button:hover,
		.maplibregl-popup-close-button:focus {
			background: rgb(245, 245, 245);
		}

		.maplibregl-popup-tip {
			width: 0.6rem;
			height: 0.6rem;
			background: white;
			position: absolute;
			border-right: 1px solid rgba(0, 0, 0, 0.75);
			border-bottom: 1px solid rgba(0, 0, 0, 0.75);
			z-index: 10;
		}
	}
</style>
