<script lang="ts">
	import { type PromoteIdSpecification, type VectorSourceSpecification } from 'maplibre-gl';
	import type { TileJsonData } from './types';

	import MapSource from '../Source/MapSource.svelte';
	import fetchTileJSON from './fetchTileJson';
	import type { Snippet } from 'svelte';

	interface VectorTileSourceProps {
		id: string;
		url?: string;
		tiles?: string[];
		minZoom?: number;
		maxZoom?: number;
		/**
		 * Attribution string for your data, usually rendered using an `<AttributionControl/>`
		 */
		attribution?: string;
		promoteId?: PromoteIdSpecification;
		children?: Snippet;
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
