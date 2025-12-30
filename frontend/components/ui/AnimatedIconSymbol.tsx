import type { IconSymbolName } from "@components/ui/IconSymbol";
import { IconSymbol } from "@components/ui/IconSymbol";
import { Pressable } from "react-native";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withTiming,
} from "react-native-reanimated";

type Props = {
	name: IconSymbolName;
	size?: number;
	color: string;
};

export function BounceIcon({ name, size = 24, color }: Props) {
	const translateY = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }],
	}));

	const bounce = () => {
		translateY.value = withSequence(
			withTiming(-6, { duration: 120, easing: Easing.out(Easing.quad) }),
			withTiming(0, { duration: 160, easing: Easing.out(Easing.quad) }),
		);
	};

	return (
		<Pressable onPress={bounce}>
			<Animated.View style={animatedStyle}>
				<IconSymbol name={name} size={size} color={color} />
			</Animated.View>
		</Pressable>
	);
}
