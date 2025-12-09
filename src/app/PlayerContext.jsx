import React, { createContext, useState, useEffect } from 'react'

const PlayerContext = createContext({ playerName: '', setPlayerName: () => {} })

export function PlayerProvider({ children }) {
	// Provide a playerName and setter. Persist to localStorage so it's available
	// across reloads (useful for local dev & tests).
		const [playerName, setPlayerName] = useState(() => {
			try {
				return localStorage.getItem('playerName') || ''
			} catch {
				return ''
			}
		})

	useEffect(() => {
			try {
				if (playerName) localStorage.setItem('playerName', playerName)
				else localStorage.removeItem('playerName')
			} catch {
				// ignore storage errors
			}
	}, [playerName])

	const value = { playerName, setPlayerName }
	return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export default PlayerContext
