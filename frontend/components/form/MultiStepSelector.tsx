import { Button } from "@components/ui/Button";
import React from "react";
import { View } from "react-native";

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
		<View className="flex-row mt-8 items-center space-x-3">
			<Button
				title="Retour"
				onPress={prevStep}
				variant="outline"
				disabled={isFirstStep}
				className="flex-1"
			/>
			<Button
				title={isLastStep ? "Terminer" : "Suivant"}
				onPress={isLastStep ? submit : nextStep}
				isPending={isSubmitting}
				className="flex-1"
			/>
		</View>
	);
}
