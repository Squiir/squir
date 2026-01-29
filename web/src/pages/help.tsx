import { RequireAuth } from "@/components/auth/RequireAuth";
import { FaqItem } from "@/components/help/FaqItem";
import { HelpCards } from "@/components/help/HelpCards";
import { Input } from "@/components/ui/input";
import { faqData } from "@/data/help";
import { HelpCircle, Search } from "lucide-react";
import { useState } from "react";

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaq = faqData
    .map((cat) => ({
      ...cat,
      questions: cat.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.a.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((cat) => cat.questions.length > 0);

  return (
    <RequireAuth>
      <div className="min-h-screen pb-20">
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

          <HelpCards />
        </main>
      </div>
    </RequireAuth>
  );
}
