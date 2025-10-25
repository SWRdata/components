<script lang="ts">
	import { type GeoJSONSourceSpecification } from 'maplibre-gl';

	import MapSource from '../Source';
	import { getMapContext } from '../context.svelte.js';
	import quadraticToPoints from './quadraticToPoints';
	import { onDestroy } from 'svelte';
	import type { V2 } from './types';

	const { map } = $derived(getMapContext());

	interface ArrowSourceProps {
		id: string;
		attribution: string;
		arrows: ArrowSpec[];
	}

	interface ArrowSpec {
		a: V2;
		b: V2;
		c: V2;
		width?: number;
		headScale?: V2;
	}

	interface JsonArrow {
		width: number;
		points: V2[];
		headScale?: V2;
	}

	const { id, arrows = [], attribution = '' }: ArrowSourceProps = $props();

	const ars: JsonArrow[] = arrows.map((a) => {
		return {
			width: a.width || 10,
			points: quadraticToPoints(a.a, a.b, a.c, 10),
			headScale: a.headScale
		};
	});

	const arrowsToJson = (arrows: JsonArrow[] = []) => {
		if (!map) return { type: 'FeatureCollection', features: [] } as GeoJSON.GeoJSON;

		const tails = ars.map((a, i) => {
			return {
				type: 'Feature',
				geometry: { type: 'LineString', coordinates: a.points },
				properties: { width: a.width, kind: 'arrow-tail', id: i }
			};
		});

		const heads = ars.map((arrow, i) => {
			const a = Object.values(map.project(arrow.points[arrow.points.length - 1])) as V2;
			const b = Object.values(map.project(arrow.points[arrow.points.length - 2])) as V2;

			const ab = [b[0] - a[0], b[1] - a[1]];
			const d = Math.sqrt(ab[0] * ab[0] + ab[1] * ab[1]);
			const t = [-ab[1] / d, ab[0] / d];
			const s = arrow.headScale
				? [arrow.width * arrow.headScale[0], arrow.width * arrow.headScale[1]]
				: [arrow.width * 1.33, arrow.width * 1.5];

			const coordinates = [
				map?.unproject(a).toArray(),
				map?.unproject([a[0] + t[0] * s[0], a[1] + t[1] * s[0]]).toArray(),
				map?.unproject([a[0] - (ab[0] / d) * s[0], a[1] - (ab[1] / d) * s[1]]).toArray(),
				map?.unproject([a[0] - t[0] * s[0], a[1] - t[1] * s[0]]).toArray()
			];

			return {
				type: 'Feature',
				geometry: { type: 'Polygon', coordinates: [coordinates] },
				properties: { kind: 'arrow-head', id: arrows.length + i }
			};
		});

		return {
			type: 'FeatureCollection',
			features: [...tails, ...heads]
		} as GeoJSON.GeoJSON;
	};

	let sourceSpec: GeoJSONSourceSpecification = $state({
		attribution,
		type: 'geojson',
		promoteId: 'id',
		lineMetrics: true,
		data: arrowsToJson(ars)
	});

	const onZoom = () => {
		sourceSpec = { ...sourceSpec, data: arrowsToJson(ars) };
	};
	$effect(() => {
		map?.on('zoom', onZoom);
	});
	onDestroy(() => {
		map?.off('zoom', onZoom);
	});
</script>

<MapSource {id} {sourceSpec} />
