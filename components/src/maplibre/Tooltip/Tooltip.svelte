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

<style lang="scss">
	.container {
		background: white;
		padding: 0.75em;
		border: 1px solid rgba(0, 0, 0, 0.75);
		filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.1));
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
			position: absolute;
			top: 0.35em;
			right: 0.35em;
			cursor: pointer;
			border-radius: 2px;
			display: flex;
			justify-content: center;
			align-items: center;
			padding-bottom: 0.15em;
			font-size: 1.2rem;
			width: 1.1em;
			height: 1.1em;
			z-index: 100;
			background: white;
			color: var(--gray-dark-5);
			border: 1px solid var(--gray-dark-5);
		}

		.maplibregl-popup-close-button:hover,
		.maplibregl-popup-close-button:focus-visible {
			background: var(--gray-light-5);
		}

		.maplibregl-popup-tip {
			width: 0.65rem;
			height: 0.65rem;
			background: white;
			position: absolute;
			border-right: 1px solid var(--gray-dark-5);
			border-bottom: 1px solid var(--gray-dark-5);
			z-index: 10;
		}
	}
</style>
