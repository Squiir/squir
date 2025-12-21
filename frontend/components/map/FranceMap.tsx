import React, { use, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { Image } from "expo-image";

import { PARIS_BARS } from "@constants/bars-paris";
import { useCreateQrcode } from "@hooks/qrcode/use-create-qrcode";
import { useGetMyQrcodes } from "@hooks/qrcode/use-get-qrcodes";
import { Qrcode } from "@app-types/qrcode";
import { QrcodeDto } from "@services/qrcode.service";
import { API_URL } from "@constants/api";

type Offer = { id: string; name: string; price?: number };
type Bar = (typeof PARIS_BARS)[number] & { offers: Offer[] };

export type Coordinate = {
  latitude?: number;
  longitude?: number;
};

export default function FranceMap({ latitude, longitude }: Coordinate) {
  const { mutate: createQrcode, isPending: isCreateQrcodePending } =
    useCreateQrcode();
  const { data: qrcodes, isPending: isGetMyQrcodesPending } = useGetMyQrcodes();
  const [previewedQrcode, setPreviewedQrcode] = useState<Qrcode>();

  const onCreateQrcode = (qrcodeDto: QrcodeDto) => {
    if (!selectedBar) return;
    setOfferOpen(false);
    createQrcode(qrcodeDto, {
      onSuccess: (data) => {
        setPreviewedQrcode(data);
      },
    });
  };

  // modal offres
  const [offerOpen, setOfferOpen] = useState(false);
  const [selectedBar, setSelectedBar] = useState<Bar>();

  // modal preview QR (après génération)
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (previewedQrcode) {
      setPreviewOpen(true);
    }
  }, [previewedQrcode]);

  const initialRegion = useMemo(
    () => ({
      latitude: latitude ?? 48.8566,
      longitude: longitude ?? 2.3522,
      latitudeDelta: 0.12,
      longitudeDelta: 0.12,
    }),
    [latitude, longitude]
  );

  function formatPrice(price?: number) {
    if (typeof price !== "number") return null;
    return `${price.toFixed(2)} €`;
  }

  return (
    <View className="flex-1">
      <MapView style={{ flex: 1 }} initialRegion={initialRegion}>
        {!!latitude && !!longitude && (
          <Marker
            coordinate={{ latitude, longitude }}
            title="Moi"
            pinColor="#4D96FF"
          />
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
                setSelectedBar(bar as Bar);
                setOfferOpen(true);
              }}
            >
              <View className="rounded-2xl border border-white/15 bg-black/95 px-3 py-2 min-w-[170px]">
                <Text className="text-white font-extrabold text-[14px]">
                  {bar.name}
                </Text>
                <Text className="text-white/75 mt-1 text-[12px]">
                  Paris {bar.arrondissement}e
                </Text>
                <Text className="text-white/60 mt-2 text-[11px]">
                  Appuie pour voir les offres
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* ✅ Modal : Choix d’offre */}
      <Modal
        visible={offerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setOfferOpen(false)}
      >
        <Pressable
          onPress={() => setOfferOpen(false)}
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
              {selectedBar?.name ?? "Offres"}
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.70)", marginTop: 6 }}>
              Choisis une offre pour générer le QR code
            </Text>

            <View style={{ marginTop: 14, gap: 10 }}>
              {(selectedBar?.offers ?? []).map((offer) => {
                const alreadyHas = qrcodes?.some((qr) => {
                  return (
                    qr.barId === selectedBar!.id && qr.productId === offer.id
                  );
                });

                return (
                  <Pressable
                    key={offer.id}
                    onPress={() =>
                      onCreateQrcode({
                        barId: selectedBar!.id,
                        productId: offer.id,
                        label: `${selectedBar?.name} • ${offer.name}${
                          typeof offer.price === "number"
                            ? ` • ${formatPrice(offer.price)}`
                            : ""
                        }`,
                      })
                    }
                    disabled={isCreateQrcodePending}
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 12,
                      borderRadius: 14,
                      backgroundColor: alreadyHas
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(255,255,255,0.10)",
                      borderWidth: 1,
                      borderColor: alreadyHas
                        ? "rgba(255,255,255,0.14)"
                        : "rgba(255,255,255,0.18)",
                      opacity: isCreateQrcodePending ? 0.65 : 1,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "800" }}>
                        {offer.name}
                      </Text>
                      {alreadyHas && (
                        <Text
                          style={{
                            color: "rgba(255,255,255,0.65)",
                            fontWeight: "800",
                          }}
                        >
                          Déjà en stock
                        </Text>
                      )}
                    </View>

                    {typeof offer.price === "number" && (
                      <Text
                        style={{
                          color: "rgba(255,255,255,0.70)",
                          marginTop: 4,
                        }}
                      >
                        {formatPrice(offer.price)}
                      </Text>
                    )}
                  </Pressable>
                );
              })}

              {(!selectedBar?.offers || selectedBar.offers.length === 0) && (
                <Text style={{ color: "rgba(255,255,255,0.70)" }}>
                  Aucune offre disponible.
                </Text>
              )}
            </View>

            <View
              style={{
                marginTop: 14,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {isCreateQrcodePending || isGetMyQrcodesPending ? (
                <>
                  <ActivityIndicator />
                  <Text
                    style={{ color: "rgba(255,255,255,0.75)", marginLeft: 8 }}
                  >
                    {isCreateQrcodePending
                      ? "Génération…"
                      : "Chargement du stock…"}
                  </Text>
                </>
              ) : null}
            </View>

            <Pressable
              onPress={() => setOfferOpen(false)}
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

      {/* ✅ Modal : Preview QR (après génération) */}
      <Modal
        visible={previewOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setPreviewOpen(false)}
      >
        <Pressable
          onPress={() => setPreviewOpen(false)}
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
              QR code généré
            </Text>

            <Text style={{ color: "rgba(255,255,255,0.7)", marginTop: 6 }}>
              {previewedQrcode?.label ?? "Sans label"}
            </Text>

            <View style={{ alignItems: "center", marginTop: 14 }}>
              {previewedQrcode ? (
                <Image
                  source={{
                    uri: `${API_URL}${previewedQrcode.url}`,
                  }}
                  style={{ width: 300, height: 300, borderRadius: 18 }}
                  contentFit="contain"
                />
              ) : (
                <ActivityIndicator />
              )}
            </View>

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
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
