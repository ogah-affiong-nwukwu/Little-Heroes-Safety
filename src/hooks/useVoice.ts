import { useCallback, useEffect, useRef, useState } from 'react'
import { VOICE_STORAGE_KEY, setVoiceEnabled, speak, voiceEnabled } from '../lib/speak'

export function useVoice() {
  const [voice, setVoice] = useState<boolean>(voiceEnabled)
  const previous = useRef<boolean>(voice)

  useEffect(() => {
    if (previous.current !== voice) {
      setVoiceEnabled(voice)
      if (voice) speak('Hi there, little hero!')
      else if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    }
    previous.current = voice
  }, [voice])

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key === VOICE_STORAGE_KEY) {
        setVoice(event.newValue !== 'off')
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const toggleVoice = useCallback(() => {
    setVoice((current) => !current)
  }, [])

  return { voice, toggleVoice }
}
