import type { ReactNode } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FIRMES_NAV, type FirmesScreenId } from '../domain/firmes';

interface FirmesLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showNav?: boolean;
  backTo?: string;
  eyebrow?: string;
}

export function FirmesLayout({
  children,
  title,
  subtitle,
  showNav = true,
  backTo,
  eyebrow = 'Temporada 1 · 90 días',
}: FirmesLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="app-shell">
      <header className="bg-gov-blue text-white shrink-0">
        <div className="flex items-center justify-between px-4 py-2 text-xs tracking-wide">
          <span className="font-semibold uppercase">GOV.CO</span>
          <NavLink to="/firmes/transparencia" className="opacity-90 underline-offset-2 hover:underline">
            Cómo se ganan Firmes
          </NavLink>
        </div>
        <div className="bg-gov-blue-dark px-4 py-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-blue-200">
              {eyebrow}
            </p>
            <h1 className="text-lg font-bold leading-tight">Firmes</h1>
          </div>
          <NavLink
            to="/"
            className="text-[11px] text-blue-100 underline underline-offset-2 mt-1 shrink-0"
          >
            Portal
          </NavLink>
        </div>
      </header>

      <main className={`flex-1 overflow-y-auto px-4 py-5 ${showNav ? 'pb-24' : ''}`}>
        {backTo && (
          <button
            type="button"
            onClick={() => navigate(backTo)}
            className="text-sm text-gov-blue font-medium mb-3"
          >
            ← Volver
          </button>
        )}
        <h2 className="text-xl font-bold text-gray-900 mb-1">{title}</h2>
        {subtitle && (
          <p className="text-sm text-gov-gray mb-5 leading-relaxed">{subtitle}</p>
        )}
        {children}
      </main>

      {showNav ? (
        <div className="absolute bottom-0 inset-x-0 bg-white border-t border-gov-border">
          <p className="text-[10px] text-center text-gov-gray pt-1.5 px-3">
            Los Firmes no se compran · Prototipo ciudadano
          </p>
          <nav
            className="grid grid-cols-3 text-[11px]"
            aria-label="Navegación Firmes"
          >
            {FIRMES_NAV.map((item) => (
              <NavLink
                key={item.id}
                to={item.to}
                end={item.id === 'home'}
                className={() => {
                  const active =
                    item.id === 'home'
                      ? location.pathname === '/firmes' ||
                        location.pathname === '/firmes/'
                      : location.pathname.startsWith(item.to);
                  return `flex flex-col items-center justify-center py-2.5 gap-0.5 ${
                    active
                      ? 'text-gov-blue font-bold'
                      : 'text-gov-gray font-medium'
                  }`;
                }}
              >
                <span aria-hidden className="text-base leading-none">
                  {navIcon(item.id)}
                </span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      ) : (
        <footer className="shrink-0 border-t border-gov-border bg-white px-4 py-2 text-center text-[10px] text-gov-gray">
          Los Firmes no se compran · Prototipo ciudadano · Sin vínculo oficial DNP
        </footer>
      )}
    </div>
  );
}

function navIcon(id: FirmesScreenId): string {
  if (id === 'home') return '⌂';
  if (id === 'ejes') return '⧉';
  if (id === 'gremio') return '◈';
  if (id === 'perfil') return '◉';
  return '·';
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  type = 'button',
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-xl bg-gov-blue text-white font-bold py-3.5 px-4 text-base shadow-[0_4px_0_#072861] hover:bg-gov-blue-dark active:translate-y-0.5 active:shadow-none transition-all focus:outline-none focus:ring-2 focus:ring-gov-blue focus:ring-offset-2 disabled:shadow-none"
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-lg border-2 border-gov-blue text-gov-blue font-semibold py-3 px-4 text-base bg-white hover:bg-gov-blue-light transition-colors"
    >
      {children}
    </button>
  );
}

export function Coin({ value, label }: { value: number; label?: string }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span
        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gov-yellow text-gov-blue-dark font-black text-sm border-2 border-yellow-500"
        aria-hidden
      >
        F
      </span>
      <span>
        <span className="font-bold tabular-nums text-gray-900">{value}</span>
        {label && (
          <span className="block text-[10px] uppercase tracking-wide text-gov-gray">
            {label}
          </span>
        )}
      </span>
    </div>
  );
}

export function FireStreak({ days }: { days: number }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span
        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 text-lg border border-orange-200"
        aria-hidden
      >
        🔥
      </span>
      <span>
        <span className="font-black tabular-nums text-gray-900 text-xl leading-none">
          {days}
        </span>
        <span className="block text-[10px] uppercase tracking-wide text-gov-gray">
          Racha
        </span>
      </span>
    </div>
  );
}
