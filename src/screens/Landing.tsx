import { Link } from 'react-router-dom';
import { ClaimMark } from '../components/ClaimMark';

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
            Estudia las propuestas de los primeros 90 días. Los Firmes son
            puntos de estudio, no dinero.
          </p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        <div className="rounded-md border border-gov-blue bg-white p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gov-blue">
            Primeros 90 días
          </p>
          <h2 className="text-lg font-bold text-gray-900 mt-1">
            Seguridad y salud
          </h2>
          <p className="text-sm text-gov-gray mt-1.5 leading-relaxed">
            Una misión al día, una lista corta y un certificado de estudio.
          </p>
          <Link
            to="/firmes"
            className="mt-4 flex w-full items-center justify-center rounded-md bg-gov-blue text-white font-semibold py-3"
          >
            Entrar a Firmes
          </Link>
        </div>

        <Link
          to="/pnd"
          className="block rounded-md border border-gov-border bg-white p-4"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gov-gray">
            También disponible
          </p>
          <h2 className="text-base font-bold text-gray-900 mt-1">
            Mi Patria Milagro · priorizar PND
          </h2>
          <p className="text-sm text-gov-gray mt-1 leading-relaxed">
            Reparte 100 fichas, elige temáticas y mira el tablero de Colombia.
          </p>
          <p className="text-sm font-semibold text-gov-blue mt-2">
            Abrir priorización PND
          </p>
        </Link>

        <section className="rounded-md border border-amber-200 bg-amber-50 p-4">
          <h3 className="text-sm font-bold text-amber-950">Sobre las cifras</h3>
          <p className="text-sm text-amber-950/90 mt-1.5 leading-relaxed">
            Las cifras que ves aquí son del programa. No están verificadas y no
            miden avance de gobierno.
          </p>
          <div className="mt-2">
            <ClaimMark />
          </div>
          <Link
            to="/firmes/transparencia"
            className="inline-block mt-2 text-sm font-semibold text-gov-blue underline"
          >
            Cómo se ganan Firmes
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
