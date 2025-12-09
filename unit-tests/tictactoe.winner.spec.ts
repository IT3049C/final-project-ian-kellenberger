import { describe, it, expect } from 'vitest'
import winnerFromBoard from '../src/games/tictactoe/winner'

describe('tictactoe winnerFromBoard', () => {
  it('returns — for empty board', () => {
    expect(winnerFromBoard(['', '', '', '', '', '', '', '', ''])).toBe('—')
  })

  it('detects X win', () => {
    const board = ['X', 'X', 'X', '', '', '', '', '', '']
    expect(winnerFromBoard(board)).toBe('X')
  })

  it('detects O win', () => {
    const board = ['', '', '', 'O', 'O', 'O', '', '', '']
    expect(winnerFromBoard(board)).toBe('O')
  })

  it('detects draw', () => {
    const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']
    expect(winnerFromBoard(board)).toBe('Draw')
  })
})
