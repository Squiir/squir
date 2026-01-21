import { Tokens } from "@constants/tokens";
import { PropsWithChildren } from "react";
import { DimensionValue, Modal, StyleSheet, View } from "react-native";

interface ModalContainerProps extends PropsWithChildren {
	visible: boolean;
	onClose: () => void;
	maxHeight?: DimensionValue;
}

export function ModalContainer({
	visible,
	onClose,
	maxHeight,
	children,
}: ModalContainerProps) {
	return (
		<Modal
			visible={visible}
			transparent
			animationType="fade"
			onRequestClose={onClose}
		>
			<View style={styles.overlay}>
				<View style={[styles.container, maxHeight ? { maxHeight } : undefined]}>
					<View style={styles.modal}>{children}</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: `${Tokens.colors.pink[900]}CC`,
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		width: "90%",
		maxWidth: 380,
	},
	modal: {
		backgroundColor: Tokens.colors.pink[50],
		borderRadius: Tokens.borderRadius["3xl"],
		padding: Tokens.spacing[6],
		shadowColor: Tokens.colors.pink[500],
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.3,
		shadowRadius: 24,
		elevation: 12,
	},
});
