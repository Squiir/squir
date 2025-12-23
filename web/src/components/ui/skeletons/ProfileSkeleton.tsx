import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-20 h-3" />
        </div>
      </div>

      <div className="space-y-2">
        <Skeleton className="w-20 h-8" />
        <Skeleton className="w-32 h-3" />
      </div>

      <div className="space-y-3">
        <Skeleton className="w-40 h-4" />
        <div className="flex gap-3">
          <Skeleton className="w-40 h-24 rounded-xl" />
          <Skeleton className="w-40 h-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
