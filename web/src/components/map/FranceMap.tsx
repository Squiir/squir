import { ModalQrPreview } from "@/components/map/ModalQrPreview";
import { OfferCard } from "@/components/map/OfferCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { createBarIcon, FRANCE_BOUNDS, userIcon } from "@/constants/map";
import { useGetBars } from "@/hooks/bars/use-get-bars";
import { useCreateQrCode } from "@/hooks/qrcode/use-create-qr-code";
import { useGetMyQrCodes } from "@/hooks/qrcode/use-get-qr-codes";
import type { QrCodeDto } from "@/services/qrcode.service";
import type { Bar } from "@/types/bar";
import type { QrCode } from "@/types/qrcode";
import "leaflet/dist/leaflet.css";
import { LocateFixed, Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";

export type Coordinate = {
  latitude?: number;
  longitude?: number;
};

function MapController({ latitude, longitude }: Coordinate) {
  const map = useMap();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (latitude && longitude && !initializedRef.current) {
      map.flyTo([latitude, longitude], 13, { duration: 1 });
      initializedRef.current = true;
    }
  }, [latitude, longitude, map]);

  if (!latitude || !longitude) return null;

  return (
    <div className="absolute -translate-x-1/2 bottom-24 left-1/2 z-1000">
      <Button
        variant="secondary"
        className="h-auto gap-2 px-4 py-2 bg-white border rounded-full shadow-lg border-slate-200 hover:bg-slate-50"
        onClick={() => map.flyTo([latitude, longitude], 13, { duration: 1 })}
      >
        <LocateFixed className="w-4 h-4 text-blue-500" />
        <span className="text-sm font-medium text-slate-700">Ma position</span>
      </Button>
    </div>
  );
}

function ZoomControlWithSlider() {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());

  useMapEvents({
    zoomend: () => {
      setZoom(map.getZoom());
    },
  });

  const handleZoomChange = (value: number[]) => {
    const newZoom = value[0];
    setZoom(newZoom);
    map.setZoom(newZoom);
  };

  const zoomIn = () => {
    map.zoomIn();
  };

  const zoomOut = () => {
    map.zoomOut();
  };

  return (
    <div className="absolute flex flex-row items-center gap-4 p-3 -translate-x-1/2 border rounded-full shadow-xl bottom-8 left-1/2 z-1000 bg-white/90 backdrop-blur-sm border-slate-200">
      <Button
        variant="ghost"
        size="icon"
        className="w-8 h-8 rounded-full hover:bg-slate-100"
        onClick={zoomOut}
      >
        <Minus className="w-5 h-5 text-slate-700" />
      </Button>

      <div className="flex items-center justify-center w-48 px-2">
        <Slider
          min={5}
          max={18}
          step={0.5}
          value={[zoom]}
          onValueChange={handleZoomChange}
          className="w-full cursor-pointer"
        />
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="w-8 h-8 rounded-full hover:bg-slate-100"
        onClick={zoomIn}
      >
        <Plus className="w-5 h-5 text-slate-700" />
      </Button>
    </div>
  );
}

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

  const defaultCenter: [number, number] = [48.8566, 2.3522];
  const defaultZoom = 13;

  return (
    <div className="relative z-0 w-full h-full bg-slate-100">
      {isGetBarsPending && (
        <div className="absolute inset-0 flex items-center justify-center z-1000 bg-white/50 backdrop-blur-sm">
          <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      )}

      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
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
            icon={createBarIcon(bar.color || "#ef4444")}
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
