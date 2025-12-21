import { View, ViewProps } from "react-native";
import { useTheme } from "@hooks/color/use-theme-color";
import { Spacing } from "@constants/spacing";

export function Screen({ style, ...props }: ViewProps) {
  const colors = useTheme();

  return (
    <View
      {...props}
      style={[
        {
          flex: 1,
          backgroundColor: colors.background,
          padding: Spacing.md,
        },
        style,
      ]}
    />
  );
}
