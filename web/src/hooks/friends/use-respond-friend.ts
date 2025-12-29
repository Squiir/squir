import { friendsService } from "@/services/friends.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useRespondFriend() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { requestId: string; accept: boolean }) => {
      return friendsService.respondRequest(payload.requestId, {
        accept: payload.accept,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends", "pending"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      toast.success("Demande traitée");
    },
  });
}
