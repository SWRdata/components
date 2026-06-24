<script lang="ts">
	import type { Snippet } from 'svelte';
	import { isDarkMode, Map, tokens, VectorTileSource } from '../../../../components/src';
	import VectorLayer from '../../../../components/src/maplibre/VectorLayer/VectorLayer.svelte';
	import AttributionControl from '../../../../components/src/maplibre/AttributionControl/AttributionControl.svelte';
	let mapContext = $state();
	const maskState = 'Rheinland-Pfalz';
	const { children, controls }: { children: Snippet; controls: Snippet } = $props();
</script>

<div class="container">
	<div class="controls">
		{@render controls?.()}
	</div>
	<Map bind:mapContext>
		{@render children?.()}

		<VectorTileSource
			id="boundaries"
			tiles={[
				'https://static.datenhub.net/data/boundaries/admin_boundaries_2025-01-01.versatiles?{z}/{x}/{y}'
			]}
			attribution="© BKG (2025) dl-de/by-2-0"
			maxZoom={8}
		>
			<VectorLayer
				type="line"
				id="kreise-outline"
				sourceLayer="administrative"
				sourceId="boundaries"
				filter={['==', 'admin_level', 6]}
				paint={{
					'line-color': isDarkMode() ? '#999' : '#494949',
					'line-width': 1.25,
					'line-opacity': ['interpolate', ['linear'], ['zoom'], 7.9, 0, 8, 0.25, 8.3, 0.25, 9, 0.5]
				}}
			/>
			<VectorLayer
				type="line"
				id="gemeinden-outline"
				sourceLayer="administrative"
				sourceId="boundaries"
				filter={['==', 'admin_level', 8]}
				minZoom={9}
				paint={{
					'line-color': isDarkMode() ? '#888' : '#494949',
					'line-opacity': ['interpolate', ['linear'], ['zoom'], 9.7, 0, 9.8, 0.15]
				}}
			/>

			{#if maskState}
				<VectorLayer
					type="fill"
					id="laender-mask"
					sourceLayer="administrative"
					sourceId="boundaries"
					filter={['all', ['==', 'admin_level', 4], ['!=', 'name', maskState]]}
					paint={{
						'fill-color': isDarkMode() ? tokens.semantics.pageFill.dark : 'white'
					}}
				/>
			{/if}
			<VectorLayer
				type="line"
				id="laender-outline"
				sourceLayer="administrative"
				sourceId="boundaries"
				filter={maskState
					? ['all', ['==', 'admin_level', 4], ['==', 'name', maskState]]
					: undefined}
				paint={{
					'line-color': isDarkMode() ? '#bbb' : 'black',
					'line-opacity': isDarkMode() ? 0.95 : 0.5,
					'line-width': 1
				}}
			/>
		</VectorTileSource>
		<VectorTileSource
			id="admin_labels"
			tiles={[
				'https://static.datenhub.net/data/boundaries/admin_labels_2025-01-01.versatiles?{z}/{x}/{y}'
			]}
			maxZoom={7}
			attribution="© BKG (2025) dl-de/by-2-0"
		>
			<VectorLayer
				type="symbol"
				sourceLayer="administrative"
				id="laender-labels"
				sourceId="admin_labels"
				filter={['==', 'admin_level', 4]}
				maxZoom={7.4}
				layout={{
					'text-size': 15,
					'text-max-width': 5,
					'text-font': ['swr_sans_medium'],
					'text-field': '{name}'
				}}
				paint={{
					'text-halo-color': isDarkMode() ? 'rgba(2,2,2,.85)' : 'white',
					'text-halo-width': isDarkMode() ? 1 : 2,
					'text-halo-blur': 0,
					'text-color': isDarkMode() ? 'white' : 'black',
					'text-opacity': ['interpolate', ['linear'], ['zoom'], 7.3, 1, 7.4, 0]
				}}
			/>
			<VectorLayer
				type="symbol"
				sourceLayer="administrative"
				id="kreise-labels"
				sourceId="admin_labels"
				filter={['==', 'admin_level', 6]}
				minZoom={8}
				maxZoom={10}
				layout={{
					'text-size': 15,
					'text-max-width': 5,
					'text-font': ['swr_sans_medium'],
					'text-field': '{name}'
				}}
				paint={{
					'text-halo-color': isDarkMode() ? 'rgba(2,2,2,.85)' : 'white',
					'text-halo-width': isDarkMode() ? 1 : 2,
					'text-halo-blur': 1,
					'text-color': isDarkMode() ? 'white' : 'black',
					'text-opacity': ['interpolate', ['linear'], ['zoom'], 7.4, 0, 7.5, 1]
				}}
			/>
			<VectorLayer
				type="symbol"
				sourceLayer="administrative"
				id="gemeinde-labels"
				sourceId="admin_labels"
				filter={['==', 'admin_level', 8]}
				minZoom={10}
				layout={{
					'text-size': 16,
					'text-max-width': 5,
					'text-font': ['swr_sans_regular'],
					'text-field': '{name}'
				}}
				paint={{
					'text-halo-color': isDarkMode() ? 'rgba(2,2,2,.85)' : '#fcfcfcff',
					'text-halo-width': 2,
					'text-halo-blur': 0.5,
					'text-color': isDarkMode() ? 'white' : '#1b1b1b',
					'text-opacity': ['interpolate', ['linear'], ['zoom'], 11, 0, 11.5, 1]
				}}
			/>
		</VectorTileSource>
		<AttributionControl position="bottom-left" />
	</Map>
</div>

<style lang="scss">
	.container {
		aspect-ratio: 3 / 3.2;
		margin-bottom: 1em;
		width: 400px;
	}
</style>
