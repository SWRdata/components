<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import type { LngLatLike, MapGeoJSONFeature } from 'maplibre-gl';

	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import Map from '../Map/Map.svelte';
	import VectorTileSource from '../VectorTileSource/VectorTileSource.svelte';
	import VectorLayer from '../VectorLayer/VectorLayer.svelte';
	import AttributionControl from '../AttributionControl/AttributionControl.svelte';
	import Tooltip from './Tooltip.svelte';
	import { SWRDataLabLight } from '../MapStyle';

	const { Story } = defineMeta({
		title: 'Maplibre/Extras/Tooltip',
		component: Tooltip
	});

	let hovered = $state() as MapGeoJSONFeature | undefined;
	let hovered2 = $state() as MapGeoJSONFeature | undefined;
	let hoverCoords = $state([0, 0]) as LngLatLike;

	let selected = $state() as MapGeoJSONFeature | undefined;
	let selectCoords = $state([0, 0]) as LngLatLike;
</script>

<Story asChild name="Default">
	<DesignTokens>
		<div class="container">
			<Map
				style={SWRDataLabLight()}
				initialLocation={{ lat: 51, lng: 10, zoom: 8 }}
				allowZoom={false}
			>
				<VectorTileSource
					id="ev-infra-source"
					url={`https://static.datenhub.net/data/p108_e_auto_check/ev_infra_merged.versatiles?tiles/{z}/{x}/{y}`}
				/>
				<VectorLayer
					sourceId="ev-infra-source"
					type="fill"
					id="coverage-fill"
					sourceLayer="coverage"
					onmousemove={(e) => {
						hovered = e.features?.[0];
						hoverCoords = e.lngLat;
					}}
					onmouseleave={() => (hovered = undefined)}
					paint={{
						'fill-color': ['step', ['get', 'coverage_2025'], 'white', 1, '#ffcfcc', 1.3, '#FF4D20']
					}}
				/>
				<VectorLayer
					{hovered}
					sourceId="ev-infra-source"
					sourceLayer="coverage"
					id="ev-infra-outline"
					type="line"
					layout={{
						'line-join': 'round'
					}}
					paint={{
						'line-width': [
							'case',
							['any', ['boolean', ['feature-state', 'hovered'], false]],
							1.5,
							0.5
						],
						'line-color': [
							'case',
							['any', ['boolean', ['feature-state', 'hovered'], false]],
							'#000',
							'#555'
						],
						'line-opacity': 1
					}}
				/>

				{#if hovered}
					<Tooltip
						position={hoverCoords}
						mouseEvents={false}
						showCloseButton={false}
						closeOnClick={false}
					>
						<pre>{Object.entries(hovered.properties)
								.map(([key, val]) => `${key}: ${val}`)
								.join('\n')}</pre>
					</Tooltip>
				{/if}
				<AttributionControl position="bottom-left" />
			</Map>
		</div>
	</DesignTokens>
</Story>

<Story asChild name="Show on Click">
	<DesignTokens>
		<div class="container">
			<Map
				style={SWRDataLabLight()}
				initialLocation={{ lat: 51, lng: 10, zoom: 8 }}
				allowZoom={false}
			>
				<VectorTileSource
					id="ev-infra-source"
					url={`https://static.datenhub.net/data/p108_e_auto_check/ev_infra_merged.versatiles?tiles/{z}/{x}/{y}`}
				/>
				<VectorLayer
					sourceId="ev-infra-source"
					type="fill"
					id="coverage-fill"
					sourceLayer="coverage"
					placeBelow="street-residential"
					onmousemove={(e) => {
						hovered2 = e.features?.[0];
					}}
					onmouseleave={() => (hovered2 = undefined)}
					onclick={(e) => {
						selected = e.features?.[0];
						selectCoords = e.lngLat;
					}}
					paint={{
						'fill-color': ['step', ['get', 'coverage_2025'], 'white', 1, '#CCDCFF', 1.3, '#6280E5']
					}}
				/>
				<VectorLayer
					hovered={hovered2}
					{selected}
					sourceId="ev-infra-source"
					sourceLayer="coverage"
					id="ev-infra-outline"
					type="line"
					layout={{
						'line-join': 'round'
					}}
					paint={{
						'line-width': [
							'case',
							[
								'any',
								['boolean', ['feature-state', 'hovered'], false],
								['boolean', ['feature-state', 'selected'], false]
							],
							2,
							0.5
						],
						'line-color': [
							'case',
							[
								'any',
								['boolean', ['feature-state', 'hovered'], false],
								['boolean', ['feature-state', 'selected'], false]
							],
							'#000',
							'#555'
						],
						'line-opacity': 1
					}}
				/>
				{#if selected}
					<Tooltip
						position={selectCoords}
						mouseEvents={true}
						showCloseButton={true}
						onClose={() => {
							selected = undefined;
						}}
					>
						<pre class="padRight">{Object.entries(selected.properties)
								.map(([key, val]) => `${key}: ${val}`)
								.join('\n')}</pre>
					</Tooltip>
				{/if}
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

	.padRight {
		padding-right: 2.5em;
	}
</style>
