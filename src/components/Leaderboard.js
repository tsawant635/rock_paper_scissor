import React from 'react';
import { useRouter } from 'next/router';
import useStore from '../lib/store';
import styles from './Leaderboard.module.css';

const Leaderboard = () => {
  const router = useRouter();
  const { leaderboard, resetLeaderboard } = useStore(); // Destructure resetLeaderboard from the store

  const navigateToHome = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <h2>Leaderboard</h2>
      <ul className={styles.leaderboard}>
        {leaderboard?.map((entry, index) => (
          <li key={index}>
            {entry?.winner} - {entry?.score}
          </li>
        ))}
      </ul>
      <button onClick={resetLeaderboard} className={styles.clearButton}>
        Clear Leaderboard
      </button>
      <button onClick={navigateToHome} className={styles.homeButton}>
        Home
      </button>
    </div>
  );
};

export default Leaderboard;
