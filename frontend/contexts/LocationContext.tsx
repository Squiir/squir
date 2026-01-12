import { LocationState } from "@app-types/location";
import { DEFAULT_LOCATION } from "@constants/location";
import { useMyLocation } from "@hooks/location/use-my-location";
import { createContext, PropsWithChildren, useContext } from "react";

export const LocationContext = createContext<LocationState>({
	loading: true,
});

export function LocationProvider({ children }: PropsWithChildren) {
	const location = useMyLocation(DEFAULT_LOCATION);
	return (
		<LocationContext.Provider value={location}>
			{children}
		</LocationContext.Provider>
	);
}

export function useLocation() {
	const context = useContext(LocationContext);
	if (!context) {
		throw new Error("useLocation must be used within LocationProvider");
	}

	return context;
}
