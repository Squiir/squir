export interface Coordinates {
	latitude: number;
	longitude: number;
}

export interface LocationState {
	coordinates?: Coordinates;
	error?: string;
	loading: boolean;
}
