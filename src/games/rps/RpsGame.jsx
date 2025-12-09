import { useState } from 'react';
import usePlayer from '../../app/usePlayer';

import decideWinner from './decideWinner';

const CHOICES = ['Rock', 'Paper', 'Scissors'];

function pickCpu() {
  const i = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[i];
}

// decideWinner moved to ./decideWinner.js and imported above

export default function RpsGame() {
  const { playerName } = usePlayer();
  const [playerChoice, setPlayerChoice] = useState('');
  const [cpuChoice, setCpuChoice] = useState('');
  const [result, setResult] = useState('—');

  const onChoose = (choice) => {
    const cpu = pickCpu();
    setPlayerChoice(choice);
    setCpuChoice(cpu);
    setResult(decideWinner(choice, cpu));
  };

  const onReset = () => {
    setPlayerChoice('');
    setCpuChoice('');
    setResult('—');
  };

  return (
    <section className="game-container" aria-label="Rock Paper Scissors">
      <h2>Rock Paper Scissors</h2>
      <p aria-live="polite">
        {playerName ? `Player: ${playerName}` : 'Player: —'}
      </p>

      <div role="group" aria-label="Choices" style={{ margin: '1rem 0' }}>
        {CHOICES.map((c) => (
          <button
            key={c}
            aria-label={c}
            onClick={() => onChoose(c)}
            style={{ margin: '0 .5rem' }}
          >
            {c}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p role="status" aria-label="Game status">
          Result: {result}
        </p>
        <p>
          Your choice: <strong>{playerChoice || '—'}</strong>
        </p>
        <p>
          CPU choice: <strong>{cpuChoice || '—'}</strong>
        </p>
      </div>

      <button
        aria-label="Reset game"
        onClick={onReset}
        style={{ marginTop: '1rem' }}
      >
        Reset
      </button>
    </section>
  );
}
