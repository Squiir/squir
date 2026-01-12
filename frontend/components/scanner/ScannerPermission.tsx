import { Tokens } from "@constants/tokens";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ScannerPermissionProps = {
	loading?: boolean;
	granted: boolean;
	onRequestPermission: () => void;
};

export function ScannerPermission({
	loading,
	granted,
	onRequestPermission,
}: ScannerPermissionProps) {
	if (loading) {
		return (
			<LinearGradient colors={["#ffffff", "#60a5fa"]} style={styles.container}>
				<View style={styles.content}>
					<Text style={styles.loadingText}>Chargement...</Text>
				</View>
			</LinearGradient>
		);
	}

	if (!granted) {
		return (
			<LinearGradient colors={["#ffffff", "#60a5fa"]} style={styles.container}>
				<View style={styles.content}>
					<Text style={styles.title}>Accès à la caméra requis</Text>
					<Text style={styles.description}>
						Autorise l'accès à la caméra pour scanner les QR codes
					</Text>
					<TouchableOpacity onPress={onRequestPermission} style={styles.button}>
						<Text style={styles.buttonText}>Autoriser la caméra</Text>
					</TouchableOpacity>
				</View>
			</LinearGradient>
		);
	}

	return null;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: Tokens.spacing[6],
	},
	loadingText: {
		color: Tokens.colors.gray[800],
		fontSize: Tokens.typography.sizes.lg,
	},
	title: {
		color: Tokens.colors.gray[800],
		textAlign: "center",
		fontSize: Tokens.typography.sizes.lg,
		fontWeight: Tokens.typography.weights.bold,
		marginBottom: Tokens.spacing[4],
	},
	description: {
		color: Tokens.colors.gray[700],
		textAlign: "center",
		marginBottom: Tokens.spacing[6],
	},
	button: {
		backgroundColor: Tokens.colors.primary[600],
		paddingHorizontal: Tokens.spacing[8],
		paddingVertical: Tokens.spacing[4],
		borderRadius: Tokens.borderRadius.xl,
	},
	buttonText: {
		color: Tokens.colors.white,
		fontWeight: Tokens.typography.weights.semibold,
		fontSize: Tokens.typography.sizes.base,
	},
});
