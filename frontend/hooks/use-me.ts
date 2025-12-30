import { User } from "@app-types/user";
import { userService } from "@services/user.service";
import { useQuery } from "@tanstack/react-query";

export function useMe() {
	return useQuery<User>({
		queryKey: ["users", "me"],
		queryFn: userService.getCurrentUser,
	});
}
