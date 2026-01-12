import { useMemo } from "react";

export function useLocaleDateString(date: Date) {
	return useMemo(() => {
		return date.toLocaleDateString();
	}, [date]);
}
