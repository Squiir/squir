import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";

export function useGetCurrentUserId() {
  const accessToken = useAuthStore((s) => s.accessToken);

  return useQuery({
    queryKey: ["id"],
    queryFn: authService.getCurrentUserId,
    enabled: !!accessToken,
  });
}
