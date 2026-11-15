import { defineConfig, type Plugin } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { plantilla } from './src/config/plantilla.ts'

/** Manifiesto de la app (instalable). Nombre y descripción salen de src/config/plantilla.ts. */
const manifest = JSON.stringify(
  {
    name: plantilla.nombre,
    short_name: plantilla.nombre,
    description: plantilla.tagline,
    start_url: '/',
    display: 'standalone',
    background_color: '#0c0d10',
    theme_color: '#0c0d10',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  },
  null,
  2,
)

/** Rellena el nombre y la descripción de index.html y sirve/emite el manifiesto con la misma marca. */
function marcaDePlantilla(): Plugin {
  return {
    name: 'marca-de-plantilla',
    transformIndexHtml(html) {
      return html.replaceAll('%APP_NAME%', plantilla.nombre).replaceAll('%APP_DESCRIPTION%', plantilla.tagline)
    },
    configureServer(server) {
      server.middlewares.use('/manifest.webmanifest', (_req, res) => {
        res.setHeader('Content-Type', 'application/manifest+json')
        res.end(manifest)
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'manifest.webmanifest', source: manifest })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), marcaDePlantilla()],
  server: { host: true },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    setupFiles: ['tests/setup.ts'],
  },
})
