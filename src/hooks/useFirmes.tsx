import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { MISSIONS } from '../data/firmes';
import {
  applyMissionCompletion,
  createInitialFirmes,
  type CompletionInput,
  type FirmesState,
} from '../domain/firmes';

const STORAGE_KEY = 'firmes-season1-v1';

function load(): FirmesState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...createInitialFirmes(), ...JSON.parse(raw) };
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

  const reset = useCallback(() => {
    const fresh = createInitialFirmes();
    save(fresh);
    setState(fresh);
  }, []);

  const value = useMemo(
    () => ({ state, update, completeMission, reset }),
    [state, update, completeMission, reset],
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
