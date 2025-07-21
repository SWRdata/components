import type {
	FillExtrusionLayerSpecification,
	FillLayerSpecification,
	LineLayerSpecification
} from 'maplibre-gl';

export type Layer =
	| LineLayerSpecification
	| FillLayerSpecification
	| FillExtrusionLayerSpecification;
export type GeocodingService = 'maptiler';
export type GeocodingCountry = 'de' | 'at';
export type GeocodingLanguage = 'de' | 'en';

export interface Location {
	lat: number;
	lng: number;
	zoom: number;
	pitch?: number;
}
