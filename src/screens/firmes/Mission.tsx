import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ClaimCard, ClaimMark } from '../../components/ClaimMark';
import { FirmesLayout, PrimaryButton } from '../../components/FirmesLayout';
import { GuideBubble } from '../../components/Mascot';
import { GEO_DEMO, getEje, getMission } from '../../data/firmes';
import { hasCompleted, type QuizQuestion } from '../../domain/firmes';
import { useFirmes } from '../../hooks/useFirmes';

export function Mission() {
  const { id } = useParams();
  const mission = getMission(id);
  const { state, completeMission } = useFirmes();
  const navigate = useNavigate();

  if (!mission) {
    return (
      <FirmesLayout title="Misión no encontrada" backTo="/firmes">
        <Link to="/firmes" className="text-gov-blue font-semibold">
          Volver al inicio
        </Link>
      </FirmesLayout>
    );
  }

  const done = hasCompleted(state, mission.id);
  const eje = getEje(mission.ejeId);

  return (
    <FirmesLayout
      title={mission.title}
      subtitle={`${eje.nombre} · ${labelType(mission.type)} · ${mission.firmesReward} Firmes ${mission.firmesKind}`}
      backTo="/firmes"
    >
      {mission.type === 'quiz' && (
        <div className="mb-3">
          <GuideBubble mood="think">
            Una pregunta a la vez. Al final se registran Firmes de estudio.
          </GuideBubble>
        </div>
      )}
      <p className="text-sm text-gray-800 leading-relaxed mb-3">
        {mission.summary}
      </p>
      <div className="space-y-2 mb-4">
        {mission.claims.map((c) => (
          <ClaimCard key={c.id} text={c.text} />
        ))}
      </div>

      {done && (
        <p className="mb-4 rounded-lg bg-green-50 border border-green-200 text-green-900 text-sm px-3 py-2">
          Ya registraste esta misión. Puedes repasarla; no suma Firmes otra vez.
        </p>
      )}

      {mission.type === 'quiz' && mission.quiz && (
        <QuizPlay
          questions={mission.quiz as QuizQuestion[]}
          disabled={done}
          onFinish={(answers) => {
            if (!done) completeMission(mission.id, { quizAnswers: answers });
            navigate('/firmes/recompensa');
          }}
        />
      )}
      {mission.type === 'checklist' && mission.checklist && (
        <ChecklistPlay
          items={mission.checklist}
          disabled={done}
          initial={state.completedMissions[mission.id]?.checklistDone}
          onFinish={(checklistDone) => {
            if (!done) completeMission(mission.id, { checklistDone });
            navigate('/firmes/recompensa');
          }}
        />
      )}
      {mission.type === 'report' && (
        <ReportPlay
          prompt={mission.reportPrompt ?? ''}
          municipioId={state.municipioId}
          disabled={done}
          onFinish={(report) => {
            if (!done) completeMission(mission.id, { report });
            navigate('/firmes/recompensa');
          }}
        />
      )}
    </FirmesLayout>
  );
}

function labelType(type: 'quiz' | 'checklist' | 'report'): string {
  if (type === 'quiz') return 'Quiz';
  if (type === 'checklist') return 'Lista 90 días';
  return 'Reporte';
}

function QuizPlay({
  questions,
  disabled,
  onFinish,
}: {
  questions: QuizQuestion[];
  disabled: boolean;
  onFinish: (answers: Record<string, string>) => void;
}) {
  const list = questions ?? [];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [locked, setLocked] = useState(false);
  const q = list[step];
  if (!q) return null;

  const selected = answers[q.id];
  const last = step === list.length - 1;
  const showKey = locked || disabled;

  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold text-gov-gray">
        Pregunta {step + 1} de {list.length}
      </p>
      <div className="h-1.5 rounded-full bg-gov-border overflow-hidden">
        <div
          className="h-full bg-gov-blue transition-all"
          style={{ width: `${((step + (showKey ? 1 : 0)) / list.length) * 100}%` }}
        />
      </div>
      <fieldset className="rounded-md border border-gov-border bg-white p-3">
        <legend className="text-sm font-semibold text-gray-900 px-1">
          {q.prompt}
        </legend>
        <div className="space-y-2 mt-2">
          {q.options.map((o) => {
            const isSel = selected === o.id;
            const tone = showKey
              ? o.correct
                ? 'border-green-600 bg-green-50'
                : isSel
                  ? 'border-gov-red bg-red-50'
                  : 'border-gov-border bg-white'
              : isSel
                ? 'border-gov-blue bg-gov-blue-light'
                : 'border-gov-border bg-white';
            return (
              <label
                key={o.id}
                className={`flex items-start gap-2 rounded-md border px-3 py-3 text-sm ${tone}`}
              >
                <input
                  type="radio"
                  name={q.id}
                  checked={isSel}
                  disabled={disabled || locked}
                  onChange={() =>
                    setAnswers((prev) => ({ ...prev, [q.id]: o.id }))
                  }
                  className="mt-0.5"
                />
                <span>{o.text}</span>
              </label>
            );
          })}
        </div>
        {showKey && (
          <p className="text-xs text-gov-gray mt-3 leading-relaxed">
            {q.explainer}
          </p>
        )}
      </fieldset>
      {!disabled && !locked && (
        <PrimaryButton disabled={!selected} onClick={() => setLocked(true)}>
          Comprobar
        </PrimaryButton>
      )}
      {(locked || disabled) && (
        <PrimaryButton
          onClick={() => {
            if (disabled) {
              if (last) onFinish(answers);
              else setStep((s) => s + 1);
              return;
            }
            if (last) onFinish(answers);
            else {
              setStep((s) => s + 1);
              setLocked(false);
            }
          }}
        >
          {last
            ? disabled
              ? 'Volver al registro'
              : 'Registrar Firmes'
            : 'Siguiente'}
        </PrimaryButton>
      )}
    </div>
  );
}

