import ProfessionalLayout from "@/layouts/ProfessionalLayout";
import ProfessionalDashboardPage from "@/pages/professional/dashboard";
import ProfessionalOfferPage from "@/pages/professional/offer";
import ProfessionalScannerPage from "@/pages/professional/scanner";
import { Navigate, useRoutes } from "react-router-dom";
import routes from "~react-pages";

const isAuthRoute = (path?: string) => {
  if (!path) return false;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return ["/login", "/register", "/register/professional"].includes(normalizedPath);
};

export function useProfessionalRoutes() {
  const catchAllRoute = routes.find(
    (r) => r.path === "*" || r.path === "all" || r.path?.includes("*"),
  );

  const otherRoutes = routes.filter((r) => r !== catchAllRoute && !isAuthRoute(r.path));
  const authRoutes = routes.filter((r) => isAuthRoute(r.path));

  return useRoutes([
    {
      element: <ProfessionalLayout />,
      children: [
        { path: "dashboard", element: <ProfessionalDashboardPage /> },
        { path: "scanner", element: <ProfessionalScannerPage /> },
        { path: "offers", element: <ProfessionalOfferPage /> },
        ...otherRoutes,
        catchAllRoute || { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
    ...authRoutes,
  ]);
}
