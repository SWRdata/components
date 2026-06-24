<svelte:options customElement="repro-452" />

<script>
	import MapComponent from './MapComponent.svelte';
	import VectorLayer from '../../../../components/src/maplibre/VectorLayer/VectorLayer.svelte';
	import VectorTileSource from '../../../../components/src/maplibre/VectorTileSource/VectorTileSource.svelte';
</script>

<h1>#452 Repro</h1>

<MapComponent>
	{#snippet controls()}
		[controls]
	{/snippet}
	<VectorTileSource
		id="demo-source"
		tiles={[
			'https://static.datenhub.net/data/p118_correctiv_waermewende/heating_merged_2.versatiles?{z}/{x}/{y}'
		]}
		attribution="Demo attribution"
	>
		<VectorLayer
			type="fill"
			id="demo-10km"
			sourceId="demo-source"
			sourceLayer="heating_10km_squares"
			placeBelow="street-residential"
			minZoom={5}
			paint={{
				'fill-color': [
					'match',
					['get', 'dominant_source'],
					'Gas',
					'#CCDCFF',
					'Heizoel',
					'#5BCFE1',
					'Holz_Holzpellets',
					'#499F73',
					'Fernwaerme',
					'#A86C07',
					'Strom',
					'#FFD584',
					'gray'
				],
				'fill-opacity': 1
			}}
		/>
	</VectorTileSource>
</MapComponent>
