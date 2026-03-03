import React from 'react';
import { Cell } from './Cell';
import './Board.css';
import type { BoardState, Player } from '../utils/gameLogic';

interface BoardProps {
  /** The current state of the board */
  board: BoardState;
  /** Function to call when a cell is clicked */
  onCellClick: (row: number, col: number) => void;
  /** The current player (for potential move validation) */
  currentPlayer: Player;
}

/**
 * Renders the 8x8 Reversi board.
 */
export const Board: React.FC<BoardProps> = ({ board, onCellClick }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((cellValue, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            value={cellValue}
            onClick={() => onCellClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};
