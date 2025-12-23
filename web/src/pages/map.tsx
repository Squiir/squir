import { RequireAuth } from "@/components/auth/RequireAuth";

export default function MapPage() {
  return (
    <RequireAuth>
      <div>Map</div>
    </RequireAuth>
  );
}
