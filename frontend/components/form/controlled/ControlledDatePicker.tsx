import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Platform,
	Modal,
	Pressable,
} from "react-native";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { CalendarDays } from "lucide-react-native";

interface ControlledDatePickerProps<T extends FieldValues> {
	control: Control<T>;
	name: FieldPath<T>;
	label: string;
}

// TODO: review and customize the date picker for better ui/ux
export const ControlledDatePicker = <T extends FieldValues>({
	control,
	name,
	label,
}: ControlledDatePickerProps<T>) => {
	const [show, setShow] = useState(false);

	return (
		<View className="mb-4">
			<Text className="text-slate-700 font-semibold mb-1 ml-1">{label}</Text>

			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, value }, fieldState: { error } }) => {
					const dateValue = (value as any) instanceof Date ? value : new Date();

					const handleDateChange = (
						event: DateTimePickerEvent,
						selectedDate?: Date,
					) => {
						if (Platform.OS === "android") {
							setShow(false);
							if (selectedDate) onChange(selectedDate);
						} else if (selectedDate) {
							onChange(selectedDate);
						}
					};

					return (
						<>
							<TouchableOpacity
								onPress={() => setShow(true)}
								activeOpacity={0.7}
								className={`flex-row items-center justify-between border rounded-xl px-4 h-14 bg-slate-50 ${error ? "border-red-500" : "border-slate-200"}`}
							>
								<Text
									className={`text-base ${value ? "text-slate-900" : "text-slate-400"}`}
								>
									{value ? dateValue.toLocaleDateString("fr-FR") : "JJ/MM/AAAA"}
								</Text>
								<View className="bg-indigo-100 p-2 rounded-lg">
									<CalendarDays size={20} color="#4f46e5" />
								</View>
							</TouchableOpacity>

							{Platform.OS === "ios" ? (
								<Modal visible={show} transparent animationType="slide">
									{/* Backdrop cliquable pour fermer la modal */}
									<Pressable
										className="flex-1 bg-black/40"
										onPress={() => setShow(false)}
									/>

									<View className="bg-white rounded-t-3xl pb-10">
										<View className="flex-row justify-between items-center p-4 border-b border-slate-100">
											<TouchableOpacity onPress={() => setShow(false)}>
												<Text className="text-red-500 font-semibold text-base">
													Annuler
												</Text>
											</TouchableOpacity>
											<Text className="font-bold text-lg text-slate-900">
												Choisir une date
											</Text>
											<TouchableOpacity onPress={() => setShow(false)}>
												<Text className="text-indigo-600 font-bold text-base">
													OK
												</Text>
											</TouchableOpacity>
										</View>

										{/* Conteneur avec hauteur fixe pour le picker */}
										<View className="h-[250px] justify-center bg-white">
											<DateTimePicker
												value={dateValue}
												mode="date"
												display="spinner"
												onChange={handleDateChange}
												maximumDate={new Date()}
												locale="fr-FR"
												textColor="black"
											/>
										</View>
									</View>
								</Modal>
							) : (
								show && (
									<DateTimePicker
										value={dateValue}
										mode="date"
										display="default"
										onChange={handleDateChange}
										maximumDate={new Date()}
									/>
								)
							)}

							{error && (
								<Text className="text-red-500 text-xs mt-1 ml-1 font-medium">
									{error.message}
								</Text>
							)}
						</>
					);
				}}
			/>
		</View>
	);
};
