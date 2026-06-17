<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Map from '../Map/Map.svelte';
	import HillshadeLayer from './HillshadeLayer.svelte';
	import AttributionControl from '../AttributionControl/AttributionControl.svelte';
	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';

	import { SWRDataLabLight } from '../MapStyle';
	import HillshadeSource from '../HillshadeSource/HillshadeSource.svelte';

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
			  <HillshadeSource id='hillshade' url="https://tiles.datenhub.net/tiles/elevation/tiles.json">
					<HillshadeLayer sourceId="hillshade" id="test"
					  paint={{
                    'hillshade-method': 'standard',
                    'hillshade-illumination-direction': 315,
                    'hillshade-shadow-color': '#000000',
                    'hillshade-highlight-color': '#FFFFFF',
                    'hillshade-accent-color': '#000000',
                    'hillshade-exaggeration': 0.5
                }}
            />
					</HillshadeSource>
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
