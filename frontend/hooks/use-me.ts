import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@services/user";
import type { User } from "../types/user";

export function useMe() {
  return useQuery<User>({
    queryKey: ["me"],
    queryFn: getCurrentUser,
  });
}
