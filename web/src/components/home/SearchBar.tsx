import { useSearchOffers } from "@/hooks/offers/use-search";
import { Search, Wine, X } from "lucide-react";
import { useState } from "react";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: searchResults, isLoading: isSearching } = useSearchOffers(searchQuery);

  return (
    <div className="relative group flex-1">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-foreground transition-colors" />
      <input
        type="text"
        placeholder="Rechercher un événement, un lieu..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full h-12 pl-12 pr-10 rounded-xl bg-secondary/50 border border-input text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:bg-secondary/80 transition-all"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {searchQuery.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 border bg-popover text-popover-foreground rounded-xl shadow-2xl overflow-hidden z-30 max-h-[60vh] overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Recherche en cours...
            </div>
          ) : searchResults && searchResults.length > 0 ? (
            <div className="py-2">
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Résultats
              </div>
              {searchResults.map((offer) => (
                <div
                  key={offer.id}
                  className="px-4 py-3 hover:bg-accent hover:text-accent-foreground cursor-pointer flex items-center gap-3 border-b border-border last:border-0"
                >
                  <div className="h-10 w-10 rounded bg-muted flex-shrink-0 overflow-hidden flex items-center justify-center">
                    {offer.imageUrl ? (
                      <img src={offer.imageUrl} className="h-full w-full object-cover" />
                    ) : (
                      <Wine className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{offer.name}</div>
                    <div className="text-xs text-muted-foreground">{offer.bar.name}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Aucun résultat trouvé
            </div>
          )}
        </div>
      )}
    </div>
  );
}
