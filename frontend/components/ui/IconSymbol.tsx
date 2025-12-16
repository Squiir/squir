// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SymbolWeight, SymbolViewProps } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue } from "react-native";

type IconMapping = Record<SymbolViewProps["name"], string>;
export type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "person.circle": "ion:person-circle-outline",
  "bubble.left.and.bubble.right.fill": "chat",
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  textClassName,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  textClassName?: string;
  weight?: SymbolWeight;
}) {
  const mapped = MAPPING[name];

  if (mapped?.startsWith?.("ion:")) {
    const iconName = mapped.slice(4) as ComponentProps<typeof Ionicons>["name"];
    return (
      <Ionicons
        name={iconName}
        size={size}
        color={color}
        className={textClassName}
      />
    );
  }

  return (
    <MaterialIcons
      color={color}
      size={size}
      name={mapped as ComponentProps<typeof MaterialIcons>["name"]}
      className={textClassName}
    />
  );
}
