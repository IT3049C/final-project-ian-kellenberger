import React, { useState } from 'react'
import usePlayer from '../../app/usePlayer'
import winnerFromBoard from './winner'
<<<<<<< HEAD
import { createRoom, getRoom, updateRoom } from '../../multiplayer/GameRoomClient'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
=======
>>>>>>> parent of 6338697 (games implemented and multiplater added to tictactoe)

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

	function reset() {
		setBoard(Array(9).fill(EMPTY))
		setStatus('—')
	}

<<<<<<< HEAD
	async function resetMultiplayer() {
		if (!roomId) return
		const initial = { board: Array(9).fill(EMPTY), currentPlayer: 'X' }
		try {
			const data = await updateRoom(roomId, initial)
			setBoard(data.gameState.board || initial.board)
			setCurrentPlayer(data.gameState.currentPlayer || 'X')
			setStatus('—')
		} catch (err) {
			console.error(err)
		}
	}

	async function handleCreateRoom() {
		const creatorName = createName || playerName || 'Player X'
		// set player's name in context
		if (creatorName !== playerName) setPlayerName(creatorName)
		const initial = { board: Array(9).fill(EMPTY), currentPlayer: 'X', players: { X: creatorName } }
		try {
			const data = await createRoom(initial)
			// API returns roomId and gameState
			setRoomId(data.roomId || data.id)
			setBoard(data.gameState?.board || initial.board)
			setCurrentPlayer(data.gameState?.currentPlayer || 'X')
			setLocalSymbol('X') // creator is X
			startPolling(data.roomId || data.id)
			setPlayers({ X: createName || playerName || 'Player X' })
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
			// set player's name in context and in the room state
			const joiningName = joinName || playerName || 'Player O'
			if (joiningName !== playerName) setPlayerName(joiningName)
			// if room doesn't have players or no O name set, update it
			const existingPlayers = data.gameState?.players || {}
			try {
				const updated = await updateRoom(id, { ...data.gameState, players: { ...existingPlayers, O: joiningName } })
				setPlayers(updated.gameState?.players || { ...existingPlayers, O: joiningName })
			} catch (err) {
				console.error('failed to update players', err)
				// fallback: set players locally
				setPlayers({ ...existingPlayers, O: joiningName })
			}
			startPolling(id)
		} catch (err) {
			console.error('join failed', err)
			alert('Failed to join room')
		}
	}

	// if there is a roomId param in the route, join it on mount
	useEffect(() => {
		if (roomIdParam && roomIdParam !== roomId) {
			// if this navigation indicates the user just created the room, treat them as creator (X)
			if (location?.state?.created) {
				// load the room state without attempting to claim O
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
				if (!data || !data.gameState) return
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

	async function handleMultiplayerMove(i) {
		if (!roomId) return
=======
	function handlePlayerMove(i) {
>>>>>>> parent of 6338697 (games implemented and multiplater added to tictactoe)
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

<<<<<<< HEAD
		// flip currentPlayer
		const nextPlayer = localSymbol === 'X' ? 'O' : 'X'

		try {
			const data = await updateRoom(roomId, { board: next, currentPlayer: nextPlayer, players: players })
			setBoard(data.gameState?.board || next)
			setCurrentPlayer(data.gameState?.currentPlayer || nextPlayer)
			setPlayers(data.gameState?.players || players)
		} catch (err) {
			console.error('update failed', err)
=======
		// simple CPU: pick a random empty cell
		const emptyIndexes = next.map((v, idx) => (v === EMPTY ? idx : -1)).filter((v) => v >= 0)
		if (emptyIndexes.length === 0) {
			setStatus('Draw')
			return
>>>>>>> parent of 6338697 (games implemented and multiplater added to tictactoe)
		}
		const choice = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)]
		const afterCpu = [...next]
		afterCpu[choice] = 'O'
		setBoard(afterCpu)

<<<<<<< HEAD
	function handleLocalClick(i) {
		if (roomId) {
			handleMultiplayerMove(i)
		} else {
			// single player vs CPU as before
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

			// simple CPU: pick a random empty cell
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
	}

	function leaveRoom() {
		stopPolling()
		setRoomId('')
		setLocalSymbol(null)
		resetLocal()
		// if we arrived via a room route, navigate back to hub
		if (roomIdParam) {
			navigate('/')
		}
=======
		const res2 = winnerFromBoard(afterCpu)
		if (res2 !== '—') setStatus(res2 === 'Draw' ? 'Draw' : `${res2} wins`)
>>>>>>> parent of 6338697 (games implemented and multiplater added to tictactoe)
	}

	return (
		<section className="game-container" aria-label="Tic Tac Toe">
			<h2>Tic Tac Toe</h2>
			<p aria-live="polite">{playerName ? `Player: ${playerName}` : 'Player: —'}</p>

<<<<<<< HEAD
			<div style={{ marginBottom: '1rem' }}>
				<strong>Multiplayer</strong>
				<div style={{ display: 'flex', gap: '8px', marginTop: '8px', alignItems: 'center' }}>
					<input aria-label="create-player-name" placeholder="Your name" value={createName} onChange={(e) => setCreateName(e.target.value)} style={{ width: 140 }} />
					<button onClick={handleCreateRoom} disabled={!!roomId}>Create Room</button>
					<input aria-label="join-player-name" placeholder="Your name" value={joinName} onChange={(e) => setJoinName(e.target.value)} style={{ width: 120 }} />
					<input
						aria-label="Room code"
						placeholder="Enter room code"
						defaultValue=""
						id="join-room-input"
						style={{ width: 160 }}
					/>
					<button
						onClick={() => {
							const id = document.getElementById('join-room-input').value.trim()
							handleJoinRoom(id)
						}}
						disabled={!!roomId}
					>
						Join Room
					</button>
					{roomId && (
						<>
							<span style={{ marginLeft: '8px' }}>Room: {roomId}</span>
							<div style={{ marginLeft: '8px' }}>Players: X: {players.X || '—'} / O: {players.O || '—'}</div>
							<button onClick={leaveRoom}>Leave</button>
						</>
					)}
				</div>
			</div>

=======
>>>>>>> parent of 6338697 (games implemented and multiplater added to tictactoe)
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
<<<<<<< HEAD
				{roomId && <p>Turn: {currentPlayer} — You are: {localSymbol || '—'} ({playerName || '—'})</p>}
=======
>>>>>>> parent of 6338697 (games implemented and multiplater added to tictactoe)
			</div>

			<button aria-label="Reset game" onClick={reset} style={{ marginTop: '1rem' }}>
				Reset
			</button>
		</section>
	)
}
