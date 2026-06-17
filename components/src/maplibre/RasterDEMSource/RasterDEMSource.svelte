<script lang="ts">
	import { type PromoteIdSpecification, type RasterDEMSourceSpecification,  } from 'maplibre-gl';

	import MapSource from '../Source/MapSource.svelte';
	import type { SourceProps } from '../types';
	import fetchTileJSON from '../fetchTileJson';

	interface RasterDEMSourceProps extends SourceProps {
		url?: string;
		tiles?: string[];
		promoteId?: PromoteIdSpecification;
	}

	const {
		minZoom,
		maxZoom,
		id,
		url,
		tiles,
		attribution,
		promoteId,
		children
	}: RasterDEMSourceProps = $props();

	let tileJsonData = $derived(url ? await fetchTileJSON(url) : {});

	const sourceSpec: RasterDEMSourceSpecification = $derived({
		type: 'raster-dem',
	  tileSize: 256,
		tiles: tiles || tileJsonData.tiles || [],
		maxzoom: maxZoom || tileJsonData.maxZoom || 24,
		minzoom: minZoom || tileJsonData.minZoom || 0,
		attribution: attribution || tileJsonData.attribution || '',
		promoteId
	});
</script>

<MapSource {id} {sourceSpec} {children} />
