<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapVectorLayer from './MapVectorLayer.svelte';
	import Map from '../Map/Map.svelte';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';
	import VectorTileSource from '../VectorTileSource/VectorTileSource.svelte';

	const { Story } = defineMeta({
		title: 'Map/MapVectorLayer',
		component: MapVectorLayer
	});
	const url =
		'https://static.datenhub.net/data/p108_e_auto_check/ev_infra_merged.versatiles?tiles/{z}/{x}/{y}';
</script>

<Story asChild name="Basic">
	<div class="container">
		<DesignTokens>
			<Map>
				<VectorTileSource id="ev-infra-source" {url} />
				<MapVectorLayer
					sourceId="ev-infra-source"
					sourceLayer="coverage"
					id="ev-infra-outline"
					paint={{
						'line-width': 1,
						'line-color': 'red',
						'line-opacity': 1
					}}
				/>
			</Map>
		</DesignTokens>
	</div>
</Story>

<style>
	.container {
		width: 100%;
		height: 600px;
	}
</style>
