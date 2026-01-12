import { Tokens } from "@constants/tokens";
import { PropsWithChildren } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "./ThemedView";

interface ThemedScreenWrapperProps extends PropsWithChildren {
	scrollable?: boolean;
	lightColor?: string;
	darkColor?: string;
}

export const ThemedScreenWrapper = ({
	children,
	scrollable = true,
	lightColor,
	darkColor,
}: ThemedScreenWrapperProps) => {
	const insets = useSafeAreaInsets();
	const Content = scrollable ? ScrollView : View;

	return (
		<ThemedView style={[styles.container, { paddingTop: insets.top }]}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.keyboardAvoidingView}
			>
				<Content
					style={styles.content}
					contentContainerStyle={
						scrollable ? styles.scrollContent : styles.viewContent
					}
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.innerContent}>{children}</View>
				</Content>
			</KeyboardAvoidingView>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	keyboardAvoidingView: {
		flex: 1,
	},
	content: {
		flex: 1,
	},
	scrollContent: {
		flexGrow: 1,
	},
	viewContent: {
		flex: 1,
	},
	innerContent: {
		flex: 1,
		paddingHorizontal: Tokens.spacing[5],
		paddingTop: Tokens.spacing[2],
	},
});
