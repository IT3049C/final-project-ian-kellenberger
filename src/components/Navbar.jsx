import React from 'react'
import { Link } from 'react-router-dom'
import NameCapture from './NameCapture'

export default function Navbar() {
  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
      <h1 style={{ display: 'inline-block', margin: 0 }}>GameHub</h1>
      <nav style={{ display: 'inline-block', marginLeft: '1rem' }}>
        <Link to="/">Hub</Link>
        {' | '}
        <Link to="/rps">RPS</Link>
        {' | '}
        <Link to="/tictactoe">Tic Tac Toe</Link>
        {' | '}
        <Link to="/hangman">Hangman</Link>
        {' | '}
        <Link to="/wordle">Wordle</Link>
        {' | '}
        <Link to="/multiplayer">Multiplayer</Link>
      </nav>
      <NameCapture />
    </header>
  )
}
