import { useAuth } from "@/hooks/auth/use-auth";
import { userService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export function useMyId() {
  const { isLoggedIn } = useAuth();

  return useQuery<{ id: string }>({
    queryKey: ["id"],
    queryFn: userService.getCurrentUserId,
    enabled: isLoggedIn,
  });
}
