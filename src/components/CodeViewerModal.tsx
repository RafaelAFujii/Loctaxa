import React, { useState } from 'react';
import { Copy, Check, Code, FileCode2 } from 'lucide-react';

interface CodeFile {
  name: string;
  category: 'Screens' | 'UI Components' | 'Map Components' | 'Types';
  code: string;
}

const codeSnippets: CodeFile[] = [
  {
    name: 'PrimaryButton.tsx',
    category: 'UI Components',
    code: `import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'neon' | 'dark' | 'ghost' | 'danger';
  fullWidth?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  icon,
  variant = 'neon',
  fullWidth = true,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'relative flex items-center justify-center font-bold tracking-wide transition-all duration-200 active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none text-sm';
  
  const variantStyles = {
    neon: 'bg-[#00E676] hover:bg-[#00FF77] text-black font-extrabold shadow-[0_4px_20px_rgba(0,230,118,0.35)] hover:shadow-[0_6px_28px_rgba(0,230,118,0.5)] rounded-2xl py-4 px-6 border border-[#52ff9e]/40',
    dark: 'bg-[#1C1C1E] hover:bg-[#252528] text-white border border-white/10 rounded-2xl py-4 px-6 shadow-sm',
    ghost: 'bg-transparent hover:bg-white/5 text-zinc-400 hover:text-white rounded-2xl py-3 px-6',
    danger: 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-2xl py-4 px-6'
  };

  return (
    <button
      className={\`
        \${baseStyles}
        \${variantStyles[variant]}
        \${fullWidth ? 'w-full' : ''}
        \${className}
      \`}
      disabled={disabled}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {icon && <span className="text-current">{icon}</span>}
        <span className="uppercase text-[13px] tracking-wider font-extrabold">{children}</span>
      </div>
    </button>
  );
};`,
  },
  {
    name: 'TextInput.tsx',
    category: 'UI Components',
    code: `import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isPassword?: boolean;
  maskType?: 'phone' | 'none';
  onValueChange?: (val: string) => void;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  isPassword = false,
  maskType = 'none',
  value,
  onChange,
  onValueChange,
  placeholder,
  className = '',
  type = 'text',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Máscara de Telefone: (XX) XXXXX-XXXX
  const formatPhone = (val: string): string => {
    const digits = val.replace(/\\D/g, '').slice(0, 11);
    if (!digits) return '';
    if (digits.length <= 2) return \`(\${digits}\`;
    if (digits.length <= 7) return \`(\${digits.slice(0, 2)}) \${digits.slice(2)}\`;
    return \`(\${digits.slice(0, 2)}) \${digits.slice(2, 7)}-\${digits.slice(7)}\`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newVal = e.target.value;
    if (maskType === 'phone') {
      newVal = formatPhone(newVal);
      e.target.value = newVal;
    }
    if (onChange) onChange(e);
    if (onValueChange) onValueChange(newVal);
  };

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          type={inputType}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={\`
            w-full bg-[#18191D] text-white text-[14px] placeholder-zinc-500 rounded-xl px-4 py-3.5
            border border-white/5 transition-all duration-200
            focus:outline-none focus:border-[#00E676]/70 focus:ring-1 focus:ring-[#00E676]/40
            hover:border-white/10
            \${isPassword ? 'pr-11' : ''}
            \${error ? 'border-red-500/80 focus:border-red-500' : ''}
            \${className}
          \`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-zinc-400 hover:text-white transition-colors cursor-pointer p-1"
          >
            {showPassword ? <EyeOff className="w-4 h-4 text-zinc-400" /> : <Eye className="w-4 h-4 text-zinc-400" />}
          </button>
        )}
      </div>

      {error && <span className="text-xs text-red-400 mt-0.5">{error}</span>}
    </div>
  );
};`,
  },
  {
    name: 'ProfessionToggle.tsx',
    category: 'UI Components',
    code: `import React from 'react';
import { Wine, Utensils } from 'lucide-react';
import { Profession } from '../../types';

interface ProfessionToggleProps {
  selected: Profession;
  onChange: (profession: Profession) => void;
}

export const ProfessionToggle: React.FC<ProfessionToggleProps> = ({
  selected,
  onChange,
}) => {
  return (
    <div className="w-full flex flex-col gap-2 text-left">
      <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
        ESCOLHA SUA PROFISSÃO PRINCIPAL
      </label>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onChange('Bartender')}
          className={\`
            flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl border transition-all duration-200 cursor-pointer
            \${
              selected === 'Bartender'
                ? 'border-[#00E676] bg-[#00E676]/10 text-[#00E676] shadow-[0_0_15px_rgba(0,230,118,0.2)]'
                : 'border-white/5 bg-[#18191D] text-zinc-400 hover:text-zinc-200 hover:border-white/10'
            }
          \`}
        >
          <Wine className={\`w-4 h-4 \${selected === 'Bartender' ? 'text-[#00E676]' : 'text-zinc-400'}\`} />
          <span className="text-sm font-semibold tracking-tight">Bartender</span>
        </button>

        <button
          type="button"
          onClick={() => onChange('Garçom')}
          className={\`
            flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl border transition-all duration-200 cursor-pointer
            \${
              selected === 'Garçom'
                ? 'border-[#00E676] bg-[#00E676]/10 text-[#00E676] shadow-[0_0_15px_rgba(0,230,118,0.2)]'
                : 'border-white/5 bg-[#18191D] text-zinc-400 hover:text-zinc-200 hover:border-white/10'
            }
          \`}
        >
          <Utensils className={\`w-4 h-4 \${selected === 'Garçom' ? 'text-[#00E676]' : 'text-zinc-400'}\`} />
          <span className="text-sm font-semibold tracking-tight">Garçom</span>
        </button>
      </div>
    </div>
  );
};`,
  },
  {
    name: 'GigMarker.tsx',
    category: 'Map Components',
    code: `import React from 'react';
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
        left: \`\${gig.coords.x}%\`,
        top: \`\${gig.coords.y}%\`,
        transform: 'translate(-50%, -50%)',
      }}
      className="absolute z-20 cursor-pointer group transition-all duration-300 select-none"
    >
      <span className="absolute -inset-1 rounded-full bg-[#00E676]/30 animate-ping opacity-40 pointer-events-none" />

      <div
        className={\`
          flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200
          \${
            isSelected
              ? 'bg-[#00E676] text-black shadow-[0_0_20px_rgba(0,230,118,0.7)] scale-110 ring-2 ring-white/40'
              : 'bg-[#141519]/95 text-white border border-[#00E676] shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:border-[#00FF77] hover:scale-105'
          }
        \`}
      >
        <span className={\`flex items-center justify-center \${isSelected ? 'text-black' : 'text-[#00E676]'}\`}>
          {gig.profession === 'Bartender' ? <Wine className="w-3 h-3" /> : <Utensils className="w-3 h-3" />}
        </span>

        <span className="font-semibold tracking-tight">{gig.profession}</span>
        <span className={\`font-extrabold \${isSelected ? 'text-black' : 'text-[#00E676]'}\`}>
          R$ {gig.rate}
        </span>
      </div>

      <div
        className={\`w-0 h-0 mx-auto border-l-4 border-l-transparent border-r-4 border-r-transparent \${
          isSelected ? 'border-t-4 border-t-[#00E676]' : 'border-t-4 border-t-[#141519]'
        }\`}
      />
    </div>
  );
};`,
  },
  {
    name: 'LoginScreen.tsx',
    category: 'Screens',
    code: `// Tela 1: login-screen
import React, { useState } from 'react';
import { LogIn, Sparkles } from 'lucide-react';
import { StatusBar } from '../components/ui/StatusBar';
import { HomeIndicator } from '../components/ui/HomeIndicator';
import { TextInput } from '../components/ui/TextInput';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { SocialButton } from '../components/ui/SocialButton';

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('freelancer@curitiba.com');
  const [password, setPassword] = useState('••••••••');

  return (
    <div className="w-full h-full min-h-[720px] bg-[#0E0F12] text-white flex flex-col justify-between relative overflow-hidden select-none">
      <StatusBar time="9:41" />

      <div className="flex-1 px-7 pt-4 pb-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-7">
            <div className="w-8 h-8 rounded-xl bg-[#00E676]/10 border border-[#00E676] flex items-center justify-center text-[#00E676]">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-lg font-black tracking-wider text-white">TRAMPO</span>
            <span className="text-[10px] font-extrabold uppercase bg-[#202227] text-zinc-300 px-2 py-0.5 rounded border border-white/5 tracking-wider">
              CWB
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2.5">
            Bem-vindo de volta
          </h1>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-[320px]">
            Entre na sua conta para encontrar seus próximos turnos em restaurantes e bares.
          </p>

          <form className="mt-8 flex flex-col gap-4">
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
                <button type="button" className="text-xs text-[#00E676] font-semibold hover:underline">
                  Esqueceu a senha?
                </button>
              </div>
            </div>

            <div className="mt-2">
              <PrimaryButton icon={<LogIn className="w-4 h-4 text-black" />}>
                ENTRAR NA CONTA
              </PrimaryButton>
            </div>
          </form>
        </div>

        <div className="mt-6 flex flex-col gap-5">
          <div className="relative flex items-center justify-center">
            <div className="border-t border-zinc-800 w-full" />
            <span className="bg-[#0E0F12] px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 shrink-0">
              OU ENTRAR COM
            </span>
            <div className="border-t border-zinc-800 w-full" />
          </div>

          <div className="flex items-center gap-3">
            <SocialButton provider="Google" />
            <SocialButton provider="Apple" />
          </div>

          <div className="text-center pt-1">
            <p className="text-xs text-zinc-400">
              Não tem uma conta? <span className="text-[#00E676] font-bold hover:underline cursor-pointer">Cadastre-se</span>
            </p>
          </div>
        </div>
      </div>

      <HomeIndicator />
    </div>
  );
};`,
  },
  {
    name: 'CadastroScreen.tsx',
    category: 'Screens',
    code: `// Tela 2: cadastro-screen
import React, { useState } from 'react';
import { UserPlus, Check } from 'lucide-react';
import { StatusBar } from '../components/ui/StatusBar';
import { HomeIndicator } from '../components/ui/HomeIndicator';
import { TextInput } from '../components/ui/TextInput';
import { ProfessionToggle } from '../components/ui/ProfessionToggle';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { Profession } from '../types';

export const CadastroScreen: React.FC = () => {
  const [profession, setProfession] = useState<Profession>('Bartender');
  const [nome, setNome] = useState('Gabriel Silva');
  const [email, setEmail] = useState('seu@email.com');
  const [telefone, setTelefone] = useState('(41) 99999-0000');
  const [senha, setSenha] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(true);

  return (
    <div className="w-full h-full min-h-[720px] bg-[#0E0F12] text-white flex flex-col justify-between relative overflow-hidden select-none">
      <StatusBar time="9:42" />

      <div className="flex-1 px-7 pt-2 pb-5 flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="mb-5">
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
              Criar Conta
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Cadastre-se e comece a faturar hoje mesmo em Curitiba.
            </p>
          </div>

          <form className="flex flex-col gap-3.5">
            <ProfessionToggle selected={profession} onChange={setProfession} />

            <TextInput
              label="NOME COMPLETO"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Gabriel Silva"
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

            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setAcceptTerms(!acceptTerms)}
                className={\`
                  w-5 h-5 rounded-md flex items-center justify-center transition-colors cursor-pointer shrink-0
                  \${acceptTerms ? 'bg-[#00E676] text-black shadow-[0_0_8px_rgba(0,230,118,0.4)]' : 'border border-zinc-600 bg-[#18191D]'}
                \`}
              >
                {acceptTerms && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </button>
              <label className="text-xs text-zinc-400 cursor-pointer">
                Li e aceito os <span className="text-white underline font-medium">Termos de Uso</span> e Políticas.
              </label>
            </div>

            <div className="mt-3">
              <PrimaryButton icon={<UserPlus className="w-4 h-4 text-black" />}>
                CRIAR MINHA CONTA
              </PrimaryButton>
            </div>
          </form>
        </div>

        <div className="text-center pt-4">
          <p className="text-xs text-zinc-400">
            Já tem uma conta? <span className="text-[#00E676] font-bold hover:underline cursor-pointer">Entrar</span>
          </p>
        </div>
      </div>

      <HomeIndicator />
    </div>
  );
};`,
  },
  {
    name: 'MapDashboardScreen.tsx',
    category: 'Screens',
    code: `// Tela 3: map-dashboard
import React, { useState } from 'react';
import { Power, Wallet, MapPin } from 'lucide-react';
import { StatusBar } from '../components/ui/StatusBar';
import { HomeIndicator } from '../components/ui/HomeIndicator';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { MapPlaceholder } from '../components/map/MapPlaceholder';
import { GigOffer } from '../types';

export const MapDashboardScreen: React.FC<{ gigs: GigOffer[]; onSelectGig: (gig: GigOffer) => void }> = ({
  gigs,
  onSelectGig,
}) => {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <div className="w-full h-full min-h-[720px] bg-[#0A0B0E] text-white flex flex-col justify-between relative overflow-hidden select-none">
      <div className="absolute inset-0 z-0">
        <MapPlaceholder gigs={gigs} onSelectGig={onSelectGig} isOnline={isOnline} />
      </div>

      <div className="relative z-20 flex flex-col">
        <StatusBar time="9:41" />
        <div className="flex justify-center -mt-1 mb-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold text-zinc-300 tracking-wider uppercase">
            <MapPin className="w-3 h-3 text-[#00E676]" />
            <span>CURITIBA, BRASIL</span>
          </div>
        </div>

        <div className="flex items-center justify-between px-5 pt-1">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
              alt="Perfil"
              className="w-10 h-10 rounded-full object-cover border-2 border-[#00E676]"
            />
            <span className={\`absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full \${isOnline ? 'bg-[#00E676] text-black' : 'bg-[#18191D] text-zinc-400 border border-zinc-700'}\`}>
              {isOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 bg-[#141519]/90 backdrop-blur-md border border-white/10 rounded-2xl px-3.5 py-2">
            <Wallet className="w-3.5 h-3.5 text-[#00E676]" />
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-zinc-400 font-medium leading-none">Ganhos Hoje</span>
              <span className="text-xs font-black text-white mt-0.5">R$ 150,00</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 px-4 pb-2">
        <div className="bg-[#141519]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className={\`w-3 h-3 rounded-full \${isOnline ? 'bg-[#00E676] animate-pulse' : 'bg-red-500'}\`} />
            <div>
              <h3 className="text-sm font-bold text-white">
                {isOnline ? 'Você está conectado' : 'Você está desconectado'}
              </h3>
              <p className="text-xs text-zinc-400">
                {isOnline ? 'Buscando novos turnos prioritários...' : \`\${gigs.length} vagas ativas perto de você agora.\`}
              </p>
            </div>
          </div>

          <PrimaryButton
            onClick={() => setIsOnline(!isOnline)}
            variant={isOnline ? 'dark' : 'neon'}
            icon={<Power className="w-4 h-4" />}
          >
            {isOnline ? 'FICAR OFFLINE' : 'FICAR ONLINE'}
          </PrimaryButton>
        </div>

        <HomeIndicator />
      </div>
    </div>
  );
};`,
  },
  {
    name: 'GigOfferBottomSheet.tsx',
    category: 'Screens',
    code: `// Tela 4: gig-offer-bottom-sheet
import React from 'react';
import { Star, ShieldAlert, Sparkles, MapPin } from 'lucide-react';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { HomeIndicator } from '../components/ui/HomeIndicator';
import { StatusBar } from '../components/ui/StatusBar';
import { MapPlaceholder } from '../components/map/MapPlaceholder';
import { GigOffer } from '../types';

export const GigOfferBottomSheet: React.FC<{
  gig: GigOffer;
  allGigs: GigOffer[];
  onAccept: (gig: GigOffer) => void;
  onDecline: (gig: GigOffer) => void;
}> = ({ gig, allGigs, onAccept, onDecline }) => {
  return (
    <div className="w-full h-full min-h-[720px] bg-[#0A0B0E] text-white flex flex-col justify-between relative overflow-hidden select-none">
      <div className="absolute inset-0 z-0">
        <MapPlaceholder gigs={allGigs} selectedGigId={gig.id} onSelectGig={() => {}} isOnline={true} />
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 flex flex-col">
        <StatusBar time="9:41" />
        <div className="flex justify-center -mt-1 mb-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold text-zinc-300 tracking-wider uppercase">
            <MapPin className="w-3 h-3 text-[#00E676]" />
            <span>CURITIBA, BRASIL</span>
          </div>
        </div>
      </div>

      <div className="relative z-20 mt-auto">
        <div className="bg-[#141519]/98 backdrop-blur-2xl border-t border-white/10 rounded-t-[32px] px-6 pt-3 pb-4 shadow-2xl flex flex-col gap-4">
          <div className="w-12 h-1.5 bg-zinc-700 rounded-full mx-auto -mt-0.5 mb-1" />

          <div className="flex items-center gap-2.5">
            <span className="bg-[#00E676]/15 border border-[#00E676]/40 text-[#00E676] text-[11px] font-extrabold uppercase px-3 py-1 rounded-full">
              {gig.profession}
            </span>
            <span className="bg-[#202227] text-zinc-300 text-[11px] font-medium px-3 py-1 rounded-full border border-white/5">
              {gig.distance}
            </span>
          </div>

          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">{gig.venueName}</h2>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-zinc-400">
              <span className="text-[#00E676] flex items-center gap-1 font-bold">
                <Star className="w-3.5 h-3.5 fill-[#00E676] text-[#00E676]" />
                {gig.rating.toFixed(1)}
              </span>
              <span>•</span>
              <span>{gig.neighborhood}</span>
            </div>
          </div>

          <div className="bg-[#1A1C22]/80 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">VALOR DO TURNO</span>
              <span className="text-2xl font-black text-[#00E676] tracking-tight mt-0.5">{gig.rateFormatted}</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">HORÁRIO</span>
              <span className="text-sm font-bold text-white mt-0.5">{gig.shiftTime}</span>
              <span className="text-[11px] text-zinc-400">{gig.shiftDuration}</span>
            </div>
          </div>

          <div className="bg-[#181B20] border border-white/5 rounded-2xl p-3.5 text-left flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5 text-[#00E676]" />
              <span className="text-[11px] font-extrabold uppercase text-[#00E676] tracking-wider">
                {gig.microtraining.title}
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">{gig.microtraining.rulesTitle}</h4>
              <p className="text-[11px] text-zinc-300 leading-relaxed">{gig.microtraining.description}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <PrimaryButton onClick={() => onAccept(gig)}>
              ACEITAR TAXA (R$ {gig.rate})
            </PrimaryButton>
            <button
              type="button"
              onClick={() => onDecline(gig)}
              className="w-full py-2.5 text-xs text-zinc-400 hover:text-white font-medium cursor-pointer"
            >
              Recusar Proposta
            </button>
          </div>
        </div>

        <HomeIndicator className="bg-[#141519]/98" />
      </div>
    </div>
  );
};`,
  },
];

