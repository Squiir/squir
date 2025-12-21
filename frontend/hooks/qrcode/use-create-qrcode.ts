import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QrcodeDto, qrcodeService } from "@services/qrcode.service";

export function useCreateQrcode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (qrcodeDto: QrcodeDto) => qrcodeService.createQrcode(qrcodeDto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qrcodes"] });
    },
  });
}
