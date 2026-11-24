import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { MotionConfig } from 'motion/react'
import App from './App'
import { restaurarSesionEnLaNube } from './store/appStore'
import { ErrorBoundary } from './components/layout/ErrorBoundary'
import './styles/index.css'

void restaurarSesionEnLaNube()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
