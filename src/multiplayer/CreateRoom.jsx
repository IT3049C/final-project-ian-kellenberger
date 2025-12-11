import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createRoom } from './GameRoomClient'
import usePlayer from '../app/usePlayer'

export default function CreateRoom() {
  const { playerName, setPlayerName } = usePlayer()
  const [creating, setCreating] = useState(false)
  const [roomId, setRoomId] = useState('')
  const [name, setName] = useState(playerName || '')
  const navigate = useNavigate()

  async function handleCreate() {
    setCreating(true)
    try {
      const creatorName = name || playerName || 'Player X'
      if (creatorName !== playerName) setPlayerName(creatorName)
      const initialState = { board: Array(9).fill(''), currentPlayer: 'X', players: { X: creatorName } }
      const data = await createRoom(initialState)
      const id = data.roomId || data.id
      setRoomId(id)
      // Navigate to the room page and indicate this client created the room (so it's X)
      navigate(`/room/${id}`, { state: { created: true } })
    } catch (err) {
      console.error('Create room failed', err)
      setCreating(false)
    }
  }

  return (
    <section className="game-container">
      <h2>Create a Game Room</h2>
      <p>Create a multiplayer room and share the code with a friend.</p>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input aria-label="create-player-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        <button onClick={handleCreate} disabled={creating}>{creating ? 'Creating...' : 'Create Room'}</button>
        {roomId ? (
          <span>Room: {roomId}</span>
        ) : null}
      </div>
    </section>
  )
}
