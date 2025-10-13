<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Map from '../Map/Map.svelte';
	import ArrowSource from './ArrowSource.svelte';
	import VectorLayer from '../VectorLayer/VectorLayer.svelte';
	import InspectControl from '../InspectControl/InspectControl.svelte';
	import AttributionControl from '../AttributionControl/AttributionControl.svelte';

	import { SWRDataLabLight } from '../MapStyle';
	import { tokens } from '../../DesignTokens';
	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';

	const { Story } = defineMeta({
		title: 'Maplibre/Source/ArrowSource',
		component: ArrowSource
	});
</script>

<Story asChild name="Default">
	<DesignTokens theme="light">
		<div class="container">
			<Map
				showDebug={true}
				style={SWRDataLabLight()}
				initialLocation={{
					lng: -84.783,
					lat: 15.623,
					zoom: 3.39,
					pitch: 0
				}}
			>
				<ArrowSource
					id="demo"
					attribution="Demo attribution"
					arrows={[
						{
							width: 10,
							a: [-80.1, 11.3],
							b: [-84.783, 15.6],
							c: [-81, 14.6]
						},
						{
							width: 15,
							a: [-71.1, 11.3],
							b: [-75.783, 15.6],
							c: [-75, 12.6]
						}
					]}
				/>
				<InspectControl />
				<AttributionControl />
				<VectorLayer
					sourceId="demo"
					id="arrow-tails"
					filter={['==', 'kind', 'arrow-tail']}
					type="line"
					paint={{
						'line-gradient': [
							'interpolate',
							['linear'],
							['line-progress'],
							0,
							'transparent',
							0.4,
							tokens.shades.red.base
						],
						'line-width': ['get', 'width']
					}}
				/>
				<VectorLayer
					sourceId="demo"
					id="arrow-heads"
					filter={['==', 'kind', 'arrow-head']}
					type="symbol"
					paint={{
						'icon-color': tokens.shades.red.base
					}}
					layout={{
						'icon-image': 'arrow-head',
						'icon-anchor': 'top',
						'icon-offset': [0, -2],
						'icon-rotate': ['get', 'angle'],
						'icon-overlap': 'always',
						'icon-size': ['get', 'size']
					}}
				/>
			</Map>
		</div>
	</DesignTokens>
</Story>

<Story asChild name="fix/206">
	<DesignTokens theme="light">
		<div class="container">
			<Map
				showDebug={true}
				style={SWRDataLabLight()}
				initialLocation={{
					lng: 7.72,
					lat: 47.59,
					zoom: 10.9
				}}
			>
				<ArrowSource
					id="arrows"
					attribution=""
					arrows={[{ a: [7.78, 47.55917], b: [7.667, 47.595], c: [7.69, 47.55], width: 30 }]}
				/>

				<InspectControl />
				<AttributionControl />
				<VectorLayer
					sourceId="arrows"
					id="arrow-tails"
					filter={['==', 'kind', 'arrow-tail']}
					type="line"
					paint={{
						'line-gradient': [
							'interpolate',
							['linear'],
							['line-progress'],
							0,
							'transparent',
							0.4,
							tokens.shades.red.base
						],
						'line-width': ['get', 'width']
					}}
				/>
				<VectorLayer
					sourceId="arrows"
					id="arrow-heads"
					filter={['==', 'kind', 'arrow-head']}
					type="symbol"
					paint={{
						'icon-color': tokens.shades.red.base
					}}
					layout={{
						'icon-image': 'arrow-head',
						'icon-rotation-alignment': 'map',
						'icon-anchor': 'top',
						'icon-offset': [0, 2],
						'icon-rotate': ['get', 'angle'],
						'icon-overlap': 'always',
						'icon-size': ['get', 'size']
					}}
				/>
			</Map>
		</div>
	</DesignTokens>
</Story>

<style>
	.container {
		width: 100%;
		height: 600px;
	}
</style>
