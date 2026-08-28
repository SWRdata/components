<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import NavigationControl from './NavigationControl.svelte';
	import { DesignTokens } from '@swr-data-lab/components';
	import { SWRDataLabLight } from '../MapStyle';
	import Map from '../Map/Map.svelte';

	const { Story } = defineMeta({
		title: 'Maplibre/Control/NavigationControl',
		component: NavigationControl
	});
</script>

<Story asChild name="Default">
	<DesignTokens theme="light">
		<div class="container">
			<Map style={SWRDataLabLight()} initialLocation={{ lat: 51, lng: 10, zoom: 20 }}>
				<NavigationControl />
			</Map>
		</div>
	</DesignTokens>
</Story>

<Story asChild name="With compass">
	<DesignTokens theme="light">
		<div class="container">
			<Map style={SWRDataLabLight()} initialLocation={{ lat: 51, lng: 10, zoom: 20 }}>
				<NavigationControl showCompass visualizePitch />
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
