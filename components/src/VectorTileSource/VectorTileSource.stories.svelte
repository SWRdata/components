<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';
	import Map from '../Map/Map.svelte';
	import VectorTileSource from './VectorTileSource.svelte';
	import MapVectorLayer from '../MapVectorLayer/MapVectorLayer.svelte';

	const { Story } = defineMeta({
		title: 'Map/VectorTileSource',
		component: VectorTileSource
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
					id="ev-infra-outline"
					paint={{
						'line-width': 2,
						'line-color': 'black',
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
