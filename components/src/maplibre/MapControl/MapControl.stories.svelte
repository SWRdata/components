<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapControl from './MapControl.svelte';
	import { SWRDataLabLight } from '../MapStyle';
	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import Switcher from '../../Switcher/Switcher.svelte';
	import Map from '../Map/Map.svelte';

	type ThemeMap = {
		[key: string]: StyleSpecification;
	};

	import { eclipse } from '@versatiles/style';
	import type { StyleSpecification } from 'maplibre-gl';
	const eclipseStyle = eclipse({
		language: 'de',
		baseUrl: 'https://tiles.versatiles.org',
		glyphs: 'https://static.datenhub.net/maps/fonts/{fontstack}/{range}.pbf'
	});

	const { Story } = defineMeta({
		title: 'Maplibre/Control/MapControl',
		component: MapControl
	});

	const themes: ThemeMap = {
		'SWRDL Light': SWRDataLabLight,
		Eclipse: eclipseStyle
	};

	let currentTheme = $state('SWRDL Light');
</script>

<Story asChild name="Custom HTML Control">
	<DesignTokens>
		<div class="container">
			<Map style={themes[currentTheme]} initialLocation={{ lat: 51, lng: 10, zoom: 20 }}>
				<MapControl position="top-left">
					<Switcher
						options={Object.keys(themes)}
						bind:value={currentTheme}
						label="Select theme"
						size="small"
					/>
				</MapControl>
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
