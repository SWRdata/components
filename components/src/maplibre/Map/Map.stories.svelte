<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { within, expect, userEvent, fn } from 'storybook/test';

	import Map from './Map.svelte';
	import ScaleControl from '../ScaleControl/ScaleControl.svelte';
	import NavigationControl from '../NavigationControl/NavigationControl.svelte';
	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import AttributionControl from '../AttributionControl/AttributionControl.svelte';
	import GeocoderControl from '../GeocoderControl/GeocoderControl.svelte';

	import { SWRDataLabLight } from '../MapStyle';

	import { eclipse } from '@versatiles/style';
	import { MapContext } from '../context.svelte';

	const alternateStyle = eclipse({
		language: 'de',
		baseUrl: 'https://tiles.versatiles.org',
		glyphs: 'https://static.datenhub.net/maps/fonts/{fontstack}/{range}.pbf'
	});

	const { Story } = defineMeta({
		title: 'Maplibre/Map',
		component: Map
	});

	let mapContext: MapContext;
	const onMoveStart = fn();
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
		<DesignTokens theme="light">
			<Map style={SWRDataLabLight()}>
				<ScaleControl />
				<AttributionControl />
				<NavigationControl showCompass visualizePitch />
				<GeocoderControl languages="de" service="maptiler" key="V32kPHZjMa0Mkn6YvSzA" />
			</Map>
		</DesignTokens>
	</div>
</Story>

<Story
	asChild
	name="External Controls"
	play={async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const containerEl = canvas.getByTestId('map-container');
		const flyToBerlinButton = canvas.getByTestId('flyto-berlin');

		await step('map renders', async () => {
			const mapEl = containerEl.querySelector('.maplibregl-canvas');
			expect(mapEl).toBeTruthy();
		});
		await step('mapContext prop receives valid data', async () => {
			expect(mapContext).toBeInstanceOf(MapContext);
		});
		await step('external trigger map events', async () => {
			await userEvent.click(flyToBerlinButton);
			expect(onMoveStart).toHaveBeenCalled();
			// We'd like to expext.poll() for onMoveEnd.toHaveBeenCalled()
			// here but that API doesn't exist in Storybook, see:
			// https://github.com/storybookjs/storybook/issues/29060
		});
	}}
>
	<div class="container">
		<DesignTokens theme="light">
			<button
				data-testid="flyto-berlin"
				onclick={() => {
					mapContext.map?.flyTo({ center: [13.3849, 52.5026], zoom: 9.8 });
				}}>Fly to Berlin</button
			>
			<button
				data-testid="flyto-origin"
				onclick={() => {
					mapContext.map?.flyTo({ center: [10.43, 50.88], zoom: 5 });
				}}>Reset</button
			>
			<Map
				style={SWRDataLabLight()}
				initialLocation={{ lat: 50.88, lng: 10.43, zoom: 5 }}
				showDebug
				onmovestart={onMoveStart}
				bind:mapContext
			>
				<AttributionControl />
			</Map>
		</DesignTokens>
	</div>
</Story>

<Story asChild name="Globe Projection">
	<div class="container">
		<DesignTokens theme="light">
			<Map
				style={SWRDataLabLight()}
				showDebug
				projection={{ type: 'globe' }}
				pitch={52}
				initialLocation={{ lat: 51.3, lng: 10.2, zoom: 3.5 }}
			>
				<ScaleControl />
				<AttributionControl />
				<NavigationControl showCompass visualizePitch />
				<GeocoderControl languages="de" service="maptiler" key="V32kPHZjMa0Mkn6YvSzA" />
			</Map>
		</DesignTokens>
	</div>
</Story>
<Story asChild name="Cooperative Gestures">
	<div class="container">
		<DesignTokens theme="light">
			<div class="placeholder">Placeholder</div>
			<Map
				showDebug
				cooperativeGestures
				style={SWRDataLabLight()}
				initialLocation={{ lat: 51.3, lng: 10.2, zoom: 5 }}
			>
				<ScaleControl />
				<AttributionControl />
				<NavigationControl />
			</Map>
			<div class="placeholder">Placeholder</div>
		</DesignTokens>
	</div>
</Story>
<Story asChild name="initialBounds">
	<div class="container">
		<DesignTokens theme="light">
			<Map showDebug style={SWRDataLabLight()} initialBounds={[5.87, 47.1, 15.04, 55.1]}>
				<ScaleControl />
				<AttributionControl />
			</Map>
		</DesignTokens>
	</div>
</Story>

<Story asChild name="Alternate Style">
	<div class="container dark">
		<DesignTokens theme="dark">
			<Map style={alternateStyle} initialBounds={[5.87, 47.27, 15.04, 55.06]}>
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
	.placeholder {
		height: 500px;
		background: var(--gray-light-5);
		margin: 1em;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: var(--swr-sans);
		color: var(--gray-base);
	}
</style>
