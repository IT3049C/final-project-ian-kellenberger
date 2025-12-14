// Dummy implementation using localStorage for persistence across contexts
// In a real app, this would connect to a server

const STORAGE_KEY = 'gameRooms'

function getRooms() {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : {}
}

function setRooms(rooms) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms))
}

export function createRoom(initialGameState) {
  const roomId = Math.random().toString(36).substr(2, 9)
  const rooms = getRooms()
  rooms[roomId] = { gameState: initialGameState }
  setRooms(rooms)
  return { roomId, gameState: initialGameState }
}

export function getRoom(roomId) {
  const rooms = getRooms()
  return rooms[roomId] || { gameState: null }
}

export function updateRoom(roomId, gameState) {
  const rooms = getRooms()
  if (rooms[roomId]) {
    rooms[roomId] = { gameState }
    setRooms(rooms)
    return { gameState }
  }
  throw new Error('Room not found')
}
