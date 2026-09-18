import type { ReactNode } from 'react';

type Mood = 'idle' | 'cheer' | 'think';

export function Mascot({
  mood = 'idle',
  size = 48,
  className = '',
}: {
  mood?: Mood;
  size?: number;
  className?: string;
}) {
  const mouth = mood === 'cheer' ? 7 : mood === 'think' ? 2 : 4;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Guía de Firmes"
      className={className}
    >
      <circle cx="32" cy="32" r="30" fill="#0B3B8C" />
      <circle cx="32" cy="32" r="30" fill="none" stroke="#072861" strokeWidth="2" />
      <circle cx="24" cy="28" r="4" fill="#fff" />
      <circle cx="40" cy="28" r="4" fill="#fff" />
      <circle cx="25" cy="29" r="1.8" fill="#072861" />
      <circle cx="41" cy="29" r="1.8" fill="#072861" />
      <path
        d={`M24 40 Q32 ${40 + mouth} 40 40`}
        fill="none"
        stroke="#FCD116"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GuideBubble({
  children,
  mood = 'idle',
  size = 44,
}: {
  children: ReactNode;
  mood?: Mood;
  size?: number;
}) {
  return (
    <div className="flex items-start gap-3">
      <Mascot mood={mood} size={size} className="shrink-0" />
      <div className="flex-1 rounded-md border border-gov-border bg-white px-3 py-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-gov-blue">
          Guía
        </p>
        <div className="text-sm text-gray-800 leading-relaxed mt-0.5">{children}</div>
      </div>
    </div>
  );
}
