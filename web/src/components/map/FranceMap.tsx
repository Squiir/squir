import { useGetBars } from "@/hooks/bars/use-get-bars";
import { useCreateQrCode } from "@/hooks/qrcode/use-create-qr-code";
import { useGetMyQrCodes } from "@/hooks/qrcode/use-get-qr-codes";
import type { QrCodeDto } from "@/services/qrcode.service";
import type { Bar } from "@/types/bar";
import type { QrCode } from "@/types/qrcode";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { ModalQrPreview } from "./ModalQrPreview";
import { OfferCard } from "./OfferCard";

export type Coordinate = {
  latitude?: number;
  longitude?: number;
};

// Fix for default marker icon in React Leaflet by using CDN icons

// Blue icon for user
const userIcon = new Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/markers/blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Red icon for bars (or default which is blueish, maybe use red for bars to differentiate?)
// Frontend uses colors for bars. The Bar interface has `color`.
// I can generate dynamic icons or just use a standard one for now.
const barIcon = new Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/markers/red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function FranceMap({ latitude, longitude }: Coordinate) {
  const { mutate: createQrCode, isPending: isCreateQrCodePending } = useCreateQrCode();
  const { data: qrcodes, isPending: isGetMyQrCodesPending } = useGetMyQrCodes();
  const { data: bars, isPending: isGetBarsPending } = useGetBars();

  const [previewedQrCode, setPreviewedQrCode] = useState<QrCode>();
  const [offerOpen, setOfferOpen] = useState(false);
  const [selectedBar, setSelectedBar] = useState<Bar | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const onCreateQrCode = (qrCodeDto: QrCodeDto) => {
    if (!selectedBar) return;
    setOfferOpen(false);
    createQrCode(qrCodeDto, {
      onSuccess: (data) => {
        setPreviewedQrCode(data);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  useEffect(() => {
    if (previewedQrCode) {
      setPreviewOpen(true);
    }
  }, [previewedQrCode]);

  const center: [number, number] = [latitude ?? 48.8566, longitude ?? 2.3522];

  return (
    <div className="h-full w-full relative z-0">
      {isGetBarsPending && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-black/20">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {latitude && longitude && (
          <Marker position={[latitude, longitude]} icon={userIcon}>
            <Popup>Vous êtes ici</Popup>
          </Marker>
        )}

        {(bars ?? []).map((bar) => (
          <Marker
            key={bar.id}
            position={[bar.latitude, bar.longitude]}
            icon={barIcon}
            eventHandlers={{
              click: () => {
                setSelectedBar(bar);
                setOfferOpen(true);
              },
            }}
          >
            <Popup>{bar.name}</Popup>
          </Marker>
        ))}
      </MapContainer>

      <OfferCard
        offerOpen={offerOpen}
        setOfferOpen={setOfferOpen}
        selectedBar={selectedBar}
        qrcodes={qrcodes ?? null}
        onCreateQrCode={onCreateQrCode}
        isCreateQrCodePending={isCreateQrCodePending}
        isGetMyQrCodesPending={isGetMyQrCodesPending}
      />

      <ModalQrPreview
        visible={previewOpen}
        onClose={() => setPreviewOpen(false)}
        qrcode={previewedQrCode}
      />
    </div>
  );
}
