import type { Archetype, FunnelQuestion } from '../domain/types'

/**
 * Preguntas del quiz. Cada opción suma puntos a uno o más arquetipos.
 * El paso del nombre se pide aparte (ver features/funnel/QuizPage).
 */
export const FUNNEL_QUESTIONS: FunnelQuestion[] = [
  {
    id: 'objetivo',
    icon: 'target',
    prompt: '¿Qué te gustaría lograr en los próximos 90 días?',
    hint: 'Elige el que más te mueva.',
    options: [
      { value: 'cultura', label: 'Entender mejor la historia y el mundo', weights: { curioso: 2 } },
      { value: 'liderar', label: 'Liderar a mi equipo con más confianza', weights: { lider: 2 } },
      { value: 'negocio', label: 'Entender los números de mi negocio', weights: { estratega: 2 } },
      { value: 'constancia', label: 'Construir hábitos que sí se queden', weights: { constante: 2 } },
    ],
  },
  {
    id: 'tiempo',
    icon: 'clock',
    prompt: '¿Cuánto tiempo real puedes dedicarle al día?',
    hint: 'Elige el tiempo que tienes.',
    options: [
      { value: '5', label: '5 minutos entre tareas', weights: { constante: 1 } },
      { value: '10', label: 'Unos 10 minutos', weights: { curioso: 1 } },
      { value: '15', label: '15 a 20 minutos', weights: { lider: 1 } },
      { value: 'variable', label: 'Depende del día', weights: { estratega: 1 } },
    ],
  },
  {
    id: 'consumo',
    icon: 'headphones',
    prompt: 'Cuando consumes podcasts, videos o libros, ¿qué te pasa?',
    options: [
      { value: 'olvido', label: 'Lo disfruto, pero se me olvida todo en un día', weights: { curioso: 2 } },
      { value: 'abandono', label: 'Lo empiezo con ganas y lo dejo a medias', weights: { constante: 2 } },
      { value: 'informado', label: 'Me siento informado, pero no más capaz', weights: { estratega: 1, lider: 1 } },
      { value: 'poco', label: 'Siento que sé muy poco de temas importantes', weights: { curioso: 1, lider: 1 } },
    ],
  },
  {
    id: 'conversacion',
    icon: 'message',
    prompt: '¿Cómo te sientes al hablar de historia, filosofía o economía?',
    options: [
      { value: 'callar', label: 'Me quedo callado y me da vergüenza', weights: { curioso: 2 } },
      { value: 'opinar', label: 'Opino, pero no estoy seguro de mis datos', weights: { estratega: 1, curioso: 1 } },
      { value: 'saber', label: 'Lo sé, pero no lo convierto en una ventaja', weights: { lider: 2 } },
      { value: 'interes', label: 'Me interesa, pero no me siento preparado', weights: { curioso: 1, constante: 1 } },
    ],
  },
  {
    id: 'miedo',
    icon: 'mountain',
    prompt: 'Cuando piensas en dentro de 5 años, ¿qué te preocupa más?',
    options: [
      { value: 'igual', label: 'Seguir igual, sin avanzar de verdad', weights: { constante: 2 } },
      { value: 'rezago', label: 'Quedarme atrás frente a colegas que sí entienden el negocio', weights: { estratega: 2 } },
      { value: 'liderazgo', label: 'No estar listo para liderar algo más grande', weights: { lider: 2 } },
      { value: 'control', label: 'No tener control sobre mis decisiones ni mi dinero', weights: { estratega: 1, constante: 1 } },
    ],
  },
  {
    id: 'frenos',
    icon: 'trending',
    prompt: '¿Qué te ha frenado antes?',
    options: [
      { value: 'tiempo', label: 'No encuentro tiempo', weights: { constante: 1, curioso: 1 } },
      { value: 'abandono', label: 'Empiezo fuerte y a la semana me abandono', weights: { constante: 2 } },
      { value: 'inicio', label: 'No sé por dónde empezar', weights: { curioso: 1, estratega: 1 } },
      { value: 'pena', label: 'Me da pena no saber lo básico', weights: { curioso: 2 } },
    ],
  },
  {
    id: 'persona',
    icon: 'mirror',
    prompt: '¿Qué persona quieres ser dentro de un año?',
    options: [
      { value: 'criterio', label: 'Alguien con criterio propio al opinar', weights: { curioso: 2 } },
      { value: 'lider', label: 'Un líder al que la gente quiere seguir', weights: { lider: 2 } },
      { value: 'negocio', label: 'Alguien que entiende cómo funciona un negocio', weights: { estratega: 2 } },
      { value: 'constante', label: 'Alguien constante en quien puedo confiar', weights: { constante: 2 } },
    ],
  },
  {
    id: 'horario',
    icon: 'sun',
    prompt: '¿Cuándo te conviene aprender?',
    hint: 'Guardamos tu horario preferido. Puedes cambiarlo después; no enviamos recordatorios.',
    options: [
      { value: '07:30', label: 'Por la mañana, antes de empezar', weights: {} },
      { value: '13:00', label: 'A mediodía, en la pausa', weights: {} },
      { value: '21:00', label: 'Por la noche, antes de dormir', weights: {} },
    ],
  },
  {
    id: 'disposicion',
    icon: 'compass',
    prompt: '¿Qué tan dispuesto estás a cambiar 5 minutos de scroll por crecer?',
    options: [
      { value: 'alta', label: 'Muy dispuesto. Ya lo intenté antes', weights: { constante: 1 } },
      { value: 'media', label: 'Dispuesto, si es simple de sostener', weights: { curioso: 1 } },
      { value: 'duda', label: 'Tengo dudas, pero quiero probar', weights: { estratega: 1 } },
    ],
  },
  {
    id: 'ambicion',
    icon: 'trophy',
    prompt: '¿Qué te gustaría haber logrado en 6 meses?',
    options: [
      { value: 'sabio', label: 'Que ahora entiendo mejor el mundo y lo explico con claridad', weights: { curioso: 2 } },
      { value: 'equipo', label: 'Que mi equipo confía más en mis decisiones', weights: { lider: 2 } },
      { value: 'numeros', label: 'Que leo mi negocio con números y no con intuición', weights: { estratega: 2 } },
      { value: 'racha', label: 'Que tengo un hábito que sí sigo', weights: { constante: 2 } },
    ],
  },
]

