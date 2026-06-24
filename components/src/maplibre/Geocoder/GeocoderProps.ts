import { Map } from 'maplibre-gl';
import {
	type GeocodingCountry,
	type GeocodingLanguage,
	type GeocodingPlaceType,
	type GeocodingService
} from '../types';

export default interface GeocoderProps {
	map?: Map | null;
	service: GeocodingService;
	/**
	 * API key for selected geocoding `service`
	 */
	key: string;
	/**
	 * Limit the number of returned suggestions
	 */
	limit?: number;
	/**
	 * Limit search to one or more countries
	 */
	countries?: GeocodingCountry | GeocodingCountry[];
	/**
	 * Limit search to one or more result type
	 */
	types?: GeocodingPlaceType | GeocodingPlaceType[];
	/**
	 * Limit search to a [w, s, e, n] bounding box
	 */
	bbox?: number[];
	/**
	 * Limit search to one or more languages. The UI is localised to the first language specified if [available](https://github.com/maplibre/maplibre-gl-geocoder/blob/main/lib/localization.ts).
	 */
	languages?: GeocodingLanguage | GeocodingLanguage[];
	/**
	 * Overwrite the default input placeholder
	 */
	placeholder?: string;
	size?: 'small' | 'default';
}
