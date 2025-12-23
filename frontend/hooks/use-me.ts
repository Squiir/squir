import { useQuery } from "@tanstack/react-query";
import { userService } from "@services/user.service";
import { User } from "@app-types/user";

export function useMe() {
	return useQuery<User>({
		queryKey: ["me"],
		queryFn: userService.getCurrentUser,
	});
}
