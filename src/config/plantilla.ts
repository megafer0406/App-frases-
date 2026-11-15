/**
 * PUNTO ÚNICO DE PERSONALIZACIÓN DE LA PLANTILLA.
 *
 * Nombre, promesa, correo de soporte, responsable de los textos legales y servicios conectados viven aquí.
 * Ninguna pantalla escribe la marca a mano: la lee de este archivo. El index.html y el manifiesto también
 * (ver vite.config.ts). Cómo conectar cada servicio: docs/CONECTAR.md.
 */

/** Servicios reales conectados. Forma fija: `npm run verificar` la revisa. */
export interface Conexiones {
  cuentas: boolean
  cobros: boolean
  correo: boolean
}

export const plantilla = {
  /** Nombre visible de la app. Es también el nombre del catálogo. */
  nombre: 'Sabiduría Diaria',
  /** Promesa en una línea: se usa en la descripción de la página y del manifiesto. */
  tagline: '5 minutos al día para pensar mejor, liderar con criterio y entender el mundo.',
  /** Correo de soporte de ejemplo. Cámbialo por uno tuyo antes de publicar. */
  contactoEmail: 'correo@correo.com',
  /** Responsable de los textos legales. Si vendes con otra razón social, cámbiala aquí. */
  responsable: 'MILLION BUSINESS DIGITAL',
  /**
   * Garantía de reembolso: 7 días en todas las apps. El cobro y el reembolso van por Hotmart (ver docs/CONECTAR.md).
   * Cada mención visible dice «Garantía de 7 días» (lib/garantia.ts). null = sin garantía: no se muestra ninguna mención.
   */
  garantiaDias: 7 as number | null,
  /**
   * Servicios reales conectados. Todo en false = modo demostración: no cobra, no crea cuentas en la nube
   * y no envía correos. Pon un valor en true solo cuando esté implementado, probado y documentado en docs/CONECTAR.md.
   */
  conexiones: { cuentas: false, cobros: false, correo: false } as Conexiones,
} as const

/** Atajo al bloque `conexiones`, con tipos booleanos para que la interfaz pueda decidir qué mostrar. */
export const conexiones: Conexiones = plantilla.conexiones
