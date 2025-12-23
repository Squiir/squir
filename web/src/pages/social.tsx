import { RequireAuth } from "@/components/auth/RequireAuth";

export default function SocialPage() {
  return (
    <RequireAuth>
      <div>Social</div>
    </RequireAuth>
  );
}
