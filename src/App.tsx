import { useState, useMemo } from 'react';
import { 
  Smartphone, 
  Layers, 
  Code, 
  CheckCircle2, 
  RotateCcw, 
  Map, 
  Wallet, 
  User, 
  ArrowLeft,
  Navigation,
  Sliders,
  Sparkles
} from 'lucide-react';
import { MobileFrame } from './components/MobileFrame';
import { LoginScreen } from './screens/LoginScreen';
import { CadastroScreen } from './screens/CadastroScreen';
import { MapDashboardScreen } from './screens/MapDashboardScreen';
import { GigOfferBottomSheet } from './screens/GigOfferBottomSheet';
import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { ActiveGigScreen } from './screens/ActiveGigScreen';
import { BottomNavigation } from './components/navigation/BottomNavigation';
import { CodeViewerModal } from './components/CodeViewerModal';
import { mockGigs } from './data/mockGigs';
import { GigOffer, ScreenType, NavTab } from './types';

export default function App() {
  // Modo de exibição: Simulador Interativo Contínuo (padrão) ou Visão Panorâmica de Telas
  const [viewMode, setViewMode] = useState<'interactive-app' | 'overview'>('interactive-app');

  // Estado do Freelancer e do App
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('map-dashboard');
  const [activeNavTab, setActiveNavTab] = useState<NavTab>('map');
  const [selectedGig, setSelectedGig] = useState<GigOffer>(mockGigs[0]);
  const [isOnline, setIsOnline] = useState(true);
  const [activeShiftGig, setActiveShiftGig] = useState<GigOffer | null>(null);

  // Preferências configuráveis
  const [userSettings, setUserSettings] = useState({
    bartenderActive: true,
    garcomActive: true,
    maxDistanceKm: 10,
  });

  // Notificações Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Filtragem das vagas no mapa baseada nas configurações de profissão e distância
  const filteredGigs = useMemo(() => {
    return mockGigs.filter((gig) => {
      if (gig.profession === 'Bartender' && !userSettings.bartenderActive) return false;
      if (gig.profession === 'Garçom' && !userSettings.garcomActive) return false;
      return true;
    });
  }, [userSettings]);

  // Transições de fluxo:
  // 1. Clicar em vaga no mapa -> abre o modal de detalhes
  const handleSelectGig = (gig: GigOffer) => {
    setSelectedGig(gig);
    setCurrentScreen('gig-offer-bottom-sheet');
  };

  // 2. Aceitar taxa -> inicia turno em andamento na ActiveGigScreen
  const handleAcceptGig = (gig: GigOffer) => {
    setActiveShiftGig(gig);
    setCurrentScreen('active-gig-screen');
    showToast(`🚀 Turno aceito! Indo para ${gig.venueName} (${gig.rateFormatted})`);
  };

  // 3. Recusar proposta ou fechar modal -> volta para o mapa
  const handleDeclineGig = (gig: GigOffer) => {
    setCurrentScreen('map-dashboard');
    showToast(`Proposta de ${gig.venueName} recusada.`);
  };

  // 4. Finalizar turno -> repasse contabilizado, volta ao mapa
  const handleFinishShift = (gig: GigOffer) => {
    setActiveShiftGig(null);
    setCurrentScreen('map-dashboard');
    setActiveNavTab('map');
    showToast(`✅ Turno concluído com sucesso! ${gig.rateFormatted} transferidos via PIX.`);
  };

  // 5. Cancelar turno em andamento -> volta ao mapa
  const handleCancelShift = () => {
    setActiveShiftGig(null);
    setCurrentScreen('map-dashboard');
    showToast('Turno cancelado. Vagas liberadas no mapa.');
  };

  // 6. Navegação pela barra inferior
  const handleNavTabChange = (tab: NavTab) => {
    setActiveNavTab(tab);
    if (tab === 'map') {
      if (activeShiftGig) {
        setCurrentScreen('active-gig-screen');
      } else {
        setCurrentScreen('map-dashboard');
      }
    } else if (tab === 'earnings') {
      setCurrentScreen('profile-screen');
      showToast('Ganhos: R$ 1.280 acumulados esta semana');
    } else if (tab === 'profile') {
      setCurrentScreen('profile-screen');
    }
  };

  // 7. Login / Logout
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentScreen('map-dashboard');
    setActiveNavTab('map');
    showToast('Bem-vindo de volta, Gabriel Silva!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login-screen');
    showToast('Você saiu da sua conta.');
  };

  // Telas que exibem a BottomNavigation
  const showBottomNav = 
    isLoggedIn && 
    (currentScreen === 'map-dashboard' || currentScreen === 'profile-screen');

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
              Fluxo 100% Interativo Integrado • Dark Mode & #00E676
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-[#15171E] p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setViewMode('interactive-app')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'interactive-app'
                ? 'bg-[#00E676] text-black shadow-[0_0_12px_rgba(0,230,118,0.35)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>App Interativo Único</span>
          </button>

          <button
            onClick={() => setViewMode('overview')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'overview'
                ? 'bg-[#00E676] text-black shadow-[0_0_12px_rgba(0,230,118,0.35)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Visão Panorâmica de Telas</span>
          </button>
        </div>

        {/* Code Button */}
        <button
          onClick={() => setIsCodeModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1B1E26] hover:bg-[#252934] border border-white/10 text-xs font-semibold text-zinc-200 transition-colors cursor-pointer"
        >
          <Code className="w-3.5 h-3.5 text-[#00E676]" />
          <span>Ver Código (.tsx)</span>
        </button>
      </header>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 bg-[#16181F] border border-[#00E676] text-white px-5 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#00E676] shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Main Experience */}
      <main className="flex-1 p-4 sm:p-8 flex flex-col justify-center items-center overflow-x-auto">
        {viewMode === 'interactive-app' ? (
          /* ========================================================= */
          /* MODO INTERATIVO PRINCIPAL (UM ÚNICO MAPA E FLUXO NATURAL) */
          /* ========================================================= */
          <div className="flex flex-col items-center gap-4 w-full max-w-lg my-1">
            {/* Quick Flow Direct Jump Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 bg-[#14161C] p-1.5 rounded-2xl border border-white/10 max-w-full">
              <button
                onClick={() => setCurrentScreen('map-dashboard')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentScreen === 'map-dashboard'
                    ? 'bg-[#00E676] text-black shadow-[0_0_10px_rgba(0,230,118,0.3)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Map className="w-3 h-3" />
                <span>Mapa</span>
              </button>

              <button
                onClick={() => setCurrentScreen('gig-offer-bottom-sheet')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentScreen === 'gig-offer-bottom-sheet'
                    ? 'bg-[#00E676] text-black shadow-[0_0_10px_rgba(0,230,118,0.3)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Oferta</span>
              </button>

              <button
                onClick={() => setCurrentScreen('active-gig-screen')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentScreen === 'active-gig-screen'
                    ? 'bg-[#00E676] text-black shadow-[0_0_10px_rgba(0,230,118,0.3)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Navigation className="w-3 h-3" />
                <span>Em Andamento</span>
              </button>

              <button
                onClick={() => {
                  setCurrentScreen('profile-screen');
                  setActiveNavTab('profile');
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentScreen === 'profile-screen'
                    ? 'bg-[#00E676] text-black shadow-[0_0_10px_rgba(0,230,118,0.3)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <User className="w-3 h-3" />
                <span>Perfil</span>
              </button>

              <button
                onClick={() => setCurrentScreen('settings-screen')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentScreen === 'settings-screen'
                    ? 'bg-[#00E676] text-black shadow-[0_0_10px_rgba(0,230,118,0.3)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3 h-3" />
                <span>Config</span>
              </button>

              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setCurrentScreen('login-screen');
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentScreen === 'login-screen' || currentScreen === 'cadastro-screen'
                    ? 'bg-[#00E676] text-black'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Auth</span>
              </button>
            </div>

            {/* Mobile Device Container */}
            <MobileFrame title={currentScreen}>
              <div className="relative w-full h-full flex flex-col overflow-hidden">
                {/* 1. Tela de Login */}
                {currentScreen === 'login-screen' && (
                  <LoginScreen
                    onNavigateToCadastro={() => setCurrentScreen('cadastro-screen')}
                    onLoginSuccess={handleLoginSuccess}
                  />
                )}

                {/* 2. Tela de Cadastro */}
                {currentScreen === 'cadastro-screen' && (
                  <CadastroScreen
                    onNavigateToLogin={() => setCurrentScreen('login-screen')}
                    onCadastroSuccess={handleLoginSuccess}
                  />
                )}

                {/* 3. Mapa Principal (Único Mapa) */}
                {currentScreen === 'map-dashboard' && (
                  <MapDashboardScreen
                    gigs={filteredGigs}
                    selectedGigId={selectedGig.id}
                    onSelectGig={handleSelectGig}
                    isOnline={isOnline}
                    onToggleOnline={() => {
                      setIsOnline(!isOnline);
                      showToast(!isOnline ? '🟢 Você agora está ONLINE!' : '🔴 Você está OFFLINE');
                    }}
                    onOpenProfile={() => {
                      setCurrentScreen('profile-screen');
                      setActiveNavTab('profile');
                    }}
                    onOpenEarnings={() => {
                      setCurrentScreen('profile-screen');
                      setActiveNavTab('earnings');
                    }}
                    hasBottomNav={true}
                  />
                )}

                {/* 4. Detalhes da Oferta (Bottom Sheet sobre o mapa) */}
                {currentScreen === 'gig-offer-bottom-sheet' && (
                  <GigOfferBottomSheet
                    gig={selectedGig}
                    allGigs={filteredGigs}
                    onAccept={handleAcceptGig}
                    onDecline={handleDeclineGig}
                    onClose={() => setCurrentScreen('map-dashboard')}
                  />
                )}

                {/* 5. Serviço em Andamento */}
                {currentScreen === 'active-gig-screen' && (
                  <ActiveGigScreen
                    gig={activeShiftGig || selectedGig}
                    onFinishShift={handleFinishShift}
                    onOpenNavigation={() => {
                      showToast('Iniciando GPS no Waze / Google Maps...');
                    }}
                    onCancelGig={handleCancelShift}
                  />
                )}

                {/* 6. Perfil */}
                {currentScreen === 'profile-screen' && (
                  <ProfileScreen
                    onOpenSettings={() => setCurrentScreen('settings-screen')}
                    onLogout={handleLogout}
                    onViewHistory={() => showToast('84 repasses realizados via PIX com sucesso.')}
                    onHelpCenter={() => showToast('Suporte 24h Trampo CWB: WhatsApp (41) 98888-0000')}
                  />
                )}

                {/* 7. Configurações */}
                {currentScreen === 'settings-screen' && (
                  <SettingsScreen
                    onBack={() => setCurrentScreen('profile-screen')}
                    onSave={(newSettings) => {
                      setUserSettings(newSettings);
                      showToast(
                        `Preferências atualizadas! Raio: ${newSettings.maxDistanceKm}km | Bartender: ${
                          newSettings.bartenderActive ? 'ON' : 'OFF'
                        } | Garçom: ${newSettings.garcomActive ? 'ON' : 'OFF'}`
                      );
                    }}
                  />
                )}

                {/* Barra de Navegação Inferior integrada quando aplicável */}
                {showBottomNav && (
                  <BottomNavigation
                    activeTab={activeNavTab}
                    onTabChange={handleNavTabChange}
                    className="absolute"
                  />
                )}
              </div>
            </MobileFrame>

            {/* Quick Helper Instructions */}
            <div className="flex items-center justify-between w-full max-w-sm px-2 text-xs text-zinc-400">
              <span>💡 Toque nos marcadores do mapa para interagir</span>
              <button
                onClick={() => {
                  setIsLoggedIn(true);
                  setIsOnline(true);
                  setSelectedGig(mockGigs[0]);
                  setActiveShiftGig(null);
                  setCurrentScreen('map-dashboard');
                  setActiveNavTab('map');
                  showToast('Fluxo reiniciado no Mapa!');
                }}
                className="flex items-center gap-1 text-zinc-400 hover:text-[#00E676] cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reiniciar</span>
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* MODO PANORÂMICO: VISÃO CONJUNTA DAS TELAS (SEM DUPLICATAS) */
          /* ========================================================= */
          <div className="w-full max-w-[1600px] mx-auto">
            <div className="flex flex-col mb-6 text-left">
              <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>Catálogo Completo das Interfaces do Trampo CWB</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30">
                  Sem mapas duplicados • 100% Interconectado
                </span>
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Todas as telas estão conectadas. Você pode interagir em qualquer uma delas ou alternar para o <strong>App Interativo Único</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 pb-8 justify-items-center">
              {/* 1. MAPA PRINCIPAL COM BOTTOM NAVIGATION */}
              <MobileFrame title="1. Mapa Principal + Nav">
                <div className="relative w-full h-full">
                  <MapDashboardScreen
                    gigs={filteredGigs}
                    selectedGigId={selectedGig.id}
                    onSelectGig={(gig) => {
                      setSelectedGig(gig);
                      setViewMode('interactive-app');
                      setCurrentScreen('gig-offer-bottom-sheet');
                    }}
                    isOnline={isOnline}
                    onToggleOnline={() => setIsOnline(!isOnline)}
                    onOpenProfile={() => {
                      setViewMode('interactive-app');
                      setCurrentScreen('profile-screen');
                    }}
                    hasBottomNav={true}
                  />
                  <BottomNavigation
                    activeTab={activeNavTab}
                    onTabChange={(tab) => {
                      setActiveNavTab(tab);
                      if (tab === 'profile' || tab === 'earnings') {
                        setViewMode('interactive-app');
                        setCurrentScreen('profile-screen');
                      }
                    }}
                    className="absolute"
                  />
                </div>
              </MobileFrame>

              {/* 2. OFERTA / BOTTOM SHEET */}
              <MobileFrame title="2. Detalhes da Oferta">
                <GigOfferBottomSheet
                  gig={selectedGig}
                  allGigs={filteredGigs}
                  onAccept={(gig) => {
                    handleAcceptGig(gig);
                    setViewMode('interactive-app');
                  }}
                  onDecline={handleDeclineGig}
                  onClose={() => {
                    setViewMode('interactive-app');
                    setCurrentScreen('map-dashboard');
                  }}
                />
              </MobileFrame>

              {/* 3. TURNO EM ANDAMENTO */}
              <MobileFrame title="3. Turno em Andamento">
                <ActiveGigScreen
                  gig={activeShiftGig || selectedGig}
                  onFinishShift={(gig) => {
                    handleFinishShift(gig);
                    setViewMode('interactive-app');
                  }}
                  onOpenNavigation={() => showToast('Abrindo GPS no Waze...')}
                  onCancelGig={handleCancelShift}
                />
              </MobileFrame>

              {/* 4. PERFIL DO FREELANCER */}
              <MobileFrame title="4. Perfil">
                <div className="relative w-full h-full">
                  <ProfileScreen
                    onOpenSettings={() => {
                      setViewMode('interactive-app');
                      setCurrentScreen('settings-screen');
                    }}
                    onLogout={handleLogout}
                    onViewHistory={() => showToast('Histórico: 84 repasses via PIX')}
                    onHelpCenter={() => showToast('Suporte aberto')}
                  />
                  <BottomNavigation
                    activeTab="profile"
                    onTabChange={handleNavTabChange}
                    className="absolute"
                  />
                </div>
              </MobileFrame>

              {/* 5. CONFIGURAÇÕES */}
              <MobileFrame title="5. Configurações">
                <SettingsScreen
                  onBack={() => {
                    setViewMode('interactive-app');
                    setCurrentScreen('profile-screen');
                  }}
                  onSave={(newSettings) => {
                    setUserSettings(newSettings);
                    showToast(`Raio atualizado para ${newSettings.maxDistanceKm} km!`);
                  }}
                />
              </MobileFrame>
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
