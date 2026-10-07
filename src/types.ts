export type ViewId = 'home' | 'magic' | 'clean' | 'friends' | 'stranger' | 'emergency'

export type LessonId = Exclude<ViewId, 'home'>

export type Theme = 'light' | 'dark'

export interface LessonPageProps {
  onBack: () => void
  onStarEarned: () => void
  starEarned: boolean
}
