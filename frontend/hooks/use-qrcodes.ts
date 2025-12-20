import { useQuery } from "@tanstack/react-query";
import { fetchMyQrCodes } from "@services/qrcodes";

export function useQrCodes() {
  return useQuery({
    queryKey: ["qrcodes"],
    queryFn: fetchMyQrCodes,
  });
}
