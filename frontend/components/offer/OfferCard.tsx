import { Offer } from "@app-types/offer";
import { Tokens } from "@constants/tokens";
import { usePulsatingOpacity } from "@hooks/animation/use-pulsating-opacity";
import { useLocaleDateString } from "@hooks/formatter/use-locale-date-string";
import { ContextError } from "@utils/errors/context-error";
import { formatPrice } from "@utils/format";
import { createContext, useContext, useMemo } from "react";
import {
	Animated,
	Pressable,
	PressableProps,
	StyleSheet,
	Text,
	TextProps,
	View,
	ViewStyle,
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

interface OfferCardProps extends PressableProps {
	offer: Offer;
}

export function OfferCard({
	offer,
	children,
	style,
	...props
}: OfferCardProps) {
	const offerMemo = useMemo(() => ({ offer }), [offer]);

	return (
		<OfferCardContext.Provider value={offerMemo}>
			<Pressable {...props} style={[styles.card, style as ViewStyle]}>
				{children}
			</Pressable>
		</OfferCardContext.Provider>
	);
}

function Name({ style }: TextProps) {
	const { offer } = useOfferCardContext();
	return <Text style={[styles.name, style]}>{offer.name}</Text>;
}

function Price({ style }: TextProps) {
	const { offer } = useOfferCardContext();
	return (
		<Text style={[styles.price, style]}>{formatPrice(offer.squirPrice)}</Text>
	);
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
		backgroundColor: Tokens.colors.pink[50],
		borderRadius: Tokens.borderRadius.xl,
		padding: Tokens.spacing[4],
		marginVertical: Tokens.spacing[2],
		width: 250,
		marginRight: Tokens.spacing[3],
		shadowColor: Tokens.colors.pink[500],
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.15,
		shadowRadius: 8,
		elevation: 4,
		borderWidth: 1,
		borderColor: Tokens.colors.pink[200],
	},
	name: {
		fontSize: Tokens.typography.sizes.lg,
		fontWeight: Tokens.typography.weights.bold,
		color: Tokens.colors.gray[900],
	},
	price: {
		fontSize: Tokens.typography.sizes.base,
		color: Tokens.colors.pink[600],
		fontWeight: Tokens.typography.weights.semibold,
		marginTop: Tokens.spacing[1],
	},
	date: {
		fontSize: Tokens.typography.sizes.xs,
		color: Tokens.colors.gray[500],
		marginTop: Tokens.spacing[2],
	},
	skeleton: {
		backgroundColor: Tokens.colors.pink[100],
		borderRadius: Tokens.borderRadius.sm,
	},
});
