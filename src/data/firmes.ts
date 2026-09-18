import type {
  BadgeDef,
  CampaignClaim,
  DailyTodo,
  ExplainerDef,
  FirmesEjeId,
  GuildMember,
  Mission,
} from '../domain/firmes';

const CLAIM: CampaignClaim['unaudited'] = true;

function claim(id: string, text: string): CampaignClaim {
  return { id, text, unaudited: CLAIM };
}

export interface EjeDef {
  id: FirmesEjeId;
  nombre: string;
  corto: string;
  season1: boolean;
  blurb: string;
}

export const FIRMES_EJES: EjeDef[] = [
  {
    id: 'seguridad',
    nombre: 'Seguridad',
    corto: 'Seguridad',
    season1: true,
    blurb:
      'Presencia del Estado en el territorio, plan de 90 días y prioridad contra narcotráfico, extorsión y secuestro.',
  },
  {
    id: 'salud',
    nombre: 'Salud',
    corto: 'Salud',
    season1: true,
    blurb:
      'Sistema de salud, ADRES, historia clínica digital y acceso a medicamentos.',
  },
  {
    id: 'economia',
    nombre: 'Economía',
    corto: 'Economía',
    season1: false,
    blurb: 'Inversión, empleo, energía y pretensiones de competitividad y recorte fiscal.',
  },
  {
    id: 'campo',
    nombre: 'Campo',
    corto: 'Campo',
    season1: false,
    blurb: 'Crédito productivo, garantías y formación SENA en el territorio.',
  },
  {
    id: 'educacion',
    nombre: 'Educación',
    corto: 'Educación',
    season1: false,
    blurb: 'Universidad Virtual en Casa, IA, creadores y créditos de estudio/vivienda.',
  },
  {
    id: 'estado',
    nombre: 'Estado transparente',
    corto: 'Estado',
    season1: false,
    blurb:
      'Bloque anticorrupción, extinción de dominio, estatuto de contratación y trazabilidad.',
  },
];

/** Civic Daily To-Dos for Hoy (Zivic-style). Not government KPIs. */
export const DAILY_TODOS: DailyTodo[] = [
  {
    id: 'todo-mision',
    text: 'Terminar la misión del día',
    kind: 'mission',
    firmesReward: 0,
    hint: 'El quiz de hoy suma Firmes al terminar.',
  },
  {
    id: 'todo-denuncia',
    text: 'Anota un canal local de denuncia (123, URI o personería)',
    kind: 'check',
    firmesReward: 5,
    hint: 'Es un hábito cívico. No sustituye una denuncia formal.',
  },
  {
    id: 'todo-salud-casa',
    text: 'Revisa un pendiente de salud en casa (cita o medicamento)',
    kind: 'check',
    firmesReward: 5,
    hint: 'Prepara a tu hogar. No es un indicador oficial de atención.',
  },
  {
    id: 'todo-marca',
    text: 'Lee una cifra del programa marcada como sin verificar',
    kind: 'check',
    firmesReward: 5,
    hint: 'Las cifras del programa no son progreso de gobierno.',
  },
];

export function getDailyTodo(id: string): DailyTodo | undefined {
  return DAILY_TODOS.find((t) => t.id === id);
}

