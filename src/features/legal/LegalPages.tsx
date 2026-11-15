import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router'
import { PageFrame } from '../../components/layout/PageFrame'
import { conexiones, plantilla } from '../../config/plantilla'
import { cn } from '../../lib/cn'
import { textoGarantia } from '../../lib/garantia'

/** Marco común de las páginas legales: volver atrás y texto de lectura. */
function LegalFrame({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  return (
    <PageFrame className="gap-5 pb-10">
      <header className="flex items-center pt-2">
        <button
          onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/'))}
          aria-label="Volver"
          className="grid size-11 shrink-0 place-items-center rounded-full bg-surface-1 text-ink-muted hover:text-ink"
        >
          <ArrowLeft className="size-5" aria-hidden />
        </button>
      </header>
      <article className="flex flex-col gap-4 text-[16px] leading-relaxed text-ink-muted [&_h2]:mt-3 [&_h2]:text-[20px] [&_h2]:text-ink [&_h1]:text-[32px] [&_h1]:leading-tight [&_h1]:text-ink [&_li]:ml-5 [&_li]:list-disc">
        {children}
      </article>
    </PageFrame>
  )
}

function Responsable() {
  return (
    <section>
      <h2>Responsable del tratamiento</h2>
      <ul>
        <li>Razón social: {plantilla.responsable}</li>
        <li>Identificador fiscal: [COMPLETAR: identificador fiscal]</li>
        <li>Domicilio: [COMPLETAR: domicilio]</li>
        <li>Contacto: {plantilla.contactoEmail}</li>
        <li>Ley aplicable: [COMPLETAR: ley aplicable]</li>
      </ul>
    </section>
  )
}

export function PrivacidadPage() {
  const datosLocales = !conexiones.cuentas && !conexiones.cobros && !conexiones.correo

  return (
    <LegalFrame>
      <h1>{datosLocales ? 'Tus datos se quedan aquí' : 'Privacidad'}</h1>
      <Responsable />

      {datosLocales ? (
        <>
          <p>
            {plantilla.nombre} guarda tu cuenta, tu progreso, tu diario y tus ajustes únicamente en el navegador de este
            dispositivo. La app no envía tus datos a ningún servidor.
          </p>
          <h2>Qué se guarda</h2>
          <ul>
            <li>Tu nombre, tu email y tu contraseña. La contraseña se guarda como huella (hash), nunca en texto plano.</li>
            <li>Tus lecciones completadas, tus respuestas, tu racha y tus insignias.</li>
            <li>Tus reflexiones del diario y tu ruta de inicio.</li>
            <li>Tus ajustes: hora de la lección y sonido.</li>
          </ul>
          <h2>Qué pasa si cambias de dispositivo</h2>
          <p>
            Si borras los datos del navegador o usas otro dispositivo, esta información no se recupera. Desde Perfil puedes
            borrar tu cuenta y tus datos en cualquier momento.
          </p>
          <h2>Proveedores</h2>
          <p>
            Ningún proveedor recibe tus datos. La app solo carga sus tipografías desde Google Fonts, que recibe la dirección
            IP del dispositivo como cualquier sitio web.
          </p>
        </>
      ) : (
        <>
          <h2>Qué datos recogemos</h2>
          <p>[COMPLETAR: describe qué datos recoge cada servicio conectado (cuentas, cobros, correo), para qué los usa y dónde se guardan]</p>
          <h2>Proveedores y conservación</h2>
          <p>[COMPLETAR: proveedores que reciben datos y plazos de conservación]</p>
        </>
      )}

      <h2>Tus derechos</h2>
      <p>Puedes pedir acceso, rectificación, supresión, oposición o portabilidad de tus datos.</p>
      {datosLocales ? (
        <p>
          Como los datos están solo en tu dispositivo, no tenemos una copia. Puedes borrarlos desde Perfil o escribir a{' '}
          {plantilla.contactoEmail}.
        </p>
      ) : (
        <p>Para ejercerlos, escribe a {plantilla.contactoEmail}.</p>
      )}

      <p className="pt-2 text-[14px]">
        Este es un texto modelo. Quien publique esta app debe revisarlo y adaptarlo a los servicios que conecte antes de
        venderla.
      </p>
    </LegalFrame>
  )
}

export function TerminosPage() {
  return (
    <LegalFrame>
      <h1>Términos del servicio</h1>
      <p>
        {plantilla.nombre} ofrece lecciones cortas de cultura general, liderazgo, negocios, mentalidad, pensamiento y
        finanzas personales. El contenido es educativo: no es asesoría financiera, legal ni médica, y no sustituye la de un
        profesional.
      </p>

      <h2>Uso</h2>
      <ul>
        <li>Crea tu cuenta con tus propios datos y mantén tu contraseña en privado.</li>
        <li>Las lecciones son una práctica diaria. No garantizan resultados concretos.</li>
      </ul>

      <h2>Planes y pruebas</h2>
      {conexiones.cobros ? (
        <p>[COMPLETAR: describe tu oferta: planes, precios, prueba, renovación y cancelación]</p>
      ) : (
        <>
          <p>
            Esta versión es una demostración: elegir un plan o empezar una prueba solo lo activa en este dispositivo. No se
            cobra nada.
          </p>
          <p>Los precios que se muestran son de ejemplo: [COMPLETAR: confirma los precios de tu oferta].</p>
        </>
      )}

      <h2>Contacto</h2>
      <p>Escribe a {plantilla.contactoEmail}.</p>

      <p className="pt-2 text-[14px]">
        Este es un texto modelo. Quien publique esta app debe revisarlo y adaptarlo con asesoría legal antes de venderla.
      </p>
    </LegalFrame>
  )
}

export function ReembolsoPage() {
  const garantia = textoGarantia()

  return (
    <LegalFrame>
      <h1>Política de reembolso</h1>
      {garantia ? (
        <>
          <h2>{garantia}</h2>
          <p>
            Puedes pedir el reembolso dentro de los {plantilla.garantiaDias} días siguientes a tu compra. La solicitud se
            gestiona con Hotmart, que cobra la compra. No hay otro proceso.
          </p>
        </>
      ) : (
        <p>Escríbenos a {plantilla.contactoEmail} para consultar tu caso.</p>
      )}

      {conexiones.cobros ? (
        <p>[COMPLETAR: describe cómo se pide el reembolso, el plazo y en cuántos días se devuelve el dinero, según tu pasarela de pago]</p>
      ) : (
        <>
          <h2>Esta versión de demostración</h2>
          <p>Mientras no haya cobros conectados, no se realiza ningún cargo, por lo que tampoco hay nada que reembolsar.</p>
        </>
      )}

      <p className="pt-2 text-[14px]">
        Este es un texto modelo. Quien publique esta app debe ajustarlo a las condiciones reales de la pasarela de pago que
        conecte (ver docs/CONECTAR.md).
      </p>
    </LegalFrame>
  )
}

/** Enlaces a los textos legales, para el pie del perfil y el paywall. */
export function EnlacesLegales({ className }: { className?: string }) {
  const enlace = 'inline-flex min-h-11 items-center underline-offset-4 hover:text-ink hover:underline'
  return (
    <nav
      aria-label="Textos legales"
      className={cn('flex flex-wrap justify-center gap-x-4 gap-y-2 text-[13px] text-ink-muted', className)}
    >
      <Link to="/legal/terminos" className={enlace}>
        Términos
      </Link>
      <Link to="/legal/privacidad" className={enlace}>
        Privacidad
      </Link>
      <Link to="/legal/reembolso" className={enlace}>
        Reembolsos
      </Link>
    </nav>
  )
}
