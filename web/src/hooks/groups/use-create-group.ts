import { groupsService } from "@/services/groups.service";
import type { CreateGroupDto } from "@/types/groups";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dto: CreateGroupDto) => {
      return groupsService.create(dto.name, dto.memberIds);
    },
    onSuccess: async () => {
      toast.success("Groupe créé");
      await queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: () => {
      toast.error("Impossible de créer le groupe");
    },
  });
}
