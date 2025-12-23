import React from "react";
import { View, Text } from "react-native";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { Input, InputProps } from "@components/ui/Input";

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
			<Text className="text-slate-700 font-semibold mb-1 ml-1">{label}</Text>

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
