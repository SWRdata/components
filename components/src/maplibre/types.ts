import type {
	FillExtrusionLayerSpecification,
	FillLayerSpecification,
	LineLayerSpecification
} from 'maplibre-gl';
import type { Snippet } from 'svelte';

export type Layer =
	| LineLayerSpecification
	| FillLayerSpecification
	| FillExtrusionLayerSpecification;

export type GeocodingService = 'maptiler';
export type GeocodingCountry = 'de' | 'at' | 'ch';
export type GeocodingLanguage = 'de' | 'en' | 'it' | 'nl' | 'fr';

export type GeocodingPlaceType =
	| 'continental_marine'
	| 'country'
	| 'major_landform'
	| 'region'
	| 'subregion'
	| 'county'
	| 'joint_municipality'
	| 'joint_submunicipality'
	| 'municipality'
	| 'municipal_district'
	| 'locality'
	| 'neighbourhood'
	| 'place'
	| 'postal_code'
	| 'address'
	| 'road'
	| 'poi';

export type V2 = [number, number];

export interface Location {
	lat: number;
	lng: number;
	zoom: number;
	pitch?: number;
}

export interface SourceProps {
  id: string;
  minZoom?: number;
	maxZoom?: number;
		/**
		 * Attribution string for your data, usually rendered using an `<AttributionControl/>`
		 */
  attribution?: string;
  children?: Snippet;

}
