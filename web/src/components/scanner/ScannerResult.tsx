import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import type { ScannedDataProps } from "@/types/qrcode";
import { Check, Image, User } from "lucide-react";

interface ScannerResultProps {
  data: ScannedDataProps;
  onScanAnother: () => void;
}

export function ScannerResult({ data, onScanAnother }: ScannerResultProps) {
  const qr = data?.qrCode;
  const offer = qr?.offer;
  const consumer = qr?.user;

  return (
    <div className="flex flex-col items-center justify-center p-6 h-full w-full max-w-md mx-auto animate-in fade-in zoom-in duration-300">
      <div className="mb-6 rounded-full bg-green-100 p-4 ring-8 ring-green-50">
        <Check className="h-12 w-12 text-green-600" />
      </div>

      <h2 className="text-2xl font-bold text-center mb-1">Scan validé !</h2>
      <p className="text-muted-foreground text-center mb-8">L'offre a été consommée avec succès.</p>

      <Card className="w-full mb-8 overflow-hidden">
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-center">
            Détails de l'offre
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {offer && (
            <div className="text-center w-full">
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-xl overflow-hidden shadow-sm">
                {offer.imageUrl && (
                  <img
                    src={offer.imageUrl}
                    alt={offer.name}
                    className="object-cover w-full h-full"
                  />
                )}
                {!offer.imageUrl && (
                  <div className="flex items-center justify-center w-full h-full">
                    <Image />
                  </div>
                )}
              </div>
              <h3 className="font-bold text-lg mb-1">{offer.name}</h3>
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold text-primary text-xl">
                  {formatPrice(offer.squirPrice)}
                </span>
                {offer.originalPrice > offer.squirPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(offer.originalPrice)}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="w-full h-px bg-border my-2" />

          {consumer && (
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground uppercase">Client</span>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src={consumer.avatarUrl} />
                  <AvatarFallback>
                    <User className="h-5 w-5 opacity-50" />
                  </AvatarFallback>
                </Avatar>
                <div className="font-medium">{consumer.username || "Utilisateur anonyme"}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Button size="lg" className="w-full" onClick={onScanAnother}>
        Scanner un autre code
      </Button>
    </div>
  );
}
