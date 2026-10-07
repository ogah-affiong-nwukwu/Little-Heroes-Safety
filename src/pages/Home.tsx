import { Mascot } from '../components/Mascot'
import { TOPICS } from '../data/topics'
import type { ViewId } from '../types'

interface HomeProps {
  onNavigate: (view: ViewId) => void
  stars: number
  totalLessons: number
}

export function Home({ onNavigate, stars, totalLessons }: HomeProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
      <section
        className="hero-banner card-chunky relative mt-6 overflow-hidden p-6 sm:p-10"
        style={{ background: 'linear-gradient(120deg, var(--sunny-soft), var(--sky-soft), var(--bubble-soft))' }}
      >
        <span
          aria-hidden="true"
          className="animate-twinkle absolute left-4 top-4 text-3xl sm:text-4xl"
        >
          ⭐
        </span>
        <span
          aria-hidden="true"
          className="animate-twinkle absolute right-6 top-8 text-2xl sm:text-3xl"
          style={{ animationDelay: '0.6s' }}
        >
          ✨
        </span>
        <span
          aria-hidden="true"
          className="animate-twinkle absolute bottom-6 left-1/3 hidden text-3xl sm:block"
          style={{ animationDelay: '1.1s' }}
        >
          🌈
        </span>

        <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:gap-10 sm:text-left">
          <div className="animate-floaty shrink-0">
            <Mascot size={190} className="drop-shadow-xl" />
          </div>
          <div className="flex-1">
            <p className="font-display text-sm font-bold uppercase tracking-widest text-grape sm:text-base">
              Welcome to the
            </p>
            <h1 className="display-title font-display text-4xl font-extrabold leading-tight text-ink sm:text-6xl">
              Little Heroes
              <span className="block bg-gradient-to-r from-coral via-grape to-sky bg-clip-text text-transparent">
                Safety & Manners Academy
              </span>
            </h1>
            <p className="mt-3 text-lg font-medium text-ink-soft sm:text-xl">
              Learn Magic Words, Safety Rules, and Super-Powers!
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <span className="card-chunky inline-flex items-center gap-2 rounded-full px-5 py-2 font-display text-base font-bold text-ink">
                <span aria-hidden="true">⭐</span>
                {stars} / {totalLessons} Super-Star Missions
              </span>
              <span className="card-chunky inline-flex items-center gap-2 rounded-full px-5 py-2 font-display text-base font-bold text-ink">
                <span aria-hidden="true">👨‍👩‍👧</span>
                For Kids & Parents
              </span>
            </div>
          </div>
        </div>
      </section>

      <h2 className="mt-10 mb-5 text-center font-display text-2xl font-extrabold text-ink sm:text-3xl">
        Pick a Super-Power to Learn! 🎯
      </h2>

      <nav className="menu-grid grid gap-5 sm:gap-6" aria-label="Learning topics">
        {TOPICS.map((topic) => (
          <button
            key={topic.id}
            type="button"
            onClick={() => onNavigate(topic.id)}
            className="card-chunky card-press tap-target group relative flex min-h-52 flex-col items-center justify-center gap-2 overflow-hidden rounded-3xl p-6 text-center"
            style={{ background: `linear-gradient(135deg, ${topic.soft} 0%, var(--surface) 70%)` }}
            aria-label={`Open ${topic.title}`}
          >
            <span
              aria-hidden="true"
              className="absolute right-4 top-3 text-2xl opacity-70 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12"
            >
              {topic.sticker}
            </span>
            <span
              aria-hidden="true"
              className="flex h-20 w-20 items-center justify-center rounded-3xl text-5xl shadow-btn transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
              style={{ backgroundColor: topic.color }}
            >
              {topic.emoji}
            </span>
            <span className="font-display text-2xl font-extrabold text-ink">{topic.title}</span>
            <span className="text-base font-medium text-ink-soft">{topic.subtitle}</span>
            <span
              className="mt-1 inline-block rounded-full px-4 py-1.5 font-display text-sm font-bold text-white transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: topic.color }}
            >
              Let&apos;s Go! →
            </span>
          </button>
        ))}
      </nav>
    </div>
  )
}
