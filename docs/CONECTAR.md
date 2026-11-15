# Conectar tus servicios

Esta guía explica qué conectaría la persona que compra la plantilla, en qué orden y dónde se conecta cada cosa.
Conecta **uno a la vez** y verifica cada paso antes de seguir.

## Qué hay hoy

| Parte | Estado | Dónde |
| --- | --- | --- |
| Cuenta | Local. El email y la contraseña (como hash) se guardan en el navegador del dispositivo. | `src/services/auth.ts`, `src/store/appStore.ts` |
| Cobros | Simulados. Elegir un plan solo lo activa en el dispositivo; no se cobra nada. El cobro y el reembolso de la plantilla son de Hotmart, y la app todavía no se conecta con Hotmart. | `src/services/billing.ts` |
| Correo | No hay. | — |
| IA | No hay. | — |
| Analítica | En desarrollo imprime en la consola; en producción no envía datos. | `src/services/analytics.ts` |
| Base de datos | No hay. El borrador de esquema que existía se retiró del repositorio y la app no lo necesita para funcionar. | — |

La app no tiene ningún servidor propio. Por eso no hay secretos que proteger en el navegador.

## Qué dice la configuración

En `src/config/plantilla.ts` está el bloque que indica qué servicio real está conectado:

```ts
conexiones: { cuentas: false, cobros: false, correo: false } as Conexiones,
```

- `cuentas`: pasa a `true` cuando las cuentas en la nube estén implementadas y probadas con dos cuentas. Cambia el texto del registro y la política de privacidad.
- `cobros`: pasa a `true` cuando el acceso dependa de una compra confirmada en Hotmart y la cancelación se refleje en la app. Quita la nota de demostración del paywall («Precios de demostración», «Demostración · sin cobro») y de los términos.
- `correo`: pasa a `true` solo cuando envíes correos reales desde el servidor.

Nunca pongas un valor en `true` sin haber implementado, probado y documentado esa conexión aquí.

## Orden recomendado

1. **Publicar la versión estática.** `npm run build` genera la carpeta `dist/`, que cualquier hosting estático puede servir (por ejemplo Vercel o Netlify). Después de publicar, vuelve a probar el recorrido completo en un teléfono.

2. **Cuentas en la nube (opcional, recomendado).** Hoy la cuenta vive en el navegador: si se borran los datos del navegador, se pierde. Para tenerlas en la nube:
   - Crea un proyecto de base de datos y de autenticación (por ejemplo Supabase).
   - Diseña las tablas de perfil, progreso y reflexiones. Activa RLS en cada tabla y no concedas permisos al rol `anon`.
   - Implementa `src/services/auth.ts` y sincroniza `src/store/appStore.ts`.
   - Prueba con dos cuentas que una no ve los datos de la otra. Después pon `cuentas: true`.
   - Si usas Supabase, la clave pública (anon) puede ir en `.env.local` con prefijo `VITE_`. La clave `service_role` nunca va al navegador.

3. **Cobros con Hotmart (imprescindible para vender).** Hotmart cobra y reembolsa. Crea allí el producto, el precio (pago único o suscripción) y la prueba si la ofreces.
   - En `src/services/billing.ts`, sustituye `startTrialCheckout` por el enlace de compra de tu producto en Hotmart. El botón de compra del paywall ya tiene `id="cta-premium-prueba"` y `data-evento="inicio-compra"`.
   - Para dar acceso según la compra, la app necesita confirmar en un servidor las compras y cancelaciones que Hotmart te avise (con su webhook). Sin ese servidor, el acceso no se puede confirmar de forma segura, y la app no lo hace hoy.
   - Garantía: `garantiaDias` está en 7 (`src/config/plantilla.ts`). Cada mención dice «Garantía de 7 días». La solicitud dentro de ese plazo se gestiona con Hotmart; no añadas otro proceso de reembolso.
   - Cancelación: el cobro se cancela en Hotmart. El botón «Cancelar suscripción» de la app solo cambia el acceso en el dispositivo hasta que la confirmación de Hotmart esté conectada. Por eso la app no dice «cancelas en dos toques».
   - Precios sugeridos: confirma tu oferta en Hotmart antes de vender. Pensadía sale con 3.99 USD al mes y 39.90 USD al año (dos meses gratis, precio de lanzamiento) en `src/config/app.ts`, con una prueba de 7 días en los dos planes. Cámbialos por los de tu oferta en Hotmart y quita la marca de demostración de la pantalla cuando el cobro esté activo.

4. **Correo (opcional).** Enviar correos exige una función de servidor (por ejemplo, de Vercel o de Supabase). La clave del proveedor de correo nunca va en el navegador. Usa un remitente verificado.

5. **Textos legales.** Completa los `[COMPLETAR: …]` de `src/features/legal/LegalPages.tsx` y revisa los textos con asesoría de tu país.

## Medir con el píxel de Meta

La plantilla no carga ningún script de Meta ni de terceros. Para medir tus campañas de pago, añade tú el píxel:

1. Pega el código base del píxel que te da Meta en `index.html`, dentro de `<head>`. Ese paso lo haces tú con tu ID de píxel.
2. Usa los atributos que la app ya tiene:

| Dónde | Atributo | Evento de Meta |
| --- | --- | --- |
| Portada `/`, al cargar | — | `ViewContent` |
| Portada: `#cta-portada-arriba`, `#cta-portada-medio` y `#cta-portada-final` | `data-evento="inicio-quiz"` | Ninguno. Abren el quiz, no la compra. Si quieres medirlos, usa un evento personalizado. |
| Paywall `/premium`: `#cta-premium-prueba` | `data-evento="inicio-compra"` | `InitiateCheckout` |

3. `ViewContent` se dispara al cargar la portada. En `index.html`, después del código base, añade:

```html
<script>
  window.addEventListener('load', () => {
    if (location.pathname === '/' && window.fbq) fbq('track', 'ViewContent')
  })
</script>
```

4. `InitiateCheckout` se dispara al pulsar el CTA de compra. Añade este escucha después del código base:

```html
<script>
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-evento="inicio-compra"]') && window.fbq) fbq('track', 'InitiateCheckout')
  })
</script>
```

5. `Purchase` no lo dispara la app. Lo mide Hotmart o tu servidor cuando confirmes la compra.
6. Prueba los eventos en la pestaña de eventos de prueba de Meta antes de lanzar campañas.

## Antes de publicar

- [ ] `npm run verificar` pasa: no hay secretos ni datos personales, y los marcadores `[COMPLETAR: …]` están resueltos (el comando los lista).
- [ ] Nombre, promesa, correo de soporte y responsable en `src/config/plantilla.ts`.
- [ ] Garantía: `garantiaDias` es 7 y las menciones dicen «Garantía de 7 días».
- [ ] Precios y días de prueba confirmados en `src/config/app.ts` (son precios sugeridos), con el cobro de Hotmart activo. Mientras no haya cobro, siguen marcados como demostración.
- [ ] Frases de cancelación y de prueba revisadas con tu producto en Hotmart.
- [ ] Píxel de Meta: `ViewContent` e `InitiateCheckout` probados en la pestaña de eventos de prueba.
- [ ] Textos legales revisados con asesoría de tu país, incluida la política de reembolso ajustada a Hotmart.
- [ ] `npm run typecheck`, `npm test` y `npm run build` pasan.
- [ ] Recorrido completo en un teléfono real.
- [ ] Ninguna clave en el código ni en git: `git status` no muestra `.env.local`.
