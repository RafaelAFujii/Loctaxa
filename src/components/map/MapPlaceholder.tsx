import React from 'react';
import {
  Map,
  AdvancedMarker,
  ColorScheme,
  useApiIsLoaded,
  useApiLoadingStatus,
  APILoadingStatus
} from '@vis.gl/react-google-maps';
import { GigOffer } from '../../types';
import { GigMarker } from './GigMarker';
import { GOOGLE_MAPS_API_KEY } from '../../constants/maps';

interface MapPlaceholderProps {
  gigs: GigOffer[];
  selectedGigId?: string;
  onSelectGig: (gig: GigOffer) => void;
  isOnline?: boolean;
}

// Posição central de Curitiba (Praça Tiradentes / Batel)
const CURITIBA_CENTER = { lat: -25.4372, lng: -49.2785 };
const USER_LOCATION = { lat: -25.4390, lng: -49.2810 };

export const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  gigs,
  selectedGigId,
  onSelectGig,
  isOnline = false,
}) => {
  const apiIsLoaded = useApiIsLoaded();
  const apiStatus = useApiLoadingStatus();
  const hasKey = Boolean(GOOGLE_MAPS_API_KEY);

  // Renderizador do mapa vetorial de Curitiba (usado como fallback e placeholder instantâneo para nunca ficar tela preta)
  const renderVectorCuritibaMap = () => (
    <div className="absolute inset-0 w-full h-full min-h-[500px] overflow-hidden bg-[#0c0f14] select-none pointer-events-auto">
      {/* Grade de ruas vetoriais estilizadas no tema escuro */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="100%" height="100%" fill="#0c0e13" />
        <circle cx="400" cy="400" r="380" fill="#00E676" fillOpacity="0.04" />
        <line x1="0" y1="200" x2="800" y2="200" stroke="#161c28" strokeWidth="2" />
        <line x1="0" y1="400" x2="800" y2="400" stroke="#1c2434" strokeWidth="4" />
        <line x1="0" y1="600" x2="800" y2="600" stroke="#161c28" strokeWidth="2" />
        <line x1="200" y1="0" x2="200" y2="800" stroke="#161c28" strokeWidth="2" />
        <line x1="400" y1="0" x2="400" y2="800" stroke="#1c2434" strokeWidth="4" />
        <line x1="600" y1="0" x2="600" y2="800" stroke="#161c28" strokeWidth="2" />
        {/* Vias arteriais simulando avenidas de Curitiba */}
        <path d="M -50 380 Q 400 440 850 620" stroke="#00E676" strokeWidth="4" strokeOpacity="0.5" fill="none" />
        <path d="M 400 -50 Q 380 380 360 850" stroke="#00E676" strokeWidth="4" strokeOpacity="0.5" fill="none" />
        <path d="M 120 750 Q 450 320 720 100" stroke="#1e293b" strokeWidth="5" fill="none" />
      </svg>

      {/* Marcador do Freelancer */}
      {isOnline && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <div className="relative flex items-center justify-center">
            <span className="w-8 h-8 rounded-full bg-[#00E676]/30 animate-ping absolute" />
            <div className="w-5 h-5 rounded-full bg-[#00E676] border-2 border-white shadow-[0_0_15px_#00E676] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-black" />
            </div>
          </div>
        </div>
      )}

      {/* Marcadores Interativos das Vagas com Animação Suave */}
      {isOnline &&
        gigs.map((gig) => (
          <GigMarker
            key={gig.id}
            gig={gig}
            isSelected={gig.id === selectedGigId}
            onClick={onSelectGig}
          />
        ))}
    </div>
  );

  // Se a chave não existir ou a API falhar completamente por bloqueio do navegador
  if (!hasKey || apiStatus === APILoadingStatus.FAILED) {
    return renderVectorCuritibaMap();
  }

  return (
    <div 
      className="relative w-full h-full min-h-[500px] overflow-hidden bg-[#0c0f14] select-none"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Background visual imediato enquanto o Google Maps inicializa os tiles para eliminar tela preta */}
      {!apiIsLoaded && renderVectorCuritibaMap()}

      {/* Container do Google Maps sempre ativo e redimensionado */}
      <Map
        id="main-dashboard-map"
        mapId="DEMO_MAP_ID"
        colorScheme={ColorScheme.DARK}
        defaultCenter={CURITIBA_CENTER}
        defaultZoom={13.5}
        gestureHandling="greedy"
        disableDefaultUI={true}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Marcador do Usuário (Freelancer) pulsando em Curitiba */}
        {isOnline && (
          <AdvancedMarker position={USER_LOCATION} title="Sua Localização Atual">
            <div className="relative flex items-center justify-center pointer-events-auto">
              <span className="w-8 h-8 rounded-full bg-[#00E676]/30 animate-ping absolute" />
              <div className="w-5 h-5 rounded-full bg-[#00E676] border-2 border-white shadow-[0_0_15px_#00E676] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-black" />
              </div>
            </div>
          </AdvancedMarker>
        )}

        {/* Marcadores Interativos no Google Maps com Efeito de Pulso Suave */}
        {isOnline &&
          gigs.map((gig) => {
            const isSelected = gig.id === selectedGigId;
            const position = gig.latLng || {
              lat: CURITIBA_CENTER.lat + (gig.coords.y - 50) * 0.001,
              lng: CURITIBA_CENTER.lng + (gig.coords.x - 50) * 0.001,
            };

            return (
              <AdvancedMarker
                key={gig.id}
                position={position}
                onClick={() => onSelectGig(gig)}
                title={`${gig.venueName} - ${gig.rateFormatted}`}
              >
                <div
                  className={`relative flex flex-col items-center cursor-pointer transition-transform duration-300 select-none ${
                    isSelected ? 'scale-110 z-30' : 'z-10 hover:scale-110'
                  }`}
                >
                  {/* Aura de pulso suave (gentle pulsing CSS animation) */}
                  <span className="absolute -inset-1.5 rounded-full bg-[#00E676]/25 animate-marker-aura pointer-events-none" />

                  {/* Badge com Taxa e Nome animada com gentle pulse */}
                  <div
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-2xl border transition-all animate-marker-gentle-pulse ${
                      isSelected
                        ? 'bg-[#00E676] text-black border-white font-black shadow-[0_0_24px_rgba(0,230,118,0.85)]'
                        : 'bg-[#141519]/95 text-white border-[#00E676]/80 hover:border-[#00E676]'
                    }`}
                  >
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#00E676] bg-black/60 px-1.5 py-0.5 rounded">
                      {gig.profession}
                    </span>
                    <span className={`text-xs font-black ${isSelected ? 'text-black' : 'text-[#00E676]'}`}>
                      {gig.rateFormatted}
                    </span>
                  </div>

                  {/* Triângulo / Pin indicador */}
                  <div
                    className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] -mt-0.5 ${
                      isSelected ? 'border-t-[#00E676]' : 'border-t-[#141519]'
                    }`}
                  />
                </div>
              </AdvancedMarker>
            );
          })}
      </Map>
    </div>
  );
};
