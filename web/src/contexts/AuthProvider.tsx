import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { useAuthStore } from "@/store/auth.store";
import { AuthContext } from "@/contexts/auth-context";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const loadTokens = useAuthStore((state) => state.loadTokens);
  const accessToken = useAuthStore((state) => state.accessToken);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTokens().finally(() => setIsLoading(false));
  }, [loadTokens]);

  const value = {
    isLoading,
    isLoggedIn: !!accessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
