import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import { ThemedText } from "@components/ThemedText";
import { ThemedView } from "@components/ThemedView";
import { useThemeColor } from "@hooks/use-theme-color";

type Props = {
  name: string;
  username: string;
  email: string;
  avatarUri?: string;
};

export function ProfileHeader({ name, username, email, avatarUri }: Props) {
  const tint = useThemeColor({}, "tint");
  const border = useThemeColor({}, "icon");

  return (
    <ThemedView className="items-center pt-[18px] pb-2">
      <View
        style={{ borderColor: border }}
        className="w-[92px] h-[92px] rounded-[46px] border border-[0.4px] p-[3px]"
      >
        <Image
          source={
            avatarUri
              ? { uri: avatarUri }
              : require("@assets/images/react-logo.png")
          }
          className="w-full h-full rounded-[46px]"
          contentFit="cover"
        />
      </View>

      <ThemedText type="title" className="mt-2.5">
        {name}
      </ThemedText>

      <ThemedText className="mt-1 opacity-[0.8]">@{username}</ThemedText>
      <ThemedText className="mt-[2px] opacity-[0.7] text-[13px]">
        {email}
      </ThemedText>

      <View
        style={{ borderColor: tint }}
        className="mt-2.5 px-2.5 py-1 rounded-full border border-[0.4px]"
      >
        <ThemedText style={{ color: tint }} className="text-[12px]">
          Profil
        </ThemedText>
      </View>
    </ThemedView>
  );
}
