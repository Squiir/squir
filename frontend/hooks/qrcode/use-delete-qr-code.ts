import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qrCodeService } from "@services/qrcode.service";

export function useDeleteQrCode() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => qrCodeService.deleteQrCode(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["qrcodes"] });
		},
	});
}
