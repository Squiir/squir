import clsx from "clsx";
import {
	ActivityIndicator,
	Pressable,
	PressableProps,
	Text,
} from "react-native";

type ButtonProps = {
	title: string;
	variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
	isPending?: boolean;
} & PressableProps;

export function Button({
	title,
	variant = "primary",
	isPending,
	...props
}: ButtonProps) {
	const bg =
		variant === "primary"
			? "bg-blue-600"
			: variant === "secondary"
				? "bg-gray-200 dark:bg-gray-700"
				: variant === "outline"
					? "bg-transparent border border-blue-600"
					: variant === "ghost"
						? "bg-transparent"
						: "bg-red-600";

	const textColor =
		variant === "secondary"
			? "text-black dark:text-white"
			: variant === "outline" || variant === "ghost"
				? "text-blue-600"
				: "text-white";

	return (
		<Pressable
			className={clsx("rounded-xl py-4 items-center justify-center", bg)}
			disabled={isPending}
			{...props}
		>
			{isPending ? (
				<ActivityIndicator color="white" />
			) : (
				<Text className={clsx("font-semibold", textColor)}>{title}</Text>
			)}
		</Pressable>
	);
}
