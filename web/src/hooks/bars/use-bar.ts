import { barService } from "@/services/bar.service";
import { useQuery } from "@tanstack/react-query";

export const useBar = (id?: string) => {
  return useQuery({
    queryKey: ["bar", id],
    queryFn: () => {
      if (!id) throw new Error("Bar ID is required");
      return barService.getBar(id);
    },
    enabled: !!id,
  });
};
