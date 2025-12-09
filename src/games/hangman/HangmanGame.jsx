import React, { useState } from 'react'
import usePlayer from '../../app/usePlayer'
import { getRandomHangmanWord } from './words'

const MAX_WRONG = 6

export default function HangmanGame() {
	const { playerName } = usePlayer()
	const [word, setWord] = useState(() => getRandomHangmanWord())
	const [wrong, setWrong] = useState(0)
	const [guessed, setGuessed] = useState(new Set())
	const [status, setStatus] = useState('—')

	const masked = word.split('').map((c) => (guessed.has(c) ? c : '—')).join('')

	function guess(ch) {
		if (status !== '—') return
		if (guessed.has(ch)) return
		const next = new Set(guessed)
		next.add(ch)
		setGuessed(next)
		if (!word.includes(ch)) {
			const w = wrong + 1
			setWrong(w)
			if (w >= MAX_WRONG) setStatus('You lose!')
		} else {
			if (word.split('').every((c) => next.has(c))) setStatus('You win!')
		}
	}

	function reset() {
		setWord(getRandomHangmanWord())
		setWrong(0)
		setGuessed(new Set())
		setStatus('—')
	}

	const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

	return (
		<section aria-label="Hangman game" className="game-container">
			<h2>Hangman</h2>
			<p aria-live="polite">{playerName ? `Player: ${playerName}` : 'Player: —'}</p>

			<div style={{ margin: '1rem 0' }}>
				<p role="status" aria-label="Game status">Result: {status}</p>
				<p>Wrong guesses: {wrong} / {MAX_WRONG}</p>
				<p style={{ fontSize: '1.5rem', letterSpacing: '0.25rem' }}>{masked}</p>
			</div>

			<div role="group" aria-label="letters" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
				{alphabet.map((ch) => (
					<button
						key={ch}
						onClick={() => guess(ch)}
						aria-label={`letter-${ch}`}
						disabled={guessed.has(ch) || status !== '—'}
						style={{ width: 36, height: 36 }}
					>
						{ch}
					</button>
				))}
			</div>

			<div style={{ marginTop: '1rem' }}>
				<button aria-label="Reset game" onClick={reset}>Reset</button>
			</div>
		</section>
	)
}
