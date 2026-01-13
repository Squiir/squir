import { MapController } from "@/components/map/MapController";
import { ModalQrPreview } from "@/components/map/ModalQrPreview";
import { OfferCard } from "@/components/map/OfferCard";
import { ZoomControlWithSlider } from "@/components/map/ZoomControlWithSlider";
import { PaymentModal } from "@/components/payment/PaymentModal";
import {
  DEFAULT_PARIS_CENTER,
  DEFAULT_ZOOM,
  FRANCE_BOUNDS,
  createBarIcon,
  userIcon,
} from "@/constants/map";
import { useGetBars } from "@/hooks/bars/use-get-bars";
import { useCreateQrCode } from "@/hooks/qrcode/use-create-qr-code";
import { useGetMyQrCodes } from "@/hooks/qrcode/use-get-qr-codes";
import type { QrCodeDto } from "@/services/qrcode.service";
import type { Bar } from "@/types/bar";
import type { Coordinate } from "@/types/map";
import type { Offer } from "@/types/offer";
import type { QrCode } from "@/types/qrcode";
import { useQueryClient } from "@tanstack/react-query";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

export default function FranceMap({ latitude, longitude }: Coordinate) {
  const { mutate: createQrCode, isPending: isCreateQrCodePending } = useCreateQrCode();
  const { data: qrcodes, isPending: isGetMyQrCodesPending } = useGetMyQrCodes();
  const { data: bars, isPending: isGetBarsPending } = useGetBars();
  const queryClient = useQueryClient();

  const [previewedQrCode, setPreviewedQrCode] = useState<QrCode>();
  const [offerOpen, setOfferOpen] = useState(false);
  const [selectedBar, setSelectedBar] = useState<Bar | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

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

  return (
    <div className="relative z-0 w-full h-full bg-slate-100">
      {isGetBarsPending && (
        <div className="absolute inset-0 flex items-center justify-center z-1000 bg-white/50 backdrop-blur-sm">
          <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      )}

      <MapContainer
        center={DEFAULT_PARIS_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        dragging={true}
        className="outline-none"
        minZoom={7}
        maxZoom={18}
        maxBounds={FRANCE_BOUNDS}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={20}
        />

        <MapController latitude={latitude} longitude={longitude} />
        <ZoomControlWithSlider />

        {latitude && longitude && (
          <Marker position={[latitude, longitude]} icon={userIcon} interactive={false} />
        )}

        {(bars ?? []).map((bar) => (
          <Marker
            key={bar.id}
            position={[bar.latitude, bar.longitude]}
            icon={createBarIcon("Bar")}
            eventHandlers={{
              click: () => {
                setSelectedBar(bar);
                setOfferOpen(true);
              },
            }}
          />
        ))}
      </MapContainer>

      <OfferCard
        offerOpen={offerOpen}
        setOfferOpen={setOfferOpen}
        selectedBar={selectedBar}
        qrcodes={qrcodes ?? null}
        onSelectOffer={(offer) => {
          if (offer.price > 0) {
            setSelectedOffer(offer);
            setPaymentOpen(true);
            setOfferOpen(false);
          } else {
            if (!selectedBar) return;
            onCreateQrCode({
              offerId: offer.id,
              label: `${selectedBar.name} • ${offer.name}`,
            });
            queryClient.invalidateQueries({ queryKey: ["qrcodes"] });
          }
        }}
        isCreateQrCodePending={isCreateQrCodePending}
        isGetMyQrCodesPending={isGetMyQrCodesPending}
      />

      {selectedBar && selectedOffer && (
        <PaymentModal
          open={paymentOpen}
          onClose={() => setPaymentOpen(false)}
          barId={selectedBar.id}
          offerId={selectedOffer.id}
          amount={selectedOffer.price}
          onSuccess={() => {
            setPaymentOpen(false);
            onCreateQrCode({
              offerId: selectedOffer.id,
              label: `${selectedBar.name} • ${selectedOffer.name}`,
            });
            queryClient.invalidateQueries({ queryKey: ["qrcodes"] });
          }}
        />
      )}

      <ModalQrPreview
        visible={previewOpen}
        onClose={() => setPreviewOpen(false)}
        qrcode={previewedQrCode}
      />
    </div>
  );
}
