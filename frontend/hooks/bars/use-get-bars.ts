import { useQuery } from "@tanstack/react-query";
import { barService } from "@services/bar.service";

export function useGetBars() {
	return useQuery({
		queryKey: ["bars"],
		queryFn: barService.getBars,
	});
}
