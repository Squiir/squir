import { useAuth } from "@/hooks/auth/use-auth";
import { groupsService } from "@/services/groups.service";
import type { Group } from "@/types/groups";
import { useQuery } from "@tanstack/react-query";

export function useGroups() {
  const { isLoggedIn } = useAuth();

  return useQuery<Group[]>({
    queryKey: ["groups"],
    queryFn: groupsService.list,
    enabled: isLoggedIn,
  });
}
