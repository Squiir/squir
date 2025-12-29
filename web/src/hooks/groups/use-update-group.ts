import { groupsService } from "@/services/groups.service";
import type { UpdatedGroup } from "@/types/groups";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateGroup() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (dto: UpdatedGroup) => {
      return groupsService.update(dto.id, dto.name);
    },
    onSuccess: async () => {
      toast.success("Groupe mis à jour");
      await qc.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: () => {
      toast.error("Impossible de mettre à jour le groupe");
    },
  });
}
