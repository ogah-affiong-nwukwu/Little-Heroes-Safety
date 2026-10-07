import { useCallback, useEffect, useRef, useState } from 'react'
import { SOUND_STORAGE_KEY, playTap, setSoundEnabled, soundEnabled } from '../utils/sound'

export function useSound() {
  const [sound, setSound] = useState<boolean>(soundEnabled)
  const previous = useRef<boolean>(sound)

  useEffect(() => {
    if (previous.current !== sound) {
      setSoundEnabled(sound)
      if (sound) playTap()
    }
    previous.current = sound
  }, [sound])

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key === SOUND_STORAGE_KEY) {
        setSound(event.newValue !== 'off')
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const toggleSound = useCallback(() => {
    setSound((current) => !current)
  }, [])

  return { sound, toggleSound }
}
