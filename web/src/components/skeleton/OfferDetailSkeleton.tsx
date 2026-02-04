import { Skeleton } from "@/components/ui/skeleton";

export function OfferDetailSkeleton() {
  return (
    <div className="bg-background min-h-screen pb-24">
      <div className="sticky top-0 z-50 flex items-center p-4 bg-background border-b sm:hidden">
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
      <div className="max-w-3xl mx-auto sm:pt-8 w-full">
        <div className="aspect-video w-full bg-muted sm:rounded-xl animate-pulse" />
        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="h-20 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
