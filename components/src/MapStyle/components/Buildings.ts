import { type Layer } from "./types"

export default function makeBuildings(): any {
    const buildings: Layer[] = [{
        id: 'building-fill',
        type: 'fill',
        paint: {
            'fill-color': 'hsl(240, 4%, 90%)',
            'fill-opacity': {
                stops: [
                    [14, 0],
                    [15, 1]
                ]
            }
        }
    }]

    // Set common properties
    buildings.forEach(l => {
        l["source"] = "versatiles-osm"
        l["source-layer"] = "buildings"
    })

    return { buildings }
}