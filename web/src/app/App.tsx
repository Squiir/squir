import { useCustomerRoutes } from "@/hooks/use-customer-routes";
import { useProfessionalRoutes } from "@/hooks/use-professional-routes";
import { useMe } from "@/hooks/user/use-me";

export default function App() {
  const { data: user, isLoading } = useMe();
  const customerRoutes = useCustomerRoutes();
  const proRoutes = useProfessionalRoutes();

  if (isLoading) return null;

  if (user?.role === "PROFESSIONAL") {
    return proRoutes;
  }

  return customerRoutes;
}
