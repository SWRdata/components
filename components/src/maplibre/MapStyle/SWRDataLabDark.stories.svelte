<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Map from '../Map/Map.svelte';

	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import AttributionControl from '../AttributionControl/AttributionControl.svelte';
	import GeocoderControl from '../GeocoderControl/GeocoderControl.svelte';

	import { SWRDataLabDark } from './index';
	import locations from './storyLocations';

	const { Story } = defineMeta({
		title: 'Maplibre/Style/SWR Data Lab Dark',
		component: Map
	});
</script>

<Story asChild name="Default">
	<DesignTokens>
		<div class="grid">
			<div class="container">
				<Map showDebug style={SWRDataLabDark()} initialLocation={locations.germany}>
					<GeocoderControl languages="de" service="maptiler" key="V32kPHZjMa0Mkn6YvSzA" />
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>

<Story asChild name="Bodensee z9">
	<DesignTokens>
		<div class="grid">
			<div class="container">
				<Map showDebug style={SWRDataLabDark()} initialLocation={locations.bodensee}>
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
					style={SWRDataLabDark({ enableBuildingExtrusions: true })}
					initialLocation={locations.frankfurt}
				>
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
				<Map showDebug style={SWRDataLabDark()} initialLocation={locations.berlin}>
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="Stuttgart z13">
	<DesignTokens>
		<div class="grid">
			<div class="container">
				<Map showDebug style={SWRDataLabDark()} initialLocation={locations.stugge}>
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
					style={SWRDataLabDark({ enableBuildingExtrusions: false })}
					initialLocation={locations.badenBaden}
				>
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="Motorway Interchange z14">
	<DesignTokens>
		<div class="grid">
			<div class="container">
				<Map showDebug style={SWRDataLabDark()} initialLocation={locations.motorwayz14}>
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
					style={SWRDataLabDark({ enableBuildingExtrusions: true })}
					maxZoom={20}
					initialLocation={locations.buildings}
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
