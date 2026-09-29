import React from 'react';
import { 
  Star, 
  Settings, 
  History, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Award, 
  TrendingUp, 
  ShieldCheck 
} from 'lucide-react';
import { StatusBar } from '../components/ui/StatusBar';
import { HomeIndicator } from '../components/ui/HomeIndicator';

interface ProfileScreenProps {
  onOpenSettings?: () => void;
  onLogout?: () => void;
  onViewHistory?: () => void;
  onHelpCenter?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onOpenSettings,
  onLogout,
  onViewHistory,
  onHelpCenter,
}) => {
  return (
    <div className="w-full h-full min-h-[720px] bg-[#0E0F12] text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Top Status Bar */}
      <StatusBar time="9:41" />

      {/* Main Content Area */}
      <div className="flex-1 px-5 pt-2 pb-24 overflow-y-auto space-y-5">
        {/* Header: User Avatar, Name, Rating */}
        <div className="flex flex-col items-center text-center pt-2">
          <div className="relative mb-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
              alt="Avatar do Freelancer"
              className="w-24 h-24 rounded-full object-cover border-3 border-[#00E676] shadow-[0_0_20px_rgba(0,230,118,0.35)]"
            />
            <div className="absolute -bottom-1.5 right-1 bg-[#1C1C1E] border border-white/10 p-1.5 rounded-full shadow-md">
              <ShieldCheck className="w-4 h-4 text-[#00E676]" />
            </div>
          </div>

          <h2 className="text-xl font-black tracking-tight text-white">
            Gabriel Silva
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Bartender & Garçom Pro • Curitiba, PR
          </p>

          {/* Rating Pill */}
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1C1E] border border-white/10 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-black text-white">4.9</span>
            <span className="text-[10px] text-zinc-400 font-medium">(128 avaliações)</span>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2.5 px-1">
            Estatísticas Rápidas
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {/* Completed Gigs */}
            <div className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Taxas Concluídas
                </span>
                <div className="w-7 h-7 rounded-xl bg-[#00E676]/10 flex items-center justify-center text-[#00E676]">
                  <Award className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black text-white tracking-tight">
                  84
                </span>
                <span className="text-[10px] text-[#00E676] font-semibold block mt-0.5">
                  +6 esta semana
                </span>
              </div>
            </div>

            {/* Week Earnings */}
            <div className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Ganhos da Semana
                </span>
                <div className="w-7 h-7 rounded-xl bg-[#00E676]/10 flex items-center justify-center text-[#00E676]">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black text-[#00E676] tracking-tight">
                  R$ 1.280
                </span>
                <span className="text-[10px] text-zinc-400 font-medium block mt-0.5">
                  Meta: R$ 1.500
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Navigation List (Mobile list-group) */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2.5 px-1">
            Conta & Preferências
          </h3>
          <div className="bg-[#1C1C1E] border border-white/5 rounded-2xl overflow-hidden shadow-sm divide-y divide-white/5">
            {/* Settings */}
            <button
              type="button"
              onClick={onOpenSettings}
              className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-white/[0.03] transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-zinc-300">
                  <Settings className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-white">Configurações</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </button>

            {/* Repasses History */}
            <button
              type="button"
              onClick={onViewHistory}
              className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-white/[0.03] transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-zinc-300">
                  <History className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-white">Histórico de Repasses</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </button>

            {/* Help Center */}
            <button
              type="button"
              onClick={onHelpCenter}
              className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-white/[0.03] transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-zinc-300">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-white">Central de Ajuda</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </button>

            {/* Logout button */}
            <button
              type="button"
              onClick={onLogout}
              className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-red-500/10 transition-colors cursor-pointer text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                  <LogOut className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-red-400 group-hover:text-red-300">
                  Sair da Conta
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-red-400/50" />
            </button>
          </div>
        </div>
      </div>

      <HomeIndicator />
    </div>
  );
};
