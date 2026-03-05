// Workaround for https://github.com/versatiles-org/versatiles-rs/issues/184
// Drop when/if this lands: https://github.com/maplibre/maplibre-gl-js/issues/182

import { type TileJsonData } from './types';

export default async function fetchTileJSON(url: string): Promise<TileJsonData> {
	const u = new URL(url);
	const res = await fetch(u);
	const data = await res.json();

	// Simple heuristic for absolute URLs
	const re = /(((http)s?)):\/\/.*/gi;

	return {
		tiles: data?.tiles.map((path: string) => (re.test(path) ? path : `${u.origin}${path}`)),
		attribution: data?.attribution || data?.author,
		minZoom: data?.minzoom,
		maxZoom: data?.maxzoom
	};
}
