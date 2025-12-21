import { PropsWithChildren, useState } from "react";
import { TouchableOpacity } from "react-native";

import { ThemedText } from "@components/ThemedText";
import { ThemedView } from "@components/ThemedView";
import { IconSymbol } from "@components/ui/IconSymbol";
import { Colors } from "@constants/theme";
import { useColorScheme } from "@hooks/color/use-color-scheme";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? "light";

  return (
    <ThemedView>
      <TouchableOpacity
        className="flex-row items-center gap-1.5"
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
          textClassName={isOpen ? "rotate-[90deg]" : "rotate-[0deg]"}
        />

        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView className="mt-1.5 ml-6">{children}</ThemedView>}
    </ThemedView>
  );
}
