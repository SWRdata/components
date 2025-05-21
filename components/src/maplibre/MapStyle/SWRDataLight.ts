import type { StyleSpecification } from 'maplibre-gl';

import makeAdmin from './components/Admin';
import makeBuildings from './components/Buildings';
import makeLanduse from './components/Landuse';
import makeTransit from './components/Transit';
import makePlaceLabels from './components/PlaceLabels';
import makeWalking from './components/Walking';
import makeRoads from './components/Roads';

const { buildings } = makeBuildings();
const { landuse } = makeLanduse();
const { placeLabels } = makePlaceLabels();
const { admin } = makeAdmin();
const { airports, transitBridges, transitSurface, transitTunnels } = makeTransit();
const { walkingLabels, walkingTunnels, walkingSurface, walkingBridges } = makeWalking();
const { roadLabels, roadBridges, roadSurface, roadTunnels } = makeRoads();

const style: StyleSpecification = {
	version: 8,
	name: 'swr-datalab-light',
	metadata: { license: 'https://creativecommons.org/publicdomain/zero/1.0/' },
	glyphs: 'https://static.datenhub.net/maps/fonts/{fontstack}/{range}.pbf',
	sources: {
		'versatiles-osm': {
			attribution:
				'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			tiles: ['https://tiles.versatiles.org/tiles/osm/{z}/{x}/{y}'],
			bounds: [-180, -85.0511287798066, 180, 85.0511287798066],
			type: 'vector',
			scheme: 'xyz',
			minzoom: 0,
			maxzoom: 14
		}
	},
	layers: [
		// 1. Landuse
		...landuse,
		...airports,

		// 2. Tunnels
		...walkingTunnels,
		...roadTunnels,
		...transitTunnels,

		// 3. Surface ways
		...walkingSurface,
		...roadSurface,
		...transitSurface,

		// 4. Bridges ways
		...walkingBridges,
		...roadBridges,
		...transitBridges,

		// 5. Buildings
		...buildings,

		// 6. Admin boundaries
		...admin,

		// 7. Labels
		...walkingLabels,
		...roadLabels,
		...placeLabels
	]
};

export default style;
