<script lang="ts">
	import maplibre, { type ControlPosition } from 'maplibre-gl';
	import MapControl from '../MapControl/MapControl.svelte';
	import './AttributionControl.css';

	interface AttributionControlProps {
		position?: ControlPosition;
		customAttribution?: string;
	}
	const { position = 'bottom-right', customAttribution }: AttributionControlProps = $props();
</script>

<MapControl
	{position}
	control={new maplibre.AttributionControl({
		customAttribution,
		compact: false
	})}
/>
