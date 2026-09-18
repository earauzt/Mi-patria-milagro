import { Layout, PrimaryButton, SecondaryButton } from '../components/Layout';
import { REGION_LABELS, TABLERO_DEMO } from '../data/catalog';
import { useEpisode } from '../hooks/useEpisode';

export function Tablero() {
  const { reset, setScreen } = useEpisode();
  const maxPeso = Math.max(...TABLERO_DEMO.regiones.map((r) => r.peso));

  return (
    <Layout
      title="Colombia en vivo"
      subtitle="Totales de participación y prioridad #1 por región (datos de demostración)."
    >
      <div className="grid grid-cols-3 gap-2 mb-5">
        <Metric
          value={TABLERO_DEMO.participaciones.toLocaleString('es-CO')}
          label="Participaciones"
        />
        <Metric value={String(TABLERO_DEMO.municipios)} label="Municipios" />
        <Metric
          value={`${TABLERO_DEMO.pctVerificadas}%`}
          label="Verificadas"
        />
      </div>

      <h3 className="text-sm font-bold text-gray-900 mb-2">
        Intensidad por región
      </h3>
      <div className="bg-white border border-gov-border rounded-lg p-3 mb-5 space-y-3">
        {TABLERO_DEMO.regiones.map((r) => {
          const pct = Math.round((r.peso / maxPeso) * 100);
          const heat =
            pct > 90
              ? 'bg-gov-blue'
              : pct > 75
                ? 'bg-blue-600'
                : pct > 60
                  ? 'bg-blue-500'
                  : 'bg-blue-400';
          return (
            <div key={r.id}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium">{REGION_LABELS[r.id]}</span>
                <span className="text-gov-gray tabular-nums">
                  {r.participaciones.toLocaleString('es-CO')} · índice {r.peso}
                </span>
              </div>
              <div className="h-3 bg-gov-blue-light rounded-full overflow-hidden">
                <div
                  className={`h-full ${heat} rounded-full transition-all`}
                  style={{ width: `${pct}%` }}
                  title={`Heat ${pct}%`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Simple heatmap grid */}
      <h3 className="text-sm font-bold text-gray-900 mb-2">
        Mapa simplificado (heatmap)
      </h3>
      <div className="grid grid-cols-2 gap-2 mb-5">
        {TABLERO_DEMO.regiones.map((r) => {
          const intensity = r.peso / 100;
          return (
            <div
              key={r.id}
              className="rounded-lg p-3 text-white text-center min-h-[72px] flex flex-col justify-center"
              style={{
                backgroundColor: `rgba(11, 59, 140, ${0.35 + intensity * 0.65})`,
              }}
            >
              <span className="text-xs font-bold leading-tight">
                {REGION_LABELS[r.id]}
              </span>
              <span className="text-[10px] opacity-90 mt-1 leading-tight">
                #1 {r.prioridad}
              </span>
            </div>
          );
        })}
      </div>

      <h3 className="text-sm font-bold text-gray-900 mb-2">
        Prioridad #1 por región
      </h3>
      <ul className="bg-white border border-gov-border rounded-lg divide-y divide-gov-border mb-5">
        {TABLERO_DEMO.regiones.map((r) => (
          <li
            key={r.id}
            className="px-3 py-2.5 flex justify-between gap-2 text-sm"
          >
            <span className="font-medium text-gray-800">
              {REGION_LABELS[r.id]}
            </span>
            <span className="text-gov-blue text-right">{r.prioridad}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-2">
        <PrimaryButton
          onClick={() => {
            reset();
            setScreen('entrar');
          }}
        >
          Volver al inicio
        </PrimaryButton>
        <SecondaryButton onClick={() => setScreen('cierre')}>
          Regresar a Tu Colombia
        </SecondaryButton>
      </div>
    </Layout>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white border border-gov-border rounded-lg px-2 py-3 text-center">
      <p className="text-lg font-bold text-gov-blue tabular-nums leading-tight">
        {value}
      </p>
      <p className="text-[10px] text-gov-gray mt-1 leading-tight">{label}</p>
    </div>
  );
}
