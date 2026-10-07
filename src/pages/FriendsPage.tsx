import { useState } from 'react'
import { PageShell } from '../components/PageShell'
import { Celebration } from '../components/Celebration'
import { KIND_WORDS, SCENARIOS } from '../data/friendScenarios'
import type { LessonPageProps } from '../types'
import { playCorrect, playWrong, playCelebrate, playTap } from '../utils/sound'

export function FriendsPage({ onBack, onStarEarned, starEarned }: LessonPageProps) {
  const [answers, setAnswers] = useState<Record<number, number | undefined>>({})
  const [wrongPicks, setWrongPicks] = useState<Set<string>>(new Set())
  const [shaking, setShaking] = useState<string | null>(null)
  const [celebration, setCelebration] = useState(0)

  const solvedCount = SCENARIOS.filter((s, i) => answers[i] === s.correct).length
  const allSolved = solvedCount === SCENARIOS.length

  function pick(scenarioIndex: number, optionIndex: number) {
    const scenario = SCENARIOS[scenarioIndex]
    if (answers[scenarioIndex] === scenario.correct) return
    const key = `${scenarioIndex}-${optionIndex}`

    if (optionIndex === scenario.correct) {
      playCorrect()
      setAnswers((prev) => ({ ...prev, [scenarioIndex]: optionIndex }))
      const newSolved = solvedCount + 1
      if (newSolved === SCENARIOS.length && !starEarned) {
        setTimeout(() => {
          playCelebrate()
          setCelebration((c) => c + 1)
          onStarEarned()
        }, 600)
      }
    } else {
      playWrong()
      setWrongPicks((prev) => new Set(prev).add(key))
      setShaking(key)
      window.setTimeout(() => setShaking(null), 500)
    }
  }

  return (
    <PageShell
      title="How to Be a Great Friend"
      emoji="🤝"
      tagline="Read the story, then tap the friendliest answer!"
      accent="var(--mint)"
      accentSoft="var(--mint-soft)"
      onBack={onBack}
      progress={
        <span className="card-chunky inline-flex items-center gap-2 rounded-full px-5 py-3 font-display text-base font-bold text-ink">
          <span aria-hidden="true">💛</span>
          {solvedCount} / {SCENARIOS.length} solved
        </span>
      }
    >
      <Celebration trigger={celebration} />

      <section className="card-chunky mb-8 p-5 sm:p-6">
        <h2 className="font-display text-xl font-extrabold text-ink">💬 Kind Words to Practice</h2>
        <p className="mt-1 text-sm font-medium text-ink-soft">
          Tap each bubble and try saying it out loud — kind words are friendship magic!
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {KIND_WORDS.map((phrase, i) => (
            <button
              key={phrase}
              type="button"
              onClick={() => playTap()}
              className="btn-bounce card-chunky tap-target rounded-full px-5 py-2.5 font-display text-base font-bold text-ink"
              style={{
                backgroundColor: ['var(--sky-soft)', 'var(--bubble-soft)', 'var(--sunny-soft)', 'var(--mint-soft)'][i % 4],
              }}
            >
              {phrase}
            </button>
          ))}
        </div>
      </section>

      {allSolved && (
        <div className="card-chunky animate-pop-in mb-6 p-5 text-center" style={{ background: 'var(--bubble-soft)' }}>
          <p className="font-display text-2xl font-extrabold text-ink">💛 Friendship Champion! Every answer kind! 💛</p>
          <p className="mt-1 text-lg font-medium text-ink-soft">You earned a Super-Star for being a great friend.</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {SCENARIOS.map((scenario, si) => {
          const chosen = answers[si]
          const solved = chosen === scenario.correct
          return (
            <section
              key={scenario.question}
              className="card-chunky rounded-3xl p-5 sm:p-6"
              style={{ background: `linear-gradient(135deg, ${scenario.soft}, var(--surface) 65%)`, borderColor: scenario.color }}
            >
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-4xl shadow-btn"
                  style={{ backgroundColor: scenario.color }}
                >
                  {scenario.emoji}
                </span>
                <div>
                  <h3 className="font-display text-xl font-extrabold text-ink sm:text-2xl">{scenario.question}</h3>
                  {solved && (
                    <p className="animate-pop-in mt-1 rounded-2xl px-3 py-1.5 text-sm font-bold text-white" style={{ backgroundColor: 'var(--mint)' }}>
                      ✓ {scenario.praise}
                    </p>
                  )}
                  {!solved && chosen !== undefined && (
                    <p className="mt-1 text-sm font-semibold text-ink-soft">
                      🧡 Not quite — {scenario.hint}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {scenario.options.map((option, oi) => {
                  const isCorrectOption = oi === scenario.correct
                  const isChosen = chosen === oi
                  const wrongKey = `${si}-${oi}`
                  const isWrongPick = wrongPicks.has(wrongKey)
                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={solved}
                      onClick={() => pick(si, oi)}
                      aria-pressed={isChosen}
                      className={`card-chunky btn-bounce tap-target rounded-2xl p-4 text-left font-display text-base font-bold text-ink ${
                        shaking === wrongKey ? 'animate-shake' : ''
                      }`}
                      style={{
                        backgroundColor: isChosen
                          ? isCorrectOption
                            ? 'var(--mint)'
                            : 'var(--coral)'
                          : isWrongPick
                            ? 'var(--coral-soft)'
                            : 'var(--surface)',
                        borderColor: isChosen ? (isCorrectOption ? 'var(--mint)' : 'var(--coral)') : undefined,
                        color: isChosen ? '#ffffff' : undefined,
                        opacity: solved && !isCorrectOption ? 0.55 : 1,
                      }}
                    >
                      <span aria-hidden="true" className="mr-2">
                        {isChosen ? (isCorrectOption ? '✅' : '❌') : isWrongPick ? '❌' : '👆'}
                      </span>
                      {option}
                    </button>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </PageShell>
  )
}
