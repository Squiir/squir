import { View, Image, Pressable } from "react-native";
import { ThemedText } from "@components/ThemedText";
import { useTheme } from "@hooks/use-theme-color";
import { IconSymbol } from "@components/ui/IconSymbol";

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
        Toujours partant pour boire un verre !
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
        <Pressable onPress={() => alert("Share profile")}>
          <ThemedText type="link">
            <IconSymbol
              name="square.and.arrow.up"
              size={24}
              color={colors.icon}
            />
          </ThemedText>
        </Pressable>
        <Pressable onPress={() => alert("Settings")}>
          <ThemedText type="link">
            <IconSymbol name="gear" size={24} color={colors.icon} />
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
}
