import { useState } from 'react';
import { useRouter } from 'next/router';
import useStore from '../lib/store';
import styles from './StartScreen.module.css';

const StartScreen = () => {
  const router = useRouter();
  const { setMode, setPlayer1, setPlayer2, setRounds, resetGame } = useStore();
  const [mode, setLocalMode] = useState('multiplayer');
  const [player1, setLocalPlayer1] = useState('');
  const [player2, setLocalPlayer2] = useState('');
  const [rounds, setLocalRounds] = useState(null);

  const startGame = () => {
    setMode(mode);
    setPlayer1(player1);
    setPlayer2(mode === 'multiplayer' ? player2 : 'Computer');
    setRounds(rounds);
    router.push('/game');
  };

  return (
    <div className={styles.container}>
      <h1>Rock-Paper-Scissors</h1>
      <label className={styles.label}>
        Mode:
        <select
          className={styles.select}
          value={mode}
          onChange={(e) => setLocalMode(e.target.value)}
        >
          <option value="multiplayer">Multiplayer</option>
          <option value="computer">Against Computer</option>
        </select>
      </label>
      <label className={styles.label}>
        Player 1 Name:
        <input
          className={styles.input}
          value={player1}
          onChange={(e) => setLocalPlayer1(e.target.value)}
        />
      </label>
      {mode === 'multiplayer' && (
        <label className={styles.label}>
          Player 2 Name:
          <input
            className={styles.input}
            value={player2}
            onChange={(e) => setLocalPlayer2(e.target.value)}
          />
        </label>
      )}
      <label className={styles.label}>
        Number of Rounds:
        <input
          className={styles.input}
          type="number"
          value={rounds}
          onChange={(e) => setLocalRounds(Number(e.target.value))}
          min="1"
          max="10"
        />
      </label>
      <button className={styles.button} onClick={resetGame}>Reset</button>
      <button className={styles.button} onClick={startGame}>Start</button>
    </div>
  );
};

export default StartScreen;
