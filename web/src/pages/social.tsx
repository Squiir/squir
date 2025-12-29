import { RequireAuth } from "@/components/auth/RequireAuth";
import { SocialPanel } from "@/components/layout/SocialPanel";

export default function SocialPage() {
  return (
    <RequireAuth>
      <div className="flex h-[calc(90vh)] w-full">
        <aside className="border-r grow-3 bg-background">
          <SocialPanel />
        </aside>

        <main className="flex items-center justify-center grow-7 text-muted-foreground">
          Sélectionne une conversation
        </main>

        <aside className="hidden border-l grow-3 w-80 bg-background xl:block">
          <div className="p-4 text-muted-foreground">Détails du groupe</div>
        </aside>
      </div>
    </RequireAuth>
  );
}
