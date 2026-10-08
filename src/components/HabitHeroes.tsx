import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { speak, stopSpeaking } from '../lib/speak'

interface Habit {
  id: string
  title: string
  description: string
  illustration: string
  fallbackIcon: string
  iconBg: string
}

const MASCOT_IMAGE = '/LittleHeroes.png'
const MASCOT_FALLBACK = '🦁'

const HABITS: Habit[] = [
  {
    id: 'wash-hands',
    title: 'Wash Hands',
    description: 'Scrub with soap for twenty seconds to wash the germs away.',
    illustration: '/assets/actions/wash-hands.svg',
    fallbackIcon: '🧼',
    iconBg: '#4D96FF',
  },
  {
    id: 'look-both-ways',
    title: 'Look Both Ways',
    description: 'Stop, look left, then right, before you cross the street.',
    illustration: '/assets/actions/look-both-ways.svg',
    fallbackIcon: '🚦',
    iconBg: '#FFC928',
  },
  {
    id: 'stranger-danger',
    title: 'Stranger Danger',
    description: 'Never go anywhere with someone you do not know.',
    illustration: '/assets/actions/stranger-danger.svg',
    fallbackIcon: '🙅',
    iconBg: '#FF5C8A',
  },
  {
    id: 'drink-water',
    title: 'Drink Water',
    description: 'Drink plenty of water every day to stay strong and healthy.',
    illustration: '/assets/actions/drink-water.svg',
    fallbackIcon: '💧',
    iconBg: '#35C759',
  },
  {
    id: 'wear-helmet',
    title: 'Wear a Helmet',
    description: 'Always wear your helmet when you ride your bike or scooter.',
    illustration: '/assets/actions/wear-helmet.svg',
    fallbackIcon: '🪖',
    iconBg: '#FF8A3D',
  },
  {
    id: 'ask-for-help',
    title: 'Ask for Help',
    description: 'If you feel scared or lost, ask a grown-up you trust for help.',
    illustration: '/assets/actions/ask-for-help.svg',
    fallbackIcon: '🙋',
    iconBg: '#8B5CF6',
  },
]

const HELLO_TEXT =
  'Hello, little hero! Welcome to Little Heroes. Tap any card to hear a friendly safety tip!'

interface IllustrationProps {
  src: string
  alt: string
  emoji: string
  className?: string
  style?: CSSProperties
}

function Illustration({ src, alt, emoji, className = '', style }: IllustrationProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span aria-hidden="true" className={className} style={style}>
        {emoji}
      </span>
    )
  }

  return <img src={src} alt={alt} className={className} style={style} onError={() => setFailed(true)} />
}

interface HabitCardProps {
  habit: Habit
  speaking: boolean
  onSpeak: (habit: Habit) => void
}

function HabitCard({ habit, speaking, onSpeak }: HabitCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSpeak(habit)}
      aria-label={`Hear about ${habit.title}`}
      className={`habit-card habit-press w-full rounded-3xl p-6 text-left sm:p-8 ${speaking ? 'habit-speaking' : ''}`}
    >
      <span
        aria-hidden="true"
        className="flex h-24 w-24 items-center justify-center rounded-3xl p-4 text-5xl sm:h-28 sm:w-28 sm:text-6xl"
        style={{ backgroundColor: habit.iconBg }}
      >
        <Illustration
          src={habit.illustration}
          alt=""
          emoji={habit.fallbackIcon}
          className="h-full w-full object-contain"
        />
      </span>
      <span className="mt-5 block text-2xl font-extrabold text-slate-800">{habit.title}</span>
      <span className="mt-2 block text-base leading-relaxed text-slate-500">{habit.description}</span>
      <span
        className={`mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
          speaking ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-600'
        }`}
      >
        {speaking ? '🔊 Speaking…' : '🔈 Tap to Hear'}
      </span>
    </button>
  )
}

export function HabitHeroes() {
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  const token = useRef(0)

  const speakOnce = useCallback((id: string, text: string) => {
    token.current += 1
    const current = token.current
    setSpeakingId(id)
    speak(text, {
      onDone: () => {
        if (token.current === current) setSpeakingId(null)
      },
    })
  }, [])

  useEffect(() => {
    return () => stopSpeaking()
  }, [])

  const activeHabit = HABITS.find((habit) => habit.id === speakingId)

  return (
    <div className="habit-heroes min-h-screen w-full font-display text-white">
      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:pb-24 lg:pt-10">
        <nav className="habit-card flex items-center justify-between gap-3 rounded-3xl px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <Illustration
              src={MASCOT_IMAGE}
              alt="Little Hero mascot"
              emoji={MASCOT_FALLBACK}
              className="h-11 w-11 rounded-2xl bg-sky-100 object-contain p-1"
            />
            <span className="text-xl font-extrabold text-slate-800 sm:text-2xl">Little Heroes</span>
          </div>
          <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-700 sm:text-base">
            ⭐ 6 Super Habits
          </span>
        </nav>

        <header className="habit-card mt-6 rounded-3xl p-8 sm:p-12">
          <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:gap-10 sm:text-left">
            <div className="flex w-full max-w-xs shrink-0 flex-col items-center gap-4 sm:w-auto">
              {activeHabit ? (
                <div
                  key={activeHabit.id}
                  className="habit-mascot animate-pop-in flex items-center justify-center rounded-[2rem] p-6 sm:p-8"
                  style={{ backgroundColor: activeHabit.iconBg }}
                >
                  <Illustration
                    src={activeHabit.illustration}
                    alt={activeHabit.title}
                    emoji={activeHabit.fallbackIcon}
                    className="h-full w-full object-contain text-7xl"
                  />
                </div>
              ) : (
                <Illustration
                  src={MASCOT_IMAGE}
                  alt="Little Hero mascot"
                  emoji={MASCOT_FALLBACK}
                  className="habit-mascot animate-floaty object-contain drop-shadow-xl"
                />
              )}
              {activeHabit ? (
                <span className="animate-pop-in inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2 text-base font-extrabold text-slate-700">
                  {activeHabit.fallbackIcon} {activeHabit.title}!
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-5 py-2 text-sm font-bold text-sky-700">
                  {MASCOT_FALLBACK} Your friendly mascot
                </span>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold leading-tight text-slate-800 sm:text-4xl">
                {activeHabit ? activeHabit.title : 'Welcome, Little Hero!'}
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-slate-500">
                Tap any card and your hero friend will show you the super move and say it out loud!
              </p>
              <button
                type="button"
                onClick={() => speakOnce('hello', HELLO_TEXT)}
                className="btn-bounce mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-extrabold text-white shadow-lg"
                style={{ backgroundColor: '#4D96FF' }}
              >
                {speakingId === 'hello' ? '🔊 Speaking…' : '🔊 Say hello!'}
              </button>
            </div>
          </div>
        </header>

        <section aria-label="Safety habits" className="mt-10">
          <h2 className="text-center text-2xl font-extrabold sm:text-3xl">Pick a habit, hero!</h2>
          <div className="habit-grid mt-8">
            {HABITS.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                speaking={speakingId === habit.id}
                onSpeak={(picked) => speakOnce(picked.id, `${picked.title}. ${picked.description}`)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
