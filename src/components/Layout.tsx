import type { ReactNode } from 'react';
import { CITIZEN_FLOW, SCREEN_LABELS, type ScreenId } from '../domain/types';
import { useEpisode } from '../hooks/useEpisode';

interface LayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showProgress?: boolean;
}

export function Layout({
  children,
  title,
  subtitle,
  showProgress = true,
}: LayoutProps) {
  const { screen } = useEpisode();
  const flowIndex = CITIZEN_FLOW.indexOf(screen);
  const inFlow = flowIndex >= 0;
  const progress =
    screen === 'cierre' || screen === 'tablero'
      ? 100
      : inFlow
        ? ((flowIndex + 1) / CITIZEN_FLOW.length) * 100
        : 0;

  return (
    <div className="app-shell">
      {/* GOV.CO-style top bar */}
      <header className="bg-gov-blue text-white shrink-0">
        <div className="flex items-center justify-between px-4 py-2 text-xs tracking-wide">
          <span className="font-semibold uppercase">GOV.CO</span>
          <span className="opacity-90">Participación ciudadana</span>
        </div>
        <div className="bg-gov-blue-dark px-4 py-3">
          <p className="text-[11px] uppercase tracking-wider text-blue-200">
            Plan Nacional de Desarrollo 2026–2030
          </p>
          <h1 className="text-lg font-bold leading-tight">Mi Patria Milagro</h1>
        </div>
      </header>

      {showProgress && (
        <div className="bg-white border-b border-gov-border px-4 py-2 shrink-0">
          <div className="flex justify-between text-[11px] text-gov-gray mb-1">
            <span>{SCREEN_LABELS[screen as ScreenId]}</span>
            <span>
              {inFlow
                ? `Paso ${flowIndex + 1} de ${CITIZEN_FLOW.length}`
                : screen === 'cierre'
                  ? 'Cierre'
                  : 'Tablero'}
            </span>
          </div>
          <div className="h-1.5 bg-gov-blue-light rounded-full overflow-hidden">
            <div
              className="h-full bg-gov-blue transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      )}

      <main className="flex-1 overflow-y-auto px-4 py-5">
        <h2 className="text-xl font-bold text-gray-900 mb-1">{title}</h2>
        {subtitle && (
          <p className="text-sm text-gov-gray mb-5 leading-relaxed">{subtitle}</p>
        )}
        {children}
      </main>

      <footer className="shrink-0 border-t border-gov-border bg-white px-4 py-2 text-center text-[10px] text-gov-gray">
        Demo ilustrativa · Sin vínculo oficial DNP · Datos de demostración
      </footer>
    </div>
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
      className="w-full rounded-lg bg-gov-blue text-white font-semibold py-3.5 px-4 text-base shadow-sm hover:bg-gov-blue-dark transition-colors focus:outline-none focus:ring-2 focus:ring-gov-blue focus:ring-offset-2"
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
