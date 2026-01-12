import { FlattenedRange, Range } from "@app-types/range";

export function flattenRangeParams<
	T extends Record<string, unknown> | undefined,
>(obj: T): FlattenedRange<T> {
	const result: Record<string, unknown> = {};

	if (!obj) return result as FlattenedRange<T>;

	for (const key in obj) {
		if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

		const value = obj[key];

		if (
			value !== null &&
			typeof value === "object" &&
			!Array.isArray(value) &&
			("min" in value || "max" in value)
		) {
			const range = value as Range<unknown>;
			const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);

			if (range.min !== undefined) {
				result[`min${capitalizedKey}`] = range.min;
			}
			if (range.max !== undefined) {
				result[`max${capitalizedKey}`] = range.max;
			}
		} else {
			result[key] = value;
		}
	}

	return result as FlattenedRange<T>;
}
