import type { ReactNode } from "react";

export function SocialLayout({
  left,
  center,
  right,
}: {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className="h-[calc(100vh-3.5rem)] w-full bg-muted/40">
      <div className="mx-auto grid h-full w-full max-w-350 grid-cols-[320px_1fr_360px] gap-3 p-3">
        <div className="h-full border shadow-sm rounded-xl bg-background">
          {left}
        </div>
        <div className="h-full border shadow-sm rounded-xl bg-background">
          {center}
        </div>
        <div className="h-full border shadow-sm rounded-xl bg-background">
          {right}
        </div>
      </div>
    </div>
  );
}
