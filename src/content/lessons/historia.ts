import type { Lesson } from '../../domain/types'

export const HISTORIA_LESSONS: Lesson[] = [
  {
    id: 'hist-caida-roma',
    trackId: 'historia',
    order: 1,
    title: 'La caída de Roma: por qué los imperios no se derrumban de golpe',
    hook: 'En el año 476 cayó el último emperador de Occidente. Pero Roma llevaba décadas perdiendo piezas sin que nadie lo notara del todo.',
    cards: [
      {
        kind: 'historia',
        title: 'Una fecha que se volvió símbolo',
        paragraphs: [
          'En 476 d. C., el jefe militar Odoacro depuso a Rómulo Augústulo, el último emperador romano de Occidente. Muchos historiadores usan esa fecha como símbolo del fin de Roma en Occidente.',
          'Pero nadie se despertó ese día sabiendo que el mundo había cambiado. Para quienes lo vivieron, el cambio fue gradual: impuestos más altos, guerras constantes, ciudades que se vaciaban.',
        ],
        takeaway: 'Los colapsos grandes suelen ser procesos largos, no un único golpe.',
      },
      {
        kind: 'concepto',
        title: 'Las grietas que se acumularon',
        paragraphs: [
          'Los historiadores debaten las causas. Entre las más citadas están la devaluación de la moneda, la presión de pueblos en las fronteras, la dependencia de ejércitos de mercenarios y las luchas internas por el poder.',
          'Edward Gibbon, en su *Historia de la decadencia y caída del Imperio romano* (1776–1788), ya describía el declive como una suma de decisiones y circunstancias, no como un error único.',
        ],
        takeaway: 'Una organización se desgasta cuando muchas señales pequeñas se ignoran a la vez.',
      },
      {
        kind: 'dato',
        title: 'El Imperio que sobrevivió en Oriente',
        paragraphs: [
          'La mitad oriental del Imperio siguió en pie casi mil años más, con capital en Constantinopla. Cayó en 1453, cuando los otomanos tomaron la ciudad.',
        ],
      },
    ],
    quiz: [
      {
        question: '¿Qué fecha se usa como símbolo de la caída del Imperio romano de Occidente?',
        options: ['410 d. C.', '476 d. C.', '1453 d. C.', '1789 d. C.'],
        correctIndex: 1,
        explanation:
          'En 476, Odoacro depuso a Rómulo Augústulo. Es una fecha simbólica: la caída fue un proceso de décadas.',
      },
      {
        question: '¿Qué ciudad cayó en 1453 y marcó el fin del Imperio romano de Oriente?',
        options: ['Roma', 'Atenas', 'Constantinopla', 'Cartago'],
        correctIndex: 2,
        explanation: 'Constantinopla cayó ante los otomanos en 1453.',
      },
    ],
    reflectionPrompt:
      '¿Qué señales pequeñas estás ignorando hoy en tu vida o en tu trabajo que podrían volverse grandes?',
    action: 'Esta semana revisa una señal pequeña que has ignorado (una deuda, una conversación, un hábito) y decide qué harás con ella.',
    sources: [
      'Gibbon, E. *Historia de la decadencia y caída del Imperio romano* (1776–1788).',
      'Heather, P. *The Fall of the Roman Empire: A New History of Rome and the Barbarians* (2005).',
    ],
  },
  {
    id: 'hist-revolucion-francesa',
    trackId: 'historia',
    order: 2,
    title: '1789: la Revolución francesa y la idea que no se pudo detener',
    hook: 'Una multitud tomó una prisión casi vacía. Lo que se encendió ese día cambió la forma de pensar la política.',
    cards: [
      {
        kind: 'historia',
        title: 'La Bastilla y el 14 de julio',
        paragraphs: [
          'El 14 de julio de 1789, parisinos armados tomaron la fortaleza-prisión de la Bastilla. Tenía pocos presos, pero era un símbolo del poder absoluto de la monarquía.',
          'Ese día se volvió la fiesta nacional de Francia y un recordatorio de que la presión popular podía cambiar el rumbo de un país.',
        ],
      },
      {
        kind: 'concepto',
        title: 'Las ideas: derechos y soberanía',
        paragraphs: [
          'En agosto de 1789, la Asamblea Nacional aprobó la *Declaración de los Derechos del Hombre y del Ciudadano*. Sus ideas centrales eran la libertad, la igualdad ante la ley y la soberanía de la nación, no de un monarca.',
          'Esas ideas se difundieron por Europa y América. Inspiraron constituciones, movimientos de independencia y debates que siguen vigentes.',
        ],
        takeaway: 'Las ideas pueden sobrevivir a los regímenes que las provocaron.',
      },
      {
        kind: 'mito',
        title: 'El precio de una causa sin límites',
        paragraphs: [
          'Entre 1793 y 1794, el periodo conocido como el Terror dejó miles de ejecuciones. Robespierre, una de sus figuras principales, fue arrestado y ejecutado en julio de 1794.',
        ],
        takeaway: 'Cuando el poder se justifica con una causa absoluta, el costo humano puede crecer sin freno.',
      },
    ],
    quiz: [
      {
        question: '¿Qué ocurrió el 14 de julio de 1789?',
        options: [
          'Se firmó la Constitución de Estados Unidos',
          'Se tomó la prisión de la Bastilla en París',
          'Napoleón fue coronado emperador',
          'Se disolvió la Asamblea Nacional',
        ],
        correctIndex: 1,
        explanation:
          'La Bastilla simbolizaba el poder de la monarquía. Su toma marcó el inicio de la revolución en París.',
      },
      {
        question: '¿Qué documento de 1789 defendió la soberanía de la nación y los derechos individuales?',
        options: [
          'La Carta Magna',
          'La Declaración de los Derechos del Hombre y del Ciudadano',
          'El Manifiesto Comunista',
          'El Tratado de Versalles',
        ],
        correctIndex: 1,
        explanation:
          'Fue aprobada por la Asamblea Nacional en agosto de 1789. Las otras opciones son de otras épocas.',
      },
    ],
    reflectionPrompt:
      '¿Qué idea defiendes con tanta fuerza que dejarías de escuchar a quien piensa distinto?',
    action: 'Esta semana escucha una opinión contraria a la tuya sobre un tema de tu trabajo y resume su mejor argumento en tres frases.',
    sources: [
      'Declaración de los Derechos del Hombre y del Ciudadano (26 de agosto de 1789).',
      'Schama, S. *Citizens: A Chronicle of the French Revolution* (1989).',
    ],
  },
  {
    id: 'hist-guerras-mundiales',
    trackId: 'historia',
    order: 3,
    title: '1914 y 1939: dos guerras, una sola historia',
    hook: 'La Primera Guerra Mundial terminó en 1918, pero muchos historiadores creen que sus consecuencias ayudaron a provocar la Segunda.',
    cards: [
      {
        kind: 'historia',
        title: '1914: un detonante y una red de alianzas',
        paragraphs: [
          'El 28 de junio de 1914, el archiduque Francisco Fernando, heredero del Imperio austrohúngaro, fue asesinado en Sarajevo. Ese atentado fue el detonante de una guerra que se extendió por Europa en semanas.',
          'Las alianzas militares convirtieron un conflicto regional en una guerra mundial. Duró hasta 1918 y dejó millones de muertos.',
        ],
      },
      {
        kind: 'concepto',
        title: 'La paz que dejó rencor',
        paragraphs: [
          'El Tratado de Versalles (1919) culpó a Alemania de la guerra y le impuso reparaciones económicas muy altas. Para muchos alemanes fue una humillación.',
          'John Maynard Keynes, que criticó el tratado en *Las consecuencias económicas de la paz* (1919), advirtió que un castigo excesivo podía generar inestabilidad.',
        ],
        takeaway: 'Una paz mal construida puede convertirse en la semilla de la siguiente guerra.',
      },
      {
        kind: 'concepto',
        title: '1939: crisis económica, nacionalismo y una invasión',
        paragraphs: [
          'La Gran Depresión de 1929 golpeó a economías enteras. En Alemania, el desempleo y el resentimiento facilitaron el ascenso del nazismo, que llegó al poder en 1933.',
          'El 1 de septiembre de 1939, Alemania invadió Polonia. Dos días después, Francia y Reino Unido le declararon la guerra. El conflicto duró hasta 1945 y fue el más letal de la historia.',
        ],
      },
    ],
    quiz: [
      {
        question: '¿Qué suceso se considera el detonante de la Primera Guerra Mundial?',
        options: [
          'La firma del Tratado de Versalles',
          'El asesinato de Francisco Fernando en Sarajevo',
          'La Gran Depresión de 1929',
          'La invasión a Polonia',
        ],
        correctIndex: 1,
        explanation: 'El asesinato ocurrió en junio de 1914. Las demás opciones son posteriores o de otros temas.',
      },
      {
        question: '¿Qué tratado culpó a Alemania de la guerra y le impuso reparaciones?',
        options: [
          'Tratado de Tordesillas',
          'Tratado de Versalles',
          'Paz de Westfalia',
          'Tratado de Roma',
        ],
        correctIndex: 1,
        explanation:
          'Versalles (1919) impuso ese castigo. Tordesillas (1494) dividió tierras entre Portugal y España; Westfalia (1648) cerró guerras europeas; el de Roma (1957) fundó la antecesora de la Unión Europea.',
      },
    ],
    reflectionPrompt:
      '¿Qué decisión de hoy podría convertirse en un conflicto dentro de cinco años si la tomas sin pensar en sus consecuencias?',
    action: 'Antes de tomar una decisión importante esta semana, escribe qué consecuencia de largo plazo podría tener.',
    sources: [
      'Clark, C. *The Sleepwalkers: How Europe Went to War in 1914* (2012).',
      'Keynes, J. M. *The Economic Consequences of the Peace* (1919).',
      'Tratado de Versalles (1919).',
    ],
  },
  {
    id: 'hist-crisis-misiles',
    trackId: 'historia',
    order: 4,
    title: '1962: los 13 días en que el mundo estuvo al borde',
    hook: 'Durante 13 días, el margen de error fue mínimo. Esta crisis cambió la forma en que las grandes potencias se hablaban.',
    cards: [
      {
        kind: 'historia',
        title: 'Misiles a unos 150 kilómetros de Florida',
        paragraphs: [
          'La Guerra Fría fue la rivalidad entre Estados Unidos y la Unión Soviética, de 1947 a 1991. No hubo combate directo entre ellas, pero sí una carrera armamentista constante.',
          'En octubre de 1962, aviones espía estadounidenses detectaron misiles nucleares soviéticos en Cuba, a unos 150 kilómetros de la costa de Florida.',
        ],
      },
      {
        kind: 'concepto',
        title: 'Cómo se negocia con miedo',
        paragraphs: [
          'El presidente John F. Kennedy optó por un bloqueo naval en lugar de un ataque inmediato. Durante días, ambas partes se comunicaron por canales diplomáticos, mensajes públicos y negociaciones secretas.',
          'La Unión Soviética retiró los misiles. Estados Unidos se comprometió a no invadir Cuba y, en secreto, retiró misiles de Turquía. Después se instaló una línea directa entre Washington y Moscú, el llamado «teléfono rojo».',
        ],
        takeaway: 'En las crisis, los canales de comunicación valen más que el orgullo.',
      },
      {
        kind: 'dato',
        title: 'Un error casi basta',
        paragraphs: [
          'Años después se supo que hubo momentos en los que un malentendido pudo desencadenar un enfrentamiento. Por ejemplo, un submarino soviético con torpedos nucleares estuvo a punto de disparar; un oficial de la flota se opuso y el ataque no ocurrió.',
        ],
      },
    ],
    quiz: [
      {
        question: '¿Cuánto duró aproximadamente la crisis de los misiles de Cuba?',
        options: ['3 días', '13 días', '3 meses', '3 años'],
        correctIndex: 1,
        explanation: 'La crisis duró unos 13 días, aproximadamente del 16 al 28 de octubre de 1962.',
      },
      {
        question: '¿Qué decisión tomó Kennedy al inicio de la crisis?',
        options: [
          'Invadir Cuba de inmediato',
          'Imponer un bloqueo naval',
          'Retirar todas las tropas de Europa',
          'Pedir a la ONU que destituyera a Cuba',
        ],
        correctIndex: 1,
        explanation: 'Optó por un bloqueo naval para presionar sin lanzar un ataque inmediato.',
      },
    ],
    reflectionPrompt:
      'En tu último conflicto importante, ¿hablaste directamente con la otra persona o esperaste a que el silencio resolviera el problema?',
    action: 'Hoy escribe o llama a alguien con quien tienes una diferencia pendiente y di: «Quiero entender tu punto de vista».',
    sources: [
      'Kennedy, R. F. *Thirteen Days: A Memoir of the Cuban Missile Crisis* (1969).',
      'Office of the Historian, Departamento de Estado de EE. UU., relatos sobre la crisis de los misiles de Cuba (history.state.gov).',
    ],
  },
  {
    id: 'hist-independencias-1810',
    trackId: 'historia',
    order: 5,
    title: '1810: el Grito de Dolores y el inicio de las independencias',
    hook: 'Un grito en un pueblo de Guanajuato inició una cadena de luchas que cambió el mapa de América. Pocas personas conocen lo que vino después.',
    cards: [
      {
        kind: 'historia',
        title: 'Dolores, 16 de septiembre de 1810',
        paragraphs: [
          'En la madrugada del 16 de septiembre de 1810, el cura Miguel Hidalgo llamó a la población de Dolores, en el actual estado de Guanajuato, a levantarse contra el dominio español. Ese llamado se conoce como el Grito de Dolores.',
          'Hidalgo no logró una independencia inmediata. Fue capturado y ejecutado en 1811, pero la lucha continuó con José María Morelos y otros líderes.',
        ],
      },
      {
        kind: 'concepto',
        title: 'Once años de guerra y una alianza inesperada',
        paragraphs: [
          'La independencia de México se consumó en 1821, después de once años de guerra. El giro llegó con Agustín de Iturbide, que había combatido a los insurgentes, y Vicente Guerrero, que había luchado contra él: en 1821 pactaron el Plan de Iguala.',
          'El Ejército Trigarante entró a la Ciudad de México el 27 de septiembre de 1821.',
        ],
        takeaway: 'Los procesos históricos avanzan por alianzas que nadie esperaba.',
      },
      {
        kind: 'dato',
        title: 'Fronteras que nacieron de decisiones administrativas',
        paragraphs: [
          'Las independencias de Hispanoamérica dieron lugar a decenas de países. Sus límites se definieron, en buena medida, con las antiguas divisiones administrativas coloniales. Ese legado se nota todavía en mapas y en tensiones regionales.',
        ],
        takeaway: 'Muchas fronteras de hoy nacieron de decisiones administrativas de hace siglos.',
      },
    ],
    quiz: [
      {
        question: '¿En qué fecha se recuerda el Grito de Dolores?',
        options: [
          '16 de septiembre de 1810',
          '27 de septiembre de 1821',
          '20 de noviembre de 1910',
          '5 de mayo de 1862',
        ],
        correctIndex: 0,
        explanation:
          'El 27 de septiembre de 1821 entró el Ejército Trigarante a la capital. El 20 de noviembre de 1910 inició la Revolución mexicana. El 5 de mayo de 1862 fue la batalla de Puebla.',
      },
      {
        question: '¿Qué plan unió a Iturbide y Guerrero en 1821?',
        options: ['Plan de San Luis', 'Plan de Iguala', 'Plan de Ayala', 'Plan de Guadalupe'],
        correctIndex: 1,
        explanation:
          'El Plan de Iguala (1821) sentó las bases para la independencia. Los otros planes son de la Revolución mexicana.',
      },
    ],
    reflectionPrompt:
      '¿Qué causa te gustaría defender hoy, aunque sea pequeña, y cuál sería el primer paso?',
    action: 'Esta semana pregunta a alguien mayor de tu familia qué historia de tu país o de tu ciudad le contaron de niño y anótala.',
    sources: [
      'Archivo General de la Nación (México), documentos sobre la Independencia.',
      'Villoro, L. *El proceso ideológico de la revolución de independencia* (1953).',
    ],
  },
]
