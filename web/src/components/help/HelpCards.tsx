import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Mail, MessageCircle, ShieldCheck } from "lucide-react";

export function HelpCards() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="bg-violet-50 dark:bg-violet-900/10 border-violet-100 dark:border-violet-900/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-violet-700 dark:text-violet-400">
            <MessageCircle size={20} /> Besoin d'aide ?
          </CardTitle>
          <CardDescription>Notre équipe est disponible du Lundi au Samedi.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full bg-violet-600 hover:bg-violet-700 gap-2">
            <Mail size={16} /> Envoyer un email
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck size={20} /> Légal & Confidentialité
          </CardTitle>
          <CardDescription>Tout ce que vous devez savoir sur vos droits.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start gap-3"
            onClick={() => alert("Lien vers PDF CGU")}
          >
            <FileText size={16} className="text-gray-500" />
            Conditions Générales d'Utilisation (CGU)
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-3"
            onClick={() => alert("Lien vers Privacy")}
          >
            <FileText size={16} className="text-gray-500" />
            Politique de Confidentialité
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
