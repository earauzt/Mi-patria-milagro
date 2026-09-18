import { useState } from 'react';
import { Layout, PrimaryButton } from '../components/Layout';
import { getMunicipio, PRIORIDADES_LOCALES } from '../data/catalog';
import { useEpisode } from '../hooks/useEpisode';

export function MunicipioScreen() {
  const { episode, update, setScreen } = useEpisode();
  const muni = getMunicipio(episode.municipioId);
  const [prioridad, setPrioridad] = useState(episode.prioridadLocal || '');

  if (!muni) {
    return (
      <Layout title="Mi municipio" subtitle="Primero elige un municipio.">
        <PrimaryButton onClick={() => setScreen('entrar')}>
          Volver a Entrar
        </PrimaryButton>
      </Layout>
    );
  }

  const { stats } = muni;

  return (
    <Layout
      title={`Mi municipio · ${muni.nombre}`}
      subtitle={`${muni.departamento} · Datos demo tipo TerriData para orientar tu prioridad local.`}
      actions={
        <PrimaryButton
          disabled={!PRIORIDADES_LOCALES.includes(prioridad)}
          onClick={() => {
            if (!PRIORIDADES_LOCALES.includes(prioridad)) return;
            update({ prioridadLocal: prioridad });
            setScreen('vara');
          }}
        >
          Continuar a La vara
        </PrimaryButton>
      }
    >
      <div className="grid grid-cols-1 gap-3 mb-5">
        <StatCard
          label="Cobertura de acueducto"
          value={`${stats.acueductoPct}%`}
          highlight={stats.acueductoPct < 70}
        />
        <StatCard
          label="Aulas averiadas"
          value={`${stats.aulasAveriadas}`}
          highlight={stats.aulasAveriadas > 15}
        />
        <StatCard
          label="Horas a la cabecera"
          value={`${stats.horasACabecera} h`}
          highlight={stats.horasACabecera >= 2}
        />
        <StatCard label="Pobreza monetaria (ref.)" value={`${stats.pobrezaPct}%`} />
      </div>

      {stats.nota && (
        <p className="text-[11px] text-gov-gray mb-4 italic">{stats.nota}</p>
      )}

      <fieldset className="block mb-0 min-w-0 border-0 p-0 m-0">
        <legend className="text-sm font-medium text-gray-800 px-0">
          ¿Cuál es tu prioridad local?
        </legend>
        <div className="mt-2 space-y-2">
          {PRIORIDADES_LOCALES.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPrioridad(p)}
              aria-pressed={prioridad === p}
              className={`w-full text-left rounded-lg border px-3 py-2.5 text-sm ${
                prioridad === p
                  ? 'border-gov-blue bg-gov-blue-light text-gov-blue-dark font-semibold'
                  : 'border-gov-border bg-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </fieldset>
    </Layout>
  );
}

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border px-4 py-3 flex justify-between items-center ${
        highlight
          ? 'border-amber-300 bg-amber-50'
          : 'border-gov-border bg-white'
      }`}
    >
      <span className="text-sm text-gov-gray">{label}</span>
      <span
        className={`text-xl font-bold tabular-nums ${
          highlight ? 'text-amber-800' : 'text-gov-blue'
        }`}
      >
        {value}
      </span>
    </div>
  );
}
