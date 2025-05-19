<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import AttributionControl from './AttributionControl.svelte';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';
	import Map from '../Map/Map.svelte';
	const { Story } = defineMeta({
		title: 'Map/Control/AttributionControl',
		component: AttributionControl
	});
</script>

<Story asChild name="Basic">
	<DesignTokens>
		<div class="container">
			<Map initialLocation={{ lat: 51, lng: 10, zoom: 20 }}>
				<AttributionControl customAttribution="SWR Data Lab" position="bottom-left" />
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
