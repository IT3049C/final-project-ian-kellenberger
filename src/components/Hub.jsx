import React from 'react'
import { Link } from 'react-router-dom'

const games = [
  { path: '/rps', name: 'Rock Paper Scissors', icon: '✋', desc: 'Beat the CPU in a classic game of RPS' },
  { path: '/tictactoe', name: 'Tic Tac Toe', icon: '⭕', desc: 'Strategic 3x3 grid game' },
  { path: '/hangman', name: 'Hangman', icon: '🎮', desc: 'Guess the word before you run out of tries' },
  { path: '/wordle', name: 'Wordle', icon: '📝', desc: 'Guess the 5-letter word in 6 attempts' },
<<<<<<< HEAD
  { path: '/room/create', name: 'Create Room', icon: '👥', desc: 'Create a multiplayer room and invite a friend' },
  { path: '/room/join', name: 'Join Room', icon: '🔑', desc: 'Join an existing room with a code' },
  // multiplayer removed from hub; multiplayer functionality integrated into Tic Tac Toe
=======
  { path: '/multiplayer', name: 'Multiplayer', icon: '👥', desc: 'Play with other players online' }
>>>>>>> parent of 6338697 (games implemented and multiplater added to tictactoe)
]

export default function Hub() {
  return (
    <section className="hub-container">
      <h2>Choose Your Game</h2>
      <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>
        Pick a game below to get started
      </p>
      
      <div className="game-grid">
        {games.map((game) => (
          <Link key={game.path} to={game.path} style={{ textDecoration: 'none' }}>
            <div className="game-card">
              <span className="game-card-icon">{game.icon}</span>
              <h3>{game.name}</h3>
              <p>{game.desc}</p>
              <button type="button">Play Now</button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
