import { useContext } from 'react'
import PlayerContext from './PlayerContext'

// small wrapper hook to consume PlayerContext; keeps PlayerContext.jsx
// focused on exporting components only (avoids Fast Refresh warnings)
export default function usePlayer() {
  return useContext(PlayerContext)
}
