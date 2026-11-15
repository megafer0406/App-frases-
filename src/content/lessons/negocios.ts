import type { Lesson } from '../../domain/types'

export const NEGOCIOS_LESSONS: Lesson[] = [
  {
    id: 'neg-ceo-cto-coo',
    trackId: 'negocios',
    order: 1,
    title: 'CEO, CTO, COO y CFO: quién hace qué y por qué importa',
    hook: 'Cuando alguien dice «eso lo decide el COO», ¿sabes qué le toca decidir? Confundir los roles hace que las decisiones se atoren.',
    cards: [
      {
        kind: 'concepto',
        title: 'El CEO: la dirección',
        paragraphs: [
          'El CEO (director ejecutivo) define la visión y la estrategia de la empresa. Responde ante el consejo de administración y los accionistas, y decide hacia dónde va el negocio y en qué invierte.',
          'No es quien hace todo. Su trabajo es decidir qué se hace, qué no se hace y quién lo hace.',
        ],
      },
      {
        kind: 'concepto',
        title: 'COO, CTO y CFO: quienes ejecutan',
        paragraphs: [
          'El **COO** (director de operaciones) organiza el día a día: procesos, producción, entregas y eficiencia.',
          'El **CTO** (director de tecnología) lidera la tecnología: arquitectura, innovación técnica y, en muchas empresas, la plataforma digital.',
          'El **CFO** (director financiero) cuida el dinero: presupuesto, reportes financieros, flujo de caja y financiamiento.',
        ],
      },
      {
        kind: 'dato',
        title: 'Cómo se ven en una empresa pequeña',
        paragraphs: [
          'En una empresa de diez personas, una sola persona puede cubrir varios roles. Lo importante es saber qué decisión le corresponde a cada función, aunque la haga la misma persona.',
        ],
        takeaway: 'Nombrar bien el rol evita que una decisión importante quede sin dueño.',
      },
    ],
    quiz: [
      {
        question: '¿Quién suele ser responsable de las operaciones del día a día?',
        options: ['CEO', 'COO', 'CFO', 'CMO'],
        correctIndex: 1,
        explanation: 'El COO organiza procesos y operaciones. El CMO, en cambio, lleva marketing.',
      },
      {
        question: '¿Qué función se encarga principalmente del flujo de caja y del presupuesto?',
        options: ['CTO', 'COO', 'CFO', 'CHRO'],
        correctIndex: 2,
        explanation: 'El CFO administra finanzas, presupuesto y caja.',
      },
    ],
    reflectionPrompt: 'En tu organización o proyecto, ¿quién decide realmente sobre precios, contrataciones y tecnología? ¿Está claro?',
    action: 'Escribe en una línea qué decisión le corresponde a cada persona clave de tu equipo y compártelo esta semana.',
    sources: ['Drucker, P. F. *The Practice of Management* (1954).'],
  },
  {
    id: 'neg-punto-equilibrio',
    trackId: 'negocios',
    order: 2,
    title: 'Punto de equilibrio: cuánto necesitas vender para no perder dinero',
    hook: 'Antes de preguntarte cuánto vas a ganar, responde algo más básico: ¿cuánto tengo que vender para no perder?',
    cards: [
      {
        kind: 'formula',
        title: 'La fórmula',
        paragraphs: [
          'Los **costos fijos** no cambian aunque vendas más: renta, sueldos base, software. Los **costos variables** sí cambian con cada venta: materiales, comisiones, empaques.',
          'El **margen de contribución** por unidad es el precio menos el costo variable: lo que deja cada venta para pagar los costos fijos.',
          'El punto de equilibrio en unidades = costos fijos ÷ margen de contribución.',
        ],
        formula: {
          expression: 'Unidades de equilibrio = costos fijos ÷ (precio − costo variable por unidad)',
          example: 'Costos fijos de $20,000, precio de $80 y costo variable de $40 → 20,000 ÷ 40 = 500 unidades, es decir, $40,000 en ventas.',
        },
        interactive: 'breakeven',
      },
      {
        kind: 'concepto',
        title: 'Por qué importa',
        paragraphs: [
          'Si vendes menos del punto de equilibrio, pierdes dinero aunque tengas clientes. Si lo superas, cada unidad adicional ya deja ganancia.',
          'Si el precio es igual o menor al costo variable, nunca hay equilibrio: cada venta resta. Muchos negocios no ven esa señal hasta que es tarde.',
        ],
        takeaway: 'Un negocio con mucho volumen puede seguir perdiendo si cada venta deja menos de lo que cuesta.',
      },
      {
        kind: 'concepto',
        title: 'Cómo usarlo cada mes',
        paragraphs: [
          'Calcula tu punto de equilibrio una vez al mes con costos reales. Si sube por un aumento de renta o un proveedor más caro, sabrás cuánto más tienes que vender para compensarlo.',
          'También sirve para decidir precios: si subes el precio, baja el número de ventas necesarias. Si bajas el precio para vender más, el equilibrio puede subir más de lo que imaginas.',
        ],
      },
    ],
    quiz: [
      {
        question: 'Costos fijos de $12,000, precio de $60 y costo variable de $20. ¿Cuántas unidades se necesitan para el equilibrio?',
        options: ['200', '300', '400', '600'],
        correctIndex: 1,
        explanation: '12,000 ÷ (60 − 20) = 12,000 ÷ 40 = 300 unidades.',
      },
      {
        question: 'Si el precio de venta es igual al costo variable por unidad, ¿qué ocurre?',
        options: [
          'Se alcanza el equilibrio de inmediato',
          'Nunca hay equilibrio: cada venta no aporta nada a los costos fijos',
          'El negocio gana más',
          'Los costos fijos desaparecen',
        ],
        correctIndex: 1,
        explanation: 'Sin margen de contribución, ninguna venta paga los costos fijos.',
      },
    ],
    reflectionPrompt: '¿Cuánto cuesta mantener abierto tu proyecto o tu negocio cada mes, sin contar ninguna venta?',
    action: 'Calcula hoy tus costos fijos mensuales. Ese es el primer número de tu punto de equilibrio.',
    sources: ['Horngren, C. T. et al. *Contabilidad de costos* (cualquier edición): fórmula estándar del punto de equilibrio.'],
  },
  {
    id: 'neg-seis-metricas',
    trackId: 'negocios',
    order: 3,
    title: 'Las seis métricas que todo líder revisa cada mes',
    hook: 'Un negocio rara vez falla por una sola métrica. Falla cuando no ve a tiempo cómo se mueven varias juntas.',
    cards: [
      {
        kind: 'formula',
        title: 'Ingresos, margen y costo de adquisición',
        paragraphs: [
          '**Ingresos recurrentes (MRR)** en negocios por suscripción, o **ventas mensuales** en los demás: ¿estamos creciendo o estancados?',
          '**Margen bruto** = (ingresos − costo directo de lo vendido) ÷ ingresos: cuánto queda de cada venta antes de gastos generales.',
          '**CAC** (costo de adquisición de clientes) = gasto en ventas y marketing ÷ clientes nuevos: cuánto cuesta conseguir cada cliente.',
        ],
        formula: {
          expression: 'CAC = gasto en ventas y marketing ÷ clientes nuevos',
          example: 'Gasto de $5,000 y 100 clientes nuevos → CAC de $50.',
        },
      },
      {
        kind: 'formula',
        title: 'Valor del cliente, cancelación y caja',
        paragraphs: [
          '**LTV** (valor de vida del cliente) aproxima cuánto deja un cliente durante su relación con la empresa. Una forma simple: ticket promedio × margen bruto ÷ tasa de cancelación mensual.',
          '**Churn** (tasa de cancelación): porcentaje de clientes que se van en un mes. Un churn alto borra cualquier crecimiento.',
          '**Runway** (pista de caja): cuántos meses puedes operar con la caja actual al ritmo de gasto neto.',
        ],
        formula: {
          expression: 'Runway (meses) = caja disponible ÷ gasto neto mensual',
          example: 'Caja de $60,000 y gasto neto de $10,000 al mes → 6 meses.',
        },
      },
      {
        kind: 'concepto',
        title: 'Revísalas juntas',
        paragraphs: [
          'Una métrica sola puede engañar. Un CAC bajo con churn alto significa que consigues clientes que se van rápido. Un runway largo con margen negativo puede significar que solo estás posponiendo el problema.',
          'Revisa estas seis cada mes con la misma definición. Lo que cambia la conversación es la tendencia, no un número aislado.',
        ],
        takeaway: 'La tendencia de tres meses dice más que el dato de un solo mes.',
      },
    ],
    quiz: [
      {
        question: '¿Qué indica el runway de un negocio?',
        options: [
          'Cuántos clientes tiene',
          'Cuántos meses puede operar con la caja disponible al ritmo de gasto actual',
          'El precio de su producto',
          'Su margen bruto',
        ],
        correctIndex: 1,
        explanation: 'El runway responde cuánto tiempo sobrevive la empresa con su caja actual.',
      },
      {
        question: '¿Qué mide el CAC?',
        options: [
          'Cuánto cuesta conseguir un cliente nuevo',
          'Cuántos clientes se van al mes',
          'Cuánto dinero hay en caja',
          'El margen de cada venta',
        ],
        correctIndex: 0,
        explanation: 'CAC significa costo de adquisición de clientes.',
      },
    ],
    reflectionPrompt: '¿Cuál de estas seis métricas revisas hoy? ¿Cuál ni siquiera conoces?',
    action: 'Escribe las seis métricas en una hoja y anota el valor de cada una del último mes. Si alguna no tiene número, márcala.',
    sources: [
      'Definiciones estándar de métricas financieras y de crecimiento (MRR, CAC, LTV, churn y runway), en guías de finanzas para pymes y startups.',
    ],
  },
  {
    id: 'neg-caja-rentabilidad',
    trackId: 'negocios',
    order: 4,
    title: 'Rentable no es lo mismo que solvente: la trampa del flujo de caja',
    hook: 'Puedes vender mucho, tener utilidad en el papel y aun así quedarte sin dinero para pagar la nómina.',
    cards: [
      {
        kind: 'concepto',
        title: 'Utilidad y caja no son lo mismo',
        paragraphs: [
          'La utilidad es lo que queda después de restar gastos a los ingresos, según la contabilidad. El flujo de caja es el dinero que entra y sale de verdad, en el momento en que pasa.',
          'Una venta a crédito a 90 días cuenta como ingreso hoy, pero el dinero llega dentro de tres meses. Mientras tanto, la nómina y los proveedores se pagan con la caja que tienes.',
        ],
      },
      {
        kind: 'historia',
        title: 'Un ejemplo sencillo',
        paragraphs: [
          'Una empresa vende $100,000 en el mes con cobro a 90 días. Su utilidad es positiva. Pero debe pagar $70,000 en nómina y proveedores dentro de 30 días. Aunque el negocio sea rentable, tiene un hueco de caja de varios meses.',
          'Por eso muchas empresas rentables quiebran: se quedan sin liquidez en el momento equivocado.',
        ],
        takeaway: 'La pregunta no es solo «¿gano dinero?», sino «¿tengo dinero cuando lo necesito?».',
      },
      {
        kind: 'concepto',
        title: 'Qué revisar',
        paragraphs: [
          'Revisa cada semana tu saldo de caja, las fechas de cobro de tus clientes y las fechas de pago de tus gastos.',
          'Si tu caja no alcanza para los próximos 60 días, es momento de negociar plazos, pedir anticipos o reducir gastos antes de que sea urgente.',
        ],
      },
    ],
    quiz: [
      {
        question: '¿Por qué una empresa rentable puede quebrar?',
        options: [
          'Porque no tiene clientes',
          'Porque no tiene caja cuando debe pagar sus gastos',
          'Porque cobra demasiado barato',
          'Porque siempre tiene utilidad negativa',
        ],
        correctIndex: 1,
        explanation: 'La liquidez falla cuando el dinero no llega a tiempo, aunque el negocio sea rentable.',
      },
      {
        question: '¿Qué diferencia hay entre utilidad y flujo de caja?',
        options: [
          'Son lo mismo',
          'La utilidad es contable; el flujo de caja es el dinero que entra y sale en el momento',
          'El flujo de caja incluye solo impuestos',
          'La utilidad siempre es mayor que la caja',
        ],
        correctIndex: 1,
        explanation: 'La utilidad es una medida contable. El flujo de caja refleja el dinero real disponible.',
      },
    ],
    reflectionPrompt: '¿Cuándo fue la última vez que revisaste tu saldo de caja antes de tomar una decisión de gasto?',
    action: 'Hoy revisa el saldo de tu cuenta y las fechas de tus próximos tres pagos importantes.',
    sources: ['Ross, S. A., Westerfield, R. W. y Jordan, B. D. *Fundamentos de finanzas corporativas* (cualquier edición): capítulos sobre flujo de caja y liquidez.'],
  },
]
