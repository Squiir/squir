import { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
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
	const Content = scrollable ? ScrollView : View;

	return (
		<ThemedView className="flex-1">
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				className="flex-1"
			>
				<Content
					className="flex-1"
					contentContainerStyle={scrollable ? { flexGrow: 1 } : { flex: 1 }}
					showsVerticalScrollIndicator={false}
				>
					<View className="flex-1 px-5 pt-2">{children}</View>
				</Content>
			</KeyboardAvoidingView>
		</ThemedView>
	);
};
