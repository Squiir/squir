import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { useCreateQrcode } from "@hooks/qrcode/use-create-qrcode";
import { useGetMyQrcodes } from "@hooks/qrcode/use-get-qrcodes";
import { useGetBars } from "@hooks/bars/use-get-bars";
import { QrCode } from "@app-types/qrcode";
import { Bar } from "@app-types/bar";
import { QrCodeDto } from "@services/qrcode.service";
import { ModalOffer } from "./ModalOffer";
import { ModalQrPreview } from "./ModalQrPreview";
import { MapMarker } from "./MapMarker";

export type Coordinate = {
  latitude?: number;
  longitude?: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
};

export default function FranceMap({ latitude, longitude }: Coordinate) {
  const { mutate: createQrcode, isPending: isCreateQrcodePending } =
    useCreateQrcode();
  const { data: qrcodes, isPending: isGetMyQrcodesPending } = useGetMyQrcodes();
  const { data: bars, isPending: isGetBarsPending } = useGetBars();
  const [previewedQrcode, setPreviewedQrcode] = useState<QrCode>();

  const [offerOpen, setOfferOpen] = useState(false);
  const [selectedBar, setSelectedBar] = useState<Bar>();

  // modal preview QR (après génération)
  const [previewOpen, setPreviewOpen] = useState(false);

  const onCreateQrcode = (qrcodeDto: QrCodeDto) => {
    if (!selectedBar) return;
    setOfferOpen(false);
    createQrcode(qrcodeDto, {
      onSuccess: (data) => {
        setPreviewedQrcode(data);
      },
    });
  };

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

  return (
    <View className="flex-1">
      <MapView className="flex-1" initialRegion={initialRegion}>
        {!!latitude && !!longitude && (
          <Marker
            coordinate={{ latitude, longitude }}
            title="Moi"
            pinColor="#4D96FF"
          />
        )}

        {(bars ?? []).map((bar) => (
          <MapMarker
            key={bar.id}
            bar={bar}
            onSelect={(b) => {
              setSelectedBar(b);
              setOfferOpen(true);
            }}
          />
        ))}
      </MapView>

      {isGetBarsPending && (
        <View className="absolute inset-0 items-center justify-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      {/* ✅ Modal : Choix d'offre */}
      <ModalOffer
        offerOpen={offerOpen}
        setOfferOpen={setOfferOpen}
        selectedBar={selectedBar}
        qrcodes={qrcodes ?? null}
        onCreateQrcode={onCreateQrcode}
        isCreateQrcodePending={isCreateQrcodePending}
        isGetMyQrcodesPending={isGetMyQrcodesPending}
      />

      {/* ✅ Modal : Preview QR (après génération) */}
      <ModalQrPreview
        visible={previewOpen}
        onClose={() => setPreviewOpen(false)}
        qrcode={previewedQrcode}
      />
    </View>
  );
}


