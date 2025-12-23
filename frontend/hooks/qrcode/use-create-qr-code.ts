import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QrCodeDto, qrCodeService } from "@services/qrcode.service";

export function useCreateQrCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (qrCodeDto: QrCodeDto) => qrCodeService.createQrCode(qrCodeDto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qrcodes"] });
    },
  });
}
