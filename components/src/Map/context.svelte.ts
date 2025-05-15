import type { Map as MapLibre, Marker, Source, LayerSpecification } from 'maplibre-gl';
import { getContext, setContext } from 'svelte';

const MAP_CONTEXT_KEY = Symbol.for('map-context');
const SOURCE_CONTEXT_KEY = Symbol.for('source-context');
const LAYER_CONTEXT_KEY = Symbol.for('layer-context');
const POPUP_TARGET_KEY = Symbol.for("popup-target")

export class Box<T> {
    value = $state() as T;

    constructor(initialValue: T) {
        this.value = initialValue;
    }
}

export class MapContext {
    map = $state() as MapLibre;
    loaded = $state(false);
    minzoom = $state(0);
    maxzoom = $state(24);
}

export class SourceContext {
    source = $state() as Source;
    loaded = $state(false);
    minzoom = $state(0);
    maxzoom = $state(24);
}
export class LayerContext {
    layer = $state() as LayerSpecification;
}

export function setSourceContext(value: Box<string | undefined>) {
    setContext(SOURCE_CONTEXT_KEY, value);
}
export function setLayerContext(value: string) {
    setContext(LAYER_CONTEXT_KEY, value);
}

export function setPopupTarget(value: Box<Marker | string | undefined>) {
    setContext(POPUP_TARGET_KEY, value);
}

export function getPopupTarget(): Box<Marker | string> | undefined {
    return getContext(POPUP_TARGET_KEY);
}

export function updatedSourceContext() {
    const source = new Box<string | undefined>(undefined);
    setSourceContext(source);

    return {
        source,
    };
}

export function updatedLayerContext(interactive = true) {
    const layer = new Box<string | undefined>(undefined);
    setLayerContext(layer);

    if (interactive) {
        setPopupTarget(layer);
    }

    return {
        layer,
    };
}

export function getMapContext(): MapContext {
    return getContext(MAP_CONTEXT_KEY);
}
export function getSourceContext(): SourceContext {
    return getContext(SOURCE_CONTEXT_KEY);
}
export function getLayerContext(): LayerContext {
    return getContext(LAYER_CONTEXT_KEY);
}

export function createMapContext(): MapContext {
    return setContext(MAP_CONTEXT_KEY, new MapContext());
}
