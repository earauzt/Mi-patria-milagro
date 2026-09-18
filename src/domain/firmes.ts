/** Season 1 skill-tree axes (Patria Milagro portal). */
export type FirmesEjeId =
  | 'seguridad'
  | 'salud'
  | 'economia'
  | 'campo'
  | 'educacion'
  | 'estado';

export type MissionType = 'quiz' | 'checklist' | 'report';

/** Learned by studying proposals vs submitted for (mock) review. */
export type FirmesKind = 'aprendidos' | 'verificados';

export type FirmesScreenId =
  | 'onboarding'
  | 'home'
  | 'mission'
  | 'reward'
  | 'ejes'
  | 'gremio'
  | 'perfil'
  | 'transparencia';

export type DailyTodoKind = 'mission' | 'check';

export interface DailyTodo {
  id: string;
  text: string;
  kind: DailyTodoKind;
  /** Small learned Firmes; 0 if the todo only tracks the misión del día. */
  firmesReward: number;
  hint?: string;
}

export interface CampaignClaim {
  id: string;
  text: string;
  /** Always true in this prototype: program copy, not official execution. */
  unaudited: true;
}

export interface QuizOption {
  id: string;
  text: string;
  correct: boolean;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
  explainer: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
}

export interface Mission {
  id: string;
  ejeId: FirmesEjeId;
  type: MissionType;
  title: string;
  summary: string;
  firmesReward: number;
  firmesKind: FirmesKind;
  season1Focus: boolean;
  featured?: boolean;
  claims: CampaignClaim[];
  quiz?: QuizQuestion[];
  checklist?: ChecklistItem[];
  reportPrompt?: string;
  unlocksExplainerId?: string;
  badgeId?: string;
}

export interface BadgeDef {
  id: string;
  name: string;
  description: string;
  ejeId?: FirmesEjeId;
}

export interface ExplainerDef {
  id: string;
  title: string;
  body: string;
}

export interface GuildMember {
  id: string;
  name: string;
  firmes: number;
  streak: number;
  isYou?: boolean;
}

export interface ReportPayload {
  note: string;
  photoName?: string;
  geo?: { lat: number; lng: number; label: string } | null;
}

export interface MissionCompletion {
  missionId: string;
  completedAt: string;
  firmesEarned: number;
  kind: FirmesKind;
  quizAnswers?: Record<string, string>;
  quizCorrect?: number;
  quizTotal?: number;
  checklistDone?: string[];
  report?: ReportPayload;
}

export interface RewardEvent {
  missionId: string;
  title: string;
  firmes: number;
  kind: FirmesKind;
  badgeId?: string;
  explainerId?: string;
  certificateUnlocked: boolean;
  streakIncremented: boolean;
  streakDays: number;
}

export interface FirmesState {
  phone: string;
  otpVerified: boolean;
  municipioId: string | null;
  chosenEjes: FirmesEjeId[];
  onboarded: boolean;
  firmesAprendidos: number;
  firmesVerificados: number;
  streakDays: number;
  lastStreakDate: string | null;
  completedMissions: Record<string, MissionCompletion>;
  badges: string[];
  unlockedExplainers: string[];
  certificateUnlocked: boolean;
  lastReward: RewardEvent | null;
  /** Calendar day (YYYY-MM-DD) of the current Daily To-Do list. */
  dailyTodoDate: string | null;
  completedDailyTodos: string[];
}

export function createInitialFirmes(): FirmesState {
  return {
    phone: '',
    otpVerified: false,
    municipioId: null,
    chosenEjes: [],
    onboarded: false,
    firmesAprendidos: 0,
    firmesVerificados: 0,
    streakDays: 0,
    lastStreakDate: null,
    completedMissions: {},
    badges: [],
    unlockedExplainers: [],
    certificateUnlocked: false,
    lastReward: null,
    dailyTodoDate: null,
    completedDailyTodos: [],
  };
}

