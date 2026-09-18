import { Link } from 'react-router-dom';
import { ClaimMark } from '../../components/ClaimMark';
import { FirmesLayout } from '../../components/FirmesLayout';
import {
  ejeUnlockLevel,
  FIRMES_EJES,
  missionsForEje,
} from '../../data/firmes';
import { countByEje, hasCompleted } from '../../domain/firmes';
import { useFirmes } from '../../hooks/useFirmes';

export function SkillTree() {
  const { state } = useFirmes();

  return (
    <FirmesLayout
      title="Ejes"
      subtitle="Seis ejes del portal. Seguridad y Salud van más abiertos en la Temporada 1. El loop diario vive en Hoy."
    >
      <div className="mb-4">
        <ClaimMark />
      </div>
      <ol className="space-y-3">
        {FIRMES_EJES.map((eje, i) => {
          const level = ejeUnlockLevel(eje.id);
          const { done, total } = countByEje(state, missionsForEje(eje.id), eje.id);
          const missions = missionsForEje(eje.id);
          const chosen = state.chosenEjes.includes(eje.id);
          return (
            <li
              key={eje.id}
              className="rounded-xl border border-gov-border bg-white overflow-hidden"
            >
              <div className="px-3 py-3 flex items-start justify-between gap-2">
                <div>
                  <p className="text-[11px] text-gov-gray">
                    0{i + 1} · {level === 'abierto' ? 'Abierto T1' : 'Vista previa'}
                  </p>
                  <h3 className="font-bold text-gray-900">{eje.nombre}</h3>
                  <p className="text-xs text-gov-gray mt-1 leading-relaxed">
                    {eje.blurb}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold tabular-nums text-gov-blue">
                    {done}/{total}
                  </p>
                  {chosen && (
                    <p className="text-[10px] font-bold uppercase text-gov-blue">
                      Tu foco
                    </p>
                  )}
                </div>
              </div>
              <ul className="border-t border-gov-border divide-y divide-gov-border">
                {missions.map((m) => {
                  const doneM = hasCompleted(state, m.id);
                  return (
                    <li key={m.id}>
                      <Link
                        to={`/firmes/mision/${m.id}`}
                        className="flex items-center justify-between gap-2 px-3 py-2.5 text-sm"
                      >
                        <span>
                          <span className="font-medium text-gray-900">
                            {m.title}
                          </span>
                          <span className="block text-[11px] text-gov-gray">
                            {m.type === 'quiz'
                              ? 'Quiz'
                              : m.type === 'checklist'
                                ? 'Lista'
                                : 'Reporte'}{' '}
                            · {m.firmesReward} F · {m.firmesKind}
                          </span>
                        </span>
                        <span
                          className={`text-[11px] font-bold ${
                            doneM ? 'text-green-700' : 'text-gov-blue'
                          }`}
                        >
                          {doneM ? 'Hecha' : 'Abrir'}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ol>
    </FirmesLayout>
  );
}