export const MISSIONS: Mission[] = [
  {
    id: 'seg-quiz-90',
    ejeId: 'seguridad',
    type: 'quiz',
    title: 'Los primeros 90 días',
    summary:
      'Qué propone el programa para la seguridad en el territorio, en los primeros 90 días.',
    firmesReward: 40,
    firmesKind: 'aprendidos',
    season1Focus: true,
    featured: true,
    claims: [
      claim(
        'coca-330k',
        'El programa anuncia destruir cerca de 330.000 hectáreas de coca, con fumigación, erradicación y otras herramientas.',
      ),
    ],
    badgeId: 'choque-90',
    unlocksExplainerId: 'exp-seguridad-90',
    quiz: [
      {
        id: 'q1',
        prompt:
          'Según la propuesta del programa, ¿cuál es el plazo del plan inicial de seguridad?',
        options: [
          { id: 'a', text: '30 días', correct: false },
          { id: 'b', text: '90 días', correct: true },
          { id: 'c', text: 'Los cuatro años de gobierno', correct: false },
        ],
        explainer:
          'El portal habla de un plan en los primeros 90 días. Es un anuncio, no un resultado medido.',
      },
      {
        id: 'q2',
        prompt: 'La cifra de ~330.000 hectáreas de coca que se menciona es…',
        options: [
          { id: 'a', text: 'Un resultado oficial ya ejecutado por el Estado', correct: false },
          {
            id: 'b',
            text: 'Una cifra del programa, sin verificar',
            correct: true,
          },
          { id: 'c', text: 'Una métrica de Firmes verificados', correct: false },
        ],
        explainer:
          'En Firmes esa cifra se marca como propuesta de programa, sin verificar. No es un resultado de gobierno.',
      },
      {
        id: 'q3',
        prompt: '¿Qué delitos prioriza el programa en el eje de Seguridad?',
        options: [
          { id: 'a', text: 'Solo contrabando de mercancías', correct: false },
          {
            id: 'b',
            text: 'Narcotráfico, extorsión y secuestro, con presencia del Estado en el territorio',
            correct: true,
          },
          { id: 'c', text: 'Únicamente delitos informáticos', correct: false },
        ],
        explainer:
          'El programa habla de seguridad en el territorio y de un bloque de búsqueda contra la extorsión. Sigue siendo propuesta, no ejecución.',
      },
    ],
  },
  {
    id: 'seg-check-barrio',
    ejeId: 'seguridad',
    type: 'checklist',
    title: 'Lista ciudadana · 90 días',
    summary:
      'Marca acciones cívicas de los primeros 90 días. No sustituye la denuncia formal ni mide resultados oficiales.',
    firmesReward: 30,
    firmesKind: 'aprendidos',
    season1Focus: true,
    claims: [
      claim(
        'extorsion-bloque',
        'El programa propone un Bloque de Búsqueda contra la extorsión y «seguridad en el barrio».',
      ),
    ],
    badgeId: 'vecino-firme',
    checklist: [
      { id: 'c1', text: 'Identifiqué el canal local de denuncia (URI, línea 123 o personería).' },
      { id: 'c2', text: 'Hablé en casa sobre no pagar extorsión y registrar intentos.' },
      { id: 'c3', text: 'Revisé si mi cuadra tiene alumbrado y rutas seguras de noche.' },
      { id: 'c4', text: 'Anoté un hecho que sí reportaría (sin datos sensibles en Firmes).' },
      { id: 'c5', text: 'Leí que el plan de 90 días es propuesta de programa, no un tablero oficial.' },
    ],
  },
  {
    id: 'seg-report-barrio',
    ejeId: 'seguridad',
    type: 'report',
    title: 'Reporte ciudadano (demo)',
    summary:
      'Envía una nota + foto opcional y una ubicación simulada. En el MVP no hay backend ni denuncia real.',
    firmesReward: 50,
    firmesKind: 'verificados',
    season1Focus: true,
    claims: [
      claim(
        'secuestro-extorsion',
        'El programa prioriza extorsión y secuestro en el plan de seguridad de 90 días.',
      ),
    ],
    badgeId: 'reportero',
    reportPrompt:
      'Describe un hallazgo cívico (alumbrado, punto ciego, aviso de extorsión en un negocio). No incluyas nombres de víctimas ni datos de menores.',
  },
  {
    id: 'sal-quiz-rescate',
    ejeId: 'salud',
    type: 'quiz',
    title: 'El sistema de salud',
    summary:
      'Estudia el anuncio de financiación, ADRES e historia clínica digital.',
    firmesReward: 40,
    firmesKind: 'aprendidos',
    season1Focus: true,
    featured: true,
    claims: [
      claim(
        'salud-10b',
        'El programa anuncia un plan de COP $10 billones para el sistema de salud.',
      ),
    ],
    badgeId: 'rescate-salud',
    unlocksExplainerId: 'exp-salud-10b',
    quiz: [
      {
        id: 'q1',
        prompt: 'El monto de COP $10 billones para el sistema de salud es…',
        options: [
          { id: 'a', text: 'Presupuesto ejecutado y auditado de 2026', correct: false },
          { id: 'b', text: 'Cifra del programa, sin verificar', correct: true },
          { id: 'c', text: 'Un Firmes verificado de tu municipio', correct: false },
        ],
        explainer:
          'Es una pretensión del programa. Firmes no la convierte en meta cumplida.',
      },
      {
        id: 'q2',
        prompt: '¿Qué piezas nombra el programa para modernizar la gestión en salud?',
        options: [
          { id: 'a', text: 'Solo construir un hospital por departamento', correct: false },
          {
            id: 'b',
            text: 'ADRES fortalecida, auditorías e historia clínica digital unificada',
            correct: true,
          },
          { id: 'c', text: 'Eliminar por completo el sistema mixto', correct: false },
        ],
        explainer:
          'El portal habla de sistema mixto, ADRES, auditorías e historia clínica digital. Sigue sin estar verificado como resultado.',
      },
      {
        id: 'q3',
        prompt: 'En Firmes, completar este quiz te otorga…',
        options: [
          { id: 'a', text: 'Dinero o un bono canjeable', correct: false },
          { id: 'b', text: 'Firmes aprendidos (puntos educativos)', correct: true },
          { id: 'c', text: 'Un cargo público honorífico', correct: false },
        ],
        explainer:
          'Los Firmes no se compran ni se venden. El quiz suma Firmes aprendidos, no verificados.',
      },
    ],
  },
  {
    id: 'sal-check-familia',
    ejeId: 'salud',
    type: 'checklist',
    title: 'Lista familia · 90 días',
    summary:
      'Prepara a tu hogar para exigir atención y medicamentos, sin tratar la propuesta como hecho.',
    firmesReward: 30,
    firmesKind: 'aprendidos',
    season1Focus: true,
    claims: [
      claim(
        'medicamentos',
        'El programa promete reactivar tratamientos críticos y recuperar el flujo de recursos y medicamentos.',
      ),
    ],
    badgeId: 'cuidador-salud',
    checklist: [
      { id: 'c1', text: 'Anoté EPS/régimen y un medicamento o cita pendiente en casa.' },
      { id: 'c2', text: 'Guardé soportes (fórmula, tutelas o radicados) en un solo lugar.' },
      { id: 'c3', text: 'Identifiqué Superintendencia de Salud o personería para reclamar.' },
      { id: 'c4', text: 'Leí que ADRES e historia clínica digital son anuncios, no un sistema ya unificado.' },
      { id: 'c5', text: 'Recordé que COP $10 billones es cifra del programa, sin verificar.' },
    ],
  },
  {
    id: 'eco-quiz-inversion',
    ejeId: 'economia',
    type: 'quiz',
    title: 'Inversión, empleo y 4×1000',
    summary:
      'Revisa con cuidado las pretensiones económicas. Ninguna cifra de esta ficha es ejecución fiscal.',
    firmesReward: 25,
    firmesKind: 'aprendidos',
    season1Focus: false,
    claims: [
      claim(
        '4x1000',
        'El programa propone eliminar el 4×1000, condicionada en algunos textos a un recorte del aparato estatal.',
      ),
      claim(
        'top25',
        'Habla de llevar a Colombia al Top 25 de competitividad / países «prósperos y seguros».',
      ),
      claim(
        'crecimiento-7',
        'Menciona crecer al 7% (comparando con experiencias de otros países).',
      ),
      claim(
        'ajuste-70b',
        'Habla de un ajuste fiscal inicial cercano a COP $70 billones y de recortar el tamaño del Estado.',
      ),
    ],
    unlocksExplainerId: 'exp-economia-cuidado',
    quiz: [
      {
        id: 'q1',
        prompt:
          'Eliminar el 4×1000, el Top 25, el 7% de crecimiento y el ajuste de ~COP $70 billones son…',
        options: [
          { id: 'a', text: 'Cifras ya logradas y certificadas por el Minhacienda', correct: false },
          {
            id: 'b',
            text: 'Pretensiones del programa, sin verificar; no son recorte ejecutado',
            correct: true,
          },
          { id: 'c', text: 'Indicadores que Firmes mide en tiempo real', correct: false },
        ],
        explainer:
          'Copia cuidadosa: Firmes no afirma que el Estado se haya reducido ni que el 7% o los $70 billones existan como hecho. Son anuncios.',
      },
      {
        id: 'q2',
        prompt: '¿Qué hace Firmes con estas cifras macro?',
        options: [
          { id: 'a', text: 'Las publica como tablero oficial de gobierno', correct: false },
          {
            id: 'b',
            text: 'Las marca como propuesta de programa, sin verificar',
            correct: true,
          },
          { id: 'c', text: 'Las convierte en dinero para quien las comparta', correct: false },
        ],
        explainer:
          'Este prototipo no inventa métricas de progreso gubernamental. Solo ayuda a leer la propuesta.',
      },
    ],
  },
  {
    id: 'cam-quiz-credito',
    ejeId: 'campo',
    type: 'quiz',
    title: 'Crédito y SENA territorial',
    summary: 'Conoce las promesas de crédito, garantías y formación en el campo.',
    firmesReward: 25,
    firmesKind: 'aprendidos',
    season1Focus: false,
    claims: [
      claim(
        'credito-87',
        'El programa menciona crédito agropecuario alrededor del 8,7% anual, con garantías estatales.',
      ),
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'El 8,7% de crédito del programa es…',
        options: [
          { id: 'a', text: 'La tasa vigente del Banco Agrario para todos', correct: false },
          { id: 'b', text: 'Una cifra del programa, sin verificar', correct: true },
          { id: 'c', text: 'Un Firmes que puedes cobrar en caja', correct: false },
        ],
        explainer:
          'También se mencionan garantías y SENA en los territorios. No hay desembolso real desde esta app.',
      },
      {
        id: 'q2',
        prompt: 'Además de la tasa, el programa de gobierno del campo incluye…',
        options: [
          { id: 'a', text: 'Solo titulación urbana en capitales', correct: false },
          {
            id: 'b',
            text: 'Garantías estatales y formación SENA territorial',
            correct: true,
          },
          { id: 'c', text: 'Cerrar el crédito de fomento', correct: false },
        ],
        explainer:
          'Son piezas del portal de propuestas. En los primeros 90 días quedan en vista previa, no como avance rural oficial.',
      },
    ],
  },
  {
    id: 'edu-quiz-virtual',
    ejeId: 'educacion',
    type: 'quiz',
    title: 'Universidad Virtual en Casa',
    summary:
      'Lee la propuesta de educación virtual, IA/creadores y créditos blandos de estudio o vivienda.',
    firmesReward: 25,
    firmesKind: 'aprendidos',
    season1Focus: false,
    claims: [
      claim(
        'virtual-casa',
        'El programa propone crear la Universidad Virtual en Casa, con énfasis en IA y creadores.',
      ),
      claim(
        'creditos-2',
        'Habla de créditos de educación y vivienda popular cercanos al 2% anual.',
      ),
    ],
    quiz: [
      {
        id: 'q1',
        prompt: '«Universidad Virtual en Casa» en este prototipo significa…',
        options: [
          { id: 'a', text: 'Ya estás matriculado en una universidad oficial', correct: false },
          {
            id: 'b',
            text: 'Una propuesta de programa para estudiar de forma virtual',
            correct: true,
          },
          { id: 'c', text: 'Un título que emite Firmes', correct: false },
        ],
        explainer:
          'Firmes puede desbloquear un explicador; no matricula ni otorga títulos.',
      },
      {
        id: 'q2',
        prompt: 'Los créditos al ~2% para educación o vivienda son…',
        options: [
          { id: 'a', text: 'Líneas ya desembolsadas a tu cédula', correct: false },
          { id: 'b', text: 'Cifra del programa, sin verificar', correct: true },
          { id: 'c', text: 'El precio de comprar Firmes', correct: false },
        ],
        explainer:
          'No hay compra de apoyo político ni desembolso financiero en esta demo.',
      },
    ],
  },
  {
    id: 'est-quiz-anticorrup',
    ejeId: 'estado',
    type: 'quiz',
    title: 'Bloque anticorrupción',
    summary:
      'Identifica las piezas del relato: extinción de dominio, estatuto de contratación y trazabilidad.',
    firmesReward: 25,
    firmesKind: 'aprendidos',
    season1Focus: false,
    claims: [
      claim(
        'bloque-anticorrup',
        'Se propone un Bloque de Búsqueda contra la corrupción, extinción de dominio exprés y un nuevo estatuto de contratación con trazabilidad (incluso blockchain a 2030 en algunos textos).',
      ),
    ],
    badgeId: 'veedor',
    quiz: [
      {
        id: 'q1',
        prompt: '¿Qué instrumentos nombra el programa para el eje de Estado transparente?',
        options: [
          { id: 'a', text: 'Solo un nuevo logo institucional', correct: false },
          {
            id: 'b',
            text: 'Bloque anticorrupción, extinción de dominio y estatuto de contratación trazable',
            correct: true,
          },
          { id: 'c', text: 'Eliminar la Contraloría', correct: false },
        ],
        explainer:
          'Son anuncios de diseño institucional. Firmes no certifica procesos judiciales ni contratos.',
      },
      {
        id: 'q2',
        prompt: 'Un certificado de los primeros 90 días en Firmes demuestra…',
        options: [
          { id: 'a', text: 'Que pagaste por apoyar al gobierno', correct: false },
          {
            id: 'b',
            text: 'Que estudiaste propuestas (aprendizaje), no un aval oficial de resultados',
            correct: true,
          },
          { id: 'c', text: 'Que tus Firmes verificados son sentencias en firme', correct: false },
        ],
        explainer:
          'El certificado es simbólico y educativo. No es compra de apoyo ni auditoría estatal.',
      },
    ],
  },
];

