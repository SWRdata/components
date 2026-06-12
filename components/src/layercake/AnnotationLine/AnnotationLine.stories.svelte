<script module lang="ts">
	import { LayerCake, Svg } from 'layercake';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect } from 'storybook/test';
	import AnnotationLine from './AnnotationLine.svelte';
	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import AxisX from '../AxisX/AxisX.svelte';
	import AxisY from '../AxisY/AxisY.svelte';

	const { Story } = defineMeta({
		title: 'Layercake/AnnotationLine',
		component: AnnotationLine
	});
	const data = Array.from(Array(10)).map((_, i) => {
		return {
			year: 2020 + i,
			value: Math.round(Math.random() * 1000)
		};
	});
</script>

<Story
	asChild
	name="Default"
	play={async ({ canvasElement, step }) => {
		const el = canvasElement.querySelector('line.annotation-line');
		await step('Renders SVG <line>', async () => {
			expect(el).toBeTruthy();
		});
	}}
>
	<DesignTokens theme="light">
		<div class="chart">
			<LayerCake ssr {data} x="year" y="value" yDomain={[0, 1000]}>
				<Svg>
					<AnnotationLine value={2025} axis="x"></AnnotationLine>
					<AxisX></AxisX>
					<AxisY></AxisY>
				</Svg>
			</LayerCake>
		</div>
	</DesignTokens>
</Story>

<Story
	asChild
	name="y axis"
	play={async ({ canvasElement, step }) => {
		const el = canvasElement.querySelector('line.annotation-line');
		await step('Renders SVG <line>', async () => {
			expect(el).toBeTruthy();
		});
	}}
>
	<DesignTokens theme="light">
		<div class="chart">
			<LayerCake ssr {data} x="year" y="value" yDomain={[0, 1000]}>
				<Svg>
					<AnnotationLine value={350} axis="y"></AnnotationLine>
					<AxisX></AxisX>
					<AxisY></AxisY>
				</Svg>
			</LayerCake>
		</div>
	</DesignTokens>
</Story>

<style>
	.chart {
		height: 400px;
		max-width: 600px;
		background: var(--violet-light-5);
		margin: 0 1rem;
	}
</style>
