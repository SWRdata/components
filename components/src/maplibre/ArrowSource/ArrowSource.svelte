<script lang="ts">
	import { type GeoJSONSourceSpecification } from 'maplibre-gl';

	import MapSource from '../Source/MapSource.svelte';
	import { getMapContext } from '../context.svelte.js';
	import { onDestroy } from 'svelte';

	const { map } = $derived(getMapContext());

	interface ArrowSpec {
		a: [number, number];
		b: [number, number];
		c: [number, number];
		width?: number;
	}

	interface ArrowSourceProps {
		id: string;
		attribution: string;
		arrows: ArrowSpec[];
	}

	const { id, arrows = [], attribution = '' }: ArrowSourceProps = $props();

	interface JsonArrow {
		width: number;
		points: [number, number][];
	}

	const arrowsToJson = (arrows: JsonArrow[] = []) => {
		if (!map)
			return {
				type: 'FeatureCollection',
				features: []
			} as GeoJSON.GeoJSON;

		const tails = arrows.map((a, i) => {
			return {
				type: 'Feature',
				geometry: { type: 'LineString', coordinates: a.points },
				properties: { width: a.width, kind: 'arrow-tail', id: i }
			};
		});

		const heads = arrows.map((arrow, i) => {
			const a = Object.values(map.project(arrow.points[arrow.points.length - 1]));
			const b = Object.values(map.project(arrow.points[arrow.points.length - 2]));

			const ab = [b[0] - a[0], b[1] - a[1]];
			const d = Math.sqrt(ab[0] * ab[0] + ab[1] * ab[1]);
			const t = [-ab[1] / d, ab[0] / d];
			const s = arrow.width * 1.333;

			const coordinates = [
				map?.unproject(a).toArray(),
				map?.unproject([a[0] + t[0] * s, a[1] + t[1] * s]).toArray(),
				map?.unproject([a[0] - ab[0], a[1] - ab[1]]).toArray(),
				map?.unproject([a[0] - t[0] * s, a[1] - t[1] * s]).toArray()
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

	const quadraticToPoints = (
		a: [number, number],
		b: [number, number],
		c: [number, number],
		pointCount = 10
	) => {
		// B(t) = (1-t)[(1-t)P0 + tP1] + t[(1-t)P1+tP2]
		// This is a naive implementation but good enough for now
		// See: https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Quadratic_B%C3%A9zier_curves
		// https://bit-101.com/blog/posts/2024-09-29/evenly-placed-points-on-bezier-curves

		let points = [];
		for (let n = 0; n < pointCount; n++) {
			const t = n / pointCount;
			const x = (1 - t) * ((1 - t) * a[0] + t * c[0]) + t * ((1 - t) * c[0] + t * b[0]);
			const y = (1 - t) * ((1 - t) * a[1] + t * c[1]) + t * ((1 - t) * c[1] + t * b[1]);
			points.push([x, y]);
		}

		return [...points, b] as [number, number][];
	};

	onDestroy(() => {
		if (map) {
			map.removeImage('arrow-head');
		}
	});
	const ar = arrows.map((a) => {
		return { width: a.width || 10, points: quadraticToPoints(a.a, a.b, a.c, 4) };
	});

	const sourceSpec: GeoJSONSourceSpecification = {
		type: 'geojson',
		maxzoom: 24,
		attribution,
		promoteId: 'id',
		lineMetrics: true,
		data: arrowsToJson(ar)
	};
</script>

<MapSource {id} {sourceSpec} />
