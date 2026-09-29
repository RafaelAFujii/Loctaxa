import React, { useState } from 'react';
import { LogIn, Sparkles } from 'lucide-react';
import { StatusBar } from '../components/ui/StatusBar';
import { HomeIndicator } from '../components/ui/HomeIndicator';
import { TextInput } from '../components/ui/TextInput';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { SocialButton } from '../components/ui/SocialButton';

interface LoginScreenProps {
  onNavigateToCadastro?: () => void;
  onLoginSuccess?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigateToCadastro,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('freelancer@curitiba.com');
  const [password, setPassword] = useState('••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    }, 600);
  };

  return (
    <div className="w-full h-full min-h-[720px] bg-[#0E0F12] text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Top Status Bar */}
      <StatusBar time="9:41" />

      {/* Main Content Area */}
      <div className="flex-1 px-7 pt-4 pb-6 flex flex-col justify-between">
        {/* Brand & Greetings */}
        <div>
          {/* Brand Logo & Pill */}
          <div className="flex items-center gap-2 mb-7">
            <div className="w-8 h-8 rounded-xl bg-[#00E676]/10 border border-[#00E676] flex items-center justify-center text-[#00E676] shadow-[0_0_12px_rgba(0,230,118,0.3)]">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-lg font-black tracking-wider text-white">TRAMPO</span>
            <span className="text-[10px] font-extrabold uppercase bg-[#202227] text-zinc-300 px-2 py-0.5 rounded border border-white/5 tracking-wider">
              CWB
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2.5">
            Bem-vindo de volta
          </h1>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-[320px]">
            Entre na sua conta para encontrar seus próximos turnos em restaurantes e bares.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <TextInput
              label="E-MAIL"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />

            <div>
              <TextInput
                label="SENHA"
                isPassword
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => alert('Link de recuperação enviado para o seu e-mail!')}
                  className="text-xs text-[#00E676] hover:text-[#00FF77] hover:underline font-semibold transition-colors cursor-pointer"
                >
                  Esqueceu a senha?
                </button>
              </div>
            </div>

            <div className="mt-2">
              <PrimaryButton
                type="submit"
                icon={<LogIn className="w-4 h-4 text-black" />}
                disabled={isLoading}
              >
                {isLoading ? 'ENTRANDO...' : 'ENTRAR NA CONTA'}
              </PrimaryButton>
            </div>
          </form>
        </div>

        {/* Social Login & Footer */}
        <div className="mt-6 flex flex-col gap-5">
          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-zinc-800 w-full" />
            <span className="bg-[#0E0F12] px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 shrink-0">
              OU ENTRAR COM
            </span>
            <div className="border-t border-zinc-800 w-full" />
          </div>

          {/* Social Buttons */}
          <div className="flex items-center gap-3">
            <SocialButton
              provider="Google"
              onClick={() => {
                setEmail('google.user@curitiba.com');
                if (onLoginSuccess) onLoginSuccess();
              }}
            />
            <SocialButton
              provider="Apple"
              onClick={() => {
                setEmail('apple.user@curitiba.com');
                if (onLoginSuccess) onLoginSuccess();
              }}
            />
          </div>

          {/* Sign Up Navigation */}
          <div className="text-center pt-1">
            <p className="text-xs text-zinc-400">
              Não tem uma conta?{' '}
              <button
                type="button"
                onClick={onNavigateToCadastro}
                className="text-[#00E676] hover:text-[#00FF77] font-bold hover:underline cursor-pointer transition-colors"
              >
                Cadastre-se
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <HomeIndicator />
    </div>
  );
};
