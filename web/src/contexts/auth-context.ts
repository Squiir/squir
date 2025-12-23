import { createContext } from "react";

export const AuthContext = createContext<{
  isLoading: boolean;
  isLoggedIn: boolean;
}>({
  isLoading: true,
  isLoggedIn: false,
});
