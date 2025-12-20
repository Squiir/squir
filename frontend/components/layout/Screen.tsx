import { View, ViewProps } from "react-native";
import { useTheme } from "@hooks/use-theme-color";
import { spacing } from "@constants/spacing";

export function Screen({ style, ...props }: ViewProps) {
  const colors = useTheme();

  return (
    <View
      {...props}
      style={[
        {
          flex: 1,
          backgroundColor: colors.background,
          padding: spacing.md,
        },
        style,
      ]}
    />
  );
}
