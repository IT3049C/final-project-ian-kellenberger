export default function decideWinner(player, cpu) {
  if (!player || !cpu) return '—'
  if (player === cpu) return 'Draw'
  const wins =
    (player === 'Rock' && cpu === 'Scissors') ||
    (player === 'Paper' && cpu === 'Rock') ||
    (player === 'Scissors' && cpu === 'Paper')
  return wins ? 'You win!' : 'You lose!'
}
