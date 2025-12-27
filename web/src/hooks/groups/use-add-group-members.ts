import { groupsService } from "@/services/groups.service";
import type { AddGroupMembers } from "@/types/groups";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddGroupMembers() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (dto: AddGroupMembers) => {
      return groupsService.addMembers(dto.groupId, dto.memberIds);
    },
    onSuccess: async () => {
      toast.success("Membres ajoutés au groupe");
      await qc.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: () => {
      toast.error("Impossible d'ajouter des membres au groupe");
    },
  });
}
