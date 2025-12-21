import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQrCode } from "@services/qrcodes";

export function useDeleteQrCode() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (qrId: string) => deleteQrCode(qrId),
    onSuccess: () => {
      // refresh la liste dans Profile
      qc.invalidateQueries({ queryKey: ["qrcodes"] });
    },
  });
}
