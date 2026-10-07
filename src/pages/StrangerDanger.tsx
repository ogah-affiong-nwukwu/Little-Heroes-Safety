import { useState } from 'react'
import { PageShell } from '../components/PageShell'
import { Celebration } from '../components/Celebration'
import { SAFETY_RULES, SAFETY_STEPS, STRANGER_QUIZ } from '../data/safetyRules'
import type { LessonPageProps } from '../types'
import { playCheck, playCelebrate, playCorrect, playWrong } from '../utils/sound'

export function StrangerDanger({ onBack, onStarEarned, starEarned }: LessonPageProps) {
  const [stepsDone, setStepsDone] = useState<Set<number>>(new Set())
  const [quizPick, setQuizPick] = useState<number | null>(null)
  const [quizWrong, setQuizWrong] = useState<Set<number>>(new Set())
  const [celebration, setCelebration] = useState(0)

  const allSteps = stepsDone.size === SAFETY_STEPS.length
  const quizSolved = quizPick === 0
  const missionComplete = allSteps && quizSolved

  function doStep(i: number) {
    setStepsDone((prev) => {
      const next = new Set(prev)
      next.add(i)
      playCheck()
      return next
    })
  }

  function answerQuiz(i: number) {
    if (quizSolved) return
    if (i === 0) {
      playCorrect()
      setQuizPick(i)
      setTimeout(() => {
        playCelebrate()
        setCelebration((c) => c + 1)
        if (!starEarned) onStarEarned()
      }, 500)
    } else {
      playWrong()
      setQuizWrong((prev) => new Set(prev).add(i))
    }
  }

  return (
    <PageShell
      title="Stranger Danger"
      emoji="🛡️"
      tagline="Most people are kind — but these safe rules keep you in charge!"
      accent="var(--coral)"
      accentSoft="var(--coral-soft)"
      onBack={onBack}
      progress={
        <span className="card-chunky inline-flex items-center gap-2 rounded-full px-5 py-3 font-display text-base font-bold text-ink">
          <span aria-hidden="true">🛡️</span>
          {allSteps && quizSolved ? 'Mission Complete!' : 'Mission: Stay Safe'}
        </span>
      }
    >
      <Celebration trigger={celebration} />

      {missionComplete && (
        <div className="card-chunky animate-pop-in mb-6 p-5 text-center" style={{ background: 'var(--mint-soft)' }}>
          <p className="font-display text-2xl font-extrabold text-ink">
            🛡️ Safety Hero! You know the rules and passed the drill! 🛡️
          </p>
          <p className="mt-1 text-lg font-medium text-ink-soft">
            You earned a Super-Star. Your shield is always with you!
          </p>
        </div>
      )}

      <section
        className="card-chunky mb-8 p-5 sm:p-6"
        style={{ background: 'linear-gradient(135deg, var(--coral-soft), var(--surface) 60%)', borderColor: 'var(--coral)' }}
      >
        <h2 className="font-display text-xl font-extrabold text-ink sm:text-2xl">
          🤔 What is a stranger?
        </h2>
        <p className="mt-2 text-lg font-medium leading-relaxed text-ink-soft">
          A stranger is anyone you <strong className="text-ink">don’t know</strong>. Most people are
          nice, but we can’t tell by looking. So we follow the <strong className="text-ink">4 Safe
          Rules</strong> — they are your invisible superhero shield!
        </p>
      </section>

      <h2 className="mb-4 font-display text-2xl font-extrabold text-ink">🛡️ The 4 Safe Rules</h2>
      <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {SAFETY_RULES.map((rule) => (
          <article
            key={rule.title}
            className="card-chunky card-press rounded-3xl p-5 sm:p-6"
            style={{ background: `linear-gradient(150deg, ${rule.soft}, var(--surface) 60%)`, borderColor: rule.color }}
          >
            <span
              aria-hidden="true"
              className="flex h-16 w-16 items-center justify-center rounded-2xl text-4xl shadow-btn"
              style={{ backgroundColor: rule.color }}
            >
              {rule.emoji}
            </span>
            <h3 className="mt-3 font-display text-xl font-extrabold text-ink">{rule.title}</h3>
            <p className="mt-1.5 text-base font-medium leading-relaxed text-ink-soft">{rule.detail}</p>
          </article>
        ))}
      </div>

      <section className="card-chunky mb-10 p-5 sm:p-6" style={{ borderColor: 'var(--tangerine)' }}>
        <h2 className="font-display text-2xl font-extrabold text-ink">💪 Super Safety Drill</h2>
        <p className="mt-1 text-base font-medium text-ink-soft">
          Tap each step to practice your hero moves — in order!
        </p>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {SAFETY_STEPS.map((step, i) => {
            const isDone = stepsDone.has(i)
            return (
              <button
                key={step.label}
                type="button"
                onClick={() => doStep(i)}
                aria-pressed={isDone}
                className={`card-chunky btn-bounce tap-target rounded-3xl p-6 text-center font-display text-2xl font-extrabold text-ink ${
                  isDone ? 'animate-bounce-soft' : ''
                }`}
                style={{
                  backgroundColor: isDone ? 'var(--tangerine-soft)' : 'var(--surface)',
                  borderColor: 'var(--tangerine)',
                  color: isDone ? 'var(--ink)' : 'var(--ink)',
                }}
              >
                <span aria-hidden="true" className="block text-5xl">
                  {step.emoji}
                </span>
                <span className="mt-2 block">{step.label}</span>
                <span aria-hidden="true" className="mt-2 block text-lg">
                  {isDone ? '✅ Done!' : `Step ${i + 1} — tap!`}
                </span>
              </button>
            )
          })}
        </div>
        {allSteps && (
          <p className="animate-pop-in mt-4 rounded-2xl p-4 text-center font-display text-xl font-extrabold text-ink" style={{ backgroundColor: 'var(--tangerine-soft)' }}>
            🦸 Perfect drill! Now say the chant: “Don’t talk, don’t take, don’t go — tell a grown-up you know!”
          </p>
        )}
      </section>

      <section className="card-chunky rounded-3xl p-5 sm:p-6" style={{ background: `linear-gradient(135deg, ${STRANGER_QUIZ.soft}, var(--surface) 65%)`, borderColor: STRANGER_QUIZ.color }}>
        <h3 className="font-display text-xl font-extrabold text-ink sm:text-2xl">🧠 What would YOU do?</h3>
        <p className="mt-1 text-lg font-medium text-ink">{STRANGER_QUIZ.question}</p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {STRANGER_QUIZ.options.map((opt, i) => {
            const pickedWrong = quizWrong.has(i)
            const pickedRight = quizPick === i
            return (
              <button
                key={opt.text}
                type="button"
                disabled={quizSolved}
                onClick={() => answerQuiz(i)}
                className={`card-chunky btn-bounce tap-target rounded-2xl p-4 text-left font-display text-base font-bold text-ink ${
                  pickedWrong ? 'animate-shake' : ''
                }`}
                style={{
                  backgroundColor: pickedRight
                    ? 'var(--mint)'
                    : pickedWrong
                      ? 'var(--coral-soft)'
                      : 'var(--surface)',
                  color: pickedRight ? '#ffffff' : undefined,
                  opacity: quizSolved && !pickedRight ? 0.55 : 1,
                }}
              >
                <span aria-hidden="true" className="mr-2">
                  {pickedRight ? '✅' : pickedWrong ? '❌' : '👆'}
                </span>
                {opt.text}
              </button>
            )
          })}
        </div>
        {quizSolved && (
          <p className="animate-pop-in mt-4 rounded-2xl p-4 font-bold text-white" style={{ backgroundColor: 'var(--mint)' }}>
            🎉 {STRANGER_QUIZ.praise}
          </p>
        )}
        {!quizSolved && quizWrong.size > 0 && (
          <p className="mt-3 text-sm font-semibold text-ink-soft">
            🧡 Remember: never go ANYWHERE with a stranger, even if they seem nice or know your name!
          </p>
        )}
      </section>
    </PageShell>
  )
}
