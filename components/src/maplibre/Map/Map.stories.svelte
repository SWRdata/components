<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { within, expect, userEvent, fn, spyOn } from 'storybook/test';

	import Map from './Map.svelte';
	import ScaleControl from '../ScaleControl/ScaleControl.svelte';
	import NavigationControl from '../NavigationControl/NavigationControl.svelte';
	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import AttributionControl from '../AttributionControl/AttributionControl.svelte';
	import GeocoderControl from '../GeocoderControl/GeocoderControl.svelte';

	import { SWRDataLabLight, SWRDataLabDark } from '../MapStyle';

	import { eclipse } from '@versatiles/style';
	import { MapContext } from '../context.svelte';
	import Copy from '../../Copy/Copy.svelte';

	const alternateStyle = eclipse({
		language: 'de',
		baseUrl: 'https://tiles.datenhub.net',
		glyphs: 'https://static.datenhub.net/maps/fonts/{fontstack}/{range}.pbf'
	});

	const { Story } = defineMeta({
		title: 'Maplibre/Map',
		component: Map
	});

	let mapContext: MapContext;
	const onMoveStart = fn();

	let mapOptions = $state({
		allowZoom: true,
		allowPan: true
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
		<DesignTokens theme="light">
			<Map style={SWRDataLabLight()}>
				<ScaleControl />
				<AttributionControl />
				<NavigationControl showCompass visualizePitch position="bottom-left" />
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

<Story
	asChild
	name="Toggle zoom and pan"
	play={async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const toggleZoomButton = canvas.getByTestId('toggle-zoom');
		const togglePanButton = canvas.getByTestId('toggle-pan');

		await step('toggle zoom off', async () => {
			await userEvent.click(toggleZoomButton);
			expect(mapContext.map?.scrollZoom.isEnabled()).toBe(false);
		});

		await step('toggle zoom on', async () => {
			await userEvent.click(toggleZoomButton);
			expect(mapContext.map?.scrollZoom.isEnabled()).toBe(true);
		});

		await step('toggle pan off', async () => {
			await userEvent.click(togglePanButton);
			expect(mapContext.map?.dragPan.isEnabled()).toBe(false);
		});

		await step('toggle pan on', async () => {
			await userEvent.click(togglePanButton);
			expect(mapContext.map?.dragPan.isEnabled()).toBe(true);
		});
	}}
>
	<div class="container">
		<DesignTokens theme="light">
			<button
				data-testid="toggle-zoom"
				onclick={() => {
					mapOptions.allowZoom = !mapOptions.allowZoom;
				}}>Toggle Zoom</button
			>
			<button
				data-testid="toggle-pan"
				onclick={() => {
					mapOptions.allowPan = !mapOptions.allowPan;
				}}>Toggle Pan</button
			>
			<Map
				style={SWRDataLabLight()}
				initialLocation={{ lat: 50.88, lng: 10.43, zoom: 5 }}
				showDebug
				onmovestart={onMoveStart}
				allowZoom={mapOptions.allowZoom}
				allowPan={mapOptions.allowPan}
				bind:mapContext
			>
				<AttributionControl />
			</Map>
		</DesignTokens>
	</div>
</Story>

<Story asChild name="Globe Projection">
	<div class="container">
		<DesignTokens theme="dark">
			<Map
				style={SWRDataLabDark()}
				showDebug
				projection={{ type: 'globe' }}
				pitch={52}
				initialLocation={{ lat: 51.3, lng: 10.2, zoom: 3.5 }}
			>
				<ScaleControl />
				<AttributionControl />
				<NavigationControl showCompass visualizePitch position="top-right" />
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

<Story
	asChild
	name="Debug overlay"
	play={async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const containerEl = canvas.getByTestId('map-container');

		await step('debug overlay renders', async () => {
			const el = containerEl.querySelector('.debug');
			expect(el).toBeTruthy();
		});
		await step('shows correct location', async () => {
			const el = containerEl.querySelector('.debug-location');
			expect(el).toHaveTextContent('[51.30, 10.20]');
		});
		await step('shows correct zoom', async () => {
			const el = containerEl.querySelector('.debug-zoom');
			expect(el).toHaveTextContent('zoom=5');
		});
		await step('shows correct bearing', async () => {
			const el = containerEl.querySelector('.debug-bearing');
			expect(el).toHaveTextContent('bearing=0');
		});
		await step('shows correct pitch', async () => {
			const el = containerEl.querySelector('.debug-pitch');
			expect(el).toHaveTextContent('pitch=0');
		});
		await step('copy location button yields correct result', async () => {
			const spy = spyOn(navigator.clipboard, 'writeText');
			const el = canvas.getByText('Copy Location');
			el.click();
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith('{"lng":10.2,"lat":51.3,"zoom":5,"pitch":0,"bearing":0}');
		});
		await step('copy bounds button yields correct result', async () => {
			const spy = spyOn(navigator.clipboard, 'writeText');
			const el = canvas.getByText('Copy Bounds');
			el.click();
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(
				'[[-2.763867187498761,46.99180980708053],[23.163867187501523,55.2386838776998]]'
			);
		});
	}}
>
	<div class="container">
		<DesignTokens theme="light">
			<Map showDebug style={SWRDataLabLight()} initialLocation={{ lat: 51.3, lng: 10.2, zoom: 5 }}>
				<AttributionControl />
			</Map>
		</DesignTokens>
	</div>
</Story>

<Story asChild name="Alternate Style">
	<div class="container">
		<DesignTokens theme="dark">
			<Map style={alternateStyle} initialBounds={[5.87, 47.27, 15.04, 55.06]}>
				<ScaleControl />
				<AttributionControl />
				<GeocoderControl languages="de" service="maptiler" key="V32kPHZjMa0Mkn6YvSzA" />
			</Map>
		</DesignTokens>
	</div>
</Story>
<Story asChild name="Versatiles satellite images">
	<div class="container">
		<DesignTokens theme="dark">
			<Copy as="p" style="margin-bottom: .5em"
				>Tech preview only, not for productive use due to unclear licensing situation</Copy
			>
			<Map
				showDebug
				style={{
					version: 8,
					name: 'swr-datalab-light',
					metadata: { license: 'https://creativecommons.org/publicdomain/zero/1.0/' },
					glyphs: 'https://static.datenhub.net/maps/fonts/{fontstack}/{range}.pbf',
					sprite: 'https://static.datenhub.net/maps/styles/swr-datalab-light/sprite/sprite',
					sources: {
						'versatiles-satellite': {
							attribution: '',
							tiles: ['https://tiles.datenhub.net/tiles/satellite/{z}/{x}/{y}'],
							bounds: [-180, -85.0511287798066, 180, 85.0511287798066],
							type: 'raster',
							scheme: 'xyz',
							minzoom: 0,
							maxzoom: 14
						}
					},
					layers: [
						{
							id: 'simple-tiles',
							type: 'raster',
							source: 'versatiles-satellite'
						}
					]
				}}
				initialLocation={{
					lng: 7.96475,
					lat: 46.7674,
					zoom: 3.53183
				}}
			>
				<ScaleControl />
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
