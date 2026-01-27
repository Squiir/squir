import { userService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export function useWallet() {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: userService.getWallet,
  });
}
