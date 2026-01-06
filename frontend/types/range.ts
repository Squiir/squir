export interface Range<T = number> {
	min?: T;
	max?: T;
}

export type FlattenedRange<T> = {
	[K in keyof T as T[K] extends Range<any> | undefined ? never : K]: T[K];
} & {
	[K in keyof T as T[K] extends Range<infer V> | undefined
		? `min${Capitalize<K & string>}` | `max${Capitalize<K & string>}`
		: never]?: T[K] extends Range<infer V> | undefined ? V : never;
};
