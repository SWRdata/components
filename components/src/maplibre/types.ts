import type { FillLayerSpecification, LineLayerSpecification } from 'maplibre-gl';

export type Layer = LineLayerSpecification | FillLayerSpecification;
export type GeocodingService = 'maptiler';
export type GeocodingCountry = 'de' | 'at';
export type GeocodingLanguage = 'de' | 'en';

export interface Location {
	lat: number;
	lng: number;
	zoom: number;
}
