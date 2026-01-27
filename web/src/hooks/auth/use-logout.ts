import { authService } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => {
      queryClient.clear();
      return authService.logout();
    },
    onSuccess: () => {
      navigate("/login", { replace: true });
    },
  });
}
