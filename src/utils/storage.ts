import { TOPICS } from '../data/topics'
import type { LessonId, Theme } from '../types'

export const STAR_KEY = 'lha-stars'
export const THEME_KEY = 'lha-theme'

export function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

export function safeSet(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* ignore */
  }
}

export function loadStars(): Set<LessonId> {
  const raw = safeGet(STAR_KEY)
  if (!raw) return new Set()
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set()
    const validLessons = new Set<string>(TOPICS.map((topic) => topic.id))
    return new Set(parsed.filter((value): value is LessonId => typeof value === 'string' && validLessons.has(value)))
  } catch {
    return new Set()
  }
}

export function saveStars(stars: ReadonlySet<LessonId>): void {
  safeSet(STAR_KEY, JSON.stringify([...stars]))
}

export function loadTheme(): Theme {
  const saved = safeGet(THEME_KEY)
  if (saved === 'dark' || saved === 'light') return saved
  try {
    if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
  } catch {
    /* ignore */
  }
  return 'light'
}

export function saveTheme(theme: Theme): void {
  safeSet(THEME_KEY, theme)
}
