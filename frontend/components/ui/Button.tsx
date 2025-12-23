import { ActivityIndicator, Pressable, PressableProps, Text } from "react-native";
import clsx from "clsx";

type ButtonProps = {
	title: string;
	variant?: "primary" | "secondary" | "outline" | "danger";
	isSubmitting?: boolean;
} & PressableProps;

export function Button({ title, variant = "primary", isSubmitting, ...props }: ButtonProps) {
	const bg =
		variant === "primary" ? "bg-blue-600"
			: variant === "secondary" ? "bg-gray-200 dark:bg-gray-700"
				: variant === "outline" ? "bg-transparent border border-blue-600"
					: variant === "danger" ? "bg-red-600" : "";

	const textColor =
		variant === "primary" ? "text-white"
			: variant === "secondary" ? "text-black dark:text-white"
				: variant === "outline" ? "text-blue-600"
					: variant === "danger" ? "text-white" : "";

	return (
		<Pressable
			className={clsx("rounded-xl px-4 py-3 items-center", bg)}
			disabled={isSubmitting}
			{...props}
		>
			{isSubmitting ? (
				<ActivityIndicator color="white" />
			) : (
				<Text className={clsx("font-semibold", textColor)}>{title}</Text>
			)}
		</Pressable>
	);
}
