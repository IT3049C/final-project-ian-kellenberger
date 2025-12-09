import './App.css'
import './styles/theme.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import RpsGame from './games/rps/RpsGame'
import TicTacToeGame from './games/tictactoe/TicTacToeGame'
import HangmanGame from './games/hangman/HangmanGame'
import WordleGame from './games/wordle/WordleGame'
import MultiplayerLobby from './multiplayer/MultiplayerLobby'
import Hub from './components/Hub'
import Navbar from './components/Navbar'
import { PlayerProvider } from './app/PlayerContext'

function App() {
  return (
    <PlayerProvider>
      <HashRouter>
        <Navbar />

        <main style={{ padding: '1rem' }}>
          <Routes>
            <Route path="/rps" element={<RpsGame />} />
            <Route path="/tictactoe" element={<TicTacToeGame />} />
            <Route path="/hangman" element={<HangmanGame />} />
            <Route path="/wordle" element={<WordleGame />} />
            <Route path="/multiplayer" element={<MultiplayerLobby />} />
            <Route path="/" element={<Hub />} />
          </Routes>
        </main>
      </HashRouter>
    </PlayerProvider>
  )
}

export default App
