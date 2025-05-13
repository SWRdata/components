import type { Map as MapLibre } from 'maplibre-gl';
import { getContext, setContext } from 'svelte';

const MAP_CONTEXT_KEY = Symbol.for('map-context');

export class MapContext {
    map = $state() as MapLibre;
    loaded = $state(false);
}

export function getMapContext(): MapContext {
    return getContext(MAP_CONTEXT_KEY);
}

export function createMapContext(): MapContext {
    return setContext(MAP_CONTEXT_KEY, new MapContext());
}