export const BADGES: BadgeDef[] = [
  {
    id: 'primer-paso',
    name: 'Primer paso',
    description: 'Completaste tu primera misión de los primeros 90 días.',
  },
  {
    id: 'choque-90',
    name: 'Primeros 90 días',
    description: 'Estudiaste la propuesta de seguridad de los primeros 90 días.',
    ejeId: 'seguridad',
  },
  {
    id: 'vecino-firme',
    name: 'Vecino firme',
    description: 'Completaste la lista ciudadana de seguridad.',
    ejeId: 'seguridad',
  },
  {
    id: 'reportero',
    name: 'Reportero ciudadano',
    description: 'Enviaste un reporte de prueba (verificación simulada).',
  },
  {
    id: 'rescate-salud',
    name: 'Salud: 90 días',
    description: 'Estudiaste el anuncio de COP $10 billones y ADRES.',
    ejeId: 'salud',
  },
  {
    id: 'cuidador-salud',
    name: 'Cuidado en casa',
    description: 'Completaste la lista familiar de salud.',
    ejeId: 'salud',
  },
  {
    id: 'veedor',
    name: 'Veedor',
    description: 'Leíste las piezas del bloque de Estado transparente.',
    ejeId: 'estado',
  },
  {
    id: 'temporada-1',
    name: 'Certificado de los 90 días',
    description:
      'Al menos 3 misiones, con Seguridad y Salud. No es apoyo político pagado.',
  },
];

