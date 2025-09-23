<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Map from '../Map/Map.svelte';

	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import AttributionControl from '../AttributionControl/AttributionControl.svelte';
	import GeocoderControl from '../GeocoderControl/GeocoderControl.svelte';

	import { SWRDataLabDark } from './index';

	const { Story } = defineMeta({
		title: 'Maplibre/Style/SWR Data Lab Dark',
		component: Map
	});

	const locations = {
		germany: { lng: 10.962488768573053, lat: 50.958636214954396, zoom: 5 },
		stugge: { lng: 9.181, lat: 48.772, zoom: 13.5 },
		berlin: { lng: 13.399, lat: 52.5159, zoom: 12.1977 },
		frankfurt: { lng: 8.68834, lat: 50.1082, zoom: 11.7923 },
		badenBaden: { lng: 8.23986, lat: 48.7595, zoom: 14.99, pitch: 0 },
		bodensee: { lng: 9.299862991860664, lat: 47.6693427120762, zoom: 9.098834549261177, pitch: 0 }
	};
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
