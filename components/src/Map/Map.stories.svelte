<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { within, expect } from 'storybook/test';
	import Map from './Map.svelte';
	import ScaleControl from '../ScaleControl/ScaleControl.svelte';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	const { Story } = defineMeta({
		title: 'Map/Map',
		component: Map
	});
</script>

<Story
	name="Basic"
	asChild
	play={async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const containerEl = canvas.getByTestId('map-container');

		await step('Map canvas renders', async () => {
			const mapEl = containerEl.querySelector('.maplibregl-canvas');
			expect(mapEl).toBeTruthy();
		});
	}}
>
	<div class="container">
		<DesignTokens>
			<Map>
				<ScaleControl />
			</Map>
		</DesignTokens>
	</div>
</Story>

<style>
	.container {
		width: 100%;
		height: 600px;
	}
</style>
