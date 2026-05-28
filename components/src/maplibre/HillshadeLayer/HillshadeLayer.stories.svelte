<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Map from '../Map/Map.svelte';
	import HillshadeLayer from './HillshadeLayer.svelte';
	import AttributionControl from '../AttributionControl/AttributionControl.svelte';
	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';

	import { SWRDataLabLight } from '../MapStyle';

	const { Story } = defineMeta({
		title: 'Maplibre/Layer/HillshadeLayer',
		component: HillshadeLayer
	});
</script>

<Story asChild name="Default">
	<DesignTokens theme="light">
		<div class="container">
			<Map showDebug={true} style={SWRDataLabLight()}>
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
