import React, { PropsWithChildren } from 'react';
import { View, Text } from 'react-native';

type FormStepProps = {
	title: string;
} & PropsWithChildren;

export function FormStep({ title, children }: FormStepProps) {
	return (
		<View>
			<Text className="text-2xl font-bold mb-6 text-slate-900">{title}</Text>
			{children}
		</View>
	)
};