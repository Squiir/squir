import { Skeleton } from "@/components/ui/skeleton";

export function SocialSkeleton({
  area,
}: {
  area: "left" | "center" | "right";
}) {
  if (area === "left") {
    return (
      <div className="p-3 space-y-3">
        <Skeleton className="w-full h-9" />
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-2">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="w-3/4 h-4" />
                <Skeleton className="w-1/2 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (area === "center") {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4">
          <Skeleton className="w-24 h-5" />
        </div>
        <div className="flex-1 p-4 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="rounded-full h-9 w-9" />
              <div className="w-full space-y-2">
                <Skeleton className="w-2/3 h-14 rounded-2xl" />
                <Skeleton className="w-24 h-3" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 p-3">
          <Skeleton className="flex-1 h-10" />
          <Skeleton className="w-20 h-10" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="w-48 h-6" />
      <Skeleton className="w-full h-24" />
      <Skeleton className="h-4 w-28" />
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="rounded-full h-7 w-7" />
            <Skeleton className="w-32 h-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
