import { useCallback, useEffect, useState } from 'react'
import { TOPICS } from '../data/topics'
import type { ViewId } from '../types'
import { playTap } from '../utils/sound'

const BASE_TITLE = 'Little Heroes Safety & Manners Academy'
const VIEW_IDS: readonly string[] = ['home', ...TOPICS.map((topic) => topic.id)]

function isViewId(value: unknown): value is ViewId {
  return typeof value === 'string' && VIEW_IDS.includes(value)
}

function readHistoryView(): ViewId {
  const state = window.history.state as { view?: unknown } | null
  return state?.view && isViewId(state.view) ? state.view : 'home'
}

export function useRouter() {
  const [view, setView] = useState<ViewId>(readHistoryView)

  const navigate = useCallback((next: ViewId) => {
    setView(next)
    playTap()
    try {
      window.history.pushState({ view: next }, '')
    } catch {
      /* history may be unavailable (file://, sandboxed webviews) — state routing still works */
    }
  }, [])

  useEffect(() => {
    function onPopState(event: PopStateEvent) {
      const state = event.state as { view?: unknown } | null
      setView(state?.view && isViewId(state.view) ? state.view : 'home')
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    const topic = TOPICS.find((t) => t.id === view)
    document.title = topic ? `${topic.title} — Little Heroes Academy` : BASE_TITLE
  }, [view])

  return { view, navigate }
}
