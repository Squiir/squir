import { ScrollView, StyleSheet, View } from "react-native";

import { SwipeableTabWrapper } from "@components/navigation/SwipeableTabWrapper";
import { ProfileHeader } from "@components/profile/ProfileHeader";
import { Button } from "@components/ui/Button";
import { Tokens } from "@constants/tokens";
import { useLogout } from "@hooks/auth/use-logout";
import { useMe } from "@hooks/use-me";

export default function ProfileScreen() {
	const { data: user } = useMe();
	const { mutate: logout } = useLogout();

	if (!user) return null;

	return (
		<SwipeableTabWrapper currentRoute="profile">
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.content}
			>
				{/* Header */}
				<ProfileHeader
					username={user.username}
					avatarUrl={user.avatarUrl}
					status={user.status}
				/>

				{/* Actions */}
				<View style={styles.actionsContainer}>
					<View style={styles.actionsInner}>
						<Button
							title="Se déconnecter"
							variant="secondary"
							onPress={() => logout()}
						/>

						<View style={styles.spacer} />

						<Button title="Supprimer le compte" variant="danger" />
					</View>
				</View>
			</ScrollView>
		</SwipeableTabWrapper>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		paddingHorizontal: Tokens.spacing[4],
		paddingTop: Tokens.spacing[6],
	},
	actionsContainer: {
		paddingHorizontal: Tokens.spacing[6],
		paddingTop: Tokens.spacing[16],
		paddingBottom: Tokens.spacing[6],
	},
	actionsInner: {
		gap: Tokens.spacing[4],
	},
	spacer: {
		height: Tokens.spacing[2],
	},
});
