import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth/use-auth";
import { useMe } from "@/hooks/user/use-me";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  const { isLoggedIn } = useAuth();
  const { data: user } = useMe();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-center">
      <h1 className="font-bold text-7xl">404</h1>

      <p className="text-lg text-muted-foreground">Oups, cette page n’existe pas.</p>

      <div className="flex gap-10">
        {isLoggedIn && user?.role === "PROFESSIONAL" && (
          <Button asChild>
            <Link to="/dashboard">Retour à l’accueil</Link>
          </Button>
        )}
        {isLoggedIn && user?.role === "CUSTOMER" && (
          <Button asChild>
            <Link to="/home">Retour à l’accueil</Link>
          </Button>
        )}
        {!isLoggedIn && (
          <Button asChild>
            <Link to="/">Retour à l’accueil</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
