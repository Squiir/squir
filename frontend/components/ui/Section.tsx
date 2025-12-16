import { View } from "react-native";
import { ThemedText } from "@components/ThemedText";

type Props = {
    title: string;
    children: React.ReactNode;
};

export function Section({ title, children }: Props) {
  return (
    <View style={{ marginBottom: 24 }}>
      <ThemedText style={{ marginBottom: 8 }}>
        {title.toUpperCase()}
      </ThemedText>
      {children}
    </View>
  );
}
