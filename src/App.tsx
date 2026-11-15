import { AnimatePresence } from 'motion/react'
import { lazy, Suspense, useEffect, type ReactNode } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import { Ambient } from './components/layout/Ambient'
import { AppLayout } from './components/layout/AppLayout'
import { Wordmark } from './components/brand/Logo'
import { hasOnboarded } from './features/auth/guards'
import { selectCurrentData, selectCurrentAccount, useAppStore } from './store/appStore'
import { WelcomePage } from './features/funnel/WelcomePage'
import { NotFoundPage } from './features/errors/NotFoundPage'
import { pageMeta } from './lib/pageMeta'

const QuizPage = lazy(() => import('./features/funnel/QuizPage').then((m) => ({ default: m.QuizPage })))
const AnalyzingPage = lazy(() => import('./features/funnel/AnalyzingPage').then((m) => ({ default: m.AnalyzingPage })))
const ResultPage = lazy(() => import('./features/funnel/ResultPage').then((m) => ({ default: m.ResultPage })))
const RegisterPage = lazy(() => import('./features/auth/RegisterPage').then((m) => ({ default: m.RegisterPage })))
const LoginPage = lazy(() => import('./features/auth/LoginPage').then((m) => ({ default: m.LoginPage })))
const OnboardingPage = lazy(() => import('./features/onboarding/OnboardingPage').then((m) => ({ default: m.OnboardingPage })))
const PaywallPage = lazy(() => import('./features/paywall/PaywallPage').then((m) => ({ default: m.PaywallPage })))
const LessonPage = lazy(() => import('./features/lesson/LessonPage').then((m) => ({ default: m.LessonPage })))
const HomePage = lazy(() => import('./features/home/HomePage').then((m) => ({ default: m.HomePage })))
const LibraryPage = lazy(() => import('./features/library/LibraryPage').then((m) => ({ default: m.LibraryPage })))
const TrackPage = lazy(() => import('./features/library/TrackPage').then((m) => ({ default: m.TrackPage })))
const JournalPage = lazy(() => import('./features/journal/JournalPage').then((m) => ({ default: m.JournalPage })))
const ProfilePage = lazy(() => import('./features/profile/ProfilePage').then((m) => ({ default: m.ProfilePage })))
const PrivacidadPage = lazy(() => import('./features/legal/LegalPages').then((m) => ({ default: m.PrivacidadPage })))
const TerminosPage = lazy(() => import('./features/legal/LegalPages').then((m) => ({ default: m.TerminosPage })))
const ReembolsoPage = lazy(() => import('./features/legal/LegalPages').then((m) => ({ default: m.ReembolsoPage })))

function FullScreenLoader() {
  return (
    <div className="grid min-h-dvh place-items-center" role="status" aria-label="Cargando">
      <Wordmark />
    </div>
  )
}

/** Exige cuenta. Si no hay sesión, manda a registro. */
function RequireAccount({ children }: { children: ReactNode }) {
  const account = useAppStore(selectCurrentAccount)
  if (!account) return <Navigate to="/registro" replace />
  return <>{children}</>
}

/** Exige cuenta y onboarding terminado. */
function RequireOnboarded({ children }: { children: ReactNode }) {
  const account = useAppStore(selectCurrentAccount)
  const data = useAppStore(selectCurrentData)
  if (!account) return <Navigate to="/login" replace />
  if (!hasOnboarded(data)) return <Navigate to="/onboarding" replace />
  return <>{children}</>
}

export default function App() {
  const location = useLocation()

  useEffect(() => {
    const { title, description } = pageMeta(location.pathname)
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [location.pathname])

  return (
    <>
      <Ambient />
      <Suspense fallback={<FullScreenLoader />}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/analisis" element={<AnalyzingPage />} />
            <Route path="/resultado" element={<ResultPage />} />
            <Route path="/registro" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/onboarding"
              element={
                <RequireAccount>
                  <OnboardingPage />
                </RequireAccount>
              }
            />
            <Route
              path="/premium"
              element={
                <RequireAccount>
                  <PaywallPage />
                </RequireAccount>
              }
            />
            <Route
              path="/leccion/:lessonId"
              element={
                <RequireOnboarded>
                  <LessonPage />
                </RequireOnboarded>
              }
            />
            <Route
              element={
                <RequireOnboarded>
                  <AppLayout />
                </RequireOnboarded>
              }
            >
              <Route path="/hoy" element={<HomePage />} />
              <Route path="/rutas" element={<LibraryPage />} />
              <Route path="/rutas/:trackId" element={<TrackPage />} />
              <Route path="/diario" element={<JournalPage />} />
              <Route path="/perfil" element={<ProfilePage />} />
            </Route>
            <Route path="/legal/privacidad" element={<PrivacidadPage />} />
            <Route path="/legal/terminos" element={<TerminosPage />} />
            <Route path="/legal/reembolso" element={<ReembolsoPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  )
}
