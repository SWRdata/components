<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapVectorLayer from './MapVectorLayer.svelte';
	import Map from '../Map/Map.svelte';
	import AttributionControl from '../AttributionControl/AttributionControl.svelte';
	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import VectorTileSource from '../VectorTileSource/VectorTileSource.svelte';

	const { Story } = defineMeta({
		title: 'Map/MapVectorLayer',
		component: MapVectorLayer
	});
</script>

<Story asChild name="Basic">
	<DesignTokens>
		<div class="container">
			<Map showDebug={true}>
				<VectorTileSource
					id="ev-infra-source"
					url={`https://static.datenhub.net/data/p108_e_auto_check/ev_infra_merged.versatiles?tiles/{z}/{x}/{y}`}
				/>
				<MapVectorLayer
					sourceId="ev-infra-source"
					type="fill"
					id="coverage-fill"
					sourceLayer="coverage"
					placeBelow="street-residential"
					paint={{
						'fill-color': [
							'step',
							['get', 'coverage_2025'],
							'white',
							1,
							'lightgray',
							1.3,
							'lightgreen'
						]
					}}
				></MapVectorLayer>
				<MapVectorLayer
					sourceId="ev-infra-source"
					sourceLayer="coverage"
					id="ev-infra-outline"
					type="line"
					paint={{
						'line-width': 0.5,
						'line-color': 'purple',
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
