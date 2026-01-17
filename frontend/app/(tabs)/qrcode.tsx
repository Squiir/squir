import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { SwipeableTabWrapper } from "@components/navigation/SwipeableTabWrapper";
import { ActiveQrList } from "@components/qrcode/ActiveQrList";
import { QrCodeHistory } from "@components/qrcode/QrCodeHistory";
import { QrHeader } from "@components/qrcode/QrHeader";
import { QrModal } from "@components/qrcode/QrModal";
import { QrSection } from "@components/qrcode/QrSection";
import { ScannerButton } from "@components/scanner/ScannerButton";
import { Tokens } from "@constants/tokens";
import { useGetMyQrCodes } from "@hooks/qrcode/use-get-qr-codes";
import { useSocketNotifications } from "@hooks/use-socket-notifications";
import { QrCodeGroup } from "@utils/qrcode";

export default function QrCodeScreen() {
	// Activer les notifications temps réel
	useSocketNotifications();

	const {
		data: groupedQrCodes,
		isLoading: qrsLoading,
		isError: qrsError,
		error: qrsErr,
	} = useGetMyQrCodes();

	const [selectedGroup, setSelectedGroup] = useState<QrCodeGroup | undefined>(
		undefined,
	);

	return (
		<SwipeableTabWrapper currentRoute="qrcode">
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.content}
			>
				{/* Header */}
				<QrHeader />

				{/* Scanner Button - PRO/ADMIN only */}
				<ScannerButton />

				{/* QR codes Section */}
				<QrSection title="Disponibles">
					<ActiveQrList
						groupedQrCodes={groupedQrCodes}
						isLoading={qrsLoading}
						isError={qrsError}
						error={qrsErr}
						onSelectGroup={setSelectedGroup}
					/>
				</QrSection>

				{/* Modal QR */}
				<QrModal
					group={selectedGroup}
					onClose={() => setSelectedGroup(undefined)}
				/>

				{/* Historique */}
				<QrCodeHistory />
			</ScrollView>
		</SwipeableTabWrapper>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		paddingBottom: Tokens.spacing[16],
	},
});