export function totalFirmes(state: FirmesState): number {
  return state.firmesAprendidos + state.firmesVerificados;
}

export function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function yesterdayKey(d = new Date()): string {
  const prev = new Date(d);
  prev.setDate(prev.getDate() - 1);
  return todayKey(prev);
}

export function nextStreak(
  lastStreakDate: string | null,
  streakDays: number,
  now = new Date(),
): { streakDays: number; lastStreakDate: string; incremented: boolean } {
  const today = todayKey(now);
  if (lastStreakDate === today) {
    return { streakDays, lastStreakDate: today, incremented: false };
  }
  if (lastStreakDate === yesterdayKey(now)) {
    return { streakDays: streakDays + 1, lastStreakDate: today, incremented: true };
  }
  return { streakDays: 1, lastStreakDate: today, incremented: true };
}

export function completedIds(state: FirmesState): string[] {
  return Object.keys(state.completedMissions);
}

export function hasCompleted(state: FirmesState, missionId: string): boolean {
  return missionId in state.completedMissions;
}

export function countByEje(
  state: FirmesState,
  missions: Mission[],
  ejeId: FirmesEjeId,
): { done: number; total: number } {
  const ofEje = missions.filter((m) => m.ejeId === ejeId);
  const done = ofEje.filter((m) => hasCompleted(state, m.id)).length;
  return { done, total: ofEje.length };
}

export function canUnlockCertificate(
  state: FirmesState,
  missions: Mission[],
): boolean {
  const done = completedIds(state);
  if (done.length < 3) return false;
  const doneMissions = missions.filter((m) => done.includes(m.id));
  const hasSeg = doneMissions.some((m) => m.ejeId === 'seguridad');
  const hasSal = doneMissions.some((m) => m.ejeId === 'salud');
  return hasSeg && hasSal;
}

export interface CompletionInput {
  quizAnswers?: Record<string, string>;
  checklistDone?: string[];
  report?: ReportPayload;
}

export function applyMissionCompletion(
  state: FirmesState,
  mission: Mission,
  input: CompletionInput,
  missions: Mission[],
  now = new Date(),
): FirmesState {
  if (hasCompleted(state, mission.id)) return state;

  const streak = nextStreak(state.lastStreakDate, state.streakDays, now);
  const completion: MissionCompletion = {
    missionId: mission.id,
    completedAt: now.toISOString(),
    firmesEarned: mission.firmesReward,
    kind: mission.firmesKind,
    quizAnswers: input.quizAnswers,
    checklistDone: input.checklistDone,
    report: input.report,
  };

  if (mission.quiz && input.quizAnswers) {
    completion.quizTotal = mission.quiz.length;
    completion.quizCorrect = mission.quiz.filter(
      (q) =>
        q.options.find((o) => o.id === input.quizAnswers?.[q.id])?.correct ===
        true,
    ).length;
  }

  const badges = [...state.badges];
  if (mission.badgeId && !badges.includes(mission.badgeId)) {
    badges.push(mission.badgeId);
  }
  if (!badges.includes('primer-paso')) badges.push('primer-paso');
  if (mission.type === 'report' && !badges.includes('reportero')) {
    badges.push('reportero');
  }

  const unlockedExplainers = [...state.unlockedExplainers];
  if (
    mission.unlocksExplainerId &&
    !unlockedExplainers.includes(mission.unlocksExplainerId)
  ) {
    unlockedExplainers.push(mission.unlocksExplainerId);
  }

  const rolled = rollDailyTodos(state, now);
  const missionTodoDone = rolled.completedDailyTodos.includes('todo-mision');

  const next: FirmesState = {
    ...rolled,
    firmesAprendidos:
      rolled.firmesAprendidos +
      (mission.firmesKind === 'aprendidos' ? mission.firmesReward : 0),
    firmesVerificados:
      rolled.firmesVerificados +
      (mission.firmesKind === 'verificados' ? mission.firmesReward : 0),
    streakDays: streak.streakDays,
    lastStreakDate: streak.lastStreakDate,
    completedMissions: {
      ...rolled.completedMissions,
      [mission.id]: completion,
    },
    completedDailyTodos: missionTodoDone
      ? rolled.completedDailyTodos
      : [...rolled.completedDailyTodos, 'todo-mision'],
    badges,
    unlockedExplainers,
    certificateUnlocked: rolled.certificateUnlocked,
    lastReward: null,
  };

  const certificateUnlocked =
    next.certificateUnlocked || canUnlockCertificate(next, missions);
  if (certificateUnlocked && !next.badges.includes('temporada-1')) {
    next.badges = [...next.badges, 'temporada-1'];
  }

  next.certificateUnlocked = certificateUnlocked;
  next.lastReward = {
    missionId: mission.id,
    title: mission.title,
    firmes: mission.firmesReward,
    kind: mission.firmesKind,
    badgeId: mission.badgeId,
    explainerId: mission.unlocksExplainerId,
    certificateUnlocked:
      certificateUnlocked && !state.certificateUnlocked,
    streakIncremented: streak.incremented,
    streakDays: streak.streakDays,
  };

  return next;
}

