import Animated from "react-native-reanimated";

export function HelloWave() {
	return (
		<Animated.Text
			style={{
				animationName: {
					"50%": { transform: [{ rotate: "25deg" }] },
				},
				animationIterationCount: 4,
				animationDuration: "300ms",
			}}
			className="text-[28px] leading-[32px] -mt-1.5"
		>
			👋
		</Animated.Text>
	);
}
