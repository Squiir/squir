import type { ProfileHeaderProps } from "@app-types/profile";
import { Avatar } from "@components/ui/Avatar";
import { Tokens } from "@constants/tokens";
import { useColorScheme } from "@hooks/color/use-color-scheme";
import { Pencil } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function ProfileHeader({
	username,
	avatarUrl,
	status,
}: ProfileHeaderProps) {
	const colorScheme = useColorScheme();
	const isDark = colorScheme === "dark";

	return (
		<View style={styles.container}>
			<Avatar uri={avatarUrl} username={username} />
			<View style={styles.usernameContainer}>
				<Text style={[styles.username, isDark && styles.usernameDark]}>
					{username}
				</Text>
				<Pressable style={styles.editButton}>
					<Pencil size={16} color={Tokens.colors.gray[500]} />
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "center",
		gap: 64,
	},
	usernameContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: Tokens.spacing[2],
	},
	username: {
		fontSize: Tokens.typography.sizes.xl,
		fontWeight: Tokens.typography.weights.bold,
		color: Tokens.colors.black,
	},
	usernameDark: {
		color: Tokens.colors.white,
	},
	editButton: {
		padding: Tokens.spacing[1],
	},
});
