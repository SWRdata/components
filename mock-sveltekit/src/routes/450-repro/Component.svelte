<svelte:options customElement="geocoder-test" />

<script lang="ts">
	import {
		VectorTileSource,
		Map,
		VectorLayer,
		Geocoder,
		DesignTokens
	} from '../../../../components/src';

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

<DesignTokens>
	<div class="container">
		<div class="geocoder">
			{#if mapContext?.map}
				<Geocoder
					map={mapContext.map}
					service="maptiler"
					key="oO1aTsULS3sqGPgn0qKN"
					size="small"
					countries={['de']}
					placeholder={`z.b. „Sindelfingen“`}
					types={['region', 'county', 'municipality']}
					languages={['de']}
				/>
			{/if}
		</div>
		<div class="map">
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
	</div>
</DesignTokens>

<style>
	.container {
		padding: 5%;
	}
	.map {
		aspect-ratio: 4 / 3;
		margin-bottom: 1em;
	}
</style>
