import React, { useState } from 'react'
import usePlayer from '../../app/usePlayer'
import winnerFromBoard from './winner'

const EMPTY = ''

export default function TicTacToeGame() {
	const { playerName } = usePlayer()
	const [board, setBoard] = useState(Array(9).fill(EMPTY))
	const [status, setStatus] = useState('—')

	function reset() {
		setBoard(Array(9).fill(EMPTY))
		setStatus('—')
	}

	function handlePlayerMove(i) {
		if (board[i] !== EMPTY) return
		if (status !== '—') return

		const next = [...board]
		next[i] = 'X'
		setBoard(next)

		const res = winnerFromBoard(next)
		if (res !== '—') {
			setStatus(res === 'Draw' ? 'Draw' : `${res} wins`)
			return
		}

		// simple CPU: pick a random empty cell
		const emptyIndexes = next.map((v, idx) => (v === EMPTY ? idx : -1)).filter((v) => v >= 0)
		if (emptyIndexes.length === 0) {
			setStatus('Draw')
			return
		}
		const choice = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)]
		const afterCpu = [...next]
		afterCpu[choice] = 'O'
		setBoard(afterCpu)

		const res2 = winnerFromBoard(afterCpu)
		if (res2 !== '—') setStatus(res2 === 'Draw' ? 'Draw' : `${res2} wins`)
	}

	return (
		<section className="game-container" aria-label="Tic Tac Toe">
			<h2>Tic Tac Toe</h2>
			<p aria-live="polite">{playerName ? `Player: ${playerName}` : 'Player: —'}</p>

			<div role="group" aria-label="Board" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 64px)', gap: '8px', margin: '1rem 0' }}>
				{board.map((cell, idx) => (
					<button
						key={idx}
						aria-label={`cell-${idx}`}
						onClick={() => handlePlayerMove(idx)}
						style={{ width: 64, height: 64, fontSize: '1.5rem' }}
					>
						{cell || ' '}
					</button>
				))}
			</div>

			<div style={{ marginTop: '1rem' }}>
				<p role="status" aria-label="Game status">Result: {status}</p>
			</div>

			<button aria-label="Reset game" onClick={reset} style={{ marginTop: '1rem' }}>
				Reset
			</button>
		</section>
	)
}
