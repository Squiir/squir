import { Coordinates } from "@app-types/location";

export function flattenCoordinates<T extends { coordinates?: Coordinates }>(
	params?: T,
):
	| (Omit<T, "coordinates"> & { latitude?: number; longitude?: number })
	| undefined {
	if (!params) return;

	const { coordinates, ...rest } = params;

	return {
		...rest,
		...(coordinates
			? {
					latitude: coordinates.latitude,
					longitude: coordinates.longitude,
				}
			: {}),
	};
}
