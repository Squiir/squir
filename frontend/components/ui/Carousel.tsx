import { PropsWithMessage } from "@app-types/props-with-message";
import { RetryButton } from "@components/ui/RetryButton";
import { Tokens } from "@constants/tokens";
import { ContextError } from "@utils/errors/context-error";
import { createContext, PropsWithChildren, useContext } from "react";
import {
	ScrollView,
	ScrollViewProps,
	StyleSheet,
	Text,
	TextProps,
	TouchableOpacityProps,
	View,
} from "react-native";

interface CarouselContextProps {
	title: string;
}

const CarouselContext = createContext<CarouselContextProps | undefined>(
	undefined,
);

function useCarouselContext() {
	const context = useContext(CarouselContext);
	if (!context) {
		throw new ContextError("Carousel sub-components", "Carousel");
	}

	return context;
}

interface CarouselProps extends ScrollViewProps {
	title: string;
	isLoading?: boolean;
	isError?: boolean;
	onRetry?: () => void;
}

export function Carousel({
	title,
	isLoading,
	isError,
	onRetry,
	children,
	...props
}: CarouselProps) {
	return (
		<CarouselContext.Provider value={{ title }}>
			<View style={styles.section} {...props}>
				{/* Title with pink dot - outside bubble */}
				<Carousel.Title />

				{/* Bubble container */}
				<View style={styles.bubble}>
					{isLoading ? (
						<Carousel.Skeleton />
					) : isError ? (
						<Carousel.Error onPress={onRetry} />
					) : (
						children
					)}
				</View>
			</View>
		</CarouselContext.Provider>
	);
}

function Title({ style }: TextProps) {
	const { title } = useCarouselContext();
	return (
		<View style={styles.titleContainer}>
			<View style={styles.dot} />
			<Text style={[styles.title, style]}>{title}</Text>
		</View>
	);
}

function Scroll({ style, children, ...props }: ScrollViewProps) {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			style={style}
			{...props}
		>
			{children}
		</ScrollView>
	);
}

function Skeleton({ children }: PropsWithChildren) {
	const { title } = useCarouselContext();
	return (
		<Carousel.Scroll>
			{Array.from({ length: 3 }).map((_, i) => (
				<View key={`${title}-skeleton-item-${i}`}>{children}</View>
			))}
		</Carousel.Scroll>
	);
}

function Error({ message, onPress }: PropsWithMessage<TouchableOpacityProps>) {
	return (
		<View style={styles.errorContainer}>
			<Text style={styles.errorText}>
				{message || "Une erreur est survenue"}
			</Text>
			<RetryButton onPress={onPress} />
		</View>
	);
}

Carousel.Title = Title;
Carousel.Scroll = Scroll;
Carousel.Skeleton = Skeleton;
Carousel.Error = Error;

const styles = StyleSheet.create({
	section: {
		marginTop: Tokens.spacing[6],
		paddingHorizontal: Tokens.spacing[4],
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: Tokens.spacing[3],
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: Tokens.appColors.light.primary,
		marginRight: Tokens.spacing[2],
	},
	title: {
		fontSize: Tokens.typography.sizes.lg,
		fontWeight: Tokens.typography.weights.bold,
		color: Tokens.colors.white,
	},
	bubble: {
		padding: Tokens.spacing[4],
		backgroundColor: `${Tokens.colors.pink[400]}15`,
		borderRadius: Tokens.borderRadius["2xl"],
		borderWidth: 1,
		borderColor: `${Tokens.colors.pink[300]}40`,
	},
	scroll: {
		overflow: "visible",
	},
	errorContainer: {
		padding: Tokens.spacing[5],
		backgroundColor: Tokens.colors.pink[50],
		borderRadius: Tokens.borderRadius.xl,
		alignItems: "center",
		borderWidth: 1,
		borderColor: Tokens.colors.pink[200],
	},
	errorText: {
		color: Tokens.colors.pink[600],
		fontSize: Tokens.typography.sizes.sm,
		textAlign: "center",
	},
});
