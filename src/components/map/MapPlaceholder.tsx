import React from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  ColorScheme
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

// Estilo noturno de alto contraste ultra-dark para o Google Maps (#0A0B0E / #121418 / #00E676)
const darkMapStyles: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#0d1017' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#090b10' }, { weight: 3 }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#e2e8f0' }],
  },
  {
    featureType: 'administrative.neighborhood',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#00E676' }, { opacity: 0.85 }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#00E676' }, { visibility: 'simplified' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#0c2419' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#00E676' }, { opacity: 0.8 }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#171c26' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#10141c' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#222938' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#00E676' }, { opacity: 0.35 }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#19202c' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#06080b' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#334155' }],
  },
];

// Posição central de Curitiba (Praça Tiradentes / Batel)
const CURITIBA_CENTER = { lat: -25.4372, lng: -49.2785 };
const USER_LOCATION = { lat: -25.4390, lng: -49.2810 };

export const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  gigs,
  selectedGigId,
  onSelectGig,
  isOnline = false,
}) => {
  const apiKey = GOOGLE_MAPS_API_KEY;

  // Visualização de fallback escuro SVG com os marcadores de vagas
  const renderFallbackVectorMap = () => (
    <div className="relative w-full h-full min-h-[400px] overflow-hidden bg-[#0c0f14] select-none">
      <svg
        className="absolute inset-0 w-full h-full opacity-60"
        viewBox="0 0 800 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="100%" height="100%" fill="#0c0e13" />
        <circle cx="400" cy="400" r="380" fill="#00E676" fillOpacity="0.05" />
        <path d="M -50 380 Q 400 440 850 620" stroke="#00E676" strokeWidth="4" strokeOpacity="0.4" fill="none" />
        <path d="M 400 -50 Q 380 380 360 850" stroke="#00E676" strokeWidth="4" strokeOpacity="0.4" fill="none" />
        <path d="M 120 750 Q 450 320 720 100" stroke="#1c2230" strokeWidth="6" fill="none" />
        <circle cx="400" cy="400" r="12" fill="#00E676" fillOpacity="0.8" />
      </svg>
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

  return (
    <div 
      className="relative w-full h-full min-h-[400px] overflow-hidden bg-[#0c0f14] select-none"
      style={{ width: '100%', height: '100%' }}
    >
      <APIProvider 
        apiKey={apiKey}
        onLoad={() => console.log('Google Maps API Loaded successfully')}
      >
        <Map
          mapId="DEMO_MAP_ID"
          colorScheme={ColorScheme.DARK}
          defaultCenter={CURITIBA_CENTER}
          defaultZoom={13.5}
          gestureHandling="greedy"
          disableDefaultUI={true}
          styles={darkMapStyles}
          className="w-full h-full"
          style={{ width: '100%', height: '100%', minHeight: '100%' }}
          reuseMaps={true}
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

          {/* Marcadores Interativos Reais no Google Maps com Taxas */}
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
                    className={`flex flex-col items-center cursor-pointer transition-all duration-300 transform hover:scale-110 select-none ${
                      isSelected ? 'scale-110 z-30' : 'z-10'
                    }`}
                  >
                    {/* Badge com Taxa e Nome */}
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-2xl border transition-all ${
                        isSelected
                          ? 'bg-[#00E676] text-black border-white font-black shadow-[0_0_20px_rgba(0,230,118,0.7)]'
                          : 'bg-[#141519]/95 text-white border-white/20 hover:border-[#00E676]'
                      }`}
                    >
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#00E676] bg-black/50 px-1.5 py-0.5 rounded">
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
      </APIProvider>
    </div>
  );
};
