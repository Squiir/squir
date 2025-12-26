import { Card } from "@/components/ui/card";
import type { User } from "@/types/user";

interface Props {
  user?: User;
  isLoading: boolean;
}

export function ProfileQrCodes({ user }: Props) {
  console.log("QRCIDE:", user?.qrCodes);
  return (
    <Card className="p-6">
      <p className="mb-4 text-sm font-medium uppercase text-muted-foreground">Mes QR Codes</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {user?.qrCodes?.map((qr) => (
          <div
            key={qr.id}
            className="flex items-center justify-center h-32 border rounded-xl bg-background"
          >
            {qr.label}
          </div>
        ))}
      </div>
    </Card>
  );
}
