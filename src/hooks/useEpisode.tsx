import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  createInitialEpisode,
  type EjeId,
  type EpisodeState,
  type ScreenId,
} from '../domain/types';

const STORAGE_KEY = 'mpm-episode-v1';

function load(): EpisodeState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...createInitialEpisode(), ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return createInitialEpisode();
}

function save(state: EpisodeState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

interface EpisodeContextValue {
  episode: EpisodeState;
  screen: ScreenId;
  setScreen: (s: ScreenId) => void;
  update: (patch: Partial<EpisodeState>) => void;
  setFicha: (eje: EjeId, value: number) => void;
  reset: () => void;
}

const EpisodeContext = createContext<EpisodeContextValue | null>(null);

export function EpisodeProvider({ children }: { children: ReactNode }) {
  const [episode, setEpisode] = useState<EpisodeState>(load);
  const [screen, setScreen] = useState<ScreenId>('entrar');

  const update = useCallback((patch: Partial<EpisodeState>) => {
    setEpisode((prev) => {
      const next = { ...prev, ...patch };
      save(next);
      return next;
    });
  }, []);

  const setFicha = useCallback((eje: EjeId, value: number) => {
    setEpisode((prev) => {
      const next = {
        ...prev,
        fichas: { ...prev.fichas, [eje]: Math.max(0, Math.min(100, value)) },
      };
      save(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    const fresh = createInitialEpisode();
    save(fresh);
    setEpisode(fresh);
    setScreen('entrar');
  }, []);

  const value = useMemo(
    () => ({ episode, screen, setScreen, update, setFicha, reset }),
    [episode, screen, update, setFicha, reset],
  );

  return (
    <EpisodeContext.Provider value={value}>{children}</EpisodeContext.Provider>
  );
}

export function useEpisode() {
  const ctx = useContext(EpisodeContext);
  if (!ctx) throw new Error('useEpisode outside provider');
  return ctx;
}
