import { useQuery } from "@tanstack/react-query";
import { barsService } from "@services/bars.service";

export function useGetBars() {
    return useQuery({
        queryKey: ["bars"],
        queryFn: barsService.getBars,
    });
}
