<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Map from '../Map/Map.svelte';

	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import AttributionControl from '../AttributionControl/AttributionControl.svelte';
	import GeocoderControl from '../GeocoderControl/GeocoderControl.svelte';

	import { SWRDataLabDark, SWRDataLabLight } from './index';
	import locations from './storyLocations';
	import NavigationControl from '../NavigationControl/NavigationControl.svelte';
	import { type RoadLabelDensity } from './types';

	const { Story } = defineMeta({
		title: 'Maplibre/Style/SWR Data Lab Dark',
		component: Map
	});
</script>

<Story asChild name="Default">
	<DesignTokens theme="dark">
		<div class="grid">
			<div class="container">
				<Map showDebug style={SWRDataLabDark()} initialLocation={locations.germany}>
					<GeocoderControl languages="de" service="maptiler" key="V32kPHZjMa0Mkn6YvSzA" />
					<AttributionControl position="bottom-left" />
					<NavigationControl showCompass />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="Hillshade">
	<DesignTokens theme="dark">
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					style={SWRDataLabDark({ enableHillshade: true })}
					initialLocation={locations.alps}
				>
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="Toggle place labels (#221)">
	<DesignTokens theme="dark">
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					style={SWRDataLabDark({ places: { showLabels: false } })}
					initialLocation={{
						lng: 8.936,
						lat: 49.662,
						zoom: 7.814,
						pitch: 0
					}}
				>
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>

<Story asChild name="Toggle road labels (#190)">
	<DesignTokens theme="dark">
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					style={SWRDataLabDark({ roads: { showLabels: false } })}
					initialLocation={{ ...locations.berlin, zoom: 15 }}
				>
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>

<Story asChild name="Bodensee z9">
	<DesignTokens theme="dark">
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
	<DesignTokens theme="dark">
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
	<DesignTokens theme="dark">
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
	<DesignTokens theme="dark">
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
	<DesignTokens theme="dark">
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					style={SWRDataLabDark({ enableBuildingExtrusions: false, enableHillshade: true })}
					initialLocation={locations.badenBaden}
				>
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="Motorway Interchange z14">
	<DesignTokens theme="dark">
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
	<DesignTokens theme="dark">
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
<Story asChild name="fix/251">
	<DesignTokens theme="dark">
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					style={SWRDataLabDark()}
					initialLocation={{
						lng: 10.005803094126804,
						lat: 53.54086081679415,
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
<Story asChild name="fix/200">
	<DesignTokens theme="dark">
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					style={SWRDataLabDark()}
					initialLocation={{
						lng: 8.96467732459405,
						lat: 48.93101909877453,
						zoom: 13.507311695217375,
						pitch: 0
					}}
				>
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="fix/173">
	<DesignTokens theme="dark">
		<div class="grid">
			<div class="container">
				<Map showDebug style={SWRDataLabDark()} initialLocation={{ ...locations.berlin, zoom: 11 }}>
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="fix/391">
	<DesignTokens theme="dark">
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					style={SWRDataLabDark()}
					maxZoom={20}
					initialLocation={{
						lng: 7.162106315605001,
						lat: 50.56038132182053,
						zoom: 13.440582725369412,
						pitch: 0
					}}
				>
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="fix/398">
	<DesignTokens theme="dark">
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					style={SWRDataLabDark()}
					maxZoom={20}
					initialLocation={{
						lng: 6.19604542728689,
						lat: 50.029196152971906,
						zoom: 16.901165450738834,
						pitch: 0
					}}
				>
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="fix/416">
	<DesignTokens theme="dark">
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					style={SWRDataLabDark()}
					maxZoom={20}
					initialLocation={{ lng: 7.36347380955749, lat: 49.99797140765824, zoom: 16, pitch: 0 }}
				>
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="fix/441">
	<DesignTokens theme="dark">
		<div class="grid">
			<div class="container">
				<Map
					showDebug
					style={SWRDataLabDark()}
					maxZoom={20}
					initialLocation={{
						lng: 9.558006092459436,
						lat: 47.69445218974644,
						zoom: 15.664592047703644
					}}
				>
					<AttributionControl position="bottom-left" />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>
<Story asChild name="feat/459: overview">
	<DesignTokens theme="dark">
		<div class="row">
			{#each ['none', 'default', 'dense'] as s}
				<div class="container">
					{s}
					<Map
						showDebug={s === 'dense'}
						maxZoom={20}
						style={SWRDataLabDark({ roads: { labels: s as RoadLabelDensity } })}
						initialLocation={{
							lng: 8.269931078413038,
							lat: 50.00421185075504,
							zoom: 15.210111923487453
						}}
					>
						<AttributionControl position="bottom-left" />
					</Map>
				</div>
			{/each}
		</div>
	</DesignTokens>
</Story>
<Story asChild name="feat/459: dense">
	<DesignTokens theme="dark">
		<div class="row">
			<div class="container">
				<Map
					showDebug
					maxZoom={20}
					style={SWRDataLabDark({ roads: { labels: 'dense' } })}
					initialLocation={{
						lng: 8.272323926448053,
						lat: 49.99821205810713,
						zoom: 15.94311424606843
					}}
				>
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
	.row {
		display: flex;
		height: 700px;
	}
	.container {
		flex-grow: 1;
		overflow: hidden;
	}
</style>
