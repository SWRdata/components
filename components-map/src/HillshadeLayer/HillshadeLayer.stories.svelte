<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Map from '../Map/Map.svelte';
	import HillshadeLayer from './HillshadeLayer.svelte';
	import AttributionControl from '../AttributionControl/AttributionControl.svelte';
	import { DesignTokens } from '@swr-data-lab/components';

	import { SWRDataLabLight } from '../MapStyle';
	import RasterDEMSource from '../RasterDEMSource/RasterDEMSource.svelte';

	const { Story } = defineMeta({
		title: 'Maplibre/Layer/HillshadeLayer',
		component: HillshadeLayer,
		tags: ["experimental"]
	});
</script>

<Story asChild name="Default">
	<DesignTokens theme="light">
		<div class="container">
			<Map showDebug={true} style={SWRDataLabLight()}>
			  <RasterDEMSource id='dem' url="https://tiles.datenhub.net/tiles/elevation/tiles.json">
					<HillshadeLayer sourceId="dem" id="test"
					  paint={{
                    'hillshade-method': 'standard',
                    'hillshade-illumination-direction': 315,
                    'hillshade-shadow-color': '#000000',
                    'hillshade-highlight-color': '#FFFFFF',
                    'hillshade-accent-color': '#000000',
                    'hillshade-exaggeration': 0.5
                }}
            />
					</RasterDEMSource>
				<AttributionControl position="bottom-left" />
			</Map>
		</div>
	</DesignTokens>
</Story>

<style>
	.container {
		width: 100%;
		height: 600px;
	}
</style>