export const EXPLAINERS: ExplainerDef[] = [
  {
    id: 'exp-seguridad-90',
    title: 'Qué es (y no es) el plan de 90 días',
    body: 'El programa describe 90 días para recuperar seguridad en el territorio frente a narcotráfico, extorsión y secuestro, y menciona cerca de 330.000 ha de coca. En Firmes eso se estudia como propuesta. No hay tablero de hectáreas ni de capturas: esos números no están verificados aquí.',
  },
  {
    id: 'exp-salud-10b',
    title: 'COP $10 billones, ADRES e historia clínica',
    body: 'El programa de gobierno habla de COP $10 billones, ADRES, auditorías e historia clínica digital. Terminar misiones de Salud suma Firmes aprendidos. No prueba que el dinero se haya apropiado ni que la historia clínica única exista.',
  },
  {
    id: 'exp-economia-cuidado',
    title: 'Cómo leer las cifras económicas',
    body: '4×1000, Top 25, crecimiento al 7% y un ajuste cercano a COP $70 billones aparecen en textos del programa, a veces junto a recortes del Estado. Firmes las marca como sin verificar. No uses esta app como fuente de ejecución fiscal ni de logros de gobierno.',
  },
];

export const GEO_DEMO: Record<string, { lat: number; lng: number; label: string }> =
  {
    quibdo: { lat: 5.694, lng: -76.661, label: 'Quibdó · demo' },
    bogota: { lat: 4.711, lng: -74.072, label: 'Bogotá · demo' },
    medellin: { lat: 6.247, lng: -75.566, label: 'Medellín · demo' },
    cali: { lat: 3.452, lng: -76.532, label: 'Cali · demo' },
    barranquilla: { lat: 10.968, lng: -74.781, label: 'Barranquilla · demo' },
    cartagena: { lat: 10.391, lng: -75.479, label: 'Cartagena · demo' },
    cucuta: { lat: 7.889, lng: -72.496, label: 'Cúcuta · demo' },
    bucaramanga: { lat: 7.119, lng: -73.123, label: 'Bucaramanga · demo' },
    pasto: { lat: 1.213, lng: -77.281, label: 'Pasto · demo' },
    villavicencio: { lat: 4.142, lng: -73.627, label: 'Villavicencio · demo' },
  };

