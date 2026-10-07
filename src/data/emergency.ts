export interface HelperCard {
  emoji: string
  title: string
  color: string
}

export const HELPERS: HelperCard[] = [
  { emoji: '👮', title: 'Police Officer', color: 'var(--sky)' },
  { emoji: '🚒', title: 'Firefighter', color: 'var(--coral)' },
  { emoji: '🧑‍🚒', title: 'Security Guard', color: 'var(--tangerine)' },
  { emoji: '🧑‍🏫', title: 'Teacher', color: 'var(--grape)' },
  { emoji: '👨‍👩‍👧', title: 'Mom or Dad', color: 'var(--mint)' },
  { emoji: '🧑‍💼', title: 'Store Worker with a Badge', color: 'var(--bubble)' },
]

export interface CallStep {
  emoji: string
  title: string
  detail: string
}

export const CALL_STEPS: CallStep[] = [
  { emoji: '🧘', title: 'Stay Calm', detail: 'Take a deep breath. You’re brave!' },
  { emoji: '📱', title: 'Find a Phone', detail: 'Ask a grown-up or use a phone nearby.' },
  { emoji: '9️⃣', title: 'Dial 9-1-1', detail: 'Press 9, then 1, then 1 again.' },
  { emoji: '🗣️', title: 'Say Your Name', detail: '“My name is ___.”' },
  { emoji: '🏠', title: 'Say Your Address', detail: '“I live at ___.”' },
  { emoji: '❓', title: 'Say What Happened', detail: '“Someone is hurt / there’s a fire / they won’t wake up.”' },
  { emoji: '📞', title: 'Stay on the Line', detail: 'Don’t hang up until the helper says goodbye!' },
]

export interface EmergencyQuizItem {
  emoji: string
  text: string
  emergency: boolean
}

export const EMERGENCY_QUIZ: EmergencyQuizItem[] = [
  { emoji: '🧸', text: 'You lost your favorite toy', emergency: false },
  { emoji: '🔥', text: 'You see a big fire', emergency: true },
  { emoji: '😴', text: 'Someone will not wake up', emergency: true },
  { emoji: '🍕', text: 'You really want pizza', emergency: false },
  { emoji: '🤕', text: 'Someone is hurt very badly', emergency: true },
  { emoji: '👟', text: 'Your shoe is untied', emergency: false },
]
