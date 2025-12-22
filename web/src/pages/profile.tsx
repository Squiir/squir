import { RequireAuth } from "@/components/auth/RequireAuth";

export default function ProfilePage() {
  return (
    <RequireAuth>
      <div>Profile</div>
    </RequireAuth>
  );
}
