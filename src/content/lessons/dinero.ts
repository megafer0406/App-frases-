import type { Lesson } from '../../domain/types'

export const DINERO_LESSONS: Lesson[] = [
  {
    id: 'din-interes-compuesto',
    trackId: 'dinero',
    order: 1,
    title: 'Interés compuesto: la paciencia que se vuelve matemática',
    hook: 'El dinero que crece sobre el dinero que ya creció es una fuerza silenciosa. Pero necesita tiempo para actuar.',
    cards: [
      {
        kind: 'formula',
        title: 'Cómo funciona',
        paragraphs: [
          'Con interés simple, ganas el mismo porcentaje sobre el capital original. Con interés compuesto, cada periodo ganas también sobre lo que ya ganaste antes.',
          'La fórmula básica es capital × (1 + tasa)^años.',
        ],
        formula: {
          expression: 'Valor final = capital × (1 + tasa anual)^años',
          example: 'Ejemplo hipotético: $1,000 al 10% anual durante 30 años ≈ $17,449, sin aportes adicionales.',
        },
      },
      {
        kind: 'concepto',
        title: 'Lo que hace el tiempo',
        paragraphs: [
          'La mayor diferencia la hace el tiempo, no el monto inicial. Empezar diez años antes puede dejar un resultado muy distinto, aunque aportes menos cada mes.',
          'Es un ejemplo hipotético. Los rendimientos reales varían y pueden ser negativos.',
        ],
        takeaway: 'El tiempo es la variable que no se puede comprar después.',
      },
      {
        kind: 'concepto',
        title: 'El otro lado de la fórmula',
        paragraphs: [
          'El interés compuesto también trabaja en contra cuando debes dinero: las deudas con intereses altos crecen igual de rápido. Antes de invertir, revisa tus deudas más caras.',
        ],
        takeaway: 'Pagar una deuda con interés alto puede ser, en la práctica, una de las mejores decisiones del mes.',
      },
    ],
    quiz: [
      {
        question: 'Si inviertes $1,000 al 10% anual durante 30 años sin aportes, ¿cuál es el resultado aproximado?',
        options: ['$3,000', '$10,000', '$17,400', '$100,000'],
        correctIndex: 2,
        explanation: '1.10 elevado a 30 es aproximadamente 17.45, así que el resultado es cerca de $17,400. Es un ejemplo hipotético.',
      },
      {
        question: '¿Qué hace que el interés compuesto trabaje en tu contra?',
        options: ['Tener ahorros', 'Deudas con intereses altos que se acumulan', 'Comprar en oferta', 'Pagar a tiempo'],
        correctIndex: 1,
        explanation: 'Cuando debes dinero con interés, los intereses también se acumulan sobre intereses.',
      },
    ],
    reflectionPrompt: '¿Qué deuda o gasto con intereses tienes hoy que debería ser tu prioridad antes de invertir?',
    action: 'Esta semana revisa la tasa de interés de tu deuda más cara y calcula cuánto pagas al año por ella.',
    sources: [
      'Fórmula estándar de interés compuesto, en cualquier texto de matemáticas financieras.',
      'Ejemplo educativo e hipotético. No es asesoría financiera personalizada.',
    ],
  },
  {
    id: 'din-fondo-emergencia',
    trackId: 'dinero',
    order: 2,
    title: 'Fondo de emergencia: el colchón que evita decisiones desesperadas',
    hook: 'Muchas crisis financieras personales no empiezan con una mala inversión. Empiezan con un gasto imprevisto sin colchón.',
    cards: [
      {
        kind: 'concepto',
        title: 'Qué es',
        paragraphs: [
          'Un fondo de emergencia es dinero disponible para imprevistos: salud, pérdida de empleo o una reparación urgente. Debe estar en un lugar líquido y accesible, no comprometido en inversiones de largo plazo.',
          'Una recomendación muy difundida en educación financiera es tener entre 3 y 6 meses de gastos esenciales: renta, comida, transporte, servicios y pagos mínimos de deudas.',
        ],
      },
      {
        kind: 'formula',
        title: 'Cómo calcularlo',
        paragraphs: [
          'Suma tus gastos esenciales de un mes típico. Multiplica por 3 como mínimo. Si tu ingreso es variable o tienes personas a tu cargo, considera 6 meses.',
        ],
        formula: {
          expression: 'Fondo mínimo = gastos esenciales mensuales × 3 (ideal: × 6)',
          example: 'Ejemplo hipotético: gastos esenciales de $12,000 al mes → fondo de $36,000 a $72,000.',
        },
      },
      {
        kind: 'concepto',
        title: 'Empieza pequeño',
        paragraphs: [
          'Si el objetivo te paraliza, empieza con una parte. Aparta una cantidad fija cada quincena, aunque sea pequeña. Lo importante es la constancia y que el dinero esté a la mano.',
        ],
        takeaway: 'Un colchón pequeño y constante protege más que un plan perfecto que nunca empieza.',
      },
    ],
    quiz: [
      {
        question: '¿Cuántos meses de gastos esenciales se recomiendan con frecuencia como colchón?',
        options: ['Entre 3 y 6', 'Entre 1 y 2 semanas', '12 meses exactos', 'Ninguno'],
        correctIndex: 0,
        explanation: 'Entre 3 y 6 meses de gastos esenciales es una referencia muy difundida en educación financiera.',
      },
      {
        question: '¿Dónde conviene guardar el fondo de emergencia?',
        options: [
          'En inversiones de muy largo plazo',
          'En un lugar líquido y accesible',
          'En criptomonedas',
          'Prestado a un familiar sin contrato',
        ],
        correctIndex: 1,
        explanation: 'Debe estar disponible de inmediato, sin riesgo de pérdida por el momento de salida.',
      },
    ],
    reflectionPrompt: 'Si perdieras tu ingreso mañana, ¿cuánto tiempo podrías sostener tus gastos esenciales?',
    action: 'Calcula hoy tus gastos esenciales mensuales y define cuánto apartarás la próxima quincena.',
    sources: [
      'Consumer Financial Protection Bureau (CFPB), material educativo sobre ahorro de emergencia.',
    ],
  },
  {
    id: 'din-50-30-20',
    trackId: 'dinero',
    order: 3,
    title: 'La regla 50/30/20: un presupuesto simple que sí se sostiene',
    hook: 'Un presupuesto detallado suele durar una semana. Una regla simple puede durar años.',
    cards: [
      {
        kind: 'formula',
        title: 'La regla',
        paragraphs: [
          'La regla 50/30/20 divide tu ingreso neto en tres bloques: 50% para necesidades (renta, comida, transporte, servicios), 30% para deseos (salidas, gustos, suscripciones) y 20% para ahorro o pago extra de deudas.',
          'Se popularizó con el libro All Your Worth (2005), de Elizabeth Warren y Amelia Warren Tyagi. Es un punto de partida, no una regla universal.',
        ],
        formula: {
          expression: '50% necesidades · 30% deseos · 20% ahorro y deudas',
          example: 'Ejemplo hipotético: con un ingreso neto de $3,000 → $1,500 · $900 · $600.',
        },
      },
      {
        kind: 'concepto',
        title: 'Dónde se va el 30%',
        paragraphs: [
          'Muchas personas descubren que el bloque de deseos está lleno de cobros automáticos. En una encuesta de 2022 en Estados Unidos, la gente calculó en 10 segundos unos US$86 al mes en suscripciones. Al revisarlas una por una, la cifra real fue cercana a US$219.',
          'Revisa tus cobros de los últimos tres meses. Si una suscripción no usaste en 30 días, es candidata a cancelarse o pausarse.',
        ],
        takeaway: 'El bloque de deseos suele esconder el gasto más fácil de recortar: lo que se cobra solo.',
      },
      {
        kind: 'concepto',
        title: 'Págate primero',
        paragraphs: [
          'Aparta tu 20% el mismo día que te paguen, antes de pagar cualquier otra cosa. Si el ahorro depende de lo que sobre al final del mes, depende de la suerte.',
          'Si tu ingreso es variable, aparta un porcentaje de cada pago en vez de una cantidad fija. Lo importante es que el ahorro salga antes que el gasto.',
        ],
        takeaway: 'Lo que se aparta primero no compite con los gastos del mes.',
      },
    ],
    quiz: [
      {
        question: 'Ganas $3,000 netos al mes y tus necesidades suman $1,800. Según la regla 50/30/20, ¿cuánto debería ir a deseos?',
        options: ['$300', '$600', '$900', '$1,500'],
        correctIndex: 2,
        explanation: 'El 30% de $3,000 son $900. Los $600 son el 20% de ahorro, no de deseos.',
      },
      {
        question: 'Si el ahorro no alcanza un mes, ¿qué propone la regla?',
        options: [
          'Dejar de ahorrar hasta tener más ingreso',
          'Usarla como meta y ajustar un poco cada mes',
          'Pedir un préstamo para pagar deseos',
          'Eliminar por completo las necesidades',
        ],
        correctIndex: 1,
        explanation: 'La regla es una meta: se ajusta poco a poco, sin abandonarla.',
      },
    ],
    reflectionPrompt: '¿Cuántas suscripciones pagas hoy que no usaste en el último mes?',
    action: 'Revisa tus cobros automáticos de este mes y cancela o pausa una suscripción que no uses.',
    sources: [
      'Warren, E. y Warren Tyagi, A. (2005), All Your Worth: The Ultimate Lifetime Money Plan.',
      'C+R Research (2022), encuesta sobre gasto en suscripciones, reportada por CNBC el 6 de septiembre de 2022.',
    ],
  },
]
