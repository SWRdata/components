// Source: https://github.com/MIERUNE/svelte-maplibre-gl/blob/main/src/lib/maplibre/utils.ts

import type { Evented, Listener, Map, MapLayerEventType } from "maplibre-gl";

export function resetEventListener(
    evented: Evented | null | undefined,
    type: string,
    listener: Listener | undefined,
) {
    if (listener) {
        evented?.on(type, listener);
    }
    const prevListener = listener;
    return () => {
        if (prevListener) {
            evented?.off(type, prevListener);
        }
    };
}

export function resetLayerEventListener(
    map: Map | null,
    type: keyof MapLayerEventType,
    layer: string,
    listener: Listener | undefined
) {
    if (listener) {
        map?.on(type, layer, listener);
    }
    const prevListener = listener;
    return () => {
        if (prevListener) {
            map?.off(type, layer, prevListener);
        }
    };
}