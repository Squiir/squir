import { View } from "react-native";
import { ThemedText } from "@components/ThemedText";
import { useTheme } from "@hooks/use-theme-color";

export function QrCard({ label }: { label: string }) {
  const colors = useTheme();

  return (
    <View
      style={{
        width: 140,
        height: 180,
        borderRadius: 16,
        backgroundColor: colors.surface,
        padding: 16,
        marginRight: 12,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          borderRadius: 12,
          marginBottom: 12,
        }}
      />

      <ThemedText>{label}</ThemedText>
    </View>
  );
}
