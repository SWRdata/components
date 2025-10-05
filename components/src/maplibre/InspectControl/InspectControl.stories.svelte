<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import InspectControl from './InspectControl.svelte';
	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import { SWRDataLabLight } from '../MapStyle';
	import Map from '../Map/Map.svelte';

	const { Story } = defineMeta({
		title: 'Maplibre/Control/InspectControl',
		component: InspectControl
	});
</script>

<Story asChild name="Default">
	<DesignTokens theme="light">
		<div class="container">
			<Map style={SWRDataLabLight()} initialLocation={{ lat: 51, lng: 10, zoom: 20 }}>
				<InspectControl />
			</Map>
		</div>
	</DesignTokens>
</Story>

<style>
	.container {
		width: 500px;
		height: 200px;
	}
</style>
