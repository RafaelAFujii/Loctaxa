import React, { useState } from 'react';
import { ChevronLeft, Sliders, Wine, Utensils, Bell, Shield, MapPin } from 'lucide-react';
import { StatusBar } from '../components/ui/StatusBar';
import { HomeIndicator } from '../components/ui/HomeIndicator';

interface SettingsScreenProps {
  onBack: () => void;
  onSave?: (settings: {
    bartenderActive: boolean;
    garcomActive: boolean;
    maxDistanceKm: number;
  }) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onBack,
  onSave,
}) => {
  // Mock states para preferências
  const [bartenderActive, setBartenderActive] = useState(true);
  const [garcomActive, setGarcomActive] = useState(true);
  const [maxDistanceKm, setMaxDistanceKm] = useState(10);
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxDistanceKm(Number(e.target.value));
  };

  const handleBack = () => {
    if (onSave) {
      onSave({ bartenderActive, garcomActive, maxDistanceKm });
    }
    onBack();
  };

  return (
    <div className="w-full h-full min-h-[720px] bg-[#0E0F12] text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Top Status Bar */}
      <StatusBar time="9:41" />

      {/* Header with Back Button */}
      <div className="px-5 pt-2 pb-3 flex items-center justify-between border-b border-white/5">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-1.5 py-1 px-2.5 -ml-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 text-[#00E676]" />
          <span className="text-xs font-semibold">Voltar</span>
        </button>

        <h1 className="text-base font-extrabold tracking-tight text-white">
          Configurações
        </h1>

        <div className="w-12" /> {/* Balance placeholder */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-5 py-4 overflow-y-auto space-y-6 pb-20">
        {/* Section 1: Preferências de Trabalho */}
        <div>
          <div className="flex items-center gap-2 mb-2 px-1">
            <Sliders className="w-3.5 h-3.5 text-[#00E676]" />
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Preferências de Trabalho
            </h3>
          </div>
          <p className="text-xs text-zinc-400 mb-3 px-1">
            Selecione quais tipos de vagas deseja receber no mapa de Curitiba. Você pode ativar ambas.
          </p>

          <div className="bg-[#1C1C1E] border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5 shadow-sm">
            {/* Toggle Bartender */}
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    bartenderActive
                      ? 'bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30'
                      : 'bg-white/5 text-zinc-400'
                  }`}
                >
                  <Wine className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Bartender</h4>
                  <p className="text-[11px] text-zinc-400">
                    Coquetelaria, drinks e bar principal
                  </p>
                </div>
              </div>

              {/* iOS Style Switch Toggle */}
              <button
                type="button"
                onClick={() => setBartenderActive(!bartenderActive)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  bartenderActive ? 'bg-[#00E676]' : 'bg-zinc-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    bartenderActive ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle Garçom */}
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    garcomActive
                      ? 'bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30'
                      : 'bg-white/5 text-zinc-400'
                  }`}
                >
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Garçom</h4>
                  <p className="text-[11px] text-zinc-400">
                    Atendimento de salão e praça
                  </p>
                </div>
              </div>

              {/* iOS Style Switch Toggle */}
              <button
                type="button"
                onClick={() => setGarcomActive(!garcomActive)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  garcomActive ? 'bg-[#00E676]' : 'bg-zinc-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    garcomActive ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Raio de Distância */}
        <div>
          <div className="flex items-center gap-2 mb-2 px-1">
            <MapPin className="w-3.5 h-3.5 text-[#00E676]" />
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Raio de Distância
            </h3>
          </div>

          <div className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-300 font-medium">
                Distância máxima de busca
              </span>
              <span className="text-sm font-extrabold text-[#00E676] bg-[#00E676]/10 px-2.5 py-0.5 rounded-full border border-[#00E676]/20">
                {maxDistanceKm} km
              </span>
            </div>

            {/* Slider range input */}
            <div className="py-2">
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={maxDistanceKm}
                onChange={handleSliderChange}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#00E676]"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-bold mt-1.5 px-0.5">
                <span>1 km</span>
                <span>5 km</span>
                <span>10 km</span>
                <span>15 km</span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-400">
              Vagas fora deste raio não emitirão notificações sonoras de alta prioridade.
            </p>
          </div>
        </div>

        {/* Extra: Alertas & Notificações */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2 px-1">
            Notificações Rápidas
          </h3>
          <div className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-3.5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-zinc-300">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">
                  Alertas em Tempo Real
                </span>
                <span className="text-[10px] text-zinc-400">
                  Som e vibração em novas vagas
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setPushNotifications(!pushNotifications)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                pushNotifications ? 'bg-[#00E676]' : 'bg-zinc-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  pushNotifications ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <HomeIndicator />
    </div>
  );
};
