import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import usePlayer from '../app/usePlayer'

export default function JoinRoom() {
  const { playerName, setPlayerName } = usePlayer()
  const [name, setName] = useState(playerName || '')
  const [roomCode, setRoomCode] = useState('')
  const navigate = useNavigate()

  function handleJoin() {
    if (!roomCode) {
      alert('Please enter a room code')
      return
    }
    if (!name) setPlayerName('Player')
    else setPlayerName(name)
    navigate(`/room/${roomCode}`)
  }

  return (
    <section className="game-container">
      <h2>Join a Game Room</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label>
          Your name
          <input aria-label="join-player-name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Room code
          <input aria-label="join-room-code" value={roomCode} onChange={(e) => setRoomCode(e.target.value)} />
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={handleJoin}>Join Room</button>
        </div>
      </div>
    </section>
  )
}
