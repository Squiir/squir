import { Text, View } from "react-native";

export function Section({ title, children }: any) {
  return (
    <View className="gap-3">
      <Text className="text-sm text-gray-500 uppercase">{title}</Text>
      {children}
    </View>
  );
}
