import { api } from "@/services/api.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useRespondFriend() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { requestId: string; accept: boolean }) => {
      await api.post(`/friends/${payload.requestId}/respond`, {
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
