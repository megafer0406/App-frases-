import type { Lesson } from '../../domain/types'

export const LIDERAZGO_LESSONS: Lesson[] = [
  {
    id: 'lid-teoria-x-y',
    trackId: 'liderazgo',
    order: 1,
    title: 'Teoría X y Teoría Y: cómo miras a tu equipo define lo que obtienes',
    hook: 'Antes de dar una instrucción, ya estás asumiendo algo sobre las personas. Esa suposición pesa más de lo que crees.',
    cards: [
      {
        kind: 'concepto',
        title: 'Dos suposiciones',
        paragraphs: [
          'En 1960, el psicólogo Douglas McGregor publicó *El lado humano de la empresa*. Describió dos formas de ver a las personas en el trabajo, a las que llamó Teoría X y Teoría Y.',
          'La Teoría X supone que las personas no disfrutan del trabajo, evitan la responsabilidad y necesitan control constante.',
        ],
      },
      {
        kind: 'concepto',
        title: 'La Teoría Y',
        paragraphs: [
          'La Teoría Y supone que el trabajo puede ser natural, que las personas buscan responsabilidad cuando las condiciones son buenas y que pueden dirigirse a sí mismas hacia objetivos que aceptan.',
          'McGregor no decía que una teoría fuera siempre correcta. Pedía revisar qué suposición guía cada decisión.',
        ],
        takeaway: 'Tu suposición sobre las personas se vuelve el clima de tu equipo.',
      },
      {
        kind: 'concepto',
        title: 'Una pregunta práctica',
        paragraphs: [
          'Antes de supervisar a alguien, pregúntate: ¿estoy controlando porque hay un problema real o porque confío poco?',
          'Pequeños cambios, como dar una decisión chica a alguien o pedir su propuesta antes de dar la tuya, muestran si estás operando con la Teoría X o con la Y.',
        ],
        takeaway: 'Delegar bien empieza por creer que la otra persona puede hacerlo.',
      },
    ],
    quiz: [
      {
        question: '¿Qué supone la Teoría Y de McGregor?',
        options: [
          'Que las personas evitan el trabajo',
          'Que las personas pueden asumir responsabilidad en buenas condiciones',
          'Que solo el dinero motiva',
          'Que el liderazgo no importa',
        ],
        correctIndex: 1,
        explanation: 'La Teoría Y confía en que las personas pueden autodirigirse y buscar responsabilidad cuando el entorno lo permite.',
      },
      {
        question: '¿En qué año publicó McGregor *El lado humano de la empresa*?',
        options: ['1945', '1960', '1985', '2001'],
        correctIndex: 1,
        explanation: 'La obra se publicó en 1960.',
      },
    ],
    reflectionPrompt: 'Con tu equipo, ¿qué supones sobre las personas que trabajan contigo? ¿Esa suposición se ve en tus decisiones?',
    action: 'Hoy delega una decisión pequeña a alguien de tu equipo y pídele su propuesta antes de dar la tuya.',
    sources: ['McGregor, D. *The Human Side of Enterprise* (1960). Edición en español: *El lado humano de la empresa*.'],
  },
  {
    id: 'lid-feedback-sbi',
    trackId: 'liderazgo',
    order: 2,
    title: 'Feedback que sí se escucha: el modelo SBI',
    hook: 'Muchos feedbacks fallan no porque sean duros, sino porque son vagos o hablan de la persona en lugar de lo que pasó.',
    cards: [
      {
        kind: 'concepto',
        title: 'Qué tiene de malo «eres desorganizado»',
        paragraphs: [
          'Frases como «eres desorganizado» o «no te esfuerzas» ponen el foco en la persona, no en lo que ocurrió. Eso activa defensas y deja la conversación sin salida.',
          'El modelo SBI, popularizado por el Center for Creative Leadership, propone un formato de tres partes para describir lo ocurrido de forma concreta.',
        ],
      },
      {
        kind: 'formula',
        title: 'Situación, comportamiento, impacto',
        paragraphs: [
          '**S**ituación: cuándo y dónde pasó. «En la reunión del martes con el cliente…»',
          '**C**omportamiento: lo que se observó, sin juicio. «…interrumpiste dos veces mientras hablaba…»',
          '**I**mpacto: el efecto concreto. «…y el cliente dejó de hacer preguntas.»',
        ],
        formula: {
          expression: 'Situación → comportamiento observable → impacto',
          example: '«En la reunión del martes interrumpiste dos veces. El cliente dejó de hacer preguntas.»',
        },
      },
      {
        kind: 'concepto',
        title: 'Cierra con una pregunta',
        paragraphs: [
          'Después del impacto, pregunta qué piensa la otra persona y qué podría hacer distinto. Un feedback es una conversación, no un veredicto.',
        ],
        takeaway: 'Describe lo que viste, no lo que concluyes de la persona.',
      },
    ],
    quiz: [
      {
        question: 'En el modelo SBI, ¿qué va después de describir la situación?',
        options: [
          'La conclusión sobre la personalidad',
          'El comportamiento observable',
          'Una sanción',
          'La comparación con otros',
        ],
        correctIndex: 1,
        explanation: 'Después de la situación va el comportamiento observable, sin juicios sobre la persona.',
      },
      {
        question: '¿Qué frase es más útil para dar feedback?',
        options: [
          'Eres muy desorganizado',
          'En la reunión del lunes llegaste 20 minutos tarde y el equipo esperó',
          'Siempre haces lo mismo',
          'No sirves para esto',
        ],
        correctIndex: 1,
        explanation: 'Describe una situación concreta, un comportamiento y su impacto.',
      },
    ],
    reflectionPrompt: '¿Qué feedback te has guardado esta semana por miedo a cómo reaccionará la otra persona?',
    action: 'Escribe un feedback de esta semana usando SBI y decide si lo compartes mañana.',
    sources: ['Center for Creative Leadership, modelo SBI (Situación, Comportamiento, Impacto).'],
  },
  {
    id: 'lid-efecto-pigmalion',
    trackId: 'liderazgo',
    order: 3,
    title: 'El efecto Pigmalión: lo que esperas de otros tiende a hacerse realidad',
    hook: 'Tus expectativas no son solo tu opinión. También influyen en lo que la otra persona termina haciendo.',
    cards: [
      {
        kind: 'historia',
        title: 'El experimento del aula',
        paragraphs: [
          'En 1968, los psicólogos Robert Rosenthal y Lenore Jacobson hicieron un experimento en una escuela primaria de California. Dieron a los maestros una prueba y les dijeron que algunos alumnos, elegidos al azar, tenían alto potencial de crecimiento.',
          'Al final del año, esos alumnos mostraron más avances en las pruebas. Los autores concluyeron que las expectativas de los maestros pudieron influir en el resultado.',
        ],
      },
      {
        kind: 'concepto',
        title: 'Qué tan sólido es',
        paragraphs: [
          'Replicaciones posteriores encontraron efectos más pequeños y variables. Por eso no conviene tomar el efecto como una ley. Lo que sí se sostiene es que las expectativas pueden influir en la conducta de quien las recibe.',
          'En el liderazgo, la expectativa se nota en el tono, en las tareas que asignas y en cuánto confías en la respuesta de alguien.',
        ],
        takeaway: 'Las expectativas no garantizan resultados, pero orientan las oportunidades que das.',
      },
      {
        kind: 'concepto',
        title: 'Expectativas que abren puertas',
        paragraphs: [
          'Asignar un proyecto retador a alguien con una frase como «confío en que puedes llevarlo» puede cambiar cómo se prepara. Las expectativas bajas, en cambio, suelen traducirse en menos oportunidades.',
          'Revisa a quién le das oportunidades y con qué expectativa.',
        ],
      },
    ],
    quiz: [
      {
        question: '¿Qué sugiere el efecto Pigmalión?',
        options: [
          'Que el talento es fijo',
          'Que las expectativas pueden influir en el desempeño de otras personas',
          'Que el liderazgo no sirve',
          'Que los niños aprenden solos',
        ],
        correctIndex: 1,
        explanation: 'Las expectativas influyen en las oportunidades y en la conducta de quien las recibe.',
      },
      {
        question: '¿Por qué no conviene tomar el efecto Pigmalión como una ley absoluta?',
        options: [
          'Porque nunca se ha estudiado',
          'Porque replicaciones posteriores encontraron efectos más pequeños y variables',
          'Porque es falso que existan expectativas',
          'Porque solo funciona con adultos',
        ],
        correctIndex: 1,
        explanation: 'Los estudios posteriores encontraron efectos más modestos y variables. Conviene usarlo como hipótesis.',
      },
    ],
    reflectionPrompt: '¿Qué expectativa tienes hoy sobre alguien de tu equipo? ¿Cómo se la estás comunicando?',
    action: 'Esta semana asigna una responsabilidad retadora a alguien que hoy no la tiene y dile en voz alta por qué confías en esa persona.',
    sources: [
      'Rosenthal, R. y Jacobson, L. *Pygmalion in the Classroom* (1968).',
      'Jussim, L. y Harber, K. D. (2005). Teacher expectations and self-fulfilling prophecies. *Personality and Social Psychology Review*.',
    ],
  },
  {
    id: 'lid-liderazgo-situacional',
    trackId: 'liderazgo',
    order: 4,
    title: 'Liderazgo situacional: no existe un solo estilo correcto',
    hook: 'El mismo líder puede dar órdenes en una crisis y delegar con un equipo experimentado. El error es usar siempre el mismo estilo.',
    cards: [
      {
        kind: 'concepto',
        title: 'Dos variables',
        paragraphs: [
          'El modelo de liderazgo situacional de Paul Hersey y Ken Blanchard propone que el estilo adecuado depende de dos cosas: la competencia de la persona para la tarea y su compromiso con ella.',
          'Hersey y Blanchard lo presentaron a finales de los años sesenta y lo desarrollaron en ediciones posteriores. Su idea central es adaptarse a cada tarea y a cada persona.',
        ],
      },
      {
        kind: 'formula',
        title: 'Cuatro estilos',
        paragraphs: [
          '**Dirigir**: para quien tiene poca competencia, aunque quizá mucho entusiasmo. Instrucciones claras y seguimiento.',
          '**Entrenar**: para quien tiene algo de competencia pero poco compromiso o confianza. Explicar, guiar y pedir práctica.',
          '**Apoyar**: para quien ya sabe hacerlo y necesita confianza y reconocimiento.',
          '**Delegar**: para quien ya es competente y está comprometido. Dar autonomía y resultados.',
        ],
        formula: {
          expression: 'Poca competencia → dirigir · Algo de competencia → entrenar · Competente, poco seguro → apoyar · Competente y comprometido → delegar',
          example: 'Pregunta siempre: ¿qué tan capaz y qué tan comprometida está esta persona con esta tarea concreta?',
        },
      },
      {
        kind: 'concepto',
        title: 'Pregunta antes de decidir',
        paragraphs: [
          'Antes de intervenir, pregunta: ¿qué sabe hacer esta persona en esta tarea concreta? ¿Qué tan comprometida está? Alguien puede ser muy competente en una tarea y principiante en otra.',
        ],
        takeaway: 'El estilo cambia con la tarea, no con el cariño que le tienes a la persona.',
      },
    ],
    quiz: [
      {
        question: '¿Qué determina el estilo adecuado en el modelo situacional?',
        options: [
          'La antigüedad en la empresa',
          'La competencia y el compromiso de la persona con la tarea',
          'El tamaño de la empresa',
          'La edad del líder',
        ],
        correctIndex: 1,
        explanation: 'El modelo ajusta el estilo a la competencia y el compromiso de la persona en cada tarea.',
      },
      {
        question: '¿Qué estilo conviene a alguien competente y comprometido?',
        options: ['Dirigir', 'Entrenar', 'Delegar', 'Controlar cada paso'],
        correctIndex: 2,
        explanation: 'Quien es competente y está comprometido necesita autonomía, es decir, delegar.',
      },
    ],
    reflectionPrompt: '¿Con quién de tu equipo usas siempre el mismo estilo, aunque la situación pida otro?',
    action: 'Hoy identifica a una persona de tu equipo y decide si en su próxima tarea necesita dirigir, entrenar, apoyar o delegar.',
    sources: ['Hersey, P. y Blanchard, K. H. *Management of Organizational Behavior* (1969).'],
  },
]
