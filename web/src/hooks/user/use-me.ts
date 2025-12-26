import { useAuth } from "@/hooks/auth/use-auth";
import { userService } from "@/services/user.service";
import type { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export function useMe() {
  const { isLoggedIn } = useAuth();

  return useQuery<User>({
    queryKey: ["me"],
    queryFn: userService.getCurrentUser,
    enabled: isLoggedIn,
  });
}
