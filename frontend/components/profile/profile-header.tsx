import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";

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
    <ThemedView style={styles.container}>
      <View style={[styles.avatarWrap, { borderColor: border }]}>
        <Image
          source={
            avatarUri
              ? { uri: avatarUri }
              : require("@/assets/images/react-logo.png")
          }
          style={styles.avatar}
          contentFit="cover"
        />
      </View>

      <ThemedText type="title" style={styles.name}>
        {name}
      </ThemedText>

      <ThemedText style={styles.username}>@{username}</ThemedText>
      <ThemedText style={styles.email}>{email}</ThemedText>

      <View style={[styles.badge, { borderColor: tint }]}>
        <ThemedText style={[styles.badgeText, { color: tint }]}>
          Profil
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 18,
    paddingBottom: 8,
  },
  avatarWrap: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 3,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 46,
  },
  name: {
    marginTop: 10,
  },
  username: {
    marginTop: 4,
    opacity: 0.8,
  },
  email: {
    marginTop: 2,
    opacity: 0.7,
    fontSize: 13,
  },
  badge: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
  badgeText: {
    fontSize: 12,
  },
});
