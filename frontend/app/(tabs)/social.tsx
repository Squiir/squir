import React from "react";
import { Alert, StyleSheet, View } from "react-native";

import ParallaxScrollView from "@components/ParallaxScrollView";
import { ThemedView } from "@components/ThemedView";
import { Image } from "expo-image";

import { ProfileHeader } from "@components/profile/ProfileHeader";
import { Card } from "@components/profile/Card";
import { RowItem } from "@components/ui/RowItem";
import { SectionHeader } from "@components/ui/SectionHeader";

export default function SocialScreen() {
  const user = {
    isLoggedIn: true,
    name: "Dylan",
    username: "dylan_chpr",
    email: "dylan@email.com",
    avatarUri: undefined as string | undefined,
  };

  const onNotImplemented = (label: string) => {
    Alert.alert("Bientôt dispo", label);
  };

  const onLogout = () => Alert.alert("Déconnexion", "Tu es déconnecté (mock).");
  const onDelete = () =>
    Alert.alert(
      "Supprimer le compte",
      "Cette action est irréversible. Continuer ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => Alert.alert("Compte supprimé (mock)"),
        },
      ]
    );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@assets/images/background-image.png")}
          style={{ width: "100%", height: 300 }}
          contentFit="cover"
        />
      }
    >
      <ThemedView style={styles.page}>
        <ProfileHeader
          name={user.name}
          username={user.username}
          email={user.email}
          avatarUri={user.avatarUri}
        />

        <SectionHeader title="Compte" />
        <Card>
          <RowItem
            label="Modifier le profil"
            iconLeft="person.crop.circle"
            onPress={() => onNotImplemented("Modifier le profil")}
          />
          <RowItem
            label="Sécurité & mot de passe"
            iconLeft="lock"
            onPress={() => onNotImplemented("Sécurité & mot de passe")}
          />
        </Card>

        <SectionHeader title="Préférences" />
        <Card>
          <RowItem
            label="Thème"
            iconLeft="moon.stars"
            onPress={() => onNotImplemented("Choix du thème")}
          />
          <RowItem
            label="Notifications"
            iconLeft="bell"
            onPress={() => onNotImplemented("Préférences notifications")}
          />
          <RowItem
            label="Langue"
            iconLeft="globe"
            onPress={() => onNotImplemented("Langue")}
          />
        </Card>

        <SectionHeader title="Social" />
        <Card>
          <RowItem
            label="Partager mon profil"
            iconLeft="square.and.arrow.up"
            onPress={() => onNotImplemented("Partager")}
          />
          <RowItem
            label="QR Code"
            iconLeft="qrcode"
            onPress={() => onNotImplemented("QR Code")}
          />
        </Card>

        <SectionHeader title="Aide" />
        <Card>
          <RowItem
            label="Support"
            iconLeft="questionmark.circle"
            onPress={() => onNotImplemented("Support")}
          />
          <RowItem
            label="À propos"
            iconLeft="info.circle"
            onPress={() => onNotImplemented("À propos")}
          />
        </Card>

        <SectionHeader title="Actions" />
        <Card>
          {user.isLoggedIn ? (
            <RowItem
              label="Se déconnecter"
              iconLeft="rectangle.portrait.and.arrow.right"
              onPress={onLogout}
            />
          ) : (
            <RowItem
              label="Se connecter"
              iconLeft="rectangle.portrait.and.arrow.right"
              onPress={() => onNotImplemented("Se connecter")}
            />
          )}
          <RowItem
            label="Supprimer le compte"
            iconLeft="trash"
            danger
            onPress={onDelete}
          />
        </Card>

        <View style={{ height: 10 }} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});
