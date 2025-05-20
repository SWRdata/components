import type { Map as MapLibre, Marker, LayerSpecification } from 'maplibre-gl';
import { getContext, setContext } from 'svelte';

const MAP_CONTEXT_KEY = Symbol.for('map-context');
const SOURCE_CONTEXT_KEY = Symbol.for('source-context');
const LAYER_CONTEXT_KEY = Symbol.for('layer-context');
const POPUP_TARGET_KEY = Symbol.for('popup-target');

export class Box<T> {
	value = $state() as T;

	constructor(initialValue: T) {
		this.value = initialValue;
	}
}

export class MapContext {
	_map = $state(null) as MapLibre | null;
	minzoom = $state(0);
	maxzoom = $state(24);
	styleLoaded = $state(false);
	private _listener?: maplibregl.Listener = undefined;

	get map() {
		return this._map;
	}

	set map(value: maplibregl.Map | null) {
		// Unbind any old event listeners
		if (this._listener) {
			this._map?.off('styledata', this._listener);
			this._listener = undefined;
		}
		// Set new map instance and bind new event listeners
		this._map = value;
		if (this._map) {
			this._listener = this._onstyledata.bind(this);
			this._map.on('styledata', this._listener);
		}
	}

	private _onstyledata(e: maplibregl.MapStyleDataEvent) {
		this.styleLoaded = true;
	}
}

export class SourceContext {
	_source = $state();
	loaded = $state(false);
	minzoom = $state(0);
	maxzoom = $state(24);

	get source() {
		console.log('gettign source');
		return this._source;
	}
}
export class LayerContext {
	layer = $state() as LayerSpecification;
}

export function setPopupTarget(value: Box<Marker | string | undefined>) {
	setContext(POPUP_TARGET_KEY, value);
}

export function getPopupTarget(): Box<Marker | string> | undefined {
	return getContext(POPUP_TARGET_KEY);
}

export function createMapContext(): MapContext {
	console.log('Setting map context');
	return setContext(MAP_CONTEXT_KEY, new MapContext());
}
export function getMapContext(): MapContext {
	return getContext(MAP_CONTEXT_KEY);
}

export function createSourceContext(): SourceContext {
	return setContext(SOURCE_CONTEXT_KEY, new SourceContext());
}
export function getSourceContext(): SourceContext {
	return getContext(SOURCE_CONTEXT_KEY);
}

export function getLayerContext(): LayerContext {
	return getContext(LAYER_CONTEXT_KEY);
}

export function setLayerContext(value: string) {
	setContext(LAYER_CONTEXT_KEY, value);
}
