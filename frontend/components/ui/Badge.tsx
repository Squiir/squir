import clsx from "clsx";
import { Text, View } from "react-native";

type BadgeVariant = "ok" | "warn" | "info" | "error";

interface BadgeProps {
	text: string;
	variant?: BadgeVariant;
}

const VARIANT_CLASSES = {
	ok: "bg-green-100/80 border-green-300 dark:bg-green-900/30 dark:border-green-700",
	warn: "bg-yellow-100/80 border-yellow-300 dark:bg-yellow-900/30 dark:border-yellow-700",
	info: "bg-blue-100/80 border-blue-300 dark:bg-blue-900/30 dark:border-blue-700",
	error: "bg-red-100/80 border-red-300 dark:bg-red-900/30 dark:border-red-700",
} as const;

const TEXT_VARIANT_CLASSES = {
	ok: "text-green-700 dark:text-green-300",
	warn: "text-yellow-700 dark:text-yellow-300",
	info: "text-blue-700 dark:text-blue-300",
	error: "text-red-700 dark:text-red-300",
} as const;

export function Badge({ text, variant = "ok" }: BadgeProps) {
	return (
		<View
			className={clsx(
				"min-w-[40px] h-6 px-2.5 rounded-full border items-center justify-center",
				VARIANT_CLASSES[variant],
			)}
		>
			<Text
				className={clsx(
					"text-[11px] font-black leading-3",
					TEXT_VARIANT_CLASSES[variant],
				)}
			>
				{text}
			</Text>
		</View>
	);
}
