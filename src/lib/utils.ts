import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTemp = (
  temp: number,
  unit: "standard" | "metric" | "imperial"
) => {
  return unit === "standard"
    ? `${Math.round(temp)} K`
    : unit === "metric"
    ? `${Math.round(temp)} °C`
    : unit === "imperial"
    ? `${Math.round(temp)} °F`
    : null;
};

export const correctTempUnits = (
  temp: unknown,
  unit: "standard" | "metric" | "imperial"
): string | null => {
  return unit === "standard"
    ? `${temp} K`
    : unit === "metric"
    ? `${temp} °C`
    : unit === "imperial"
    ? `${temp} °F`
    : null;
};
