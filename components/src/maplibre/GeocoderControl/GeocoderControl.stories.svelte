<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { within, expect } from 'storybook/test';

	import GeocoderControl from './GeocoderControl.svelte';
	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import Map from '../Map/Map.svelte';

	import { SWRDataLabLight } from '../MapStyle';

	const { Story } = defineMeta({
		title: 'Maplibre/Control/GeocoderControl',
		component: GeocoderControl
	});
</script>

<Story
	asChild
	name="Default"
	play={async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const containerEl = canvas.getByTestId('map-container');

		await step('Geocoder control renders', async () => {
			const el = containerEl.querySelector('.maplibregl-ctrl-geocoder');
			expect(el).toBeTruthy();
		});
		await step('Localised placeholder text renders', async () => {
			const el = containerEl.querySelector('.maplibregl-ctrl-geocoder input');
			expect(el).toHaveAttribute('placeholder', 'Suche');
		});
	}}
>
	<DesignTokens theme="light">
		<div class="container">
			<Map style={SWRDataLabLight()} initialLocation={{ lat: 51, lng: 10, zoom: 20 }}>
				<GeocoderControl languages="de" service="maptiler" key="V32kPHZjMa0Mkn6YvSzA" />
			</Map>
		</div>
	</DesignTokens>
</Story>
<Story
	asChild
	name="Custom placeholder text"
	play={async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const containerEl = canvas.getByTestId('map-container');

		await step('Geocoder control renders', async () => {
			const el = containerEl.querySelector('.maplibregl-ctrl-geocoder');
			expect(el).toBeTruthy();
		});
		await step('Custom placeholder text renders', async () => {
			const el = containerEl.querySelector('.maplibregl-ctrl-geocoder input');
			expect(el).toHaveAttribute('placeholder', 'My placeholder text');
		});
	}}
>
	<DesignTokens theme="light">
		<div class="container">
			<Map style={SWRDataLabLight()} initialLocation={{ lat: 51, lng: 10, zoom: 20 }}>
				<GeocoderControl
					placeholder="My placeholder text"
					languages="de"
					service="maptiler"
					key="V32kPHZjMa0Mkn6YvSzA"
				/>
			</Map>
		</div>
	</DesignTokens>
</Story>

<Story asChild name="Long input">
	<DesignTokens theme="light">
		<div class="container">
			<Map style={SWRDataLabLight()} initialLocation={{ lat: 51, lng: 10, zoom: 20 }}>
				<GeocoderControl
					placeholder="This is an input with a very long placeholder text"
					languages="de"
					service="maptiler"
					key="V32kPHZjMa0Mkn6YvSzA"
				/>
			</Map>
		</div>
	</DesignTokens>
</Story>

<style>
	.container {
		width: 500px;
		height: 300px;
	}
</style>
