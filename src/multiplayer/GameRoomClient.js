const BASE = 'https://game-room-api.fly.dev'

async function createRoom(initialState) {
	const res = await fetch(`${BASE}/api/rooms`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ initialState }),
	})
	if (!res.ok) throw new Error('Failed to create room')
	return res.json()
}

async function getRoom(roomId) {
	const res = await fetch(`${BASE}/api/rooms/${roomId}`)
	if (!res.ok) throw new Error('Failed to fetch room')
	return res.json()
}

async function updateRoom(roomId, gameState) {
	const res = await fetch(`${BASE}/api/rooms/${roomId}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ gameState }),
	})
	if (!res.ok) throw new Error('Failed to update room')
	return res.json()
}

export { createRoom, getRoom, updateRoom }
