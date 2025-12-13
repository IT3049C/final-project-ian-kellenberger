import React from 'react'
import { Link } from 'react-router-dom'
import NameCapture from './NameCapture'

export default function Navbar() {
  return (
    <header style={{ display: 'flex', alignItems: 'center', padding: '0 2rem' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 style={{ margin: 0 }}>🎮 GameHub</h1>
      </Link>
      <nav style={{ marginLeft: '2rem', flex: 1 }}>
        <Link to="/">Hub</Link>
        <Link to="/rps">RPS</Link>
        <Link to="/tictactoe">Tic Tac Toe</Link>
        <Link to="/hangman">Hangman</Link>
        <Link to="/wordle">Wordle</Link>
<<<<<<< HEAD
=======
        <Link to="/multiplayer">Multiplayer</Link>
>>>>>>> parent of 6338697 (games implemented and multiplater added to tictactoe)
      </nav>
      <NameCapture />
    </header>
  )
}
