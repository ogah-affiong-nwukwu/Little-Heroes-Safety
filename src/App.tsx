import { useMemo } from 'react'
import { AppFooter } from './components/AppFooter'
import { AppHeader } from './components/AppHeader'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LESSON_PAGES } from './config/routes'
import { TOPICS } from './data/topics'
import { useRouter } from './hooks/useRouter'
import { useSound } from './hooks/useSound'
import { useStars } from './hooks/useStars'
import { useTheme } from './hooks/useTheme'
import { Home } from './pages/Home'
import type { LessonId } from './types'

function App() {
  const { view, navigate } = useRouter()
  const { theme, toggleTheme } = useTheme()
  const { sound, toggleSound } = useSound()
  const { stars, earnStar } = useStars()
  const totalLessons = TOPICS.length

  const goHome = () => navigate('home')

  const earnHandlers = useMemo(() => {
    const handlers = {} as Record<LessonId, () => void>
    for (const topic of TOPICS) handlers[topic.id] = () => earnStar(topic.id)
    return handlers
  }, [earnStar])

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader
        onHome={goHome}
        starsCount={stars.size}
        totalLessons={totalLessons}
        soundOn={sound}
        onToggleSound={toggleSound}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <ErrorBoundary resetKey={view} onReset={goHome}>
        <main className="flex-1">
          <div className={view === 'home' ? 'view-enter' : 'hidden'} aria-hidden={view !== 'home'}>
            <Home onNavigate={navigate} stars={stars.size} totalLessons={totalLessons} />
          </div>
          {TOPICS.map((topic) => {
            const Page = LESSON_PAGES[topic.id]
            const active = view === topic.id
            return (
              <div key={topic.id} className={active ? 'view-enter' : 'hidden'} aria-hidden={!active}>
                <Page onBack={goHome} onStarEarned={earnHandlers[topic.id]} starEarned={stars.has(topic.id)} />
              </div>
            )
          })}
        </main>
      </ErrorBoundary>

      <AppFooter />
    </div>
  )
}

export default App
