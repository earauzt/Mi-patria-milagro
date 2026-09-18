import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClaimMark } from '../../components/ClaimMark';
import {
  Coin,
  FireStreak,
  FirmesLayout,
} from '../../components/FirmesLayout';
import { GuideBubble } from '../../components/Mascot';
import { DAILY_TODOS, getMission, MISSIONS } from '../../data/firmes';
import {
  diasLabel,
  hasCompleted,
  hasDailyTodo,
  pickMissionDelDia,
  totalFirmes,
} from '../../domain/firmes';
import { useFirmes } from '../../hooks/useFirmes';

export function Home() {
  const { state, completeDailyTodo } = useFirmes();
  const featured = pickMissionDelDia(state, MISSIONS) ?? getMission('seg-quiz-90');
  const featuredDone = featured ? hasCompleted(state, featured.id) : false;
  const [justAwarded, setJustAwarded] = useState<string | null>(null);

  useEffect(() => {
    if (!justAwarded) return;
    const t = window.setTimeout(() => setJustAwarded(null), 1600);
    return () => window.clearTimeout(t);
  }, [justAwarded]);

  const todosDone = DAILY_TODOS.filter((t) =>
    t.id === 'todo-mision'
      ? featuredDone || hasDailyTodo(state, t.id)
      : hasDailyTodo(state, t.id),
  ).length;

  const greet =
    state.streakDays === 0
      ? 'Empieza por la misión del día.'
      : `Llevas ${diasLabel(state.streakDays)} seguido${state.streakDays === 1 ? '' : 's'}. Sigue con la misión de hoy.`;

  return (
    <FirmesLayout title="Hoy" hideHeading>
      <h2 className="sr-only">Hoy</h2>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="rounded-md border border-orange-200 bg-orange-50/80 p-3">
          <FireStreak days={state.streakDays} />
        </div>
        <div className="rounded-md border border-yellow-300 bg-yellow-50 p-3">
          <Coin value={totalFirmes(state)} label="Firmes" />
        </div>
      </div>

      <div className="mb-4">
        <GuideBubble mood={featuredDone && todosDone === DAILY_TODOS.length ? 'cheer' : 'idle'}>
          {featuredDone && todosDone === DAILY_TODOS.length
            ? 'Listo por hoy. Vuelve mañana.'
            : greet}
        </GuideBubble>
      </div>

      {featured && (
        <section className="rounded-md border border-gov-blue bg-white p-4 mb-4">
          <p className="text-[11px] font-bold uppercase tracking-wide text-gov-blue">
            Misión del día
          </p>
          <h3 className="text-lg font-bold text-gray-900 mt-1">
            {featured.title}
          </h3>
          <p className="text-sm text-gov-gray mt-1 leading-relaxed">
            {featured.summary}
          </p>
          <p className="text-sm font-semibold text-gov-blue mt-2">
            +{featured.firmesReward} Firmes {featured.firmesKind} ·{' '}
            {featured.type === 'quiz'
              ? `${featured.quiz?.length ?? 0} preguntas`
              : featured.type === 'checklist'
                ? 'Lista de 90 días'
                : 'Reporte de prueba'}
          </p>
          {featured.claims[0] && (
            <div className="mt-2">
              <ClaimMark compact />
            </div>
          )}
          <Link
            to={`/firmes/mision/${featured.id}`}
            className="mt-3 flex w-full items-center justify-center rounded-md bg-gov-blue text-white font-semibold py-3.5"
          >
            {featuredDone ? 'Repasar misión' : 'Empezar misión'}
          </Link>
        </section>
      )}

      <section className="rounded-md border border-gov-border bg-white p-4 mb-4">
        <div className="flex items-baseline justify-between gap-2 mb-3">
          <h3 className="text-sm font-bold text-gray-900">Pendientes de hoy</h3>
          <p className="text-xs tabular-nums text-gov-gray">
            {todosDone}/{DAILY_TODOS.length}
          </p>
        </div>
        <ul className="space-y-2">
          {DAILY_TODOS.map((todo) => {
            const done =
              todo.id === 'todo-mision'
                ? featuredDone || hasDailyTodo(state, todo.id)
                : hasDailyTodo(state, todo.id);
            const lockedMission = todo.kind === 'mission';
            return (
              <li key={todo.id}>
                <button
                  type="button"
                  disabled={done}
                  onClick={() => {
                    if (lockedMission) return;
                    const gained = completeDailyTodo(todo.id);
                    if (gained > 0) setJustAwarded(`+${gained} Firmes`);
                  }}
                  className={`w-full text-left rounded-md border px-3 py-3 ${
                    done
                      ? 'border-green-200 bg-green-50'
                      : 'border-gov-border bg-white'
                  }`}
                >
                  <span className="flex items-start gap-2.5">
                    <span
                      className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-md border text-sm shrink-0 ${
                        done
                          ? 'bg-gov-blue border-gov-blue text-white'
                          : 'border-gov-border bg-white text-transparent'
                      }`}
                      aria-hidden
                    >
                      ✓
                    </span>
                    <span>
                      <span
                        className={`block text-sm font-medium ${
                          done ? 'text-green-900 line-through decoration-green-400' : 'text-gray-900'
                        }`}
                      >
                        {todo.text}
                      </span>
                      <span className="block text-[11px] text-gov-gray mt-0.5 leading-relaxed">
                        {lockedMission
                          ? featuredDone
                            ? 'Ya registraste la misión del día.'
                            : todo.hint
                          : done
                            ? `Hecho · +${todo.firmesReward} Firmes aprendidos`
                            : `${todo.hint} · +${todo.firmesReward} F`}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        {justAwarded && (
          <p className="todo-pop mt-3 text-center text-sm font-bold text-gov-blue">
            {justAwarded}
          </p>
        )}
      </section>

      <p className="text-xs text-gov-gray leading-relaxed mb-3">
        Primeros 90 días. Seguridad y salud. Los Firmes miden estudio, no
        resultados de gobierno. El equipo del municipio está en Perfil.
      </p>
      <Link to="/firmes/transparencia" className="block text-sm text-gov-gray">
        Cómo se ganan Firmes
      </Link>
    </FirmesLayout>
  );
}
