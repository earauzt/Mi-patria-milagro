import { useState } from 'react';
import { Layout, PrimaryButton } from '../components/Layout';
import { INDICADORES } from '../data/catalog';
import { useEpisode } from '../hooks/useEpisode';

export function Vara() {
  const { episode, update, setScreen } = useEpisode();
  const [indicadorId, setIndicadorId] = useState(episode.indicadorId || '');

  function confirm() {
    if (!INDICADORES.some((item) => item.id === indicadorId)) return;
    update({
      indicadorId,
      completedAt: new Date().toISOString(),
    });
    setScreen('cierre');
  }

  return (
    <Layout
      title="La vara"
      subtitle="Elige un indicador de resultado para medir el avance de tus prioridades."
      actions={
        <PrimaryButton
          disabled={!INDICADORES.some((item) => item.id === indicadorId)}
          onClick={confirm}
        >
          Cerrar episodio
        </PrimaryButton>
      }
    >
      <ul className="space-y-3 mb-5">
        {INDICADORES.map((ind) => {
          const on = indicadorId === ind.id;
          return (
            <li key={ind.id}>
              <button
                type="button"
                onClick={() => setIndicadorId(ind.id)}
                className={`w-full text-left rounded-lg border px-4 py-3 transition-colors ${
                  on
                    ? 'border-gov-blue bg-gov-blue-light ring-1 ring-gov-blue'
                    : 'border-gov-border bg-white hover:border-gov-blue/40'
                }`}
                aria-pressed={on}
              >
                <p className="font-semibold text-gray-900 text-sm">{ind.nombre}</p>
                <p className="text-xs text-gov-gray mt-1 leading-relaxed">
                  {ind.descripcion}
                </p>
                <p className="text-[11px] text-gov-blue mt-1.5 font-medium">
                  Unidad: {ind.unidad}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}
