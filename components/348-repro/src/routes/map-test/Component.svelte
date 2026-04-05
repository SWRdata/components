<svelte:options customElement="p139-map-test" />

<script lang="ts">
	import Map from '../../../../src/maplibre/Map/Map.svelte';
	import VectorTileSource from '../../../../src/maplibre/VectorTileSource/VectorTileSource.svelte';
	import VectorLayer from '../../../../src/maplibre/VectorLayer/VectorLayer.svelte';
</script>

<div class="container">
	<Map>
		<VectorTileSource
			id="admin_boundaries"
			promoteId="ars"
			tiles={[
				'https://static.datenhub.net/data/boundaries/admin_boundaries_2025-01-01.versatiles?{z}/{x}/{y}'
			]}
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
</div>

<style lang="scss">
	.container {
		aspect-ratio: 3 / 3.2;
		margin-bottom: 1em;
	}
</style>
