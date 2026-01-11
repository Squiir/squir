import { useQuery } from "@tanstack/react-query";

export function useTyping(friendId?: string) {
  return useQuery<boolean>({
    queryKey: ["typing", friendId],
    queryFn: () => false,
    enabled: !!friendId,
    initialData: false,
  });
}
