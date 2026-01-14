<script lang="ts">
	import { getContext } from 'svelte';

	interface AnnotationLineProps {
		axis: 'x' | 'y';
		value: number;
	}

	const { xScale, yScale, width, height } = getContext('LayerCake');
	let { axis = 'x', value = 0 }: AnnotationLineProps = $props();
</script>

{#if axis === 'x'}
	<line class="annotation-line" x1={$xScale(value)} x2={$xScale(value)} y1={0} y2={$height}></line>
{:else}
	<line class="annotation-line" x1={0} x2={$width} y1={$yScale(value)} y2={$yScale(value)}></line>
{/if}

<style>
	line {
		stroke: var(--color-textPrimary);
		stroke-width: 1;
		pointer-events: none;
	}
</style>
