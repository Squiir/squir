import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { ThemedView } from "@components/ThemedView";
import { useThemeColor } from "@hooks/use-theme-color";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function Card({ children, style }: Props) {
  const background = useThemeColor({}, "background");
  const border = useThemeColor({}, "icon");

  return (
    <ThemedView
      style={[
        styles.card,
        { backgroundColor: background, borderColor: border },
        style,
      ]}
    >
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    padding: 14,
  },
});
