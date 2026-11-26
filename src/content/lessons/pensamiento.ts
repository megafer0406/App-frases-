import type { Lesson } from '../../domain/types'

export const PENSAMIENTO_LESSONS: Lesson[] = [
  {
    id: 'pen-sesgo-confirmacion',
    trackId: 'pensamiento',
    order: 1,
    title: 'Sesgo de confirmación: el filtro que siempre te da la razón',
    hook: 'Buscas información y, sin darte cuenta, eliges la que ya confirma lo que pensabas.',
    cards: [
      {
        kind: 'concepto',
        title: 'Qué es',
        paragraphs: [
          'El sesgo de confirmación es la tendencia a buscar, interpretar y recordar la información que apoya lo que ya creemos, y a restarle valor a la que lo contradice.',
          'Hoy lo alimentan las redes. Si un video te dio la razón una vez, el feed aprende que eso te gusta y te muestra más de lo mismo. Así, tu mundo se parece cada vez más a tu opinión.',
          'No es falta de inteligencia. Es un atajo mental que todos usamos, incluso las personas más preparadas.',
        ],
        takeaway: 'El problema no es tener creencias: es no buscar nada que pueda cambiarlas.',
      },
      {
        kind: 'historia',
        title: 'Un experimento clásico',
        paragraphs: [
          'En 1960, el psicólogo Peter Wason mostró a sus participantes la secuencia 2, 4, 6 y les pidió descubrir la regla que la generaba. Podían proponer cualquier otra secuencia y ver si cumplía la regla.',
          'La mayoría formulaba una hipótesis, como «números pares que suben de dos en dos», y probaba solo secuencias que la confirmaban, como 8, 10, 12. Casi nunca probaban algo que pudiera fallar, como 1, 2, 3.',
          'La regla real era mucho más simple: cualquier secuencia de números en orden creciente. Quienes buscaban confirmar su idea tardaban mucho más en descubrirla.',
        ],
        takeaway: 'Confirmar tu idea es fácil. Ponerla a prueba es lo que te acerca a la verdad.',
      },
      {
        kind: 'concepto',
        title: 'Cómo contrarrestarlo',
        paragraphs: [
          'Antes de creer algo importante, pregúntate: ¿qué evidencia tendría que ver para cambiar de opinión? Si no puedes responder, no estás evaluando: estás defendiendo una postura.',
          'Luego busca el mejor argumento de quien piensa distinto, no la versión más débil. Y antes de compartir algo, revisa al menos una fuente que no comparta tu punto de vista.',
          'En el feed, sigue a alguien que piense diferente a ti, aunque no te guste. No para estar de acuerdo, sino para entender.',
        ],
        takeaway: 'Una opinión que no podría cambiar con evidencia no es una conclusión: es una preferencia.',
      },
    ],
    quiz: [
      {
        question: 'Llevas semanas convencido de que un negocio va mal porque un cliente se quejó en redes. ¿Qué haces para comprobarlo?',
        options: [
          'Buscar más comentarios que confirmen tu idea',
          'Revisar quejas y opiniones de otros clientes, también las positivas',
          'Compartir la queja para que otros te den la razón',
          'Ignorar cualquier dato que no venga de tu propio equipo',
        ],
        correctIndex: 1,
        explanation: 'Para comprobar una idea necesitas evidencia que pueda contradecirla, no solo la que la confirma.',
      },
      {
        question: '¿Qué pregunta ayuda a contrarrestarlo?',
        options: [
          '¿Quién me cae mejor?',
          '¿Qué evidencia me haría cambiar de opinión?',
          '¿Cuántos likes tiene?',
          '¿Qué dicen mis amigos?',
        ],
        correctIndex: 1,
        explanation: 'Definir de antemano qué evidencia te haría cambiar de opinión te obliga a evaluar de verdad.',
      },
    ],
    reflectionPrompt: '¿Qué creencia tuya sobre un tema importante no has puesto a prueba con datos que la contradigan?',
    action: 'Esta semana busca el mejor argumento a favor de una postura que no compartes y resúmelo en tres frases.',
    sources: [
      'Wason, P. C. (1960). On the failure to eliminate hypotheses in a conceptual task. Quarterly Journal of Experimental Psychology, 12(3), 129–140.',
    ],
  },
  {
    id: 'pen-sesgo-supervivencia',
    trackId: 'pensamiento',
    order: 2,
    title: 'Sesgo de supervivencia: lo que no ves también es información',
    hook: 'Durante la Segunda Guerra Mundial, un matemático recomendó reforzar zonas que casi nadie hubiera elegido. Su razón cambia cómo se leen los datos.',
    cards: [
      {
        kind: 'historia',
        title: 'Los aviones que volvían',
        paragraphs: [
          'Durante la Segunda Guerra Mundial, el ejército de Estados Unidos analizó los impactos de bala en los bombarderos que regresaban. La propuesta inicial era reforzar las zonas con más impactos.',
          'Según el relato más difundido, el estadístico Abraham Wald propuso lo contrario: reforzar las zonas sin impactos. Los aviones alcanzados en esas zonas no volvían, así que los datos disponibles estaban incompletos.',
        ],
      },
      {
        kind: 'concepto',
        title: 'Qué es el sesgo',
        paragraphs: [
          'El sesgo de supervivencia ocurre cuando solo miramos a quienes llegaron al final e ignoramos a quienes no lo lograron. Vemos casos de éxito y olvidamos los fracasos que no sobrevivieron para contar su historia.',
          'Pasa con empresas famosas, con libros de éxito y con trayectorias de personas que «lo lograron sin estudiar». Quienes no lo lograron no escriben libros.',
        ],
        takeaway: 'Antes de aprender de un caso de éxito, pregúntate cuántos intentaron lo mismo y no están.',
      },
      {
        kind: 'concepto',
        title: 'Cómo aplicarlo',
        paragraphs: [
          'Si analizas un proyecto, un mercado o una estrategia, pregunta qué datos no están en tu muestra. ¿Qué clientes se fueron? ¿Qué intentos fracasaron?',
        ],
        takeaway: 'Los datos que faltan suelen ser los más importantes.',
      },
    ],
    quiz: [
      {
        question: 'Según el relato más difundido, ¿qué zonas recomendó reforzar Abraham Wald?',
        options: [
          'Las que tenían más impactos',
          'Las que no tenían impactos en los aviones que regresaron',
          'Solo la cola, siempre',
          'Las alas, por ser lo más visible',
        ],
        correctIndex: 1,
        explanation: 'Los aviones que regresaban mostraban que podían recibir impactos en esas zonas y seguir volando. Las zonas sin impactos eran las que más faltaba proteger, porque los aviones alcanzados ahí no regresaban.',
      },
      {
        question: '¿Qué es el sesgo de supervivencia?',
        options: [
          'Creer que solo los buenos sobreviven',
          'Mirar solo a quienes llegaron al final e ignorar a los que no',
          'Tener miedo a fallar',
          'Aprender demasiado rápido',
        ],
        correctIndex: 1,
        explanation: 'Es analizar únicamente a los sobrevivientes y olvidar a quienes no llegaron.',
      },
    ],
    reflectionPrompt: '¿Qué ejemplo de éxito estás tomando como modelo? ¿Qué sabes de quienes intentaron lo mismo y no llegaron?',
    action: 'Antes de copiar una estrategia de éxito esta semana, anota dos casos de personas que intentaron algo parecido y no lo lograron.',
    sources: [
      'Mangel, M. y Samaniego, F. J. (1984). Abraham Wald’s work on aircraft survivability. *Journal of the American Statistical Association*.',
    ],
  },
  {
    id: 'pen-pareto',
    trackId: 'pensamiento',
    order: 3,
    title: 'Principio de Pareto: pocas causas explican la mayoría de los resultados',
    hook: 'Si tus resultados vienen de unos pocos clientes, tareas o decisiones, ¿les estás dedicando el tiempo que merecen?',
    cards: [
      {
        kind: 'historia',
        title: 'De la tierra a la productividad',
        paragraphs: [
          'El economista italiano Vilfredo Pareto observó a finales del siglo XIX que gran parte de la tierra en Italia pertenecía a una minoría. Con los años, esa observación se convirtió en la regla que hoy se conoce como 80/20.',
          'La regla no es una ley de la naturaleza. Es una forma de describir desequilibrios que aparecen con frecuencia: pocos clientes generan la mayor parte de las ventas, pocos errores causan la mayoría de los problemas.',
        ],
      },
      {
        kind: 'formula',
        title: 'Cómo usarlo',
        paragraphs: [
          'Haz una lista de tus clientes, tareas o productos y ordénalos por el resultado que generan. Suele haber un grupo pequeño que explica la mayoría del resultado.',
          'Ese grupo merece más atención, y el resto puede simplificarse o automatizarse.',
        ],
        formula: {
          expression: 'Ordena por impacto → identifica el grupo que produce la mayoría → invierte ahí',
          example: 'Ejemplo hipotético: 5 de 25 clientes generan $80 de cada $100 en ingresos.',
        },
      },
      {
        kind: 'concepto',
        title: 'Cuidado con la regla',
        paragraphs: [
          'El 80/20 es un punto de partida, no una medida exacta. A veces la proporción es 70/30 o 90/10. Lo importante es identificar el desequilibrio y actuar sobre él.',
        ],
        takeaway: 'Busca la causa dominante antes de repartir tu esfuerzo de forma pareja.',
      },
    ],
    quiz: [
      {
        question: '¿Qué describe la versión práctica del principio de Pareto?',
        options: [
          'Todas las causas pesan lo mismo',
          'Una minoría de causas suele explicar la mayoría de los resultados',
          'Siempre hay que trabajar 80 horas',
          'El 20% de las personas no sirve',
        ],
        correctIndex: 1,
        explanation: 'El principio describe desequilibrios: pocas causas explican gran parte de los resultados.',
      },
      {
        question: '¿Qué es lo primero que haces para aplicar Pareto?',
        options: [
          'Contratar a más personas',
          'Ordenar tus clientes o tareas por el resultado que generan',
          'Cerrar tu negocio',
          'Subir todos los precios',
        ],
        correctIndex: 1,
        explanation: 'Sin ordenar por impacto no puedes ver qué grupo es el que produce el resultado.',
      },
    ],
    reflectionPrompt: '¿Qué tres clientes, tareas o productos generan la mayor parte de tu resultado? ¿Les dedicas el tiempo que merecen?',
    action: 'Haz hoy una lista de tus 10 tareas o clientes más importantes, ordenados por impacto.',
    sources: [
      'Pareto, V. *Cours d’économie politique* (1896–1897).',
      'Koch, R. *The 80/20 Principle* (1998).',
    ],
  },
]
