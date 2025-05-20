<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import NavigationControl from './NavigationControl.svelte';
	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import { SWRDataBaseLight } from '../MapStyle';
	import Map from '../Map/Map.svelte';

	const { Story } = defineMeta({
		title: 'Map/Control/NavigationControl',
		component: NavigationControl
	});
</script>

<Story asChild name="Default">
	<DesignTokens>
		<div class="container">
			<Map style={SWRDataBaseLight} initialLocation={{ lat: 51, lng: 10, zoom: 20 }}>
				<NavigationControl />
			</Map>
		</div>
	</DesignTokens>
</Story>

<Story asChild name="With compass">
	<DesignTokens>
		<div class="container">
			<Map style={SWRDataBaseLight} initialLocation={{ lat: 51, lng: 10, zoom: 20 }}>
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
