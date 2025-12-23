import { RequireAuth } from "@/components/auth/RequireAuth";

export default function HomePage() {
  return (
    <RequireAuth>
      <div>Home</div>
    </RequireAuth>
  );
}
