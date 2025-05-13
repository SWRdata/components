<script lang="ts">
	import { getContext, onDestroy, type Snippet } from 'svelte';
	import { type ControlPosition, type IControl } from 'maplibre-gl';

	interface MapControlProps {
		position: ControlPosition;
		control: IControl;
		className?: string;
		children?: Snippet;
	}

	let { position, control, className, children }: MapControlProps = $props();

	const mapContext: any = getContext('mapContext');
	let el: HTMLDivElement | undefined = $state();

	let ctrl = $derived.by(() => {
		if (control) {
			return control;
		}

		return {
			onAdd: () => {
				return el!;
			},
			onRemove: () => {
				el?.parentNode?.removeChild(el);
			}
		};
	});

	$effect(() => {
		if (mapContext && mapContext.map && ctrl) {
			mapContext.map.addControl(ctrl, position);
		}
	});

	onDestroy(() => {
		if (mapContext.map) {
			mapContext.map.removeControl(control);
		}
	});
</script>

<div bind:this={el} class={`maplibregl-ctrl ${className}`}>
	{#if children}
		{@render children()}
	{/if}
</div>
