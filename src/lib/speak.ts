import { safeGet, safeSet } from '../utils/storage'

export const VOICE_STORAGE_KEY = 'lha-voice'

let enabled: boolean | null = null

export function voiceEnabled(): boolean {
  if (enabled === null) enabled = safeGet(VOICE_STORAGE_KEY) !== 'off'
  return enabled
}

export function setVoiceEnabled(on: boolean): void {
  enabled = on
  safeSet(VOICE_STORAGE_KEY, on ? 'on' : 'off')
}

const CHILD_VOICE_HINTS = /child|kid|junior|nicky|kiki|baby|small|young|girl|boy/i
const FEMALE_VOICE_HINTS =
  /female|woman|girl|samantha|zira|hazel|karen|moira|susan|victoria|ava|aria|jenny|emma|salli|joanna|amy|kendra|kimberly|tessa|serena|allison|melina|natasha/i

let cachedVoices: SpeechSynthesisVoice[] | null = null

function getVoices(): SpeechSynthesisVoice[] {
  if (!('speechSynthesis' in window)) return []
  if (cachedVoices === null) {
    cachedVoices = window.speechSynthesis.getVoices()
    window.speechSynthesis.addEventListener('voiceschanged', () => {
      cachedVoices = window.speechSynthesis.getVoices()
    })
  }
  return cachedVoices
}

function pickChildVoice(): SpeechSynthesisVoice | null {
  const english = getVoices().filter((voice) => voice.lang.toLowerCase().startsWith('en'))
  return (
    english.find((voice) => CHILD_VOICE_HINTS.test(voice.name)) ??
    english.find((voice) => FEMALE_VOICE_HINTS.test(voice.name)) ??
    english[0] ??
    null
  )
}

export const CHILD_RATE = 1.2
export const CHILD_PITCH = 1.6

interface SpeakOptions {
  rate?: number
  pitch?: number
  onDone?: () => void
}

export function speak(text: string, options: SpeakOptions = {}): void {
  if (!voiceEnabled() || !('speechSynthesis' in window)) {
    options.onDone?.()
    return
  }
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = options.rate ?? CHILD_RATE
  utterance.pitch = options.pitch ?? CHILD_PITCH
  utterance.volume = 1
  const voice = pickChildVoice()
  if (voice) utterance.voice = voice
  utterance.onend = options.onDone ?? null
  utterance.onerror = options.onDone ?? null
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utterance)
}

export function stopSpeaking(): void {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel()
}
