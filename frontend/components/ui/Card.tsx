import React from "react";
import { ViewStyle } from "react-native";
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
      style={[{ backgroundColor: background, borderColor: border }, style]}
      className="border-[0.4px] rounded-[16px] p-[14px]"
    >
      {children}
    </ThemedView>
  );
}
