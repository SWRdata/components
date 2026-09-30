<svelte:options customElement="p139-map-test" />

<script lang="ts">
	import { VectorTileSource, Map, VectorLayer } from '../../../../components-map/src';
	let mapContext = $state();
	let status = $state();

	$effect(() => {
		if (mapContext) {
			mapContext.map.on('load', () => {
				status = 'loaded';
			});
		}
	});
</script>

<div class="container">
	<Map bind:mapContext>
		<VectorTileSource
			id="admin_boundaries"
			promoteId="ars"
			tiles={[
				'https://static.datenhub.net/data/boundaries/admin_boundaries_2025-01-01.versatiles?{z}/{x}/{y}'
			]}
			maxZoom={8}
		>
			<VectorLayer
				type="line"
				sourceLayer="administrative"
				sourceId="admin_boundaries"
				id="boundaries-outline"
				filter={['==', 'admin_level', 6]}
				paint={{ 'line-color': 'red', 'line-width': 0.5 }}
			/>
		</VectorTileSource>
	</Map>
	<p class="status">{status}</p>
</div>

<style lang="scss">
	.container {
		aspect-ratio: 3 / 3.2;
		margin-bottom: 1em;
	}
</style>
