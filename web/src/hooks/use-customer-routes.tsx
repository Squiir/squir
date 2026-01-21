import AppLayout from "@/layouts/AppLayout";
import { Navigate, useRoutes } from "react-router-dom";
import routes from "~react-pages";

const isAuthRoute = (path?: string) => {
  if (!path) return false;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return ["/login", "/register"].includes(normalizedPath);
};

export function useCustomerRoutes() {
  const catchAllRoute = routes.find(
    (r) => r.path === "*" || r.path === "all" || r.path?.includes("*"),
  );

  const otherRoutes = routes.filter((r) => r !== catchAllRoute && !isAuthRoute(r.path));
  const authRoutes = routes.filter((r) => isAuthRoute(r.path));

  return useRoutes([
    {
      element: <AppLayout />,
      children: [
        ...otherRoutes,
        catchAllRoute || { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
    ...authRoutes,
  ]);
}
