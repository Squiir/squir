import { groupsService } from "@/services/groups.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useLeaveGroup() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (groupId: string) => {
      return groupsService.leave(groupId);
    },
    onSuccess: async () => {
      toast.success("Groupe quitté");
      await qc.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: () => {
      toast.error("Impossible de quitter le groupe");
    },
  });
}
