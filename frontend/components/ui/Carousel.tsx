import { PropsWithMessage } from "@app-types/props-with-message";
import { RetryButton } from "@components/ui/RetryButton";
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
			<View style={styles.container} {...props}>
				{isLoading ? (
					<Carousel.Skeleton />
				) : isError ? (
					<Carousel.Error onPress={onRetry} />
				) : (
					children
				)}
			</View>
		</CarouselContext.Provider>
	);
}

function Title({ style }: TextProps) {
	const { title } = useCarouselContext();
	return <Text style={[styles.title, style]}>{title}</Text>;
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
		<>
			<Carousel.Title />
			<Carousel.Scroll>
				{Array.from({ length: 3 }).map((_, i) => (
					<View key={`${title}-skeleton-item-${i}`}>{children}</View>
				))}
			</Carousel.Scroll>
		</>
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
	container: {
		marginBottom: 24,
		paddingLeft: 16,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 12,
		color: "#1a1a1a",
	},
	scroll: {
		overflow: "visible",
	},
	errorContainer: {
		padding: 20,
		backgroundColor: "#fff5f5",
		borderRadius: 12,
		marginRight: 16,
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#feb2b2",
	},
	errorText: {
		color: "#c53030",
		fontSize: 14,
		textAlign: "center",
	},
});
