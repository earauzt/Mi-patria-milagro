import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { getDailyTodo, MISSIONS } from '../data/firmes';
import {
  applyDailyTodo,
  applyMissionCompletion,
  createInitialFirmes,
  rollDailyTodos,
  type CompletionInput,
  type FirmesState,
} from '../domain/firmes';

const STORAGE_KEY = 'firmes-season1-v1';

function load(): FirmesState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return rollDailyTodos({ ...createInitialFirmes(), ...JSON.parse(raw) });
    }
  } catch {
    /* ignore */
  }
  return createInitialFirmes();
}

function save(state: FirmesState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

interface FirmesContextValue {
  state: FirmesState;
  update: (patch: Partial<FirmesState>) => void;
  completeMission: (missionId: string, input: CompletionInput) => boolean;
  completeDailyTodo: (todoId: string) => number;
  reset: () => void;
}

const FirmesContext = createContext<FirmesContextValue | null>(null);

export function FirmesProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FirmesState>(load);

  const update = useCallback((patch: Partial<FirmesState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      save(next);
      return next;
    });
  }, []);

  const completeMission = useCallback(
    (missionId: string, input: CompletionInput) => {
      const mission = MISSIONS.find((m) => m.id === missionId);
      if (!mission) return false;
      let applied = false;
      setState((prev) => {
        if (prev.completedMissions[missionId]) return prev;
        const next = applyMissionCompletion(prev, mission, input, MISSIONS);
        applied = true;
        save(next);
        return next;
      });
      return applied;
    },
    [],
  );

  const completeDailyTodo = useCallback((todoId: string) => {
    const todo = getDailyTodo(todoId);
    if (!todo || todo.kind === 'mission') return 0;
    let awarded = 0;
    setState((prev) => {
      const next = applyDailyTodo(prev, todo);
      awarded = next.firmesAprendidos - prev.firmesAprendidos;
      save(next);
      return next;
    });
    return awarded;
  }, []);

  const reset = useCallback(() => {
    const fresh = createInitialFirmes();
    save(fresh);
    setState(fresh);
  }, []);

  const value = useMemo(
    () => ({ state, update, completeMission, completeDailyTodo, reset }),
    [state, update, completeMission, completeDailyTodo, reset],
  );

  return (
    <FirmesContext.Provider value={value}>{children}</FirmesContext.Provider>
  );
}

export function useFirmes() {
  const ctx = useContext(FirmesContext);
  if (!ctx) throw new Error('useFirmes fuera del provider');
  return ctx;
}
