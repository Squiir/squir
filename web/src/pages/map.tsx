import { RequireAuth } from "@/components/auth/RequireAuth";
import FranceMap from "@/components/map/FranceMap";
import { useEffect, useState } from "react";

export default function MapPage() {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  return (
    <RequireAuth>
      <div className="h-[calc(100vh-64px)] w-full">
        <FranceMap latitude={coords?.latitude} longitude={coords?.longitude} />
      </div>
    </RequireAuth>
  );
}
