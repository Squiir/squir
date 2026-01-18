import { Offer } from "@app-types/offer";
import { OfferDetailsContent } from "@components/offer/modal/OfferDetailsContent";
import { OfferSuccessContent } from "@components/offer/modal/OfferSuccessContent";
import { ModalContainer } from "@components/ui/ModalContainer";

interface OfferConfirmModalProps {
	offer: Offer | null;
	visible: boolean;
	onClose: () => void;
	onConfirm: () => void;
	isPending: boolean;
	isSuccess?: boolean;
}

export function OfferConfirmModal({
	offer,
	visible,
	onClose,
	onConfirm,
	isPending,
	isSuccess,
}: OfferConfirmModalProps) {
	if (!offer) return null;

	return (
		<ModalContainer visible={visible} onClose={onClose}>
			{isSuccess ? (
				<OfferSuccessContent onClose={onClose} />
			) : (
				<OfferDetailsContent
					offer={offer}
					onConfirm={onConfirm}
					onClose={onClose}
					isPending={isPending}
				/>
			)}
		</ModalContainer>
	);
}
