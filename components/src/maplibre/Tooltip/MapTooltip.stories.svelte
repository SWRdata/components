<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import type { LngLatLike, MapGeoJSONFeature } from 'maplibre-gl';

	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import Map from '../Map/Map.svelte';
	import VectorTileSource from '../VectorTileSource/VectorTileSource.svelte';
	import MapVectorLayer from '../VectorLayer/MapVectorLayer.svelte';
	import AttributionControl from '../AttributionControl/AttributionControl.svelte';
	import MapTooltip from './MapTooltip.svelte';

	const { Story } = defineMeta({
		title: 'Map/MapTooltip',
		component: MapTooltip
	});

	let hovered = $state() as MapGeoJSONFeature | undefined;
	let mouseCoords = $state([0, 0]) as LngLatLike;
</script>

<Story asChild name="Basic">
	<DesignTokens>
		<div class="container">
			<Map showDebug={true} initialLocation={{ lat: 51, lng: 10, zoom: 8 }}>
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
					onmousemove={(ev) => {
						hovered = ev.features?.[0];
						mouseCoords = ev.lngLat;
					}}
					onmouseleave={() => (hovered = undefined)}
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
					{hovered}
					sourceId="ev-infra-source"
					sourceLayer="coverage"
					id="ev-infra-outline"
					type="line"
					,
					paint={{
						'line-width': [
							'case',
							['any', ['boolean', ['feature-state', 'hovered'], false]],
							2,
							0.5
						],
						'line-color': '#1D0B40',
						'line-opacity': 1
					}}
				/>
				{#if hovered}
					<MapTooltip position={mouseCoords} mouseEvents={false} showCloseButton={false}>
						<pre>{Object.entries(hovered.properties)
								.map(([key, val]) => `${key}: ${val}`)
								.join('\n')}</pre>
					</MapTooltip>
				{/if}
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
