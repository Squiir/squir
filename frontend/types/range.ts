export interface Range<T = number> {
	min?: T;
	max?: T;
}

type RangeValue<T> = NonNullable<T> extends Range<infer V> ? V : never;

export type FlattenedRange<T> = {
	// si RangeValue n'est pas une range, on garde la clé K
	[K in keyof T as RangeValue<T[K]> extends never ? K : never]: T[K];
} & {
	// si RangeValue est une range, on génère min/max
	[K in keyof T as RangeValue<T[K]> extends never
		? never
		:
				| `min${Capitalize<K & string>}`
				| `max${Capitalize<K & string>}`]?: RangeValue<T[K]>;
};
