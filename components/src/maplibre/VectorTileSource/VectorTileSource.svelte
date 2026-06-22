<script lang="ts">
	import { type PromoteIdSpecification, type VectorSourceSpecification } from 'maplibre-gl';

	import MapSource from '../MapSource/MapSource.svelte';
	import fetchTileJSON from '../fetchTileJson';
	import type { SourceProps } from '../types';

	interface VectorTileSourceProps extends SourceProps {
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
	}: VectorTileSourceProps = $props();

	let tileJsonData = $derived(url ? await fetchTileJSON(url) : {});

	const sourceSpec: VectorSourceSpecification = $derived({
		type: 'vector',
		tiles: tiles || tileJsonData.tiles || [],
		maxzoom: maxZoom || tileJsonData.maxZoom || 24,
		minzoom: minZoom || tileJsonData.minZoom || 0,
		attribution: attribution || tileJsonData.attribution || '',
		promoteId
	});
</script>

<MapSource {id} {sourceSpec} {children} />
