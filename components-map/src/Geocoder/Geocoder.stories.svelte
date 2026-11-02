<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Geocoder from './Geocoder.svelte';
	import { DesignTokens } from '@swr-data-lab/components';
	import { SWRDataLabLight } from '../MapStyle';
	import Map from '../Map/Map.svelte';
	import type { MapContext } from '../context.svelte';

	const { Story } = defineMeta({
		title: 'Maplibre/Extras/Geocoder',
		component: Geocoder
	});

	let mapContext: MapContext | undefined = $state(undefined)
</script>

<Story
	asChild
	name="Default"
>
	<DesignTokens theme="light">
	<div class="container">
			<Geocoder
				languages="de"
				service="maptiler"
				key="V32kPHZjMa0Mkn6YvSzA"
				map={mapContext?.map}
		/>
		<div class="map-container">
		  <Map bind:mapContext style={SWRDataLabLight()} initialLocation={{ lat: 51, lng: 10, zoom: 20 }}/>
		</div>
	</div>
	</DesignTokens>
</Story>
<Story
	asChild
	name="size=small"
>
	<DesignTokens theme="light">
	<div class="container">
			<Geocoder
				languages="de"
				size="small"
				service="maptiler"
				key="V32kPHZjMa0Mkn6YvSzA"
		/>
	</div>
	</DesignTokens>
</Story>

<style>
  .container {
    display: flex;
    flex-flow: column;
    gap: 1rem;
		width: 800px;
  }
	.map-container {
		height: 300px;
		border: 1px solid darkgrey;
	}
</style>
