import { Link } from 'react-router-dom';
import { ClaimMark } from '../../components/ClaimMark';
import { Coin, FirmesLayout } from '../../components/FirmesLayout';
import { getMunicipio } from '../../data/catalog';
import { FIRMES_EJES, getMission, MISSIONS } from '../../data/firmes';
import { hasCompleted, totalFirmes } from '../../domain/firmes';
import { useFirmes } from '../../hooks/useFirmes';

export function Home() {
  const { state } = useFirmes();
  const muni = getMunicipio(state.municipioId);
  const featured =
    MISSIONS.find(
      (m) =>
        m.featured &&
        !hasCompleted(state, m.id) &&
        (state.chosenEjes.length === 0 || state.chosenEjes.includes(m.ejeId)),
    ) ??
    MISSIONS.find((m) => m.season1Focus && !hasCompleted(state, m.id)) ??
    MISSIONS.find((m) => !hasCompleted(state, m.id)) ??
    getMission('seg-quiz-90');

  const doneCount = Object.keys(state.completedMissions).length;
  const chosen = FIRMES_EJES.filter((e) => state.chosenEjes.includes(e.id));

  return (
    <FirmesLayout
      title="Temporada 1"
      subtitle="Foco Seguridad + Salud. Los Firmes miden aprendizaje ciudadano, no resultados de gobierno."
    >
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="rounded-xl border border-gov-border bg-white p-3">
          <p className="text-[10px] uppercase tracking-wide text-gov-gray">
            Racha
          </p>
          <p className="text-2xl font-black text-gov-blue tabular-nums mt-1">
            {state.streakDays}
            <span className="text-sm font-semibold text-gov-gray"> días</span>
          </p>
        </div>
        <div className="rounded-xl border border-gov-border bg-white p-3">
          <p className="text-[10px] uppercase tracking-wide text-gov-gray">
            Saldo
          </p>
          <div className="mt-1">
            <Coin value={totalFirmes(state)} label="Firmes" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gov-border bg-white p-3 mb-4">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-gov-gray">Aprendidos</span>
          <span className="font-bold tabular-nums">{state.firmesAprendidos}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gov-gray">Verificados (demo)</span>
          <span className="font-bold tabular-nums">
            {state.firmesVerificados}
          </span>
        </div>
        <p className="text-[11px] text-gov-gray mt-2 leading-relaxed">
          Aprendidos = estudiar propuestas. Verificados = reportes enviados (sin
          auditoría real en este MVP).
        </p>
      </div>

      {featured && (
        <section className="rounded-xl border-2 border-gov-blue bg-white p-4 mb-4">
          <p className="text-[11px] font-bold uppercase tracking-wide text-gov-blue">
            Misión destacada
          </p>
          <h3 className="text-base font-bold text-gray-900 mt-1">
            {featured.title}
          </h3>
          <p className="text-sm text-gov-gray mt-1 leading-relaxed">
            {featured.summary}
          </p>
          {featured.claims[0] && (
            <div className="mt-2">
              <ClaimMark compact />
            </div>
          )}
          <Link
            to={`/firmes/mision/${featured.id}`}
            className="mt-3 flex w-full items-center justify-center rounded-lg bg-gov-blue text-white font-semibold py-3"
          >
            {hasCompleted(state, featured.id) ? 'Volver a leer' : 'Jugar misión'}
          </Link>
        </section>
      )}

      <section className="rounded-xl border border-gov-border bg-white p-4 mb-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-gov-gray">
              Gremio
            </p>
            <h3 className="font-bold text-gray-900">
              {muni ? `${muni.nombre}, ${muni.departamento}` : 'Tu municipio'}
            </h3>
            <p className="text-sm text-gov-gray mt-1">
              Tablero local de demostración. Tus Firmes cuentan para el puesto.
            </p>
          </div>
        </div>
        <Link
          to="/firmes/gremio"
          className="mt-3 inline-block text-sm font-semibold text-gov-blue"
        >
          Ver gremio y posiciones →
        </Link>
      </section>

      <p className="text-xs text-gov-gray mb-2">
        {doneCount} misiones hechas · Ejes elegidos:{' '}
        {chosen.map((e) => e.corto).join(', ') || '—'}
      </p>
      <Link
        to="/firmes/ejes"
        className="block text-sm font-semibold text-gov-blue mb-2"
      >
        Abrir árbol de 6 ejes
      </Link>
      <Link to="/firmes/transparencia" className="block text-sm text-gov-gray">
        Cómo se ganan Firmes
      </Link>
    </FirmesLayout>
  );
}
