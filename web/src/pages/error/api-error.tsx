import { ErrorLayout } from "@/components/error/ErrorLayout";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ApiErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <ErrorLayout
        icon={<AlertTriangle className="w-16 h-16 text-yellow-500/80" />}
        title="Impossible de charger cette page"
        description="Une erreur s'est produite lors de la communication avec nos serveurs. Veuillez réessayer."
      >
        <Button onClick={() => window.location.reload()} className="min-w-[140px] shadow-lg">
          <RefreshCw className="w-4 h-4 mr-2" />
          Réessayer
        </Button>
        <Button variant="secondary" onClick={() => navigate(-1)} className="min-w-[140px]">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
      </ErrorLayout>
    </div>
  );
}
