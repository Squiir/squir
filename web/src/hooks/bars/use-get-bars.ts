import { barService } from "@/services/bar.service";
import { useQuery } from "@tanstack/react-query";

export function useGetBars() {
  return useQuery({
    queryKey: ["bars"],
    queryFn: barService.getBars,
  });
}
