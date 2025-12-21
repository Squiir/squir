import React from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  Text,
  View,
  ScrollView,
  Alert,
} from "react-native";
import { useMe } from "@hooks/use-me";
import { Button } from "@components/ui/Button";
import { ProfileHeader } from "@components/profile/ProfileHeader";
import { useAuth } from "@store/auth";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";

import { useQrCodes } from "@hooks/use-qrcodes";
import { useDeleteQrCode } from "@hooks/use-delete-qrcode";
import { API_URL } from "@services/api";
import { getToken } from "@services/token";

function parseLabel(label?: string) {
  if (!label)
    return { barName: undefined, offerName: undefined, priceText: undefined };

  const parts = label
    .split("•")
    .map((s) => s.trim())
    .filter(Boolean);

  const barName = parts[0];
  const offerName = parts[1];
  const pricePart = parts.find((p) => /€/.test(p));
  const priceText = pricePart;

  return { barName, offerName, priceText };
}

function Badge({
  text,
  variant,
}: {
  text: string;
  variant?: "ok" | "warn";
}) {
  const bg =
    variant === "warn" ? "rgba(255, 200, 0, 0.18)" : "rgba(90, 200, 120, 0.18)";
  const border =
    variant === "warn"
      ? "rgba(255, 200, 0, 0.35)"
      : "rgba(90, 200, 120, 0.35)";
  const color =
    variant === "warn"
      ? "rgba(255, 220, 120, 1)"
      : "rgba(170, 255, 200, 1)";

  return (
    <View
      style={{
        minWidth: 40,
        height: 24,
        paddingHorizontal: 10,
        borderRadius: 999,
        backgroundColor: bg,
        borderWidth: 1,
        borderColor: border,
        alignItems: "center", 
        justifyContent: "center", 
      }}
    >
      <Text style={{ color, fontSize: 11, fontWeight: "900", lineHeight: 12 }}>
        {text}
      </Text>
    </View>
  );
}

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

  const delQr = useDeleteQrCode();

  const [token, setToken] = React.useState<string | null>(null);

  const [selectedQr, setSelectedQr] = React.useState<null | {
    id: string;
    label?: string;
    used?: boolean;
    barId?: string;
    productId?: string;
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

  const selectedParsed = parseLabel(selectedQr?.label);

  return (
    <ScrollView className="flex-1 px-4 pt-6">
      <ProfileHeader
        username={user.username}
        avatarUrl={user.avatarUrl}
        status={user.status}
      />

      {/* Mes QR codes: horizontal, sans image en petit */}
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
                const { barName, offerName, priceText } = parseLabel(qr.label);

                return (
                  <Pressable
                    key={qr.id}
                    onPress={() =>
                      setSelectedQr({
                        id: qr.id,
                        label: qr.label,
                        used: qr.used,
                        barId: qr.barId,
                        productId: qr.productId,
                      })
                    }
                    style={{ width: 260 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    {/* Header row */}
                    <View className="flex-row items-start justify-between">
                      <View className="flex-1 pr-2">
                        <Text className="text-white font-extrabold" numberOfLines={1}>
                          {offerName || qr.label || "Offre"}
                        </Text>

                        <Text className="text-white/70 text-xs mt-1" numberOfLines={1}>
                          {barName ? `Chez ${barName}` : `Bar: ${qr.barId}`}
                        </Text>
                      </View>

                      <Badge text="QR" variant={qr.used ? "warn" : "ok"} />
                    </View>

                    {/* Infos */}
                    <View className="mt-3 gap-1">
                      <Text className="text-white/60 text-xs" numberOfLines={1}>
                        {priceText ? `Prix: ${priceText}` : "Prix: —"}
                      </Text>

                      <Text className="text-white/60 text-xs" numberOfLines={1}>
                        {qr.used ? "Statut: utilisé" : "Statut: disponible"}
                      </Text>

                      <Text className="text-white/50 text-[11px]" numberOfLines={1}>
                        Offre ID: {qr.productId}
                      </Text>
                    </View>

                    {/* CTA */}
                    <View className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 items-center justify-center">
                      <Text className="text-white/70 text-xs">
                        Appuie pour afficher le QR
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        )}
      </View>

      {/* Modal: QR en grand + bouton supprimer */}
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
              maxWidth: 400,
              borderRadius: 22,
              padding: 16,
              backgroundColor: "rgba(0,0,0,0.92)",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.12)",
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text style={{ color: "white", fontSize: 16, fontWeight: "900" }}>
                  {selectedParsed.offerName || selectedQr?.label || "QR code"}
                </Text>
                <Text style={{ color: "rgba(255,255,255,0.70)", marginTop: 6 }}>
                  {selectedParsed.barName ? `Chez ${selectedParsed.barName}` : ""}
                  {selectedParsed.priceText ? ` • ${selectedParsed.priceText}` : ""}
                </Text>
              </View>

              <Badge text="QR" variant={selectedQr?.used ? "warn" : "ok"} />
            </View>

            <Text style={{ color: "rgba(255,255,255,0.65)", marginTop: 10 }}>
              {selectedQr?.used ? "Statut : utilisé" : "Statut : disponible"}
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
              onPress={async () => {
                if (!selectedQr?.id) return;

                Alert.alert(
                  "Supprimer ce QR code ?",
                  "Cette action est irréversible.",
                  [
                    { text: "Annuler", style: "cancel" },
                    {
                      text: "Supprimer",
                      style: "destructive",
                      onPress: async () => {
                        try {
                          await delQr.mutateAsync(selectedQr.id);
                          setSelectedQr(null);
                        } catch (e: any) {
                          Alert.alert(
                            "Erreur",
                            e?.message ?? "Impossible de supprimer le QR code."
                          );
                        }
                      },
                    },
                  ]
                );
              }}
              disabled={delQr.isPending}
              style={{
                marginTop: 14,
                paddingVertical: 12,
                borderRadius: 14,
                backgroundColor: "rgba(255,80,80,0.16)",
                borderWidth: 1,
                borderColor: "rgba(255,80,80,0.30)",
                alignItems: "center",
                opacity: delQr.isPending ? 0.6 : 1,
              }}
            >
              <Text style={{ color: "rgba(255,180,180,1)", fontWeight: "900" }}>
                {delQr.isPending ? "Suppression..." : "Supprimer ce QR"}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setSelectedQr(null)}
              style={{
                marginTop: 12,
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
