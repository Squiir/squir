import React, { useMemo, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Modal, Pressable } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { Image } from "expo-image";

import { PARIS_BARS } from "@constants/bars-paris";
import type { Coordinate } from "@components/map/Coordinate";
import { useGenerateQrCode } from "@hooks/use-generate-qrcode";
import { API_URL } from "@services/api";
import { getToken } from "@services/token";

type Props = Coordinate;

export default function FranceMap({ latitude, longitude }: Props) {
  const genQr = useGenerateQrCode();

  const [token, setToken] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  // On charge le token pour pouvoir afficher une image protégée (GET /qrcodes/:id.png)
  useEffect(() => {
    (async () => {
      const t = await getToken();
      setToken(t);
    })();
  }, []);

  const initialRegion = useMemo(
    () => ({
      latitude: latitude ?? 48.8566,
      longitude: longitude ?? 2.3522,
      latitudeDelta: 0.12,
      longitudeDelta: 0.12,
    }),
    [latitude, longitude]
  );

  // Quand le QR est généré, on ouvre une preview avec l'image
  useEffect(() => {
    if (genQr.isSuccess && genQr.data) {
      setPreviewOpen(true);
    }
  }, [genQr.isSuccess, genQr.data]);

  const qr = genQr.data;
  const qrPngUrl = qr ? `${API_URL}/qrcodes/${qr.id}.png` : null;

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} initialRegion={initialRegion}>
        {!!latitude && !!longitude && (
          <Marker coordinate={{ latitude, longitude }} title="Moi" pinColor="#4D96FF" />
        )}

        {PARIS_BARS.map((bar) => (
          <Marker
            key={bar.id}
            coordinate={{ latitude: bar.latitude, longitude: bar.longitude }}
            pinColor={bar.color}
          >
            <Callout
              tooltip
              onPress={() => {
                genQr.mutate({
                  barId: bar.id,
                  productId: "product-default",
                  label: `QR ${bar.name}`,
                });
              }}
            >
              <View
                style={{
                  minWidth: 180,
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  borderRadius: 18,
                  backgroundColor: "rgba(0,0,0,0.95)",
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.12)",
                }}
              >
                <Text style={{ color: "white", fontWeight: "800", fontSize: 14 }}>
                  {bar.name}
                </Text>

                <Text style={{ color: "rgba(255,255,255,0.75)", marginTop: 4, fontSize: 12 }}>
                  Paris {bar.arrondissement}e
                </Text>

                <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center" }}>
                  {genQr.isPending ? (
                    <>
                      <ActivityIndicator />
                      <Text style={{ color: "rgba(255,255,255,0.75)", marginLeft: 8, fontSize: 12 }}>
                        Génération…
                      </Text>
                    </>
                  ) : (
                    <Text style={{ color: "rgba(255,255,255,0.65)", fontSize: 12 }}>
                      Appuie pour générer un QR
                    </Text>
                  )}
                </View>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Preview QR */}
      <Modal visible={previewOpen} transparent animationType="fade" onRequestClose={() => setPreviewOpen(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.65)",
            alignItems: "center",
            justifyContent: "center",
            padding: 18,
          }}
        >
          <View
            style={{
              width: "100%",
              maxWidth: 360,
              borderRadius: 20,
              padding: 16,
              backgroundColor: "rgba(0,0,0,0.92)",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.12)",
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "900" }}>
              QR code généré
            </Text>

            <Text style={{ color: "rgba(255,255,255,0.7)", marginTop: 6 }}>
              {qr?.label ?? "Sans label"}
            </Text>

            <View style={{ alignItems: "center", marginTop: 14 }}>
              {qrPngUrl ? (
                <Image
                  source={{
                    uri: qrPngUrl,
                    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                  }}
                  style={{ width: 220, height: 220, borderRadius: 16 }}
                  contentFit="contain"
                />
              ) : (
                <ActivityIndicator />
              )}
            </View>

            {!!genQr.isError && (
              <Text style={{ color: "#ffb4b4", marginTop: 10 }}>
                {genQr.error instanceof Error ? genQr.error.message : "Erreur"}
              </Text>
            )}

            <Pressable
              onPress={() => setPreviewOpen(false)}
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
          </View>
        </View>
      </Modal>
    </View>
  );
}
