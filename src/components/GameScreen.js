"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useStore from "../lib/store";
import Modal from "./Modal";
import styles from "./GameScreen.module.css";

const Rock = "https://res.cloudinary.com/dkjn33zdf/image/upload/v1720157097/Screenshot_2024-07-05_at_08.49.35_wf0hdh.png";
const Paper = "https://res.cloudinary.com/dkjn33zdf/image/upload/v1720157097/Screenshot_2024-07-05_at_08.49.44_x9mhyj.png";
const Scissor = "https://res.cloudinary.com/dkjn33zdf/image/upload/v1720157097/Screenshot_2024-07-05_at_08.49.40_pagmsh.png";

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
  const [player1Choice, setPlayer1Choice] = useState("");
  const [player2Choice, setPlayer2Choice] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [winner, setWinner] = useState("");
  const [draws, setDraws] = useState(0);
  const [roundCompleted, setRoundCompleted] = useState(false);
  const [choicesLocked, setChoicesLocked] = useState(false);

  useEffect(() => {
    if (player1Choice && player2Choice) {
      determineWinnerAndProceed();
    }
  }, [player1Choice, player2Choice]);

  const determineWinnerAndProceed = () => {
    const roundWinner = determineWinner(player1Choice, player2Choice);

    if (roundWinner === "draw") {
      setDraws(draws + 1);
    } else if (roundWinner === "player1") {
      incrementPlayer1Score();
    } else {
      incrementPlayer2Score();
    }

    if (currentRound === rounds) {
      const winnerName = player1Score > player2Score ? player1 : player2;
      setWinner(winnerName);
      updateLeaderboard(
        winnerName,
        player1Score > player2Score ? player1Score : player2Score
      );
      setShowModal(true);
    } else {
      incrementRound();
    }

    setChoicesLocked(true);
    setRoundCompleted(true);
  };

  const determineWinner = (choice1, choice2) => {
    if (choice1 === choice2) {
      return "draw";
    } else if (
      (choice1 === "rock" && choice2 === "scissors") ||
      (choice1 === "paper" && choice2 === "rock") ||
      (choice1 === "scissors" && choice2 === "paper")
    ) {
      return "player1";
    } else {
      return "player2";
    }
  };

  const playRound = (choice, player) => {
    if (choicesLocked) return;

    const choices = ["rock", "paper", "scissors"];
    if (player === "player1") {
      setPlayer1Choice(choice);
      if (mode === "computer") {
        const p2Choice = choices[Math.floor(Math.random() * 3)];
        setPlayer2Choice(p2Choice);
      }
    } else if (player === "player2") {
      setPlayer2Choice(choice);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/");
  };

  const handleNavigateToLeaderboard = () => {
    setShowModal(false);
    router.push("/leaderboard");
  };

  const handleResetGame = () => {
    resetGame();
    router.push("/");
  };

  const handleNextRound = () => {
    setPlayer1Choice("");
    setPlayer2Choice("");
    setRoundCompleted(false);
    setChoicesLocked(false);
  };

  const getImageSrc = (choice) => {
    switch (choice) {
      case "rock":
        return Rock;
      case "paper":
        return Paper;
      case "scissors":
        return Scissor;
      default:
        return "";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <h2>
          Round {currentRound} of {rounds}
        </h2>
        <button
          className={styles.button}
          onClick={() => router.push("/leaderboard")}
        >
          Leaderboard
        </button>
        <button className={styles.button} onClick={handleResetGame}>
          Reset
        </button>
      </div>
      <h3>
        {player1} vs {player2}
      </h3>
      <p className={styles.playerInfo}>
        {player1} Wins: {player1Score}
      </p>
      <p className={styles.playerInfo}>
        {player2} Wins: {player2Score}
      </p>
      <p className={styles.playerInfo}>Draws: {draws}</p>
      <div className={styles.choices}>
        <button
          className={styles.choiceButton}
          onClick={() => playRound("rock", "player1")}
          disabled={choicesLocked}
        >
          <img src={Rock} alt="Rock" className={styles.choiceImage} />
        </button>
        <button
          className={styles.choiceButton}
          onClick={() => playRound("paper", "player1")}
          disabled={choicesLocked}
        >
          <img src={Paper} alt="Paper" className={styles.choiceImage} />
        </button>
        <button
          className={styles.choiceButton}
          onClick={() => playRound("scissors", "player1")}
          disabled={choicesLocked}
        >
          <img src={Scissor} alt="Scissors" className={styles.choiceImage} />
        </button>
      </div>
      {mode === "multiplayer" && (
        <div className={styles.choices}>
          <button
            className={styles.choiceButton}
            onClick={() => playRound("rock", "player2")}
            disabled={choicesLocked}
          >
            <img src={Rock} alt="Rock" className={styles.choiceImage} />
          </button>
          <button
            className={styles.choiceButton}
            onClick={() => playRound("paper", "player2")}
            disabled={choicesLocked}
          >
            <img src={Paper} alt="Paper" className={styles.choiceImage} />
          </button>
          <button
            className={styles.choiceButton}
            onClick={() => playRound("scissors", "player2")}
            disabled={choicesLocked}
          >
            <img src={Scissor} alt="Scissors" className={styles.choiceImage} />
          </button>
        </div>
      )}
      <div className={styles.selectedChoices}>
        {player1Choice && (
          <div className={styles.choiceDisplay}>
            <h4>{player1}'s Choice</h4>
            <img
              src={getImageSrc(player1Choice)}
              alt={player1Choice}
              className={styles.choiceImage}
            />
          </div>
        )}
        {player2Choice && (
          <div className={styles.choiceDisplay}>
            <h4>{player2}'s Choice</h4>
            <img
              src={getImageSrc(player2Choice)}
              alt={player2Choice}
              className={styles.choiceImage}
            />
          </div>
        )}
      </div>
      {roundCompleted && (
        <button className={styles.button} onClick={handleNextRound}>
          Next Round
        </button>
      )}
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
