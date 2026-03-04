<script lang="ts">
	import { type VectorSourceSpecification } from 'maplibre-gl';
	import MapSource from '../Source/MapSource.svelte';

	interface VectorTileSourceProps {
		id: string;
		url?: string;
		tiles?: string[];
		minZoom?: number;
		maxZoom?: number;
		/**
		 * Attribution string for your data, usually rendered using an `<AttributionControl>`
		 */
		attribution?: string;
	}

	const {
		minZoom = 0,
		maxZoom = 24,
		id,
		url = '',
		tiles = [],
		attribution = ''
	}: VectorTileSourceProps = $props();

	const sourceSpec: VectorSourceSpecification = {
		type: 'vector',
		url,
		tiles,
		maxzoom: maxZoom,
		minzoom: minZoom,
		attribution
	};
</script>

<MapSource {id} {sourceSpec} />
