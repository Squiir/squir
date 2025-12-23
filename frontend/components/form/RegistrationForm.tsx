import React from "react";
import { View } from "react-native";
import { ControlledInput } from "@components/form/controlled/ControlledInput";
import { ControlledDatePicker } from "./controlled/ControlledDatePicker";
import { useRegistrationForm } from "@hooks/form/use-registration-form";
import { FormStep } from "./FormStep";
import { MultiStepSelector } from "./MultiStepSelector";

export function RegistrationForm() {
	const {
		step,
		control,
		isSubmitting,
		nextStep,
		prevStep,
		submit,
		isFirstStep,
		isLastStep,
	} = useRegistrationForm();

	return (
		<View className="flex-1 bg-white px-6 justify-center">
			{step === 0 && (
				<FormStep title="Identifiants">
					<ControlledInput name="username" label="Pseudo" control={control} />
					<ControlledInput name="email" label="Email" control={control} />
					<ControlledInput
						name="password"
						label="Mot de passe"
						control={control}
						secureTextEntry
					/>
				</FormStep>
			)}

			{step === 1 && (
				<FormStep title="Identité">
					<ControlledInput name="firstName" label="Prénom" control={control} />
					<ControlledInput name="lastName" label="Nom" control={control} />
				</FormStep>
			)}

			{step === 2 && (
				<FormStep title="Dernière étape">
					<ControlledDatePicker
						name="birthDate"
						label="Date de naissance"
						control={control}
					/>
				</FormStep>
			)}

			<MultiStepSelector
				nextStep={nextStep}
				prevStep={prevStep}
				isFirstStep={isFirstStep}
				isLastStep={isLastStep}
				submit={submit}
				isSubmitting={isSubmitting}
			/>
		</View>
	);
}
