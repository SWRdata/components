import { feature } from 'topojson-client';

/**
 * Convert topojson to geojson
 * @param {object} topojson
 * @returns {object} geojson
 */
const topoToGeo = (topojson) => {
	const key = Object.keys(topojson.objects)[0];
	return feature(topojson, topojson.objects[key]);
};

export default topoToGeo;
