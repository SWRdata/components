<script lang="ts">
	import maplibre, { type ControlPosition, type Unit } from 'maplibre-gl';
	import MapControl from '../MapControl/MapControl.svelte';

	interface ScaleControlProps {
		maxWidth?: number | undefined;
		position?: ControlPosition;
		unit?: Unit;
	}
	let { maxWidth = 100, unit = 'metric', position = 'bottom-left' }: ScaleControlProps = $props();
</script>

<MapControl control={new maplibre.ScaleControl({ maxWidth, unit })} {position} />

<style lang="scss">
	.maplibregl-ctrl-scale {
		color: inherit;
		border-bottom: 1px solid currentColor;
		font-weight: 400;
		font-size: var(--fs-small-3);
		font-family: var(--swr-text);
	}
</style>
