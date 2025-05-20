<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LinkToLocationControl from './LinkToLocationControl.svelte';
	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import Map from '../Map/Map.svelte';
	import { SWRDataLight } from '../MapStyle';

	const { Story } = defineMeta({
		title: 'Maplibre/Control/LinkToLocationControl',
		component: LinkToLocationControl
	});
</script>

<Story asChild name="Default">
	<DesignTokens>
		<div class="container">
			<Map style={SWRDataLight} initialLocation={{ lat: 51, lng: 10, zoom: 20 }}>
				<LinkToLocationControl
					countries="de"
					languages="de"
					service="maptiler"
					key="V32kPHZjMa0Mkn6YvSzA"
				/>
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
