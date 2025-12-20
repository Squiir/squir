import React from "react";
import { View, ScrollView } from "react-native";
import { useMe } from "@hooks/use-me";
import { LoyaltyPoints } from "@components/profile/LoyaltyPoints";
import { Section } from "@components/ui/Section";
import { QRCodeCarousel } from "@components/profile/QRcode";
import { Button } from "@components/ui/Button";
import { ProfileHeader } from "@components/profile/ProfileHeader";
import { useAuth } from "@store/auth";
import { useQueryClient } from "@tanstack/react-query";

export default function ProfileScreen() {
  const queryClient = useQueryClient();
  const { data: user } = useMe();
  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
    queryClient.clear();
  }

  if (!user) return null;

  return (
    <ScrollView className="flex-1 px-4 pt-6">
      <ProfileHeader
        username={user.username}
        avatarUrl={user.avatarUrl}
        status={user.status}
      />

      <View className="mt-6">
        <LoyaltyPoints points={user?.loyaltyPoints} />
      </View>

      <View className="mt-8">
        <Section title="Mes QR codes">
          <QRCodeCarousel qrCodes={user?.qrCodes} />
        </Section>
      </View>

      <View className="px-6 pt-40 pb-6">
        <View className="gap-4">
          <Button
            title="Se déconnecter"
            variant="secondary"
            onPress={handleLogout}
          />

          <View className="h-2" />

          <Button title="Supprimer le compte" variant="danger" />
        </View>
      </View>
    </ScrollView>
  );
}
