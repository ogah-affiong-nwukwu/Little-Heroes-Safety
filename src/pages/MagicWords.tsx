import { useState } from 'react'
import { PageShell } from '../components/PageShell'
import { Celebration } from '../components/Celebration'
import { MAGIC_WORDS } from '../data/magicWords'
import type { LessonPageProps } from '../types'
import { playFlip, playCelebrate } from '../utils/sound'
import { speak } from '../lib/speak'

export function MagicWords({ onBack, onStarEarned, starEarned }: LessonPageProps) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set())
  const [celebration, setCelebration] = useState(0)

  const allFlipped = flipped.size === MAGIC_WORDS.length

  function toggle(i: number) {
    setFlipped((prev) => {
      const next = new Set(prev)
      if (next.has(i)) {
        next.delete(i)
      } else {
        next.add(i)
        playFlip()
        speak(MAGIC_WORDS[i].word)
      }
      if (next.size === MAGIC_WORDS.length && !starEarned) {
        setTimeout(() => {
          playCelebrate()
          setCelebration((c) => c + 1)
          onStarEarned()
          speak('Yay! You earned a super star, hero!')
        }, 550)
      }
      return next
    })
  }

  return (
    <PageShell
      title="The Five Magic Words"
      emoji="🪄"
      tagline="Tap a card to flip it and unlock the polite way to say it!"
      accent="var(--grape)"
      accentSoft="var(--grape-soft)"
      onBack={onBack}
      progress={
        <span className="card-chunky inline-flex items-center gap-2 rounded-full px-5 py-3 font-display text-base font-bold text-ink">
          <span aria-hidden="true">🃏</span>
          {flipped.size} / {MAGIC_WORDS.length} flipped
        </span>
      }
    >
      <Celebration trigger={celebration} />

      {allFlipped && (
        <div className="card-chunky animate-pop-in mb-6 p-5 text-center" style={{ background: 'var(--sunny-soft)' }}>
          <p className="font-display text-2xl font-extrabold text-ink">
            🏆 WOW! You unlocked all five Magic Words! 🏆
          </p>
          <p className="mt-1 text-lg font-medium text-ink/85">
            You earned a Super-Star! Try using them at home today.
          </p>
        </div>
      )}

      <div className="lesson-card-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MAGIC_WORDS.map((word, i) => {
          const isFlipped = flipped.has(i)
          const brightText = word.soft === 'var(--grape-soft)'
          return (
            <div key={word.word} className="relative">
              <button
                type="button"
                onClick={() => toggle(i)}
                className="flip-scene tap-target block h-80 w-full cursor-pointer text-left"
                aria-label={`${word.word} card. ${isFlipped ? 'Showing scenario. Tap to flip back.' : 'Tap to reveal how to use it.'}`}
              >
                <div className="flip-inner" style={{ transform: isFlipped ? 'rotateY(180deg)' : undefined }}>
                  {/* FRONT */}
                  <div
                    className="flip-face card-chunky rounded-3xl p-6"
                    style={{ backgroundColor: word.soft, borderColor: word.color }}
                  >
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                      <span
                        aria-hidden="true"
                        className="flex h-20 w-20 items-center justify-center rounded-3xl text-5xl shadow-btn"
                        style={{ backgroundColor: 'var(--surface)' }}
                      >
                        {word.emoji}
                      </span>
                      <span className={`font-display text-3xl font-extrabold ${brightText ? 'on-grape' : 'text-ink'}`}>
                        {word.word}
                      </span>
                      <span className="rounded-full bg-surface px-4 py-1.5 font-display text-sm font-bold text-ink-soft shadow-soft">
                        👆 Tap to flip!
                      </span>
                    </div>
                  </div>
                  {/* BACK */}
                  <div
                    className="flip-face flip-back card-chunky rounded-3xl p-6"
                    style={{ backgroundColor: 'var(--surface)', borderColor: word.color }}
                  >
                    <div className="flex h-full flex-col items-center justify-center gap-2.5 overflow-y-auto text-center">
                      <span aria-hidden="true" className="text-4xl">
                        {word.emoji}
                      </span>
                      <span className="font-display text-xl font-extrabold text-ink">{word.scenario}</span>
                      <span
                        className={`rounded-2xl px-4 py-2 font-display text-lg font-bold ${brightText ? 'on-grape' : 'text-ink'}`}
                        style={{ backgroundColor: word.color }}
                      >
                        {word.example}
                      </span>
                      <span className="text-sm font-medium leading-snug text-ink-soft">{word.tip}</span>
                    </div>
                  </div>
                </div>
              </button>
              {isFlipped && (
                <span
                  aria-hidden="true"
                  className="animate-pop-in absolute -right-2 -top-2 flex h-11 w-11 items-center justify-center rounded-full bg-sunny text-xl shadow-btn"
                >
                  ✓
                </span>
              )}
            </div>
          )
        })}
      </div>
    </PageShell>
  )
}
