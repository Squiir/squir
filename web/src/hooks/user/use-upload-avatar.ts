import { userService } from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => userService.uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
