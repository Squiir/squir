import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateQrCode, type GenerateQrInput } from "@services/qrcodes";

export function useGenerateQrCode() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (input: GenerateQrInput) => generateQrCode(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["qrcodes"] });
    },
  });
}
