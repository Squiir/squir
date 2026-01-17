import { Button } from "@components/ui/Button";
import { Tokens } from "@constants/tokens";
import { StyleSheet, View } from "react-native";

export type MultiStepSelectorProps = {
	isSubmitting: boolean;
	nextStep: () => void;
	prevStep: () => void;
	submit: () => void;
	isFirstStep: boolean;
	isLastStep: boolean;
};

export function MultiStepSelector({
	isSubmitting,
	nextStep,
	prevStep,
	submit,
	isFirstStep,
	isLastStep,
}: MultiStepSelectorProps) {
	return (
		<View style={styles.container}>
			<Button
				title="Retour"
				onPress={prevStep}
				variant="outline"
				disabled={isFirstStep}
				style={styles.button}
			/>
			<Button
				title={isLastStep ? "Terminer" : "Suivant"}
				onPress={isLastStep ? submit : nextStep}
				isPending={isSubmitting}
				style={styles.button}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		marginTop: Tokens.spacing[8],
		alignItems: "center",
		gap: Tokens.spacing[3],
	},
	button: {
		flex: 1,
	},
});
