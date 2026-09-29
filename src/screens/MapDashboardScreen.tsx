import React, { useState } from 'react';
import { Power, Wallet, MapPin } from 'lucide-react';
import { StatusBar } from '../components/ui/StatusBar';
import { HomeIndicator } from '../components/ui/HomeIndicator';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { MapPlaceholder } from '../components/map/MapPlaceholder';
import { GigOffer } from '../types';

interface MapDashboardScreenProps {
  gigs: GigOffer[];
  onSelectGig: (gig: GigOffer) => void;
  selectedGigId?: string;
  isOnline?: boolean;
  onToggleOnline?: () => void;
}

export const MapDashboardScreen: React.FC<MapDashboardScreenProps> = ({
  gigs,
  onSelectGig,
  selectedGigId,
  isOnline: controlledOnline,
  onToggleOnline,
}) => {
  const [internalOnline, setInternalOnline] = useState(false);
  const isOnline = controlledOnline !== undefined ? controlledOnline : internalOnline;

  const handleToggle = () => {
    if (onToggleOnline) {
      onToggleOnline();
    } else {
      setInternalOnline(!internalOnline);
    }
  };

  return (
    <div className="w-full h-full min-h-[720px] bg-[#0A0B0E] text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Background Map Component */}
      <div className="absolute inset-0 z-0">
        <MapPlaceholder
          gigs={gigs}
          selectedGigId={selectedGigId}
          onSelectGig={onSelectGig}
          isOnline={isOnline}
        />
      </div>

      {/* Top Floating Controls */}
      <div className="relative z-20 flex flex-col">
        <StatusBar time="9:41" />

        {/* Location Pill */}
        <div className="flex justify-center -mt-1 mb-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold text-zinc-300 tracking-wider uppercase">
            <MapPin className="w-3 h-3 text-[#00E676]" />
            <span>CURITIBA, BRASIL</span>
          </div>
        </div>

        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 pt-1">
          {/* User Profile Avatar with Online/Offline tag */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                alt="Perfil"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#00E676] shadow-[0_0_10px_rgba(0,230,118,0.4)]"
              />
              <span
                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full border ${
                  isOnline
                    ? 'bg-[#00E676] text-black border-transparent shadow-[0_0_6px_rgba(0,230,118,0.6)]'
                    : 'bg-[#18191D] text-zinc-400 border-zinc-700'
                }`}
              >
                {isOnline ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>
          </div>

          {/* Earnings Card */}
          <div className="flex items-center gap-2.5 bg-[#141519]/90 backdrop-blur-md border border-white/10 rounded-2xl px-3.5 py-2 shadow-lg">
            <div className="w-7 h-7 rounded-xl bg-[#00E676]/10 border border-[#00E676]/30 flex items-center justify-center text-[#00E676]">
              <Wallet className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-zinc-400 font-medium leading-none">
                Ganhos Hoje
              </span>
              <span className="text-xs font-black text-white tracking-tight mt-0.5">
                R$ 150,00
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Control Panel */}
      <div className="relative z-20 px-4 pb-2">
        <div className="bg-[#141519]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl flex flex-col gap-4">
          {/* Status Row */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <span
                className={`w-3 h-3 rounded-full ${
                  isOnline ? 'bg-[#00E676] animate-pulse' : 'bg-red-500'
                }`}
              />
              {isOnline && (
                <span className="absolute w-5 h-5 rounded-full bg-[#00E676]/40 animate-ping" />
              )}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                {isOnline ? 'Você está conectado' : 'Você está desconectado'}
              </h3>
              <p className="text-xs text-zinc-400">
                {isOnline
                  ? 'Buscando novos turnos prioritários...'
                  : `${gigs.length} vagas ativas perto de você agora.`}
              </p>
            </div>
          </div>

          {/* Ficar Online Button */}
          <PrimaryButton
            onClick={handleToggle}
            variant={isOnline ? 'dark' : 'neon'}
            icon={<Power className="w-4 h-4" />}
          >
            {isOnline ? 'FICAR OFFLINE' : 'FICAR ONLINE'}
          </PrimaryButton>
        </div>

        {/* Bottom indicator */}
        <HomeIndicator />
      </div>
    </div>
  );
};
