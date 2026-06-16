<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { within, expect } from 'storybook/test';

	import Geocoder from './Geocoder.svelte';
	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import { SWRDataLabLight } from '../MapStyle';
	import Map from '../Map/Map.svelte';

	const { Story } = defineMeta({
		title: 'Maplibre/Extras/Geocoder',
		component: Geocoder
	});

	let mapContext = $state()
</script>

<Story
	asChild
	name="Default"
	play={async ({ canvasElement, step }) => {
	}}
>
	<DesignTokens theme="light">
			<Geocoder
					languages="de"
					service="maptiler"
					key="V32kPHZjMa0Mkn6YvSzA"
					map={mapContext.map}
			/>
		<div class="container">
			<Map bind:mapContext style={SWRDataLabLight()} initialLocation={{ lat: 51, lng: 10, zoom: 20 }}>
			</Map>
		</div>
	</DesignTokens>
</Story>

<style>
	.container {
		width: 800px;
		height: 300px;
	}
</style>
