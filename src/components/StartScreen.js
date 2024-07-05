'use-client';
import { useState, useEffect } from 'react';
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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const validate = () => {
    const newErrors = {};
    if (!player1.trim()) {
      newErrors.player1 = 'Player 1 name is required';
    }
    if (mode === 'multiplayer' && !player2.trim()) {
      newErrors.player2 = 'Player 2 name is required';
    }
    if (!rounds || rounds < 1 || rounds > 10) {
      newErrors.rounds = 'Number of rounds must be between 1 and 10';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const startGame = () => {
    if (validate()) {
      setMode(mode);
      setPlayer1(player1);
      setPlayer2(mode === 'multiplayer' ? player2 : 'Computer');
      setRounds(rounds);
      router.push('/game');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Rock-Paper-Scissors</h1>
      <label className={styles.label}>
      &nbsp; &nbsp;  Mode: &nbsp; &nbsp; &nbsp; &nbsp;
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
      {errors.player1 && <p className={styles.error}>{errors.player1}</p>}
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
                {errors.player2 && <p className={styles.error}>{errors.player2}</p>}
      <label className={styles.label}>
        Number of Rounds:
        <input
          className={styles.input}
          type="number"
          value={rounds || ''}
          onChange={(e) => setLocalRounds(Number(e.target.value))}
          min="1"
          max="30"
        />

      </label>
      {errors.rounds && <p className={styles.error}>{errors.rounds}</p>}
      <div className={styles.label}>
        <button className={styles.button} onClick={resetGame}>Reset</button>
        <button className={styles.button} onClick={startGame}>Start</button>
      </div>
    </div>
  );
};

export default StartScreen;
