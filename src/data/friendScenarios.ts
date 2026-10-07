export interface FriendScenario {
  emoji: string
  question: string
  options: string[]
  correct: number
  praise: string
  hint: string
  color: string
  soft: string
}

export const SCENARIOS: FriendScenario[] = [
  {
    emoji: '😢',
    question: 'Your friend is sad. What do you do?',
    options: ['Laugh at them', 'Ask what’s wrong and offer a hug', 'Walk away and ignore them'],
    correct: 1,
    praise: 'Being kind and listening makes sad hearts feel better. You’re a true friend!',
    hint: 'Friends show they care when someone feels down. Which one shows caring?',
    color: 'var(--mint)',
    soft: 'var(--mint-soft)',
  },
  {
    emoji: '🧒',
    question: 'A new kid wants to play with you. What do you do?',
    options: ['Say “No! This is MY game!”', 'Hide the ball', 'Welcome them and share your toys'],
    correct: 2,
    praise: 'Including everyone makes games more fun. Hooray for new friends!',
    hint: 'Think about how YOU would feel on your first day somewhere new.',
    color: 'var(--sky)',
    soft: 'var(--sky-soft)',
  },
  {
    emoji: '🍪',
    question: 'There is only one cookie left and your friend wants it too. What do you do?',
    options: ['Grab it first — fastest wins!', 'Suggest splitting it half and half', 'Cry until you get it'],
    correct: 1,
    praise: 'Sharing is caring! Half a cookie each means two happy tummies.',
    hint: 'What would make BOTH of you happy at the same time?',
    color: 'var(--sunny)',
    soft: 'var(--sunny-soft)',
  },
  {
    emoji: '🗣️',
    question: 'Someone calls your friend a mean name. What do you do?',
    options: ['Say kind words and tell a grown-up', 'Laugh along with them', 'Call the other kid a mean name back'],
    correct: 0,
    praise: 'Standing up with kind words and getting help from a grown-up is superhero brave!',
    hint: 'Heroes protect people with kind words, not mean ones.',
    color: 'var(--grape)',
    soft: 'var(--grape-soft)',
  },
  {
    emoji: '🛝',
    question: 'You and your friend both want the swing. What do you do?',
    options: ['Push them off — you were first!', 'Take turns: you swing, then they swing', 'Sit down and pout'],
    correct: 1,
    praise: 'Taking turns is fair play! Everyone gets a turn and everyone smiles.',
    hint: 'The fairest way means EVERYONE gets to play. Which one is fair?',
    color: 'var(--bubble)',
    soft: 'var(--bubble-soft)',
  },
]

export const KIND_WORDS = ['“Can I play with you?”', '“You go first!”', '“I like your drawing!”', '“Want to share?”']
