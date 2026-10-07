import { Mascot } from './Mascot'
import type { Theme } from '../types'

interface AppHeaderProps {
  onHome: () => void
  starsCount: number
  totalLessons: number
  soundOn: boolean
  onToggleSound: () => void
  theme: Theme
  onToggleTheme: () => void
}

export function AppHeader({
  onHome,
  starsCount,
  totalLessons,
  soundOn,
  onToggleSound,
  theme,
  onToggleTheme,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-borderline bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={onHome}
          className="btn-bounce tap-target flex items-center gap-2.5"
          aria-label="Go to Academy home"
        >
          <Mascot size={46} />
          <span className="hidden font-display text-lg font-extrabold text-ink sm:block">
            Little Heroes Academy
          </span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <span
            className="card-chunky inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 font-display text-sm font-bold text-ink"
            role="status"
          >
            <span aria-hidden="true">⭐</span>
            {starsCount}/{totalLessons}
            <span className="sr-only"> super-stars earned</span>
          </span>
          <button
            type="button"
            onClick={onToggleSound}
            className="btn-bounce card-chunky tap-target flex h-11 w-11 items-center justify-center rounded-full text-xl"
            aria-pressed={soundOn}
            aria-label={soundOn ? 'Turn sounds off' : 'Turn sounds on'}
          >
            {soundOn ? '🔊' : '🔇'}
          </button>
          <button
            type="button"
            onClick={onToggleTheme}
            className="btn-bounce card-chunky tap-target flex h-11 w-11 items-center justify-center rounded-full text-xl"
            aria-pressed={theme === 'dark'}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  )
}
