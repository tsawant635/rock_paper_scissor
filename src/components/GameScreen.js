import { useState } from 'react';
import { useRouter } from 'next/router';
import useStore from '../lib/store';
import Modal from './Modal';
import styles from './GameScreen.module.css';

const GameScreen = () => {
  const {
    mode,
    player1,
    player2,
    rounds,
    currentRound,
    player1Score,
    player2Score,
    incrementRound,
    incrementPlayer1Score,
    incrementPlayer2Score,
    updateLeaderboard,
    resetGame,
  } = useStore();
  const router = useRouter();
  const [player1Choice, setPlayer1Choice] = useState('');
  const [player2Choice, setPlayer2Choice] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [winner, setWinner] = useState('');

  const playRound = () => {
    const choices = ['rock', 'paper', 'scissors'];
    if (mode === 'computer') {
      setPlayer2Choice(choices[Math.floor(Math.random() * 3)]);
    }

    if (player1Choice === player2Choice) {
      // Tie
    } else if (
      (player1Choice === 'rock' && player2Choice === 'scissors') ||
      (player1Choice === 'paper' && player2Choice === 'rock') ||
      (player1Choice === 'scissors' && player2Choice === 'paper')
    ) {
      incrementPlayer1Score();
    } else {
      incrementPlayer2Score();
    }

    if (currentRound === rounds) {
      const winnerName = player1Score > player2Score ? player1 : player2;
      setWinner(winnerName);
      updateLeaderboard(winnerName, player1Score > player2Score ? player1Score : player2Score);
      setShowModal(true);
    } else {
      incrementRound();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push('/');
  };

  const handleNavigateToLeaderboard = () => {
    setShowModal(false);
    router.push('/leaderboard');
  };

  const handleResetGame = () => {
    resetGame();
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <h2>Round {currentRound} of {rounds}</h2>
        <button className={styles.button} onClick={() => router.push('/leaderboard')}>
          Leaderboard
        </button>
        <button className={styles.button} onClick={handleResetGame}>
          Reset
        </button>
      </div>
      <h3>{player1} vs {player2}</h3>
      <p className={styles.playerInfo}>{player1} Wins: {player1Score}</p>
      <p className={styles.playerInfo}>{player2} Wins: {player2Score}</p>
      <div>
        <select className={styles.select} onChange={(e) => setPlayer1Choice(e.target.value)}>
          <option value="">Select</option>
          <option value="rock">Rock</option>
          <option value="paper">Paper</option>
          <option value="scissors">Scissors</option>
        </select>
        {mode === 'multiplayer' && (
          <select className={styles.select} onChange={(e) => setPlayer2Choice(e.target.value)}>
            <option value="">Select</option>
            <option value="rock">Rock</option>
            <option value="paper">Paper</option>
            <option value="scissors">Scissors</option>
          </select>
        )}
        <button className={styles.button} onClick={playRound}>Play Round</button>
      </div>
      <Modal
        show={showModal}
        winner={winner}
        onClose={handleCloseModal}
        onNavigate={handleNavigateToLeaderboard}
      />
    </div>
  );
};

export default GameScreen;
