import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  INDICADORES,
  MUNICIPIOS,
  PRIORIDADES_LOCALES,
  TEMATICAS_MILAGRO_SOCIAL,
} from '../data/catalog';
import {
  ALL_SCREENS,
  createInitialEpisode,
  fichasSum,
  type EjeId,
  type EpisodeState,
  type ScreenId,
} from '../domain/types';

const STORAGE_KEY = 'mpm-episode-v1';

interface Persisted {
  episode: EpisodeState;
  screen: ScreenId;
}

function isScreenId(value: unknown): value is ScreenId {
  return typeof value === 'string' && (ALL_SCREENS as string[]).includes(value);
}

function normalizePhone(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('57') && digits.length > 10) digits = digits.slice(2);
  return digits.slice(0, 10);
}

function normalizeFichas(raw: unknown): Record<EjeId, number> {
  const base = createInitialEpisode().fichas;
  if (!raw || typeof raw !== 'object') return base;
  const src = raw as Record<string, unknown>;
  const next = { ...base };
  (Object.keys(base) as EjeId[]).forEach((key) => {
    const n = Number(src[key]);
    if (Number.isFinite(n)) next[key] = Math.max(0, Math.min(100, Math.round(n)));
  });
  return next;
}

function normalizeEpisode(raw: unknown): EpisodeState {
  const base = createInitialEpisode();
  if (!raw || typeof raw !== 'object') return base;
  const parsed = raw as Partial<EpisodeState>;
  return {
    ...base,
    phone: typeof parsed.phone === 'string' ? normalizePhone(parsed.phone) : base.phone,
    otpVerified: Boolean(parsed.otpVerified),
    municipioId:
      typeof parsed.municipioId === 'string' &&
      MUNICIPIOS.some((m) => m.id === parsed.municipioId)
        ? parsed.municipioId
        : null,
    fichas: normalizeFichas(parsed.fichas),
    tematicas: Array.isArray(parsed.tematicas)
      ? parsed.tematicas.filter(
          (id, i, arr): id is string =>
            typeof id === 'string' &&
            TEMATICAS_MILAGRO_SOCIAL.some((t) => t.id === id) &&
            arr.indexOf(id) === i,
        )
      : base.tematicas,
    postponedNote:
      parsed.postponedNote === null || typeof parsed.postponedNote === 'string'
        ? parsed.postponedNote
        : base.postponedNote,
    prioridadLocal:
      typeof parsed.prioridadLocal === 'string' &&
      (PRIORIDADES_LOCALES as readonly string[]).includes(parsed.prioridadLocal)
        ? parsed.prioridadLocal
        : null,
    indicadorId:
      typeof parsed.indicadorId === 'string' &&
      INDICADORES.some((item) => item.id === parsed.indicadorId)
        ? parsed.indicadorId
        : null,
    completedAt:
      parsed.completedAt === null || typeof parsed.completedAt === 'string'
        ? parsed.completedAt
        : base.completedAt,
  };
}

/** Keep restored screen consistent with required fields of earlier steps. */
function resolveScreen(episode: EpisodeState, screen: ScreenId): ScreenId {
  if (screen === 'entrar') return 'entrar';
  if (!episode.otpVerified || !episode.municipioId) return 'entrar';
  if (screen === 'fichas') return 'fichas';
  if (fichasSum(episode.fichas) !== 100) return 'fichas';
  if (screen === 'priorizar') return 'priorizar';
  if (episode.tematicas.length !== 3) return 'priorizar';
  if (screen === 'municipio') return 'municipio';
  if (!episode.prioridadLocal) return 'municipio';
  if (screen === 'vara') return 'vara';
  if (!episode.indicadorId) return 'vara';
  if (screen === 'cierre' || screen === 'tablero') return screen;
  return 'entrar';
}

function load(): Persisted {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      const episodeSource =
        parsed && typeof parsed.episode === 'object' && parsed.episode !== null
          ? parsed.episode
          : parsed;
      const episode = normalizeEpisode(episodeSource);
      const screen = resolveScreen(
        episode,
        isScreenId(parsed.screen) ? parsed.screen : 'entrar',
      );
      return { episode, screen };
    }
  } catch {
    /* ignore */
  }
  return { episode: createInitialEpisode(), screen: 'entrar' };
}

function save(state: Persisted) {
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
  const [{ episode, screen }, setState] = useState<Persisted>(load);

  useEffect(() => {
    const restored = load();
    history.replaceState({ mpmScreen: restored.screen }, '');

    const onPop = (e: PopStateEvent) => {
      const raw =
        e.state && typeof e.state === 'object'
          ? (e.state as { mpmScreen?: unknown }).mpmScreen
          : undefined;
      const requested = isScreenId(raw) ? raw : 'entrar';
      setState((prev) => {
        const resolved = resolveScreen(prev.episode, requested);
        const next = { ...prev, screen: resolved };
        save(next);
        if (resolved !== requested) {
          history.replaceState({ ...(e.state || {}), mpmScreen: resolved }, '');
        }
        return next;
      });
    };

    const onStorage = (ev: StorageEvent) => {
      if (ev.key !== STORAGE_KEY) return;
      const next = load();
      setState(next);
      history.replaceState({ mpmScreen: next.screen }, '');
    };

    window.addEventListener('popstate', onPop);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const update = useCallback((patch: Partial<EpisodeState>) => {
    setState((prev) => {
      const next = { ...prev, episode: { ...prev.episode, ...patch } };
      save(next);
      return next;
    });
  }, []);

  const setScreen = useCallback((s: ScreenId) => {
    let pushed = false;
    setState((prev) => {
      if (prev.screen === s) return prev;
      const next = { ...prev, screen: s };
      save(next);
      if (!pushed) {
        history.pushState({ mpmScreen: s }, '');
        pushed = true;
      }
      return next;
    });
  }, []);

  const setFicha = useCallback((eje: EjeId, value: number) => {
    setState((prev) => {
      const next = {
        ...prev,
        episode: {
          ...prev.episode,
          fichas: {
            ...prev.episode.fichas,
            [eje]: Math.max(0, Math.min(100, value)),
          },
        },
      };
      save(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    const fresh: Persisted = {
      episode: createInitialEpisode(),
      screen: 'entrar',
    };
    save(fresh);
    setState(fresh);
    history.replaceState({ mpmScreen: 'entrar' }, '');
  }, []);

  const value = useMemo(
    () => ({ episode, screen, setScreen, update, setFicha, reset }),
    [episode, screen, setScreen, update, setFicha, reset],
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
