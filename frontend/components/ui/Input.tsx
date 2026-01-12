import { Tokens } from "@constants/tokens";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export type InputProps = {
	variant?: "primary" | "error";
} & TextInputProps;

export function Input({ variant = "primary", style, ...props }: InputProps) {
	return (
		<TextInput
			style={[
				styles.base,
				variant === "error" ? styles.error : styles.primary,
				style,
			]}
			placeholderTextColor={Tokens.colors.gray[400]}
			{...props}
		/>
	);
}

const styles = StyleSheet.create({
	base: {
		width: "100%",
		borderRadius: Tokens.borderRadius.xl,
		padding: Tokens.spacing[3],
		fontSize: Tokens.typography.sizes.base,
		borderWidth: 1,
	},
	primary: {
		backgroundColor: Tokens.colors.gray[50],
		borderColor: Tokens.colors.gray[200],
	},
	error: {
		backgroundColor: Tokens.colors.red[50],
		borderColor: Tokens.colors.red[500],
	},
});
