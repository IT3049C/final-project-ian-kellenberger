import React from 'react'
import { Link } from 'react-router-dom'

export default function Hub() {
  return (
    <section>
      <h2>Hub</h2>
      <p>Choose a game:</p>
      <ul>
        <li><Link to="/rps">Rock Paper Scissors</Link></li>
        <li><Link to="/tictactoe">Tic Tac Toe</Link></li>
        <li><Link to="/hangman">Hangman</Link></li>
        <li><Link to="/wordle">Wordle</Link></li>
        <li><Link to="/multiplayer">Multiplayer Lobby</Link></li>
      </ul>
    </section>
  )
}
