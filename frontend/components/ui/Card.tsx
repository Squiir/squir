import { View } from "react-native";

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <View className="p-4 bg-white shadow-sm dark:bg-gray-800 rounded-2xl">
      {children}
    </View>
  );
}
