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
          'La regla 50/30/20 divide tu ingreso neto en tres bloques: 50% para necesidades (renta, comida, transporte, servicios), 30% para deseos (salidas, suscripciones, gustos) y 20% para ahorro o pago extra de deudas.',
          'Se popularizó en la divulgación de finanzas personales de los años 2000. Uno de sus referentes es el libro de Elizabeth Warren y Amelia Warren Tyagi, *All Your Worth* (2005). Es un punto de partida, no una regla universal.',
        ],
        formula: {
          expression: '50% necesidades · 30% deseos · 20% ahorro y deudas',
          example: 'Ejemplo hipotético: con un ingreso neto de $20,000 → $10,000 · $6,000 · $4,000.',
        },
      },
      {
        kind: 'concepto',
        title: 'Si no te alcanza',
        paragraphs: [
          'En algunas ciudades o momentos, las necesidades ocupan más del 50%. Entonces la regla sirve como meta: ajusta un poco cada mes en vez de rendirte.',
          'Revisa dónde se va el 30% de deseos: suscripciones que no usas, comidas fuera de casa o compras impulsivas. Suele ser el lugar más fácil de ajustar.',
        ],
      },
      {
        kind: 'concepto',
        title: 'Págate primero',
        paragraphs: [
          'Una práctica útil es apartar primero el 20%, apenas recibes tu ingreso. Lo que queda es para gastar. Así el ahorro no depende de lo que sobre al final del mes.',
        ],
        takeaway: 'El ahorro que se automatiza se sostiene. El que depende de lo que sobra casi nunca aparece.',
      },
    ],
    quiz: [
      {
        question: 'En la regla 50/30/20, ¿qué porcentaje va a ahorro o pago extra de deudas?',
        options: ['10%', '20%', '30%', '50%'],
        correctIndex: 1,
        explanation: 'El 20% se destina a ahorro o a pagar deudas por encima del mínimo.',
      },
      {
        question: '¿Qué práctica propone «pagarse primero»?',
        options: [
          'Gastar todo y ahorrar lo que sobre',
          'Apartar el ahorro apenas recibes el ingreso',
          'Pagar solo deudas pequeñas',
          'Esperar a fin de año',
        ],
        correctIndex: 1,
        explanation: 'Apartar primero el ahorro hace que no dependa de lo que sobre.',
      },
    ],
    reflectionPrompt: '¿En cuál de los tres bloques (necesidades, deseos o ahorro) se te van más de tus ingresos hoy? ¿Qué lo explica?',
    action: 'Esta semana revisa tus suscripciones y cancela o pausa una que no hayas usado en el último mes.',
    sources: [
      'Warren, E. y Warren Tyagi, A. *All Your Worth: The Ultimate Lifetime Money Plan* (2005).',
    ],
  },
]
