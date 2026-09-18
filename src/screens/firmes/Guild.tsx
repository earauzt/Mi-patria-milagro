import { ClaimMark } from '../../components/ClaimMark';
import { FirmesLayout } from '../../components/FirmesLayout';
import { getMunicipio } from '../../data/catalog';
import { guildForMunicipio } from '../../data/firmes';
import { totalFirmes } from '../../domain/firmes';
import { useFirmes } from '../../hooks/useFirmes';

export function Guild() {
  const { state } = useFirmes();
  const muni = getMunicipio(state.municipioId);
  const board = guildForMunicipio(state.municipioId, {
    firmes: totalFirmes(state),
    streak: state.streakDays,
  });
  const youRank = board.findIndex((m) => m.isYou) + 1;

  return (
    <FirmesLayout
      title="Gremio local"
      subtitle={
        muni
          ? `${muni.nombre} · ${muni.departamento}. Posiciones de demostración.`
          : 'Elige municipio en el onboarding para anclar el gremio.'
      }
    >
      <div className="rounded-xl border border-gov-border bg-white p-3 mb-4 flex justify-between">
        <div>
          <p className="text-[10px] uppercase text-gov-gray">Tu puesto</p>
          <p className="text-2xl font-black text-gov-blue tabular-nums">
            #{youRank}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase text-gov-gray">Racha del gremio</p>
          <p className="text-sm font-semibold text-gray-800">
            Vecinos demo + tú
          </p>
        </div>
      </div>

      <div className="mb-3">
        <ClaimMark compact />
        <p className="text-[11px] text-gov-gray mt-1">
          Nadie en este tablero representa un funcionario ni un avance oficial.
        </p>
      </div>

      <ol className="rounded-xl border border-gov-border bg-white divide-y divide-gov-border overflow-hidden">
        {board.map((row, i) => (
          <li
            key={row.id}
            className={`flex items-center justify-between px-3 py-3 ${
              row.isYou ? 'bg-gov-blue-light' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-6 text-sm font-bold text-gov-gray tabular-nums">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">{row.name}</p>
                <p className="text-[11px] text-gov-gray">
                  Racha {row.streak} días
                </p>
              </div>
            </div>
            <p className="text-sm font-bold tabular-nums text-gov-blue">
              {row.firmes} F
            </p>
          </li>
        ))}
      </ol>
    </FirmesLayout>
  );
}
