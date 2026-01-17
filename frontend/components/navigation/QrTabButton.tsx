import { TabButton } from "@components/navigation/TabButton";
import { Tokens } from "@constants/tokens";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import { SharedValue } from "react-native-reanimated";

type Props = {
	route: BottomTabBarProps["state"]["routes"][0];
	index: number;
	activeIndex: SharedValue<number>;
	isFocused: boolean;
	descriptors: BottomTabBarProps["descriptors"];
	navigation: BottomTabBarProps["navigation"];
	colors: typeof Tokens.appColors.light;
};

export function QrTabButton({
	route,
	index,
	activeIndex,
	isFocused,
	descriptors,
	navigation,
	colors,
}: Props) {
	return (
		<View style={[styles.qrContainer, isFocused && styles.qrContainerActive]}>
			<TabButton
				route={route}
				index={index}
				activeIndex={activeIndex}
				isFocused={isFocused}
				descriptors={descriptors}
				navigation={navigation}
				colors={colors}
			/>
		</View>
	);
}

const QR_TAB_SIZE = 64;

const styles = StyleSheet.create({
	qrContainer: {
		width: QR_TAB_SIZE,
		height: QR_TAB_SIZE,
		borderRadius: QR_TAB_SIZE / 2,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Tokens.colors.pink[400],
		shadowColor: Tokens.colors.pink[500],
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.35,
		shadowRadius: 12,
		elevation: 8,
	},
	qrContainerActive: {
		borderWidth: 3,
		borderColor: Tokens.colors.white,
	},
});
