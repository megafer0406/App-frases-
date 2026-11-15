import type { Lesson } from '../../domain/types'

export const FILOSOFIA_LESSONS: Lesson[] = [
  {
    id: 'fil-caverna-platon',
    trackId: 'filosofia',
    order: 1,
    title: 'El mito de la caverna: lo que tomas por realidad',
    hook: 'Imagina personas encadenadas desde niñas, mirando sombras en una pared. Para ellas, esas sombras son el mundo entero.',
    cards: [
      {
        kind: 'mito',
        title: 'La escena de Platón',
        paragraphs: [
          'En *La República* (libro VII), Platón describe a prisioneros encadenados dentro de una caverna. Solo ven las sombras que proyectan objetos delante de un fuego sobre la pared del fondo. Para ellos, esas sombras son la realidad.',
          'Uno es liberado y obligado a girar la cabeza. Al principio le duele la luz y no entiende nada. Luego ve los objetos y el fuego, y por último sale y mira el sol.',
        ],
      },
      {
        kind: 'concepto',
        title: 'Qué significa',
        paragraphs: [
          'El sol representa la Idea del Bien: la verdad que ilumina todo lo demás. Platón sostiene que la educación es un proceso de conversión, de girar el alma hacia la luz.',
          'El prisionero liberado vuelve para contar lo que vio. Los demás no le creen y, según el relato, podrían castigarlo. Entender cuesta, y explicarlo a quien no quiere ver también.',
        ],
        takeaway: 'Ver la verdad incomoda, y volver a explicarla también.',
      },
      {
        kind: 'concepto',
        title: 'Nuestras sombras de hoy',
        paragraphs: [
          'Hoy las sombras no están en una pared. Están en los feeds, en los titulares que confirman lo que ya crees y en opiniones repetidas sin verificar.',
          'La pregunta de Platón sigue siendo útil: ¿qué creencias tuyas vienen de la experiencia y cuáles de la repetición de otros?',
        ],
        takeaway: 'Una creencia repetida muchas veces no es lo mismo que una creencia comprobada.',
      },
    ],
    quiz: [
      {
        question: 'En el mito de la caverna, ¿qué representa el sol?',
        options: ['El poder del Estado', 'La Idea del Bien o la verdad', 'La religión', 'La vida cotidiana'],
        correctIndex: 1,
        explanation: 'El sol simboliza la Idea del Bien, la verdad que hace visible todo lo demás.',
      },
      {
        question: '¿Por qué el prisionero liberado vuelve a la caverna?',
        options: [
          'Porque olvidó la luz',
          'Para contar lo que vio, aunque no le crean',
          'Porque lo obligan los guardias',
          'Porque se perdió en el exterior',
        ],
        correctIndex: 1,
        explanation: 'Vuelve por compromiso con los demás, aunque sabe que tal vez no le crean.',
      },
    ],
    reflectionPrompt: '¿Qué creencia que tienes hoy aceptaste sin comprobarla? ¿Quién te la transmitió?',
    action: 'Elige una creencia que repites sobre tu trabajo o tu dinero y busca un dato que la confirme o la contradiga.',
    sources: ['Platón, *La República*, libro VII (alrededor de 514a–517a). Cualquier edición de referencia.'],
  },
  {
    id: 'fil-sisifo-camus',
    trackId: 'filosofia',
    order: 2,
    title: 'Sísifo: la dignidad de seguir empujando la piedra',
    hook: 'Su castigo es subir una roca hasta la cima y verla caer una y otra vez. ¿Qué le queda a quien hace eso?',
    cards: [
      {
        kind: 'mito',
        title: 'El castigo de Sísifo',
        paragraphs: [
          'En la mitología griega, Sísifo fue castigado por los dioses. Debía empujar una enorme piedra hasta la cima de una montaña, y cada vez que llegaba arriba, la roca volvía a rodar hasta el valle.',
          'La imagen se volvió símbolo de un trabajo sin fin: tareas repetitivas, metas que se mueven, esfuerzos que parecen no dejar huella.',
        ],
      },
      {
        kind: 'concepto',
        title: 'La conclusión de Camus',
        paragraphs: [
          'En *El mito de Sísifo* (1942), Albert Camus describe el absurdo: la tensión entre nuestra búsqueda de sentido y un mundo que no responde con claridad.',
          'Su respuesta no es rendirse ni buscar una salida fácil. Concluye: «Hay que imaginar a Sísifo feliz». La dignidad está en la lucidez y en la decisión de seguir, sabiendo que la piedra volverá a caer.',
        ],
        takeaway: 'El sentido no siempre está en llegar. A veces está en cómo sostienes el esfuerzo.',
      },
      {
        kind: 'concepto',
        title: 'Aplicado a tu vida',
        paragraphs: [
          'No todo trabajo repetitivo es un castigo. Hay tareas que se vuelven significativas cuando las eliges y sabes para qué las haces.',
          'Pregúntate qué piedra estás empujando y si la elegiste tú.',
        ],
        takeaway: 'Lo que eliges con sentido pesa menos que lo que te impones sin sentido.',
      },
    ],
    quiz: [
      {
        question: '¿Qué concluye Camus sobre Sísifo?',
        options: [
          'Que debe abandonar la piedra',
          'Que hay que imaginarlo feliz',
          'Que los dioses tienen razón',
          'Que la piedra nunca vuelve a caer',
        ],
        correctIndex: 1,
        explanation: 'Camus cierra el ensayo proponiendo imaginar a Sísifo feliz: la dignidad está en la lucidez y en seguir.',
      },
      {
        question: '¿Qué describe el término «absurdo» en Camus?',
        options: [
          'Una tristeza pasajera',
          'La tensión entre la búsqueda de sentido y el silencio del mundo',
          'Una falta de dinero',
          'La idea de que todo es perfecto',
        ],
        correctIndex: 1,
        explanation: 'El absurdo nace del choque entre nuestra necesidad de sentido y un mundo que no responde.',
      },
    ],
    reflectionPrompt: '¿Qué tarea repetitiva haces hoy? ¿La elegiste tú o te la impusieron?',
    action: 'Dedica 10 minutos a esa tarea repetitiva sin pensar en el resultado y anota una cosa que aprendiste.',
    sources: [
      'Camus, A. *El mito de Sísifo* (1942).',
      'Homero, *Odisea*, libro XI (primera mención de Sísifo en la literatura griega).',
    ],
  },
  {
    id: 'fil-epicteto-control',
    trackId: 'filosofia',
    order: 3,
    title: 'Epicteto: lo que depende de ti y lo que no',
    hook: 'Una de las ideas más prácticas del estoicismo empieza con una frase simple: hay cosas que dependen de ti y otras que no.',
    cards: [
      {
        kind: 'concepto',
        title: 'Quién fue Epicteto',
        paragraphs: [
          'Epicteto (aprox. 50–135 d. C.) fue un filósofo estoico que nació esclavizado en Frigia. Después fue liberado y enseñó en Roma y en Nicópolis.',
          'No escribió sus lecciones. Su alumno Arriano las recogió en las *Pláticas* y en el *Enquiridión*, un manual breve de ideas prácticas.',
        ],
      },
      {
        kind: 'concepto',
        title: 'La línea que separa',
        paragraphs: [
          'El *Enquiridión* abre con una distinción: algunas cosas dependen de nosotros, como nuestros juicios, impulsos, deseos y aversiones. Otras no dependen de nosotros, como el cuerpo, la fama, el dinero o la opinión de los demás.',
          'Epicteto sostiene que el sufrimiento aparece cuando confundimos ambas listas y pretendemos controlar lo que no está en nuestras manos.',
        ],
        takeaway: 'Preguntarte qué sí depende de ti es una herramienta práctica para decidir mejor.',
      },
      {
        kind: 'concepto',
        title: 'Llevarlo a la práctica',
        paragraphs: [
          'Antes de reaccionar ante una crítica, un cliente molesto o una mala noticia, pregúntate: ¿esto depende de mí? Si no depende, suelta la preocupación. Si depende, actúa.',
          'No se trata de resignarse. Se trata de invertir la energía donde sí puedes cambiar algo.',
        ],
        takeaway: 'Tu energía es limitada: úsala donde sí puede cambiar el resultado.',
      },
    ],
    quiz: [
      {
        question: 'Según Epicteto, ¿cuál de estas cosas depende de nosotros?',
        options: ['El dinero', 'Nuestros juicios', 'La fama', 'La opinión de otros'],
        correctIndex: 1,
        explanation: 'Los juicios, impulsos, deseos y aversiones dependen de nosotros. El resto no.',
      },
      {
        question: '¿Qué pregunta propone usar antes de reaccionar?',
        options: ['¿Cuánto cuesta?', '¿Esto depende de mí?', '¿Quién tiene la razón?', '¿Cuándo termina?'],
        correctIndex: 1,
        explanation: 'La pregunta separa lo que puedes cambiar de lo que no, y así decides dónde poner la energía.',
      },
    ],
    reflectionPrompt: '¿Qué preocupación de esta semana no depende realmente de ti? ¿Qué parte sí?',
    action: 'Escribe dos columnas, «Depende de mí» y «No depende de mí», sobre una preocupación. Actúa solo sobre la primera.',
    sources: [
      'Epicteto, *Enquiridión*, capítulo 1 (edición de referencia, recopilado por Arriano).',
      'Arriano de Nicomedia, *Pláticas de Epicteto* (*Diatribas*).',
    ],
  },
  {
    id: 'fil-icaro-desmesura',
    trackId: 'filosofia',
    order: 4,
    title: 'Ícaro y la desmesura: cuando la confianza se vuelve ceguera',
    hook: 'Ícaro no cayó solo por ser ambicioso. Cayó por ignorar el límite que su padre le había advertido.',
    cards: [
      {
        kind: 'mito',
        title: 'El vuelo de Ícaro',
        paragraphs: [
          'Dédalo, el ingenioso constructor, huyó de Creta junto a su hijo Ícaro. Hizo alas con plumas y cera, y le advirtió que no volara ni demasiado bajo ni demasiado alto.',
          'Ícaro, emocionado por la libertad, subió hacia el sol. La cera se derritió, las plumas se soltaron y cayó al mar.',
        ],
      },
      {
        kind: 'concepto',
        title: 'Hybris y la sabiduría griega',
        paragraphs: [
          'Los griegos llamaban *hybris* a la desmesura: la confianza que cree no tener límites. En la tragedia, la hybris casi siempre precede a la caída.',
          'En el templo de Delfos se leían máximas que advertían contra ese exceso, como «Conócete a ti mismo» y «Nada en exceso».',
        ],
      },
      {
        kind: 'concepto',
        title: 'Ícaros modernos',
        paragraphs: [
          'Hay empresas que crecen tan rápido que pierden el control de su caja. Hay líderes que dejan de escuchar porque creen tener siempre la razón. Hay personas que se exigen sin descansar.',
          'Preguntar «¿cuál es mi límite?» antes de subir la apuesta es una práctica de sabiduría, no de miedo.',
        ],
        takeaway: 'Crecer sin límites conocidos no es valentía. Es riesgo sin medir.',
      },
    ],
    quiz: [
      {
        question: '¿Qué máxima se asociaba con el templo de Delfos?',
        options: ['Pienso, luego existo', 'Conócete a ti mismo', 'Todo fluye', 'El hombre es la medida de todas las cosas'],
        correctIndex: 1,
        explanation:
          'Las otras tres son de Descartes, Heráclito y Protágoras. Delfos es asociado con «Conócete a ti mismo».',
      },
      {
        question: '¿Qué causó la caída de Ícaro, según el mito?',
        options: ['Una tormenta', 'Volar demasiado cerca del sol', 'Una flecha', 'Perder el rumbo de Creta'],
        correctIndex: 1,
        explanation: 'El calor del sol derritió la cera y las alas se desarmaron.',
      },
    ],
    reflectionPrompt: '¿Dónde estás subiendo la apuesta sin preguntarte cuál es tu límite?',
    action: 'Define hoy un límite concreto (horas, dinero o riesgo) para un proyecto y escríbelo donde lo veas a diario.',
    sources: [
      'Ovidio, *Metamorfosis*, libro VIII (mito de Dédalo e Ícaro).',
      'Plutarco, *Sobre el «E» en Delfos* (sobre las máximas délficas).',
    ],
  },
]
