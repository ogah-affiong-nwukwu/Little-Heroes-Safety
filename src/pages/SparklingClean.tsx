import { useState } from 'react'
import { PageShell } from '../components/PageShell'
import { Celebration } from '../components/Celebration'
import { CHORES } from '../data/chores'
import type { LessonPageProps } from '../types'
import { playCheck, playCelebrate } from '../utils/sound'

export function SparklingClean({ onBack, onStarEarned, starEarned }: LessonPageProps) {
  const [done, setDone] = useState<Set<number>>(new Set())
  const [celebration, setCelebration] = useState(0)
  const [justChecked, setJustChecked] = useState<number | null>(null)

  const allDone = done.size === CHORES.length
  const percent = Math.round((done.size / CHORES.length) * 100)

  function toggle(i: number) {
    setDone((prev) => {
      const next = new Set(prev)
      if (next.has(i)) {
        next.delete(i)
      } else {
        next.add(i)
        playCheck()
        setJustChecked(i)
        window.setTimeout(() => setJustChecked(null), 700)
      }
      if (next.size === CHORES.length && !starEarned) {
        setTimeout(() => {
          playCelebrate()
          setCelebration((c) => c + 1)
          onStarEarned()
        }, 450)
      }
      return next
    })
  }

  return (
    <PageShell
      title="Sparkling Clean"
      emoji="🫧"
      tagline="Tap each sparkly habit you do — check them all to win a star!"
      accent="var(--sky)"
      accentSoft="var(--sky-soft)"
      onBack={onBack}
      progress={
        <span className="card-chunky inline-flex items-center gap-2 rounded-full px-5 py-3 font-display text-base font-bold text-ink">
          <span aria-hidden="true">⭐</span>
          {done.size} / {CHORES.length} done
        </span>
      }
    >
      <Celebration trigger={celebration} />

      <div className="card-chunky mb-8 p-5">
        <div className="mb-2 flex items-center justify-between font-display text-lg font-extrabold text-ink">
          <span>Sparkle-O-Meter</span>
          <span>{percent}%</span>
        </div>
        <div
          className="h-6 w-full overflow-hidden rounded-full border-2 border-borderline bg-surface"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Cleanliness checklist progress"
        >
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${percent}%`,
              background: 'linear-gradient(90deg, var(--sky), var(--mint))',
            }}
          />
        </div>
      </div>

      {allDone && (
        <div className="card-chunky animate-pop-in mb-6 p-5 text-center" style={{ background: 'var(--mint-soft)' }}>
          <p className="font-display text-2xl font-extrabold text-ink">
            🫧 SUPER SPARKLY! You checked every habit! 🫧
          </p>
          <p className="mt-1 text-lg font-medium text-ink-soft">You earned a Super-Star. Stay shiny, hero!</p>
        </div>
      )}

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CHORES.map((chore, i) => {
          const isDone = done.has(i)
          return (
            <li key={chore.title}>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={isDone}
                className={`card-chunky card-press tap-target flex w-full items-center gap-4 rounded-3xl p-4 text-left sm:p-5 ${
                  justChecked === i ? 'animate-bounce-soft' : ''
                }`}
                style={{ background: isDone ? chore.soft : 'var(--surface)', borderColor: isDone ? chore.color : undefined }}
              >
                <span
                  aria-hidden="true"
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-4xl shadow-btn"
                  style={{ backgroundColor: chore.color }}
                >
                  {chore.emoji}
                </span>
                <span className="flex-1">
                  <span className="block font-display text-xl font-extrabold text-ink">{chore.title}</span>
                  <span className="block text-sm font-medium leading-snug text-ink-soft">{chore.detail}</span>
                </span>
                <span
                  aria-hidden="true"
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-3 font-display text-xl font-extrabold transition-all duration-300 ${
                    isDone
                      ? 'animate-pop-in border-transparent bg-mint text-white shadow-btn'
                      : 'border-borderline bg-surface text-transparent'
                  }`}
                  style={{ borderWidth: 3 }}
                >
                  ✓
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </PageShell>
  )
}
