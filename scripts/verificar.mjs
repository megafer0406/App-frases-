// Verificación de la plantilla (npm run verificar).
//
// 1. Lista los marcadores [COMPLETAR: …] y [VERIFICAR: …] que quedan por completar. Es informativo: no falla por ellos.
// 2. Falla (código 1) si encuentra secretos con formato real: claves privadas, claves de servicio o tokens.
// 3. Falla (código 1) si encuentra datos personales: correos fuera de dominios de ejemplo, rutas de un equipo
//    concreto, teléfonos internacionales o archivos .env con contenido.
//
// Revisa solo lo que Git subiría (archivos rastreados o no ignorados). No lee ni muestra .env.local.

import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const yo = 'scripts/verificar.mjs' // contiene los propios patrones: no se revisa a sí mismo
const IGNORAR = new Set(['package-lock.json', yo])
const BINARIO = /\.(png|jpe?g|webp|gif|ico|woff2?|ttf|otf|mp4|webm|pdf)$/i

/** Marcadores pendientes. Un «…» solo (ejemplo de la guía) no cuenta. */
const MARCADOR = /\[(?:COMPLETAR|VERIFICAR):(?!\s*…\s*\])[^\]]*\]/g

/** Formatos reales de claves y tokens. */
const SECRETOS = [
  ['clave privada', /-----BEGIN (?:RSA |EC |OPENSSH |DSA |PGP )?PRIVATE KEY/],
  ['clave secreta de Stripe', /\b(?:sk|rk)_live_[A-Za-z0-9]{10,}/],
  ['clave de Anthropic', /\bsk-ant-[A-Za-z0-9_-]{10,}/],
  ['clave de AWS', /\bAKIA[0-9A-Z]{16}\b/],
  ['token de GitHub', /\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})/],
  ['clave de Resend', /\bre_[A-Za-z0-9]{20,}/],
  ['token JWT (por ejemplo, una clave service_role)', /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/],
  ['valor de secreto asignado en el código', /\b(?:secret|token|api[_-]?key|password|service[_-]?role)\w*["']?\s*[:=]\s*["'`][A-Za-z0-9_\-/+=.]{20,}["'`]/i],
]

/** Datos personales: correos reales, rutas de un equipo y teléfonos internacionales. */
const CORREO = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g
const DOMINIO_DE_EJEMPLO = /^(?:[a-z0-9-]+\.)*(?:ejemplo\.(?:com|es|mx|org)|example\.(?:com|org|net)|correo\.com|test|invalid|localhost)$/i
const PERSONALES = [
  ['ruta de un equipo concreto', /\/(?:Users|home)\/[A-Za-z0-9._-]+\//],
  ['teléfono internacional', /(?<![\w.])\+\d{1,3}[ .-]?\d{2,4}(?:[ .-]?\d{2,4}){2,3}(?![\w.])/],
]

function listarArchivos() {
  try {
    return execFileSync('git', ['ls-files', '-co', '--exclude-standard'], { cwd: root, encoding: 'utf8' })
      .split('\n')
      .filter(Boolean)
  } catch {
    // Sin Git (por ejemplo, una copia descomprimida): todo el árbol menos dependencias y compilados.
    const recorrer = (dir) =>
      readdirSync(dir).flatMap((nombre) => {
        if (['node_modules', 'dist', '.git'].includes(nombre)) return []
        const ruta = join(dir, nombre)
        return statSync(ruta).isDirectory() ? recorrer(ruta) : [relative(root, ruta)]
      })
    return recorrer(root)
  }
}

const archivos = listarArchivos().filter((f) => !IGNORAR.has(f) && !BINARIO.test(f) && existsSync(join(root, f)))
const marcadores = []
const hallazgos = []

for (const archivo of archivos) {
  if (/(^|\/)\.env(\.|$)/.test(archivo) && archivo !== '.env.example') {
    hallazgos.push(`${archivo}: archivo de entorno dentro del proyecto. Quítalo o añádelo al .gitignore`)
    continue
  }
  const lineas = readFileSync(join(root, archivo), 'utf8').split(/\r?\n/)
  lineas.forEach((linea, i) => {
    const sitio = `${archivo}:${i + 1}`
    for (const m of linea.matchAll(MARCADOR)) marcadores.push(`${sitio}  ${m[0]}`)
    for (const [nombre, patron] of SECRETOS) {
      if (patron.test(linea)) hallazgos.push(`${sitio}: posible ${nombre}`)
    }
    for (const [nombre, patron] of PERSONALES) {
      if (patron.test(linea)) hallazgos.push(`${sitio}: ${nombre}`)
    }
    for (const correo of linea.matchAll(CORREO)) {
      if (!DOMINIO_DE_EJEMPLO.test(correo[0].split('@')[1])) hallazgos.push(`${sitio}: correo real «${correo[0]}»`)
    }
  })
}

console.log(`Archivos revisados: ${archivos.length}`)

console.log(`\nMarcadores pendientes: ${marcadores.length}`)
for (const m of marcadores) console.log(`  ${m}`)

const configuracion = existsSync(join(root, 'src/config/plantilla.ts'))
  ? readFileSync(join(root, 'src/config/plantilla.ts'), 'utf8')
  : ''
if (/contactoEmail:\s*'correo@correo\.com'/.test(configuracion)) {
  console.log('\nAviso: el correo de soporte es el de ejemplo (src/config/plantilla.ts). Cámbialo por uno tuyo.')
}

if (hallazgos.length > 0) {
  console.error(`\nNo pasa: ${hallazgos.length} hallazgo(s) de secretos o datos personales:`)
  for (const h of hallazgos) console.error(`  - ${h}`)
  process.exit(1)
}

console.log('\nSin secretos ni datos personales en lo que Git subiría.')
