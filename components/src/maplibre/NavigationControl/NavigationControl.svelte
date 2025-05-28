<script lang="ts">
	import maplibre, { type ControlPosition } from 'maplibre-gl';
	import MapControl from '../MapControl/MapControl.svelte';
	import './NavigationControl.css';

	interface NavigationControlProps {
		showCompass?: boolean;
		/**
		 * Show 3d tilt in the compass control. Requires `showCompass` to be `true`
		 */
		visualizePitch?: boolean;
		position?: ControlPosition;
	}
	const {
		showCompass = false,
		visualizePitch = false,
		position = 'bottom-left'
	}: NavigationControlProps = $props();
</script>

<MapControl control={new maplibre.NavigationControl({ showCompass, visualizePitch })} {position} />
