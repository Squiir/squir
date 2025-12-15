import React, { useState } from 'react';
import { UserState, ViewMode } from './types';
import { INITIAL_USER } from './constants';
import Navigation from './components/Navigation';
import MapView from './components/MapView';
import LoyaltyView from './components/LoyaltyView';
import ProScanner from './components/ProScanner';
import { Trophy, Settings, Scan } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('MAP');
  const [user, setUser] = useState<UserState>(INITIAL_USER);
  const [isProMode, setIsProMode] = useState(false);

  // Render specific view
  const renderView = () => {
    switch (view) {
      case 'MAP':
        return <MapView user={user} />;
      case 'LOYALTY':
        return <LoyaltyView user={user} />;
      case 'SOCIAL':
        return (
          <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-900 text-center">
            <div className="bg-gradient-to-tr from-amber-400 to-red-500 p-4 rounded-full mb-6 neon-glow">
              <Trophy size={48} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Guerre des Clubs</h2>
            <p className="text-slate-400 mb-6">Rejoins un club et conquiers des territoires sur la carte.</p>
            <div className="bg-slate-800/50 p-4 rounded-xl w-full border border-slate-700">
               <div className="flex justify-between items-center mb-2">
                 <span className="font-bold text-amber-400">#1 Les Nocturnes</span>
                 <span className="text-white">12,450 pts</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="font-bold text-slate-300">#2 Ton Club</span>
                 <span className="text-white">8,320 pts</span>
               </div>
            </div>
          </div>
        );
      case 'PROFILE':
        return (
          <div className="h-full bg-slate-900 p-6 pt-12">
            <h2 className="text-3xl font-bold mb-8">Profil</h2>
            <div className="bg-slate-800 rounded-2xl p-6 flex items-center gap-4 mb-8">
               <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center text-2xl">😎</div>
               <div>
                  <h3 className="text-xl font-bold">{user.name}</h3>
                  <p className="text-slate-400">Membre depuis 2023</p>
               </div>
            </div>
            
            <button 
              onClick={() => setIsProMode(true)}
              className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center justify-between group hover:bg-slate-750 transition-colors"
            >
               <div className="flex items-center gap-3">
                 <div className="bg-slate-700 p-2 rounded-lg group-hover:bg-slate-600 transition-colors">
                    <Scan size={20} className="text-amber-400" />
                 </div>
                 <div className="text-left">
                    <div className="font-bold text-white">Mode Pro</div>
                    <div className="text-xs text-slate-400">Pour les gérants d'établissement</div>
                 </div>
               </div>
               <Settings size={16} className="text-slate-500" />
            </button>
          </div>
        );
      default:
        return <MapView user={user} />;
    }
  };

  if (isProMode) {
    return <ProScanner onExit={() => setIsProMode(false)} />;
  }

  return (
    <div className="relative h-screen w-full bg-slate-900 text-white overflow-hidden flex flex-col">
      {/* Main Content Area */}
      <main className="flex-1 relative z-0">
        {renderView()}
      </main>

      {/* Navigation */}
      <Navigation currentView={view} setView={setView} />
    </div>
  );
};

export default App;