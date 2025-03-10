import { Coordinates, PreferencesState } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
  weather: (coords: Coordinates, unit: PreferencesState["unit"]) =>
    ["weather", coords, unit] as const,
  forecast: (coords: Coordinates, unit: PreferencesState["unit"]) =>
    ["forecast", coords, unit] as const,
  location: (coords: Coordinates) => ["location", coords] as const,
  search: (query: string) => ["locationSearch", query] as const,
} as const;

export const useWeatherQuery = (
  coordinates: Coordinates | null,
  unit: PreferencesState["unit"]
) => {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }, unit),
    queryFn: () =>
      coordinates ? weatherAPI.getCurrentWeather(coordinates, unit) : null,
    enabled: !!coordinates,
  });
};

export const useForecastQuery = (
  coordinates: Coordinates | null,
  unit: PreferencesState["unit"]
) => {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }, unit),
    queryFn: () =>
      coordinates ? weatherAPI.getForecast(coordinates, unit) : null,
    enabled: !!coordinates,
  });
};

export const useReverseGeocodeQuery = (coordinates: Coordinates | null) => {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
    enabled: !!coordinates,
  });
};

export const useLocationSearchQuery = (query: string) => {
  return useQuery({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: () => weatherAPI.searchLocations(query),
    enabled: query.length >= 3,
  });
};
