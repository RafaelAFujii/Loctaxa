import React, { useState } from 'react';
import { 
  Power, 
  Wallet, 
  MapPin, 
  Wine,
  Utensils,
  WifiOff
} from 'lucide-react';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { MapPlaceholder } from '../components/map/MapPlaceholder';
import { GigOffer } from '../types';

interface MapDashboardScreenProps {
  gigs: GigOffer[];
  onSelectGig: (gig: GigOffer) => void;
  selectedGigId?: string;
  isOnline?: boolean;
  onToggleOnline?: () => void;
  onOpenProfile?: () => void;
  onOpenEarnings?: () => void;
  earningsToday?: string;
}

export const MapDashboardScreen: React.FC<MapDashboardScreenProps> = ({
  gigs,
  onSelectGig,
  selectedGigId,
  isOnline: controlledOnline,
  onToggleOnline,
  onOpenProfile,
  onOpenEarnings,
  earningsToday = 'R$ 150,00',
}) => {
  const [internalOnline, setInternalOnline] = useState(true);
  const isOnline = controlledOnline !== undefined ? controlledOnline : internalOnline;
  const [filterProfession, setFilterProfession] = useState<'All' | 'Bartender' | 'Garçom'>('All');

  const handleToggle = () => {
    if (onToggleOnline) {
      onToggleOnline();
    } else {
      setInternalOnline(!internalOnline);
    }
  };

  // Quando o usuário está OFFLINE, as taxas/vagas NÃO aparecem
  const visibleGigs = isOnline ? gigs : [];

  const displayedGigs = visibleGigs.filter(g => {
    if (filterProfession === 'All') return true;
    return g.profession === filterProfession;
  });

  return (
    <div className="w-full flex-1 flex flex-col lg:flex-row relative bg-[#0A0B0E] h-[calc(100vh-4rem)] min-h-[500px] overflow-hidden">
      {/* LEFT SIDEBAR (Desktop): Active Gigs list & quick actions */}
      <aside className="hidden lg:flex w-96 flex-col justify-between border-r border-white/10 bg-[#101216] z-20 shrink-0 h-full">
        <div className="p-6 flex flex-col h-full overflow-hidden">
          {/* Header Status & Earnings */}
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                  alt="Perfil"
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#00E676] shadow-[0_0_12px_rgba(0,230,118,0.4)]"
                />
                <span
                  className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#101216] ${
                    isOnline ? 'bg-[#00E676] animate-pulse' : 'bg-zinc-600'
                  }`}
                />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Gabriel Silva</h3>
                <span className={`text-[11px] font-extrabold uppercase ${isOnline ? 'text-[#00E676]' : 'text-zinc-500'}`}>
                  {isOnline ? 'Disponível no Mapa' : 'Desconectado'}
                </span>
              </div>
            </div>

            <button
              onClick={onOpenEarnings || onOpenProfile}
              className="flex flex-col items-end text-right bg-white/5 hover:bg-white/10 border border-white/5 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              <span className="text-[10px] text-zinc-400 uppercase font-medium">Ganhos Hoje</span>
              <span className="text-sm font-black text-[#00E676]">{earningsToday}</span>
            </button>
          </div>

          {/* Quick Filters */}
          <div className="py-4">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Vagas em Curitiba ({displayedGigs.length})
              </span>
              <span className="text-[11px] text-zinc-500 font-medium">Raio: 10 km</span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#16181f] p-1 rounded-xl border border-white/5">
              <button
                onClick={() => setFilterProfession('All')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filterProfession === 'All' ? 'bg-[#00E676] text-black font-extrabold shadow-sm' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilterProfession('Bartender')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  filterProfession === 'Bartender' ? 'bg-[#00E676] text-black font-extrabold shadow-sm' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Wine className="w-3 h-3" />
                <span>Bartender</span>
              </button>
              <button
                onClick={() => setFilterProfession('Garçom')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  filterProfession === 'Garçom' ? 'bg-[#00E676] text-black font-extrabold shadow-sm' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Utensils className="w-3 h-3" />
                <span>Garçom</span>
              </button>
            </div>
          </div>

          {/* Gigs List or Offline Empty State */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {isOnline ? (
              displayedGigs.length > 0 ? (
                displayedGigs.map((gig) => {
                  const isSelected = gig.id === selectedGigId;
                  return (
                    <div
                      key={gig.id}
                      onClick={() => onSelectGig(gig)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                        isSelected
                          ? 'bg-[#181d24] border-[#00E676] shadow-[0_0_15px_rgba(0,230,118,0.2)]'
                          : 'bg-[#14161c] border-white/5 hover:border-white/20 hover:bg-[#181a22]'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30">
                              {gig.profession}
                            </span>
                            <span className="text-xs text-zinc-400 font-medium">{gig.distance}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white mt-1.5">{gig.venueName}</h4>
                          <p className="text-xs text-zinc-400">{gig.neighborhood}</p>
                        </div>

                        <div className="text-right">
                          <span className="text-base font-black text-[#00E676] block">{gig.rateFormatted}</span>
                          <span className="text-[10px] text-zinc-400 font-medium">{gig.shiftTime}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-zinc-500 text-xs">
                  Nenhuma vaga com o filtro selecionado.
                </div>
              )
            ) : (
              /* Offline state - taxas escondidas */
              <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-zinc-800/80 flex items-center justify-center text-zinc-500">
                  <WifiOff className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    Você está Offline
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed max-w-[220px]">
                    Fique online para que as taxas e vagas do mapa fiquem visíveis para você.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Online Toggle Button */}
          <div className="pt-4 border-t border-white/5">
            <PrimaryButton
              onClick={handleToggle}
              variant={isOnline ? 'dark' : 'neon'}
              icon={<Power className="w-4 h-4" />}
            >
              {isOnline ? 'FICAR OFFLINE' : 'FICAR ONLINE'}
            </PrimaryButton>
          </div>
        </div>
      </aside>

      {/* MAIN MAP AREA (Full viewport space on mobile, flex-1 on desktop) */}
      <div className="flex-1 relative w-full h-full min-h-[500px] overflow-hidden bg-[#0c0f14]">
        {/* Fullscreen Map Canvas */}
        <MapPlaceholder
          gigs={displayedGigs}
          selectedGigId={selectedGigId}
          onSelectGig={onSelectGig}
          isOnline={isOnline}
        />

        {/* Banner de Aviso quando Offline sobre o Mapa */}
        {!isOnline && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-[#141519]/95 border border-white/10 rounded-3xl p-6 text-center shadow-2xl max-w-sm pointer-events-auto">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mx-auto mb-3">
                <WifiOff className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                Modo Offline Ativo
              </h3>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                As taxas e ofertas de turnos estão ocultadas enquanto você estiver desconectado.
              </p>
              <PrimaryButton onClick={handleToggle} icon={<Power className="w-4 h-4 text-black" />}>
                FICAR ONLINE AGORA
              </PrimaryButton>
            </div>
          </div>
        )}

        {/* Top Controls Overlay (Mobile & Tablet) */}
        <div className="lg:hidden absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
          {/* Location indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141519]/95 backdrop-blur-md rounded-full border border-white/10 text-[11px] font-bold text-zinc-200 shadow-xl">
            <MapPin className="w-3.5 h-3.5 text-[#00E676]" />
            <span>Curitiba, PR</span>
          </div>

          {/* Quick Earnings link */}
          <button
            onClick={onOpenEarnings || onOpenProfile}
            className="flex items-center gap-2 bg-[#141519]/95 backdrop-blur-md border border-white/10 rounded-full px-3.5 py-1.5 shadow-xl hover:border-[#00E676]/40 cursor-pointer"
          >
            <Wallet className="w-3.5 h-3.5 text-[#00E676]" />
            <span className="text-xs font-black text-white">{earningsToday}</span>
          </button>
        </div>

        {/* Bottom Floating Control Panel (Mobile only, posicionada acima da bottom navigation) */}
        <div className="lg:hidden absolute bottom-20 left-4 right-4 z-20 pointer-events-auto">
          <div className="bg-[#141519]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className={`w-3 h-3 rounded-full ${isOnline ? 'bg-[#00E676] animate-pulse' : 'bg-red-500'}`} />
                <div>
                  <h3 className="text-xs font-bold text-white">
                    {isOnline ? 'Você está conectado' : 'Você está desconectado'}
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    {isOnline ? `${displayedGigs.length} vagas ativas perto de você` : 'Taxas ocultas (fique online)'}
                  </p>
                </div>
              </div>

              <button
                onClick={handleToggle}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer transition-colors ${
                  isOnline ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-[#00E676] text-black shadow-md'
                }`}
              >
                {isOnline ? 'OFFLINE' : 'ONLINE'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
