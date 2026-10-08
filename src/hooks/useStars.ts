import { useCallback, useEffect, useRef, useState } from 'react'
import type { LessonId } from '../types'
import { STAR_KEY, loadStars, saveStars } from '../utils/storage'

export function useStars() {
  const [stars, setStars] = useState<Set<LessonId>>(loadStars)
  const previous = useRef<Set<LessonId>>(stars)

  const earnStar = useCallback((lesson: LessonId) => {
    setStars((prev) => (prev.has(lesson) ? prev : new Set(prev).add(lesson)))
  }, [])

  const mergeStars = useCallback((remote: ReadonlySet<LessonId>) => {
    setStars((prev) => {
      const missing = [...remote].filter((lesson) => !prev.has(lesson))
      if (missing.length === 0) return prev
      const merged = new Set(prev)
      for (const lesson of missing) merged.add(lesson)
      return merged
    })
  }, [])

  useEffect(() => {
    if (previous.current !== stars) {
      saveStars(stars)
      previous.current = stars
    }
  }, [stars])

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key === STAR_KEY) {
        setStars(loadStars())
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return { stars, earnStar, mergeStars }
}
