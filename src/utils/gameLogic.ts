export type Player = "black" | "white";
export type CellValue = Player | null;
export type BoardState = CellValue[][];

export const BOARD_SIZE = 8;

// Initialize standard Reversi board
export function getInitialBoard(): BoardState {
  const board: BoardState = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(null));
  // Standard Othello setup: center 4 squares are occupied
  board[3][3] = "white";
  board[3][4] = "black";
  board[4][3] = "black";
  board[4][4] = "white";
  return board;
}

// Directions for checking neighbors (horizontal, vertical, diagonal)
const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
];

/**
 * Checks if a move is valid for the given player at (row, col).
 * Returns true if the move captures at least one opponent piece.
 */
export function isValidMove(
  board: BoardState,
  row: number,
  col: number,
  player: Player
): boolean {
  // 1. Cell must be empty
  if (board[row][col] !== null) {
    return false;
  }

  // 2. Check all 8 directions for bracketing opponent pieces
  const opponent: Player = player === "black" ? "white" : "black";

  for (const [dr, dc] of DIRECTIONS) {
    let r = row + dr;
    let c = col + dc;
    let foundOpponent = false;

    while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
      const cell = board[r][c];

      if (cell === opponent) {
        foundOpponent = true;
      } else if (cell === player) {
        // Found our own piece. If we have seen at least one opponent piece, this direction is valid.
        if (foundOpponent) {
          return true; // As long as one direction is valid, the move is valid
        }
        break; // Stop checking this direction (no sandwich)
      } else {
        // Empty cell or null
        break; // Stop checking this direction
      }

      r += dr;
      c += dc;
    }
  }

  return false;
}

/**
 * Executes a move for the player at (row, col).
 * Returns a new board state with pieces flipped.
 * Included move validation, will return null if the move is invalid
 */
export function executeMove(
  board: BoardState,
  row: number,
  col: number,
  player: Player
): BoardState | null {
  if (!isValidMove(board, row, col, player)) {
    return null; // Invalid move, do not modify the board
  }

  const newBoard = board.map((r) => [...r]);
  newBoard[row][col] = player;

  const opponent: Player = player === "black" ? "white" : "black";

  // Check all 8 directions and flip pieces
  for (const [dr, dc] of DIRECTIONS) {
    let r = row + dr;
    let c = col + dc;
    const piecesToFlip: [number, number][] = [];

    // Traverse to find bracketed pieces
    while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
      const cell = newBoard[r][c];

      if (cell === opponent) {
        piecesToFlip.push([r, c]);
      } else if (cell === player) {
        // Found our own piece. Flip all accumulated opponent pieces.
        if (piecesToFlip.length > 0) {
          for (const [flipR, flipC] of piecesToFlip) {
            newBoard[flipR][flipC] = player;
          }
        }
        break;
      } else {
        // Empty cell
        break;
      }

      r += dr;
      c += dc;
    }
  }

  return newBoard;
}

/**
 * Checks if the player has any valid moves on the board.
 */
export function hasValidMoves(board: BoardState, player: Player): boolean {
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (isValidMove(board, r, c, player)) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Calculates the score for both players.
 */
export function getScore(board: BoardState): { black: number; white: number } {
  let black = 0;
  let white = 0;
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] === "black") black++;
      else if (board[r][c] === "white") white++;
    }
  }
  return { black, white };
}

/**
 * Determines the winner based on the score.
 */
export function getWinner(board: BoardState): Player | "draw" | null {
  const { black, white } = getScore(board);
  if (
    black + white === 64 ||
    (!hasValidMoves(board, "black") && !hasValidMoves(board, "white"))
  ) {
    if (black > white) return "black";
    if (white > black) return "white";
    return "draw";
  }
  return null; // Game not over
}
