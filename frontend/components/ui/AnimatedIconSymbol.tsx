import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSequence,
	withTiming,
	Easing,
} from "react-native-reanimated";
import { Pressable } from "react-native";
import { IconSymbol } from "@components/ui/IconSymbol";
import type { IconSymbolName } from "@components/ui/IconSymbol";

const AnimatedIcon = Animated.createAnimatedComponent(IconSymbol);

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
			<AnimatedIcon
				name={name}
				size={size}
				color={color}
				style={animatedStyle}
			/>
		</Pressable>
	);
}
