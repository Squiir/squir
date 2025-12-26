import { friendsService } from "@/services/friends.service";
import type { AddFriendDto } from "@/types/friends";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddFriend() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (dto: AddFriendDto) => friendsService.addFriend(dto),
    onSuccess: async () => {
      toast.success("Demande envoyée");
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["friends", "pending"] }),
        qc.invalidateQueries({
          queryKey: ["friends", "search"],
          exact: false,
        }),
      ]);
    },
    onError: async () => {
      toast.error("Impossible d'ajouter cet ami");
    },
  });
}
