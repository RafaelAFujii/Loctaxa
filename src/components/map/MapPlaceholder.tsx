import React from 'react';
import { GigOffer } from '../../types';
import { GigMarker } from './GigMarker';

interface MapPlaceholderProps {
  gigs: GigOffer[];
  selectedGigId?: string;
  onSelectGig: (gig: GigOffer) => void;
  isOnline?: boolean;
}

export const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  gigs,
  selectedGigId,
  onSelectGig,
  isOnline = false,
}) => {
  return (
    <div className="map-placeholder relative w-full h-full overflow-hidden bg-[#0a0c10] select-none">
      {/* Dark map stylized vector background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-90"
        viewBox="0 0 400 700"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00E676" stopOpacity="0.12" />
            <stop offset="60%" stopColor="#00E676" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="roadGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E676" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#00FF88" stopOpacity="1" />
            <stop offset="100%" stopColor="#00E676" stopOpacity="0.8" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient map glow around center */}
        <circle cx="200" cy="350" r="280" fill="url(#mapGlow)" />

        {/* City Blocks / Buildings mesh subtle patterns */}
        <g stroke="#1a2228" strokeWidth="0.8" fill="none" opacity="0.45">
          <path d="M 40 80 L 120 70 L 150 140 L 60 150 Z" />
          <path d="M 160 80 L 260 60 L 280 130 L 170 140 Z" />
          <path d="M 280 90 L 370 80 L 380 160 L 290 170 Z" />
          <path d="M 50 190 L 140 180 L 130 270 L 40 260 Z" />
          <path d="M 270 190 L 360 180 L 370 280 L 280 290 Z" />
          <path d="M 50 330 L 120 320 L 110 420 L 40 430 Z" />
          <path d="M 280 340 L 360 330 L 370 450 L 290 460 Z" />
          <path d="M 60 480 L 150 470 L 130 580 L 40 590 Z" />
          <path d="M 260 490 L 360 480 L 350 600 L 250 610 Z" />
        </g>

        {/* Park areas (dark green silhouettes) */}
        <g fill="#0e2619" opacity="0.5">
          <path d="M 20 180 Q 70 160 90 220 Q 80 270 30 260 Z" />
          <path d="M 300 240 Q 370 220 380 290 Q 320 310 300 240 Z" />
          <path d="M 30 460 Q 80 430 70 510 Q 20 530 30 460 Z" />
        </g>

        {/* Secondary street grid */}
        <g stroke="#1e2d27" strokeWidth="1.2" opacity="0.75" fill="none">
          <path d="M -20 120 L 420 100" />
          <path d="M -20 220 L 420 190" />
          <path d="M -20 310 L 420 290" />
          <path d="M -20 420 L 420 400" />
          <path d="M -20 530 L 420 510" />
          <path d="M -20 620 L 420 600" />

          <path d="M 60 -20 L 80 720" />
          <path d="M 150 -20 L 140 720" />
          <path d="M 240 -20 L 250 720" />
          <path d="M 330 -20 L 340 720" />
        </g>

        {/* Major glowing thoroughfares (bright neon green arterials) */}
        <g stroke="url(#roadGlow)" fill="none" strokeLinecap="round" filter="url(#glow)">
          {/* Main diagonal arterial (like Av. Paulista / Batel) */}
          <path d="M -10 250 Q 180 320 410 440" strokeWidth="4.5" strokeOpacity="0.9" />
          {/* Secondary glowing artery */}
          <path d="M 210 -20 Q 195 240 185 720" strokeWidth="4" strokeOpacity="0.85" />
          {/* Connector loop */}
          <path d="M 60 140 C 140 190 280 220 340 310" strokeWidth="3" strokeOpacity="0.8" />
          {/* South bypass */}
          <path d="M 90 620 C 190 540 280 520 410 590" strokeWidth="3.5" strokeOpacity="0.8" />
          {/* North connector */}
          <path d="M 40 60 C 120 120 310 110 390 170" strokeWidth="2.5" strokeOpacity="0.75" />
        </g>

        {/* Glowing road centerlines */}
        <g stroke="#ffffff" strokeWidth="1" strokeDasharray="6 6" fill="none" opacity="0.6">
          <path d="M -10 250 Q 180 320 410 440" />
          <path d="M 210 -20 Q 195 240 185 720" />
        </g>

        {/* Topographic & landmark labels on map */}
        <g fill="#4e655c" fontSize="9" fontWeight="600" letterSpacing="1" fontFamily="sans-serif">
          <text x="35" y="215" opacity="0.65">PARQUE BARIGUI</text>
          <text x="75" y="325" opacity="0.7">BATEL</text>
          <text x="210" y="275" opacity="0.8">CENTRO CÍVICO</text>
          <text x="245" y="420" opacity="0.7">VILA IZABEL</text>
          <text x="50" y="505" opacity="0.6">ÁGUA VERDE</text>
          <text x="280" y="555" opacity="0.6">PORTÃO</text>
        </g>

        {/* User position radar pulse when online */}
        {isOnline && (
          <g>
            <circle cx="200" cy="350" r="18" fill="#00E676" fillOpacity="0.25" className="animate-ping" />
            <circle cx="200" cy="350" r="9" fill="#00E676" stroke="#ffffff" strokeWidth="2" />
          </g>
        )}
      </svg>

      {/* Floating Gig Markers */}
      {gigs.map((gig) => (
        <GigMarker
          key={gig.id}
          gig={gig}
          isSelected={gig.id === selectedGigId}
          onClick={onSelectGig}
        />
      ))}
    </div>
  );
};
