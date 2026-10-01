import React from 'react';
import { Wine, Utensils } from 'lucide-react';
import { GigOffer } from '../../types';

interface GigMarkerProps {
  gig: GigOffer;
  isSelected?: boolean;
  onClick: (gig: GigOffer) => void;
}

export const GigMarker: React.FC<GigMarkerProps> = ({
  gig,
  isSelected = false,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(gig)}
      style={{
        left: `${gig.coords.x}%`,
        top: `${gig.coords.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      className="absolute z-20 cursor-pointer group select-none transition-transform duration-300"
    >
      {/* Halo de pulso suave (gentle pulsing aura) */}
      <span className="absolute -inset-1.5 rounded-full bg-[#00E676]/30 animate-marker-aura pointer-events-none" />

      {/* Chip badge com efeito de pulso suave contínuo */}
      <div
        className={`
          relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300
          animate-marker-gentle-pulse
          ${
            isSelected
              ? 'bg-[#00E676] text-black shadow-[0_0_24px_rgba(0,230,118,0.85)] ring-2 ring-white font-black'
              : 'bg-[#141519]/95 text-white border border-[#00E676] shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:border-[#00FF77] hover:scale-110'
          }
        `}
      >
        {/* Ícone */}
        <span
          className={`flex items-center justify-center ${
            isSelected ? 'text-black' : 'text-[#00E676]'
          }`}
        >
          {gig.profession === 'Bartender' ? (
            <Wine className="w-3 h-3" />
          ) : (
            <Utensils className="w-3 h-3" />
          )}
        </span>

        {/* Profissão & Taxa */}
        <span className="font-semibold tracking-tight">{gig.profession}</span>
        <span
          className={`font-black ${
            isSelected ? 'text-black' : 'text-[#00E676]'
          }`}
        >
          R$ {gig.rate}
        </span>
      </div>

      {/* Triângulo / Ponta do Pin indicador */}
      <div
        className={`w-0 h-0 mx-auto border-l-4 border-l-transparent border-r-4 border-r-transparent ${
          isSelected ? 'border-t-4 border-t-[#00E676]' : 'border-t-4 border-t-[#141519]'
        }`}
      />
    </div>
  );
};
