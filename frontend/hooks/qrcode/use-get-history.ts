import { qrCodeService } from "@services/qrcode.service";
import { useQuery } from "@tanstack/react-query";

export function useGetHistory() {
	return useQuery({
		queryKey: ["qrcodes", "history"],
		queryFn: () => qrCodeService.getHistory(),
	});
}
