import { safeGet, safeSet } from './storage'

let ctx: AudioContext | null = null

export const SOUND_STORAGE_KEY = 'lha-sound'

export function soundEnabled(): boolean {
  return safeGet(SOUND_STORAGE_KEY) !== 'off'
}

export function setSoundEnabled(on: boolean): void {
  safeSet(SOUND_STORAGE_KEY, on ? 'on' : 'off')
}

function getCtx(): AudioContext | null {
  try {
    if (!ctx) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!Ctor) return null
      ctx = new Ctor()
    }
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
  } catch {
    return null
  }
}

function tone(
  freq: number,
  startDelay: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume = 0.16,
): void {
  if (!soundEnabled()) return
  const audio = getCtx()
  if (!audio) return
  const t0 = audio.currentTime + startDelay
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  gain.gain.setValueAtTime(0.0001, t0)
  gain.gain.exponentialRampToValueAtTime(volume, t0 + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)
  osc.connect(gain).connect(audio.destination)
  osc.start(t0)
  osc.stop(t0 + duration + 0.05)
}

export function playTap(): void {
  tone(660, 0, 0.12, 'triangle', 0.08)
}

export function playFlip(): void {
  tone(392, 0, 0.1, 'triangle', 0.08)
  tone(523, 0.07, 0.12, 'triangle', 0.08)
}

export function playCheck(): void {
  tone(587, 0, 0.1, 'sine', 0.12)
  tone(880, 0.08, 0.14, 'sine', 0.12)
}

export function playCorrect(): void {
  tone(523, 0, 0.14, 'triangle', 0.14)
  tone(659, 0.09, 0.14, 'triangle', 0.14)
  tone(784, 0.18, 0.16, 'triangle', 0.14)
  tone(1047, 0.27, 0.28, 'sine', 0.16)
}

export function playWrong(): void {
  tone(220, 0, 0.18, 'sawtooth', 0.06)
  tone(185, 0.14, 0.22, 'sawtooth', 0.06)
}

export function playCelebrate(): void {
  const notes = [523, 659, 784, 1047, 784, 1047, 1319]
  notes.forEach((n, i) => tone(n, i * 0.09, 0.22, 'triangle', 0.15))
  tone(1568, notes.length * 0.09, 0.5, 'sine', 0.14)
}

export function playRing(): void {
  tone(880, 0, 0.35, 'square', 0.05)
  tone(880, 0.75, 0.35, 'square', 0.05)
  tone(880, 1.5, 0.35, 'square', 0.05)
}
