import React, { useState, useMemo } from 'react'
import usePlayer from '../../app/usePlayer'

const WORDS = ['apple', 'grape', 'train', 'react', 'crazy']
const LEN = 5
const MAX_GUESSES = 6

function scoreGuess(guess, target) {
	// returns array of 'correct'|'present'|'absent'
	const res = Array(LEN).fill('absent')
	const t = target.split('')
	// first pass: correct
	for (let i = 0; i < LEN; i++) {
		if (guess[i] === t[i]) {
			res[i] = 'correct'
			t[i] = null
		}
	}
	// second pass: present
	for (let i = 0; i < LEN; i++) {
		if (res[i] === 'correct') continue
		const idx = t.indexOf(guess[i])
		if (idx >= 0) {
			res[i] = 'present'
			t[idx] = null
		}
	}
	return res
}

export default function WordleGame() {
	const { playerName } = usePlayer()
	const target = useMemo(() => WORDS[Math.floor(Math.random() * WORDS.length)], [])
	const [guesses, setGuesses] = useState([])
	const [input, setInput] = useState('')
	const [status, setStatus] = useState('—')

	function submit() {
		if (status !== '—') return
		if (input.length !== LEN) return
		const guess = input.toLowerCase()
		const scored = scoreGuess(guess, target)
		const next = [...guesses, { guess, scored }]
		setGuesses(next)
		setInput('')
		if (scored.every((s) => s === 'correct')) {
			setStatus('You win!')
		} else if (next.length >= MAX_GUESSES) {
			setStatus(`You lose! (${target})`)
		}
	}

	function reset() {
		setGuesses([])
		setInput('')
		setStatus('—')
	}

	return (
		<section aria-label="Wordle game" className="game-container">
			<h2>Wordle</h2>
			<p aria-live="polite">{playerName ? `Player: ${playerName}` : 'Player: —'}</p>

			<div style={{ margin: '1rem 0' }}>
				<p role="status" aria-label="Game status">Result: {status}</p>
				<div style={{ display: 'grid', gap: 6 }}>
					{Array.from({ length: MAX_GUESSES }).map((_, row) => (
						<div key={row} style={{ display: 'flex', gap: 6 }}>
							{Array.from({ length: LEN }).map((__, col) => {
								const item = guesses[row]
								const ch = item ? item.guess[col] : ''
								const cls = item ? item.scored[col] : ''
								return (
									<div key={col} style={{ width: 40, height: 40, border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', background: cls === 'correct' ? '#6aaa64' : cls === 'present' ? '#c9b458' : '#fff' }}>
										{ch.toUpperCase()}
									</div>
								)
							})}
						</div>
					))}
				</div>
			</div>

			<div>
				<input aria-label="wordle-input" value={input} onChange={(e) => setInput(e.target.value.slice(0, LEN))} />
				<button aria-label="Submit guess" onClick={submit} style={{ marginLeft: 8 }}>Guess</button>
				<button aria-label="Reset game" onClick={reset} style={{ marginLeft: 8 }}>Reset</button>
			</div>
		</section>
	)
}
