import { Component, type ReactNode } from 'react'
import { Button } from '../ui/Button'

interface Props {
  children: ReactNode
}

interface State {
  failed: boolean
}

/** Último recurso: si una pantalla falla, muestra un mensaje útil en vez de una página en blanco. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <main className="mx-auto flex min-h-dvh w-full max-w-[440px] flex-col items-center justify-center gap-5 px-5 py-12 text-center">
        <h1 className="text-[30px] leading-tight">Algo no salió bien</h1>
        <p className="max-w-[34ch] text-[16px] leading-relaxed text-ink-muted">
          Tu progreso se guarda en este dispositivo. Recarga la página para seguir donde lo dejaste.
        </p>
        <div className="mt-4 w-full">
          <Button onClick={() => window.location.reload()}>Recargar la página</Button>
        </div>
      </main>
    )
  }
}
