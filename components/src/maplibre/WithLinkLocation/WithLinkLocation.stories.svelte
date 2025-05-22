<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import WithLinkLocation from './WithLinkLocation.svelte';
	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import Map from '../Map/Map.svelte';
	import { SWRDataLabLight } from '../MapStyle';

	const { Story } = defineMeta({
		title: 'Maplibre/Extras/WithLinkLocation',
		component: WithLinkLocation
	});
</script>

<Story asChild name="Default">
	<DesignTokens>
		<div class="container">
			<WithLinkLocation countries="de" languages="de" service="maptiler" key="V32kPHZjMa0Mkn6YvSzA">
				<Map style={SWRDataLabLight} initialLocation={{ lat: 51, lng: 10, zoom: 20 }}></Map>
			</WithLinkLocation>
		</div>
	</DesignTokens>
</Story>

<style>
	.container {
		width: 500px;
		height: 300px;
	}
</style>
