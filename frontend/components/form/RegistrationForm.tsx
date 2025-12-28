import { ControlledDatePicker } from "@components/form/controlled/ControlledDatePicker";
import { ControlledInput } from "@components/form/controlled/ControlledInput";
import { FormStep } from "@components/form/FormStep";
import { MultiStepSelector } from "@components/form/MultiStepSelector";
import { useRegistrationForm } from "@hooks/form/use-registration-form";
import React from "react";

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
		<>
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
				<FormStep title="Qui êtes-vous ?">
					<ControlledInput name="firstName" label="Prénom" control={control} />
					<ControlledInput name="lastName" label="Nom" control={control} />
				</FormStep>
			)}

			{step === 2 && (
				<FormStep title="Vous y êtes presque !">
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
		</>
	);
}
