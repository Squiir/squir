import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import type { User } from "@/types/user";

export function useMe() {
  return useQuery<User>({
    queryKey: ["me"],
    queryFn: userService.getCurrentUser,
  });
}
