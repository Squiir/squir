import { QrCode } from "@app-types/qrcode";
import { Tokens } from "@constants/tokens";
import { LinearGradient } from "expo-linear-gradient";
import { Check } from "lucide-react-native";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type ModalQrPreviewProps = {
	visible: boolean;
	onClose: () => void;
	qrcode?: QrCode;
};

export function ModalQrPreview({
	visible,
	onClose,
	qrcode,
}: ModalQrPreviewProps) {
	return (
		<Modal
			visible={visible}
			transparent
			animationType="fade"
			onRequestClose={onClose}
		>
			<Pressable onPress={onClose} style={styles.overlay}>
				<Pressable onPress={() => {}}>
					<LinearGradient
						colors={["#ffffff", "#315772ff"]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.modal}
					>
						{/* Icône succès */}
						<View style={styles.iconContainer}>
							<View style={styles.successIcon}>
								<Check size={32} color="white" strokeWidth={3} />
							</View>
						</View>

						{/* Message */}
						<Text style={styles.title}>QR Code généré !</Text>

						<Text style={styles.label}>{qrcode?.label ?? "Sans label"}</Text>

						<Text style={styles.hint}>Retrouvez-le dans votre profil</Text>

						{/* Bouton */}
						<Pressable onPress={onClose} style={styles.button}>
							<Text style={styles.buttonText}>OK</Text>
						</Pressable>
					</LinearGradient>
				</Pressable>
			</Pressable>
		</Modal>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: Tokens.spacing[6],
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modal: {
		width: "100%",
		maxWidth: 380,
		borderRadius: Tokens.borderRadius["3xl"],
		overflow: "hidden",
		padding: Tokens.spacing[6],
	},
	iconContainer: {
		alignItems: "center",
		marginBottom: Tokens.spacing[4],
	},
	successIcon: {
		width: 64,
		height: 64,
		backgroundColor: Tokens.colors.green[500],
		borderRadius: 32,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		color: Tokens.colors.gray[900],
		fontSize: Tokens.typography.sizes.xl,
		fontWeight: Tokens.typography.weights.bold,
		textAlign: "center",
		marginBottom: Tokens.spacing[2],
	},
	label: {
		color: Tokens.colors.gray[600],
		textAlign: "center",
		marginBottom: Tokens.spacing[1],
	},
	hint: {
		color: Tokens.colors.gray[500],
		fontSize: Tokens.typography.sizes.sm,
		textAlign: "center",
		marginBottom: Tokens.spacing[6],
	},
	button: {
		paddingVertical: Tokens.spacing[4],
		borderRadius: Tokens.borderRadius.xl,
		backgroundColor: Tokens.colors.primary[500],
		alignItems: "center",
	},
	buttonText: {
		color: Tokens.colors.white,
		fontWeight: Tokens.typography.weights.bold,
		fontSize: Tokens.typography.sizes.base,
	},
});
