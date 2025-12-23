import { Skeleton } from "@/components/ui/skeleton";

export function AppSkeleton() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-between px-6 border-b h-14">
        <Skeleton className="w-24 h-6" />
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>

      <div className="flex-1 p-6 space-y-4">
        <Skeleton className="w-1/3 h-6" />
        <Skeleton className="w-2/3 h-4" />
        <Skeleton className="w-full h-16" />
      </div>
    </div>
  );
}
