import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    ChevronDown,
    ChevronUp,
    FileText,
    HelpCircle,
    Mail,
    MessageCircle,
    Search,
    ShieldCheck
} from 'lucide-react';
import { useState } from 'react';

const faqData = [
  {
    category: "Utilisateurs",
    questions: [
      {
        q: "Comment fonctionne le QR Code ?",
        a: "Une fois votre commande payée, vous recevez un QR code unique dans votre Wallet. Présentez-le simplement au barman qui le scannera pour vous servir."
      },
      {
        q: "Puis-je annuler une commande ?",
        a: "Les commandes non consommées peuvent être annulées tant que l'événement n'est pas terminé, moyennant des frais de gestion. Contactez le support pour plus de détails."
      },
      {
        q: "Est-ce sécurisé ?",
        a: "Oui, tous les paiements sont traités par Stripe, leader mondial du paiement en ligne. Nous ne stockons jamais vos données bancaires."
      }
    ]
  },
  {
    category: "Professionnels",
    questions: [
      {
        q: "Comment devenir partenaire ?",
        a: "Créez un compte Pro depuis l'application. Vous devrez fournir un Kbis et connecter un compte Stripe pour recevoir vos virements."
      },
      {
        q: "Quand suis-je payé ?",
        a: "Les fonds sont transférés sur votre compte Stripe connecté immédiatement après chaque transaction, puis versés sur votre compte bancaire selon votre calendrier (généralement quotidien ou hebdomadaire)."
      }
    ]
  }
];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaq = faqData.map(cat => ({
    ...cat,
    questions: cat.questions.filter(
      q => q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <RequireAuth>
    <div className="min-h-screen pb-20">
      <DashboardHeader />

      <main className="container max-w-4xl mx-auto py-10 px-4 space-y-12">

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Comment pouvons-nous vous aider ?
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trouvez des réponses, contactez notre équipe ou consultez nos documents légaux.
          </p>

          <div className="max-w-md mx-auto relative mt-6">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher une réponse..."
              className="pl-10 h-12 text-base rounded-full shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-8">
          {filteredFaq.length > 0 ? (
            filteredFaq.map((category, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <HelpCircle className="text-violet-600" size={24} />
                  {category.category}
                </h2>
                <div className="grid gap-3">
                  {category.questions.map((item, qIdx) => (
                    <FaqItem key={qIdx} question={item.q} answer={item.a} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              Aucun résultat trouvé pour "{searchTerm}"
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-violet-50 dark:bg-violet-900/10 border-violet-100 dark:border-violet-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-violet-700 dark:text-violet-400">
                <MessageCircle size={20} /> Besoin d'aide ?
              </CardTitle>
              <CardDescription>
                Notre équipe est disponible du Lundi au Samedi.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-violet-600 hover:bg-violet-700 gap-2">
                <Mail size={16} /> Envoyer un email
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Réponse moyenne : &lt; 24h
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck size={20} /> Légal & Confidentialité
              </CardTitle>
              <CardDescription>
                Tout ce que vous devez savoir sur vos droits.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-3" onClick={() => alert("Lien vers PDF CGU")}>
                <FileText size={16} className="text-gray-500" />
                Conditions Générales d'Utilisation (CGU)
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3" onClick={() => alert("Lien vers Privacy")}>
                <FileText size={16} className="text-gray-500" />
                Politique de Confidentialité
              </Button>
            </CardContent>
          </Card>

        </div>

      </main>
    </div>
    </RequireAuth>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border rounded-xl bg-card transition-all hover:border-violet-200 dark:hover:border-violet-800 cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center justify-between p-4">
        <h3 className="font-medium text-sm md:text-base">{question}</h3>
        {isOpen ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
      </div>
      {isOpen && (
        <div className="px-4 pb-4 text-sm text-muted-foreground animate-in slide-in-from-top-2 fade-in duration-200">
          {answer}
        </div>
      )}
    </div>
  );
}
