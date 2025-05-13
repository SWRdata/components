<script lang="ts">
	import { getContext, onDestroy, type Snippet } from 'svelte';
	import { type ControlPosition, type IControl } from 'maplibre-gl';

	interface MapControlProps {
		position: ControlPosition;
		control: IControl;
		className?: string;
		group?: boolean;
		children?: Snippet;
	}

	let { position, control, className, group = true, children }: MapControlProps = $props();

	const ctx = getContext('ctx');
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
		if (el && ctx.map) {
			ctx.map.addControl(ctrl, position);
		}
	});
	onDestroy(() => {
		console.log('bye');
		ctx.map.removeControl(control);
	});
</script>

<div bind:this={el} class={`maplibregl-ctrl ${className}`} class:maplibre-ctrl-group={group}>
	{#if children}
		{@render children()}
	{/if}
</div>
