import { Layout, PrimaryButton } from '../components/Layout';
import { EJES } from '../data/catalog';
import { fichasSum, type EjeId } from '../domain/types';
import { useEpisode } from '../hooks/useEpisode';

export function Fichas() {
  const { episode, setFicha, update, setScreen } = useEpisode();
  const sum = fichasSum(episode.fichas);
  const remaining = 100 - sum;
  const canConfirm = sum === 100;

  function distributeEven() {
    const base = Math.floor(100 / EJES.length);
    const leftover = 100 - base * EJES.length;
    const fichas = { ...episode.fichas };
    EJES.forEach((e, i) => {
      fichas[e.id] = base + (i < leftover ? 1 : 0);
    });
    update({ fichas });
  }

  function suggestSocial() {
    const weights: Record<EjeId, number> = {
      reconstruccion: 15,
      patriotismo: 10,
      milagro_social: 30,
      milagro_economico: 20,
      regiones: 15,
      estado: 10,
    };
    update({ fichas: { ...weights } });
  }

  return (
    <Layout
      title="100 fichas"
      subtitle="Reparte el peso relativo entre los seis ejes del Plan. La suma debe ser exactamente 100."
    >
      <div
        className={`mb-4 rounded-lg px-3 py-2 text-sm font-semibold flex justify-between items-center ${
          canConfirm
            ? 'bg-green-50 text-green-800 border border-green-200'
            : remaining < 0
              ? 'bg-red-50 text-red-800 border border-red-200'
              : 'bg-gov-blue-light text-gov-blue border border-blue-200'
        }`}
      >
        <span>Suma actual</span>
        <span className="text-lg tabular-nums">{sum} / 100</span>
      </div>

      <div className="space-y-4 mb-5">
        {EJES.map((eje) => {
          const val = episode.fichas[eje.id];
          return (
            <div key={eje.id} className="bg-white rounded-lg border border-gov-border p-3">
              <div className="flex justify-between gap-2 mb-2">
                <label className="text-sm font-medium text-gray-900 leading-snug">
                  {eje.nombre}
                </label>
                <span className="text-sm font-bold text-gov-blue tabular-nums shrink-0">
                  {val}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={val}
                onChange={(e) => setFicha(eje.id, Number(e.target.value))}
                className="w-full"
                aria-label={eje.nombre}
              />
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={distributeEven}
          className="flex-1 text-xs py-2 rounded border border-gov-border bg-white text-gov-gray"
        >
          Distribuir igual
        </button>
        <button
          type="button"
          onClick={suggestSocial}
          className="flex-1 text-xs py-2 rounded border border-gov-border bg-white text-gov-gray"
        >
          Sugerencia demo
        </button>
      </div>

      {!canConfirm && (
        <p className="text-xs text-gov-gray mb-3 text-center">
          {remaining > 0
            ? `Te faltan ${remaining} fichas por asignar.`
            : `Quita ${Math.abs(remaining)} fichas para llegar a 100.`}
        </p>
      )}

      <PrimaryButton
        disabled={!canConfirm}
        onClick={() => setScreen('priorizar')}
      >
        Confirmar distribución
      </PrimaryButton>
    </Layout>
  );
}
