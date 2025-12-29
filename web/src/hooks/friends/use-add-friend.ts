import { friendsService } from "@/services/friends.service";
import type { AddFriendDto } from "@/types/friends";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddFriend() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: AddFriendDto) => friendsService.addFriend(dto),
    onSuccess: async () => {
      toast.success("Demande envoyée");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["friends", "pending"] }),
        queryClient.invalidateQueries({
          queryKey: ["friends", "search"],
          exact: false,
        }),
      ]);
    },
    onError: () => {
      toast.error("Impossible d'ajouter cet ami");
    },
  });
}
