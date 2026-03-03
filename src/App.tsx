import { useState } from 'react';
import { Board } from './components/Board';
import './App.css';
import type { BoardState, Player } from './utils/gameLogic';
import { executeMove, getInitialBoard, getScore, getWinner, hasValidMoves } from './utils/gameLogic';

export default function App() {
  const [board, setBoard] = useState<BoardState>(getInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('black');

  // Derived state
  const scores = getScore(board);
  const winner = getWinner(board);

  const makeMove = (row: number, col: number) => {
    console.log(`Clicked cell at ${row}, ${col}`);

    const newBoard = executeMove(board, row, col, currentPlayer);
    if (!newBoard) {
      return; // Invalid move, do nothing
    } else {
      setBoard(newBoard);
    }

    const nextPlayer = currentPlayer === 'black' ? 'white' : 'black';
    if (hasValidMoves(newBoard, nextPlayer)) {
      setCurrentPlayer(nextPlayer);
    } else if (hasValidMoves(newBoard, currentPlayer)) {
      // Opponent has no moves, current player goes again
      alert(`${nextPlayer.toUpperCase()} has no valid moves. ${currentPlayer.toUpperCase()} goes again!`);
    } else {
      // No valid moves for either player, game over
      console.log('No valid moves for either player. Game over.');
    }
  };

  const resetGame = () => {
    setBoard(getInitialBoard());
    setCurrentPlayer('black');
  };

  return (
    <div className="app-container">
      <h1>Othello Game</h1>
      <p>Prainy</p>

      <div className="game-status">
        <div className="score-board">
          <div className={`player-score ${currentPlayer === 'black' ? 'active' : ''}`}>
            <span className="disc-icon black"></span>
            <span>Black: {scores.black}</span>
          </div>
          <div className={`player-score ${currentPlayer === 'white' ? 'active' : ''}`}>
            <span className="disc-icon white"></span>
            <span>White: {scores.white}</span>
          </div>
        </div>

        {winner ? (
          <div className="winner-announcement">
            {winner === 'draw' ? 'Game is a Draw!' : `Winner: ${winner.toUpperCase()}!`}
            <button onClick={resetGame} className="reset-button">Play Again</button>
          </div>
        ) : (
          <div className="turn-indicator">
            Current Turn: <strong>{currentPlayer.toUpperCase()}</strong>
          </div>
        )}
      </div>

      <Board
        board={board}
        onCellClick={makeMove}
        currentPlayer={currentPlayer}
      />

      <div className="controls">
        <button onClick={resetGame} className="secondary-button">Reset Game</button>
      </div>
    </div>
  )
}
