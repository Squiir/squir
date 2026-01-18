import AppLayout from "@/layouts/AppLayout";
import { useRoutes } from "react-router-dom";
import routes from "~react-pages";

export default function App() {
  return useRoutes([
    {
      element: <AppLayout />,
      children: routes.filter((r) => !(r.path && ["/login", "/register"].includes(r.path))),
    },
    ...routes.filter((r) => r.path && ["/login", "/register"].includes(r.path)),
  ]);
}
