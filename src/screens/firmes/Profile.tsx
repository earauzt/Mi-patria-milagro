import { Link, useNavigate } from 'react-router-dom';
import { ClaimMark } from '../../components/ClaimMark';
import { Coin, FirmesLayout, SecondaryButton } from '../../components/FirmesLayout';
import { getMunicipio } from '../../data/catalog';
import { BADGES, EXPLAINERS, getBadge } from '../../data/firmes';
import { diasLabel, totalFirmes } from '../../domain/firmes';
import { useFirmes } from '../../hooks/useFirmes';

export function Profile() {
  const { state, reset } = useFirmes();
  const navigate = useNavigate();
  const muni = getMunicipio(state.municipioId);
  const earned = BADGES.filter((b) => state.badges.includes(b.id));
  const locked = BADGES.filter((b) => !state.badges.includes(b.id));
  const explainers = EXPLAINERS.filter((e) =>
    state.unlockedExplainers.includes(e.id),
  );

  return (
    <FirmesLayout
      title="Tu perfil"
      subtitle={
        muni
          ? `${muni.nombre} · Primeros 90 días`
          : 'Ciudadano Firmes · Primeros 90 días'
      }
    >
      <div className="rounded-xl border border-gov-border bg-white p-4 mb-4">
        <p className="text-[10px] uppercase tracking-wide text-gov-gray">
          Saldo
        </p>
        <div className="mt-1">
          <Coin value={totalFirmes(state)} label="Firmes totales" />
        </div>
        <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div>
            <dt className="text-gov-gray text-xs">Aprendidos</dt>
            <dd className="font-bold tabular-nums">{state.firmesAprendidos}</dd>
          </div>
          <div>
            <dt className="text-gov-gray text-xs">Verificados</dt>
            <dd className="font-bold tabular-nums">{state.firmesVerificados}</dd>
          </div>
          <div>
            <dt className="text-gov-gray text-xs">Racha</dt>
            <dd className="font-bold tabular-nums">{diasLabel(state.streakDays)}</dd>
          </div>
          <div>
            <dt className="text-gov-gray text-xs">Misiones</dt>
            <dd className="font-bold tabular-nums">
              {Object.keys(state.completedMissions).length}
            </dd>
          </div>
        </dl>
      </div>

      <section className="mb-4">
        <h3 className="text-sm font-bold text-gray-900 mb-2">Insignias</h3>
        <ul className="space-y-2">
          {earned.map((b) => (
            <li
              key={b.id}
              className="rounded-lg border border-gov-border bg-white px-3 py-2"
            >
              <p className="text-sm font-semibold">{b.name}</p>
              <p className="text-xs text-gov-gray">{b.description}</p>
            </li>
          ))}
          {locked.map((b) => (
            <li
              key={b.id}
              className="rounded-lg border border-dashed border-gov-border px-3 py-2 opacity-60"
            >
              <p className="text-sm font-semibold">○ {b.name}</p>
              <p className="text-xs text-gov-gray">{b.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-4">
        <h3 className="text-sm font-bold text-gray-900 mb-2">
          Certificado de los 90 días
        </h3>
        {state.certificateUnlocked ? (
          <div className="rounded-xl border-2 border-gov-blue bg-white p-4 text-center">
            <p className="text-[11px] uppercase tracking-widest text-gov-gray">
              Firmes · 90 días
            </p>
            <p className="text-lg font-black text-gov-blue mt-1">
              Certificado de aprendizaje
            </p>
            <p className="text-sm text-gray-800 mt-2 leading-relaxed">
              {muni?.nombre ?? 'Colombia'} · Seguridad y Salud
            </p>
            <p className="text-xs text-gov-gray mt-2 leading-relaxed">
              Acredita que estudiaste propuestas de los primeros 90 días. No
              constituye apoyo político pagado ni verificación oficial de
              resultados.
            </p>
            {getBadge('temporada-1') && (
              <p className="text-xs font-semibold text-gov-blue mt-2">
                Insignia «Certificado de los 90 días»
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-gov-gray leading-relaxed">
            Se obtiene al completar 3 misiones, incluyendo al menos una de
            Seguridad y una de Salud.
          </p>
        )}
      </section>

      {explainers.length > 0 && (
        <section className="mb-4">
          <h3 className="text-sm font-bold text-gray-900 mb-2">
            Textos de contexto
          </h3>
          <ul className="space-y-2">
            {explainers.map((e) => (
              <li
                key={e.id}
                className="rounded-lg border border-gov-border bg-white px-3 py-2"
              >
                <p className="text-sm font-semibold">{e.title}</p>
                <p className="text-xs text-gov-gray mt-1 leading-relaxed">
                  {e.body}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mb-4">
        <ClaimMark />
      </div>

      <Link
        to="/firmes/transparencia"
        className="block text-sm font-semibold text-gov-blue mb-2"
      >
        Cómo se ganan Firmes
      </Link>
      <Link
        to="/firmes/gremio"
        className="block text-sm text-gov-gray mb-4"
      >
        Equipo del municipio
      </Link>

      <SecondaryButton
        onClick={() => {
          reset();
          navigate('/firmes/onboarding', { replace: true });
        }}
      >
        Reiniciar demo Firmes
      </SecondaryButton>
    </FirmesLayout>
  );
}
