import { useMemo } from "react";

type DateFormatOptions = {
	day?: "numeric" | "2-digit";
	month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
	year?: "numeric" | "2-digit";
	hour?: "numeric" | "2-digit";
	minute?: "numeric" | "2-digit";
	second?: "numeric" | "2-digit";
};

export function useLocaleDateString(
	date: Date,
	options?: DateFormatOptions,
): string {
	return useMemo(() => {
		return date.toLocaleDateString("fr-FR", options);
	}, [date.getTime(), JSON.stringify(options)]);
}
