# Sabiduría Diaria · instrucciones para la IA de tu copia

Plantilla web (React + Vite) de lecciones de 5 minutos: historia, filosofía, liderazgo, negocios, mentalidad, pensamiento y dinero personal. La persona que la compra la personaliza con su marca, sus contenidos y sus servicios, y la vende.

## Qué hace hoy y qué no

- Todo funciona en modo demostración con datos locales. La cuenta, el progreso y el diario se guardan solo en el navegador del dispositivo.
- No hay backend ni base de datos. No cobra, no envía correos, no llama a ninguna IA y no envía analítica en producción.
- Las rutas `/premium`, `/hoy` y las demás se deciden en el navegador: no son una protección real.
- Hoy no hay recordatorios ni avisos: la hora de la lección se guarda, pero no se envía nada.
- Para vender hacen falta: textos legales revisados, precios reales y un correo de soporte tuyo. Ver `docs/CONECTAR.md`.

## Reglas

1. Sigue `docs/CONECTAR.md` con la persona presente, un servicio a la vez y en su orden. Pide confirmación antes de cada paso que cree cuentas, cobre, envíe correos o publique.
2. No prometas en pantalla lo que la app no hace: cobros reales, avisos, recordatorios, garantías, reembolsos o envíos.
3. Claves: nunca en el código, en git ni en `.env.example`. No leas ni escribas `.env.local`; lo crea la persona. Nunca uses el prefijo `VITE_` para una clave secreta, porque Vite la incluye en el código que descarga el navegador.
4. La plantilla no trae base de datos ni migraciones. Si añades una tabla, activa RLS en ella y no concedas permisos al rol `anon`.
5. La marca (nombre, promesa, correo de soporte y responsable) va en `src/config/plantilla.ts`. No la escribas a mano en pantallas: la app la lee de ahí.
6. Un interruptor de `conexiones` pasa a `true` solo cuando esa conexión esté implementada, probada y documentada. Nunca lo cambies para que el verificador pase.
7. `[COMPLETAR: …]` son datos de la persona o datos por confirmar. No los inventes. Los textos legales son borradores: no cites leyes, autoridades ni cifras nuevas.
8. Precios, días de prueba, lecciones gratis y cualquier cifra: no los inventes ni los cambies sin que la persona lo pida. Hoy son precios sugeridos: confirma tu oferta en Hotmart antes de vender.
9. Contenido: cada lección cita sus fuentes. No añadas hechos, cifras, citas ni testimonios sin una fuente verificable. Nada de diagnósticos, consejos médicos ni promesas de resultados.
10. No escribas «MVP», «prototipo» ni «versión de prueba» en la interfaz ni en el catálogo.
11. No cambies `STORAGE_KEY` en `src/config/app.ts` sin avisar: al cambiarla, los datos guardados en los navegadores dejan de leerse.

Escribe en español latino neutro, con tuteo y sin voseo.

## Dónde se personaliza

| Qué | Dónde |
| --- | --- |
| Marca, promesa, correo de soporte, responsable y conexiones | `src/config/plantilla.ts` |
| Precios, días de prueba y lecciones gratis | `src/config/app.ts` |
| Preguntas del quiz y arquetipos | `src/content/funnel.ts` |
| Rutas | `src/content/tracks.ts` |
| Lecciones y fuentes | `src/content/lessons/*.ts` |
| Colores, tipografía y movimiento | `src/styles/index.css` |
| Logo | `src/components/brand/Logo.tsx` |
| Textos legales | `src/features/legal/LegalPages.tsx` |
| Pagos (simulados) | `src/services/billing.ts` |
| Cuenta (local) | `src/services/auth.ts`, `src/store/appStore.ts` |
| Analítica | `src/services/analytics.ts` |
| Imágenes y créditos | `public/img/` y `src/content/credits.ts` |

Ten cuidado con: `LICENSE` (no lo cambies ni quites los avisos de propiedad), `scripts/verificar.mjs` (no lo debilites para que pase) y `vite.config.ts` (tras cambiarlo, reinicia `npm run dev`).

## Stack y comandos

- React 19.3.1, react-router 7.18.4, zustand 5.0.15, motion 14.2.0, lucide-react 1.57.0.
- Vite 8.3.4 con `@vitejs/plugin-react` 6.1.2, Tailwind CSS 4.3.3 (`@tailwindcss/vite`) y TypeScript 5.9.3 en modo estricto.
- Vitest 4.1.11 con Testing Library 16.3.3 y jsdom 29.1.1 para las pruebas (`tests/`).
- Node: el de `.nvmrc`.

Orden de verificación:

1. `npm ci` (instala desde `package-lock.json`).
2. `npm run typecheck`
3. `npm test`
4. `npm run build`
5. `npm run verificar`: lista los marcadores `[COMPLETAR: …]` pendientes y falla si encuentra secretos o datos personales.

Antes de decir que algo está listo, corre los cinco comandos. Revisa las pantallas a 390 px de ancho.

## Seguridad

- Ninguna clave en el cliente, en git ni en `.env.example`.
- Solo las variables con prefijo `VITE_` llegan al navegador. Usa solo claves públicas en ellas.
- Si algo falla, lee el error completo y corrige la causa. No borres ni saltes pruebas para que pasen y no cambies un interruptor a `true` para que el verificador pase.

## Diseño

- Respeta los tokens de `src/styles/index.css`.
- El botón principal mide 56 px de alto (`min-h-14` en `src/components/ui/Button.tsx`). Usa los tamaños de texto que ya existen antes de inventar uno nuevo.
- El foco visible usa el anillo de color `--color-amber`.
- Respeta el movimiento reducido (`MotionConfig reducedMotion="user"` en `src/main.tsx`).
