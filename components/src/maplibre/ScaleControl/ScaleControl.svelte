<script lang="ts">
	import maplibre, { type ControlPosition, type Unit } from 'maplibre-gl';
	import MapControl from '../MapControl/MapControl.svelte';
	import './ScaleControl.css';

	interface ScaleControlProps {
		maxWidth?: number | undefined;
		position?: ControlPosition;
		unit?: Unit;
	}
	let { maxWidth = 100, unit = 'metric', position = 'bottom-left' }: ScaleControlProps = $props();
</script>

<MapControl control={new maplibre.ScaleControl({ maxWidth, unit })} {position} />
