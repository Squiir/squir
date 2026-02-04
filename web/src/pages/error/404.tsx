import { ErrorLayout } from "@/components/error/ErrorLayout";
import { Button } from "@/components/ui/button";
import { Home, SearchX } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NotFoundPageProps {
  type?: "offer" | "bar" | "resource";
}

export default function NotFoundPage({ type = "resource" }: NotFoundPageProps) {
  const navigate = useNavigate();

  const title =
    type === "offer"
      ? "Cette offre n'existe plus"
      : type === "bar"
        ? "Ce bar n'existe plus"
        : "Contenu introuvable";

  const description =
    type === "offer"
      ? "L'offre que vous recherchez a été retirée ou n'est plus disponible."
      : type === "bar"
        ? "Le bar que vous recherchez n'est plus disponible sur Squir."
        : "La page que vous recherchez n'existe pas ou a été déplacée.";

  return (
    <div className="max-h-screen bg-background pb-12">
      <ErrorLayout
        icon={<SearchX className="w-16 h-16 text-muted-foreground/50" />}
        title={title}
        description={description}
        className="min-h-[40vh]"
      >
        <Button onClick={() => navigate("/home")} size="lg" className="shadow-lg rounded-full text-lg">
          <Home className="w-4 h-4 mr-2" />
          Retour à l'accueil
        </Button>
      </ErrorLayout>
    </div>
  );
}
