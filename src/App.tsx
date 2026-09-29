import { useState } from 'react';
import { Layers, Smartphone, Code, CheckCircle2, RotateCcw } from 'lucide-react';
import { MobileFrame } from './components/MobileFrame';
import { LoginScreen } from './screens/LoginScreen';
import { CadastroScreen } from './screens/CadastroScreen';
import { MapDashboardScreen } from './screens/MapDashboardScreen';
import { GigOfferBottomSheet } from './screens/GigOfferBottomSheet';
import { CodeViewerModal } from './components/CodeViewerModal';
import { mockGigs } from './data/mockGigs';
import { GigOffer, ScreenType } from './types';

export default function App() {
  const [viewMode, setViewMode] = useState<'side-by-side' | 'interactive'>('side-by-side');
  const [activeScreen, setActiveScreen] = useState<ScreenType>('map-dashboard');
  const [selectedGig, setSelectedGig] = useState<GigOffer>(mockGigs[0]);
  const [isOnline, setIsOnline] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSelectGig = (gig: GigOffer) => {
    setSelectedGig(gig);
    if (viewMode === 'interactive') {
      setActiveScreen('gig-offer-bottom-sheet');
    }
  };

  const handleAcceptGig = (gig: GigOffer) => {
    showToast(`🎉 Turno confirmado em ${gig.venueName}! Taxa: ${gig.rateFormatted}`);
    if (viewMode === 'interactive') {
      setActiveScreen('map-dashboard');
    }
  };

  const handleDeclineGig = (gig: GigOffer) => {
    showToast(`Proposta de ${gig.venueName} recusada.`);
    if (viewMode === 'interactive') {
      setActiveScreen('map-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#07080A] text-white flex flex-col font-sans selection:bg-[#00E676] selection:text-black">
      {/* Top Application Bar */}
      <header className="sticky top-0 z-50 bg-[#0E1015]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#00E676] text-black font-black flex items-center justify-center text-sm shadow-[0_0_15px_rgba(0,230,118,0.5)]">
            T
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-base text-white">TRAMPO</span>
              <span className="text-[10px] font-black uppercase bg-[#00E676]/15 text-[#00E676] px-1.5 py-0.5 rounded border border-[#00E676]/30">
                CWB
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Interface Mobile em React, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-[#15171E] p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setViewMode('side-by-side')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'side-by-side'
                ? 'bg-[#00E676] text-black shadow-[0_0_12px_rgba(0,230,118,0.35)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Visão Lado a Lado (4 Telas)</span>
          </button>

          <button
            onClick={() => setViewMode('interactive')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'interactive'
                ? 'bg-[#00E676] text-black shadow-[0_0_12px_rgba(0,230,118,0.35)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Simulador 1:1</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsCodeModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1B1E26] hover:bg-[#252934] border border-white/10 text-xs font-semibold text-zinc-200 transition-colors cursor-pointer"
          >
            <Code className="w-3.5 h-3.5 text-[#00E676]" />
            <span>Ver Código dos Componentes</span>
          </button>
        </div>
      </header>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 bg-[#16181F] border border-[#00E676] text-white px-5 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#00E676] shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 p-4 sm:p-8 flex flex-col justify-center items-center overflow-x-auto">
        {viewMode === 'side-by-side' ? (
          /* SIDE BY SIDE MODE: Exact representation of the 4 screens in the user's mockup */
          <div className="w-full max-w-[1580px] mx-auto">
            <div className="flex flex-col mb-6 text-left">
              <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>Layout dos 4 Componentes de Tela</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                  Dark Mode (#0E0F12 / #00E676)
                </span>
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Fidelidade visual máxima com os designs fornecidos. Clique nas vagas no mapa para abrir os detalhes ou alterne para o Simulador 1:1.
              </p>
            </div>

            {/* Horizontal scroll container with the 4 devices */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 justify-items-center">
              {/* Screen 1: map-dashboard */}
              <MobileFrame title="map-dashboard">
                <MapDashboardScreen
                  gigs={mockGigs}
                  selectedGigId={selectedGig.id}
                  onSelectGig={(gig) => {
                    setSelectedGig(gig);
                    showToast(`Vaga selecionada: ${gig.venueName} (${gig.rateFormatted})`);
                  }}
                  isOnline={isOnline}
                  onToggleOnline={() => {
                    setIsOnline(!isOnline);
                    showToast(!isOnline ? '🟢 Você agora está ONLINE!' : '🔴 Você está OFFLINE');
                  }}
                />
              </MobileFrame>

              {/* Screen 2: gig-offer-bottom-sheet */}
              <MobileFrame title="gig-offer-bottom-sheet">
                <GigOfferBottomSheet
                  gig={selectedGig}
                  allGigs={mockGigs}
                  onAccept={handleAcceptGig}
                  onDecline={handleDeclineGig}
                />
              </MobileFrame>

              {/* Screen 3: login-screen */}
              <MobileFrame title="login-screen">
                <LoginScreen
                  onNavigateToCadastro={() => {
                    setViewMode('interactive');
                    setActiveScreen('cadastro-screen');
                  }}
                  onLoginSuccess={() => {
                    showToast('Login efetuado com sucesso!');
                    setViewMode('interactive');
                    setActiveScreen('map-dashboard');
                  }}
                />
              </MobileFrame>

              {/* Screen 4: cadastro-screen */}
              <MobileFrame title="cadastro-screen">
                <CadastroScreen
                  onNavigateToLogin={() => {
                    setViewMode('interactive');
                    setActiveScreen('login-screen');
                  }}
                  onCadastroSuccess={() => {
                    showToast('Conta criada com sucesso!');
                    setViewMode('interactive');
                    setActiveScreen('map-dashboard');
                  }}
                />
              </MobileFrame>
            </div>
          </div>
        ) : (
          /* INTERACTIVE 1:1 SIMULATOR MODE */
          <div className="flex flex-col items-center gap-5 w-full max-w-lg my-2">
            {/* Screen Selector Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 bg-[#14161C] p-1.5 rounded-2xl border border-white/10">
              <button
                onClick={() => setActiveScreen('login-screen')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeScreen === 'login-screen'
                    ? 'bg-[#00E676] text-black shadow-[0_0_10px_rgba(0,230,118,0.3)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                1. Login
              </button>

              <button
                onClick={() => setActiveScreen('cadastro-screen')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeScreen === 'cadastro-screen'
                    ? 'bg-[#00E676] text-black shadow-[0_0_10px_rgba(0,230,118,0.3)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                2. Cadastro
              </button>

              <button
                onClick={() => setActiveScreen('map-dashboard')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeScreen === 'map-dashboard'
                    ? 'bg-[#00E676] text-black shadow-[0_0_10px_rgba(0,230,118,0.3)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                3. Mapa
              </button>

              <button
                onClick={() => setActiveScreen('gig-offer-bottom-sheet')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeScreen === 'gig-offer-bottom-sheet'
                    ? 'bg-[#00E676] text-black shadow-[0_0_10px_rgba(0,230,118,0.3)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                4. Oferta Modal
              </button>
            </div>

            {/* Interactive Single Screen */}
            <MobileFrame title={activeScreen}>
              {activeScreen === 'login-screen' && (
                <LoginScreen
                  onNavigateToCadastro={() => setActiveScreen('cadastro-screen')}
                  onLoginSuccess={() => {
                    showToast('Bem-vindo ao Trampo CWB!');
                    setActiveScreen('map-dashboard');
                  }}
                />
              )}

              {activeScreen === 'cadastro-screen' && (
                <CadastroScreen
                  onNavigateToLogin={() => setActiveScreen('login-screen')}
                  onCadastroSuccess={() => {
                    showToast('Cadastro realizado com sucesso!');
                    setActiveScreen('map-dashboard');
                  }}
                />
              )}

              {activeScreen === 'map-dashboard' && (
                <MapDashboardScreen
                  gigs={mockGigs}
                  selectedGigId={selectedGig.id}
                  onSelectGig={handleSelectGig}
                  isOnline={isOnline}
                  onToggleOnline={() => {
                    setIsOnline(!isOnline);
                    showToast(!isOnline ? '🟢 Você agora está ONLINE!' : '🔴 Você está OFFLINE');
                  }}
                />
              )}

              {activeScreen === 'gig-offer-bottom-sheet' && (
                <GigOfferBottomSheet
                  gig={selectedGig}
                  allGigs={mockGigs}
                  onAccept={handleAcceptGig}
                  onDecline={handleDeclineGig}
                />
              )}
            </MobileFrame>

            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <span>Dica: clique nas vagas no mapa para acionar o modal da oferta.</span>
              <button
                onClick={() => {
                  setIsOnline(false);
                  setSelectedGig(mockGigs[0]);
                  setActiveScreen('login-screen');
                }}
                className="flex items-center gap-1 hover:text-[#00E676] cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reiniciar Fluxo</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Code Viewer Modal */}
      <CodeViewerModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />
    </div>
  );
}
