import { Plus } from "lucide-react";

export function ProOffersView() {
  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Offers</h1>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          Create Offer
        </button>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 p-8 text-center border-2 border-dashed rounded-lg border-muted-foreground/25">
        <div className="p-4 mb-4 bg-muted rounded-full">
          <Plus className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No offers yet</h3>
        <p className="text-muted-foreground max-w-sm mt-2 mb-6">
          Create your first offer to start attracting customers to your establishment.
        </p>
      </div>
    </div>
  );
}
