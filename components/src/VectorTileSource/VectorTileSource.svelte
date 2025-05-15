<script lang="ts">
	import { type Snippet } from 'svelte';
	import { type SourceSpecification } from 'maplibre-gl';
	import MapSource from '../MapSource/MapSource.svelte';

	interface VectorTileSourceProps {
		id: string;
		url: string;
		minZoom?: number;
		maxZoom?: number;
		children?: Snippet;
	}

	const { minZoom = 0, maxZoom = 24, id, url }: VectorTileSourceProps = $props();

	const sourceSpec: SourceSpecification = {
		type: 'vector',
		tiles: [url],
		maxzoom: maxZoom,
		minzoom: minZoom
	};
</script>

<MapSource {id} {minZoom} {maxZoom} {sourceSpec} />
