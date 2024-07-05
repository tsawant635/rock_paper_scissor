import create from 'zustand';

// Load initial game state from sessionStorage
const loadGameState = () => {
  if (typeof window !== 'undefined') {
    const savedState = sessionStorage.getItem('gameState');
    return savedState ? JSON.parse(savedState) : {
      mode: 'multiplayer',
      player1: '',
      player2: '',
      rounds: 0,
      currentRound: 1,
      player1Score: 0,
      player2Score: 0,
      leaderboard: [],
    };
  }
  return {
    mode: 'multiplayer',
    player1: '',
    player2: '',
    rounds: 0,
    currentRound: 1,
    player1Score: 0,
    player2Score: 0,
    leaderboard: [],
  };
};

// Save game state to sessionStorage
const saveGameState = (state) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('gameState', JSON.stringify(state));
  }
};

// Create Zustand store
const useStore = create((set) => ({
  ...loadGameState(),
  setMode: (mode) => set((state) => {
    const newState = { ...state, mode };
    saveGameState(newState);
    return newState;
  }),
  setPlayer1: (name) => set((state) => {
    const newState = { ...state, player1: name };
    saveGameState(newState);
    return newState;
  }),
  setPlayer2: (name) => set((state) => {
    const newState = { ...state, player2: name };
    saveGameState(newState);
    return newState;
  }),
  setRounds: (num) => set((state) => {
    const newState = { ...state, rounds: num };
    saveGameState(newState);
    return newState;
  }),
  incrementRound: () => set((state) => {
    const newState = { ...state, currentRound: state.currentRound + 1 };
    saveGameState(newState);
    return newState;
  }),
  incrementPlayer1Score: () => set((state) => {
    const newState = { ...state, player1Score: state.player1Score + 1 };
    saveGameState(newState);
    return newState;
  }),
  incrementPlayer2Score: () => set((state) => {
    const newState = { ...state, player2Score: state.player2Score + 1 };
    saveGameState(newState);
    return newState;
  }),
  resetGame: () => set((state) => {
    const newState = {
      ...state,
      mode: 'multiplayer',
      player1: '',
      player2: '',
      rounds: 0,
      currentRound: 1,
      player1Score: 0,
      player2Score: 0,
    };
    saveGameState(newState);
    return newState;
  }),
  updateLeaderboard: (winner, score) => set((state) => {
    const newLeaderboard = [...state.leaderboard, { winner, score }];
    const newState = { ...state, leaderboard: newLeaderboard };
    saveGameState(newState);
    return newState;
  }),
  resetLeaderboard: () => set((state) => { // Add this function to reset leaderboard
    const newState = { ...state, leaderboard: [] };
    saveGameState(newState);
    return newState;
  }),
}));

export default useStore;
