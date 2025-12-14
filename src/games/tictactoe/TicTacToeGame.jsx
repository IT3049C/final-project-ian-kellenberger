import React, { useState, useEffect, useRef } from 'react'
import usePlayer from '../../app/usePlayer'
import winnerFromBoard from './winner'
import { createRoom, getRoom, updateRoom } from '../../multiplayer/GameRoomClient'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

const EMPTY = ''

export default function TicTacToeGame() {
  const { playerName, setPlayerName } = usePlayer()
  const { roomId: roomIdParam } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [board, setBoard] = useState(Array(9).fill(EMPTY))
  const [status, setStatus] = useState('—')
  const [players, setPlayers] = useState({})
  const [createName, setCreateName] = useState(playerName || '')
  const [joinName, setJoinName] = useState(playerName || '')
  const [roomId, setRoomId] = useState('')
  const [localSymbol, setLocalSymbol] = useState(null)
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const pollRef = useRef(null)

  function reset() {
    setBoard(Array(9).fill(EMPTY))
    setStatus('—')
  }

  async function handleCreateRoom() {
    const creatorName = createName || playerName || 'Player X'
    if (creatorName !== playerName) setPlayerName(creatorName)
    const initial = { board: Array(9).fill(EMPTY), currentPlayer: 'X', players: { X: creatorName } }
    try {
      const data = await createRoom(initial)
      setRoomId(data.roomId || data.id)
      setBoard(data.gameState?.board || initial.board)
      setCurrentPlayer(data.gameState?.currentPlayer || 'X')
      setLocalSymbol('X') // creator is X
      startPolling(data.roomId || data.id)
      setPlayers({ X: creatorName })
    } catch (err) {
      console.error('create room failed', err)
    }
  }

  async function handleJoinRoom(id) {
    if (!id) return
    try {
      const data = await getRoom(id)
      setRoomId(id)
      setBoard(data.gameState?.board || Array(9).fill(EMPTY))
      setCurrentPlayer(data.gameState?.currentPlayer || 'X')
      setPlayers(data.gameState?.players || {})
      setLocalSymbol('O') // joiner becomes O

      const joiningName = joinName || playerName || 'Player O'
      if (joiningName !== playerName) setPlayerName(joiningName)

      const existingPlayers = data.gameState?.players || {}
      try {
        const updated = await updateRoom(id, { ...data.gameState, players: { ...existingPlayers, O: joiningName } })
        setPlayers(updated.gameState?.players || { ...existingPlayers, O: joiningName })
      } catch {
        setPlayers({ ...existingPlayers, O: joiningName })
      }

      startPolling(id)
    } catch (err) {
      console.error('join failed', err)
      alert('Failed to join room')
    }
  }

  useEffect(() => {
    if (roomIdParam && roomIdParam !== roomId) {
      if (location?.state?.created) {
        (async function loadCreator() {
          try {
            const data = await getRoom(roomIdParam)
            setRoomId(roomIdParam)
            setBoard(data.gameState?.board || Array(9).fill(EMPTY))
            setCurrentPlayer(data.gameState?.currentPlayer || 'X')
            setPlayers(data.gameState?.players || {})
            setLocalSymbol('X')
            startPolling(roomIdParam)
          } catch (err) {
            console.error('failed to load created room', err)
          }
        })()
        return
      }
      handleJoinRoom(roomIdParam)
    }
  }, [roomIdParam, location])

  function startPolling(id) {
    if (pollRef.current) clearInterval(pollRef.current)
    pollRef.current = setInterval(async () => {
      try {
        const data = await getRoom(id)
        if (!data?.gameState) return
        const gs = data.gameState
        setBoard(gs.board || (b => b))
        setCurrentPlayer(gs.currentPlayer || 'X')
        setPlayers(gs.players || {})
        const res = winnerFromBoard(gs.board || board)
        if (res !== '—') setStatus(res === 'Draw' ? 'Draw' : `${res} wins`)
      } catch (err) {
        console.error('poll error', err)
      }
    }, 1000)
  }

  function stopPolling() {
    if (pollRef.current) {
      clearInterval(pollRef.current)
      pollRef.current = null
    }
  }

  function handlePlayerMove(i) {
    if (board[i] !== EMPTY) return
    if (status !== '—') return

    const next = [...board]
    next[i] = 'X'
    setBoard(next)

    const res = winnerFromBoard(next)
    if (res !== '—') {
      setStatus(res === 'Draw' ? 'Draw' : `${res} wins`)
      return
    }

    // CPU move for single player
    const emptyIndexes = next.map((v, idx) => (v === EMPTY ? idx : -1)).filter((v) => v >= 0)
    if (emptyIndexes.length === 0) {
      setStatus('Draw')
      return
    }
    const choice = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)]
    const afterCpu = [...next]
    afterCpu[choice] = 'O'
    setBoard(afterCpu)

    const res2 = winnerFromBoard(afterCpu)
    if (res2 !== '—') setStatus(res2 === 'Draw' ? 'Draw' : `${res2} wins`)
  }

  return (
    <section className="game-container" aria-label="Tic Tac Toe">
      <h2>Tic Tac Toe</h2>
      <p aria-live="polite">{playerName ? `Player: ${playerName}` : 'Player: —'}</p>

      <div role="group" aria-label="Board" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 64px)', gap: '8px', margin: '1rem 0' }}>
        {board.map((cell, idx) => (
          <button
            key={idx}
            aria-label={`cell-${idx}`}
            onClick={() => handlePlayerMove(idx)}
            style={{ width: 64, height: 64, fontSize: '1.5rem' }}
          >
            {cell || ' '}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p role="status" aria-label="Game status">Result: {status}</p>
        {roomId && <p>Players: X: {players.X || '—'} / O: {players.O || '—'}</p>}
        {roomId && <p>Turn: {currentPlayer} — You are: {localSymbol || '—'} ({playerName || '—'})</p>}
      </div>

      <button aria-label="Reset game" onClick={reset} style={{ marginTop: '1rem' }}>
        Reset
      </button>
    </section>
  )
}
