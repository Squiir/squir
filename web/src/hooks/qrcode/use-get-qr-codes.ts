import { qrCodeService } from "@/services/qrcode.service";
import { useQuery } from "@tanstack/react-query";

export function useGetMyQrCodes() {
  return useQuery({
    queryKey: ["qrcodes"],
    queryFn: qrCodeService.getMyQrCodes,
  });
}
