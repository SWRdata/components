<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import { shades } from '../../DesignTokens/Tokens';

	import VectorTileSource from './VectorTileSource.svelte';
	import VectorLayer from '../VectorLayer/VectorLayer.svelte';
	import Map from '../Map/Map.svelte';
	import { SWRDataLabLight } from '../MapStyle/';
	import AttributionControl from '../AttributionControl';

	const { Story } = defineMeta({
		title: 'Maplibre/Source/VectorTileSource',
		component: VectorTileSource
	});

	const demoUrls = [
		'https://demotiles.maplibre.org/tiles/tiles.json',
		'https://tiles.datenhub.net/tiles/osm/tiles.json'
	];
	let demoUrl = $state(demoUrls[0]);
</script>

<Story asChild name="Default">
	<DesignTokens theme="light">
		<div class="container">
			<Map showDebug={true} style={SWRDataLabLight()}>
				<VectorTileSource id="test-source" url="https://tiles.datenhub.net/tiles/osm/tiles.json" />
				<VectorLayer
					sourceId="test-source"
					sourceLayer="boundaries"
					id="test-layer"
					type="line"
					paint={{
						'line-color': shades.red.base,
						'line-width': 2
					}}
				/>
				<AttributionControl position="bottom-left" />
			</Map>
		</div>
	</DesignTokens>
</Story>

<Story asChild name="TileJSON with absolute URLs">
	<DesignTokens theme="light">
		<div class="container">
			<Map showDebug={true} style={SWRDataLabLight()}>
				<VectorTileSource id="test-source" url="https://demotiles.maplibre.org/tiles/tiles.json" />
				<VectorLayer
					sourceId="test-source"
					sourceLayer="countries"
					id="test-layer"
					type="line"
					paint={{
						'line-color': shades.red.base,
						'line-width': 2
					}}
				/>
				<AttributionControl position="bottom-left" />
			</Map>
		</div>
	</DesignTokens>
</Story>

<Story asChild name="Using a bare tile URL">
	<DesignTokens theme="light">
		<div class="container">
			<Map showDebug={true} style={SWRDataLabLight()}>
				<VectorTileSource
					id="ev-infra-source"
					tiles={[
						`https://static.datenhub.net/data/p108_e_auto_check/ev_infra_merged.versatiles?{z}/{x}/{y}`
					]}
					attribution="Demo attribution"
				/>
				<VectorLayer
					sourceId="ev-infra-source"
					sourceLayer="coverage"
					id="ev-infra-outline"
					type="line"
					paint={{
						'line-width': 1,
						'line-color': shades.red.base
					}}
				/>
				<AttributionControl position="bottom-left" />
			</Map>
		</div>
	</DesignTokens>
</Story>

<Story asChild name="Reactive url parameter">
	<DesignTokens theme="light">
		<label for="select-url">URL</label>
		<select name="select-url" id="select-url" bind:value={demoUrl}>
			{#each demoUrls as url}
				<option>{url}</option>
			{/each}
		</select>
		<div class="container">
			<Map showDebug={true} style={SWRDataLabLight()}>
				<VectorTileSource id="test-source" url={demoUrl} />

				<VectorLayer
					sourceId="test-source"
					sourceLayer="countries"
					id="test-layer"
					type="line"
					paint={{
						'line-color': shades.red.base,
						'line-width': 2
					}}
				/>

				<VectorLayer
					sourceId="test-source"
					sourceLayer="boundaries"
					id="test-layer-2"
					type="line"
					paint={{
						'line-color': shades.forest.base,
						'line-width': 2
					}}
				/>

				<AttributionControl position="bottom-left" />
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
