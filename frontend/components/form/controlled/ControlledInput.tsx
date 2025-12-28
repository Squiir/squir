import { ThemedText } from "@components/ThemedText";
import { Input, InputProps } from "@components/ui/Input";
import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { Text, View } from "react-native";

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
		<View className="mb-4">
			<ThemedText className="font-semibold mb-1 ml-1">{label}</ThemedText>

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
						{error && (
							<Text className="text-red-500 text-xs mt-1 ml-1 font-medium">
								{error.message}
							</Text>
						)}
					</>
				)}
			/>
		</View>
	);
};
