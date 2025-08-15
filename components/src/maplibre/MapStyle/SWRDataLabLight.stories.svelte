<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Map from '../Map/Map.svelte';
	import VectorLayer from '../VectorLayer/VectorLayer.svelte';
	import VectorTileSource from '../VectorTileSource/VectorTileSource.svelte';

	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import AttributionControl from '../AttributionControl/AttributionControl.svelte';
	import GeocoderControl from '../GeocoderControl/GeocoderControl.svelte';

	import { SWRDataLabLight } from './index';
	import { tokens } from '../../DesignTokens';
	const { Story } = defineMeta({
		title: 'Maplibre/Style/SWR Data Lab Light',
		component: Map
	});

	const locations = {
		germany: { lng: 10.962488768573053, lat: 50.958636214954396, zoom: 6 },
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
				<Map showDebug style={SWRDataLabLight()} initialLocation={locations.germany}>
					<GeocoderControl languages="de" service="maptiler" key="V32kPHZjMa0Mkn6YvSzA" />
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>

<Story asChild name="fix/118">
	<DesignTokens>
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					style={SWRDataLabLight()}
					initialLocation={{
						lng: 9.94171339962918,
						lat: 51.53361336607753,
						zoom: 12.246154061876666,
						pitch: 0
					}}
				>
					<GeocoderControl languages="de" service="maptiler" key="V32kPHZjMa0Mkn6YvSzA" />
					<VectorTileSource
						id="ev-infra-source"
						url={`https://static.datenhub.net/data/p109_besser_wohnen/rent_merged_3.versatiles?tiles/{z}/{x}/{y}`}
						attribution="Demo attribution"
					/>

					<VectorLayer
						type="fill"
						id="rent-fill-1km"
						sourceId="ev-infra-source"
						sourceLayer="rent_100m"
						placeBelow="street-residential"
						minZoom={5}
						paint={{
							'fill-color': [
								'step',
								['get', 'durchschnMieteQM'],
								'#f3eefa',
								7,
								'#FFB9A8',
								9,
								'#E92F02',
								11,
								'#5F1A0B'
							],
							'fill-opacity': 1
						}}
					/>
					<VectorLayer
						sourceId="ev-infra-source"
						sourceLayer="rent_1km"
						placeBelow="street-residential"
						id="rent-outline-1km"
						type="line"
						paint={{
							'line-width': 0.5,
							'line-color': 'black',
							'line-opacity': 0.5
						}}
					/>
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="fix/115">
	<DesignTokens>
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					style={SWRDataLabLight()}
					initialLocation={{
						lng: 10.923994803290498,
						lat: 52.28235776595122,
						zoom: 14.99,
						pitch: 0
					}}
				>
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="fix/114">
	<DesignTokens>
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					maxZoom={18}
					style={SWRDataLabLight()}
					initialLocation={{
						lng: 10.528542454303079,
						lat: 52.238797922413795,
						zoom: 14.99,
						pitch: 0
					}}
				>
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
				<Map showDebug style={SWRDataLabLight()} initialLocation={locations.bodensee}>
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
<Story asChild name="Stuttgart z13">
	<DesignTokens>
		<div class="grid">
			<div class="container">
				<Map showDebug style={SWRDataLabLight()} initialLocation={locations.stugge}>
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
<Story asChild name="Motorway Interchange z14">
	<DesignTokens>
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					style={SWRDataLabLight()}
					initialLocation={{
						lng: 13.557043617975637,
						lat: 52.31981845532215,
						zoom: 14.215291362684706,
						pitch: 0
					}}
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
