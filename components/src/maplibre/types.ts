import type { FillLayerSpecification, LineLayerSpecification } from 'maplibre-gl';

export type Layer = LineLayerSpecification | FillLayerSpecification;
export interface Location {
	lat: number;
	lng: number;
	zoom: number;
}
