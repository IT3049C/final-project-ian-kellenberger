// Hangman word list - varied difficulty and themes
export const HANGMAN_WORDS = [
  // Animals
  'elephant',
  'penguin',
  'giraffe',
  'dolphin',
  'butterfly',
  'squirrel',
  'peacock',
  'cheetah',
  'porcupine',
  'flamingo',
  
  // Technology
  'javascript',
  'database',
  'algorithm',
  'firebase',
  'framework',
  'backend',
  'frontend',
  'compiler',
  'browser',
  'network',
  
  // Food
  'chocolate',
  'hamburger',
  'spaghetti',
  'avocado',
  'broccoli',
  'strawberry',
  'watermelon',
  'pineapple',
  'pizza',
  'sandwich',
  
  // Sports
  'basketball',
  'volleyball',
  'cricket',
  'baseball',
  'badminton',
  'swimming',
  'cycling',
  'skateboard',
  'tennis',
  'archery',
  
  // Nature
  'mountain',
  'volcano',
  'rainbow',
  'thunder',
  'hurricane',
  'glacier',
  'canyon',
  'lagoon',
  'forest',
  'ocean',
  
  // Emotions
  'happiness',
  'courage',
  'patience',
  'kindness',
  'honesty',
  'loyalty',
  'gratitude',
  'humility',
  'sympathy',
  
  // Miscellaneous
  'adventure',
  'mystery',
  'treasure',
  'midnight',
  'journey',
  'fantasy',
  'wisdom',
  'harmony',
  'puzzle',
  'paradise'
]

export function getRandomHangmanWord() {
  return HANGMAN_WORDS[Math.floor(Math.random() * HANGMAN_WORDS.length)]
}
