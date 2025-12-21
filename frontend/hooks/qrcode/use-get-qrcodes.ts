import { useQuery } from "@tanstack/react-query";
import { qrcodeService } from "@services/qrcode.service";

export function useGetMyQrcodes() {
  return useQuery({
    queryKey: ["qrcodes"],
    queryFn: qrcodeService.getMyQrcodes,
  });
}
