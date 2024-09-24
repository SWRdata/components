import { merge } from 'topojson-client';
import { range } from 'd3-array';

/**
 * Calc laender borders from kreis or gemeinden topojson
 * @param {object} topojson
 * @returns geojson
 */
const getLaenderFromTopo = (topo) => {
  const states = [];
  const stateIds = range(1, 17).map((n) => String(n).padStart(2, '0'));
  const key = Object.keys(topo.objects)[0];

  stateIds.forEach((id) => {
    const state = {
      geometry: merge(
        topo,
        topo.objects[key].geometries.filter(
          (g) => g.properties.id && g.properties.id.startsWith(id)
        )
      ),
      id,
      type: 'Feature',
      properties: { id }
    };
    states.push(state);
  });

  return {
    type: 'FeatureCollection',
    features: states
  };
};

export default getLaenderFromTopo;
