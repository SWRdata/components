<script lang="ts">
	import { getContext, onDestroy, type Snippet } from 'svelte';
	import { type Map, Popup } from 'maplibre-gl';
	import { getMapContext } from '../Map/context.svelte.ts';

	interface MapTooltipProps {
		offset: number;
		showCloseButton: boolean;
		closeOnClick: boolean;
		children?: Snippet;
	}

	let {
		offset = 5,
		showCloseButton = true,
		closeOnClick = true,
		children
	}: MapTooltipProps = $props();

	const { map } = $derived(getMapContext());

	let tooltip = new Popup({
		closeButton: showCloseButton,
		closeOnClick: closeOnClick,
		offset: offset,
		maxWidth: '360px'
	});

	let data = getContext('hover');
	let el: Node | undefined = $state();

	function updateTooltip(data: any, el: Node, map: Map) {
		if (data.id) {
			tooltip.setLngLat(data.event.lngLat).setDOMContent(el).addTo(map);
		} else {
			tooltip.remove();
		}
	}

	$effect(() => {
		if (el && map) {
			updateTooltip(data, el, map);
		}
	});
	onDestroy(() => tooltip.remove());
</script>

<div bind:this={el}>
	{@render children?.()}
</div>
