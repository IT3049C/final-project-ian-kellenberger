import React, { useEffect, useState, useRef } from 'react'
import usePlayer from '../../app/usePlayer'
import winnerFromBoard from './winner'
import { createRoom, getRoom, updateRoom } from '../../multiplayer/GameRoomClient'

const EMPTY = ''

export default function TicTacToeGame() {
	const { playerName } = usePlayer()
	const [board, setBoard] = useState(Array(9).fill(EMPTY))
	const [status, setStatus] = useState('—')

	// multiplayer state
	const [roomId, setRoomId] = useState('')
	const [localSymbol, setLocalSymbol] = useState(null) // 'X' or 'O'
	const [currentPlayer, setCurrentPlayer] = useState('X')
		// polling state handled via ref
	const pollRef = useRef(null)

	useEffect(() => {
		return () => {
			if (pollRef.current) clearInterval(pollRef.current)
		}
	}, [])

	function resetLocal() {
		setBoard(Array(9).fill(EMPTY))
		setStatus('—')
		setCurrentPlayer('X')
	}

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
		const initial = { board: Array(9).fill(EMPTY), currentPlayer: 'X' }
		try {
			const data = await createRoom(initial)
			// API returns roomId and gameState
			setRoomId(data.roomId || data.id)
			setBoard(data.gameState?.board || initial.board)
			setCurrentPlayer(data.gameState?.currentPlayer || 'X')
			setLocalSymbol('X') // creator is X
			startPolling(data.roomId || data.id)
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
			setLocalSymbol('O') // joiner becomes O
			startPolling(id)
		} catch (err) {
			console.error('join failed', err)
			alert('Failed to join room')
		}
	}

	function startPolling(id) {
		if (pollRef.current) clearInterval(pollRef.current)
		pollRef.current = setInterval(async () => {
			try {
				const data = await getRoom(id)
				if (!data || !data.gameState) return
				const gs = data.gameState
				setBoard(gs.board || (b => b))
				setCurrentPlayer(gs.currentPlayer || 'X')
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
		if (board[i] !== EMPTY) return
		if (status !== '—') return
		if (!localSymbol) return
		if (currentPlayer !== localSymbol) return // not your turn

		const next = [...board]
		next[i] = localSymbol
		// compute winner locally
		const res = winnerFromBoard(next)
		if (res !== '—') {
			setStatus(res === 'Draw' ? 'Draw' : `${res} wins`)
		}

		// flip currentPlayer
		const nextPlayer = localSymbol === 'X' ? 'O' : 'X'

		try {
			const data = await updateRoom(roomId, { board: next, currentPlayer: nextPlayer })
			setBoard(data.gameState?.board || next)
			setCurrentPlayer(data.gameState?.currentPlayer || nextPlayer)
		} catch (err) {
			console.error('update failed', err)
		}
	}

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
	}

	return (
		<section className="game-container" aria-label="Tic Tac Toe">
			<h2>Tic Tac Toe</h2>
			<p aria-live="polite">{playerName ? `Player: ${playerName}` : 'Player: —'}</p>

			<div style={{ marginBottom: '1rem' }}>
				<strong>Multiplayer</strong>
				<div style={{ display: 'flex', gap: '8px', marginTop: '8px', alignItems: 'center' }}>
					<button onClick={handleCreateRoom} disabled={!!roomId}>Create Room</button>
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
							<button onClick={leaveRoom}>Leave</button>
						</>
					)}
				</div>
			</div>

			<div role="group" aria-label="Board" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 64px)', gap: '8px', margin: '1rem 0' }}>
				{board.map((cell, idx) => (
					<button
						key={idx}
						aria-label={`cell-${idx}`}
						onClick={() => handleLocalClick(idx)}
						style={{ width: 64, height: 64, fontSize: '1.5rem' }}
					>
						{cell || ' '}
					</button>
				))}
			</div>

			<div style={{ marginTop: '1rem' }}>
				<p role="status" aria-label="Game status">Result: {status}</p>
				{roomId && <p>Turn: {currentPlayer} — You are: {localSymbol || '—'}</p>}
			</div>

			<div style={{ marginTop: '1rem', display: 'flex', gap: '8px' }}>
				<button aria-label="Reset game" onClick={roomId ? resetMultiplayer : resetLocal}>
					Reset
				</button>
				{roomId ? <button onClick={leaveRoom}>Leave Room</button> : null}
			</div>
		</section>
	)
}
