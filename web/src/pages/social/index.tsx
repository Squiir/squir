import { RequireAuth } from "@/components/auth/RequireAuth";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useConversations } from "@/hooks/social/use-conversations";
import { useSocialStore } from "@/store/social.store";
import { SocialSkeleton } from "@/components/ui/skeletons/SocialSkeleton";

export default function SocialIndexPage() {
  const { data, isLoading } = useConversations();
  const setActive = useSocialStore((s) => s.setActiveConversationId);

  useEffect(() => {
    if (!isLoading && data?.length) {
      setActive(data[0].id);
    }
  }, [isLoading, data, setActive]);

  if (isLoading) return <SocialSkeleton area="left" />;
  if (!data?.length) return <div className="p-6">Aucune conversation.</div>;

  return (
    <RequireAuth>
      <Navigate to={`/social/${data[0].id}`} replace />
    </RequireAuth>
  );
}
