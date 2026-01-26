import { barService } from "@/services/bar.service";
import { useQuery } from "@tanstack/react-query";

export function useDasboardStat(barId: string) {
  return useQuery({
    queryKey: ["dashboard-stats", barId],
    queryFn: () => (barId ? barService.getDashboardStats(barId) : null),
    enabled: !!barId,
  });
}
