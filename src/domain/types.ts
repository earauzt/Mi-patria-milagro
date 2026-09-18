/** Screen machine for the citizen episode */
export type ScreenId =
  | 'entrar'
  | 'fichas'
  | 'priorizar'
  | 'municipio'
  | 'vara'
  | 'cierre'
  | 'tablero';

export const CITIZEN_FLOW: ScreenId[] = [
  'entrar',
  'fichas',
  'priorizar',
  'municipio',
  'vara',
];

export const SCREEN_LABELS: Record<ScreenId, string> = {
  entrar: 'Entrar',
  fichas: '100 fichas',
  priorizar: 'Priorizar',
  municipio: 'Mi municipio',
  vara: 'La vara',
  cierre: 'Tu Colombia',
  tablero: 'Colombia en vivo',
};

export type EjeId =
  | 'reconstruccion'
  | 'patriotismo'
  | 'milagro_social'
  | 'milagro_economico'
  | 'regiones'
  | 'estado';

export interface Eje {
  id: EjeId;
  nombre: string;
  corto: string;
}

export interface Municipio {
  id: string;
  nombre: string;
  departamento: string;
  region: RegionId;
  stats: MunicipioStats;
}

export interface MunicipioStats {
  acueductoPct: number;
  aulasAveriadas: number;
  horasACabecera: number;
  pobrezaPct: number;
  nota?: string;
}

export type RegionId =
  | 'caribe'
  | 'pacifico'
  | 'central'
  | 'bogota'
  | 'orinoquia_amazonia';

export interface Tematica {
  id: string;
  nombre: string;
}

export interface Indicador {
  id: string;
  nombre: string;
  unidad: string;
  descripcion: string;
}

export interface EpisodeState {
  phone: string;
  otpVerified: boolean;
  municipioId: string | null;
  fichas: Record<EjeId, number>;
  tematicas: string[];
  postponedNote: string | null;
  prioridadLocal: string | null;
  indicadorId: string | null;
  completedAt: string | null;
}

export function createInitialEpisode(): EpisodeState {
  return {
    phone: '',
    otpVerified: false,
    municipioId: null,
    fichas: {
      reconstruccion: 0,
      patriotismo: 0,
      milagro_social: 0,
      milagro_economico: 0,
      regiones: 0,
      estado: 0,
    },
    tematicas: [],
    postponedNote: null,
    prioridadLocal: null,
    indicadorId: null,
    completedAt: null,
  };
}

export function fichasSum(fichas: Record<EjeId, number>): number {
  return (Object.values(fichas) as number[]).reduce((a, b) => a + b, 0);
}
