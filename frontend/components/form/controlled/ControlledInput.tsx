import { ThemedText } from "@components/ThemedText";
import { Input, InputProps } from "@components/ui/Input";
import { Tokens } from "@constants/tokens";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

interface ControlledInputProps<T extends FieldValues> extends InputProps {
	control: Control<T>;
	name: FieldPath<T>;
	label: string;
}

export const ControlledInput = <T extends FieldValues>({
	control,
	name,
	label,
	...props
}: ControlledInputProps<T>) => {
	return (
		<View style={styles.container}>
			<ThemedText style={styles.label}>{label}</ThemedText>

			<Controller
				control={control}
				name={name}
				render={({
					field: { onChange, onBlur, value },
					fieldState: { error },
				}) => (
					<>
						<Input
							value={value as string}
							onChangeText={onChange}
							onBlur={onBlur}
							variant={error ? "error" : "primary"}
							{...props}
						/>
						{error && <Text style={styles.error}>{error.message}</Text>}
					</>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: Tokens.spacing[4],
	},
	label: {
		fontWeight: Tokens.typography.weights.semibold,
		marginBottom: Tokens.spacing[1],
		marginLeft: Tokens.spacing[1],
	},
	error: {
		color: Tokens.colors.red[500],
		fontSize: Tokens.typography.sizes.xs,
		marginTop: Tokens.spacing[1],
		marginLeft: Tokens.spacing[1],
		fontWeight: Tokens.typography.weights.medium,
	},
});
