import { barService } from "@/services/bar.service";
import { useQuery } from "@tanstack/react-query";

export function useBars() {
  return useQuery({
    queryKey: ["bars"],
    queryFn: barService.getBars,
  });
}
