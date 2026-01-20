import ProfessionalLayout from "@/layouts/ProfessionalLayout";
import ProfessionalDashboardPage from "@/pages/professional/dashboard";
import ProfessionalOfferPage from "@/pages/professional/offer";
import ProfessionalScannerPage from "@/pages/professional/scanner";
import { Navigate, useRoutes } from "react-router-dom";
import routes from "~react-pages";

export function useProfessionalRoutes() {
  const commonRoutes = routes.filter((r) => r.path && ["/login", "/register"].includes(r.path));
  const catchAllRoute = routes.find((r) => r.path === "*");

  return useRoutes([
    {
      element: <ProfessionalLayout />,
      children: [
        { path: "dashboard", element: <ProfessionalDashboardPage /> },
        { path: "scanner", element: <ProfessionalScannerPage /> },
        { path: "offers", element: <ProfessionalOfferPage /> },
        { index: true, element: <Navigate to="/dashboard" replace /> },
      ],
    },
    ...commonRoutes,
    catchAllRoute || { path: "*", element: <Navigate to="/dashboard" replace /> },
  ]);
}
