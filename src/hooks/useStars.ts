import { useCallback, useEffect, useRef, useState } from 'react'
import type { LessonId } from '../types'
import { STAR_KEY, loadStars, saveStars } from '../utils/storage'

export function useStars() {
  const [stars, setStars] = useState<Set<LessonId>>(loadStars)
  const previous = useRef<Set<LessonId>>(stars)

  const earnStar = useCallback((lesson: LessonId) => {
    setStars((prev) => (prev.has(lesson) ? prev : new Set(prev).add(lesson)))
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

  return { stars, earnStar }
}
