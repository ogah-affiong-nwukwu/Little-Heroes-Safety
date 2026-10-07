import type { ReactNode } from 'react'

interface PageShellProps {
  title: string
  emoji: string
  tagline: string
  accent: string
  accentSoft: string
  onBack: () => void
  children: ReactNode
  progress?: ReactNode
}

export function PageShell({
  title,
  emoji,
  tagline,
  accent,
  accentSoft,
  onBack,
  children,
  progress,
}: PageShellProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
      <div className="flex flex-wrap items-center gap-3 py-5">
        <button
          type="button"
          onClick={onBack}
          className="btn-bounce card-chunky tap-target flex items-center gap-2 rounded-full px-5 py-3 font-display text-base font-bold text-ink"
          aria-label="Back to the Academy menu"
        >
          <span aria-hidden="true" className="text-xl">
            🏠
          </span>
          Academy Home
        </button>
        {progress}
      </div>

      <header
        className="hero-banner card-chunky mb-8 flex flex-col items-center gap-3 p-6 text-center sm:flex-row sm:text-left"
        style={{
          borderColor: accent,
          background: `linear-gradient(120deg, ${accentSoft} 0%, var(--surface) 55%)`,
        }}
      >
        <span
          aria-hidden="true"
          className="animate-floaty inline-flex h-20 w-20 items-center justify-center rounded-3xl text-5xl shadow-card"
          style={{ backgroundColor: accent }}
        >
          {emoji}
        </span>
        <div>
          <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">{title}</h1>
          <p className="mt-1 text-lg font-medium text-ink-soft">{tagline}</p>
        </div>
      </header>

      <main>{children}</main>
    </div>
  )
}
