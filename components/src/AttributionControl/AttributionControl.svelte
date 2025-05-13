<script lang="ts">
	import { type ControlPosition, AttributionControl } from 'maplibre-gl';
	import MapControl from '../MapControl/MapControl.svelte';
	interface AttributionControlProps {
		compact?: boolean;
		position?: ControlPosition;
	}
	const { compact = false, position = 'bottom-right' }: AttributionControlProps = $props();
</script>

<MapControl control={new AttributionControl({ compact })} {position} />

<style>
	:global {
		.maplibregl-ctrl.maplibregl-ctrl-attrib {
			font-size: var(--fs-small-3);
			font-family: var(--swr-sans);
		}
		.maplibregl-ctrl-attrib-button {
			position: absolute;
			width: 12px;
			bottom: 0;
			transform: translateX(-100%);
			cursor: pointer;
		}
		.maplibregl-ctrl-attrib.maplibregl-compact .maplibregl-ctrl-attrib-button,
		.maplibregl-ctrl-attrib.maplibregl-compact-show .maplibregl-ctrl-attrib-inner {
			display: block;
		}
		.maplibregl-ctrl-attrib.maplibregl-compact-show .maplibregl-ctrl-attrib-button {
			background-color: rgb(0 0 0/5%);
		}
		.maplibregl-ctrl-bottom-right > .maplibregl-ctrl-attrib.maplibregl-compact:after {
			bottom: 0;
			right: 0;
		}
		.maplibregl-ctrl-top-right > .maplibregl-ctrl-attrib.maplibregl-compact:after {
			right: 0;
			top: 0;
		}
		.maplibregl-ctrl-top-left > .maplibregl-ctrl-attrib.maplibregl-compact:after {
			left: 0;
			top: 0;
		}
		.maplibregl-ctrl-bottom-left > .maplibregl-ctrl-attrib.maplibregl-compact:after {
			bottom: 0;
			left: 0;
		}
		.maplibregl-ctrl-attrib a {
			color: rgba(0, 0, 0, 0.75);
			text-decoration: none;
		}
		.maplibregl-ctrl-attrib a:hover {
			color: inherit;
			text-decoration: underline;
		}
		.maplibregl-attrib-empty {
			display: none;
		}
	}
</style>
