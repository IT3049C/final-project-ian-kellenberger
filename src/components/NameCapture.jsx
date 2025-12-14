import React, { useState } from 'react'
import usePlayer from '../app/usePlayer'

export default function NameCapture() {
  const { playerName, setPlayerName } = usePlayer()
  const [value, setValue] = useState(playerName || '')

  const save = (e) => {
    e.preventDefault()
    setPlayerName(value.trim())
  }

  return (
    <form onSubmit={save} style={{ display: 'inline-block', marginLeft: '1rem' }}>
      <label style={{ marginRight: '.5rem' }}>Name:</label>
      <input
        aria-label="player-name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter name"
      />
      <button type="submit" style={{ marginLeft: '.5rem' }}>
        Save
      </button>
    </form>
  )
}
