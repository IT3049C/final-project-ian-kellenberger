import { describe, it, expect } from 'vitest'
import decideWinner from '../src/games/rps/decideWinner'

describe('decideWinner', () => {
  it('returns — when missing choices', () => {
    expect(decideWinner('', '')).toBe('—')
    expect(decideWinner(null, 'Rock')).toBe('—')
  })

  it('returns Draw for same choices', () => {
    expect(decideWinner('Rock', 'Rock')).toBe('Draw')
    expect(decideWinner('Paper', 'Paper')).toBe('Draw')
  })

  it('correctly identifies wins and losses', () => {
    expect(decideWinner('Rock', 'Scissors')).toBe('You win!')
    expect(decideWinner('Rock', 'Paper')).toBe('You lose!')
    expect(decideWinner('Scissors', 'Paper')).toBe('You win!')
    expect(decideWinner('Paper', 'Scissors')).toBe('You lose!')
  })
})
