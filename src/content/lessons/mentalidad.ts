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
    hook: 'Querer mejorar no basta. Lo que cambia la conducta es decidir de antemano cuándo y dónde lo harás.',
    cards: [
      {
        kind: 'concepto',
        title: 'La brecha entre intención y acción',
        paragraphs: [
          'Muchas personas tienen buenas intenciones, pero no las convierten en acción. Una meta general como «quiero leer más» depende de que aparezca la motivación en el momento preciso.',
          'El psicólogo Peter Gollwitzer estudió las intenciones de implementación: planes del tipo «si ocurre X, entonces haré Y». Sus experimentos mostraron que este formato aumenta la probabilidad de actuar.',
        ],
      },
      {
        kind: 'formula',
        title: 'La fórmula «si-entonces»',
        paragraphs: [
          'Una intención de implementación tiene dos partes: el disparador (cuándo y dónde) y la acción concreta.',
          'Un metaanálisis posterior (Gollwitzer y Sheeran, 2006) encontró un efecto de medio a grande sobre la conducta en muchos estudios.',
        ],
        formula: {
          expression: 'Cuando ocurra [disparador], haré [acción concreta]',
          example: '«Cuando termine mi café de la mañana, leo mi lección de 5 minutos.»',
        },
      },
      {
        kind: 'concepto',
        title: 'Haz el plan más pequeño posible',
        paragraphs: [
          'Cuanto más específico es el disparador, más fácil es cumplir el plan. «Haré ejercicio» es vago. «Cuando llegue a casa, me pongo los tenis y camino 10 minutos» se puede hacer hoy.',
        ],
        takeaway: 'El plan no tiene que ser ambicioso. Tiene que ser específico.',
      },
    ],
    quiz: [
      {
        question: '¿Qué es una intención de implementación?',
        options: [
          'Un deseo general de cambiar',
          'Un plan del tipo «si ocurre X, haré Y»',
          'Una meta anual',
          'Un castigo por no cumplir',
        ],
        correctIndex: 1,
        explanation: 'Es un plan que vincula una situación concreta con una acción concreta.',
      },
      {
        question: '¿Qué hace más fácil cumplir un plan?',
        options: [
          'Que sea muy ambicioso',
          'Un disparador específico (cuándo y dónde)',
          'Hacerlo con muchas personas',
          'Esperar a sentirse motivado',
        ],
        correctIndex: 1,
        explanation: 'El disparador específico quita la decisión del momento y hace la acción automática.',
      },
    ],
    reflectionPrompt: '¿Qué intención tienes desde hace tiempo que nunca completaste? Escríbela como «cuando… haré…».',
    action: 'Escribe tu intención en forma «cuando [disparador], haré [acción]» y ponla en tu horario o en el calendario de tu teléfono.',
    sources: [
      'Gollwitzer, P. M. (1999). Implementation intentions: Strong effects of simple plans. *American Psychologist*.',
      'Gollwitzer, P. M. y Sheeran, P. (2006). Implementation intentions and goal achievement: A meta-analysis of effects and processes. *Advances in Experimental Social Psychology*.',
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
