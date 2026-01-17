import { qrCodeService } from "@services/qrcode.service";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook to get flat QR codes list
 */
export function useGetMyQrCodes() {
	return useQuery({
		queryKey: ["qrcodes"],
		queryFn: qrCodeService.getMyQrCodes,
	});
}

/**
 * Hook to get QR codes grouped by offer (for QR code screen)
 */
export function useGetMyQrCodesGroupedByOffer() {
	return useQuery({
		queryKey: ["qrcodes", "groupedByOffer"],
		queryFn: qrCodeService.getMyQrCodesGroupedByOffer,
	});
}
