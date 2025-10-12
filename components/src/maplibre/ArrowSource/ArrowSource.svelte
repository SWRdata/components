<script lang="ts">
	// See: https://maplibre.org/maplibre-gl-js/docs/API/classes/GeoJSONSource/
	import { type GeoJSONSourceSpecification } from 'maplibre-gl';
	import MapSource from '../Source/MapSource.svelte';
	import { getMapContext } from '../context.svelte.js';
	import { onDestroy } from 'svelte';
	import { default as calcSdf } from 'bitmap-sdf';
	const { map, styleLoaded } = $derived(getMapContext());

	interface ArrowSpec {
		a: [number, number]; // p0
		b: [number, number]; // p2
		c: [number, number]; // p1
		width?: number;
		debug?: boolean;
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

	const makeArrowHead = (width: number, height: number) => {
		const canvas = document.createElement('canvas');
		const c = canvas.getContext('2d');
		const w = Math.round(width);
		const h = Math.round(height);
		canvas.width = w;
		canvas.height = h;
		if (c) {
			c.fillStyle = 'white';
			c.beginPath();
			c.moveTo(0, 0);
			c.lineTo(w / 2, h);
			c.lineTo(w, 0);
			c.fill();

			const sdf = calcSdf(canvas);
			const data = new Uint8ClampedArray(w * h * 4);
			for (let i = 0; i < w; i++) {
				for (let j = 0; j < h; j++) {
					data[j * w * 4 + i * 4 + 0] = sdf[j * w + i] * 255;
					data[j * w * 4 + i * 4 + 1] = sdf[j * w + i] * 255;
					data[j * w * 4 + i * 4 + 2] = sdf[j * w + i] * 255;
					data[j * w * 4 + i * 4 + 3] = sdf[j * w + i] * 255;
				}
			}
			return new ImageData(data, w, h);
		}
	};

	const arrowsToJson = (arrows: JsonArrow[] = []) => {
		const tails = arrows.map((a) => {
			return {
				type: 'Feature',
				geometry: { type: 'LineString', coordinates: a.points },
				properties: { width: a.width, kind: 'arrow-tail' }
			};
		});

		const heads = arrows.map((a) => {
			const bc = a.points[a.points.length - 1][0] - a.points[a.points.length - 2][0];
			const ac = a.points[a.points.length - 1][1] - a.points[a.points.length - 2][1];
			const ba = Math.sqrt(bc * bc + ac * ac);
			const angle = Math.asin(bc / ba) * (180 / Math.PI) - 180;
			return {
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: a.points[a.points.length - 1]
				},
				properties: { kind: 'arrow-head', angle, size: (a.width / 20) * 1.35 }
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
			points.push([x.toFixed(4), y.toFixed(4)]);
		}

		return [...points, b] as [number, number][];
	};
	$effect(() => {
		const s = 6.5;
		const ah = makeArrowHead(10 * s, 10 * s * 0.75, 'black');
		if (map && styleLoaded && ah) {
			map.addImage('arrow-head', ah, { sdf: true, pixelRatio: 2 });
		}
	});
	onDestroy(() => {
		if (map && styleLoaded) {
			map.removeImage('arrow-head');
		}
	});
	const ar = arrows.map((a) => {
		return { width: a.width || 10, points: quadraticToPoints(a.a, a.b, a.c, 20) };
	});

	const data = arrowsToJson(ar);

	const sourceSpec: GeoJSONSourceSpecification = {
		type: 'geojson',
		lineMetrics: true,
		maxzoom: 24,
		attribution,
		data
	};
</script>

<MapSource {id} {sourceSpec} />
