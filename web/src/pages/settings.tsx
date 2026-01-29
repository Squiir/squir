import { RequireAuth } from "@/components/auth/RequireAuth";
import AccountTab from "@/components/settings/AccountTab";
import SecurityTab from "@/components/settings/SecurityTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, User } from "lucide-react";

export default function SettingsPage() {
  return (
    <RequireAuth>
      <div className="min-h-screen pb-20">
        <main className="container max-w-4xl mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-6">Paramètres</h1>

          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:w-[400px] mb-8">
              <TabsTrigger value="account" className="flex gap-2">
                <User size={16} /> Compte
              </TabsTrigger>
              <TabsTrigger value="security" className="flex gap-2">
                <Lock size={16} /> Sécurité
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <AccountTab />
            </TabsContent>

            <TabsContent value="security">
              <SecurityTab />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </RequireAuth>
  );
}
