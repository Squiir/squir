import { AvatarProps } from "@app-types/avatar";
import clsx from "clsx";
import { Image, Text, View } from "react-native";

const SIZE_CLASSES = {
	sm: "w-10 h-10",
	md: "w-20 h-20",
	lg: "w-32 h-32",
	xl: "w-40 h-40",
} as const;

const TEXT_SIZE_CLASSES = {
	sm: "text-sm",
	md: "text-3xl",
	lg: "text-5xl",
	xl: "text-6xl",
} as const;

type AvatarSize = keyof typeof SIZE_CLASSES | number;

interface ExtendedAvatarProps extends Omit<AvatarProps, "size"> {
	size?: AvatarSize;
}

export function Avatar({ uri, username, size = "md" }: ExtendedAvatarProps) {
	// Handle preset sizes vs custom numeric size
	const isPreset = typeof size === "string";
	const sizeClass = isPreset ? SIZE_CLASSES[size] : undefined;
	const textSizeClass = isPreset ? TEXT_SIZE_CLASSES[size] : "text-3xl";
	const customStyle = !isPreset ? { width: size, height: size } : undefined;

	if (uri) {
		return (
			<Image
				source={{ uri }}
				className={clsx("rounded-full", sizeClass)}
				style={customStyle}
			/>
		);
	}

	return (
		<View
			className={clsx(
				"items-center justify-center bg-gray-300 rounded-full dark:bg-gray-700",
				sizeClass,
			)}
			style={customStyle}
		>
			<Text className={clsx("font-bold text-white", textSizeClass)}>
				{username[0]?.toUpperCase()}
			</Text>
		</View>
	);
}
