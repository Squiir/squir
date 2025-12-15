import React from 'react';
import { QrCode, Share2, Wallet, Ticket } from 'lucide-react';
import { UserState } from '../types';
import { MOCK_VENUES } from '../constants';

interface LoyaltyViewProps {
  user: UserState;
}

const LoyaltyView: React.FC<LoyaltyViewProps> = ({ user }) => {
  // Filter venues where user has points
  const activeVenues = MOCK_VENUES.filter(v => (user.points[v.id] || 0) > 0);

  return (
    <div className="h-full bg-slate-900 p-6 pt-12 overflow-y-auto pb-24">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-white">Mon <span className="text-amber-400">Stack</span></h2>
        <div className="bg-slate-800 px-4 py-2 rounded-full flex items-center gap-2 border border-slate-700">
          <Wallet size={16} className="text-emerald-400" />
          <span className="font-bold">{user.totalPoints} pts total</span>
        </div>
      </div>

      {/* Main QR Card */}
      <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-1 shadow-[0_0_20px_rgba(251,191,36,0.2)] mb-8 transform transition-transform hover:scale-[1.02]">
        <div className="bg-slate-900 rounded-[22px] p-6 text-center relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -translate-x-10 -translate-y-10"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl translate-x-10 translate-y-10"></div>

          <div className="relative z-10">
            <h3 className="text-slate-400 text-sm uppercase tracking-wider font-semibold mb-6">Ton Pass Unique</h3>
            
            <div className="bg-white p-4 rounded-xl inline-block mb-6 shadow-xl">
               {/* Visual placeholder for QR */}
              <div className="w-48 h-48 relative">
                 <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1">
                    {Array.from({length: 36}).map((_, i) => (
                        <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-slate-900' : 'bg-transparent'}`}></div>
                    ))}
                 </div>
                 {/* Center Logo */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-2 rounded-full">
                         <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center font-bold text-slate-900">S</div>
                    </div>
                 </div>
              </div>
            </div>

            <p className="text-slate-300 text-sm mb-6">
              Présente ce code au barman pour accumuler des points ou récupérer tes gains.
            </p>

            <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-700">
              <Share2 size={18} className="text-amber-400" />
              Envoyer une promo à un ami
            </button>
          </div>
        </div>
      </div>

      {/* Active Stacks */}
      <h3 className="text-xl font-bold text-white mb-4">Tes lieux préférés</h3>
      
      {activeVenues.length > 0 ? (
        <div className="grid gap-4">
          {activeVenues.map(venue => (
            <div key={venue.id} className="glass-panel p-4 rounded-2xl flex items-center gap-4">
               <img src={venue.image} alt={venue.name} className="w-16 h-16 rounded-xl object-cover" />
               <div className="flex-1">
                 <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg">{venue.name}</h4>
                    <span className="text-amber-400 font-bold text-lg">{user.points[venue.id]} pts</span>
                 </div>
                 <div className="mt-2 h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: '40%' }}></div>
                 </div>
                 <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                    <Ticket size={12} />
                    <span>Prochaine récompense: Shot offert (3 pts restants)</span>
                 </div>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-slate-500 text-center py-8">
          Pas encore de points. Sors explorer !
        </div>
      )}
    </div>
  );
};

export default LoyaltyView;