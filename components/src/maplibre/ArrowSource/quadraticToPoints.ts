/**
Given a quadratic bezier defined by points a, b and c,
returns a series of n points on the curve

The quadratic bezier is: B(t) = (1-t)[(1-t)P0 + tP1] + t[(1-t)P1+tP2]
Source: https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Quadratic_B%C3%A9zier_curves

Below is a naive implementation but good enough for now. For a better approach see:
https://bit-101.com/blog/posts/2024-09-29/evenly-placed-points-on-bezier-curves
 */

import type { V2 } from './types';

const quadraticToPoints = (a: V2, b: V2, c: V2, n = 10) => {
	let points = [];
	for (let i = 0; i < n; i++) {
		const t = i / n;
		const x = (1 - t) * ((1 - t) * a[0] + t * c[0]) + t * ((1 - t) * c[0] + t * b[0]);
		const y = (1 - t) * ((1 - t) * a[1] + t * c[1]) + t * ((1 - t) * c[1] + t * b[1]);
		points.push([x, y]);
	}
	return [...points, b] as V2[];
};

export default quadraticToPoints;
