<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { within, expect } from 'storybook/test';

	import Map from './Map.svelte';
	import ScaleControl from '../ScaleControl/ScaleControl.svelte';
	import NavigationControl from '../NavigationControl/NavigationControl.svelte';
	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import AttributionControl from '../AttributionControl/AttributionControl.svelte';
	import GeocoderControl from '../GeocoderControl/GeocoderControl.svelte';

	import { SWRDataLight } from '../MapStyle';

	import { eclipse } from '@versatiles/style';
	const alternateStyle = eclipse({
		language: 'de',
		baseUrl: 'https://tiles.versatiles.org',
		glyphs: 'https://static.datenhub.net/maps/fonts/{fontstack}/{range}.pbf'
	});

	const { Story } = defineMeta({
		title: 'Map/Map',
		component: Map
	});
</script>

<Story
	asChild
	name="Default"
	play={async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const containerEl = canvas.getByTestId('map-container');

		await step('Map canvas renders', async () => {
			const mapEl = containerEl.querySelector('.maplibregl-canvas');
			expect(mapEl).toBeTruthy();
		});
		await step('Scale control renders', async () => {
			const el = containerEl.querySelector('.maplibregl-ctrl-scale');
			expect(el).toBeTruthy();
		});
		await step('Scale renders expected value', async () => {
			const el = containerEl.querySelector('.maplibregl-ctrl-scale');
			expect(el).toHaveTextContent('100 km');
		});
		await step('Navigation control renders', async () => {
			const zoomInEl = containerEl.querySelector('.maplibregl-ctrl-zoom-in');
			const zoomOutEl = containerEl.querySelector('.maplibregl-ctrl-zoom-out');
			expect(zoomInEl).toBeTruthy();
			expect(zoomInEl).toHaveRole('button');
			expect(zoomOutEl).toBeTruthy();
			expect(zoomOutEl).toHaveRole('button');
		});

		await step('Attribution control renders', async () => {
			const el = containerEl.querySelector('.maplibregl-ctrl-attrib');
			expect(el).toBeTruthy();
		});

		await step('Geocoder control renders', async () => {
			const el = containerEl.querySelector('.maplibregl-ctrl-geocoder');
			expect(el).toBeTruthy();
		});
	}}
>
	<div class="container">
		<DesignTokens>
			<Map style={SWRDataLight}>
				<ScaleControl />
				<AttributionControl />
				<NavigationControl showCompass visualizePitch />
				<GeocoderControl languages="de" service="maptiler" key="V32kPHZjMa0Mkn6YvSzA" />
			</Map>
		</DesignTokens>
	</div>
</Story>

<Story asChild name="Alternate Style">
	<div class="container dark">
		<DesignTokens>
			<Map style={alternateStyle}>
				<ScaleControl />
				<AttributionControl />
				<NavigationControl showCompass visualizePitch />
				<GeocoderControl languages="de" service="maptiler" key="V32kPHZjMa0Mkn6YvSzA" />
			</Map>
		</DesignTokens>
	</div>
</Story>

<style>
	.container {
		width: 100%;
		height: 600px;
	}
	.dark {
		color: rgb(230, 230, 230);
	}
</style>
