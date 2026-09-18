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
  hideHeading?: boolean;
}

export function FirmesLayout({
  children,
  title,
  subtitle,
  showNav = true,
  backTo,
  eyebrow = 'Primeros 90 días',
  hideHeading = false,
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
        {!hideHeading && (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{title}</h2>
            {subtitle && (
              <p className="text-sm text-gov-gray mb-5 leading-relaxed">{subtitle}</p>
            )}
          </>
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
                <span aria-hidden className="leading-none">
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

function navIcon(id: FirmesScreenId) {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  if (id === 'home') {
    return (
      <svg {...common}>
        <path d="M4 11.5 12 5l8 6.5" />
        <path d="M6.5 10.5V19h11v-8.5" />
      </svg>
    );
  }
  if (id === 'ejes') {
    return (
      <svg {...common}>
        <path d="M5 7h14" />
        <path d="M5 12h14" />
        <path d="M5 17h10" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="8.5" r="3.2" />
      <path d="M5.5 19c1.2-3.2 3.4-4.8 6.5-4.8S17.3 15.8 18.5 19" />
    </svg>
  );
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
      className="w-full rounded-md bg-gov-blue text-white font-semibold py-3 px-4 text-base hover:bg-gov-blue-dark focus:outline-none focus:ring-2 focus:ring-gov-blue focus:ring-offset-2"
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
      className="w-full rounded-md border border-gov-blue text-gov-blue font-semibold py-3 px-4 text-base bg-white hover:bg-gov-blue-light"
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
        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-50 text-[11px] font-bold text-orange-800 border border-orange-200"
        aria-hidden
      >
        {days === 1 ? 'día' : 'días'}
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
