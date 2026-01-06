export interface DefaultFilter<T> {
	sortBy: keyof T;
	orderBy: "asc" | "desc";
}
