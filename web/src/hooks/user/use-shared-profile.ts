import { userService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export const useSharedProfile = (username?: string) => {
  return useQuery({
    queryKey: ["sharedProfile", username],
    queryFn: () => userService.getProfileByUsername(username!),
    enabled: !!username,
    retry: 1,
  });
};
