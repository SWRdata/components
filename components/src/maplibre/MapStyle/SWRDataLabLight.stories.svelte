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
</script>

<Story asChild name="Default">
	<DesignTokens>
		<div class="grid">
			<div class="container">
				<Map
					style={SWRDataLabLight()}
					initialLocation={{ lng: 8.239451072800875, lat: 48.75692609731408, zoom: 14.99 }}
				>
					<GeocoderControl languages="de" service="maptiler" key="V32kPHZjMa0Mkn6YvSzA" />
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
					enableBuildingExtrusions
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
