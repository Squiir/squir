import { qrCodeService } from "@/services/qrcode.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useConsumeQrCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => qrCodeService.consumeQrCode(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qrcodes"] });
    },
  });
}
