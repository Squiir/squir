import { userService } from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateUsername = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (username: string) => userService.updateUsername(username),
    onSuccess: () => {
      toast.success("Nom d'utilisateur mis à jour");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: () => toast.error("Erreur lors de la mise à jour"),
  });
};
