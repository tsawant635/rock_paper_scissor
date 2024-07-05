import React from 'react';
import useStore from '../lib/store';
import styles from './Leaderboard.module.css';

const Leaderboard = () => {
  const { leaderboard } = useStore();

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
    </div>
  );
};

export default Leaderboard;
