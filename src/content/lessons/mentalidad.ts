import type { Lesson } from '../../domain/types'

export const MENTALIDAD_LESSONS: Lesson[] = [
  {
    id: 'men-regla-1-por-ciento',
    trackId: 'mentalidad',
    order: 1,
    title: 'La regla del 1%: la matemática del progreso pequeño',
    hook: 'Mejorar un 1% al día suena insignificante. Pero sumar cada día produce un efecto mucho mayor de lo que imaginamos.',
    cards: [
      {
        kind: 'formula',
        title: '1.01 elevado a 365',
        paragraphs: [
          'Si cada día mejoras un 1%, al cabo de un año no llegas a un 365% de mejora, sino a mucho más: al multiplicar cada día, 1.01 elevado a 365 da aproximadamente 37.8 veces tu punto de partida.',
          'Lo contrario también es cierto: si cada día empeoras un 1%, al final del año quedas en cerca de 0.03 de tu punto de partida.',
        ],
        formula: {
          expression: '1.01^365 ≈ 37.8     ·     0.99^365 ≈ 0.03',
          example: 'El interés compuesto aplicado a tu conducta diaria.',
        },
      },
      {
        kind: 'concepto',
        title: 'Qué significa de verdad',
        paragraphs: [
          'La matemática es una metáfora, no una garantía. Ningún aspecto de la vida mejora en línea recta. Pero la idea sí es útil: lo que haces todos los días pesa más que lo que haces de vez en cuando.',
          'Por eso conviene elegir mejoras pequeñas, medibles y repetibles, en vez de transformaciones grandes que se abandonan en tres semanas.',
        ],
        takeaway: 'La constancia pequeña vence al esfuerzo extraordinario que no se repite.',
      },
      {
        kind: 'concepto',
        title: 'Tu 1% de hoy',
        paragraphs: [
          'Busca una mejora que puedas hacer en menos de 10 minutos: leer una página, revisar una métrica, decir un agradecimiento, cerrar una tarea pendiente.',
        ],
        takeaway: 'Un 1% que sí haces vale más que un 100% que solo planeas.',
      },
    ],
    quiz: [
      {
        question: '¿Cuánto es aproximadamente 1.01 elevado a 365?',
        options: ['1.4', '3.7', '37.8', '1,000'],
        correctIndex: 2,
        explanation: 'Aproximadamente 37.8. El crecimiento compuesto acumula mucho más de lo que sugiere el 1% diario.',
      },
      {
        question: '¿Qué significa tratar la regla del 1% como metáfora?',
        options: [
          'Que no sirve de nada',
          'Que no es una garantía matemática, pero sí una forma útil de pensar la constancia',
          'Que siempre se cumple en línea recta',
          'Que solo funciona con dinero',
        ],
        correctIndex: 1,
        explanation: 'La idea es útil para pensar en la constancia, aunque la vida no crece de forma perfecta.',
      },
    ],
    reflectionPrompt: '¿Qué pequeña mejora diaria podrías sostener durante 30 días sin sentirla como castigo?',
    action: 'Elige una mejora de menos de 10 minutos y hazla hoy. Anótala en tu diario.',
    sources: [
      'Clear, J. *Atomic Habits* (2018). Concepto popular de la mejora diaria del 1%.',
      'Cálculo propio: 1.01^365 ≈ 37.78 y 0.99^365 ≈ 0.0255.',
    ],
  },
  {
    id: 'men-intencion-implementacion',
    trackId: 'mentalidad',
    order: 2,
    title: 'Intención de implementación: convierte «quiero» en «cuando pase X, haré Y»',
    hook: 'Querer cambiar no basta. Decidir cuándo y dónde lo harás aumenta mucho la probabilidad de hacerlo.',
    cards: [
      {
        kind: 'concepto',
        title: 'Qué es',
        paragraphs: [
          'Una intención de implementación es un plan con esta forma: «Cuando ocurra X, haré Y». La situación y la acción quedan decididas antes de que aparezca la tentación.',
          'Compara: «quiero leer más» es una meta. «Cuando llegue a casa y deje las llaves, leeré una página» es una intención de implementación.',
        ],
      },
      {
        kind: 'historia',
        title: 'Un mecanismo estudiado',
        paragraphs: [
          'En 1999, el psicólogo Peter Gollwitzer describió este mecanismo en la revista American Psychologist: formular un plan del tipo «si ocurre X, haré Y» hace más probable que la persona actúe cuando llegue la situación.',
          'Desde entonces, muchos estudios han probado el efecto en áreas como el ejercicio, la alimentación y el estudio.',
          'El plan funciona porque convierte una decisión general en una acción concreta que se activa sola.',
        ],
        takeaway: 'Un plan con hora y lugar pesa más que diez buenas intenciones.',
      },
      {
        kind: 'concepto',
        title: 'Cómo escribir la tuya',
        paragraphs: [
          'Ponle un momento o un lugar y una acción pequeña: «Cuando termine mi café de la mañana, abriré Pensadía y leeré la lección». Si la acción es grande, divídela hasta que quepa en dos minutos.',
          'Al final del día, revisa el plan: qué pasó y qué ajustarías mañana.',
        ],
      },
    ],
    quiz: [
      {
        question: 'Quieres dejar de revisar el celular al despertar. ¿Cuál es una intención de implementación bien formulada?',
        options: [
          'Voy a usar menos el celular',
          'Cuando suene la alarma, dejaré el celular fuera de la cama y tomaré un vaso de agua',
          'Quiero ser más disciplinado',
          'Algún día lo intentaré',
        ],
        correctIndex: 1,
        explanation: 'Tiene una situación y una acción concreta, así que el plan se activa solo.',
      },
      {
        question: 'Si tu plan falla un día, ¿qué conviene hacer?',
        options: [
          'Abandonarlo',
          'Revisar qué pasó y ajustar el plan de inmediato',
          'Culparte y empezar otro año',
          'Cambiar por completo la meta',
        ],
        correctIndex: 1,
        explanation: 'Ajustar un plan pequeño es más útil que abandonarlo.',
      },
    ],
    reflectionPrompt: '¿Qué hábito quieres cambiar, y en qué momento exacto del día podrías hacerlo?',
    action: 'Escribe hoy una intención con la forma «Cuando ocurra X, haré Y» y ponla donde la veas.',
    sources: [
      'Gollwitzer, P. M. (1999). Implementation intentions: Strong effects of simple plans. American Psychologist, 54(7), 493–503.',
    ],
  },
  {
    id: 'men-curva-olvido',
    trackId: 'mentalidad',
    order: 3,
    title: 'La curva del olvido: repasar es la mitad del aprendizaje',
    hook: 'Lees algo interesante y dos días después no recuerdas casi nada. No es falta de talento: así funciona la memoria sin repaso.',
    cards: [
      {
        kind: 'historia',
        title: 'Ebbinghaus y las sílabas sin sentido',
        paragraphs: [
          'A finales del siglo XIX, Hermann Ebbinghaus estudió la memoria con sílabas sin sentido. Midió cuánto recordaba después de distintos intervalos y dibujó lo que hoy se conoce como la curva del olvido.',
          'Su hallazgo central: la memoria se debilita con el tiempo, y la caída es más pronunciada al principio si no hay repaso.',
        ],
      },
      {
        kind: 'concepto',
        title: 'Repaso espaciado',
        paragraphs: [
          'El repaso espaciado consiste en repasar la información en intervalos crecientes: al día siguiente, después de tres días, luego de una semana.',
          'Cada repaso vuelve a activar el recuerdo y lo consolida. Por eso repasar en distintos días suele funcionar mejor que estudiar todo de golpe.',
        ],
        takeaway: 'No se trata de memorizar más, sino de repasar en el momento justo.',
      },
      {
        kind: 'concepto',
        title: 'Cómo usarlo',
        paragraphs: [
          'Después de cada lección, vuelve a una idea clave a las 24 horas, a los tres días y a la semana. En la app, el repaso te muestra qué lección revisar cada día.',
          'Escribe con tus palabras la idea principal. Explicarla en voz alta también ayuda.',
        ],
        takeaway: 'Una idea que vuelves a recordar es una idea que se queda contigo.',
      },
    ],
    quiz: [
      {
        question: '¿Qué describe la curva del olvido de Ebbinghaus?',
        options: [
          'Cómo aumenta la memoria con la edad',
          'Cómo se debilita el recuerdo con el tiempo si no hay repaso',
          'La velocidad de lectura',
          'El número de neuronas',
        ],
        correctIndex: 1,
        explanation: 'La curva muestra la caída del recuerdo a lo largo del tiempo sin repaso.',
      },
      {
        question: '¿En qué consiste el repaso espaciado?',
        options: [
          'Estudiar todo en una noche',
          'Repasar en intervalos crecientes',
          'Leer lo mismo cien veces seguidas',
          'Evitar repasar para no confundirse',
        ],
        correctIndex: 1,
        explanation: 'Repasar en intervalos crecientes consolida la memoria mejor que el estudio concentrado.',
      },
    ],
    reflectionPrompt: '¿Qué lección de la semana pasada recuerdas hoy? ¿Qué parte se te olvidó?',
    action: 'Repasa hoy en dos minutos la idea principal de una lección de hace más de un día y explícala en voz alta.',
    sources: [
      'Ebbinghaus, H. *Über das Gedächtnis* (1885).',
      'Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T. y Rohrer, D. (2006). Distributed practice in verbal recall tasks. *Psychological Bulletin*.',
    ],
  },
]