export const ARCHETYPES: Archetype[] = [
  {
    id: 'curioso',
    name: 'El Curioso con Hambre',
    tagline: 'Consumes mucho y retienes poco. Quieres entender el mundo de verdad.',
    pain: 'Lees, escuchas y ves contenido todos los días, pero al final de la semana casi no recuerdas nada.',
    fear: 'Parecer el único que no entiende la referencia en una conversación importante.',
    desire: 'Tener criterio propio y participar en cualquier conversación con seguridad.',
    firstTrack: 'historia',
  },
  {
    id: 'lider',
    name: 'El Líder en Construcción',
    tagline: 'Tienes gente a cargo, pero nadie te enseñó a liderar con método.',
    pain: 'Las conversaciones difíciles te agotan y no sabes si tu estilo de liderazgo funciona.',
    fear: 'Que tu equipo pierda el respeto o que te den un puesto más grande antes de estar listo.',
    desire: 'Liderar con claridad y que la gente quiera seguirte.',
    firstTrack: 'liderazgo',
  },
  {
    id: 'estratega',
    name: 'El Estratega sin Mapa',
    tagline: 'Decides con intuición y ves poco los números que importan.',
    pain: 'Tomas decisiones importantes sin entender del todo tus métricas ni tus riesgos.',
    fear: 'Quedarte sin caja o no ver una crisis a tiempo.',
    desire: 'Leer tu negocio como un tablero y decidir con datos.',
    firstTrack: 'negocios',
  },
  {
    id: 'constante',
    name: 'El Constructor que se Frena',
    tagline: 'Sabes lo que quieres. Empiezas con fuerza y luego la vida te saca del camino.',
    pain: 'Compras libros, cursos y apps que terminas dejando a medias.',
    fear: 'Tener otro año igual, con las mismas intenciones y la misma sensación de estancamiento.',
    desire: 'Ser alguien constante, en quien puedes confiar.',
    firstTrack: 'mentalidad',
  },
]
