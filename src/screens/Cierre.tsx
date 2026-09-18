import { useState } from 'react';
import { Layout, PrimaryButton, SecondaryButton } from '../components/Layout';
import {
  EJES,
  getMunicipio,
  INDICADORES,
  TABLERO_DEMO,
  TEMATICAS_MILAGRO_SOCIAL,
} from '../data/catalog';
import { useEpisode } from '../hooks/useEpisode';

export function Cierre() {
  const { episode, setScreen } = useEpisode();
  const [shared, setShared] = useState(false);
    const muni = getMunicipio(episode.municipioId);

  const topEje = EJES.reduce((best, e) =>
    (episode.fichas[e.id] ?? 0) > (episode.fichas[best.id] ?? 0) ? e : best,
  );
  const misTemas = TEMATICAS_MILAGRO_SOCIAL.filter((t) =>
    episode.tematicas.includes(t.id),
  );
  const miTopTema = misTemas[0]?.nombre ?? '—';
  const muniTop = muni ? (TABLERO_DEMO.municipioTop[muni.id] ?? '—') : '—';
  const ind = INDICADORES.find((i) => i.id === episode.indicadorId);

  return (
    <Layout
      title="Tu Colombia"
      subtitle="Comparación de prioridades: tú, tu municipio y el país (datos demo)."
      actions={
        <div className="space-y-2">
          <SecondaryButton onClick={() => setShared(true)}>
            Compartir tarjeta
          </SecondaryButton>
          <PrimaryButton onClick={() => setScreen('tablero')}>
            Ver Colombia en vivo
          </PrimaryButton>
        </div>
      }
    >
      <div className="flex justify-center mb-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-gov-blue text-white px-4 py-2 text-sm font-semibold shadow">
          <span aria-hidden>🏅</span>
          Constructor del Plan 1/5
        </div>
      </div>

      <div className="space-y-3 mb-5">
        <CompareCard
          label="Tú"
          accent="bg-gov-blue text-white"
          lines={[
            `Eje con más fichas: ${topEje.corto} (${episode.fichas[topEje.id]})`,
            `Temáticas: ${misTemas.map((t) => t.nombre).join(' · ') || '—'}`,
            `Prioridad local: ${episode.prioridadLocal ?? '—'}`,
            `Indicador: ${ind?.nombre ?? '—'}`,
          ]}
        />
        <CompareCard
          label={muni ? `Municipio · ${muni.nombre}` : 'Municipio'}
          accent="bg-sky-700 text-white"
          lines={[`Prioridad #1 agregada: ${muniTop}`]}
        />
        <CompareCard
          label="Colombia"
          accent="bg-gray-800 text-white"
          lines={[`Prioridad #1 nacional: ${TABLERO_DEMO.colombiaTop}`]}
        />
      </div>

      <div className="bg-white border border-gov-border rounded-lg p-4 mb-4 text-center">
        <p className="text-xs text-gov-gray uppercase tracking-wide mb-1">
          Tarjeta de participación
        </p>
        <p className="font-bold text-gov-blue">Mi Patria Milagro</p>
        <p className="text-sm mt-1">
          {muni?.nombre ?? '—'} · {miTopTema}
        </p>
        <p className="text-[11px] text-gov-gray mt-2">
          Aporte registrado de forma agregada · Episodio 1 de 5
        </p>
      </div>

      {shared && (
        <p className="text-sm text-green-700 text-center mb-3" role="status">
          Listo (demo): tarjeta lista para compartir. En producción se abriría el
          menú nativo de compartir.
        </p>
      )}
    </Layout>
  );
}

function CompareCard({
  label,
  accent,
  lines,
}: {
  label: string;
  accent: string;
  lines: string[];
}) {
  return (
    <div className="rounded-lg border border-gov-border overflow-hidden bg-white">
      <div className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${accent}`}>
        {label}
      </div>
      <ul className="px-3 py-2 space-y-1">
        {lines.map((l) => (
          <li key={l} className="text-sm text-gray-800 leading-snug">
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}
