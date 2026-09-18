import type { ReactNode } from 'react';

type Mood = 'idle' | 'cheer' | 'think';

interface MascotProps {
  mood?: Mood;
  size?: number;
  className?: string;
}

/** Flat guide character — not pixel-RPG, not a kids mascot. */
export function Mascot({ mood = 'idle', size = 72, className = '' }: MascotProps) {
  const brow = mood === 'think' ? -6 : mood === 'cheer' ? 4 : 0;
  const mouth = mood === 'cheer' ? 8 : mood === 'think' ? 2 : 5;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      role="img"
      aria-label="Pilo, guía de Firmes"
      className={className}
    >
      <circle cx="40" cy="42" r="28" fill="#F4C430" />
      <circle cx="40" cy="42" r="28" fill="none" stroke="#0B3B8C" strokeWidth="2.5" />
      <path
        d="M18 40c4-14 12-22 22-22s18 8 22 22"
        fill="#FDE68A"
      />
      <ellipse cx="30" cy={38 + brow / 6} rx="6.5" ry="7.5" fill="#fff" />
      <ellipse cx="50" cy={38 + brow / 6} rx="6.5" ry="7.5" fill="#fff" />
      <circle cx="31.5" cy={39 + brow / 6} r="3.2" fill="#0B3B8C" />
      <circle cx="51.5" cy={39 + brow / 6} r="3.2" fill="#0B3B8C" />
      <circle cx="32.6" cy={37.8 + brow / 6} r="1.1" fill="#fff" />
      <circle cx="52.6" cy={37.8 + brow / 6} r="1.1" fill="#fff" />
      <path
        d={`M32 ${52 + (mood === 'cheer' ? -1 : 0)} Q40 ${52 + mouth} 48 ${52 + (mood === 'cheer' ? -1 : 0)}`}
        fill="none"
        stroke="#0B3B8C"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M24 58c6 8 26 8 32 0"
        fill="#0B3B8C"
      />
      <circle cx="18" cy="22" r="5" fill="#0B3B8C" />
      <circle cx="62" cy="22" r="5" fill="#0B3B8C" />
      <circle cx="18" cy="22" r="2.2" fill="#FCD116" />
      <circle cx="62" cy="22" r="2.2" fill="#FCD116" />
    </svg>
  );
}

export function GuideBubble({
  children,
  mood = 'idle',
  size = 64,
}: {
  children: ReactNode;
  mood?: Mood;
  size?: number;
}) {
  return (
    <div className="flex items-start gap-3">
      <Mascot mood={mood} size={size} className="shrink-0 mascot-bob" />
      <div className="relative flex-1 rounded-2xl border border-gov-border bg-white px-3.5 py-3 shadow-sm">
        <span
          className="absolute -left-1.5 top-5 h-3 w-3 rotate-45 border-b border-l border-gov-border bg-white"
          aria-hidden
        />
        <p className="text-[11px] font-bold uppercase tracking-wide text-gov-blue">
          Pilo
        </p>
        <div className="text-sm text-gray-800 leading-relaxed mt-0.5">
          {children}
        </div>
      </div>
    </div>
  );
}
