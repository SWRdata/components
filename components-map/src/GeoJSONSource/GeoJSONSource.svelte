<script lang="ts">
	// See: https://maplibre.org/maplibre-gl-js/docs/API/classes/GeoJSONSource/
	import { type GeoJSONSourceSpecification } from 'maplibre-gl';
	import MapSource from '../MapSource/MapSource.svelte';
	import type { SourceProps } from '../types';

	interface GeoJSONSourceProps extends Omit<SourceProps, 'children'> {
		/**
		 * GeoJSON object or URL
		 */
		data: GeoJSON.GeoJSON | string;
		/**
		 * Use a field from the feature data for IDs. Must coerce to integer.
		 */
		promoteId?: string;
		/**
		 * Use the feature index for IDs. Overrides `promoteId`.
		 */
		generateId?: boolean;
		lineMetrics?: boolean;
	}

	const {
		maxZoom = 24,
		id,
		data,
		attribution = '',
		promoteId,
		lineMetrics = false,
		generateId = false
	}: GeoJSONSourceProps = $props();

	const sourceSpec: GeoJSONSourceSpecification = $derived({
		type: 'geojson',
		maxzoom: maxZoom,
		attribution,
		promoteId,
		generateId,
		lineMetrics,
		data
	});
</script>

<MapSource {id} {sourceSpec} />
