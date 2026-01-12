import { EARTH_RADIUS_M, TO_RAD } from "@constants/geography.constants";

export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  // Radians conversion
  const phi1 = lat1 * TO_RAD;
  const phi2 = lat2 * TO_RAD;

  // Delta calculation
  const dLat = (lat2 - lat1) * TO_RAD;
  const dLon = (lon2 - lon1) * TO_RAD;

  // Haversine formula
  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);

  // Intermediate calculation
  const a =
    sinDLat * sinDLat + Math.cos(phi1) * Math.cos(phi2) * sinDLon * sinDLon;

  return EARTH_RADIUS_M * 2 * Math.asin(Math.sqrt(a));
}
