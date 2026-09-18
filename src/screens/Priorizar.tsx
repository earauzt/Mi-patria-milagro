import { useState } from 'react';
import { Layout, PrimaryButton } from '../components/Layout';
import { TEMATICAS_MILAGRO_SOCIAL } from '../data/catalog';
import { useEpisode } from '../hooks/useEpisode';

const MAX = 3;

export function Priorizar() {
  const { episode, update, setScreen } = useEpisode();
  const [selected, setSelected] = useState<string[]>(episode.tematicas);
  const [note, setNote] = useState<string | null>(null);

  function toggle(id: string, nombre: string) {
    setNote(null);
    if (selected.includes(id)) {
      setSelected(selected.filter((x) => x !== id));
      return;
    }
    if (selected.length >= MAX) {
      setNote(
        `Al elegir «${nombre}» se pospone otra opción: ya tienes ${MAX} temáticas. Desmarca una para cambiar.`,
      );
      return;
    }
    const next = [...selected, id];
    setSelected(next);
    if (next.length === MAX) {
      const postponed = TEMATICAS_MILAGRO_SOCIAL.filter(
        (t) => !next.includes(t.id),
      );
      const sample = postponed.slice(0, 2).map((t) => t.nombre).join(', ');
      setNote(
        `Selección completa. Otras opciones (p. ej. ${sample}…) quedan pospuestas para este episodio.`,
      );
    } else {
      setNote(
        `«${nombre}» priorizada. Puedes elegir ${MAX - next.length} más; el resto queda pospuesto.`,
      );
    }
  }

  function confirm() {
    if (selected.length !== MAX) return;
    update({ tematicas: selected, postponedNote: note });
    setScreen('municipio');
  }

  return (
    <Layout
      title="Priorizar · Milagro Social"
      subtitle={`Elige exactamente ${MAX} temáticas. Al seleccionar, otras opciones se posponen en este episodio.`}
      actions={
        <PrimaryButton disabled={selected.length !== MAX} onClick={confirm}>
          Confirmar 3 temáticas
        </PrimaryButton>
      }
    >
      <p className="text-xs font-medium text-gov-blue mb-3">
        Seleccionadas: {selected.length} / {MAX}
      </p>

      <ul className="space-y-2 mb-4">
        {TEMATICAS_MILAGRO_SOCIAL.map((t) => {
          const on = selected.includes(t.id);
          return (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => toggle(t.id, t.nombre)}
                className={`w-full text-left rounded-lg border px-3 py-3 text-sm font-medium transition-colors ${
                  on
                    ? 'border-gov-blue bg-gov-blue-light text-gov-blue-dark ring-1 ring-gov-blue'
                    : 'border-gov-border bg-white text-gray-800 hover:border-gov-blue/40'
                }`}
                aria-pressed={on}
              >
                <span className="inline-flex items-center gap-2">
                  <span
                    className={`w-5 h-5 rounded border flex items-center justify-center text-xs ${
                      on
                        ? 'bg-gov-blue border-gov-blue text-white'
                        : 'border-gov-border'
                    }`}
                  >
                    {on ? '✓' : ''}
                  </span>
                  {t.nombre}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {note && (
        <div
          className="mb-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-sm px-3 py-2"
          role="status"
        >
          {note}
        </div>
      )}
    </Layout>
  );
}
