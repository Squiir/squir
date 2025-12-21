import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qrcodeService } from "@services/qrcode.service";

export function useDeleteQrCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => qrcodeService.deleteQrcode(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qrcodes"] });
    },
  });
}
