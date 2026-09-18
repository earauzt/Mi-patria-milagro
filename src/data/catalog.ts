import type {
  Eje,
  Indicador,
  Municipio,
  RegionId,
  Tematica,
} from '../domain/types';

export const EJES: Eje[] = [
  {
    id: 'reconstruccion',
    nombre: 'Reconstrucción, Transformación y Resiliencia',
    corto: 'Reconstrucción',
  },
  {
    id: 'patriotismo',
    nombre: 'Patriotismo Constitucional',
    corto: 'Patriotismo',
  },
  {
    id: 'milagro_social',
    nombre: 'Milagro Social',
    corto: 'Milagro Social',
  },
  {
    id: 'milagro_economico',
    nombre: 'Milagro Económico',
    corto: 'Milagro Económico',
  },
  {
    id: 'regiones',
    nombre: 'Colombia de las regiones',
    corto: 'Regiones',
  },
  {
    id: 'estado',
    nombre: 'Transformación del Estado',
    corto: 'Estado',
  },
];

export const TEMATICAS_MILAGRO_SOCIAL: Tematica[] = [
  { id: 'salud', nombre: 'Salud para la familia' },
  { id: 'educacion', nombre: 'Educación y trabajo' },
  { id: 'mujeres', nombre: 'Mujeres y cuidado' },
  { id: 'vivienda', nombre: 'Vivienda y propiedad' },
  { id: 'servicios', nombre: 'Servicios públicos' },
  { id: 'cultura', nombre: 'Cultura y deporte' },
  { id: 'alimentacion', nombre: 'Alimentación' },
  { id: 'cuidado', nombre: 'Cuidado' },
  { id: 'digitales', nombre: 'Servicios digitales' },
];

export const INDICADORES: Indicador[] = [
  {
    id: 'dias_espera',
    nombre: 'Días de espera para cita médica',
    unidad: 'días',
    descripcion: 'Tiempo promedio para acceder a una cita de medicina general.',
  },
  {
    id: 'jovenes_formacion',
    nombre: 'Jóvenes en formación',
    unidad: '%',
    descripcion: 'Porcentaje de jóvenes entre 15 y 28 años en educación o formación técnica.',
  },
  {
    id: 'acueducto_alcantarillado',
    nombre: 'Hogares con acueducto y alcantarillado',
    unidad: '%',
    descripcion: 'Cobertura conjunta de agua potable y saneamiento básico.',
  },
  {
    id: 'aulas_dignas',
    nombre: 'Aulas en condiciones dignas',
    unidad: '%',
    descripcion: 'Sedes educativas sin aulas averiadas o en riesgo.',
  },
];

export const PRIORIDADES_LOCALES = [
  'Agua potable y saneamiento',
  'Vías y conectividad',
  'Salud y atención primaria',
  'Educación de calidad',
  'Empleo y emprendimiento local',
  'Seguridad alimentaria',
];

export const MUNICIPIOS: Municipio[] = [
  {
    id: 'quibdo',
    nombre: 'Quibdó',
    departamento: 'Chocó',
    region: 'pacifico',
    stats: {
      acueductoPct: 41,
      aulasAveriadas: 27,
      horasACabecera: 3,
      pobrezaPct: 48,
      nota: 'Datos demo inspirados en TerriData (ilustrativos).',
    },
  },
  {
    id: 'bogota',
    nombre: 'Bogotá',
    departamento: 'Cundinamarca',
    region: 'bogota',
    stats: {
      acueductoPct: 98,
      aulasAveriadas: 4,
      horasACabecera: 0,
      pobrezaPct: 12,
    },
  },
  {
    id: 'medellin',
    nombre: 'Medellín',
    departamento: 'Antioquia',
    region: 'central',
    stats: {
      acueductoPct: 97,
      aulasAveriadas: 6,
      horasACabecera: 0,
      pobrezaPct: 14,
    },
  },
  {
    id: 'cali',
    nombre: 'Cali',
    departamento: 'Valle del Cauca',
    region: 'pacifico',
    stats: {
      acueductoPct: 94,
      aulasAveriadas: 8,
      horasACabecera: 0,
      pobrezaPct: 18,
    },
  },
  {
    id: 'barranquilla',
    nombre: 'Barranquilla',
    departamento: 'Atlántico',
    region: 'caribe',
    stats: {
      acueductoPct: 96,
      aulasAveriadas: 5,
      horasACabecera: 0,
      pobrezaPct: 16,
    },
  },
];

export const REGION_LABELS: Record<RegionId, string> = {
  caribe: 'Caribe',
  pacifico: 'Pacífico',
  central: 'Central',
  bogota: 'Bogotá',
  orinoquia_amazonia: 'Orinoquía / Amazonía',
};

/** Demo national board totals */
export const TABLERO_DEMO = {
  participaciones: 184_532,
  municipios: 612,
  pctVerificadas: 71,
  regiones: [
    {
      id: 'caribe' as RegionId,
      prioridad: 'Educación y trabajo',
      peso: 82,
      participaciones: 42_100,
    },
    {
      id: 'pacifico' as RegionId,
      prioridad: 'Servicios públicos',
      peso: 91,
      participaciones: 28_400,
    },
    {
      id: 'central' as RegionId,
      prioridad: 'Salud para la familia',
      peso: 74,
      participaciones: 51_200,
    },
    {
      id: 'bogota' as RegionId,
      prioridad: 'Servicios digitales',
      peso: 68,
      participaciones: 38_900,
    },
    {
      id: 'orinoquia_amazonia' as RegionId,
      prioridad: 'Vivienda y propiedad',
      peso: 79,
      participaciones: 23_932,
    },
  ],
  /** Mock aggregated priorities for comparison in cierre */
  municipioTop: {
    quibdo: 'Servicios públicos',
    bogota: 'Servicios digitales',
    medellin: 'Educación y trabajo',
    cali: 'Salud para la familia',
    barranquilla: 'Educación y trabajo',
  } as Record<string, string>,
  colombiaTop: 'Salud para la familia',
  colombiaEjes: {
    reconstruccion: 14,
    patriotismo: 10,
    milagro_social: 28,
    milagro_economico: 22,
    regiones: 16,
    estado: 10,
  } as Record<string, number>,
};

export function getMunicipio(id: string | null): Municipio | undefined {
  if (!id) return undefined;
  return MUNICIPIOS.find((m) => m.id === id);
}
