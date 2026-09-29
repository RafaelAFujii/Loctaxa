import React, { useState } from 'react';
import { UserPlus, Check } from 'lucide-react';
import { StatusBar } from '../components/ui/StatusBar';
import { HomeIndicator } from '../components/ui/HomeIndicator';
import { TextInput } from '../components/ui/TextInput';
import { ProfessionToggle } from '../components/ui/ProfessionToggle';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { Profession } from '../types';

interface CadastroScreenProps {
  onNavigateToLogin?: () => void;
  onCadastroSuccess?: () => void;
}

export const CadastroScreen: React.FC<CadastroScreenProps> = ({
  onNavigateToLogin,
  onCadastroSuccess,
}) => {
  const [profession, setProfession] = useState<Profession>('Bartender');
  const [nome, setNome] = useState('Gabriel Silva');
  const [email, setEmail] = useState('seu@email.com');
  const [telefone, setTelefone] = useState('(41) 99999-0000');
  const [senha, setSenha] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      alert('Por favor, aceite os Termos de Uso e Políticas.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onCadastroSuccess) {
        onCadastroSuccess();
      }
    }, 600);
  };

  return (
    <div className="w-full h-full min-h-[720px] bg-[#0E0F12] text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Top Status Bar */}
      <StatusBar time="9:42" />

      {/* Main Content Area */}
      <div className="flex-1 px-7 pt-2 pb-5 flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Header */}
          <div className="mb-5">
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
              Criar Conta
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Cadastre-se e comece a faturar hoje mesmo em Curitiba.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            {/* Profession Toggle */}
            <ProfessionToggle
              selected={profession}
              onChange={setProfession}
            />

            {/* Inputs */}
            <TextInput
              label="NOME COMPLETO"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
            />

            <TextInput
              label="E-MAIL"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />

            <TextInput
              label="TELEFONE"
              maskType="phone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(41) 99999-0000"
            />

            <TextInput
              label="SENHA"
              isPassword
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Crie uma senha forte"
            />

            {/* Terms Checkbox */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setAcceptTerms(!acceptTerms)}
                className={`
                  w-5 h-5 rounded-md flex items-center justify-center transition-colors cursor-pointer shrink-0
                  ${
                    acceptTerms
                      ? 'bg-[#00E676] text-black shadow-[0_0_8px_rgba(0,230,118,0.4)]'
                      : 'border border-zinc-600 bg-[#18191D]'
                  }
                `}
              >
                {acceptTerms && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </button>
              <label
                onClick={() => setAcceptTerms(!acceptTerms)}
                className="text-xs text-zinc-400 cursor-pointer select-none"
              >
                Li e aceito os{' '}
                <span className="text-white underline font-medium">Termos de Uso</span>{' '}
                e Políticas.
              </label>
            </div>

            {/* Submit Button */}
            <div className="mt-3">
              <PrimaryButton
                type="submit"
                icon={<UserPlus className="w-4 h-4 text-black" />}
                disabled={isLoading}
              >
                {isLoading ? 'CRIANDO CONTA...' : 'CRIAR MINHA CONTA'}
              </PrimaryButton>
            </div>
          </form>
        </div>

        {/* Footer Navigation */}
        <div className="text-center pt-4">
          <p className="text-xs text-zinc-400">
            Já tem uma conta?{' '}
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="text-[#00E676] hover:text-[#00FF77] font-bold hover:underline cursor-pointer transition-colors"
            >
              Entrar
            </button>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <HomeIndicator />
    </div>
  );
};
