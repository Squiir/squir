import { qrCodeService } from "@services/qrcode.service";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook to get QR codes grouped by offer (for QR code screen)
 */
export function useGetMyQrCodes() {
	return useQuery({
		queryKey: ["qrcodes", "grouped"],
		queryFn: qrCodeService.getMyQrCodesGrouped,
	});
}

/**
 * Hook to get flat QR codes list (for map component)
 */
export function useGetMyQrCodesFlat() {
	return useQuery({
		queryKey: ["qrcodes", "flat"],
		queryFn: qrCodeService.getMyQrCodes,
	});
}
