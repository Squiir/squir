import { useRoutes } from "react-router-dom";
import routes from "~react-pages";
import AppLayout from "@/layouts/AppLayout";

export default function App() {
  return useRoutes([
    {
      element: <AppLayout />,
      children: routes.filter((r) => !["/login", "/register"].includes(r.path)),
    },
    ...routes.filter((r) => ["/login", "/register"].includes(r.path)),
  ]);
}
