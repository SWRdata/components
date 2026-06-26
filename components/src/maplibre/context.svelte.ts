import type {
	Map as MapLibre,
	Marker,
	LayerSpecification,
	AddLayerObject,
	SourceSpecification
} from 'maplibre-gl';

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
	idle = $state(false);
	private _pending: ((map: maplibregl.Map) => void)[] = [];
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

	waitForStyleLoaded(fn: (map: maplibregl.Map) => void) {
		if (!this.map) return;
		this.map.style._loaded ? fn(this.map) : this._pending.push(fn);
	}

	addSource(id: string, spec: SourceSpecification) {
		if (!this.map) throw new Error('map not initialized');
		this.map.addSource(id, spec);
	}

	addLayer(spec: AddLayerObject, placeBelow: string | undefined) {
		if (!this.map) throw new Error('map not initialized');

		const style = this.map.getStyle();
		const beforeId = placeBelow
			? style.layers.find((l) => {
					return l.id === placeBelow;
				})?.id
			: undefined;

		beforeId ? this.map.addLayer(spec, beforeId) : this.map.addLayer(spec);
	}

	removeSource(id: string) {
		if (!this.map) throw new Error('map not initialized');
		const layers = this.map?.getStyle().layers;
		layers
			.filter((l) => l.type !== 'background' && l.source == id)
			.forEach((l) => {
				this.map?.removeLayer(l.id);
			});

		this.map.removeSource(id);
	}

	private _onstyledata(e: maplibregl.MapStyleDataEvent) {
		this.styleLoaded = true;
		this._pending.forEach((fn) => {
			fn(e.target);
		});
		this._pending = [];
	}
	private _onIdle(e: maplibregl.MapLibreEvent) {
		this.idle = true;
	}
}

export class SourceContext {
	_source = $state();
	loaded = $state(false);
	minzoom = $state(0);
	maxzoom = $state(24);

	get source() {
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
