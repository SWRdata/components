import Color from 'color';
import { range } from 'd3-array';

/**
 * Get color range of n colors
 * @param {*} from
 * @param {*} to
 * @param {*} props
 * @returns
 */
const getColorsBetween = (from, to, props = { n: 1, includeFromTo: false }) => {
  const step = 1 / (props.n + 1);
  const fromColor = Color(from);
  const toColor = Color(to);
  const colorsBetween = range(1, props.n + 1)
    .map((i) => fromColor.mix(toColor, i * step))
    .map((c) => c.hex().toString());
  if (props.includeFromTo) {
    return [from, ...colorsBetween, to];
  } else {
    return colorsBetween;
  }
};

export default getColorsBetween;