export function toggleEje(
  current: FirmesEjeId[],
  id: FirmesEjeId,
): FirmesEjeId[] {
  if (current.includes(id)) return current.filter((x) => x !== id);
  if (current.length >= 2) return current;
  return [...current, id];
}

/** Bottom nav keeps the daily loop short. Guild is V1 and lives in Perfil. */
export const FIRMES_NAV: { id: FirmesScreenId; to: string; label: string }[] = [
  { id: 'home', to: '/firmes', label: 'Hoy' },
  { id: 'ejes', to: '/firmes/ejes', label: 'Ejes' },
  { id: 'perfil', to: '/firmes/perfil', label: 'Perfil' },
];

export function rollDailyTodos(
  state: FirmesState,
  now = new Date(),
): FirmesState {
  const today = todayKey(now);
  if (state.dailyTodoDate === today) return state;
  return {
    ...state,
    dailyTodoDate: today,
    completedDailyTodos: [],
  };
}

export function hasDailyTodo(state: FirmesState, todoId: string): boolean {
  return state.completedDailyTodos.includes(todoId);
}

export function applyDailyTodo(
  state: FirmesState,
  todo: DailyTodo,
  now = new Date(),
): FirmesState {
  const rolled = rollDailyTodos(state, now);
  if (hasDailyTodo(rolled, todo.id)) return rolled;
  if (todo.kind === 'mission') {
    return {
      ...rolled,
      completedDailyTodos: [...rolled.completedDailyTodos, todo.id],
    };
  }

  const streak = nextStreak(rolled.lastStreakDate, rolled.streakDays, now);
  return {
    ...rolled,
    firmesAprendidos: rolled.firmesAprendidos + todo.firmesReward,
    streakDays: streak.streakDays,
    lastStreakDate: streak.lastStreakDate,
    completedDailyTodos: [...rolled.completedDailyTodos, todo.id],
  };
}

export function pickMissionDelDia(
  state: FirmesState,
  missions: Mission[],
): Mission | undefined {
  const inFocus = (m: Mission) =>
    state.chosenEjes.length === 0 || state.chosenEjes.includes(m.ejeId);

  return (
    missions.find(
      (m) => m.featured && m.type === 'quiz' && !hasCompleted(state, m.id) && inFocus(m),
    ) ??
    missions.find(
      (m) => m.season1Focus && m.type === 'quiz' && !hasCompleted(state, m.id),
    ) ??
    missions.find((m) => m.season1Focus && !hasCompleted(state, m.id)) ??
    missions.find((m) => !hasCompleted(state, m.id)) ??
    missions.find((m) => m.id === 'seg-quiz-90') ??
    missions[0]
  );
}
