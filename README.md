# Sabiduría Diaria · plantilla

5 minutos al día para pensar mejor, liderar con criterio y entender el mundo.

App web instalable (PWA) con 26 lecciones de 5 minutos en 7 rutas: historia, filosofía, liderazgo, negocios, mentalidad, pensamiento y dinero personal. Cada lección trae tarjetas, preguntas, una reflexión y una acción para el día. React 19 · TypeScript · Vite 8 · Tailwind 4 · Motion · zustand · react-router · Vitest.

**No hay ningún servicio real conectado** (ni base de datos, ni cobros, ni correo, ni IA): todo se guarda en el dispositivo. Los puntos de conexión en `src/services/` tienen una implementación local o simulada. El cobro y el reembolso de la plantilla son de Hotmart; la app todavía no se conecta con Hotmart (ver [docs/CONECTAR.md](docs/CONECTAR.md)).

## Cliente ideal y momento «ajá»

- **Cliente ideal:** adultos que leen o escuchan cada día, pero al final de la semana casi no recuerdan nada, y quieren fortalecer una ruta (liderazgo, negocios, dinero…) en cinco minutos al día.
- **Momento «ajá»:** cuando ven su arquetipo en el resultado del quiz y, al terminar su primera lección, responden una pregunta que los hace pensar.

## Pantallas

Bienvenida (`/`) → quiz (`/quiz`) → análisis (`/analisis`) → resultado (`/resultado`) → registro (`/registro`) → onboarding (`/onboarding`) → primera lección (`/leccion/:id`) → plan (`/premium`) → Hoy (`/hoy`), Rutas (`/rutas`), Diario (`/diario`) y Perfil (`/perfil`). Textos legales: `/legal/privacidad` y `/legal/terminos`.

## Comandos

```bash
npm install
npm run dev          # http://localhost:5173
npm run typecheck    # TypeScript estricto
npm test             # pruebas de dominio, contenido, insignias y estado (Vitest)
npm run build        # typecheck + build de producción
npm run verificar    # lista los [COMPLETAR] pendientes y falla si hay secretos o datos personales
```

Versión de Node: la de `.nvmrc`. No necesita variables de entorno (ver `.env.example`).

## Qué personalizar

| Qué | Dónde |
| --- | --- |
| Marca, promesa, correo de soporte, responsable y servicios conectados | `src/config/plantilla.ts` |
| Precios, días de prueba y lecciones gratis | `src/config/app.ts` |
| Preguntas del quiz y arquetipos | `src/content/funnel.ts` |
| Rutas | `src/content/tracks.ts` |
| Lecciones y fuentes | `src/content/lessons/*.ts` |
| Colores, tipografía y movimiento | `src/styles/index.css` |
| Logo | `src/components/brand/Logo.tsx` |
| Textos legales | `src/features/legal/LegalPages.tsx` |
| Pagos (simulados; el cobro real es Hotmart) | `src/services/billing.ts` |
| Cuenta (local) | `src/services/auth.ts` y `src/store/appStore.ts` |
| Imágenes y créditos | `public/img/` y `src/content/credits.ts` |

## Datos de ejemplo que debes cambiar

- **Correo de soporte:** `correo@correo.com` es solo un ejemplo. Cámbialo en `src/config/plantilla.ts`.
- **Precios y días de prueba:** son precios sugeridos en USD (`src/config/app.ts`): 3.99 al mes y 39.90 al año (precio de lanzamiento de Pensadía), que equivale a dos meses gratis, con una prueba de 7 días en los dos planes. Precios sugeridos: confirma tu oferta en Hotmart antes de vender. El paywall los muestra como demostración mientras no haya cobro.
- **Garantía:** `garantiaDias` (`src/config/plantilla.ts`) está en 7. Cada mención dice «Garantía de 7 días», y la frase sale de un único sitio (`src/lib/garantia.ts`). Si cambias el número, cambia en todas. El texto de reembolsos (`src/features/legal/LegalPages.tsx`) dice que la solicitud dentro de ese plazo se gestiona con Hotmart.
- **Responsable:** la razón social por defecto es MILLION BUSINESS DIGITAL (`src/config/plantilla.ts`). Si vendes con otra, cámbiala. Completa los `[COMPLETAR: …]` de `src/features/legal/LegalPages.tsx` (identificador fiscal, domicilio y ley aplicable) y revisa los textos con asesoría de tu país.
- **Contenido:** las lecciones citan sus fuentes. Revísalas antes de publicar.

## Cobro, garantía y medición

- **Cobro y reembolso:** Hotmart. La compra, el cobro y la solicitud de reembolso dentro de la garantía de 7 días se gestionan allí. La plantilla no tiene pasarela propia ni un proceso de reembolso distinto.
- **Frases de cancelación:** la app no promete «cancelar en dos toques». Su botón de cancelar solo cambia el acceso en el dispositivo; el cobro se cancela en Hotmart. Si cambias el modelo de cobro, revisa esas frases (`tests/copy.test.ts` vigila las que ya quitamos).
- **Medición sin scripts de terceros:** cada CTA de la portada tiene un `id` estable y un `data-evento`, y el CTA de compra del paywall marca el inicio de compra. Cómo conectar el píxel de Meta con `ViewContent` e `InitiateCheckout` está en [docs/CONECTAR.md](docs/CONECTAR.md), sección «Medir con el píxel de Meta».

## Conectar tus servicios

La guía paso a paso está en [docs/CONECTAR.md](docs/CONECTAR.md): cuentas, cobros y correo, en ese orden. Mientras no conectes nada, la app funciona en modo demostración. Las instrucciones para la IA de tu copia están en [AGENTS.md](AGENTS.md).

## Límites

- La cuenta y el progreso viven en el navegador: si borras los datos del navegador, se pierden.
- Los pagos son simulados: no se cobra nada. Hotmart cobra y reembolsa, pero la app todavía no lo confirma.
- La hora de la lección se guarda, pero todavía no se envían avisos.

## Licencia

Uso comercial según [LICENSE](LICENSE): LICENCIA DE USO COMERCIAL v1.0, titular MILLION BUSINESS DIGITAL.
