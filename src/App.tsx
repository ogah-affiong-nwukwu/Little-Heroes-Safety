import { useEffect, useMemo, useState } from 'react'
import { AppFooter } from './components/AppFooter'
import { AppHeader } from './components/AppHeader'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ParentLogin } from './components/ParentLogin'
import { LESSON_PAGES } from './config/routes'
import { TOPICS } from './data/topics'
import { useParentAuth } from './hooks/useParentAuth'
import { useRouter } from './hooks/useRouter'
import { useSound } from './hooks/useSound'
import { useStars } from './hooks/useStars'
import { useTheme } from './hooks/useTheme'
import { useVoice } from './hooks/useVoice'
import { supabase } from './lib/supabase'
import { Home } from './pages/Home'
import type { LessonId } from './types'

function App() {
  const { view, navigate } = useRouter()
  const { theme, toggleTheme } = useTheme()
  const { sound, toggleSound } = useSound()
  const { voice, toggleVoice } = useVoice()
  const { stars, earnStar, mergeStars } = useStars()
  const { user, signIn, signUp, signOut } = useParentAuth()
  const [parentOpen, setParentOpen] = useState(false)
  const [mascotJump, setMascotJump] = useState(0)
  const totalLessons = TOPICS.length

  const goHome = () => navigate('home')

  const earnHandlers = useMemo(() => {
    const handlers = {} as Record<LessonId, () => void>
    for (const topic of TOPICS) {
      handlers[topic.id] = () => {
        earnStar(topic.id)
        setMascotJump((c) => c + 1)
      }
    }
    return handlers
  }, [earnStar])

  useEffect(() => {
    if (!supabase || !user) return
    let cancelled = false
    supabase
      .from('progress')
      .select('lesson_id')
      .eq('user_id', user.id)
      .then(({ data, error }) => {
        if (error || cancelled || !data) return
        const remote = new Set<LessonId>()
        for (const row of data) {
          const id = row.lesson_id as unknown
          if (typeof id === 'string' && TOPICS.some((topic) => topic.id === id)) {
            remote.add(id as LessonId)
          }
        }
        mergeStars(remote)
      })
    return () => {
      cancelled = true
    }
  }, [user, mergeStars])

  useEffect(() => {
    if (!supabase || !user) return
    const rows = [...stars].map((lessonId) => ({ user_id: user.id, lesson_id: lessonId }))
    if (rows.length === 0) return
    void supabase.from('progress').upsert(rows, { onConflict: 'user_id,lesson_id', ignoreDuplicates: true })
  }, [user, stars])

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader
        onHome={goHome}
        starsCount={stars.size}
        totalLessons={totalLessons}
        soundOn={sound}
        onToggleSound={toggleSound}
        voiceOn={voice}
        onToggleVoice={toggleVoice}
        onOpenParent={() => setParentOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        mascotJump={mascotJump}
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

      <ParentLogin
        open={parentOpen}
        onClose={() => setParentOpen(false)}
        user={user}
        signIn={signIn}
        signUp={signUp}
        signOut={signOut}
      />

      <AppFooter />
    </div>
  )
}

export default App
