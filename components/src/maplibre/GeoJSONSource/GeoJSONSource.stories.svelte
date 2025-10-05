<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Map from '../Map/Map.svelte';
	import GeoJSONSource from './GeoJSONSource.svelte';
	import VectorLayer from '../VectorLayer/VectorLayer.svelte';
	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import AttributionControl from '../AttributionControl/AttributionControl.svelte';

	import { SWRDataLabLight } from '../MapStyle';
	import { tokens } from '../../DesignTokens';
	import squareGeo from './test/square.json';
	import stuttgartGeo from './test/stuttgart-waermenetze.json';

	const { Story } = defineMeta({
		title: 'Maplibre/Source/GeoJSONSource',
		component: GeoJSONSource
	});

	let hovered: any = $state();
	const handleMouseMove = (e) => {
		hovered = e.features?.[0];
	};
	const handleMouseLeave = () => {
		hovered = null;
	};
</script>

<Story asChild name="Default">
	<DesignTokens theme="light">
		<div class="container">
			<Map showDebug={true} style={SWRDataLabLight()}>
				<GeoJSONSource
					id="demo"
					data={squareGeo as GeoJSON.GeoJSON}
					attribution="Demo attribution"
				/>
				<VectorLayer
					sourceId="demo"
					placeBelow="boundary-country"
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

<Story asChild name="ID Promotion">
	<DesignTokens theme="light">
		<div class="container">
			<Map
				showDebug={true}
				style={SWRDataLabLight()}
				cursor={hovered ? 'pointer' : ''}
				initialLocation={{
					lng: 9.223869970354485,
					lat: 48.798414513866504,
					zoom: 11.462711766264558
				}}
			>
				<GeoJSONSource
					id="demo"
					data={stuttgartGeo as GeoJSON.GeoJSON}
					attribution="Demo attribution"
					promoteId="id"
				/>
				<VectorLayer
					bind:hovered
					onmousemove={handleMouseMove}
					onmouseleave={handleMouseLeave}
					sourceId="demo"
					placeBelow="boundary-country"
					id="test"
					type="fill"
					paint={{
						'fill-color': tokens.shades.red.dark1,
						'fill-opacity': ['case', ['boolean', ['feature-state', 'hovered'], false], 1, 0.1]
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
