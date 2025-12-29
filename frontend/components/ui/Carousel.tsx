import {
	ScrollView,
	ScrollViewProps,
	StyleSheet,
	Text,
	View,
} from "react-native";

type CarouselProps = {
	title: string;
} & ScrollViewProps;

export function Carousel({ title, children, ...props }: CarouselProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<ScrollView horizontal showsHorizontalScrollIndicator={false} {...props}>
				{children}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 16,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 8,
	},
});
