<script lang="ts">
	import { type Snippet } from 'svelte';
	import { type ControlPosition, type IControl } from 'maplibre-gl';
	import { getMapContext } from '../Map/context.svelte.ts';

	interface MapControlProps {
		position: ControlPosition;
		control: IControl;
		className?: string;
		children?: Snippet;
	}

	let { position, control, className, children }: MapControlProps = $props();
	let el: HTMLDivElement | undefined = $state();

	const { map } = $derived(getMapContext());

	let ctrl = $derived.by(() => {
		return control
			? control
			: {
					onAdd: () => el!,
					onRemove: () => el?.parentNode?.removeChild(el)
				};
	});

	$effect(() => {
		if (map && ctrl) {
			map.addControl(ctrl, position);
		}
		return () => {
			map.removeControl(control);
		};
	});
</script>

<div bind:this={el} class={`maplibregl-ctrl`}>
	{#if children}
		{@render children()}
	{/if}
</div>
