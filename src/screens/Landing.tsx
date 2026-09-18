import { Link } from 'react-router-dom';
import { ClaimMark } from '../components/ClaimMark';
import { GuideBubble } from '../components/Mascot';

export function Landing() {
  return (
    <div className="app-shell">
      <header className="bg-gov-blue text-white shrink-0">
        <div className="flex items-center justify-between px-4 py-2 text-xs tracking-wide">
          <span className="font-semibold uppercase">GOV.CO</span>
          <span className="opacity-90">Participación ciudadana</span>
        </div>
        <div className="bg-gov-blue-dark px-4 py-4">
          <p className="text-[11px] uppercase tracking-wider text-blue-200">
            Patria Milagro · 2026–2030
          </p>
          <h1 className="text-2xl font-bold leading-tight">Firmes</h1>
          <p className="text-sm text-blue-100 mt-1 leading-relaxed">
            Adopción ciudadana de las propuestas. Puntos educativos, no compra de
            apoyo político.
          </p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        <GuideBubble>
          Hoy es simple: racha, una misión del día y tus pendientes. Sin canje
          de dinero.
        </GuideBubble>
        <div className="rounded-2xl border-2 border-gov-blue bg-white p-4 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wide text-gov-blue">
            Temporada 1
          </p>
          <h2 className="text-lg font-bold text-gray-900 mt-1">
            Firmes · 90 días
          </h2>
          <p className="text-sm text-gov-gray mt-1.5 leading-relaxed">
            Foco en <strong>Seguridad</strong> y <strong>Salud</strong>. Quiz
            corto, Firmes al instante y certificado simbólico.
          </p>
          <ul className="mt-3 text-sm text-gray-800 space-y-1">
            <li>· Misión del día + pendientes (estilo Hoy)</li>
            <li>· Quiz de propuestas con marca «no auditado»</li>
            <li>· Sin gift cards ni compra de apoyo</li>
          </ul>
          <Link
            to="/firmes"
            className="mt-4 flex w-full items-center justify-center rounded-xl bg-gov-blue text-white font-bold py-3.5 shadow-[0_4px_0_#072861]"
          >
            Entrar a Firmes
          </Link>
        </div>

        <Link
          to="/pnd"
          className="block rounded-xl border border-gov-border bg-white p-4 hover:border-gov-blue/40"
        >
          <p className="text-[11px] font-bold uppercase tracking-wide text-gov-gray">
            Episodio anterior
          </p>
          <h2 className="text-base font-bold text-gray-900 mt-1">
            Mi Patria Milagro · priorizar PND
          </h2>
          <p className="text-sm text-gov-gray mt-1 leading-relaxed">
            Reparte 100 fichas, elige temáticas y mira el tablero demo de
            Colombia en vivo.
          </p>
          <p className="text-sm font-semibold text-gov-blue mt-2">
            Abrir episodio PND →
          </p>
        </Link>

        <section className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <h3 className="text-sm font-bold text-amber-950">
            Transparencia desde el primer toque
          </h3>
          <p className="text-sm text-amber-950/90 mt-1.5 leading-relaxed">
            Toda cifra de programa político lleva esta marca. No es progreso de
            gobierno ni dato auditado.
          </p>
          <div className="mt-2">
            <ClaimMark />
          </div>
          <p className="text-xs text-amber-900 mt-3 leading-relaxed">
            Los Firmes no se compran. No hay dinero, ni «pagar para apoyar». El
            certificado de temporada acredita que estudiaste propuestas.
          </p>
          <Link
            to="/firmes/transparencia"
            className="inline-block mt-2 text-sm font-semibold text-gov-blue underline"
          >
            Leer las reglas
          </Link>
        </section>
      </main>

      <footer className="shrink-0 border-t border-gov-border bg-white px-4 py-2 text-center text-[10px] text-gov-gray">
        Prototipo ilustrativo · De la Espriella / Restrepo 2026–2030 · Sin logos
        oficiales DNP
      </footer>
    </div>
  );
}