function ChecklistPlay({
  items,
  disabled,
  initial,
  onFinish,
}: {
  items: { id: string; text: string }[];
  disabled: boolean;
  initial?: string[];
  onFinish: (done: string[]) => void;
}) {
  const [done, setDone] = useState<string[]>(initial ?? []);
  const all = items.every((i) => done.includes(i.id));

  function toggle(id: string) {
    if (disabled) return;
    setDone((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  return (
    <div className="space-y-3">
      <ul className="space-y-2">
        {items.map((item) => {
          const on = done.includes(item.id);
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className={`w-full text-left rounded-lg border px-3 py-3 text-sm ${
                  on
                    ? 'border-gov-blue bg-gov-blue-light'
                    : 'border-gov-border bg-white'
                }`}
              >
                <span className="inline-flex items-start gap-2">
                  <span
                    className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center text-xs shrink-0 ${
                      on
                        ? 'bg-gov-blue border-gov-blue text-white'
                        : 'border-gov-border'
                    }`}
                  >
                    {on ? '✓' : ''}
                  </span>
                  {item.text}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <PrimaryButton disabled={!all} onClick={() => onFinish(done)}>
        {disabled ? 'Ya completada' : 'Completar lista'}
      </PrimaryButton>
    </div>
  );
}

function ReportPlay({
  prompt,
  municipioId,
  disabled,
  onFinish,
}: {
  prompt: string;
  municipioId: string | null;
  disabled: boolean;
  onFinish: (report: {
    note: string;
    photoName?: string;
    geo?: { lat: number; lng: number; label: string } | null;
  }) => void;
}) {
  const [note, setNote] = useState('');
  const [photoName, setPhotoName] = useState<string | undefined>();
  const [preview, setPreview] = useState<string | null>(null);
  const [geo, setGeo] = useState<{
    lat: number;
    lng: number;
    label: string;
  } | null>(null);

  const demo = useMemo(
    () => GEO_DEMO[municipioId ?? ''] ?? GEO_DEMO.bogota,
    [municipioId],
  );

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-800 leading-relaxed">{prompt}</p>
      <label className="block">
        <span className="text-sm font-medium text-gray-800">Nota</span>
        <textarea
          value={note}
          disabled={disabled}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          className="mt-1.5 w-full rounded-lg border border-gov-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gov-blue"
          placeholder="Describe el hallazgo, sin datos sensibles."
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-gray-800">
          Foto (opcional, se queda en tu dispositivo)
        </span>
        <input
          type="file"
          accept="image/*"
          disabled={disabled}
          className="mt-1.5 block w-full text-sm"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setPhotoName(file?.name);
            if (preview) URL.revokeObjectURL(preview);
            setPreview(file ? URL.createObjectURL(file) : null);
          }}
        />
      </label>
      {preview && (
        <img
          src={preview}
          alt="Vista previa del reporte"
          className="w-full max-h-48 object-cover rounded-lg border border-gov-border"
        />
      )}
      <div className="rounded-lg border border-gov-border bg-white p-3">
        <p className="text-sm font-medium text-gray-800">Ubicación de prueba</p>
        <p className="text-xs text-gov-gray mt-1">
          No usamos GPS real. Puedes pegar coordenadas ilustrativas de tu
          municipio.
        </p>
        {geo ? (
          <p className="text-sm mt-2 tabular-nums">
            {geo.label} · {geo.lat.toFixed(3)}, {geo.lng.toFixed(3)}
          </p>
        ) : (
          <button
            type="button"
            disabled={disabled}
            onClick={() => setGeo(demo)}
            className="mt-2 text-sm font-semibold text-gov-blue"
          >
            Usar ubicación de prueba de {demo.label}
          </button>
        )}
      </div>
      <ClaimMark />
      <PrimaryButton
        disabled={!note.trim()}
        onClick={() =>
          onFinish({
            note: note.trim(),
            photoName,
            geo,
          })
        }
      >
        {disabled ? 'Reporte ya enviado' : 'Enviar reporte de prueba'}
      </PrimaryButton>
    </div>
  );
}
