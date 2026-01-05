/**
 * Distance calculation utilities using Haversine formula
 */

const EARTH_RADIUS_KM = 6371;

/**
 * Converts degrees to radians
 */
function toRadians(degrees: number): number {
	return degrees * (Math.PI / 180);
}

/**
 * Calculates the distance between two GPS coordinates using Haversine formula
 * @param lat1 - Latitude of first point
 * @param lon1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lon2 - Longitude of second point
 * @returns Distance in kilometers
 */
export function calculateDistance(
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number,
): number {
	const dLat = toRadians(lat2 - lat1);
	const dLon = toRadians(lon2 - lon1);

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRadians(lat1)) *
			Math.cos(toRadians(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return EARTH_RADIUS_KM * c;
}

/**
 * Formats a distance in kilometers to a human-readable string
 * @param km - Distance in kilometers
 * @returns Formatted string like "850 m" or "2.3 km"
 */
export function formatDistance(km: number): string {
	if (km < 1) {
		const meters = Math.round(km * 1000);
		return `${meters} m`;
	}

	if (km < 10) {
		return `${km.toFixed(1)} km`;
	}

	return `${Math.round(km)} km`;
}
