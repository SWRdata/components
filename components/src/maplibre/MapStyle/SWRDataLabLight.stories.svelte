<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Map from '../Map/Map.svelte';
	import VectorLayer from '../VectorLayer/VectorLayer.svelte';
	import VectorTileSource from '../VectorTileSource/VectorTileSource.svelte';

	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import AttributionControl from '../AttributionControl/AttributionControl.svelte';
	import GeocoderControl from '../GeocoderControl/GeocoderControl.svelte';

	import { SWRDataLabLight } from './index';
	import locations from './storyLocations';

	const { Story } = defineMeta({
		title: 'Maplibre/Style/SWR Data Lab Light',
		component: Map
	});
</script>

<Story asChild name="Default">
	<DesignTokens theme="light">
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
<Story asChild name="Hillshade">
	<DesignTokens theme="light">
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					style={SWRDataLabLight({ enableHillshade: true })}
					initialLocation={locations.alps}
				>
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="Hide admin boundaries + place labels">
	<DesignTokens theme="light">
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					style={SWRDataLabLight({ admin: { show: false }, places: { labels: 'none' } })}
					initialLocation={{
						lng: 9.0169,
						lat: 48.0571,
						zoom: 7.53393,
						pitch: 0
					}}
				>
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="Hide admin labels">
	<DesignTokens theme="light">
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					style={SWRDataLabLight({
						admin: { show: true, showLabels: false }
					})}
					initialLocation={{
						lng: 7.57,
						lat: 49.3,
						zoom: 7.66,
						pitch: 0
					}}
				>
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="fix/122">
	<DesignTokens theme="light">
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					style={SWRDataLabLight()}
					initialLocation={{ lng: 10.941447898724618, lat: 50.84067324785988, zoom: 5.5, pitch: 0 }}
				>
					<VectorTileSource
						id="demo-source"
						tiles={[
							'https://static.datenhub.net/data/p118_correctiv_waermewende/heating_merged_2.versatiles?{z}/{x}/{y}'
						]}
						attribution="Demo attribution"
					>
						<VectorLayer
							type="fill"
							id="demo-10km"
							sourceId="demo-source"
							sourceLayer="heating_10km_squares"
							placeBelow="street-residential"
							minZoom={5}
							paint={{
								'fill-color': [
									'match',
									['get', 'dominant_source'],
									'Gas',
									'#CCDCFF',
									'Heizoel',
									'#5BCFE1',
									'Holz_Holzpellets',
									'#499F73',
									'Fernwaerme',
									'#A86C07',
									'Strom',
									'#FFD584',
									'gray'
								],
								'fill-opacity': 1
							}}
						/>
					</VectorTileSource>
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="fix/118">
	<DesignTokens theme="light">
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
						tiles={[
							'https://static.datenhub.net/data/p109_besser_wohnen/rent_merged_4.versatiles?{z}/{x}/{y}'
						]}
						attribution="Demo attribution"
					>
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
					</VectorTileSource>
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="fix/115">
	<DesignTokens theme="light">
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
	<DesignTokens theme="light">
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
	<DesignTokens theme="light">
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
	<DesignTokens theme="light">
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
	<DesignTokens theme="light">
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
	<DesignTokens theme="light">
		<div class="grid">
			<div class="container">
				<Map showDebug style={SWRDataLabLight()} initialLocation={locations.stugge}>
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="Berlin z15">
	<DesignTokens theme="light">
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					style={SWRDataLabLight()}
					initialLocation={{ lng: 13.397677524739947, lat: 52.5175142188192, zoom: 14.99 }}
				>
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="Baden-Baden z15">
	<DesignTokens theme="light">
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					style={SWRDataLabLight({ enableBuildingExtrusions: false, enableHillshade: true })}
					initialLocation={locations.badenBaden}
				>
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="Motorway Interchange z14">
	<DesignTokens theme="light">
		<div class="grid">
			<div class="container">
				<Map showDebug style={SWRDataLabLight()} initialLocation={locations.motorwayz14}>
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="Building Extrusions">
	<DesignTokens theme="light">
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					style={SWRDataLabLight({ enableBuildingExtrusions: true, roads: { labels: 'none' } })}
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
<Story asChild name="Tertiary road labels">
	<DesignTokens theme="light">
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					style={SWRDataLabLight({ roads: { labels: 'dense' } })}
					maxZoom={20}
					initialLocation={{
						lng: 9.5589729969887,
						lat: 47.700018482763966,
						zoom: 17.225334548916464
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
