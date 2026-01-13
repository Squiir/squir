import { Offer } from "@app-types/offer";
import { usePulsatingOpacity } from "@hooks/animation/use-pulsating-opacity";
import { useLocaleDateString } from "@hooks/formatter/use-locale-date-string";
import { ContextError } from "@utils/errors/context-error";
import { formatPrice } from "@utils/format";
import { createContext, useContext, useMemo } from "react";
import {
	Animated,
	StyleSheet,
	Text,
	TextProps,
	View,
	ViewProps,
} from "react-native";

interface OfferCardContextProps {
	offer: Offer;
}

const OfferCardContext = createContext<OfferCardContextProps | undefined>(
	undefined,
);

function useOfferCardContext() {
	const context = useContext(OfferCardContext);
	if (!context) {
		throw new ContextError("OfferCard sub-components", "OfferCard");
	}

	return context;
}

interface OfferCardProps extends ViewProps {
	offer: Offer;
}

export function OfferCard({ offer, children, ...props }: OfferCardProps) {
	const offerMemo = useMemo(() => ({ offer }), [offer]);

	return (
		<OfferCardContext.Provider value={offerMemo}>
			<View {...props} style={[props.style, styles.card]}>
				{children}
			</View>
		</OfferCardContext.Provider>
	);
}

function Name({ style }: TextProps) {
	const { offer } = useOfferCardContext();
	return <Text style={[styles.name, style]}>{offer.name}</Text>;
}

function Price({ style }: TextProps) {
	const { offer } = useOfferCardContext();
	return <Text style={[styles.price, style]}>{formatPrice(offer.price)}</Text>;
}

function CreatedAt({ style }: TextProps) {
	const { offer } = useOfferCardContext();
	const formattedDate = useLocaleDateString(offer.createdAt);
	return <Text style={[styles.date, style]}>Ajouté le {formattedDate}</Text>;
}

function Skeleton() {
	const opacity = usePulsatingOpacity();

	return (
		<View style={styles.card}>
			<Animated.View
				style={[styles.skeleton, { width: "70%", height: 20, opacity }]}
			/>
			<Animated.View
				style={[
					styles.skeleton,
					{ width: "40%", height: 18, marginTop: 8, opacity },
				]}
			/>
			<Animated.View
				style={[
					styles.skeleton,
					{ width: "30%", height: 14, marginTop: 12, opacity },
				]}
			/>
		</View>
	);
}

OfferCard.Name = Name;
OfferCard.Price = Price;
OfferCard.CreatedAt = CreatedAt;
OfferCard.Skeleton = Skeleton;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 16,
		marginVertical: 8,
		width: 250,
		marginRight: 12,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	name: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
	},
	price: {
		fontSize: 16,
		color: "#2ecc71",
		fontWeight: "600",
		marginTop: 4,
	},
	date: {
		fontSize: 12,
		color: "#999",
		marginTop: 8,
	},
	skeleton: {
		backgroundColor: "#E1E9EE",
		borderRadius: 4,
	},
});
