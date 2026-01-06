export interface Coordinates {
	latitude: number;
	longitude: number;
}

export interface LocationState {
	coordinates?: Coordinates;
	errorMsg?: string;
	loading: boolean;
}
