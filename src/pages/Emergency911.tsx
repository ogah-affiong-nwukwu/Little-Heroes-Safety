import { useEffect, useState } from 'react'
import { PageShell } from '../components/PageShell'
import { Celebration } from '../components/Celebration'
import { CALL_STEPS, EMERGENCY_QUIZ, HELPERS } from '../data/emergency'
import type { LessonPageProps } from '../types'
import { playRing, playCorrect, playWrong, playCelebrate, playTap } from '../utils/sound'

export function Emergency911({ onBack, onStarEarned, starEarned }: LessonPageProps) {
  const [quizAnswers, setQuizAnswers] = useState<Record<number, boolean | undefined>>({})
  const [quizWrong, setQuizWrong] = useState<Set<number>>(new Set())
  const [quizShake, setQuizShake] = useState<number | null>(null)
  const [simOpen, setSimOpen] = useState(false)
  const [simStep, setSimStep] = useState(0)
  const [simDone, setSimDone] = useState(false)
  const [celebration, setCelebration] = useState(0)

  const quizSolvedCount = EMERGENCY_QUIZ.filter((q, i) => quizAnswers[i] === q.emergency).length
  const quizComplete = quizSolvedCount === EMERGENCY_QUIZ.length
  const missionComplete = quizComplete && simDone

  function awardStar() {
    playCelebrate()
    setCelebration((c) => c + 1)
    if (!starEarned) onStarEarned()
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && simOpen) closeSim()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  function answerQuiz(i: number, isEmergency: boolean) {
    const correct = isEmergency === EMERGENCY_QUIZ[i].emergency
    if (correct) {
      playCorrect()
      const alreadySolved = quizAnswers[i] === EMERGENCY_QUIZ[i].emergency
      setQuizAnswers((prev) => ({ ...prev, [i]: isEmergency }))
      if (!alreadySolved && quizSolvedCount + 1 === EMERGENCY_QUIZ.length && simDone) {
        setTimeout(awardStar, 500)
      }
    } else {
      playWrong()
      setQuizWrong((prev) => new Set(prev).add(i))
      setQuizShake(i)
      window.setTimeout(() => setQuizShake(null), 500)
    }
  }

  function openSim() {
    playRing()
    setSimOpen(true)
    setSimStep(0)
    setSimDone(false)
  }

  function closeSim() {
    setSimOpen(false)
    setSimStep(0)
  }

  function nextSimStep() {
    if (simStep < 4) {
      playTap()
      setSimStep((s) => s + 1)
    } else {
      playCorrect()
      setSimDone(true)
      if (quizComplete) {
        setTimeout(awardStar, 500)
      }
      window.setTimeout(() => {
        setSimOpen(false)
      }, 1600)
    }
  }

  return (
    <PageShell
      title="Super Emergency 911"
      emoji="🚨"
      tagline="Learn when to call 911 and how to be a helper hero!"
      accent="var(--tangerine)"
      accentSoft="var(--tangerine-soft)"
      onBack={onBack}
      progress={
        <span className="card-chunky inline-flex items-center gap-2 rounded-full px-5 py-3 font-display text-base font-bold text-ink">
          <span aria-hidden="true">🚨</span>
          {missionComplete ? 'Mission Complete!' : 'Hero Training'}
        </span>
      }
    >
      <Celebration trigger={celebration} />

      {missionComplete && (
        <div className="card-chunky animate-pop-in mb-6 p-5 text-center" style={{ background: 'var(--tangerine-soft)' }}>
          <p className="font-display text-2xl font-extrabold text-ink">
            🚨 Helper Hero! You know when to call and what to say! 🚨
          </p>
          <p className="mt-1 text-lg font-medium text-ink-soft">You earned a Super-Star. Helpers like you save the day!</p>
        </div>
      )}

      <section className="card-chunky mb-8 p-5 sm:p-6" style={{ borderColor: 'var(--coral)' }}>
        <h2 className="font-display text-xl font-extrabold text-ink sm:text-2xl">🆘 911 is ONLY for real emergencies!</h2>
        <p className="mt-2 text-lg font-medium leading-relaxed text-ink-soft">
          An emergency is when someone is <strong className="text-ink">badly hurt</strong>, there is a{' '}
          <strong className="text-ink">fire</strong>, someone <strong className="text-ink">won’t wake up</strong>, or
          you are <strong className="text-ink">lost or in danger</strong>. Calling 911 as a joke is never
          funny — it can slow down real heroes!
        </p>
      </section>

      <h2 className="mb-4 font-display text-2xl font-extrabold text-ink">🤔 Emergency or Not? Tap the right answer!</h2>
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EMERGENCY_QUIZ.map((q, i) => {
          const answered = quizAnswers[i] === q.emergency
          const answeredWrong = quizAnswers[i] !== undefined && quizAnswers[i] !== q.emergency
          const pickedNo = quizAnswers[i] === false
          const pickedYes = quizAnswers[i] === true
          return (
            <div
              key={q.text}
              className={`card-chunky rounded-3xl p-4 ${quizShake === i ? 'animate-shake' : ''}`}
              style={{ borderColor: answered ? 'var(--mint)' : answeredWrong ? 'var(--coral)' : undefined }}
            >
              <p className="flex items-center gap-3 font-display text-lg font-extrabold text-ink">
                <span aria-hidden="true" className="text-3xl">
                  {q.emoji}
                </span>
                {q.text}
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => answerQuiz(i, true)}
                  disabled={answered}
                  className="btn-bounce tap-target flex-1 rounded-2xl px-3 py-2.5 font-display text-base font-bold text-white shadow-btn"
                  style={{ backgroundColor: 'var(--coral)', opacity: answered && !pickedYes ? 0.4 : 1 }}
                >
                  📞 911!
                </button>
                <button
                  type="button"
                  onClick={() => answerQuiz(i, false)}
                  disabled={answered}
                  className="btn-bounce tap-target flex-1 rounded-2xl px-3 py-2.5 font-display text-base font-bold text-white shadow-btn"
                  style={{ backgroundColor: 'var(--mint)', opacity: answered && !pickedNo ? 0.4 : 1 }}
                >
                  🙅 Not 911
                </button>
              </div>
              {answered && (
                <p className="animate-pop-in mt-2 text-sm font-bold text-ink">
                  {q.emergency ? '✅ Correct — this IS an emergency!' : '✅ Correct — ask a grown-up, no 911 needed!'}
                </p>
              )}
              {quizWrong.has(i) && !answered && (
                <p className="mt-2 text-sm font-semibold text-coral">🧡 Try the other button!</p>
              )}
            </div>
          )
        })}
      </div>

      <section className="card-chunky mb-10 p-5 sm:p-6" style={{ borderColor: 'var(--grape)' }}>
        <h2 className="font-display text-2xl font-extrabold text-ink">📞 The 7 Steps to Call 911</h2>
        <ol className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CALL_STEPS.map((step, i) => (
            <li key={step.title} className="card-chunky card-press flex gap-4 rounded-3xl p-4">
              <span
                aria-hidden="true"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-display text-2xl font-extrabold text-white shadow-btn"
                style={{ backgroundColor: 'var(--grape)' }}
              >
                {i + 1}
              </span>
              <span>
                <span className="block text-2xl">{step.emoji}</span>
                <span className="block font-display text-lg font-extrabold text-ink">{step.title}</span>
                <span className="block text-sm font-medium leading-snug text-ink-soft">{step.detail}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="card-chunky mb-10 p-5 sm:p-6" style={{ borderColor: 'var(--sky)' }}>
        <h2 className="font-display text-2xl font-extrabold text-ink">👋 Safe Helpers to Look For</h2>
        <p className="mt-1 text-base font-medium text-ink-soft">
          If you’re ever lost, look for one of these trusted helpers and tell them your name!
        </p>
        <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {HELPERS.map((helper) => (
            <li
              key={helper.title}
              className="card-chunky card-press flex flex-col items-center gap-2 rounded-3xl p-4 text-center"
            >
              <span
                aria-hidden="true"
                className="flex h-16 w-16 items-center justify-center rounded-full text-4xl shadow-btn"
                style={{ backgroundColor: helper.color }}
              >
                {helper.emoji}
              </span>
              <span className="font-display text-base font-extrabold text-ink">{helper.title}</span>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="card-chunky animate-pulse-ring rounded-3xl p-6 text-center sm:p-8"
        style={{ background: 'linear-gradient(135deg, var(--coral-soft), var(--surface) 60%)', borderColor: 'var(--coral)' }}
      >
        <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">📞 Ready, Hero? Practice the Call!</h2>
        <p className="mt-2 text-lg font-medium text-ink-soft">
          This is just pretend — we won’t really call anyone. Practice makes perfect!
        </p>
        <button
          type="button"
          onClick={openSim}
          className="btn-bounce tap-target mt-5 rounded-full px-8 py-4 font-display text-2xl font-extrabold text-white shadow-btn"
          style={{ backgroundColor: 'var(--coral)' }}
        >
          🚨 Simulate a 911 Call
        </button>
        {simDone && (
          <p className="animate-pop-in mt-4 rounded-2xl p-4 font-display text-xl font-extrabold text-ink" style={{ backgroundColor: 'var(--mint-soft)' }}>
            🏆 Amazing! You practiced a real 911 call — you’re a Helper Hero!
          </p>
        )}
      </section>

      {simOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="911 call simulation"
          onClick={closeSim}
        >
          <div
            className="card-chunky animate-pop-in w-full max-w-md rounded-3xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-extrabold text-ink">📞 911 Simulation</h3>
              <button
                type="button"
                onClick={closeSim}
                className="btn-bounce card-chunky tap-target flex h-10 w-10 items-center justify-center rounded-full font-display text-lg font-extrabold text-ink"
                aria-label="Close simulation"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <span aria-hidden="true" className="animate-wiggle text-5xl">
                📱
              </span>
              <div className="rounded-2xl rounded-tl-none p-3.5 font-medium text-ink" style={{ backgroundColor: 'var(--sky-soft)' }}>
                <span className="block font-display text-sm font-bold text-ink-soft">Operator</span>
                “9-1-1, what’s your emergency?”
              </div>
            </div>

            {simStep >= 1 && (
              <div className="animate-slide-up mt-3 flex items-center justify-end gap-3">
                <div className="rounded-2xl rounded-tr-none p-3.5 font-medium text-ink" style={{ backgroundColor: 'var(--mint-soft)' }}>
                  <span className="block font-display text-sm font-bold text-ink-soft">You</span>
                  “My name is <strong>[your name]</strong>.”
                </div>
                <span aria-hidden="true" className="text-4xl">
                  🧒
                </span>
              </div>
            )}
            {simStep >= 2 && (
              <div className="animate-slide-up mt-3 flex items-center justify-end gap-3">
                <div className="rounded-2xl rounded-tr-none p-3.5 font-medium text-ink" style={{ backgroundColor: 'var(--mint-soft)' }}>
                  <span className="block font-display text-sm font-bold text-ink-soft">You</span>
                  “I live at <strong>[your address]</strong>.”
                </div>
                <span aria-hidden="true" className="text-4xl">
                  🧒
                </span>
              </div>
            )}
            {simStep >= 3 && (
              <div className="animate-slide-up mt-3 flex items-center justify-end gap-3">
                <div className="rounded-2xl rounded-tr-none p-3.5 font-medium text-ink" style={{ backgroundColor: 'var(--mint-soft)' }}>
                  <span className="block font-display text-sm font-bold text-ink-soft">You</span>
                  “<strong>[What happened]</strong> — please send help!”
                </div>
                <span aria-hidden="true" className="text-4xl">
                  🧒
                </span>
              </div>
            )}
            {simStep >= 4 && (
              <div className="animate-slide-up mt-3 flex items-center gap-3">
                <span aria-hidden="true" className="text-4xl">
                  📱
                </span>
                <div className="rounded-2xl rounded-tl-none p-3.5 font-medium text-ink" style={{ backgroundColor: 'var(--sky-soft)' }}>
                  <span className="block font-display text-sm font-bold text-ink-soft">Operator</span>
                  “Help is on the way! Stay on the line until I say goodbye.”
                </div>
              </div>
            )}

            {!simDone ? (
              <div className="mt-5">
                <p className="text-center text-sm font-semibold text-ink-soft">
                  {simStep === 0
                    ? 'Tap “I’m ready!” and say your line out loud!'
                    : 'Great job! Tap to say the next line.'}
                </p>
                <button
                  type="button"
                  onClick={nextSimStep}
                  className="btn-bounce tap-target mt-3 w-full rounded-2xl px-6 py-4 font-display text-xl font-extrabold text-white shadow-btn"
                  style={{ backgroundColor: 'var(--coral)' }}
                >
                  {simStep === 0 ? '🗣️ I’m ready!' : simStep < 4 ? 'Next line ➡️' : '✅ Finish the call'}
                </button>
              </div>
            ) : (
              <p className="animate-pop-in mt-5 rounded-2xl p-4 text-center font-display text-xl font-extrabold text-ink" style={{ backgroundColor: 'var(--mint-soft)' }}>
                🎉 You did it! Remember: name, address, what happened!
              </p>
            )}
          </div>
        </div>
      )}
    </PageShell>
  )
}
