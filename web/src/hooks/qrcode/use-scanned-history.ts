import { qrCodeService } from "@/services/qrcode.service";
import { useQuery } from "@tanstack/react-query";

export function useScannedHistory() {
  return useQuery({
    queryKey: ["scanned-history"],
    queryFn: () => qrCodeService.getScannedHistory(),
  });
}
