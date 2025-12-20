import React from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useMe } from "@hooks/use-me";
import { Button } from "@components/ui/Button";
import { ProfileHeader } from "@components/profile/ProfileHeader";
import { useAuth } from "@store/auth";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";

import { useQrCodes } from "@hooks/use-qrcodes";
import { API_URL } from "@services/api";
import { getToken } from "@services/token";

export default function ProfileScreen() {
  const queryClient = useQueryClient();
  const { data: user } = useMe();
  const { logout } = useAuth();

  const {
    data: qrcodes,
    isLoading: qrsLoading,
    isError: qrsError,
    error: qrsErr,
  } = useQrCodes();

  const [token, setToken] = React.useState<string | null>(null);

  // ✅ modal state
  const [selectedQr, setSelectedQr] = React.useState<null | {
    id: string;
    label?: string;
    used?: boolean;
    barId?: string;
  }>(null);

  React.useEffect(() => {
    (async () => {
      const t = await getToken();
      setToken(t);
    })();
  }, []);

  async function handleLogout() {
    await logout();
    queryClient.clear();
  }

  if (!user) return null;

  const selectedQrUrl = selectedQr
    ? `${API_URL}/qrcodes/${selectedQr.id}.png`
    : null;

  return (
    <ScrollView className="flex-1 px-4 pt-6">
      <ProfileHeader
        username={user.username}
        avatarUrl={user.avatarUrl}
        status={user.status}
      />

      {/* ✅ Mes QR codes: horizontal */}
      <View className="mt-8">
        <Text className="text-white text-lg font-bold mb-3">Mes QR codes</Text>

        {qrsLoading ? (
          <View className="py-6 items-center">
            <ActivityIndicator />
          </View>
        ) : qrsError ? (
          <Text className="text-red-400">
            {qrsErr instanceof Error ? qrsErr.message : "Erreur de chargement"}
          </Text>
        ) : !qrcodes || qrcodes.length === 0 ? (
          <Text className="text-white/70">Aucun QR code pour l’instant.</Text>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row"
          >
            <View className="flex-row gap-4 pr-4">
              {qrcodes.map((qr) => {
                const url = `${API_URL}/qrcodes/${qr.id}.png`;

                return (
                  <Pressable
                    key={qr.id}
                    onPress={() =>
                      setSelectedQr({
                        id: qr.id,
                        label: qr.label,
                        used: qr.used,
                        barId: qr.barId,
                      })
                    }
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    style={{ width: 240 }}
                  >
                    <Text
                      className="text-white font-semibold"
                      numberOfLines={1}
                    >
                      {qr.label || "QR code"}
                    </Text>

                    <Text className="text-white/60 text-xs mt-1" numberOfLines={1}>
                      {qr.used ? "Utilisé" : "Disponible"}
                      {qr.barId ? ` • ${qr.barId}` : ""}
                    </Text>

                    <View className="items-center mt-4">
                      <Image
                        source={{
                          uri: url,
                          headers: token
                            ? { Authorization: `Bearer ${token}` }
                            : undefined,
                        }}
                        style={{ width: 180, height: 180, borderRadius: 18 }}
                        contentFit="contain"
                      />
                    </View>

                    <Text className="text-white/50 text-xs mt-3">
                      Appuie pour agrandir
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        )}
      </View>

      {/* ✅ Modal QR en grand */}
      <Modal
        visible={!!selectedQr}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedQr(null)}
      >
        <Pressable
          onPress={() => setSelectedQr(null)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.70)",
            alignItems: "center",
            justifyContent: "center",
            padding: 18,
          }}
        >
          <Pressable
            onPress={() => {}}
            style={{
              width: "100%",
              maxWidth: 380,
              borderRadius: 22,
              padding: 16,
              backgroundColor: "rgba(0,0,0,0.92)",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.12)",
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "900" }}>
              {selectedQr?.label || "QR code"}
            </Text>

            <Text style={{ color: "rgba(255,255,255,0.70)", marginTop: 6 }}>
              {selectedQr?.used ? "Utilisé" : "Disponible"}
              {selectedQr?.barId ? ` • ${selectedQr.barId}` : ""}
            </Text>

            <View style={{ alignItems: "center", marginTop: 14 }}>
              {selectedQrUrl ? (
                <Image
                  source={{
                    uri: selectedQrUrl,
                    headers: token
                      ? { Authorization: `Bearer ${token}` }
                      : undefined,
                  }}
                  style={{ width: 300, height: 300, borderRadius: 18 }}
                  contentFit="contain"
                />
              ) : (
                <ActivityIndicator />
              )}
            </View>

            <Pressable
              onPress={() => setSelectedQr(null)}
              style={{
                marginTop: 14,
                paddingVertical: 12,
                borderRadius: 14,
                backgroundColor: "rgba(255,255,255,0.10)",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "800" }}>Fermer</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Actions */}
      <View className="px-6 pt-16 pb-6">
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