const BASE_GUILD: Omit<GuildMember, 'isYou'>[] = [
  { id: 'm1', name: 'María Palacios', firmes: 210, streak: 8 },
  { id: 'm2', name: 'Camilo Ríos', firmes: 180, streak: 5 },
  { id: 'm3', name: 'Lina Osorio', firmes: 150, streak: 4 },
  { id: 'm4', name: 'Andrés Peña', firmes: 95, streak: 2 },
  { id: 'm5', name: 'Diana Cuesta', firmes: 70, streak: 3 },
];

export function guildForMunicipio(
  municipioId: string | null,
  you: { firmes: number; streak: number },
): GuildMember[] {
  const shift = municipioId ? municipioId.length % 17 : 0;
  const others = BASE_GUILD.map((m, i) => ({
    ...m,
    firmes: m.firmes + shift * 3 - i,
  }));
  const youRow: GuildMember = {
    id: 'you',
    name: 'Tú',
    firmes: you.firmes,
    streak: you.streak,
    isYou: true,
  };
  return [...others, youRow].sort((a, b) => b.firmes - a.firmes);
}

export function getMission(id: string | undefined): Mission | undefined {
  if (!id) return undefined;
  return MISSIONS.find((m) => m.id === id);
}

export function getEje(id: FirmesEjeId): EjeDef {
  return FIRMES_EJES.find((e) => e.id === id) ?? FIRMES_EJES[0];
}

export function getBadge(id: string): BadgeDef | undefined {
  return BADGES.find((b) => b.id === id);
}

export function getExplainer(id: string): ExplainerDef | undefined {
  return EXPLAINERS.find((e) => e.id === id);
}

export function missionsForEje(ejeId: FirmesEjeId): Mission[] {
  return MISSIONS.filter((m) => m.ejeId === ejeId);
}

/** Season 1: Seguridad + Salud fully open; other axes are preview (still playable). */
export function ejeUnlockLevel(ejeId: FirmesEjeId): 'abierto' | 'vista' {
  return ejeId === 'seguridad' || ejeId === 'salud' ? 'abierto' : 'vista';
}
