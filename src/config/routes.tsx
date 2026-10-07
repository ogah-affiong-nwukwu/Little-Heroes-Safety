import type { ComponentType } from 'react'
import type { LessonId, LessonPageProps } from '../types'
import { Emergency911 } from '../pages/Emergency911'
import { FriendsPage } from '../pages/FriendsPage'
import { MagicWords } from '../pages/MagicWords'
import { SparklingClean } from '../pages/SparklingClean'
import { StrangerDanger } from '../pages/StrangerDanger'

export const LESSON_PAGES: Record<LessonId, ComponentType<LessonPageProps>> = {
  magic: MagicWords,
  clean: SparklingClean,
  friends: FriendsPage,
  stranger: StrangerDanger,
  emergency: Emergency911,
}
