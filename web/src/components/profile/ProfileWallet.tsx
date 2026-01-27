import { Card } from "@/components/ui/card";
import type { User } from "@/types/user";
import { Gem } from "lucide-react";

interface Props {
  user?: User;
}
// TODO: Keep or remove Loyalty Point for POC ?
export function ProfileWallet({ user }: Props) {
  const points = user?.loyaltyPoints ?? 0;
  const nextLevel = 2000;
  const remaining = nextLevel - points;
  const progress = Math.min((points / nextLevel) * 100, 100);

  return (
    <Card className="relative overflow-hidden border-none rounded-3xl text-white shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-900 via-indigo-900 to-purple-900" />

      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative p-8 md:p-10 flex flex-col justify-between h-full min-h-[240px]">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white/80">
            <Gem className="w-5 h-5" />
            <span className="font-medium tracking-wide">Points Sheers</span>
          </div>

          <div className="space-y-1">
            <h3 className="text-6xl md:text-7xl font-black tracking-tighter drop-shadow-lg">
              {points.toLocaleString()}
            </h3>
            <p className="text-white/60 font-medium text-sm md:text-base">
              Plus que {remaining.toLocaleString()} pts pour le statut Platine
            </p>
          </div>
        </div>

        <div className="space-y-2 mt-8">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/50">
            <span>Gold</span>
            <span>Platine</span>
          </div>
          <div className="relative w-full h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-white to-white/80 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
