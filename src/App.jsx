import './App.css'
import './styles/theme.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import RpsGame from './games/rps/RpsGame'
import TicTacToeGame from './games/tictactoe/TicTacToeGame'
import HangmanGame from './games/hangman/HangmanGame'
import WordleGame from './games/wordle/WordleGame'
<<<<<<< HEAD
<<<<<<< HEAD
import CreateRoom from './multiplayer/CreateRoom'
import JoinRoom from './multiplayer/JoinRoom'
=======
import MultiplayerLobby from './multiplayer/MultiplayerLobby'
>>>>>>> parent of 6338697 (games implemented and multiplater added to tictactoe)
=======
import MultiplayerLobby from './multiplayer/MultiplayerLobby'
>>>>>>> parent of 6338697 (games implemented and multiplater added to tictactoe)
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
            <Route path="/room/create" element={<CreateRoom />} />
            <Route path="/room/join" element={<JoinRoom />} />
            <Route path="/room/:roomId" element={<TicTacToeGame />} />
            <Route path="/hangman" element={<HangmanGame />} />
            <Route path="/wordle" element={<WordleGame />} />
<<<<<<< HEAD
<<<<<<< HEAD
            {/* room creation & room view routes added for multiplayer */}
=======
            <Route path="/multiplayer" element={<MultiplayerLobby />} />
>>>>>>> parent of 6338697 (games implemented and multiplater added to tictactoe)
=======
            <Route path="/multiplayer" element={<MultiplayerLobby />} />
>>>>>>> parent of 6338697 (games implemented and multiplater added to tictactoe)
            <Route path="/" element={<Hub />} />
          </Routes>
        </main>
      </HashRouter>
    </PlayerProvider>
  )
}

export default App
