import { Tokens } from "@constants/tokens";
import {
	ActivityIndicator,
	Pressable,
	PressableProps,
	StyleSheet,
	Text,
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

type ButtonProps = {
	title: string;
	variant?: ButtonVariant;
	isPending?: boolean;
} & PressableProps;

export function Button({
	title,
	variant = "primary",
	isPending,
	disabled,
	...props
}: ButtonProps) {
	const buttonStyle = [
		styles.base,
		styles[variant],
		(disabled || isPending) && styles.disabled,
	];

	const textStyle = [
		styles.text,
		variant === "secondary" ? styles.textSecondary : null,
		variant === "outline" || variant === "ghost" ? styles.textOutline : null,
	];

	const spinnerColor =
		variant === "outline" || variant === "ghost"
			? Tokens.colors.primary[600]
			: Tokens.colors.white;

	return (
		<Pressable style={buttonStyle} disabled={disabled || isPending} {...props}>
			{isPending ? (
				<ActivityIndicator color={spinnerColor} />
			) : (
				<Text style={textStyle}>{title}</Text>
			)}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	base: {
		borderRadius: Tokens.borderRadius.xl,
		paddingVertical: Tokens.spacing[4],
		paddingHorizontal: Tokens.spacing[4],
		alignItems: "center",
		justifyContent: "center",
		minHeight: 48,
	},

	// Variants
	primary: {
		backgroundColor: Tokens.colors.primary[600],
	},
	secondary: {
		backgroundColor: Tokens.colors.gray[200],
	},
	outline: {
		backgroundColor: Tokens.colors.transparent,
		borderWidth: 1,
		borderColor: Tokens.colors.primary[600],
	},
	ghost: {
		backgroundColor: Tokens.colors.transparent,
	},
	danger: {
		backgroundColor: Tokens.colors.red[600],
	},

	// States
	disabled: {
		opacity: 0.5,
	},

	// Text
	text: {
		fontSize: Tokens.typography.sizes.base,
		fontWeight: Tokens.typography.weights.semibold,
		color: Tokens.colors.white,
	},
	textSecondary: {
		color: Tokens.colors.black,
	},
	textOutline: {
		color: Tokens.colors.primary[600],
	},
});
