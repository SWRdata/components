<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Map from '../Map/Map.svelte';
	import GeoJSONSource from './GeoJSONSource.svelte';
	import VectorLayer from '../VectorLayer/VectorLayer.svelte';
	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import AttributionControl from '../AttributionControl/AttributionControl.svelte';

	import { SWRDataLabLight } from '../MapStyle';
	import { tokens } from '../../DesignTokens';

	const { Story } = defineMeta({
		title: 'Maplibre/Source/GeoJSONSource',
		component: GeoJSONSource
	});

	const geoJSON = {
		type: 'GeometryCollection',
		geometries: [
			{
				type: 'Polygon',
				coordinates: [
					[
						[7.99298752775212, 50.07410328331564],
						[11.709726710536899, 50.07410328331564],
						[11.709726710536899, 52.08770466696292],
						[7.99298752775212, 52.08770466696292],
						[7.99298752775212, 50.07410328331564]
					]
				]
			}
		]
	} as GeoJSON.GeoJSON;
</script>

<Story asChild name="Default">
	<DesignTokens>
		<div class="container">
			<Map showDebug={true} style={SWRDataLabLight()}>
				<GeoJSONSource id="demo" data={geoJSON} attribution="Demo attribution" />
				<VectorLayer
					sourceId="demo"
					placeBelow="street-residential"
					id="test-outline"
					type="line"
					paint={{
						'line-width': 15,
						'line-color': tokens.shades.red.dark1,
						'line-opacity': 1
					}}
				/>
				<AttributionControl />
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
