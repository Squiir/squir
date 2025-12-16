import { View, Image, Pressable } from "react-native";
import { ThemedText } from "@components/ThemedText";
import { useTheme } from "@hooks/use-theme-color";

export function ProfileHeader() {
  const colors = useTheme();

  return (
    <View style={{ alignItems: "center", paddingVertical: 24 }}>
      <Image
        source={require("@assets/images/dydou_profile.jpeg")}
        style={{
          width: 96,
          height: 96,
          borderRadius: 48,
          marginBottom: 12,
        }}
      />

      <ThemedText type="title">dylan_chpr</ThemedText>
      <ThemedText style={{ color: colors.textSecondary }}>
        Toujours partant 🍻
      </ThemedText>

      <View
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          flexDirection: "row",
          gap: 12,
        }}
      >
        <Pressable onPress={() => alert("Edit profile")}>
          <ThemedText type="link">Éditer</ThemedText>
        </Pressable>
        <Pressable onPress={() => alert("Settings")}>
          <ThemedText type="link">⚙️</ThemedText>
        </Pressable>
      </View>
    </View>
  );
}
