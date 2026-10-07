import { useCallback, useEffect, useRef, useState } from 'react'
import type { Theme } from '../types'
import { THEME_KEY, loadTheme, saveTheme } from '../utils/storage'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(loadTheme)
  const lastWritten = useRef<Theme | null>(null)

  useEffect(() => {
    const root = document.documentElement
    const isDark = theme === 'dark'
    if (root.classList.contains('dark-theme') !== isDark) {
      root.classList.toggle('dark-theme', isDark)
    }
    if (lastWritten.current !== theme) {
      saveTheme(theme)
      lastWritten.current = theme
    }
  }, [theme])

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key === THEME_KEY && (event.newValue === 'dark' || event.newValue === 'light')) {
        setTheme(event.newValue)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }, [])

  return { theme, toggleTheme }
}
