<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Map from '../Map/Map.svelte';
	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import AttributionControl from '../AttributionControl/AttributionControl.svelte';
	import GeocoderControl from '../GeocoderControl/GeocoderControl.svelte';

	import { SWRDataLabLight } from './index';
	const { Story } = defineMeta({
		title: 'Maplibre/Style/SWR Data Lab Light',
		component: Map
	});

	const locations = {
		germany: { lng: 10.962488768573053, lat: 50.958636214954396, zoom: 6 },
		stugge: { lng: 9.17985, lat: 48.7763, zoom: 10.3418 },
		berlin: { lng: 13.399, lat: 52.5159, zoom: 12.1977 },
		frankfurt: { lng: 8.68834, lat: 50.1082, zoom: 11.7923 },
		badenBaden: { lng: 8.23986, lat: 48.7595, zoom: 14.99, pitch: 0 }
	};
</script>

<Story asChild name="Default">
	<DesignTokens>
		<div class="grid">
			<div class="container">
				<Map showDebug style={SWRDataLabLight()} initialLocation={locations.germany}>
					<GeocoderControl languages="de" service="maptiler" key="V32kPHZjMa0Mkn6YvSzA" />
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="Berlin z12">
	<DesignTokens>
		<div class="grid">
			<div class="container">
				<Map showDebug style={SWRDataLabLight()} initialLocation={locations.berlin}>
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="Frankfurt z11">
	<DesignTokens>
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					style={SWRDataLabLight({ enableBuildingExtrusions: true })}
					initialLocation={locations.frankfurt}
				>
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="Baden-Baden z15">
	<DesignTokens>
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					style={SWRDataLabLight({ enableBuildingExtrusions: false })}
					initialLocation={locations.badenBaden}
				>
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="Building Extrusions">
	<DesignTokens>
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					style={SWRDataLabLight({ enableBuildingExtrusions: true })}
					maxZoom={20}
					initialLocation={{
						lng: 9.180503103314436,
						lat: 48.77521391139953,
						zoom: 16,
						pitch: 45
					}}
				>
					<GeocoderControl languages="de" service="maptiler" key="V32kPHZjMa0Mkn6YvSzA" />
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		grid-template-rows: auto;
		height: 700px;
	}
	.container {
		overflow: hidden;
	}
</style>
