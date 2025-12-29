import { Offer } from "@app-types/offer";
import { formatPrice } from "@utils/format";
import { createContext, useContext } from "react";
import { StyleSheet, Text, TextProps, View, ViewProps } from "react-native";

interface OfferContextProps {
	offer: Offer;
}

const OfferContext = createContext<OfferContextProps | undefined>(undefined);

function useOfferContext() {
	const context = useContext(OfferContext);
	if (!context) {
		throw new Error(
			"OfferCard sub-components must be used within an OfferCard",
		);
	}

	return context;
}

interface OfferCardProps extends ViewProps {
	offer: Offer;
}

export function OfferCard({ offer, children, ...props }: OfferCardProps) {
	return (
		<OfferContext.Provider value={{ offer }}>
			<View {...props} style={[props.style, styles.card]}>
				{children}
			</View>
		</OfferContext.Provider>
	);
}

function Name({ style }: TextProps) {
	const { offer } = useOfferContext();
	return <Text style={[styles.name, style]}>{offer.name}</Text>;
}

function Price({ style }: TextProps) {
	const { offer } = useOfferContext();
	return (
		<Text style={[styles.price, style]}>{formatPrice(offer.price)} €</Text>
	);
}

function DateInfo({ style }: TextProps) {
	const { offer } = useOfferContext();
	return (
		<Text style={[styles.date, style]}>
			Ajouté le {new Date(offer.createdAt).toLocaleDateString()}
		</Text>
	);
}

OfferCard.Name = Name;
OfferCard.Price = Price;
OfferCard.DateInfo = DateInfo;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 16,
		marginVertical: 8,
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
});
