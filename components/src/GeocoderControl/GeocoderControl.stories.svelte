<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import GeocoderControl from './GeocoderControl.svelte';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';
	import Map from '../Map/Map.svelte';

	const { Story } = defineMeta({
		title: 'Map/Control/GeoCoderControl',
		component: GeocoderControl
	});
</script>

<Story asChild name="Basic">
	<DesignTokens>
		<div class="container">
			<Map initialLocation={{ lat: 51, lng: 10, zoom: 20 }}>
				<GeocoderControl languages="de" service="maptiler" key="V32kPHZjMa0Mkn6YvSzA" />
			</Map>
		</div>
	</DesignTokens>
</Story>

<style>
	.container {
		width: 500px;
		height: 300px;
	}
</style>
