<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import VectorTileSource from './VectorTileSource.svelte';
	import VectorLayer from '../VectorLayer/VectorLayer.svelte';
	import Map from '../Map/Map.svelte';
	import { SWRDataLight } from '../MapStyle/';
	import AttributionControl from '../AttributionControl';

	const { Story } = defineMeta({
		title: 'Maplibre/Source/VectorTileSource',
		component: VectorTileSource
	});
</script>

<Story asChild name="Default">
	<DesignTokens>
		<div class="container">
			<Map showDebug={true} style={SWRDataLight}>
				<VectorTileSource
					id="ev-infra-source"
					url={`https://static.datenhub.net/data/p108_e_auto_check/ev_infra_merged.versatiles?tiles/{z}/{x}/{y}`}
				/>
				<VectorLayer
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
