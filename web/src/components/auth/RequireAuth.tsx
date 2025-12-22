import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth/use-auth";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) return null;
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
