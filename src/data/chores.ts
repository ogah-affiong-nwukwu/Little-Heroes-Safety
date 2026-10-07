export interface Chore {
  emoji: string
  title: string
  detail: string
  color: string
  soft: string
}

export const CHORES: Chore[] = [
  {
    emoji: '🧼',
    title: 'Wash your hands',
    detail: 'Scrub with soap for 20 seconds — sing “Happy Birthday” twice!',
    color: 'var(--sky)',
    soft: 'var(--sky-soft)',
  },
  {
    emoji: '🦷',
    title: 'Brush your teeth',
    detail: 'Brush every morning and every night, up and down and all around.',
    color: 'var(--mint)',
    soft: 'var(--mint-soft)',
  },
  {
    emoji: '🛁',
    title: 'Bath time!',
    detail: 'A bubbly bath or shower washes away dirt and germs.',
    color: 'var(--bubble)',
    soft: 'var(--bubble-soft)',
  },
  {
    emoji: '🧦',
    title: 'Dirty clothes in the basket',
    detail: 'Socks and shirts go in the laundry basket, not the floor!',
    color: 'var(--grape)',
    soft: 'var(--grape-soft)',
  },
  {
    emoji: '🧸',
    title: 'Tidy your toys',
    detail: 'Put every toy back in its home after playtime.',
    color: 'var(--tangerine)',
    soft: 'var(--tangerine-soft)',
  },
  {
    emoji: '💇',
    title: 'Comb your hair',
    detail: 'Tame those tangles and keep your nails short and clean.',
    color: 'var(--coral)',
    soft: 'var(--coral-soft)',
  },
  {
    emoji: '🍎',
    title: 'Wash fruit before eating',
    detail: 'Rinse fruits and veggies to wash off dirt before you munch.',
    color: 'var(--sunny)',
    soft: 'var(--sunny-soft)',
  },
  {
    emoji: '👕',
    title: 'Wear clean clothes',
    detail: 'Fresh clothes each day help you feel sparkly and comfy.',
    color: 'var(--sky)',
    soft: 'var(--sky-soft)',
  },
]
