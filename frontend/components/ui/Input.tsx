import clsx from "clsx";
import { TextInput, TextInputProps } from "react-native";

export type InputProps = {
	variant?: "primary" | "error";
} & TextInputProps;

export function Input({ variant, ...props }: InputProps) {
	const border =
		variant === "primary"
			? "border-slate-200 focus:border-indigo-500"
			: variant === "error"
				? "border-red-500 bg-red-50"
				: "border-slate-200 focus:border-indigo-500";

	return (
		<TextInput
			className={clsx("border rounded-xl p-4 text-base bg-slate-50", border)}
			placeholderTextColor="#94a3b8"
			{...props}
		/>
	);
}
