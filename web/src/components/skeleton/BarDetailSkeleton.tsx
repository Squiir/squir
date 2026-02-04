import { Skeleton } from "@/components/ui/skeleton";

export function BarDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-48 w-full bg-muted animate-pulse" />
      <div className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="bg-card rounded-xl shadow-lg p-5 flex flex-col md:flex-row gap-4">
          <Skeleton className="w-20 h-20 rounded-full" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <Skeleton className="w-full h-48 rounded-xl" />
        <div>
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="flex gap-4 overflow-hidden">
            <Skeleton className="w-[280px] h-[300px] rounded-xl shrink-0" />
            <Skeleton className="w-[280px] h-[300px] rounded-xl shrink-0" />
            <Skeleton className="w-[280px] h-[300px] rounded-xl shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
