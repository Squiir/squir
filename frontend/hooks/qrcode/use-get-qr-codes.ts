import { useQuery } from "@tanstack/react-query";
import { qrCodeService } from "@services/qrcode.service";

export function useGetMyQrCodes() {
  return useQuery({
    queryKey: ["qrcodes"],
    queryFn: qrCodeService.getMyQrCodes,
  });
}
