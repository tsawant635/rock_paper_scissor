import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ show, winner, onClose, onNavigate }) => {
  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Game Over</h2>
        <p>Congratulations, {winner}!</p>
        <button className={styles.button} onClick={onNavigate}>Go to Leaderboard</button>
        <button className={styles.button} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