interface CodeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeViewerModal: React.FC<CodeViewerModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<string>(codeSnippets[0].name);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentSnippet = codeSnippets.find((s) => s.name === selectedFile) || codeSnippets[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#101216] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#14171d]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00E676]/10 border border-[#00E676]/40 flex items-center justify-center text-[#00E676]">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                Código dos Componentes Modularizados
              </h3>
              <p className="text-xs text-zinc-400">
                React + TypeScript + Tailwind CSS (Dark Mode & #00E676)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00E676] hover:bg-[#00FF77] text-black text-xs font-bold transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar Arquivo'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-[#1f232b] hover:bg-[#282d37] text-zinc-300 text-xs font-semibold cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar file list */}
          <div className="w-60 border-r border-white/10 bg-[#0c0e12] p-3 flex flex-col gap-1 overflow-y-auto">
            <span className="text-[10px] font-bold text-zinc-500 uppercase px-2 py-1 tracking-wider">
              Arquivos de Componentes
            </span>
            {codeSnippets.map((file) => (
              <button
                key={file.name}
                onClick={() => setSelectedFile(file.name)}
                className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer ${
                  selectedFile === file.name
                    ? 'bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <FileCode2 className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{file.name}</span>
              </button>
            ))}
          </div>

          {/* Code preview area */}
          <div className="flex-1 bg-[#090A0D] p-5 overflow-auto text-xs font-mono leading-relaxed text-zinc-300">
            <pre className="whitespace-pre">{currentSnippet.code}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
