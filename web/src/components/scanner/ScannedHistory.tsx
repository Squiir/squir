import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScannedHistory } from "@/hooks/qrcode/use-scanned-history";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { FileExclamationPoint, History, Loader2 } from "lucide-react";

export function ScannedHistory() {
  const { data: history, isLoading, isError } = useScannedHistory();

  if (isLoading) {
    return (
      <Card className="w-full h-full border-none shadow-none bg-transparent">
        <CardContent className="pt-6 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full h-full border-none shadow-none bg-transparent flex flex-col">
        <CardContent className="pt-6 flex justify-center">
          <FileExclamationPoint className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full border-none shadow-none bg-transparent flex flex-col">
      <CardHeader className="pb-3 px-0">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <History className="w-4 h-4" />
          Derniers scans
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 flex-1 overflow-y-auto px-2 pb-2">
        {history?.length === 0 ? (
          <p className="text-center text-muted-foreground text-sm mt-4">Aucun scan récent</p>
        ) : (
          history?.map((scan) => (
            <div
              key={scan.id}
              className="flex items-center justify-between gap-3 p-4 rounded-lg bg-background shadow-sm border"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <Avatar className="w-8 h-8 border border-muted">
                  <AvatarImage src={scan.user.avatarUrl || undefined} />
                  <AvatarFallback className="text-xs">
                    {scan.user.username[0]?.toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col overflow-hidden">
                  <span className="font-semibold text-sm truncate leading-tight">
                    {scan.offer.name}
                  </span>
                  <span className="text-xs text-muted-foreground truncate leading-tight">
                    {scan.user.username}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0 gap-0.5">
                <span className="font-bold text-sm text-primary leading-tight">
                  {scan.offer.squirPrice}€
                </span>
                <span className="text-[10px] text-muted-foreground leading-tight">
                  {format(new Date(scan.consumedAt), "HH:mm", { locale: fr })}
                </span>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
