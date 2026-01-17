import { Tokens } from "@constants/tokens";
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { CalendarDays } from "lucide-react-native";
import { useState } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import {
	Modal,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

interface ControlledDatePickerProps<T extends FieldValues> {
	control: Control<T>;
	name: FieldPath<T>;
	label: string;
}

export const ControlledDatePicker = <T extends FieldValues>({
	control,
	name,
	label,
}: ControlledDatePickerProps<T>) => {
	const [show, setShow] = useState(false);

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>

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
								style={[
									styles.input,
									error ? styles.inputError : styles.inputNormal,
								]}
							>
								<Text
									style={[
										styles.inputText,
										value
											? styles.inputTextFilled
											: styles.inputTextPlaceholder,
									]}
								>
									{value ? dateValue.toLocaleDateString("fr-FR") : "JJ/MM/AAAA"}
								</Text>
								<View style={styles.iconContainer}>
									<CalendarDays size={20} color={Tokens.colors.primary[600]} />
								</View>
							</TouchableOpacity>

							{Platform.OS === "ios" ? (
								<Modal visible={show} transparent animationType="slide">
									<Pressable
										style={styles.overlay}
										onPress={() => setShow(false)}
									/>

									<View style={styles.modal}>
										<View style={styles.modalHeader}>
											<TouchableOpacity onPress={() => setShow(false)}>
												<Text style={styles.cancelButton}>Annuler</Text>
											</TouchableOpacity>
											<Text style={styles.modalTitle}>Choisir une date</Text>
											<TouchableOpacity onPress={() => setShow(false)}>
												<Text style={styles.okButton}>OK</Text>
											</TouchableOpacity>
										</View>

										<View style={styles.pickerContainer}>
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

							{error && <Text style={styles.error}>{error.message}</Text>}
						</>
					);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: Tokens.spacing[4],
	},
	label: {
		color: Tokens.colors.gray[700],
		fontWeight: Tokens.typography.weights.semibold,
		marginBottom: Tokens.spacing[1],
		marginLeft: Tokens.spacing[1],
	},
	input: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderWidth: 1,
		borderRadius: Tokens.borderRadius.xl,
		paddingHorizontal: Tokens.spacing[4],
		height: 56,
		backgroundColor: Tokens.colors.gray[50],
	},
	inputNormal: {
		borderColor: Tokens.colors.gray[200],
	},
	inputError: {
		borderColor: Tokens.colors.red[500],
	},
	inputText: {
		fontSize: Tokens.typography.sizes.base,
	},
	inputTextFilled: {
		color: Tokens.colors.gray[900],
	},
	inputTextPlaceholder: {
		color: Tokens.colors.gray[400],
	},
	iconContainer: {
		backgroundColor: Tokens.colors.primary[100],
		padding: Tokens.spacing[2],
		borderRadius: Tokens.borderRadius.lg,
	},
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.4)",
	},
	modal: {
		backgroundColor: Tokens.colors.white,
		borderTopLeftRadius: Tokens.borderRadius["3xl"],
		borderTopRightRadius: Tokens.borderRadius["3xl"],
		paddingBottom: Tokens.spacing[10],
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: Tokens.spacing[4],
		borderBottomWidth: 1,
		borderBottomColor: Tokens.colors.gray[100],
	},
	cancelButton: {
		color: Tokens.colors.red[500],
		fontWeight: Tokens.typography.weights.semibold,
		fontSize: Tokens.typography.sizes.base,
	},
	modalTitle: {
		fontWeight: Tokens.typography.weights.bold,
		fontSize: Tokens.typography.sizes.lg,
		color: Tokens.colors.gray[900],
	},
	okButton: {
		color: Tokens.colors.primary[600],
		fontWeight: Tokens.typography.weights.bold,
		fontSize: Tokens.typography.sizes.base,
	},
	pickerContainer: {
		height: 250,
		justifyContent: "center",
		backgroundColor: Tokens.colors.white,
	},
	error: {
		color: Tokens.colors.red[500],
		fontSize: Tokens.typography.sizes.xs,
		marginTop: Tokens.spacing[1],
		marginLeft: Tokens.spacing[1],
		fontWeight: Tokens.typography.weights.medium,
	},
});
