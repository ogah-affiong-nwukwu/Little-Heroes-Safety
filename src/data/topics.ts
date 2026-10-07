import type { LessonId } from '../types'

export interface TopicCard {
  id: LessonId
  emoji: string
  title: string
  subtitle: string
  color: string
  soft: string
  sticker: string
}

export const TOPICS: TopicCard[] = [
  {
    id: 'magic',
    emoji: '🪄',
    title: 'The Five Magic Words',
    subtitle: 'Please, Thank You & Politeness',
    color: 'var(--grape)',
    soft: 'var(--grape-soft)',
    sticker: '✨',
  },
  {
    id: 'clean',
    emoji: '🫧',
    title: 'Sparkling Clean',
    subtitle: 'Cleanliness & Hygiene',
    color: 'var(--sky)',
    soft: 'var(--sky-soft)',
    sticker: '💧',
  },
  {
    id: 'friends',
    emoji: '🤝',
    title: 'How to Be a Great Friend',
    subtitle: 'Sharing & Kindness',
    color: 'var(--mint)',
    soft: 'var(--mint-soft)',
    sticker: '💛',
  },
  {
    id: 'stranger',
    emoji: '🛡️',
    title: 'Stranger Danger',
    subtitle: 'Stay Safe Rules',
    color: 'var(--coral)',
    soft: 'var(--coral-soft)',
    sticker: '🚫',
  },
  {
    id: 'emergency',
    emoji: '🚨',
    title: 'Super Emergency 911',
    subtitle: 'Calling for Help',
    color: 'var(--tangerine)',
    soft: 'var(--tangerine-soft)',
    sticker: '📞',
  },
]
