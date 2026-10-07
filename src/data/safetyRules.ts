export interface SafetyRule {
  emoji: string
  title: string
  detail: string
  color: string
  soft: string
}

export const SAFETY_RULES: SafetyRule[] = [
  {
    emoji: '🙅',
    title: 'Never talk to strangers when you’re alone',
    detail: 'If a stranger talks to you and no trusted grown-up is with you, you don’t have to answer.',
    color: 'var(--coral)',
    soft: 'var(--coral-soft)',
  },
  {
    emoji: '🍬',
    title: 'Never take candy, gifts, or toys',
    detail: 'Even if it looks yummy or fun, politely say “No, thank you” and walk away.',
    color: 'var(--sunny)',
    soft: 'var(--sunny-soft)',
  },
  {
    emoji: '🚗',
    title: 'Never get into a car or go anywhere',
    detail: 'Not even if they say “Your mom said to come with me.” A safe grown-up would never do that.',
    color: 'var(--grape)',
    soft: 'var(--grape-soft)',
  },
  {
    emoji: '🏃',
    title: 'Run to a trusted adult and TELL them',
    detail: 'Tell a parent, teacher, or helper RIGHT AWAY. Telling is not tattling — telling keeps you safe!',
    color: 'var(--mint)',
    soft: 'var(--mint-soft)',
  },
]

export interface SafetyStep {
  emoji: string
  label: string
}

export const SAFETY_STEPS: SafetyStep[] = [
  { emoji: '📣', label: 'Say NO!' },
  { emoji: '🏃', label: 'RUN away!' },
  { emoji: '🗣️', label: 'TELL a grown-up!' },
]

export interface StrangerQuiz {
  question: string
  options: { text: string; correct: boolean }[]
  praise: string
  color: string
  soft: string
}

export const STRANGER_QUIZ: StrangerQuiz = {
  question: 'A stranger says “I have a cute puppy in my car. Want to see it?” What do you do?',
  options: [
    { text: 'Say “No!” and run to tell your grown-up', correct: true },
    { text: 'Peek at the puppy — it’s just for a second', correct: false },
    { text: 'Walk with them if they know your name', correct: false },
  ],
  praise: 'Super safe choice! You remembered: never go with a stranger — run and TELL!',
  color: 'var(--coral)',
  soft: 'var(--coral-soft)',
}
