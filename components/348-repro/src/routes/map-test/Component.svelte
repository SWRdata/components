<svelte:options customElement="p139-map-test" />

<script lang="ts">
	import {
		DesignTokens,
		VectorTileSource,
		VectorLayer,
		SWRDataLabDark,
		Map
	} from '@swr-data-lab/components';
</script>

<DesignTokens theme="auto">
	<div class="container">
		<Map style={SWRDataLabDark()}>
			<VectorTileSource
				id="admin_boundaries"
				tiles={[
					'https://static.datenhub.net/data/boundaries/admin_boundaries_2025-01-01.versatiles?{z}/{x}/{y}'
				]}
			></VectorTileSource>

			<VectorLayer
				type="line"
				sourceLayer="administrative"
				sourceId="admin_boundaries"
				id="boundaries-outline"
				filter={['==', 'admin_level', 6]}
				paint={{ 'line-color': 'red', 'line-width': 0.5 }}
			/>
		</Map>
	</div>
</DesignTokens>

<style lang="scss">
	.container {
		aspect-ratio: 3 / 3.2;
		margin-bottom: 1em;
	}
</style>
