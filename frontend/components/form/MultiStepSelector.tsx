import React from 'react';
import { View } from 'react-native';
import { Button } from '@components/ui/Button';

export type MultiStepSelectorProps = {
	isSubmitting: boolean;
	nextStep: () => void;
	prevStep: () => void;
	submit: () => void;
	isFirstStep: boolean;
	isLastStep: boolean;
}

export function MultiStepSelector({
	isSubmitting,
	nextStep,
	prevStep,
	submit,
	isFirstStep,
	isLastStep,
}: MultiStepSelectorProps) {
	return (
		<View className="flex-row mt-8 space-x-3">
			<Button title="Retour" onPress={prevStep} variant="outline" disabled={isFirstStep} />
			<Button
				title={isLastStep ? "Terminer" : "Suivant"}
				onPress={isLastStep ? submit : nextStep}
				isSubmitting={isSubmitting}
			/>
		</View >
	);
};