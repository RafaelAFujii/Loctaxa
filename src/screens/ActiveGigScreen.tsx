import React, { useState } from 'react';
import { 
  Navigation, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Phone, 
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { StatusBar } from '../components/ui/StatusBar';
import { HomeIndicator } from '../components/ui/HomeIndicator';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { GigOffer } from '../types';

interface ActiveGigScreenProps {
  gig: GigOffer;
  onFinishShift?: (gig: GigOffer) => void;
  onOpenNavigation?: () => void;
  onCancelGig?: () => void;
}

export const ActiveGigScreen: React.FC<ActiveGigScreenProps> = ({
  gig,
  onFinishShift,
  onOpenNavigation,
  onCancelGig,
}) => {
  // Estado para simular o progresso do turno: 'heading_to_venue' -> 'arrived_working' -> 'completed'
  const [shiftStatus, setShiftStatus] = useState<'heading_to_venue' | 'arrived_working'>('heading_to_venue');

  const handlePrimaryAction = () => {
    if (shiftStatus === 'heading_to_venue') {
      setShiftStatus('arrived_working');
    } else {
      if (onFinishShift) {
        onFinishShift(gig);
      }
    }
  };

  const handleLaunchExternalMap = () => {
    if (onOpenNavigation) {
      onOpenNavigation();
    } else {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${gig.venueName} Curitiba`
        )}`,
        '_blank'
      );
    }
  };

  return (
    <div className="w-full h-full min-h-[720px] bg-[#0E0F12] text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Top Status Bar */}
      <StatusBar time="9:41" />

      {/* Header: Turno em Andamento */}
      <div className="px-5 pt-1 pb-3 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E676] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00E676]" />
          </span>
          <h1 className="text-sm font-black tracking-wider uppercase text-white">
            Turno em Andamento
          </h1>
        </div>

        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30">
          {shiftStatus === 'heading_to_venue' ? 'A Caminho' : 'Em Serviço'}
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-5 py-4 overflow-y-auto space-y-4 pb-24">
        {/* Card Principal do Restaurante, Taxa e Horário */}
        <div className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-4 shadow-lg space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded-full border border-[#00E676]/20">
                {gig.profession}
              </span>
              <h2 className="text-xl font-black text-white mt-1.5 tracking-tight">
                {gig.venueName}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>{gig.neighborhood} • Curitiba</span>
              </div>
            </div>

            {/* Taxa */}
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                TAXA
              </span>
              <span className="text-xl font-black text-[#00E676] block">
                {gig.rateFormatted}
              </span>
            </div>
          </div>

          <div className="border-t border-white/5 pt-2.5 flex items-center justify-between text-xs text-zinc-300">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#00E676]" />
              <span className="font-semibold">{gig.shiftTime}</span>
            </div>
            <span className="text-[11px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded-md">
              {gig.shiftDuration}
            </span>
          </div>
        </div>

        {/* Placeholder retangular para o mapa da rota */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-md">
          <div className="bg-gray-800 h-44 w-full flex flex-col justify-between p-3.5 relative overflow-hidden">
            {/* SVG estilizado simulando traçado do GPS até o restaurante */}
            <svg
              className="absolute inset-0 w-full h-full opacity-60"
              viewBox="0 0 300 160"
              preserveAspectRatio="xMidYMid slice"
            >
              <path
                d="M -10 120 C 50 110 80 140 130 90 C 180 40 220 70 290 30"
                stroke="#00E676"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M -10 120 C 50 110 80 140 130 90 C 180 40 220 70 290 30"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none"
              />
              {/* Pontos de Início e Chegada */}
              <circle cx="20" cy="118" r="5" fill="#3b82f6" stroke="#fff" strokeWidth="1.5" />
              <circle cx="270" cy="35" r="7" fill="#00E676" stroke="#fff" strokeWidth="2" />
            </svg>

            {/* Badge ETA flutuante superior */}
            <div className="relative z-10 self-start bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
              <span className="text-xs font-bold text-white">
                Estimativa de Chegada (ETA) - 4.5 km
              </span>
            </div>

            {/* Tempo aproximado flutuante inferior */}
            <div className="relative z-10 self-end bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[11px] font-semibold text-zinc-300">
              ~ 12 min de trânsito
            </div>
          </div>
        </div>

        {/* Botão secundário de navegação: Waze / Google Maps */}
        <button
          type="button"
          onClick={handleLaunchExternalMap}
          className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 bg-[#1C1C1E] hover:bg-[#252528] active:bg-[#2c2c30] text-white border border-white/10 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm group"
        >
          <Navigation className="w-4 h-4 text-[#00E676] transition-transform group-hover:scale-110" />
          <span>Navegar (Waze / Maps)</span>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-500 ml-1" />
        </button>

        {/* Lembrete de Apresentação / Regras rápidas */}
        <div className="bg-[#1C1C1E]/60 border border-white/5 rounded-2xl p-3 flex items-start gap-2.5 text-left">
          <ShieldCheck className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
          <div className="text-[11px] text-zinc-400">
            <span className="text-zinc-200 font-semibold block">Apresentação:</span>
            Apresente-se ao gerente informando que você veio via <strong className="text-white">Trampo CWB</strong>.
          </div>
        </div>

        {/* Botão de Emergência / Suporte */}
        <div className="flex justify-between items-center px-1 text-xs">
          <button
            type="button"
            onClick={() => alert('Ligando para a gerência do Boteco...')}
            className="text-zinc-400 hover:text-white flex items-center gap-1.5 cursor-pointer py-1"
          >
            <Phone className="w-3.5 h-3.5 text-[#00E676]" />
            <span>Contato do Estabelecimento</span>
          </button>

          {onCancelGig && (
            <button
              type="button"
              onClick={onCancelGig}
              className="text-red-400/80 hover:text-red-300 text-[11px] font-medium cursor-pointer"
            >
              Cancelar Turno
            </button>
          )}
        </div>
      </div>

      {/* Floating Bottom Action Area */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0E0F12] via-[#0E0F12]/95 to-transparent pt-6 z-20">
        <PrimaryButton
          onClick={handlePrimaryAction}
          icon={
            shiftStatus === 'heading_to_venue' ? (
              <MapPin className="w-4 h-4 text-black" />
            ) : (
              <CheckCircle className="w-4 h-4 text-black" />
            )
          }
        >
          {shiftStatus === 'heading_to_venue'
            ? 'CHEGUEI NO LOCAL'
            : 'FINALIZAR TURNO'}
        </PrimaryButton>

        <HomeIndicator />
      </div>
    </div>
  );
};
