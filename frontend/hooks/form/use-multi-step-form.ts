import { useState } from 'react';
import {
	useForm,
	UseFormProps,
	FieldValues,
	FieldPath
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType } from 'zod';

interface MultiStepOptions<T extends FieldValues> {
	schema: ZodType<T, any, any>;
	stepsFields: FieldPath<T>[][];
	defaultValues: UseFormProps<T>['defaultValues'];
	onSubmit: (data: T) => Promise<void> | void;
}

export function useMultiStepForm<T extends FieldValues>({
	schema,
	stepsFields,
	defaultValues,
	onSubmit,
}: MultiStepOptions<T>) {
	const [step, setStep] = useState(0);

	const {
		control,
		handleSubmit,
		trigger,
		formState: { isSubmitting, errors }
	} = useForm<T>({
		resolver: zodResolver(schema),
		defaultValues,
		mode: 'onBlur',
	});

	const nextStep = async () => {
		const isStepValid = await trigger(stepsFields[step]);
		if (isStepValid && step < stepsFields.length - 1) {
			setStep((s) => s + 1);
		}
	};

	const prevStep = () => {
		if (step > 0) setStep((s) => s - 1);
	};

	return {
		step,
		control,
		errors,
		isSubmitting,
		nextStep,
		prevStep,
		isFirstStep: step === 0,
		isLastStep: step === stepsFields.length - 1,
		submit: handleSubmit(onSubmit),
	};
};