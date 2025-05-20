<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { within, expect } from 'storybook/test';

	import ScaleControl from './ScaleControl.svelte';
	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import Map from '../Map/Map.svelte';
	import { SWRDataLight } from '../MapStyle';

	const { Story } = defineMeta({
		title: 'Maplibre/Control/ScaleControl',
		component: ScaleControl
	});
</script>

<Story
	asChild
	name="Default"
	play={async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const containerEl = canvas.getByTestId('map-container');
		await step('Scale control renders', async () => {
			const el = containerEl.querySelector('.maplibregl-ctrl-scale');
			expect(el).toBeTruthy();
		});
		await step('Distance is rendered in metric units', async () => {
			const el = containerEl.querySelector('.maplibregl-ctrl-scale');
			expect(el).toHaveTextContent('100 m');
		});
	}}
>
	<DesignTokens>
		<div class="container">
			<Map style={SWRDataLight} initialLocation={{ lat: 51, lng: 10, zoom: 20 }}>
				<ScaleControl />
			</Map>
		</div>
	</DesignTokens>
</Story>

<Story
	asChild
	name="Imperial units"
	play={async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const containerEl = canvas.getByTestId('map-container');
		await step('Scale control renders', async () => {
			const el = containerEl.querySelector('.maplibregl-ctrl-scale');
			expect(el).toBeTruthy();
		});
		await step('Distance is rendered in imperial units', async () => {
			const el = containerEl.querySelector('.maplibregl-ctrl-scale');
			expect(el).toHaveTextContent('300 ft');
		});
	}}
>
	<DesignTokens>
		<div class="container">
			<Map style={SWRDataLight} initialLocation={{ lat: 51, lng: 10, zoom: 20 }}>
				<ScaleControl unit="imperial" />
			</Map>
		</div>
	</DesignTokens>
</Story>

<style>
	.container {
		width: 500px;
		height: 200px;
	}
</style>
