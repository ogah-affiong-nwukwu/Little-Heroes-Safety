export interface MagicWord {
  word: string
  emoji: string
  color: string
  soft: string
  scenario: string
  example: string
  tip: string
}

export const MAGIC_WORDS: MagicWord[] = [
  {
    word: 'Please',
    emoji: '🙏',
    color: 'var(--grape)',
    soft: 'var(--grape-soft)',
    scenario: 'You want a cookie or a toy from someone.',
    example: '“Can I have a cookie, please?”',
    tip: 'Adding PLEASE turns a demand into a friendly question. It shows respect!',
  },
  {
    word: 'Thank You',
    emoji: '🌟',
    color: 'var(--sunny)',
    soft: 'var(--sunny-soft)',
    scenario: 'Someone gives you a gift or helps you.',
    example: '“Thank you for helping me find my shoe!”',
    tip: 'Saying THANK YOU makes the helper feel happy and appreciated.',
  },
  {
    word: 'You’re Welcome',
    emoji: '🤗',
    color: 'var(--sky)',
    soft: 'var(--sky-soft)',
    scenario: 'Someone says “Thank you” to you.',
    example: '“You’re welcome! Anytime!”',
    tip: 'Answer with a smile — it’s the polite way to finish a kind exchange.',
  },
  {
    word: 'Excuse Me',
    emoji: '🙋',
    color: 'var(--mint)',
    soft: 'var(--mint-soft)',
    scenario: 'You need to pass by, interrupt, or — oops! — you burp.',
    example: '“Excuse me, may I squeeze past you?”',
    tip: 'EXCUSE ME is the polite way to get attention without grabbing or shouting.',
  },
  {
    word: 'I’m Sorry',
    emoji: '💛',
    color: 'var(--coral)',
    soft: 'var(--coral-soft)',
    scenario: 'You hurt someone’s feelings or made a mistake.',
    example: '“I’m sorry I broke your tower. Can I help rebuild it?”',
    tip: 'Saying I’M SORRY and helping fix it shows a kind, brave heart.',
  },
]
