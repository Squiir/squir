import { ThemedText } from "@components/ThemedText";
import { Tokens } from "@constants/tokens";
import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";

type FormStepProps = {
	title: string;
} & PropsWithChildren;

export function FormStep({ title, children }: FormStepProps) {
	return (
		<>
			<ThemedText type="title" style={styles.title}>
				{title}
			</ThemedText>
			{children}
		</>
	);
}

const styles = StyleSheet.create({
	title: {
		marginBottom: Tokens.spacing[2],
	},
});
