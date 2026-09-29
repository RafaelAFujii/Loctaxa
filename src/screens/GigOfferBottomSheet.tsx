import React from 'react';
import { Star, ShieldAlert, Sparkles, MapPin, X } from 'lucide-react';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { HomeIndicator } from '../components/ui/HomeIndicator';
import { StatusBar } from '../components/ui/StatusBar';
import { MapPlaceholder } from '../components/map/MapPlaceholder';
import { GigOffer } from '../types';

interface GigOfferBottomSheetProps {
  gig: GigOffer;
  allGigs: GigOffer[];
  onAccept: (gig: GigOffer) => void;
  onDecline: (gig: GigOffer) => void;
  onClose?: () => void;
}

export const GigOfferBottomSheet: React.FC<GigOfferBottomSheetProps> = ({
  gig,
  allGigs,
  onAccept,
  onDecline,
  onClose,
}) => {
  return (
    <div className="w-full h-full min-h-[720px] bg-[#0A0B0E] text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Background Map dimmed */}
      <div className="absolute inset-0 z-0">
        <MapPlaceholder
          gigs={allGigs}
          selectedGigId={gig.id}
          onSelectGig={() => {}}
          isOnline={true}
        />
        {/* Dim overlay behind sheet */}
        <div
          onClick={onClose || (() => onDecline(gig))}
          className="absolute inset-0 bg-black/60 backdrop-blur-[2px] cursor-pointer"
        />
      </div>

      {/* Top Floating Controls */}
      <div className="relative z-10 flex flex-col">
        <StatusBar time="9:41" />

        {/* Location Pill */}
        <div className="flex justify-center -mt-1 mb-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold text-zinc-300 tracking-wider uppercase">
            <MapPin className="w-3 h-3 text-[#00E676]" />
            <span>CURITIBA, BRASIL</span>
          </div>
        </div>

        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 pt-1">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
              alt="Perfil"
              className="w-10 h-10 rounded-full object-cover border-2 border-[#00E676] shadow-[0_0_10px_rgba(0,230,118,0.4)]"
            />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full bg-[#00E676] text-black">
              ONLINE
            </span>
          </div>

          <div className="flex items-center gap-2.5 bg-[#141519]/90 backdrop-blur-md border border-white/10 rounded-2xl px-3.5 py-2">
            <div className="w-7 h-7 rounded-xl bg-[#00E676]/10 border border-[#00E676]/30 flex items-center justify-center text-[#00E676]">
              <Sparkles className="w-3.5 h-3.5" />
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

      {/* Bottom Sheet Modal Container */}
      <div className="relative z-20 mt-auto">
        <div className="bg-[#141519]/98 backdrop-blur-2xl border-t border-white/10 rounded-t-[32px] px-6 pt-3 pb-4 shadow-[0_-12px_40px_rgba(0,0,0,0.85)] flex flex-col gap-3.5">
          {/* Sheet Handle + Fechar */}
          <div className="flex items-center justify-between -mt-1 mb-0.5">
            <div className="w-6" />
            <div className="w-12 h-1.5 bg-zinc-700/80 rounded-full" />
            <button
              type="button"
              onClick={onClose || (() => onDecline(gig))}
              className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Badges / Tags */}
          <div className="flex items-center gap-2.5">
            <span className="bg-[#00E676]/15 border border-[#00E676]/40 text-[#00E676] text-[11px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider">
              {gig.profession}
            </span>
            <span className="bg-[#202227] text-zinc-300 text-[11px] font-medium px-3 py-1 rounded-full border border-white/5">
              {gig.distance}
            </span>
          </div>

          {/* Venue Name & Details */}
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight leading-tight">
              {gig.venueName}
            </h2>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-zinc-400">
              <span className="text-[#00E676] flex items-center gap-1 font-bold">
                <Star className="w-3.5 h-3.5 fill-[#00E676] text-[#00E676]" />
                {gig.rating.toFixed(1)}
              </span>
              <span>•</span>
              <span>{gig.neighborhood}</span>
            </div>
          </div>

          {/* Rate & Shift Grid */}
          <div className="bg-[#1A1C22]/80 border border-white/5 rounded-2xl p-3.5 flex items-center justify-between">
            {/* Valor do Turno */}
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                VALOR DO TURNO
              </span>
              <span className="text-2xl font-black text-[#00E676] tracking-tight mt-0.5">
                {gig.rateFormatted}
              </span>
            </div>

            {/* Divisor */}
            <div className="w-px h-10 bg-white/10" />

            {/* Horário */}
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                HORÁRIO
              </span>
              <span className="text-sm font-bold text-white mt-0.5">
                {gig.shiftTime}
              </span>
              <span className="text-[11px] text-zinc-400">
                {gig.shiftDuration}
              </span>
            </div>
          </div>

          {/* Speckit Microtraining Card */}
          <div className="bg-[#181B20] border border-white/5 rounded-2xl p-3 text-left flex flex-col gap-1.5">
            {/* Header Badge */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-[#00E676]/15 border border-[#00E676]/40 flex items-center justify-center text-[#00E676]">
                <ShieldAlert className="w-3 h-3" />
              </div>
              <span className="text-[11px] font-extrabold uppercase text-[#00E676] tracking-wider">
                {gig.microtraining.title}
              </span>
            </div>

            {/* Rules Title & Desc */}
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">
                {gig.microtraining.rulesTitle}
              </h4>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                {gig.microtraining.description}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-0.5">
            <PrimaryButton onClick={() => onAccept(gig)}>
              ACEITAR TAXA ({gig.rateFormatted})
            </PrimaryButton>

            <button
              type="button"
              onClick={() => onDecline(gig)}
              className="w-full py-2 text-xs text-zinc-400 hover:text-white font-medium transition-colors cursor-pointer"
            >
              Recusar Proposta
            </button>
          </div>
        </div>

        {/* Bottom Home Indicator */}
        <HomeIndicator className="bg-[#141519]/98" />
      </div>
    </div>
  );
};
