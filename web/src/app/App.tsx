import { useMe } from "@/hooks/user/use-me";
import AppLayout from "@/layouts/AppLayout";
import ProLayout from "@/layouts/ProLayout";
import ProDashboardPage from "@/pages/pro/dashboard";
import ProOffersPage from "@/pages/pro/offers";
import ProScannerPage from "@/pages/pro/scanner";
import { Navigate, useRoutes } from "react-router-dom";
import routes from "~react-pages";

export default function App() {
  const { data: user, isLoading } = useMe();

  const customerRoutes = useRoutes([
    {
      element: <AppLayout />,
      children: routes.filter((r) => !(r.path && ["/login", "/register"].includes(r.path))),
    },
    ...routes.filter((r) => r.path && ["/login", "/register"].includes(r.path)),
  ]);

  const proRoutes = useRoutes([
    {
      element: <ProLayout />,
      children: [
        { path: "dashboard", element: <ProDashboardPage /> },
        { path: "scanner", element: <ProScannerPage /> },
        { path: "offers", element: <ProOffersPage /> },
        { index: true, element: <Navigate to="/dashboard" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/dashboard" replace /> },
  ]);

  if (isLoading) return null;

  if (user?.role === "PROFESSIONAL") {
    return proRoutes;
  }

  return customerRoutes;
}
