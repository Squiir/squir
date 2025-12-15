import React from 'react';
import { X, Flame, Ticket, Users } from 'lucide-react';
import { Venue } from '../types';

interface VenueDetailsProps {
  venue: Venue | null;
  onClose: () => void;
  userPoints: number;
}

const VenueDetails: React.FC<VenueDetailsProps> = ({ venue, onClose, userPoints }) => {
  if (!venue) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity" 
        onClick={onClose}
      />
      <div className="bg-slate-900 w-full sm:w-[400px] rounded-t-3xl sm:rounded-3xl overflow-hidden pointer-events-auto transform transition-transform duration-300 shadow-2xl border border-slate-700 max-h-[85vh] overflow-y-auto">
        
        {/* Header Image */}
        <div className="relative h-48">
          <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 backdrop-blur-md"
          >
            <X size={20} />
          </button>
          
          <div className="absolute bottom-4 left-6">
            <span className="bg-amber-500 text-slate-900 text-xs font-bold px-2 py-0.5 rounded mb-2 inline-block">
              {venue.type}
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight">{venue.name}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Status Bar */}
          <div className="flex justify-between items-center glass-panel p-3 rounded-xl">
            <div className="flex items-center gap-2 text-amber-400">
              <Flame size={20} />
              <span className="font-semibold text-sm">Ambiance {venue.currentTraffic}</span>
            </div>
            <div className="h-4 w-px bg-slate-700"></div>
            <div className="flex items-center gap-2 text-emerald-400">
              <Users size={20} />
              <span className="font-semibold text-sm">Top Populaire</span>
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed text-sm">
            {venue.description}
          </p>

          {/* User Status */}
          <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
            <div className="flex justify-between items-end mb-2">
              <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Ta fidélité</span>
              <span className="text-2xl font-bold text-white">{userPoints} <span className="text-sm text-amber-400 font-normal">pts</span></span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-amber-400 h-2 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]" 
                style={{ width: `${Math.min((userPoints / 50) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Offers */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Ticket size={18} className="text-amber-400" />
              Récompenses disponibles
            </h3>
            <div className="space-y-3">
              {venue.activeOffers.map(offer => {
                const canAfford = userPoints >= offer.cost;
                return (
                  <div key={offer.id} className={`flex items-center justify-between p-4 rounded-xl border ${canAfford ? 'border-amber-500/30 bg-amber-500/5' : 'border-slate-800 bg-slate-800/50 opacity-60'}`}>
                    <div>
                      <div className="font-bold text-white">{offer.title}</div>
                      <div className="text-xs text-slate-400">{offer.description}</div>
                    </div>
                    {canAfford ? (
                      <button className="bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-lg shadow-amber-900/20">
                        {offer.cost} pts
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 text-slate-500 text-xs font-bold px-3 py-2">
                         🔒 {offer.cost} pts
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VenueDetails;