import { cn, formatPrice } from "@/lib/utils";
import type { WalletActiveItem, WalletHistoryItem } from "@/types/wallet";
import { QrCode } from "lucide-react";

interface Props {
  item: WalletActiveItem | WalletHistoryItem;
  onClick?: () => void;
  isHistory?: boolean;
}

export function WalletTicketCard({ item, onClick, isHistory = false }: Props) {
  const badgeContent = isHistory ? (
    <span className="font-bold text-xs bg-orange-500/20 text-orange-500 px-2 py-0.5 rounded">
      {(item as WalletHistoryItem).status.split(" ")[0] || "Utilisé"}
    </span>
  ) : (
    <span className="font-bold text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded">
      Actif
    </span>
  );

  const price = formatPrice(item.squirPrice);
  const quantity = "quantity" in item ? item.quantity : 1;

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex w-full bg-card rounded-xl overflow-hidden p-3 gap-4 border border-border transition-colors group",
        onClick ? "cursor-pointer hover:bg-white/5" : "opacity-80",
      )}
    >
      {quantity > 1 && (
        <div className="absolute top-2 right-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
          x{quantity}
        </div>
      )}

      <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-muted relative">
        {item.offerImageUrl ? (
          <img
            src={item.offerImageUrl}
            alt={item.offerName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <QrCode className="w-8 h-8" />
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
        <div className="space-y-1">
          <h3 className="font-bold text-foreground text-md leading-tight line-clamp-2">
            {item.offerName}
          </h3>
          <p className="text-xs text-muted-foreground">{item.offerDescription}</p>
          <div className="flex flex-wrap gap-x-2 text-xs text-muted-foreground">
            <span className="truncate max-w-[120px]">{item.barName}</span>
            {item.barAddress && (
              <>
                <span>•</span>
                <span className="truncate max-w-[150px]">{item.barAddress}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <span className="text-primary font-bold text-sm">{price}</span>
          {badgeContent}
        </div>
      </div>
    </div>
  );
}
