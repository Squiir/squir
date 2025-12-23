import { Text, type TextProps } from "react-native";

import { useThemeColor } from "@hooks/color/use-theme-color";

export type ThemedTextProps = TextProps & {
	lightColor?: string;
	darkColor?: string;
	type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
	style,
	lightColor,
	darkColor,
	type = "default",
	...rest
}: ThemedTextProps) {
	const color = useThemeColor(
		{ light: lightColor, dark: darkColor },
		"textPrimary",
	);

	return (
		<Text
			style={[{ color }, style]}
			className={
				type === "default"
					? "text-[16px] leading-[24px]"
					: type === "title"
						? "text-[32px] leading-[32px] font-bold"
						: type === "defaultSemiBold"
							? "text-[16px] leading-[24px] font-semibold"
							: type === "subtitle"
								? "text-[20px] font-bold"
								: "text-[16px] leading-[30px] text-[#0a7ea4]"
			}
			{...rest}
		/>
	);
}
