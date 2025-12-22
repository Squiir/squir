import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth/use-auth";

export default function PrivateLayout() {
  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) return null;
  if (isLoggedIn) return <Navigate to="/" replace />;

  return <Outlet />;
}
