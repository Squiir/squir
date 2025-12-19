import { View, Text, Pressable } from "react-native";
import { Avatar } from "@components/ui/Avatar";
import { Pencil } from "lucide-react-native";

export function ProfileHeader({ user }: any) {
  return (
    <View className="items-center gap-3">
      <Avatar uri={user.avatarUrl} username={user.username} />
      <View className="flex-row items-center gap-2">
        <Text className="text-xl font-bold text-black dark:text-white">
          {user.username}
        </Text>
        <Pressable>
          <Pencil size={16} color="#6b7280" />
        </Pressable>
      </View>
    </View>
  );
}
