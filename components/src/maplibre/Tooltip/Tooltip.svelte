<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import maplibre, { type Listener, type LngLatLike } from 'maplibre-gl';
	import { getMapContext } from '../context.svelte.js';
	import { resetPopupEventListener } from '../utils';
	import './Tooltip.css';

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
		border-radius: 2px;
		border: 1px solid rgba(0, 0, 0, 0.75);
		border-radius: var(--br-small);
		filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.1));
		pointer-events: none;
	}

	.mouseEvents {
		pointer-events: all;
	}
</style>
