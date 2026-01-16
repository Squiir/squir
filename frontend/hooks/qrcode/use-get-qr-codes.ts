import { qrCodeService } from "@services/qrcode.service";
import { useQuery } from "@tanstack/react-query";

export function useGetMyQrCodes() {
	return useQuery({
		queryKey: ["qrcodes"],
		queryFn: qrCodeService.getMyQrCodes,
		retry: 2,
		staleTime: 30000, // 30 seconds
		refetchOnMount: true,
	});
}
