import { Bar } from "@app-types/bar";
import { Offer } from "@app-types/offer";
import { QrCode } from "@app-types/qrcode";
import { EmptyOffersList } from "@components/offer/modal/EmptyOffersList";
import { OfferListItem } from "@components/offer/modal/OfferListItem";
import { ModalContainer } from "@components/ui/ModalContainer";
import { ModalHeader } from "@components/ui/ModalHeader";
import { Tokens } from "@constants/tokens";
import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";

interface BarOffersModalProps {
	visible: boolean;
	bar: Bar | null | undefined;
	qrcodes: QrCode[] | null;
	onClose: () => void;
	onSelectOffer: (offer: Offer) => void;
	isPending: boolean;
}

export function BarOffersModal({
	visible,
	bar,
	qrcodes,
	onClose,
	onSelectOffer,
	isPending,
}: BarOffersModalProps) {
	if (!bar) return null;

	const offers = bar.offers ?? [];

	const getOfferQuantity = (offer: Offer) =>
		qrcodes?.filter(
			(qr) => qr.offer?.barId === bar.id && qr.offerId === offer.id,
		).length ?? 0;

	return (
		<ModalContainer visible={visible} onClose={onClose} maxHeight="80%">
			<ModalHeader
				icon="mappin.circle.fill"
				title={bar.name}
				subtitle={`${offers.length} offre${offers.length > 1 ? "s" : ""} disponible${offers.length > 1 ? "s" : ""}`}
			/>

			<ScrollView
				style={styles.offersList}
				showsVerticalScrollIndicator={false}
			>
				{offers.map((offer) => (
					<OfferListItem
						key={offer.id}
						offer={offer}
						quantity={getOfferQuantity(offer)}
						disabled={isPending}
						onPress={() => onSelectOffer(offer)}
					/>
				))}

				{offers.length === 0 && <EmptyOffersList />}
			</ScrollView>

			{isPending && (
				<View style={styles.loadingContainer}>
					<ActivityIndicator color={Tokens.colors.pink[400]} />
					<Text style={styles.loadingText}>Génération...</Text>
				</View>
			)}

			<Pressable onPress={onClose} style={styles.closeButton}>
				<Text style={styles.closeButtonText}>Fermer</Text>
			</Pressable>
		</ModalContainer>
	);
}

const styles = StyleSheet.create({
	offersList: {
		maxHeight: 300,
		marginBottom: Tokens.spacing[4],
	},
	loadingContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: Tokens.spacing[3],
		marginBottom: Tokens.spacing[2],
	},
	loadingText: {
		color: Tokens.colors.pink[500],
		marginLeft: Tokens.spacing[2],
		fontWeight: Tokens.typography.weights.medium,
	},
	closeButton: {
		paddingVertical: Tokens.spacing[3],
		alignItems: "center",
	},
	closeButtonText: {
		color: Tokens.colors.gray[500],
		fontWeight: Tokens.typography.weights.medium,
	},
});
