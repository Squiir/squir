import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLogout } from "@/hooks/auth/use-logout";

export function ProfileActions() {
  const { mutate: logout } = useLogout();

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-2">
        <Button variant="secondary" onClick={() => logout()}>
          Se déconnecter
        </Button>

        <div className="h-4" />

        <Button variant="destructive" onClick={() => logout()}>
          Supprimer le compte
        </Button>
      </div>
    </Card>
  );
}
