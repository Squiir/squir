import { friendsService } from "@/services/friends.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useRemoveFriend() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (friendId: string) => {
      return friendsService.removeFriend(friendId);
    },
    onSuccess: async () => {
      toast.success("Ami supprimé");
      await qc.invalidateQueries({ queryKey: ["friends"] });
    },
    onError: () => {
      toast.error("Impossible de supprimer l’ami");
    },
  });
}
