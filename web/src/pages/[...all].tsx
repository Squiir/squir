import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-center">
      <h1 className="font-bold text-7xl">404</h1>

      <p className="text-lg text-muted-foreground">
        Oups, cette page n’existe pas.
      </p>

      <div className="flex gap-10">
        <Button asChild>
          <Link to="/">Retour à l’accueil</Link>
        </Button>

        <Button variant="outline" asChild>
          <Link to="/login">Se connecter</Link>
        </Button>
      </div>
    </div>
  );
}
