import { ThemedText } from "@components/ThemedText";
import { PropsWithChildren } from "react";

type FormStepProps = {
	title: string;
} & PropsWithChildren;

export function FormStep({ title, children }: FormStepProps) {
	return (
		<>
			<ThemedText type="title" className="mb-2">
				{title}
			</ThemedText>
			{children}
		</>
	);
}
