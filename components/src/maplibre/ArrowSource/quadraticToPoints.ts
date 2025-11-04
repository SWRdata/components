import type { V2 } from './types';

/**
 * Returns the euclidian distance between two points
 */
const distance = (a: V2, b: V2) => {
	return Math.sqrt((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2);
};

/**
 * Given a sorted array arr and a value, returns the index i of arr
 * such that arr[i] < value && arr[i + 1] > value using binary search
 */
const getSortedIndex = (arr: number[], v: number) => {
	let low = 0,
		high = arr.length;
	while (low < high) {
		let mid = (low + high) >>> 1; // === Math.abs((low + high) * .5) but faster
		if (arr[mid] < v) low = mid + 1;
		else high = mid;
	}
	return low;
};

/**
 * Given a polyline, returns n evenly-spaced points on the polyline
 */
const interpolatePolyline = (points: V2[], n: number) => {
	let res: V2[] = [],
		totalLength: number = 0,
		segments: number[] = [0];

	for (let i = 0; i < points.length - 2; i++) {
		totalLength += distance(points[i], points[i + 1]);
		segments.push(totalLength);
	}

	for (let i = 0; i < n; i++) {
		const d: number = totalLength * (i / n);
		const si: number = getSortedIndex(segments, d);
		const p0 = points[si];
		const p1 = points[si + 1];

		const sn = [p1[0] - p0[0], p1[1] - p0[1]];
		const segmentFraction = (d - segments[si]) / distance(p0, p1);

		res.push([p1[0] + sn[0] * segmentFraction, p1[1] + sn[1] * segmentFraction]);
	}

	return res;
};

/**
 * Given a quadratic Bezier defined by points a, b and c
 * returns a series of evenly-spaced points on the curve
 *
 * Sources:
 * - https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Quadratic_B%C3%A9zier_curves
 * - https://bit-101.com/blog/posts/2024-09-29/evenly-placed-points-on-bezier-curves
 */

const quadraticToPoints = (a: V2, b: V2, c: V2, n = 25) => {
	let points: V2[] = [];

	// 1. Interpolate the quadratic bezier function to obtain an uneven polyline
	for (let i = 0; i < n; i++) {
		const t = i / n;
		points.push([
			(1 - t) * ((1 - t) * a[0] + t * c[0]) + t * ((1 - t) * c[0] + t * b[0]),
			(1 - t) * ((1 - t) * a[1] + t * c[1]) + t * ((1 - t) * c[1] + t * b[1])
		]);
	}

	// 2. Interpolate the polyline from (1) to get evenly-spaced points
	points = interpolatePolyline([...points, b], n);

	return points;
};

export default quadraticToPoints;
