import { useEffect, useMemo, useState } from 'react'

interface CelebrationProps {
  trigger: number
}

interface BurstPiece {
  id: number
  emoji: string
  dx: number
  dy: number
  size: number
  delay: number
  duration: number
}

interface ConfettiPiece {
  id: number
  left: number
  color: string
  size: number
  delay: number
  duration: number
  round: boolean
}

interface Pieces {
  burst: BurstPiece[]
  confetti: ConfettiPiece[]
}

const CONFETTI_COLORS = ['#ffc93c', '#55c6f7', '#ff6b6b', '#45c9b1', '#ff8fb1', '#9b6bf2', '#ff9f45']
const BURST_EMOJIS = ['⭐', '🌟', '✨', '💛', '🎉', '🏆']

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function makePieces(trigger: number): Pieces {
  const rand = mulberry32(trigger * 7919 + 13)
  const burst = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2
    const dist = 110 + rand() * 140
    return {
      id: trigger * 100 + i,
      emoji: BURST_EMOJIS[i % BURST_EMOJIS.length],
      dx: Math.cos(angle) * dist,
      dy: Math.sin(angle) * dist,
      size: 22 + rand() * 22,
      delay: rand() * 0.08,
      duration: 0.8 + rand() * 0.4,
    }
  })
  const confetti = Array.from({ length: 36 }, (_, i) => ({
    id: trigger * 1000 + i,
    left: rand() * 100,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size: 7 + rand() * 8,
    delay: rand() * 0.5,
    duration: 1.4 + rand() * 1.1,
    round: rand() > 0.5,
  }))
  return { burst, confetti }
}

export function Celebration({ trigger }: CelebrationProps) {
  const [dismissed, setDismissed] = useState(0)
  const pieces = useMemo(() => (trigger > 0 ? makePieces(trigger) : null), [trigger])

  useEffect(() => {
    if (trigger === 0) return undefined
    const t = setTimeout(() => setDismissed(trigger), 1800)
    return () => clearTimeout(t)
  }, [trigger])

  if (trigger === 0 || trigger === dismissed || !pieces) return null

  return (
    <div aria-hidden="true">
      {pieces.burst.map((p) => (
        <span
          key={p.id}
          className="burst-piece"
          style={
            {
              left: '50%',
              top: '45%',
              fontSize: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              '--dx': `${p.dx}px`,
              '--dy': `${p.dy}px`,
            } as React.CSSProperties
          }
        >
          {p.emoji}
        </span>
      ))}
      {pieces.confetti.map((c) => (
        <span
          key={c.id}
          className="confetti-piece"
          style={{
            left: `${c.left}%`,
            width: c.size,
            height: c.round ? c.size : c.size * 1.6,
            backgroundColor: c.color,
            borderRadius: c.round ? '50%' : '3px',
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
